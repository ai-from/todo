import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import mNotes from './modules/mNotes'
import mModal from './modules/mModal'

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    mNotes,
    mModal
  }
})
