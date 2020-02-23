<template>
  <div class="v-create">

    <div class="title">{{ this.title }}</div>

    <div class="form">

      <div class="head">
        <label>Заголовок</label>
        <div class="wrap">
          <input
              v-model="newNote.title"
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
              v-for="(todo, index) in newNote.todos"
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
              title="Создать"
              icon="plus"
              class="create"
              @btnclick="createNote"
          />
          <v-button
              title="Очистить"
              icon="times"
              class="cleanChanges"
              type="cancel"
              @btnclick="cleanChanges"
          />
        </div> <!-- buttons -->
      </div> <!-- content -->

    </div> <!-- form -->

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import removeEmptyFields from '@/mixins/removeEmptyFields'
import updateDatabase from '@/mixins/updateDatabase'

export default {
  name: "v-create",
  data() {
    return {
      title: 'Создание новой заметки',
      newNote: {
        id: null,
        title: '',
        todos: [
          {name: '', checked: false}
        ]
      }
    }
  },
  mixins: [
    removeEmptyFields,
    updateDatabase
  ],
  computed: {
    ...mapState({
      notes: state => state.mNotes.notes
    })
  },
  methods: {
    ...mapActions([
        'ADD_NEW_NOTE'
    ]),
    refreshEndState(){
      let parsed = JSON.stringify(this.newNote)
      localStorage.setItem('endState', parsed)
    },
    addTodo() {
      this.newNote.todos.push({name: '', checked: false})
      this.refreshEndState()
    },
    deleteTodo(index) {
      this.newNote.todos.splice(index, 1)
      this.refreshEndState()
    },
    refreshData(){
      this.newNote.id = null
      this.newNote.title = ''
      this.newNote.todos = [{name: '', checked: false}]
    },
    createNote(){
      if (this.newNote.title.length > 0){
        this.removeEmptyFields(this.newNote.todos)

        // create id
        let id = 1
        for(let i = 0; i < this.notes.length; i++){
          if(this.notes[i].id === id){
            id++
            i = -1
          }
        }
        this.newNote.id = id

        let load = {
          id: this.newNote.id,
          title: this.newNote.title,
          todos: this.newNote.todos
        }
        this.ADD_NEW_NOTE(load)
        this.refreshData()
        this.updateDatabase()
        this.$router.push({name: 'home'})
      }
    },
    changeEndState(){
      let parsed = JSON.stringify(this.newNote)
      localStorage.setItem('endState', parsed)
    },
    undoTitle(){
      this.newNote.title = ''
    },
    redoTitle(){
      this.endState = JSON.parse(localStorage.getItem('endState'))
      this.newNote.title = this.endState.title
    },
    undoItem(index){
      this.newNote.todos[index].name = ''
    },
    redoItem(index){
      this.endState = JSON.parse(localStorage.getItem('endState'))
      this.newNote.todos[index].name = this.endState.todos[index].name
    },
    cleanChanges(){
      this.refreshData()
    }
  },
  mounted(){
    this.refreshEndState()
  }
}
</script>

<style lang="sass">
  .v-create
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
  @media screen and (max-width: 400px)
    .v-create .form .content .buttons
      grid-template-columns: repeat(2, 1fr)
</style>