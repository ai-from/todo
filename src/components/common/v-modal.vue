<template>
  <div
      class="v-modal-wrapper"
      v-if="isModalVisible"
      @click.self="closeModal"
  >
    <div class="v-modal">
        <v-icon
            class="close"
            name="times"
            @click="closeModal"
        />

        <div class="title">
          {{ this.currentMode.title }}
        </div>

        <div class="note-name">{{ this.workingNote.title }}</div>

        <div class="buttons">
          <v-button
              :title = btnCancel.title
              :icon = btnCancel.icon
              :type = btnCancel.type
              @btnclick = btnCancel.event
          />
          <v-button
              :title = currentMode.button.title
              :icon = currentMode.button.icon
              :type = currentMode.button.type
              @btnclick = currentMode.button.event
          />
        </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import updateDatabase from '@/mixins/updateDatabase'

export default {
  name: "v-modal",
  data(){
    return {
      localNote: null,
      btnCancel: {title: 'Нет', icon: 'times', type: 'cancel', event: this.closeModal},
      modalMode: {
        deleteMode: {
          title: 'Вы уверены, что хотите удалить эту заметку?',
          button: {title: 'Да', icon: 'check', type: '', event: this.deleteNote}
        },
        cancelMode: {
          title: 'Отменить изменения для текущей заметки?',
          button: {title: 'Да', icon: 'check', type: '', event: this.cancelChanges}
        }
      }
    }
  },
  mixins: [
    updateDatabase
  ],
  computed: {
      ...mapState({
        isModalVisible: state => state.mModal.isModalVisible,
        notes: state => state.mNotes.notes,
        workingNote: state => state.mModal.workingNote,
        mode: state => state.mModal.modalMode
      }),
      deleteMode(){
        return this.mode === 'deleteNote' ? true : false
      },
      currentMode(){
        if (this.mode === 'deleteNote'){
          return this.modalMode.deleteMode
        } else{
          return this.modalMode.cancelMode
        }
      }
  },
  methods: {
      ...mapActions([
          'CLOSE_MODAL',
          'DELETE_NOTE_BY_ID',
          'UPDATE_NOTE',
          'UPDATE_LOCAL_NOTE'
      ]),
    closeModal(){
      this.CLOSE_MODAL()
    },
    deleteNote(){
        this.DELETE_NOTE_BY_ID(this.workingNote.id)
        this.updateDatabase()
        this.CLOSE_MODAL()
        if (this.$route.path !== '/') { this.$router.push({name: 'home'}) }
    },
    cancelChanges(){
      this.localNote = JSON.parse(localStorage.getItem('startState'))
      this.UPDATE_NOTE(this.localNote)
      this.UPDATE_LOCAL_NOTE()
      this.CLOSE_MODAL()
      this.updateDatabase()
    }
  }
}
</script>

<style lang="sass" scoped>
  .v-modal-wrapper
    position: fixed
    background: rgba($gray, .5)
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: grid
    .v-modal
      margin: auto
      padding: 20px 30px
      border-radius: 10px
      background: $white
      position: relative
      width: 400px
      .close
        color: $error
        top: 10px
        right: 10px
        position: absolute
        cursor: pointer
      .title
        margin: 20px 0
        text-align: center
      .note-name
        color: $green
        font-weight: 600
        text-align: center
        margin-bottom: 40px
      .buttons
        display: grid
        grid-template-columns: 1fr 1fr
        grid-gap: 30px
        .v-button
          display: grid

  @media screen and (max-width: 450px)
    .v-modal-wrapper
      padding: 8px
      .v-modal
        width: 100%
        padding: 10px 10px 20px
        .buttons
          grid-gap: 10px
</style>