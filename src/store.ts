import { defineStore } from 'pinia'
import axios from 'axios'
import kebabCase from 'lodash.kebabcase'
import resumeData from './data/resume.json'
import { Resume, Project } from './types/resume'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    app: {
      tablet: false,
      phone: false
    },
    tumblrApiKey: 'ok1dCktUCXTyOgG0vlyhxcW7oQ4lxUZl0QfZkoEiwwjvU2ZKAv',
    tumblrs: [] as any[],
    resume: resumeData as unknown as Resume
  }),
  getters: {
    projects(state): Project[] {
      const allProjects = state.resume.projects || []
      return [...allProjects].sort((a, b) => a.name.localeCompare(b.name))
    },
    findProjectById(state): (id: string) => Project | undefined {
      return (id: string) => {
        const p = (state.resume.projects || []).find(project => project.id === id)
        return p
      }
    }
  },
  actions: {
    updateApp(field: 'tablet' | 'phone', value: boolean) {
      this.app[field] = value
    },
    async loadTumblr({ offset }: { offset: number }) {
      const url = `https://api.tumblr.com/v2/blog/mhgbrown.tumblr.com/likes?api_key=${this.tumblrApiKey}&offset=${offset}&limit=1`
      const response = await axios.get(url)
      const tumblr = response.data.response.liked_posts.find((post: any) => post.photos && post.photos.length) || response.data.response.liked_posts.find((post: any) => !!post.video_url)

      if (!tumblr) {
        throw new Error('Tumblr post does not include photos')
      }

      this.tumblrs.push(tumblr)
      return tumblr
    },
    removeTumblr() {
      this.tumblrs.shift()
    }
  }
})
