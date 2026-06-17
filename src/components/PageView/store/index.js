import { createStore } from 'vuex'

import actions from './action'
import mutations from './mutation'
import getters from './getter'
import state from './state'

export default createStore({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
});