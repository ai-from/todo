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
        <div class="title">Вы уверены, что хотите удалить эту заметку?</div>
        <div class="note-name">{{ this.currentTitle }}</div>
        <div class="buttons">
          <v-button
            title="Отмена"
            icon="times"
            type="cancel"
            @btnclick="closeModal"
          />
          <v-button
              title="Да, уверен"
              icon="check"
              @btnclick="deleteNote"
          />
        </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import axios from 'axios'
import consts from '@/consts'

export default {
  name: "v-modal",
  data(){
    return {
    }
  },
  computed: {
      ...mapState({
        isModalVisible: state => state.mModal.isModalVisible,
        noteToDeleteId: state => state.mNotes.noteToDeleteId
      }),
      ...mapGetters([
          'GET_NOTE_TITLE_BY_ID'
      ]),
      currentTitle: function() {
        return this.GET_NOTE_TITLE_BY_ID(this.noteToDeleteId)
      }
  },
  methods: {
      ...mapActions([
          'SET_MODAL',
          'DELETE_NOTE_BY_ID',
          'SET_NOTE_TO_DELETE_ID'
      ]),
    closeModal(){
      this.SET_MODAL(false)
      this.SET_NOTE_TO_DELETE_ID(0)
    },
    deleteNote(){
        // delete from db.json
        axios.delete(consts.API_URL_NOTES + '/' + this.noteToDeleteId)
          .then((res) => {})
          .catch((err) => {console.log('err: ', err)})
        this.DELETE_NOTE_BY_ID(this.noteToDeleteId)
        this.SET_MODAL(false)
        if(this.$route.path !== '/'){
          this.$router.push({name: 'home'})
        }
    }
  }
}
</script>

<style lang="sass">
  .v-modal-wrapper
    position: fixed
    background: rgba($gray, .2)
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

</style>