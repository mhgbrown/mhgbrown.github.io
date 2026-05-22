<template>
  <application-layout v-if="project" class="project-id">
    <div class="project">
      <div class="project-media">
        <div class="project-inner">
          <iframe v-if="project.preview && project.preview.indexOf('youtube.com') >= 0" width="560" height="315" :src="project.preview" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <video ref="media" v-else-if="project.preview && project.preview.indexOf('.mp4') >= 0" :src="project.preview" :alt="project.name" loop autoplay muted preload="auto" playsinline webkit-playsinline controls>
            <source :src="project.preview" type="video/mp4">
          </video>
          <img ref="media" v-else-if="project.preview" :src="project.preview" :alt="project.name">
        </div>
      </div>
      <div class="project-information">
        <p v-if="project.description">{{ project.description }}</p>
        <p class="technology" v-if="project.technology">{{ project.technology }}</p>
        <p v-if="project.keywords && project.keywords.length > 0" class="keywords">
          <strong>Keywords:</strong> {{ project.keywords.join(', ') }}
        </p>
        <ul v-if="project.links && project.links.length > 0" class="inline">
          <li v-for="link in project.links" :key="link.href">
            <a :href="link.href" target="_blank">{{ link.text }}</a>
          </li>
        </ul>
      </div>
    </div>
  </application-layout>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useResumeStore } from '@/store.ts'
import { storeToRefs } from 'pinia'
import ApplicationLayout from '@/layouts/application.vue'

const props = defineProps<{
  id: string
}>()

const store = useResumeStore()
const { findProjectById } = storeToRefs(store)
const media = ref<HTMLElement | null>(null)

const project = computed(() => findProjectById.value(props.id))

onBeforeUnmount(() => {
  if (media.value) {
    media.value.remove()
  }
})
</script>

<style lang="scss">
.project-media {
  margin: 1rem 0;
  font-size: 0;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;

  @media only screen and (max-width: 959px) {
    margin: 1rem -16px;
  }

  .project-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 1rem;

    img,
    video {
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      display: block;
      margin: 0 auto;
    }

    iframe {
      position: absolute;
      height: 100%;
      width: 100%;
    }
  }
}

.project-information {
  left: 0;
  top: 0;
  width: 100%;
  padding-bottom: 2px;
  margin-bottom: 1rem;

  p {
    margin-bottom: 0.25rem;
  }

  a {
    display: inline-block;
  }

  .technology {
    font-style: italic;
  }

  .keywords {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.25rem;
  }
}
</style>
