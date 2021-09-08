export default {
    state: {
        dbID: null
    },
    mutations: {
        setDB (state, payload) {
            state.dbID = payload
            console.log('state db', state.dbID)
        },
    },
    actions: {
        setDB ({commit}, payload) {
            commit('setDB', payload)
        },
    },
    getters: {
        getDB (state) {
            console.log('state db', state.dbID)
            return state.dbID
        },
    }
}