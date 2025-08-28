import { updateDataHomeTable } from '../../api/tableRole.js'

export const updateTableValue = async (user: any) => {
  try {
    const res = await updateDataHomeTable(user);
    console.log(res, 'res');
    return res;
  } catch (error) {
    console.error('Error in updateTableValue:', error);
    throw error;
  }
};
