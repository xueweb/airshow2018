import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import mutations from "./mutations"
import * as getters from "./getters"
import createLogger from 'vuex/dist/logger'

const debug = process.env.NODE_DEV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})



