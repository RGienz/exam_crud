import { loadRoleData } from '../../api/roleData.js'

export const fetchRoleAssigned = async () => {
    try {
        const fetchR = await loadRoleData()
        // console.log(fetchR,'fetchR')
        return fetchR
    } catch (error) {
        console.error('Error in handleLogin:', error);
        return []
    }
}