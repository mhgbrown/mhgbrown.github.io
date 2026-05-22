import { defineStore } from 'pinia'
import resumeData from './data/resume.json'
import projectsData from './data/projects.json'
import { Resume, Project } from './types/resume'

// Merge projects.json properties into resume.json projects dynamically
const mergedResumeProjects = (resumeData.projects || []).map(rp => {
  const match = projectsData.projects.find(p => p.associatedResumeProject === rp.name)
  if (match) {
    return {
      ...match, // has technology, preview, links, id, associatedWith, associatedResumeProject, etc.
      ...rp, // name, startDate, endDate, keywords
      id: match.id, // ensure ID is explicitly preserved
      description: rp.description, // use resume.json description
      projectsJsonDescription: match.description // keep projects.json description so no data is overwritten/lost
    } as Project
  }
  return rp as Project
})

// Grab all projects in projects.json that do NOT have an associatedResumeProject
const unmatchedProjects = projectsData.projects
  .filter(p => !p.associatedResumeProject)
  .map(p => ({
    ...p,
    name: p.text,
    startDate: '',
    endDate: '',
    associatedWith: p.associatedWith || '',
    keywords: []
  } as Project))

// Combine both lists for the resume view to display
const finalResumeProjects = [...mergedResumeProjects, ...unmatchedProjects]

// Create a unified list of all projects for the findProjectById lookup
const allUnifiedProjects: Project[] = [...finalResumeProjects]

export const useResumeStore = defineStore('resume', {
  state: () => ({
    app: {
      tablet: false,
      phone: false
    },
    resume: {
      ...resumeData,
      projects: finalResumeProjects
    } as unknown as Resume,
    allProjects: allUnifiedProjects
  }),
  getters: {
    projects(state): Project[] {
      const allProjects = state.resume.projects || []
      return [...allProjects].sort((a, b) => a.name.localeCompare(b.name))
    },
    findProjectById(state): (id: string) => Project | undefined {
      return (id: string) => {
        return state.allProjects.find(project => project.id === id)
      }
    }
  },
  actions: {
    updateApp(field: 'tablet' | 'phone', value: boolean) {
      this.app[field] = value
    }
  }
})
