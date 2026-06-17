import client from './client'
import toolkit from '../../../../common/toolkit'
const BASE_URL = '/api'

export default {
    search: ({params}) => {
    const queryParams =
        toolkit.$sf_objectToQueryString({
            ...params
        })
    return client
        .get(`/books${queryParams}`)
        .then(response => response.data)
    },
    searchBookDetail: ({params}) => {
        const queryParams = toolkit.$sf_objectToQueryString({...params})
        return client
            .get(`/bookDetail${queryParams}`)
            .then(response => response.data)
    },
    insertBook(params) {
    return client
        .post('/insertBook', params)
        .then(response =>
            response.data
        )
        .catch(error => {
            console.error('[insertBook api error]', error)
            throw error
        })
}

}