import { fetchDataLogin } from '../../api/loginAPI.js';
import { useUserStore } from '../../stores/userStore'; 

export const handleLogin = async (employeeCode: string, password: string) => {
    const userStore = useUserStore(); 

    if (!employeeCode || !password) {
        return { success: false, message: 'Please enter both Employee Code and Password.' };
    }

    try {
        const response = await fetchDataLogin(employeeCode, password);
        console.log(response.user, 'API response');

        if (response.message === 'Login successful') {
            userStore.setUser(response.user); 
            return { success: true, message: 'LOGIN' };
        } else {
            return { success: false, message: response.message || 'Login failed' };
        }
    } catch (error) {
        console.error('Error in handleLogin:', error.response ? error.response.data : error.message);

        const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
        return { success: false, message: errorMessage };
    }
};
