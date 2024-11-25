import crypto from 'crypto';
import { VercelRequest, VercelResponse } from '@vercel/node'
import * as emailjs from '@emailjs/nodejs'

// Check and provide type safety for EmailJS config
interface EmailJSConfig {
    publicKey: string;
    privateKey: string;
}

// Validate environment variables
const emailjsConfig: EmailJSConfig = {
    publicKey: process.env.EMAILJS_PUBLIC_KEY || '',
    privateKey: process.env.EMAILJS_PRIVATE_KEY || ''
}

// Validate required environment variables
if (!emailjsConfig.publicKey || !emailjsConfig.privateKey) {
    console.error('Missing required EmailJS configuration')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        console.log('Request received:', req.method);

        // Only allow POST requests
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        // Collect the raw body for HMAC validation
        const rawBody = await new Promise<Buffer>((resolve, reject) => {
            const chunks: Buffer[] = [];
            req.on('data', (chunk) => chunks.push(chunk));
            req.on('end', () => resolve(Buffer.concat(chunks)));
            req.on('error', reject);
        });

        console.log('Raw body:', rawBody.toString('utf8'));

        // Extract the `sanity-webhook-signature` header
        const sanitySignature = req.headers['sanity-webhook-signature'] as string;
        if (!sanitySignature) {
            console.error('Missing sanity-webhook-signature header');
            return res.status(401).json({ error: 'Missing signature' });
        }

        console.log('Sanity Webhook Signature:', sanitySignature);

        // Parse the signature header
        const signatureParts = Object.fromEntries(
            sanitySignature.split(',').map(part => {
                const [key, value] = part.split('=');
                return [key, value];
            })
        );

        const timestamp = signatureParts.t;
        const signature = signatureParts.h;

        if (!timestamp || !signature) {
            console.error('Invalid signature format');
            return res.status(401).json({ error: 'Invalid signature format' });
        }

        const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;
        if (!SANITY_WEBHOOK_SECRET) {
            console.error('Missing SANITY_WEBHOOK_SECRET environment variable');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Create the payload string
        const payload = `${timestamp}.${rawBody}`;

        // Calculate the expected signature
        const computedSignature = crypto
            .createHmac('sha256', SANITY_WEBHOOK_SECRET)
            .update(payload)
            .digest('hex');

        // Compare signatures using a constant-time comparison
        const signaturesMatch = signature === computedSignature;

        if (!signaturesMatch) {
            console.error('Invalid webhook signature');
            return res.status(401).json({ error: 'Invalid webhook signature' });
        }

        console.log('Webhook signature verified successfully.');

        const data = JSON.parse(rawBody.toString());
        console.log('Payload:', JSON.stringify(data, null, 2));

        const {
            _id,
            _type,
            clientEmail,
            arrivalDate,
            description,
            createdAt
        } = data; // Changed from req.body to data

        if (_type !== 'emailRequest') {
            console.log('Invalid document type:', _type)
            return res.status(400).json({ message: 'Invalid document type' })
        }

        // Rest of your code remains the same...
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