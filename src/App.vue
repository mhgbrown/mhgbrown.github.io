<template>
  <div id="app">
    <seo-meta></seo-meta>
    <router-view :key="$route.path"/>
  </div>
</template>

<script setup lang="ts">
import SeoMeta from '@/components/seo-meta.vue'
</script>

<style lang="scss">
// Global styles can be moved here or kept in main.styl for now
</style>
