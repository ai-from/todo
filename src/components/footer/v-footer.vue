<template>
  <div class="v-footer">
    <div class="footer_inner indent">
      <p>TODO LIST, {{ currentYear }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-footer",
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="sass">
  .v-footer
    background: $gray
    padding: 30px 0
    color: rgba($white, .7)
</style>