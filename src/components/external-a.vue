<template>
  <a :href="href" target="_blank" rel="noopener noreferrer">
    <slot></slot>
    <span class="sr-only"> (opens in a new tab)</span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>
