<template>
  <div class="application-layout">
    <div class="content-container">
      <h1>Morgan Brown is a Software Engineer based in Berlin, Germany</h1>
      <ul>
        <li><a target="_blank" href="http://github.com/mhgbrown">Code</a></li>
        <li><a target="_blank" href="http://instagram.com/mhgbrown">Photos</a></li>
        <li><a target="_blank" href="http://soundcloud.com/mhgbrown/likes">Music</a></li>
        <li><a target="_blank" href="http://blog.mhgbrown.is">Writing</a></li>
        <li><a target="_blank" href="http://www.linkedin.com/in/mhgbrown">Resume</a></li>
        <li><a target="_blank" href="mailto:inbox@email.mhgbrown.is">Contact</a></li>
      </ul>
    </div>
    <div class="content-container">
      <slot></slot>
    </div>
    <div class="content-container">
      <p>Some work</p>
      <ul>
        <li v-for="project in projects" :key="project.title">
          <router-link v-if="project.href.indexOf('/') === 0" :to="{ name: 'project', params: { id: project.id } }">{{ project.text }}</router-link>
          <a v-else :target="project.target" :href="project.href">{{ project.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SlideShow from '@/components/slide-show'

export default {
  name: 'home',
  computed: {
    ...mapState(['projects'])
  },
  components: {
    SlideShow
  }
}
</script>
