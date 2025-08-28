import axios from "axios";

export const loadTableData = async () =>  {
    try {
        const response = await axios({
            method : 'get',
            url : 'http://127.0.0.1:8000/api/tableRole'
        })
        return response
    } catch (error) {
        console.error('Error in registerUser - tableRole.js:', error)
        throw error;
    }
}