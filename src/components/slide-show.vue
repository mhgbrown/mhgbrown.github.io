<template>
  <div class="slide-show">
    <div class="slide-show-inner" ref="inner">
      <figure
        v-for="tumblr in tumblrs"
        :key="tumblr.id"
        >
        <img :src="tumblr.photos[Math.floor(Math.random() * tumblr.photos.length)].alt_sizes[0].url" @load="onLoad">
      </figure>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import shuffle from 'lodash.shuffle'

export default {
  name: 'slide-show',
  data () {
    return {
      maxOffset: 1000,
      offsets: [],
      maxTumblrs: 5,
      loadPromise: Promise.resolve()
    }
  },
  computed: {
    ...mapState(['tumblrs']),
    timeout () {
      return this.$store.state.app.phone ? 5000 : 2000
    },
    tumblrWidthBase () {
      return this.$store.state.app.phone ? 33 : 50
    },
    windowThresholdMultiplier () {
      return this.$store.state.app.phone ? 2.5 : 1.5
    }
  },
  mounted () {
    this.doSlideShow()
  },
  beforeDestroy () {
    this.loadPromise = null
  },
  methods: {
    generateOffsets () {
      this.offsets = shuffle(Array.from({ length: this.maxOffset }, (_, index) => index))
    },
    async loadTumblr () {
      if (!this.loadPromise) {
        return
      }

      try {
        if (!this.offsets.length) {
          this.generateOffsets()
        }

        const offset = this.offsets.shift()
        await this.$store.dispatch('loadTumblr', { offset })
      } catch (error) {
        if (error.message === 'Tumblr post does not include photos') {
          // eslint-disable-next-line no-console
          console.warn(error)
          await this.loadTumblr()
          return
        }

        throw error
      }
    },
    async doSlideShow () {
      if (!this.loadPromise) {
        return
      }

      if (this.tumblrs.length > this.maxTumblrs) {
        return
      }

      await this.loadTumblr()
      this.$nextTick(() => {
        this.doSlideShow()
      })
    },
    onLoad () {
      if (!this.loadPromise) {
        return
      }

      this.loadPromise = this.loadPromise.then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.$store.commit('REMOVE_TUMBLR')
            this.doSlideShow()
            resolve()
          }, this.timeout)
        })
      })
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
  margin 1rem 0
  font-size 0
  height 0
  padding-bottom 56.5%
  position relative

  .slide-show-inner
    white-space nowrap
    position absolute
    top 0
    left 0
    width 100%
    height 100%

  figure
    background-color blue
    display inline-block
    vertical-align top
    width auto !important
    height 100%

    img
      width auto
      height 100%

</style>
