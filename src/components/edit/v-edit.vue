<template>
  <div class="v-edit">

    <template v-if="isEditMode">
      <div class="title">{{ this.title }}</div>
      <div class="form" v-if="localNote">

        <div class="head">
          <label>Заголовок</label>
          <div class="wrap">
            <input
                v-model="localNote.title"
                type="text"
                placeholder="Введите название"
                @input="changeEndState"
            >
            <v-icon
                name="undo-alt"
                class="icon undoItem"
                title="Отменить"
                @click="undoTitle"
            />
            <v-icon
                name="redo-alt"
                class="icon redoItem"
                title="Вернуть"
                @click="redoTitle"
            />
          </div>
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
                  @input="changeEndState"
              />
              <v-icon
                  name="undo-alt"
                  class="icon undoItem"
                  title="Отменить"
                  @click="undoItem(index)"
              />
              <v-icon
                  name="redo-alt"
                  class="icon redoItem"
                  title="Вернуть"
                  @click="redoItem(index)"
              />
              <input
                  type="checkbox"
                  :checked="todo.checked"
                  v-model="todo.checked"
              />
              <v-icon
                  name="minus"
                  @click="deleteTodo(index)"
                  class="icon removeItem"
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
        <p class="notification">Заметка успешно удалена</p>
      </template>
    </template>

    <template v-else>
      <p class="notification">Выберите заметку для редактирования</p>
    </template>

  </div>
</template>

<script>
import vCreate from '@/components/create/v-create'
import {mapState, mapActions} from 'vuex'
import removeEmptyFields from '@/mixins/removeEmptyFields'
import updateDatabase from '@/mixins/updateDatabase'

export default {
  name: "v-edit",
  data() {
    return {
      title: 'Редактирование заметки',
      localNote: null
    }
  },
  mixins: [
    removeEmptyFields,
    updateDatabase
  ],
  components: {
    vCreate
  },
  computed: {
      ...mapState({
        isEditMode: state => state.mNotes.isEditMode,
        editingNote: state => state.mNotes.editingNote,
        notes: state => state.mNotes.notes,
        updateLocalNote: state => state.mModal.updateLocalNote
      })
  },
  methods: {
    ...mapActions([
        'UPDATE_NOTE',
        'SHOW_MODAL'
    ]),
    refreshEndState(){
      let parsed = JSON.stringify(this.localNote)
      localStorage.setItem('endState', parsed)
    },
    addTodo() {
      this.localNote.todos.push({name: '', checked: false})
      this.refreshEndState()
      let parsed = JSON.parse(localStorage.getItem('middleState'))
      parsed.todos.push({name: '', checked: false})
      localStorage.setItem('middleState', JSON.stringify(parsed))
    },
    deleteTodo(index) {
      this.localNote.todos.splice(index, 1)
      this.refreshEndState()
      let parsed = JSON.parse(localStorage.getItem('middleState'))
      parsed.todos.splice(index, 1)
      localStorage.setItem('middleState', JSON.stringify(parsed))
    },
    saveNote(){
      if (this.localNote.title.length > 0){
        this.removeEmptyFields(this.localNote.todos)
        this.UPDATE_NOTE(this.localNote)
        localStorage.clear()
        let parsed = JSON.stringify(this.localNote)
        localStorage.setItem('startState', parsed)
        this.updateDatabase()
        this.$router.push({name: 'home'})
      }
    },
    deleteNote(){
      this.SHOW_MODAL({mode: 'deleteNote', obj: this.localNote})
    },
    cancelChanges(){
      this.SHOW_MODAL({mode: 'cancelChanges', obj: this.localNote})
    },
    changeEndState(){
      let parsed = JSON.stringify(this.localNote)
      localStorage.setItem('endState', parsed)
    },
    undoTitle(){
      this.middleState = JSON.parse(localStorage.getItem('middleState'))
      this.localNote.title = this.middleState.title
    },
    redoTitle(){
      this.endState = JSON.parse(localStorage.getItem('endState'))
      this.localNote.title = this.endState.title
    },
    undoItem(index){
      this.middleState = JSON.parse(localStorage.getItem('middleState'))
      this.localNote.todos[index].name = this.middleState.todos[index].name
    },
    redoItem(index){
      this.endState = JSON.parse(localStorage.getItem('endState'))
      this.localNote.todos[index].name = this.endState.todos[index].name
    }
  },
  mounted(){
    this.localNote = this.editingNote
  },
  watch: {
    updateLocalNote(){
      this.localNote = JSON.parse(localStorage.getItem('startState'))
    }
  }
}
</script>

<style lang="sass" scoped>
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
        .wrap
          display: grid
          grid-template-columns: repeat(3, min-content)
          grid-gap: 8px
          align-items: center
          .icon
            cursor: pointer
          .undoItem
            color: $gray
          .redoItem
            color: $green
      .content
        .title
          font-size: 1rem
          margin-bottom: 10px
        .items
          margin-bottom: 30px
          .item
            display: grid
            grid-template-columns: repeat(5, min-content)
            grid-gap: 8px
            align-items: center
            margin-bottom: 10px
            input[type="checkbox"]
              cursor: pointer
            .icon
              cursor: pointer
            .removeItem
              color: $error
            .undoItem
              color: $gray
            .redoItem
              color: $green
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