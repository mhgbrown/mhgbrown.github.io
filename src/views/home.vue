<template>
  <application-layout class="home">
    <slide-show></slide-show>
  </application-layout>
</template>

<script>
import SlideShow from '@/components/slide-show'
import ApplicationLayout from '@/layouts/application'

export default {
  name: 'home',
  components: {
    SlideShow,
    ApplicationLayout
  }
}
</script>
