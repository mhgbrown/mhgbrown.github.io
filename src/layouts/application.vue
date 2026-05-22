<template>
  <div class="application-layout">
    <div class="application-container">
      <div class="content-container">
        <h1><router-link :to="{ name: 'home' }">Morgan Brown</router-link> is a Software Engineer based in Athens, Greece.</h1>
        <ul class="nav-links">
          <li><a target="_blank" href="http://github.com/mhgbrown">Code</a></li>
          <li><a target="_blank" href="http://instagram.com/mhgbrown">Photos</a></li>
          <li><a target="_blank" href="http://soundcloud.com/mhgbrown/likes">Music</a></li>
          <li><a href="https://blog.mhgbrown.is">Writing</a></li>
          <li><a target="_blank" href="http://www.linkedin.com/in/mhgbrown">Resume</a></li>
          <li><a target="_blank" href="mailto:inbox@email.mhgbrown.is">Contact</a></li>
        </ul>
      </div>
      <div class="content-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResumeStore } from '@/store.ts'
import { storeToRefs } from 'pinia'

const store = useResumeStore()
const { projects } = storeToRefs(store)
</script>

<style lang="scss">
.projects-list {
  margin-bottom: 1rem;
}
</style>
