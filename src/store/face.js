export default {
    state: {
        face: {},
        faceCoord: []
    },
    mutations: {
        setFace (state, payload) {
            state.face = payload
            console.log('stateFace', state.face)
        },
        setFaceCoord (state, payload) {
            state.faceCoord = payload
            console.log('stateCoords', state.faceCoord)
        },
        clearFace (state) {
            state.face = {};
        },
        clearFaceCoord (state) {
            state.faceCoord = [];
        }
    },
    actions: {
        setFace ({commit}, payload) {
            commit('setFace', payload)
        },
        clearFace ({commit}) {
            commit('clearFace')
        },
        setFaceCoord ({commit}, payload) {
            commit('setFaceCoord', payload)
        },
        clearFace ({commit}) {
            commit('clearFaceCoord')
        }
    },
    getters: {
        getFace (state) {
            return state.face
        },
        getFaceCoord (state) {
            return state.faceCoord
        }
    }
}