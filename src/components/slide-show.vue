<template>
  <div class="slide-show">
    <div class="slide-show-inner" ref="inner">
      <figure
        v-for="tumblr in tumblrs"
        :key="tumblr.id"
        :style="{ width: `${tumblrWidthBase * (tumblr.photos[0].alt_sizes[0].width / tumblr.photos[0].alt_sizes[0].height)}vh` }"
        >
        <img :src="tumblr.photos[0].alt_sizes[0].url">
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
      offsets: []
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
    this.doRemove()
  },
  methods: {
    generateOffsets () {
      this.offsets = shuffle(Array.from({ length: this.maxOffset }, (_, index) => index))
    },
    async loadTumblr () {
      try {
        if (!this.offsets.length) {
          this.generateOffsets()
        }

        const offset = this.offsets.shift()
        await this.$store.dispatch('loadTumblr', { offset })
      } catch (error) {
        if (error.message === 'Tumblr post does not include photos') {
          console.warn(error)
          await this.loadTumblr()
          return
        }

        throw error
      }
    },
    async doSlideShow () {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      if (this.$refs.inner.clientWidth > windowWidth * this.windowThresholdMultiplier) {
        return
      }

      await this.loadTumblr()
      this.$nextTick(() => {
        this.doSlideShow()
      })
    },
    doRemove () {
      setTimeout(() => {
        this.$store.commit('REMOVE_TUMBLR')
        this.doSlideShow()
        this.doRemove()
      }, this.timeout)
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
  min-height 50vh
  font-size 0

  @media (max-width: 480px)
   min-height 33vh

  .slide-show-inner
    white-space nowrap
    display inline-block

  figure
    position relative
    padding-bottom 50vh
    display inline-block
    background-color blue

    @media (max-width: 480px)
     padding-bottom 33vh

    img
      position absolute
      width 100%
      top 0
      left 0
      height 100%

</style>
