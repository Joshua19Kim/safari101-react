import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

axios.interceptors.request.use(
    config => {
        const token = '65625c3f8b386ed31a5aa3fe24422359a37326cea7618159b01d52798c0f702989a995ac860e31456b6b08995564709af3397ebc73d4db7646a0e2dc1eb5ad3bcea2a49df5ba26698418ca0549024cd2c3043011a8f8abb18423a68509d5509f51ddaf738e6f24b3309dd5d11e23c1aeaab3c3a594370d2132fe952c3bab1e9d'; // Adjust according to your auth logic
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
};

