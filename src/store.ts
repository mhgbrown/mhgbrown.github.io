import { defineStore } from 'pinia'
import kebabCase from 'lodash.kebabcase'
import resumeData from './data/resume.json'
import { Resume, Project } from './types/resume'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    app: {
      tablet: false,
      phone: false
    },
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
    }
  }
})
