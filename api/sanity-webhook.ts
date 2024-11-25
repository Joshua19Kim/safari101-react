import crypto from 'crypto';
import { VercelRequest, VercelResponse } from '@vercel/node'
import * as emailjs from '@emailjs/nodejs'

interface EmailJSConfig {
    publicKey: string;
    privateKey: string;
}

const emailjsConfig: EmailJSConfig = {
    publicKey: process.env.EMAILJS_PUBLIC_KEY || '',
    privateKey: process.env.EMAILJS_PRIVATE_KEY || ''
}

if (!emailjsConfig.publicKey || !emailjsConfig.privateKey) {
    console.error('Missing required EmailJS configuration')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        console.log('Request received:', req.method);

        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        const rawBody = await new Promise<Buffer>((resolve, reject) => {
            const chunks: Buffer[] = [];
            req.on('data', (chunk) => chunks.push(chunk));
            req.on('end', () => resolve(Buffer.concat(chunks)));
            req.on('error', reject);
        });

        const sanitySignature = req.headers['sanity-webhook-signature'];
        if (!sanitySignature) {
            console.error('Missing sanity-webhook-signature header');
            return res.status(401).json({ error: 'Missing signature' });
        }

        // Convert to string if it's an array
        const signatureStr = Array.isArray(sanitySignature) ? sanitySignature[0] : sanitySignature;
        console.log('Raw signature header:', signatureStr);

        // Parse the signature header
        let timestamp: string | undefined;
        let signature: string | undefined;

        try {
            const parts = signatureStr.split(',');
            for (const part of parts) {
                const [key, value] = part.trim().split('=');
                if (key === 't') timestamp = value;
                if (key === 'v1') signature = value; // Changed from 'h' to 'v1'
            }
        } catch (error) {
            console.error('Error parsing signature:', error);
            return res.status(401).json({ error: 'Error parsing signature' });
        }

        console.log('Parsed timestamp:', timestamp);
        console.log('Parsed signature:', signature);

        if (!timestamp || !signature) {
            console.error('Missing required signature components');
            return res.status(401).json({ error: 'Invalid signature format' });
        }

        const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;
        if (!SANITY_WEBHOOK_SECRET) {
            console.error('Missing SANITY_WEBHOOK_SECRET environment variable');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Convert secret to base64 if it isn't already
        const secretBuffer = Buffer.from(SANITY_WEBHOOK_SECRET, 'base64');

        const payload = `${timestamp}.${rawBody}`;

        const computedSignature = crypto
            .createHmac('sha256', secretBuffer)
            .update(payload)
            .digest('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        console.log('Computed signature:', computedSignature);
        console.log('Received signature:', signature);

        const signaturesMatch = signature === computedSignature;

        if (!signaturesMatch) {
            console.error('Signature mismatch');
            return res.status(401).json({ error: 'Invalid webhook signature' });
        }

        console.log('Webhook signature verified successfully.');

        let data;
        try {
            data = JSON.parse(rawBody.toString());
        } catch (error) {
            console.error('Error parsing webhook body:', error);
            return res.status(400).json({ error: 'Invalid JSON body' });
        }

        const {
            _id,
            _type,
            clientEmail,
            arrivalDate,
            description,
            createdAt
        } = data;

        if (!_type || _type !== 'emailRequest') {
            console.log('Invalid document type:', _type)
            return res.status(400).json({ message: 'Invalid document type' })
        }

        const serviceId = process.env.EMAILJS_SERVICE_ID
        const templateId = process.env.EMAILJS_TEMPLATE_ID
        const ownerEmail = process.env.WEBSITE_OWNER_EMAIL

        if (!serviceId || !templateId || !ownerEmail) {
            throw new Error('Missing required EmailJS configuration')
        }

        await emailjs.send(
            serviceId,
            templateId,
            {
                to_email: ownerEmail,
                client_email: clientEmail,
                arrival_date: arrivalDate,
                description,
                created_at: createdAt
            },
            {
                publicKey: emailjsConfig.publicKey,
                privateKey: emailjsConfig.privateKey
            }
        )

        console.log('Email sent successfully')

        const projectId = process.env.REACT_APP_SANITY_PROJECT_ID
        const token = process.env.REACT_APP_SANITY_TOKEN

        if (!projectId || !token) {
            throw new Error('Missing Sanity configuration')
        }

        const sanityResponse = await fetch(
            `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/production`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    mutations: [
                        {
                            patch: {
                                id: _id,
                                set: { emailSent: true }
                            }
                        }
                    ]
                })
            }
        )

        if (!sanityResponse.ok) {
            throw new Error('Failed to update Sanity document')
        }

        console.log('Sanity document updated')
        return res.status(200).json({ message: 'Webhook processed successfully' })

    } catch (error) {
        console.error('Error in webhook function:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}