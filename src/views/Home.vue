<template>
  <div class="home indent">
    <vNotes />
  </div>
</template>

<script>
import vNotes from '@/components/home/v-notes'

export default {
  name: 'Home',
  components: {
    vNotes
  },
  mounted(){
    localStorage.clear()
  }
}
</script>

<style lang="sass">
  .home
    .create
      margin-bottom: 40px
</style>
