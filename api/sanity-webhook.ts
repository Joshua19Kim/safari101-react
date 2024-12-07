import crypto from 'crypto';
import { VercelRequest, VercelResponse } from '@vercel/node';
import formData from 'form-data';
import Mailgun from 'mailgun.js';


// This is a Vercel Serverless function to send an email through Mail gun

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || '',
    url: process.env.MAILGUN_URL || 'https://api.mailgun.net'
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
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

        const signatureStr = Array.isArray(sanitySignature) ? sanitySignature[0] : sanitySignature;

        let timestamp: string | undefined;
        let signature: string | undefined;

        try {
            const parts = signatureStr.split(',');
            for (const part of parts) {
                const [key, value] = part.trim().split('=');
                if (key === 't') timestamp = value;
                if (key === 'v1') signature = value;
            }
        } catch (error) {
            console.error('Error parsing signature:', error);
            return res.status(401).json({ error: 'Error parsing signature' });
        }

        if (!timestamp || !signature) {
            console.error('Missing required signature components');
            return res.status(401).json({ error: 'Invalid signature format' });
        }

        const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;
        if (!SANITY_WEBHOOK_SECRET) {
            console.error('Missing SANITY_WEBHOOK_SECRET environment variable');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const bodyString = rawBody.toString('utf8');
        const signaturePayload = `${timestamp}.${bodyString}`;

        const computedSignature = crypto
            .createHmac('sha256', SANITY_WEBHOOK_SECRET)
            .update(signaturePayload)
            .digest('base64')
            .replace(/\//g, '_')
            .replace(/\+/g, '-')
            .replace(/=+$/, '');

        if (signature !== computedSignature) {
            console.error('Signature mismatch');
            return res.status(401).json({ error: 'Invalid webhook signature' });
        }

        let data;
        try {
            data = JSON.parse(bodyString);
        } catch (error) {
            console.error('Error parsing webhook body:', error);
            return res.status(400).json({ error: 'Invalid JSON body' });
        }

        const {
            _id,
            _type,
            clientEmail,
            adults,
            children,
            arrivalDate,
            description,
            selectedOptions,
            selectedTripName,
            selectedTripPrice,
            selectedTripDescription,
            createdAt
        } = data;

        if (!_type || _type !== 'emailRequest') {
            console.log('Invalid document type:', _type)
            return res.status(400).json({ message: 'Invalid document type' })
        }

        const ownerEmail = process.env.WEBSITE_OWNER_EMAIL;
        const mailgunDomain = process.env.MAILGUN_DOMAIN;

        if (!ownerEmail || !mailgunDomain) {
            throw new Error('Missing email configuration');
        }

        // Send email using Mailgun
        try {
            const emailData = {
                from: `Tour Booking <noreply@${mailgunDomain}>`,
                to: ownerEmail,
                subject: 'New Tour Booking Request',
                html: `
                    <h2>New Booking Request</h2>
                    <p><strong>Client Email:</strong> ${clientEmail}</p>
                    <p><strong>Number of Adults:</strong> ${adults}</p>
                    <p><strong>Number of Children:</strong> ${children}</p>
                    <p><strong>Arrival Date:</strong> ${arrivalDate}</p>
                    <p><strong>Selected Preferred Options:</strong> ${selectedOptions}</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Request Time:</strong> ${new Date(createdAt).toLocaleString()}</p>
                    <p><strong>Selected Trip Name by User:</strong> ${selectedTripName}</p>
                    <p><strong>Selected Trip Price by User:</strong> ${selectedTripPrice}</p>
                    <p><strong>Selected Trip Description by User:</strong> ${selectedTripDescription}</p>
                `
            };

            const emailResponse = await mg.messages.create(mailgunDomain, emailData);
            console.log('Email sent successfully:', emailResponse);
        } catch (error) {
            console.error('Mailgun error:', error);
            throw new Error('Failed to send email');
        }

        const projectId = process.env.REACT_APP_SANITY_PROJECT_ID;
        const token = process.env.REACT_APP_SANITY_TOKEN;

        if (!projectId || !token) {
            throw new Error('Missing Sanity configuration');
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
        );

        if (!sanityResponse.ok) {
            throw new Error('Failed to update Sanity document');
        }

        console.log('Sanity document updated');
        return res.status(200).json({ message: 'Webhook processed successfully' });

    } catch (error) {
        console.error('Error in webhook function:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}