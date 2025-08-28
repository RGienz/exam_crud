import axios from "axios";

export const loadRoleData = async () =>  {
    try {
        const response = await axios({
            method : 'get',
            url : 'http://127.0.0.1:8000/api/loadRole'
        })
        return response
    } catch (error) {
        console.error('Error in registerUser - roleData.js:', error)
        throw error;
    }
}