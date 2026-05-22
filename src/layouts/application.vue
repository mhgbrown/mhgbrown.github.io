<template>
  <div class="application-layout">
    <div class="application-container">
      <div class="content-container">
        <h1><router-link :to="{ name: 'home' }">Morgan Brown</router-link> is a Software Engineer based in Athens, Greece.</h1>
        <ul class="nav-links">
          <li><a :href="route.name === 'home' ? '#experience' : '/#experience'">Experience</a></li>
          <li><a :href="route.name === 'home' ? '#projects' : '/#projects'">Projects</a></li>
          <li><a :href="route.name === 'home' ? '#skills' : '/#skills'">Skills</a></li>
          <li><a :href="route.name === 'home' ? '#education' : '/#education'">Education</a></li>
          <li><a :href="route.name === 'home' ? '#about' : '/#about'">About</a></li>
          <li><a :href="route.name === 'home' ? '#contact' : '/#contact'">Contact</a></li>
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
import { useRoute } from 'vue-router'

const store = useResumeStore()
const { projects } = storeToRefs(store)
const route = useRoute()
</script>

<style lang="scss">
.projects-list {
  margin-bottom: 1rem;
}
</style>
