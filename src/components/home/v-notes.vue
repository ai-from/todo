<template>
  <div class="v-notes">

    <template v-if="notes.length > 0">
      <div class="notes_items">
        <vNote
            v-for="(item, index) in itemsToShow"
            :key="index"
            :note="item"
        />
      </div>
      <vPagination
          :localItems="notes"
          :itemsOnPage="itemsOnPage"
          @pagechange="pageChange"
      />
    </template>

    <template v-else>
      <p class="notification">Не найдено ни одной заметки</p>
    </template>

  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'
import vNote from '@/components/home/v-note'
import vPagination from '@/components/common/v-pagination'

export default {
  name: "v-notes",
  data() {
    return {
      startFrom: 0,
      itemsOnPage: 6
    }
  },
  components: {
    vNote,
    vPagination
  },
  computed: {
    ...mapState({
      notes: state => state.mNotes.notes
    }),
    itemsToShow() {
      let arr = this.notes
      return arr.slice(this.startFrom, this.startFrom + this.itemsOnPage)
    }
  },
  methods: {
    ...mapActions([
        'UPDATE_NOTE'
    ]),
    pageChange (index){
      this.startFrom = index * this.itemsOnPage
    }
  },
  watch: {
    itemsToShow: function(){
      // for pagination
      if ( (this.notes.length > this.itemsOnPage) && (this.itemsToShow.length === 0) ) {
        this.startFrom -= this.itemsOnPage
      } else if (this.notes.length === this.itemsOnPage) {
        this.startFrom = 0
      }
    }
  }
}
</script>

<style lang="sass">
  .v-notes
    display: grid
    grid-template-rows: 1fr min-content
    height: 100%
    padding-top: 40px
    margin-bottom: 50px
    .notes_items
      display: grid
      grid-template-columns: repeat(3, min-content)
      justify-content: space-between
      grid-gap: 50px
  @media screen and (max-width: 1050px)
    .v-notes
      .notes_items
        grid-template-columns: repeat(2, min-content)
  @media screen and (max-width: 750px)
    .v-notes
      .notes_items
        grid-template-columns: min-content
        justify-content: center
</style>