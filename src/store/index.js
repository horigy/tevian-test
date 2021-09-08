import Vue from 'vue'
import Vuex from 'vuex'

//import state modules
import face from './face'
import db from './db'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    face,
    db
  }
})