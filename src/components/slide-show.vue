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

const props = withDefaults(defineProps<{
  postsPerRequest?: number
}>(), {
  postsPerRequest: 100
})

const tumblrApiKey = 'ok1dCktUCXTyOgG0vlyhxcW7oQ4lxUZl0QfZkoEiwwjvU2ZKAv'

const maxOffset = 1000
const offsets = ref<number[]>([])
const maxTumblrs = 5
let loadPromise: Promise<void> | null = Promise.resolve()
const randomIndicies = ref<number[]>([])
const tumblrs = ref<any[]>([])
const timeout = 3000

const pool = ref<any[]>([])
const isLoading = ref(false)

const generateOffsets = () => {
  const step = props.postsPerRequest
  const count = Math.floor(maxOffset / step)
  offsets.value = shuffle(Array.from({ length: count }, (_, index) => index * step))
}

const loadTumblr = async (): Promise<void> => {
  if (!loadPromise) return

  if (isLoading.value) {
    await new Promise(resolve => setTimeout(resolve, 50))
    return loadTumblr()
  }

  isLoading.value = true
  try {
    if (!pool.value.length) {
      if (!offsets.value.length) {
        generateOffsets()
      }

      const offset = offsets.value.shift() as number
      const url = `https://api.tumblr.com/v2/blog/mhgbrown.tumblr.com/likes?api_key=${tumblrApiKey}&offset=${offset}&limit=${props.postsPerRequest}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const likedPosts = data.response.liked_posts || []
      const validPosts = likedPosts.filter((post: any) => (post.photos && post.photos.length) || post.video_url)

      if (validPosts.length === 0) {
        console.warn('No valid posts found in this batch, trying another batch...')
        isLoading.value = false
        // Wait 1 second constant backoff before trying the next offset
        await new Promise(resolve => setTimeout(resolve, 1000))
        return loadTumblr()
      }

      console.log(`Loaded ${validPosts.length} valid posts from offset ${offset}. Pool size: ${validPosts.length}`)
      // Shuffle the valid posts to randomize them, and keep the whole batch in pool
      pool.value = shuffle(validPosts)
    }

    const tumblr = pool.value.shift()
    if (tumblr) {
      const randomFactor = tumblr.photos ? Math.floor(Math.random() * tumblr.photos.length) : 0
      randomIndicies.value.push(randomFactor)
      tumblrs.value.push(tumblr)
    }
  } catch (error: any) {
    console.error('Error loading tumblr post:', error)
    isLoading.value = false
    // Wait a moment before retrying to avoid tight loops on persistent errors (like CORS)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return loadTumblr()
  } finally {
    isLoading.value = false
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
