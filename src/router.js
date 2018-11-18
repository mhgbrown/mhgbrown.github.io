import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Project from './views/project.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: Project,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
