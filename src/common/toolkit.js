export default {

    $sf_objectToQueryString(params) {

        if (!params) return ''

        const queryString = new URLSearchParams(params).toString()

        return queryString ? `?${queryString}` : ''
    }

}