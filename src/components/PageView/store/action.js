import api from './api'
import types from './mutation-types'
import state from './state'

export default{
    setState_({commit},{key, value}){
        commit(types.SET_STATE, {key, value});
    },

    resetState_({commit}){
        commit(types.RESET_STATE);
    },
    search_({commit}, {...params}) {

        commit(types.RESET_RESULT_LIST);
        console.log(params);
        
        return api
            .search({params})
            .then(res => {
                console.log(res);
                
                commit(types.SET_STATE,{
                    key:'resultData',
                    value:{
                        mainData: res.books || [],
                        totalCount: res.totalCount
                    }
                })

            })
    },

    searchBookDetail_({commit}, {...params}){
        commit(types.RESET_RESULT_LIST);
        console.log({params});
        
        return api
                .searchBookDetail({params})
                .then(res => {
                    console.log(res);
                    
                    commit(types.SET_STATE,{
                        key: 'resultDetail',
                        value: {
                            detailData: res[0] || []
                        }
                    })

                    commit(types.SET_STATE, {
                        key: 'modal',
                        value: {
                            isOpen: true
                        }
                    })
                })
        
    },

    insertBook_({commit, dispatch}, {...params}){
        console.log({params});

        return api
                .insertBook(params)
                .then(() => {
                    alert('자료가 등록완료 되었습니다!')
                    dispatch('search_', {
                        bookNm: ''
                    })
                })
                .catch(error => {
                    console.error('[error]', error);
                    alert('자료 등록 실패 입니다.')

                    throw error;
                })
        
    },

    delete_({commit, dispatch}, {...params}){
        console.log({params});

        return api
                .deleteBook(params)
                .then(() => {
                    alert('자료가 삭제 되었습니다.')

                    commit(types.SET_STATE, {
                        key: 'modal',
                        value: {
                            isOpen: false
                        }
                    })

                    dispatch('search_', {
                        bookNm: ''
                    })
                })
                .catch(error => {
                    console.error('[error]', error);
                    alert('자료 삭제 실패 입니다.')

                    throw error;
                })
        
    },
    update_({commit, dispatch}, {...params}){
        console.log({params});

        return api
                .updateBook(params)
                .then(() => {
                    alert('자료가 수정 되었습니다.')

                    commit(types.SET_STATE, {
                        key: 'modal',
                        value: {
                            isOpen: false
                        }
                    })

                    dispatch('search_', {
                        bookNm: ''
                    })
                })
                .catch(error => {
                    console.error('[error]', error);
                    alert('자료 수정 실패 입니다.')

                    throw error;
                })
        
    }
}