import axios from 'axios';
import {useNavigate} from "react-router-dom";

const API_URL = 'http://localhost:1337/api';
const token = '1136c14d3f92dc6cd15f01c55e9caf9b28a8fa33c38ab18c53669f782c161ad15e86c3783f6bc52291f1ec962dc32fb29e133bfe9a51a5ba803b4ff5fe38eea1cb480829e8a6ae8b483b49ae96432e2d126aa4f96106b788240e7b8d36c8466b5f214d12320fdbcadd7a5d08258a895d430f62c459949a4b541f142c3540dd51'; // Adjust according to your auth logic

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
                'Authorization': `Bearer ${token}`
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