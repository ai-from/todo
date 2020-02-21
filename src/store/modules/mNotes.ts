export default {
  state: {
    editingNote: {},
    isEditMode: false,
    noteToDeleteId: 0,
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
    SET_NOTE_TO_DELETE_ID(state: any, load: number){
      state.noteToDeleteId = load
    },
    DELETE_NOTE_BY_ID(state: any, id: number){
      state.notes = state.notes.filter((item: any) => {return item.id !== id})
      state.noteToDeleteId = 0
    },
    ADD_NEW_NOTE(state: any, load: any){
      state.notes.push(load)
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
    SET_NOTE_TO_DELETE_ID({commit}: any, load: number){
      commit('SET_NOTE_TO_DELETE_ID', load)
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
  getters: {
    GET_NOTE_TITLE_BY_ID: (state: any) => (id: number) => {
      let arr = state.notes.filter((item: any) => {return item.id === id})
      return arr[0].title
    }
  }
}