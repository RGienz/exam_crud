import axios from 'axios';

export const registerUser = async (fullname , email, nominatedPassword , confirmPassword , selectedRole ) => {
    try {
        const response = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/registerPersonnel`,
            data: {
                fullname: fullname,
                email: email,
                nominatedPassword: nominatedPassword,
                confirmPassword: confirmPassword,
                selectedRole: selectedRole,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error in registerUser - api_login.js:', error);
        throw error;
    }
};