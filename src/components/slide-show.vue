<template>
  <div class="slide-show">
    <div class="slide-show-inner" ref="inner">
      <figure
        v-for="tumblr in tumblrs"
        :key="tumblr.id"
        :style="{ width: `${50 * (tumblr.photos[0].alt_sizes[0].width / tumblr.photos[0].alt_sizes[0].height)}vh` }"
        >
        <img :src="randomSrc(tumblr)">
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
      timeout: 1000
    }
  },
  computed: {
    ...mapState(['tumblrs'])
  },
  async mounted () {
    await this.doSlideShow()
    this.doRemove()
  },
  methods: {
    randomSrc (tumblr) {
      var index = Math.floor(Math.random() * tumblr.photos.length)
      return tumblr.photos[0].alt_sizes[0].url
    },
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
          this.loadTumblr()
          return
        }

        throw error
      }
    },
    async doSlideShow () {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      if (this.$refs.inner.clientWidth > windowWidth) {
        return
      }

      await this.loadTumblr()
      this.$nextTick(async () => {
        await this.doSlideShow()
      })
    },
    doRemove () {
      setTimeout(async () => {
        this.$store.commit('REMOVE_TUMBLR')
        await this.doSlideShow()
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

  .slide-show-inner
    white-space nowrap
    display inline-block

  figure
    position relative
    padding-bottom 50vh
    display inline-block
    background-color blue

    img
      position absolute
      width 100%
      top 0
      left 0
      height 100%

</style>
