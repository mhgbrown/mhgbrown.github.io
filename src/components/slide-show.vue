<template>
  <div class="slide-show">
    <div class="slide-show-inner" ref="inner">
      <figure
        v-for="tumblr in tumblrs"
        :key="tumblr.id"
        >
        <template v-if="tumblr._media">
          <template v-if="tumblr._media.type === 'image'">
            <img :src="tumblr._media.url" @load="onLoad" @error="onLoad"/>
          </template>
          <template v-else-if="tumblr._media.type === 'video'">
            <video :src="tumblr._media.url" muted autoplay loop playsinline @canplay="onLoad" @error="onLoad"/>
          </template>
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
const tumblrs = ref<any[]>([])
const timeout = 3000

const pool = ref<any[]>([])
const isLoading = ref(false)

const generateOffsets = () => {
  offsets.value = shuffle(Array.from({ length: maxOffset }, (_, index) => index))
}

const extractFromHtml = (html: string): { type: 'image' | 'video', url: string } | null => {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/i
  const imgMatch = html.match(imgRegex)
  if (imgMatch && imgMatch[1]) {
    return { type: 'image', url: imgMatch[1] }
  }

  const videoRegex = /<video[^>]+src=["']([^"']+)["']/i
  const videoMatch = html.match(videoRegex)
  if (videoMatch && videoMatch[1]) {
    return { type: 'video', url: videoMatch[1] }
  }

  const sourceRegex = /<source[^>]+src=["']([^"']+)["']/i
  const sourceMatch = html.match(sourceRegex)
  if (sourceMatch && sourceMatch[1]) {
    return { type: 'video', url: sourceMatch[1] }
  }

  return null
}

const extractMedia = (post: any): { type: 'image' | 'video', url: string } | null => {
  if (!post) return null

  // 1. Check legacy photos
  if (post.photos && post.photos.length) {
    const randomPhoto = post.photos[Math.floor(Math.random() * post.photos.length)]
    if (randomPhoto && randomPhoto.alt_sizes && randomPhoto.alt_sizes.length) {
      return { type: 'image', url: randomPhoto.alt_sizes[0].url }
    }
  }

  // 2. Check legacy video_url
  if (post.video_url) {
    return { type: 'video', url: post.video_url }
  }

  // 3. Check Neue Post Format (NPF) content blocks
  if (post.content && Array.isArray(post.content)) {
    for (const block of post.content) {
      if (block.type === 'image' && block.media && block.media.length) {
        return { type: 'image', url: block.media[0].url }
      }
      if (block.type === 'video' && block.media) {
        const mediaUrl = Array.isArray(block.media) ? block.media[0]?.url : block.media.url
        if (mediaUrl) {
          return { type: 'video', url: mediaUrl }
        }
      }
    }
  }

  // 4. Check reblog trail (reblog history)
  if (post.trail && Array.isArray(post.trail)) {
    for (const item of post.trail) {
      if (item.content && Array.isArray(item.content)) {
        for (const block of item.content) {
          if (block.type === 'image' && block.media && block.media.length) {
            return { type: 'image', url: block.media[0].url }
          }
          if (block.type === 'video' && block.media) {
            const mediaUrl = Array.isArray(block.media) ? block.media[0]?.url : block.media.url
            if (mediaUrl) {
              return { type: 'video', url: mediaUrl }
            }
          }
        }
      }
      if (item.body) {
        const media = extractFromHtml(item.body)
        if (media) return media
      }
    }
  }

  // 5. Check inline HTML fields (body, caption)
  if (post.body) {
    const media = extractFromHtml(post.body)
    if (media) return media
  }
  if (post.caption) {
    const media = extractFromHtml(post.caption)
    if (media) return media
  }

  return null
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
      const validPosts = likedPosts
        .map((post: any) => {
          const media = extractMedia(post)
          if (media) {
            post._media = media
          }
          return post
        })
        .filter((post: any) => !!post._media)

      if (validPosts.length === 0) {
        console.warn('No valid posts found in this batch, trying another batch...')
        isLoading.value = false
        return loadTumblr()
      }

      console.log(`Loaded ${validPosts.length} valid posts from offset ${offset}. Pool size: ${validPosts.length}`)
      // Shuffle the valid posts to randomize them, and keep the whole batch in pool
      pool.value = shuffle(validPosts)
    }

    const tumblr = pool.value.shift()
    if (tumblr) {
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
