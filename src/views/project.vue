<template>
  <application-layout class="project-id">
    <div class="project">
      <div class="project-inner">
        <iframe v-if="project.preview.indexOf('youtube.com') >= 0" width="560" height="315" :src="project.preview" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <video ref="media" v-else-if="project.preview.indexOf('.mp4') >= 0" :src="project.preview" :alt="project.text" loop autoplay muted preload playsinline webkit-playsinline controls>
          <source :src="project.preview" type="video/mp4">
        </video>
        <img ref="media" v-else :src="project.preview" :alt="project.text">
        <div class="project-links">
          <p v-if="project.description">{{ project.description }}</p>
          <p v-if="project.technology">{{ project.technology }}</p>
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
  },
  beforeDestroy () {
    if (this.$refs.media) {
      this.$refs.media.remove()
    }
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
      height 100%
      max-height 100%
      display block
      margin 0 auto

    iframe
      position absolute
      height 100%
      width 100%

    .project-links
      position absolute
      left 0
      top 0
      opacity 0
      width 100%
      background blue
      color white
      padding-bottom 2px

      p
        margin-bottom 0.25rem

      a
        color white
        border-bottom-color white
        display inline-block

    &:hover
      .project-links
        opacity 1
</style>
