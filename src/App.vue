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

export default {
  components: {
    vHeader,
    vFooter,
    vModal
  }
}
</script>

<style lang="sass">

</style>
