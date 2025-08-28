import { softDeleteValue } from '../../api/tableRole.js'

export const softDel = async (user: any) => {
    // console.log(user,'hhhhhhhhhhhhhhh')
  try {
    const res = await softDeleteValue(user);
    console.log(res, 'res HAHHA');
    return res;
  } catch (error) {
    console.error('Error in updateTableValue:', error);
    throw error;
  }
};
