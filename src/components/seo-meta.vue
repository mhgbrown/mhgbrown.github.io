<script setup lang="ts">
import { useResumeStore } from '@/store.ts'
import { onMounted } from 'vue'

const store = useResumeStore()

onMounted(() => {
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "Morgan Brown",
    "jobTitle": "Software Engineer",
    "url": "https://mhgbrown.is",
     "description": store.resume.basics.summary,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Berlin",
      "addressCountry": "Germany"
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
})
</script>

<template>
  <div></div>
</template>
