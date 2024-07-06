import axios from 'axios';
import {useNavigate} from "react-router-dom";

const API_URL = 'http://localhost:1337/api';
const token = '388e41a7adcbfb76756fa06a32c084cc0f9ea451f3b15a56b307933af484c39da8a7c3c634c641c388dbbee12300b8424325dc0506b3c443a7c4494a1857d4b36862fab2382952bacef760dbb0bf979dc9860d091d38035ccff5c85ff7cf37d2788b1727f4aae678087d7fb3ea6804cfcca227d92d5de4863440f6f692d91970'; // Adjust according to your auth logic

axios.interceptors.request.use(
    config => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);


export const getData = async (endpoint: string) => {
    try {
        const response = await axios.get(`${API_URL}/${endpoint}?populate=*`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
}

export const sendEmail = async (tripInfo: TripInfo) => {
    try {
        const payload = { data: tripInfo };
        console.log('Sending payload:', JSON.stringify(payload, null, 2));

        const response = await fetch(`${API_URL}/email-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers), null, 2));

        const responseText = await response.text();
        console.log('Response body:', responseText);

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