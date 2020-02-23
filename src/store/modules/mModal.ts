export default {
  state: {
    isModalVisible: false,
    modalMode: '',
    workingNote: {},
    updateLocalNote: false
  },
  mutations: {
    SHOW_MODAL(state: any, load: {mode: string, obj: Object}){
      state.isModalVisible = true
      state.modalMode = load.mode
      state.workingNote = load.obj
    },
    CLOSE_MODAL(state: any){
      state.isModalVisible = false
    },
    UPDATE_LOCAL_NOTE(state: any){
      state.updateLocalNote = !state.updateLocalNote
    }
  },
  actions: {
    SHOW_MODAL({commit}: any, load: {mode: string, obj: Object}){
      commit('SHOW_MODAL', load)
    },
    CLOSE_MODAL({commit}: any){
      commit('CLOSE_MODAL')
    },
    UPDATE_LOCAL_NOTE({commit}: any){
      commit('UPDATE_LOCAL_NOTE')
    }
  },
  getters: {}
}