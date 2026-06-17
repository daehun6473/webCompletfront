import types from './mutation-types'
import { defaultState } from './state'
export default {
    [types.SET_STATE]:(state, {key,value}) => {
        state[key] = value;
    },

    [types.RESET_STATE](state) {
        Object.assign(
            state,
            JSON.parse(JSON.stringify(defaultState))
        )
    },

    [types.RESET_RESULT_LIST](state) {
        state.resultData = {
            mainData: []
        }
    }


}