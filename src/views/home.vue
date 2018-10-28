<template>
  <div class="home">
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
    <slide-show></slide-show>
    <div class="content-container">
      <ul>
        <li v-for="project in projectsShuffled" :key="project.title">
          <a :href="project.href">{{ project.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import shuffle from 'lodash.shuffle'
import SlideShow from '@/components/slide-show'

export default {
  name: 'home',
  computed: {
    ...mapState(['projects']),
    projectsShuffled () {
      return shuffle(this.projects)
    }
  },
  components: {
    SlideShow
  }
}
</script>
