<template>
  <div class="slide-show">
    <div class="slide-show-inner" ref="inner">
      <figure
        v-for="(tumblr, index) in tumblrs"
        :key="tumblr.id"
        >
        <template v-if="tumblr.photos && tumblr.photos[randomIndicies[index]]">
          <img :src="tumblr.photos[randomIndicies[index]].alt_sizes[0].url" @load="onLoad" @error="onLoad"/>
        </template>
        <template v-else-if="tumblr.video_url">
          <video :src="tumblr.video_url" muted autoplay loop @load="onLoad" @error="onLoad"/>
        </template>
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
      loadPromise: Promise.resolve(),
      randomIndicies: []
    }
  },
  computed: {
    ...mapState(['tumblrs']),
    timeout () {
      return 3000
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
        const tumblr = await this.$store.dispatch('loadTumblr', { offset })
        const randomFactor = tumblr.photos ? Math.floor(Math.random() * tumblr.photos.length) : 0
        this.randomIndicies.push(randomFactor)
      } catch (error) {
        if (error.message === 'Tumblr post does not include photos') {
          // eslint-disable-next-line no-console
          // console.warn(error)
          return this.loadTumblr()
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
            this.randomIndicies.shift()
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
  @media only screen and (max-width: 959px)
    margin 1rem -16px

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
    color white
    height 100%
    @media (prefers-color-scheme: dark)
      background-color yellow

    img, video
      width auto
      height 100%

</style>
