import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/home.vue'
import Project from './views/project.vue'
import { useResumeStore } from './store.ts'

const routes: Array<RouteRecordRaw> = [
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
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (from.name === 'home') {
    const store = useResumeStore()
    store.saveScrollPosition(window.scrollY)
  }
})

router.afterEach((to) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', 'G-C8GLZL7JH1', {
      page_path: to.fullPath
    })
  }
})

export default router
