<template>
  <div class="application-layout">
    <a href="#main-content" class="sr-only skip-link">Skip to main content</a>
    <div class="application-container">
      <header class="content-container">
        <h1><router-link :to="{ name: 'home' }" @click="store.saveScrollPosition(0)">Morgan Brown</router-link> is a Software Engineer based in Athens, Greece.</h1>
        <nav aria-label="Primary Navigation">
          <ul class="nav-links">
            <li><a :href="route.name === 'home' ? '#experience' : '/#experience'">Experience</a></li>
            <li><a :href="route.name === 'home' ? '#projects' : '/#projects'">Projects</a></li>
            <li><a :href="route.name === 'home' ? '#skills' : '/#skills'">Skills</a></li>
            <li><a :href="route.name === 'home' ? '#education' : '/#education'">Education</a></li>
            <li><a :href="route.name === 'home' ? '#about' : '/#about'">About</a></li>
            <li><a :href="route.name === 'home' ? '#contact' : '/#contact'">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main id="main-content" class="content-container" tabindex="-1">
        <slot></slot>
      </main>
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

.skip-link {
  &:focus {
    position: fixed;
    top: 10px;
    left: 10px;
    background: yellow;
    color: black;
    padding: 10px 15px;
    z-index: 100;
    width: auto;
    height: auto;
    clip: auto;
    margin: 0;
    text-decoration: none;
    font-weight: bold;
    border: 2px solid blue;
  }
}
</style>
