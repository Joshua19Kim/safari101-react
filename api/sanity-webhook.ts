import { VercelRequest, VercelResponse } from '@vercel/node'
import * as emailjs from '@emailjs/nodejs'

const emailjsConfig = {
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
    privateKey: process.env.REACT_APP_EMAILJS_PRIVATE_KEY,
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    console.log('Webhook received:', req.body)

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
            console.log('Invalid document type:', _type)
            return res.status(400).json({ message: 'Invalid document type' })
        }

        // Send email using EmailJS
        await emailjs.send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID!,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
            {
                to_email: process.env.REACT_APP_WEBSITE_OWNER_EMAIL!,
                client_email: clientEmail,
                arrival_date: arrivalDate,
                description,
                created_at: createdAt
            },
            emailjsConfig
        )

        console.log('Email sent successfully')

        // Update Sanity document
        const sanityResponse = await fetch(
            `https://${process.env.REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/production`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_SANITY_TOKEN}`
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
        console.error('Webhook error:', error)
        return res.status(500).json({
            message: 'Failed to process webhook',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }
}