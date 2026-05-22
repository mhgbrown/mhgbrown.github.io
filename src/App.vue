<template>
  <div id="app">
    <seo-meta></seo-meta>
    <router-view :key="$route.path"/>
  </div>
</template>

<script setup lang="ts">
import SeoMeta from '@/components/seo-meta.vue'
import { onMounted, onUnmounted } from 'vue'
import { useResumeStore } from '@/store.ts'

const store = useResumeStore()

const onResize = () => {
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
  store.updateApp('tablet', windowWidth <= 960)
  store.updateApp('phone', windowWidth <= 480)
}

onMounted(() => {
  window.addEventListener('resize', onResize, true)
  onResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize, true)
})
</script>

<style lang="scss">
// Global styles can be moved here or kept in main.styl for now
</style>
