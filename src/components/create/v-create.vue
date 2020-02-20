<template>
  <div class="v-create">

    <div class="title">{{ this.title }}</div>

    <div class="form">

      <div class="head">
        <label for="note_name">Заголовок</label>
        <input
            v-model="newNote.title"
            type="text"
            id="note_name"
            placeholder="Введите название"
        >
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
              title="Создать"
              icon="plus"
              class="create"
              @btnclick="createNote"
          />
        </div> <!-- buttons -->
      </div> <!-- content -->

    </div> <!-- form -->

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

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
  computed: {
    ...mapState({
      notes: state => state.mNotes.notes
    })
  },
  methods: {
    ...mapActions([
        'ADD_NEW_NOTE'
    ]),
    addTodo() {
      this.newNote.todos.push({name: '', checked: false})
    },
    deleteTodo(index) {
      this.newNote.todos.splice(index, 1)
    },
    refreshData(){
      this.newNote.id = null
      this.newNote.title = ''
      this.newNote.todos = [{name: '', checked: false}]
    },
    createNote(){
      if (this.newNote.title.length > 0){
        // remove empty fields
        let arr = this.newNote.todos
        this.newNote.todos.forEach(function(todo, i, arr){
          if (todo.name.length === 0){arr.splice(i, 1)}
        })

        // create id
        this.newNote.id = this.notes.length ? parseInt(this.notes[this.notes.length - 1].id) + 1 : 1

        let load = {
          id: this.newNote.id,
          title: this.newNote.title,
          todos: this.newNote.todos
        }
        this.ADD_NEW_NOTE(load)
        this.refreshData()

      }
    }
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
</style>