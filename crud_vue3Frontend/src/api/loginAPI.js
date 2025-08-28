import axios from 'axios';

export const fetchDataLogin = async (email, password) => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/loginUser/${email}/${password}`,
        });
        return response.data;
    } catch (error) {
        console.error('Error in fetchDataLogin - api_login.js:', error);
        throw error;
    }
};