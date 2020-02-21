<template>
  <div class="edit indent">
    <vEdit />
  </div>
</template>

<script>
import vEdit from '@/components/edit/v-edit'
import {mapActions} from 'vuex'

export default {
  name: "Edit",
  components: {
    vEdit
  },
  methods: {
    ...mapActions([
        'UPDATE_NOTE'
    ])
  },
  beforeRouteLeave(to, from, next){
    let item = JSON.parse(localStorage.getItem('startState'))
    this.UPDATE_NOTE(item)
    next()
  }
}
</script>

<style lang="sass">

</style>