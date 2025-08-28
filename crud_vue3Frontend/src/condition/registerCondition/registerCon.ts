import { registerUser } from '../../api/registerAPI.js';

export const registrationAPI = async (data : {
    fullname: string;
    email: string;
    nominatedPassword: string;
    confirmPassword: string;
    selectedRoleObject: { id: number, role_name: string };
}) => {
    console.log(data,'data1')

    const roleId = data.selectedRoleObject.id;
    const roleName = data.selectedRoleObject.role_name;

   
    try {
        const response = await registerUser(
            data.fullname,
            data.email,
            data.nominatedPassword,
            data.confirmPassword,
            roleId
        );
        console.log('Registration response:', response);
        // return true;
    } catch (error) {
        console.error('Registration failed:', error);
        // return false; 
    }
};