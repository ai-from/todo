export default {
  state: {
    isEditMode: false,
    editingNote: {},
    notes: []
  },
  mutations: {
    SET_NOTES(state: any, load: any){
      state.notes = load
    },
    SET_EDIT_MODE(state: any, load: boolean){
      state.isEditMode = load
    },
    SET_EDITING_NOTE(state: any, load: any){
      state.editingNote = load
    },
    DELETE_NOTE_BY_ID(state: any, id: number){
      state.notes = state.notes.filter((item: any) => {return item.id !== id})
      state.noteToDeleteId = 0
    },
    ADD_NEW_NOTE(state: any, load: any){
      state.notes.unshift(load)
    },
    UPDATE_NOTE(state: any, load: any){
      let arr = state.notes
      state.notes.forEach((item: any, i: any, arr: any) => {
        if (item.id === load.id) {arr[i] = load}
      })
    }
  },
  actions: {
    SET_NOTES({commit}: any, load: any){
      commit('SET_NOTES', load)
    },
    SET_EDIT_MODE({commit}: any, load: boolean){
      commit('SET_EDIT_MODE', load)
    },
    SET_EDITING_NOTE({commit}: any, load: any){
      commit('SET_EDITING_NOTE', load)
    },
    DELETE_NOTE_BY_ID({commit}:any, id: number){
      commit('DELETE_NOTE_BY_ID', id)
    },
    ADD_NEW_NOTE({commit}: any, load: any){
      commit('ADD_NEW_NOTE', load)
    },
    UPDATE_NOTE({commit}: any, load: any){
      commit('UPDATE_NOTE', load)
    }
  },
  getters: {}
}