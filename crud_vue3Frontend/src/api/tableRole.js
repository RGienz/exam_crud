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

export const updateDataHomeTable = async (user) => {
    console.log(user,'useruser')
  try {
    const response = await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/updateUserTable',
      data: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role_id: user.role_id,
        description: user.description,
        user_authorize_id: user.user_authorize_id,
        roles_Con_id: user.roles_Con_id,
      }
    });
    return response;
  } catch (error) {
    console.error('Error in updateDataHomeTable - tableRole.js:', error);
    throw error;
  }
};