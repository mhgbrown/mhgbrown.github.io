# My Website!

A modern portfolio and resume website built with Vue 3, Vite, TypeScript, and Pinia.

## Project Setup

```bash
# Install dependencies
npm install
```

### Development
```bash
# Compiles and hot-reloads for development (Vite dev server)
npm run dev
```

### Build & Production
```bash
# Compiles and minifies for production
npm run build

# Preview production build locally
npm run preview
```

### Deployment

A GitHub Actions workflow is set up to automatically build and deploy the application to GitHub Pages (the `master` branch) whenever changes are pushed to `develop`.

---

## Resume Data (`src/data/resume.json`)

The resume and project data in this website is structured as a JSON file at `src/data/resume.json`.

This data was produced using AI with the following process:
1. Exported the LinkedIn profile as a PDF (`Profile.pdf`) and provided it to the AI.
2. Took a comprehensive screenshot of the projects section directly from LinkedIn.
3. Asked the AI to parse, merge, and structure all of this experience and project data into a clean, schema-aligned JSON format compatible with the website's resume viewer.
