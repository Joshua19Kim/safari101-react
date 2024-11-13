import { NextApiRequest, NextApiResponse } from 'next'
import * as emailjs from '@emailjs/nodejs'

// Webhook secret for security (should match what you set in Sanity webhook settings)
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

// Initialize EmailJS configuration
const emailjsConfig = {
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    // Verify webhook signature
    const signature = req.headers['sanity-webhook-signature']
    if (signature !== WEBHOOK_SECRET) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const {
            _id,
            _type,
            clientEmail,
            arrivalDate,
            description,
            createdAt
        } = req.body

        // Verify this is an emailRequest document
        if (_type !== 'emailRequest') {
            return res.status(400).json({ message: 'Invalid document type' })
        }

        // Send email using EmailJS
        await emailjs.send(
            process.env.EMAILJS_SERVICE_ID!,
            process.env.EMAILJS_TEMPLATE_ID!,
            {
                to_email: process.env.WEBSITE_OWNER_EMAIL!,
                client_email: clientEmail,
                arrival_date: arrivalDate,
                description,
                created_at: createdAt
            },
            emailjsConfig
        )

        // Update the Sanity document to mark email as sent
        const sanityResponse = await fetch(
            `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/production`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}`
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

        return res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
        console.error('Webhook error:', error)
        return res.status(500).json({ message: 'Failed to process webhook' })
    }
}