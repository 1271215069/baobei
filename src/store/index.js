import Vue from 'vue'
import Vuex from 'vuex'
import airforce from './airforce'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    airforce
  },
  strict: debug
})
