<template>
  <div class="v-note">
    <v-icon
        name="times"
        class="delete"
        title="Удалить"
        @click="deleteNote"
    />
    <div class="inner">
      <div class="title">{{ this.note.title }}</div>
      <div class="todos">

        <template v-if="slicedTodos.length">
          <div
            class="todo"
            v-for="(todo, index) in slicedTodos"
            :key="index"
          >
            <label
                class="name"
                :for="`todo_id_${note.id}_${index}`"
            >
              {{ todo.name }}
            </label>
            <input
                :id="`todo_id_${note.id}_${index}`"
                type="checkbox"
                :checked="todo.checked"
                disabled="false"
            >
          </div>
        </template>
        
        <template v-else>
          No notes
        </template>

      </div> <!-- todos -->

      <v-button
        title="Редактировать"
        icon="pencil-alt"
        @btnclick="editNote"
      />

    </div> <!-- inner -->
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "v-note",
  data() {
    return {
      maxItemsInTodos: Infinity
    }
  },
  props: {
    note: {
      type: Object,
      default: {}
    }
  },
  computed: {
      slicedTodos() {
        return this.note.todos.slice(0, this.maxItemsInTodos)
      }
  },
  methods: {
    ...mapActions([
        'SET_EDIT_MODE',
        'SET_EDITING_NOTE',
        'SHOW_MODAL'
    ]),
    editNote(){
      this.$router.push({name: 'edit'})
      this.SET_EDIT_MODE(true)
      this.SET_EDITING_NOTE(this.note)
      let parsed = JSON.stringify(this.note)
      localStorage.setItem('startState', parsed)
      localStorage.setItem('middleState', parsed)
      localStorage.setItem('endState', parsed)
    },
    deleteNote(){
        this.SHOW_MODAL({mode: 'deleteNote', obj: this.note})
    }
  }
}
</script>

<style lang="sass" scoped>
  .v-note
    padding: 20px 30px
    border: 1px solid $gray
    width: 280px
    border-radius: 10px
    position: relative
    height: min-content
    .delete
      position: absolute
      top: 10px
      right: 10px
      color: $error
      cursor: pointer
    .inner
      .title
        white-space: nowrap
        margin-bottom: 20px
        border-bottom: 1px solid $gray
        padding: 0 0 8px
        overflow: hidden
        text-overflow: ellipsis
      .todos
        margin-bottom: 20px
        height: 150px
        min-height: 150px
        max-height: 150px
        overflow: auto
        .todo
          display: grid
          grid-template-columns: 1fr min-content
          grid-gap: 10px
          margin-bottom: 8px
          .name
            max-width: 100%
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
      .v-button
        button
          width: 100%


</style>