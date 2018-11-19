<template>
  <application-layout class="project-id">
    <div class="project">
      <div class="project-inner">
        {{ project.text }}
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
  padding-bottom 56.5%
  position relative

  .project-inner
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    font-size 1rem

</style>
