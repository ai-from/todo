<template>
  <div
      class="v-pagination"
      v-if="isPaginationShow"
  >
    <div class="inner_wrapper">

      <div
          class="btn btnLeft"
          v-if="isArrowShow"
      >
        <v-icon
            name="chevron-left"
            @click="arrowLeft"
        />
      </div>

      <div
          class="items"
          :class="classNames"
      >
        <div
            class="items_wrapper"
            ref="btnItems"
        >
          <div class="item"
               v-for="(item, index) in arrayButtons"
               :class="{active: item.name == activePage}"
               :key="index"
               @click="changePage(index)"
          >
            {{ item.name }}
          </div>
        </div> <!-- inner_wrapper -->
      </div> <!-- items -->

      <div
          class="btn btnRight"
          v-if="isArrowShow"
      >
        <v-icon
            name="chevron-right"
            @click="arrowRight"
        />
      </div>

    </div> <!-- inner_wrapper -->
  </div>
</template>

<script>
  export default {
    name: "v-pagination",
    data () {
      return {
        buttonsToShow: 4,
        activePage: 1,
        buttonsPosition: 0
      }
    },
    props: {
      itemsOnPage: {
        type: Number,
        default: 6
      },
      localItems: {
        type: null,
        default: null
      },
      isFirstPage: {
        type: Boolean,
        default: false
      },
      isNothingFound: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classNames() {
        return {
          'four': this.arrayButtons.length === 4,
          'three': this.arrayButtons.length === 3,
          'two': this.arrayButtons.length === 2,
          'one': this.arrayButtons.length === 1,
          'more': this.arrayButtons.length > 4
        }
      },
      isPaginationShow(){
        return this.arrayButtons.length > 1 && !this.isNothingFound ? true: false
      },
      isArrowShow(){
        return this.arrayButtons.length > this.buttonsToShow ? true : false
      },
      arrayButtons() {
        var quantity = 0
        if (this.localItems.length % this.itemsOnPage > 0) {
          quantity = Math.floor(this.localItems.length / this.itemsOnPage) + 1
        } else {
          quantity = this.localItems.length / this.itemsOnPage
        }
        var arr = []
        for (var i = 0; i < quantity; i++){
          arr.push({'name': i+1})
        }
        return arr
      }
    },
    methods: {
      changePage(index) {
        this.activePage = index + 1
        this.$emit('pagechange', index)
      },
      arrowLeft(){
        if(this.buttonsPosition < 0){
          this.buttonsPosition += 40
          this.$refs.btnItems.style.left = this.buttonsPosition + 'px'
        }
      },
      arrowRight(){
        if(this.buttonsPosition > (this.arrayButtons.length - this.buttonsToShow) * -40){
          this.buttonsPosition -= 40
          this.$refs.btnItems.style.left = this.buttonsPosition + 'px'
        }
      }
    },
    watch: {
      isFirstPage(newVal, oldVal){
        if (newVal !== oldVal){
          this.changePage(0)
        }
      },
      localItems(){
        if ( (this.localItems.length % this.itemsOnPage) === 0)
          this.activePage--
      }
    }
  }
</script>

<style lang="sass" scoped>
  .v-pagination
    display: grid
    justify-items: center
    margin: 30px 0
    .inner_wrapper
      display: grid
      grid-template-columns: repeat(3, min-content)
      .items
        display: grid
        max-width: 158px
        overflow: hidden
        &.four .items_wrapper
          grid-template-columns: repeat(4, min-content)
        &.three .items_wrapper
          grid-template-columns: repeat(3, min-content)
        &.two .items_wrapper
          grid-template-columns: repeat(2, min-content)
        &.one .items_wrapper
          grid-template-columns: min-content
        &.more
          max-width: 150px
          .items_wrapper
            grid-auto-flow: column
        .items_wrapper
          display: grid
          grid-gap: 10px
          position: relative
          left: 0
          .item
            padding: 5px 0
            width: 30px
            border: 1px solid gray
            cursor: pointer
            display: grid
            justify-items: center
            &:hover
              background: rgba(0, 0, 0, .1)
            &.active
              background: $green
              border-color: $green
              color: white
      .btn
        display: grid
        padding: 0 10px
        svg
          margin: auto
          color: $gray
          cursor: pointer
</style>