import { loadTableData } from '../../api/tableRole.js'

export const fetchTableData = async () => {
    try {
        const feth = await loadTableData()
        console.log(feth.data,'testing gumagana')
        return feth.data
    } catch (error) {
        console.error('error hahahaha ' , error)
    }
}