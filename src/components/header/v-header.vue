<template>
  <div class="v-header">

    <div class="header_inner indent">
      <router-link class="home" exact to="/" title="На главную">TODO LIST</router-link>
      <v-button
          title="Создать заметку"
          class="create"
          @btnclick="createNote"
          v-if="showCreateBtn"
      />
    </div>

  </div> <!-- v-header -->
</template>

<script>

export default {
  name: "v-header",
  data() {
    return {
      showCreateBtn: true
    }
  },
  methods: {
    createNote() {
      if (this.$route.path !== '/create') { this.$router.push({name: 'create'}) }
    }
  },
  watch:{
    '$route'(){
      this.$route.path === '/create' ? this.showCreateBtn = false : this.showCreateBtn = true
    }
  }
}
</script>

<style lang="sass">
  .v-header
    padding: 30px 0
    .header_inner
      display: grid
      grid-template-columns: 1fr 1fr
      align-items: center
      a.home
        color: $green
        font-size: 2rem
        text-decoration: none
        font-weight: 600
        width: min-content
        white-space: nowrap
      .create
        margin-left: auto
  @media screen and (max-width: 575px)
    .v-header
      .header_inner
        grid-template-columns: unset
        grid-template-rows: repeat(2, min-content)
        justify-items: center
        grid-gap: 10px
        .create
          margin-left: unset
</style>