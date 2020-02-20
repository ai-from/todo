export default {
  state: {
    isModalVisible: false
  },
  mutations: {
    SET_MODAL(state: any, load: boolean){
      state.isModalVisible = load
    }
  },
  actions: {
    SET_MODAL({commit}: any, load: boolean){
      commit('SET_MODAL', load)
    }
  },
  getters: {}
}