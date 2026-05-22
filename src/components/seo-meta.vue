<script setup lang="ts">
import { useResumeStore } from '@/store.ts'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const store = useResumeStore()
const route = useRoute()

// Update structured data schema dynamically
const updateStructuredData = () => {
  // Remove any existing LD+JSON scripts to prevent duplicates
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
  existingScripts.forEach(el => el.remove())

  const structuredData = {
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

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify(structuredData)
  document.head.appendChild(script)
}

// Update page title & meta tags based on the current route
const updateSeoMeta = () => {
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

  // Update Title
  document.title = title

  // Update Meta Description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    document.head.appendChild(metaDescription)
  }
  metaDescription.setAttribute('content', description)

  // Update Open Graph
  let ogTitle = document.querySelector('meta[property="og:title"]')
  if (!ogTitle) {
    ogTitle = document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    document.head.appendChild(ogTitle)
  }
  ogTitle.setAttribute('content', title)

  let ogDescription = document.querySelector('meta[property="og:description"]')
  if (!ogDescription) {
    ogDescription = document.createElement('meta')
    ogDescription.setAttribute('property', 'og:description')
    document.head.appendChild(ogDescription)
  }
  ogDescription.setAttribute('content', description)

  let ogImage = document.querySelector('meta[property="og:image"]')
  if (!ogImage) {
    ogImage = document.createElement('meta')
    ogImage.setAttribute('property', 'og:image')
    document.head.appendChild(ogImage)
  }
  ogImage.setAttribute('content', ogImageSrc)

  // Update Twitter Cards
  let twitterTitle = document.querySelector('meta[property="twitter:title"]')
  if (!twitterTitle) {
    twitterTitle = document.createElement('meta')
    twitterTitle.setAttribute('property', 'twitter:title')
    document.head.appendChild(twitterTitle)
  }
  twitterTitle.setAttribute('content', title)

  let twitterDescription = document.querySelector('meta[property="twitter:description"]')
  if (!twitterDescription) {
    twitterDescription = document.createElement('meta')
    twitterDescription.setAttribute('property', 'twitter:description')
    document.head.appendChild(twitterDescription)
  }
  twitterDescription.setAttribute('content', description)

  let twitterImage = document.querySelector('meta[property="twitter:image"]')
  if (!twitterImage) {
    twitterImage = document.createElement('meta')
    twitterImage.setAttribute('property', 'twitter:image')
    document.head.appendChild(twitterImage)
  }
  twitterImage.setAttribute('content', twitterImageSrc)
}

onMounted(() => {
  updateStructuredData()
  updateSeoMeta()
})

// Watch route changes to update title & meta description dynamically
watch(() => route.path, () => {
  updateSeoMeta()
})
</script>

<template>
  <div></div>
</template>
