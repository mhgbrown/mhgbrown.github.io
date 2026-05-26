<script setup lang="ts">
import { useResumeStore } from '@/store.ts'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead, useSeoMeta } from '@unhead/vue'

const store = useResumeStore()
const route = useRoute()

const seoData = computed(() => {
  const baseTitle = store.resume.basics?.name || "Morgan Brown"
  const baseDescription = store.resume.basics?.summary?.substring(0, 160) || "Portfolio and resume of Morgan Brown."
  const baseOgImage = "https://mhgbrown.is/images/me-og.jpg"
  const baseTwitterImage = "https://mhgbrown.is/images/me-twitter.jpg"

  let title = baseTitle
  let description = baseDescription
  let ogImageSrc = baseOgImage
  let twitterImageSrc = baseTwitterImage

  if (route.name === 'project' && route.params.id) {
    const project = store.findProjectById(route.params.id as string)
    if (project) {
      title = `${project.name} | ${baseTitle}`
      if (project.description) {
        description = project.description.substring(0, 160)
      }
      if (project.preview && (project.preview.endsWith('.jpg') || project.preview.endsWith('.png'))) {
        ogImageSrc = `https://mhgbrown.is${project.preview}`
        twitterImageSrc = `https://mhgbrown.is${project.preview}`
      }
    }
  }

  return {
    title,
    description,
    ogImageSrc,
    twitterImageSrc
  }
})

const structuredData = computed(() => {
  return {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": store.resume.basics?.name || "Morgan Brown",
    "jobTitle": store.resume.basics?.label || "Senior Frontend Engineer",
    "url": "https://mhgbrown.is",
    "description": store.resume.basics?.summary,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": store.resume.basics?.location?.city || "Athens",
      "addressCountry": store.resume.basics?.location?.countryCode || "GR"
    },
    "sameAs": [
      "https://github.com/mhgbrown",
      "https://linkedin.com/in/mhgbrown",
      "http://instagram.com/mhgbrown",
      "http://soundcloud.com/mhgbrown/likes"
    ]
  }
})

// Use useSeoMeta for meta tags
useSeoMeta({
  title: () => seoData.value.title,
  description: () => seoData.value.description,
  // Open Graph
  ogTitle: () => seoData.value.title,
  ogDescription: () => seoData.value.description,
  ogImage: () => seoData.value.ogImageSrc,
  // Twitter Cards
  twitterTitle: () => seoData.value.title,
  twitterDescription: () => seoData.value.description,
  twitterImage: () => seoData.value.twitterImageSrc,
})

// Use useHead for script (JSON-LD)
useHead({
  script: [
    {
      type: 'application/ld+json',
      key: 'structured-data',
      innerHTML: () => JSON.stringify(structuredData.value)
    }
  ]
})
</script>

<template>
  <div></div>
</template>
