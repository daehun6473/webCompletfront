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
    // search_({commit, rootState}, {...params}){
    //     commit(types.RESET_RESULT_LIST);
    //     return api
    //             .search({params})
    //             .then(res => {
    //                 const {header, body} = res;
    //                 const {code} = header;

    //                 if(code === 0){
    //                     commit(types.SET_STATE, {
    //                         key: 'resultData',
    //                         value: {
    //                             mainData: body.mainData || []
    //                         }
    //                     })
    //                 }
    //             })
    // }
search_({commit}, {...params}) {

    commit(types.RESET_RESULT_LIST);

    return api
        .search({params})
        .then(res => {

            commit(types.SET_STATE,{
                key:'resultData',
                value:{
                    mainData: res || []
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
        
    }
}