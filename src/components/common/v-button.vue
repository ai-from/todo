<template>
  <div class="v-button">
    <div
        class="button"
        @click="btnClick"
        :class="classNames"
    >
      <div class="inner_wrap">
        <span>{{ title }}</span>
        <v-icon
            :name="icon"
            scale=".7"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-button",
  props: {
    title: {
      type: String,
      default: 'Название кнопки'
    },
    icon: {
      type: String,
      default: 'plus'
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    btnClick(){
      this.$emit('btnclick')
    }
  },
  computed: {
    classNames(){
      return {
        'cancel': this.type === 'cancel',
        'error': this.type === 'error'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .v-button
    .button
      border: none
      color: white
      background: $green
      padding: 10px 30px
      cursor: pointer
      outline: none
      border-radius: 5px
      &:hover
        background: $greenLight
      &:active
        background: $gray
      .inner_wrap
        display: grid
        grid-template-columns: min-content min-content
        justify-content: center
        grid-gap: 10px
        align-items: center
        white-space: nowrap
      &.cancel
        background: $gray
        &:hover
          background: $grayLight
        &:active
          background: $dark
      &.error
        background: $error
        &:hover
          background: $errorLight
        &:active
          background: $errorDark
  @media screen and (max-width: 400px)
    .v-button
      .button
        padding: 10px 20px
        width: 100%
</style>