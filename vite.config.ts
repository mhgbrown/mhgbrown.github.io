import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'
import Sitemap from 'vite-plugin-sitemap'

// Read projects list to construct dynamic routes
const projectsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './src/data/projects.json'), 'utf-8'))
const projectIds = projectsData.projects.map((p: any) => p.id)
const projectRoutes = projectIds.map((id: string) => `/projects/${id}`)

// Retrieve git commit date for fallback/homepage
const homepageDateStr = execSync('git log -1 --format=%cs').toString().trim()
const defaultDate = new Date(homepageDateStr)

// Build lastmod, priority, and changefreq options per route
const lastmodMap: Record<string, Date> = {
  '/': defaultDate,
}
const changefreqMap: Record<string, string> = {
  '/': 'monthly',
}
const priorityMap: Record<string, number> = {
  '/': 1.0,
}

for (const id of projectIds) {
  const route = `/projects/${id}`
  let dateStr = ''
  try {
    dateStr = execSync(`git log -1 --format=%cs -S "${id}" -- src/data/projects.json`).toString().trim()
  } catch (e) {
    // If git fails or has no match, fall back to defaultDate
  }
  lastmodMap[route] = dateStr ? new Date(dateStr) : defaultDate
  changefreqMap[route] = 'yearly'
  priorityMap[route] = 0.8
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Sitemap({
      hostname: 'https://mhgbrown.is',
      dynamicRoutes: projectRoutes,
      exclude: ['/404'],
      lastmod: lastmodMap,
      changefreq: changefreqMap,
      priority: priorityMap,
      readable: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})
