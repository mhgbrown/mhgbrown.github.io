<template>
  <div class="application-layout georgia-premium-text">
    <a href="#main-content" class="sr-only skip-link">Skip to main content</a>
    <div class="application-container">
      <header class="content-container">
        <h1><router-link :to="{ name: 'home' }" @click="store.saveScrollPosition(0)">Morgan Brown</router-link> is a Software Engineer based in Athens, Greece.</h1>
        <nav aria-label="Primary Navigation">
          <ul class="nav-links">
            <li v-for="item in navItems" :key="item.id">
              <a :href="getHref(item.id)">{{ item.label }}</a>
            </li>
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
import { useRoute } from 'vue-router'

const store = useResumeStore()
const route = useRoute()

const navItems = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
]

const getHref = (id: string) => route.name === 'home' ? `#${id}` : `/#${id}`
</script>

<style lang="scss">
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
