<template>
  <application-layout class="home">
    <slide-show></slide-show>
    <resume-view></resume-view>
  </application-layout>
</template>

<script setup lang="ts">
import SlideShow from '@/components/slide-show.vue'
import ResumeView from '@/components/resume-view.vue'
import ApplicationLayout from '@/layouts/application.vue'
</script>
