<template>
  <div id="app">
    <vHeader />
    <router-view/>
    <vFooter />
    <vModal />
  </div>
</template>

<script>
import vHeader from './components/header/v-header'
import vFooter from './components/footer/v-footer'
import vModal from './components/common/v-modal'
import {mapActions} from 'vuex'
import axios from 'axios'
import consts from './consts'

export default {
  components: {
    vHeader,
    vFooter,
    vModal
  },
  methods: {
    ...mapActions(['SET_NOTES']),
    getNotesByAPI(){
      axios.get(consts.API_URL_NOTES)
           .then((notes) => {this.SET_NOTES(notes.data)})
           .catch((error) => {console.log(error)})
    }
  },
  created(){
    this.getNotesByAPI()
  }
}
</script>

<style lang="sass">

</style>
