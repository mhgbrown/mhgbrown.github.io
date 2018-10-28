<template>
  <div class="home">
    <div class="content-container">
      <h1>Morgan Brown is a Software Engineer based in Berlin, Germany</h1>
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
