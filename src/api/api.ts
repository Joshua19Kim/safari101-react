import axios from 'axios';


const API_URL = (process.env.REACT_APP_SANITY_API_URL as string);
// const token = (process.env.REACT_APP_STRAPI_READING_SENDING_REQUEST_TOKEN as string);
//
// axios.interceptors.request.use(
//     config => {
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => Promise.reject(error)
// );


export const getData = async (endpoint: string) => {
    try {
        const response = await axios.get(`${API_URL}${endpoint}?populate=*`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
}

export const sendEmail = async (tripInfo: TripInfo) => {
    try {
        const payload = { data: tripInfo };
        const response = await fetch(`${API_URL}/email-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        });

        const responseText = await response.text();

        if (response.ok) {
            const result = JSON.parse(responseText);
            return { success: true, message: result.message };
        } else {
            throw new Error(responseText || 'Failed to send request');
        }
    } catch (error) {
        console.error('Error sending request:', error);
        return { success: false, error: error };
    }
};