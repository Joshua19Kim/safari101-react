import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';



export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: process.env.REACT_APP_SANITY_DATASET,
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: process.env.REACT_APP_SANITY_API_VERSION,
    token: process.env.REACT_APP_SANITY_TOKEN
});

const imageBuilder = imageUrlBuilder(client);

export function getImage(source) {
    return imageBuilder.image(source);
}


export async function getAllTrips() {
    return await client.fetch('*[_type == "trip"]')
}

export async function getDocumentsByCategory(docType, category) {
    // First, let's check all documents of this type to see what we have
    console.log('Checking query parameters:', { docType, category });

    // First query to see all documents and their tripCategories
    const allDocs = await client.fetch(`
        *[_type == $docType] {
            _id,
            name,
            tripCategory
        }
    `, { docType });
    console.log('All documents:', allDocs);

    // Then try the filtered query
    const result = await client.fetch(`
        *[_type == $docType && tripCategory == $category] {
            _id,
            name,
            cost,
            tripCategory,
            duration,
            tripType,
            shortDescription,
            longDescription,
            mainImage
        }
    `, { docType, category });

    console.log('Filtered results:', result);
    return result;
}

export const sendEmail = async (tripInfo) => {
    try {
        const result = await client.create({
            _type: 'emailRequest',
            ...tripInfo,
            createdAt: new Date().toISOString().split('T')[0],
        });
        return {
            success: true,
            message: "Your request has been successfully submitted!",
            error: null
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to submit your request. Please try again."
        };
    }
};