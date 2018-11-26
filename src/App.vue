<template>
  <div id="app">
    <router-view :key="$route.path"/>
  </div>
</template>
<script>
export default {
  created () {
    window.addEventListener('resize', this.onResize, true)

    this.onResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.onResizeDebounced, true)
  },
  methods: {
    onResize () {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
      this.$store.commit('UPDATE_APP', { field: 'tablet', value: windowWidth <= 960 })
      this.$store.commit('UPDATE_APP', { field: 'phone', value: windowWidth <= 480 })
    }
  }
}
</script>
