<template>
  <div class="slide-show">
    <img v-for="tumblr in randomTumblrs" :src="randomSrc(tumblr)" :key="tumblr.id">
  </div>
</template>

<script>
import { mapState } from 'vuex'
import shuffle from 'lodash.shuffle'

export default {
  name: 'slide-show',
  computed: {
    ...mapState(['tumblrs']),
    randomTumblrs () {
      return shuffle(this.tumblrs)
    }
  },
  beforeCreate () {
    this.$store.dispatch('loadTumblrs', {})
  },
  methods: {
    randomSrc (tumblr) {
      var index = Math.floor(Math.random() * tumblr.photos.length)
      return tumblr.photos[index].original_size.url
    }
  }
}
</script>
<style lang="stylus">
@keyframes scroll
  from
    transform translate3d(0, 0, 0)

  to
    transform translate3d(-100%, 0, 0)

.slide-show
  height 50vh
  white-space nowrap
  margin 1rem 0
  // animation-duration 60s
  // animation-name scroll
  // animation-iteration-count infinite
  // animation-timing-function linear

  img
    width auto
    height 100%
    user-select none
    vertical-align bottom

</style>
