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
          <video :src="tumblr.video_url" muted autoplay loop playsinline @canplay="onLoad" @error="onLoad"/>
        </template>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import shuffle from 'lodash.shuffle'

const tumblrApiKey = 'ok1dCktUCXTyOgG0vlyhxcW7oQ4lxUZl0QfZkoEiwwjvU2ZKAv'

const maxOffset = 1000
const offsets = ref<number[]>([])
const maxTumblrs = 5
let loadPromise: Promise<void> | null = Promise.resolve()
const randomIndicies = ref<number[]>([])
const tumblrs = ref<any[]>([])
const timeout = 3000

const generateOffsets = () => {
  offsets.value = shuffle(Array.from({ length: maxOffset }, (_, index) => index))
}

const loadTumblr = async (): Promise<void> => {
  if (!loadPromise) return

  try {
    if (!offsets.value.length) {
      generateOffsets()
    }

    const offset = offsets.value.shift() as number
    const url = `https://api.tumblr.com/v2/blog/mhgbrown.tumblr.com/likes?api_key=${tumblrApiKey}&offset=${offset}&limit=1`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const tumblr = data.response.liked_posts.find((post: any) => post.photos && post.photos.length) ||
                   data.response.liked_posts.find((post: any) => !!post.video_url)

    if (!tumblr) {
      throw new Error('Tumblr post does not include photos')
    }

    const randomFactor = tumblr.photos ? Math.floor(Math.random() * tumblr.photos.length) : 0
    randomIndicies.value.push(randomFactor)
    tumblrs.value.push(tumblr)
  } catch (error: any) {
    if (error.message === 'Tumblr post does not include photos') {
      return loadTumblr()
    }
    throw error
  }
}

const doSlideShow = async () => {
  if (!loadPromise) return

  if (tumblrs.value.length > maxTumblrs) {
    return
  }

  await loadTumblr()
  nextTick(() => {
    doSlideShow()
  })
}

const onLoad = () => {
  if (!loadPromise) return

  loadPromise = loadPromise.then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        tumblrs.value.shift()
        randomIndicies.value.shift()
        doSlideShow()
        resolve()
      }, timeout)
    })
  })
}

onMounted(() => {
  doSlideShow()
})

onBeforeUnmount(() => {
  loadPromise = null
})
</script>

<style lang="scss">
@keyframes scroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

.slide-show {
  margin: 1rem -24px;
  font-size: 0;
  height: 0;
  padding-bottom: 56.5%;
  position: relative;
  width: 100vw;

  @media only screen and (max-width: 959px) {
    margin: 1rem -16px;
    width: calc(100% + 32px);
    left: auto;
    right: auto;
    margin-left: -16px;
    margin-right: -16px;
  }

  .slide-show-inner {
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  figure {
    background-color: blue;
    display: inline-block;
    vertical-align: top;
    width: auto !important;
    color: white;
    height: 100%;

    @media (prefers-color-scheme: dark) {
      background-color: yellow;
    }

    img, video {
      width: auto;
      height: 100%;
    }
  }
}
</style>
