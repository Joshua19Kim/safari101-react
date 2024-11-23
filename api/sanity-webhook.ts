import { VercelRequest, VercelResponse } from '@vercel/node'
import * as emailjs from '@emailjs/nodejs'

// Check and provide type safety for EmailJS config
interface EmailJSConfig {
    publicKey: string;
    privateKey: string;
}
console.log("Start!!!")

// Validate environment variables
const emailjsConfig: EmailJSConfig = {
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '',
    privateKey: process.env.REACT_APP_EMAILJS_PRIVATE_KEY || ''
}

// Validate required environment variables
if (!emailjsConfig.publicKey || !emailjsConfig.privateKey) {
    console.error('Missing required EmailJS configuration')
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    console.log('Request headers:', req.headers)
    console.log('Request body:', req.body)

    const webhookSecret = process.env.REACT_APP_SANITY_WEBHOOK_SECRET
    if (webhookSecret) {
        const signature = req.headers['sanity-webhook-signature']
        if (signature !== webhookSecret) {
            console.error('Invalid webhook signature')
            return res.status(401).json({ message: 'Unauthorized' })
        }
    }


    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    // Validate EmailJS configuration
    if (!emailjsConfig.publicKey || !emailjsConfig.privateKey) {
        return res.status(500).json({ message: 'EmailJS configuration is missing' })
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

        if (_type !== 'emailRequest') {
            console.log('Invalid document type:', _type)
            return res.status(400).json({ message: 'Invalid document type' })
        }

        // Validate required environment variables for EmailJS
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
        const ownerEmail = process.env.REACT_APP_WEBSITE_OWNER_EMAIL

        if (!serviceId || !templateId || !ownerEmail) {
            throw new Error('Missing required EmailJS configuration')
        }

        // Send email
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

        // Validate Sanity configuration
        const projectId = process.env.REACT_APP_SANITY_PROJECT_ID
        const token = process.env.REACT_APP_SANITY_TOKEN

        if (!projectId || !token) {
            throw new Error('Missing Sanity configuration')
        }

        // Update Sanity
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
        console.error('Webhook error:', error)
        return res.status(500).json({
            message: 'Failed to process webhook',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }
}