<template>
  <application-layout class="project-id">
    <div class="project">
      <div class="project-inner">
        <img v-if="project.preview.indexOf('.gif') >= 0" :src="project.preview" :alt="project.text">
        <video v-else :src="project.preview" :alt="project.text" loop autoplay muted preload playsinline webkit-playsinline>
          <source :src="project.preview" type="video/mp4">
        </video>
        <div class="project-links">
          <a v-if="project.website" :href="project.website" target="_blank">Visit</a>
          <ul class="inline" v-else>
            <li v-for="link in project.links" :key="link.href">
              <a :href="link.href" target="_blank">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </application-layout>
</template>

<script>
import ApplicationLayout from '@/layouts/application'

export default {
  name: 'project',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data () {
    return {
    }
  },
  computed: {
    project () {
      return this.$store.getters.findProjectById(this.id)
    }
  },
  components: {
    ApplicationLayout
  }
}
</script>
<style lang="stylus">
.project
  margin 1rem 0
  font-size 0
  height 0
  padding-bottom 56.25%
  position relative

  .project-inner
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    font-size 1rem

    img,
    video
      max-width 100%
      height auto
      max-height 100%

    .project-links
      position absolute
      left 0
      bottom 0
      opacity 0
      transition opacity 200ms
      background yellow
      color red

      a
        color red
        border-bottom-color red
        display inline-block

    &:hover
      .project-links
        opacity 1
</style>
