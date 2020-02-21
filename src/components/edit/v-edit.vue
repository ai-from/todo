<template>
  <div class="v-edit">

    <template v-if="isEditMode">
      <div class="title">{{ this.title }}</div>
      <div class="form" v-if="localNote">

        <div class="head">
          <label>Заголовок</label>
          <input
              v-model="localNote.title"
              type="text"
              placeholder="Введите название"
          >
        </div> <!-- head -->

        <div class="content">
          <div class="title">Планы</div>
          <div class="items">
            <div
                class="item"
                v-for="(todo, index) in localNote.todos"
                :key="index"
            >
              <input
                  type="text"
                  v-model="todo.name"
                  placeholder="Введите название"
              />
              <input
                  type="checkbox"
                  :checked="todo.checked"
                  v-model="todo.checked"
              />
              <v-icon
                  name="minus"
                  @click="deleteTodo(index)"
                  class="removeItem"
                  title="Удалить"
              />
            </div>
          </div> <!-- items -->
          <div class="buttons">
            <v-button
                title="Добавить"
                icon="plus"
                class="addTodo"
                @btnclick="addTodo"
            />
            <v-button
                title="Сохранить"
                icon="check"
                class="saveNote"
                @btnclick="saveNote"
            />
            <v-button
                title="Отмена"
                icon="times"
                class="cancelChanges"
                type="cancel"
                @btnclick="cancelChanges"
            />
            <v-button
                title="Удалить"
                icon="times"
                class="deleteNote"
                type="error"
                @btnclick="deleteNote"
            />
          </div> <!-- buttons -->
        </div> <!-- content -->

      </div> <!-- form -->
      <template v-else>
        <p>Заметка успешно удалена</p>
      </template>
    </template>

    <template v-else>
      <div>Выберите заметку для редактирования</div>
    </template>

  </div>
</template>

<script>
import vCreate from '@/components/create/v-create'
import {mapState, mapActions} from 'vuex'
import axios from 'axios'
import consts from '@/consts'
import removeEmptyFields from '@/mixins/removeEmptyFields'

export default {
  name: "v-edit",
  data() {
    return {
      title: 'Редактирование заметки',
      localNote: null
    }
  },
  mixins: [
    removeEmptyFields
  ],
  components: {
    vCreate
  },
  computed: {
      ...mapState({
        isEditMode: state => state.mNotes.isEditMode,
        editingNote: state => state.mNotes.editingNote,
        notes: state => state.mNotes.notes
      })
  },
  methods: {
    ...mapActions([
        'UPDATE_NOTE',
        'SET_NOTE_TO_DELETE_ID',
        'SET_MODAL'
    ]),
    editItemInDB(){
      axios.put(consts.API_URL_NOTES + '/' + this.localNote.id, this.localNote)
          .then((res) => {})
          .catch((err) => {console.log('err: ', err)})
    },
    addTodo() {
      this.localNote.todos.push({name: '', checked: false})
    },
    deleteTodo(index) {
      this.localNote.todos.splice(index, 1)
    },
    saveNote(){
      if (this.localNote.title.length > 0){
        // remove empty fields
        this.removeEmptyFields(this.localNote.todos)

        this.UPDATE_NOTE(this.localNote)
        localStorage.clear()
        let parsed = JSON.stringify(this.localNote);
        localStorage.setItem('startState', parsed);
        // edit db.json
        this.editItemInDB()
        this.$router.push({name: 'home'})
      }
    },
    deleteNote(){
      this.SET_MODAL(true)
      this.SET_NOTE_TO_DELETE_ID(this.localNote.id)
    },
    cancelChanges(){
      this.localNote = JSON.parse(localStorage.getItem('startState'))
      this.UPDATE_NOTE(this.localNote)
      // edit db.json
      this.editItemInDB()
    }
  },
  mounted(){
    this.localNote = this.editingNote
  }
}
</script>

<style lang="sass">
  .v-edit
    .title
      font-size: 1.3rem
      margin-bottom: 30px
    .form
      margin-bottom: 40px
      .head
        margin-bottom: 20px
        label
          display: block
          margin-bottom: 10px
      .content
        .title
          font-size: 1rem
          margin-bottom: 10px
        .items
          margin-bottom: 30px
          .item
            display: grid
            grid-template-columns: repeat(3, min-content)
            grid-gap: 8px
            align-items: center
            margin-bottom: 10px
            input[type="checkbox"]
              cursor: pointer
            .removeItem
              color: $error
              cursor: pointer
        .buttons
          display: grid
          grid-template-columns: repeat(2, min-content)
          grid-gap: 10px
          .v-button
            button
              width: 100%
  @media screen and (max-width: 400px)
    .v-edit .form .content .buttons
      grid-template-columns: repeat(2, 1fr)
</style>