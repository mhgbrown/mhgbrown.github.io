<template>
  <div class="resume-content">
    <section v-if="sortedWork.length" id="experience" class="resume-section" tabindex="-1">
      <h2>Experience</h2>
      <ul class="resume-list">
        <li v-for="job in sortedWork" :key="job.name + job.position" :id="'experience-' + slugify(job.name)">
          <header class="resume-item-header">
            <h3 class="header-main">
              <strong>{{ job.position }}</strong>
            </h3>
            <div class="header-sub">
              <em>{{ job.name }}</em>
            </div>
            <date-range :start-date="job.startDate" :end-date="job.endDate"></date-range>
          </header>
          <p class="description">{{ job.summary }}</p>
          <ul v-if="job.highlights && job.highlights.length" class="highlights-list">
            <li v-for="(highlight, idx) in job.highlights" :key="idx">{{ highlight }}</li>
          </ul>
        </li>
      </ul>
    </section>

    <section v-if="sortedProjects.length" id="projects" class="resume-section" tabindex="-1">
      <h2>Projects</h2>
      <ul class="resume-list">
        <li v-for="project in sortedProjects" :key="project.name">
          <header class="resume-item-header">
            <h3 class="header-main">
              <strong v-if="project.id">
                <router-link :to="{ name: 'project', params: { id: project.id } }">{{ project.name }}</router-link>
              </strong>
              <strong v-else>{{ project.name }}</strong>
            </h3>
            <div v-if="project.associatedWith" class="header-sub">
              <em v-if="getMatchingJob(project.associatedWith)">
                <a :href="'#experience-' + slugify(project.associatedWith)" data-scroll-only="true">{{ project.associatedWith }}</a>
              </em>
              <em v-else-if="getMatchingEducation(project.associatedWith)">
                <a :href="'#education-' + slugify(project.associatedWith)" data-scroll-only="true">{{ project.associatedWith }}</a>
              </em>
              <em v-else>{{ project.associatedWith }}</em>
            </div>
            <date-range v-if="project.startDate" :start-date="project.startDate" :end-date="project.endDate"></date-range>
          </header>
          <p class="description">{{ project.description }}</p>
          <p v-if="project.keywords && project.keywords.length > 0" class="keywords">
            <strong>Keywords:</strong> {{ project.keywords.join(', ') }}
          </p>
        </li>
      </ul>
    </section>

    <section v-if="resume.skills" id="skills" class="resume-section" tabindex="-1">
      <h2>Skills</h2>
      <ul class="resume-list skills-list">
        <li v-for="skill in resume.skills" :key="skill.name">
          <strong>{{ skill.name }}:</strong> {{ skill.keywords.join(', ') }}
        </li>
      </ul>
    </section>

    <section v-if="resume.education" id="education" class="resume-section" tabindex="-1">
      <h2>Education</h2>
      <ul class="resume-list">
        <li v-for="edu in resume.education" :key="edu.institution + edu.area" :id="'education-' + slugify(edu.institution)">
          <header class="resume-item-header">
            <h3 class="header-main">
              <strong>{{ edu.institution }}</strong>
            </h3>
            <div class="header-sub">
              <span>{{ edu.studyType }} {{ edu.area }}</span>
            </div>
            <date-range :start-date="edu.startDate" :end-date="edu.endDate"></date-range>
          </header>
        </li>
      </ul>
    </section>

    <section v-if="resume.basics && resume.basics.summary" id="about" class="resume-section" tabindex="-1">
      <h2>About</h2>
      <div class="description about-text" v-html="resume.basics.summary">
      </div>
    </section>

    <section id="contact" class="resume-section" tabindex="-1">
      <h2>Contact</h2>
      <ul class="contact-list">
        <li class="contact-link-item"><external-a href="http://github.com/mhgbrown">Github</external-a></li>
        <li class="contact-link-item"><external-a href="http://instagram.com/mhgbrown">Instagram</external-a></li>
        <li class="contact-link-item"><external-a href="http://soundcloud.com/mhgbrown/likes">SoundCloud</external-a></li>
        <li class="contact-link-item"><a href="https://blog.mhgbrown.is">Writing</a></li>
        <li class="contact-link-item"><external-a href="http://www.linkedin.com/in/mhgbrown">LinkedIn</external-a></li>
        <li class="contact-link-item"><button class="print-button" @click="print">Resume</button></li>
        <li class="contact-email-item">
          <external-a href="mailto:inbox@email.mhgbrown.is">
            <span class="screen-only">Mail</span>
            <span class="print-only">inbox@email.mhgbrown.is</span>
          </external-a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useResumeStore } from '@/store.ts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { sortChronologically } from '@/utils/date-sort.ts'
import { useScrollSpy } from '@/composables/use-scroll-spy.ts'
import DateRange from '@/components/date-range.vue'
import ExternalA from '@/components/external-a.vue'

const store = useResumeStore()
const { resume } = storeToRefs(store)

useScrollSpy()

const print = () => {
  window.print()
}

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

const getMatchingJob = (associatedWith: string) => {
  if (!associatedWith) return null
  const query = slugify(associatedWith)
  return resume.value.work?.find(job => slugify(job.name) === query) || null
}

const getMatchingEducation = (associatedWith: string) => {
  if (!associatedWith) return null
  const query = slugify(associatedWith)
  return resume.value.education?.find(edu => slugify(edu.institution) === query) || null
}

const sortedWork = computed(() => {
  if (!resume.value.work) return []
  return [...resume.value.work].sort(sortChronologically)
})

const sortedProjects = computed(() => {
  if (!resume.value.projects) return []
  return [...resume.value.projects].sort((a, b) => {
    const hasA = !!a.startDate
    const hasB = !!b.startDate
    if (hasA && !hasB) return -1
    if (!hasA && hasB) return 1
    if (!hasA && !hasB) {
      return a.name.localeCompare(b.name)
    }
    return sortChronologically(a, b)
  })
})
</script>

<style lang="scss">
.resume-section {
  margin-bottom: 2rem;
  outline: none; // Hide outline when focus is programmatically shifted to section

  h2 {
    font-size: 1.5rem;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;
    padding-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

.print-button {
  background: none;
  border: none;
  color: blue;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  cursor: pointer;
  display: inline;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    color: yellow;
  }
}

.resume-list {
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 1.5rem;
    display: block;
    width: 100%;
  }
}

.resume-item-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  .header-main {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem;
    margin: 0;
    font-size: 1rem;
    font-weight: normal;
  }

  h3.header-main {
    margin: 0;
    font-size: 1rem;
    font-weight: normal;
  }

  .header-sub {
    font-style: italic;
    margin-top: 0.1rem;
  }

  .spacer {
    color: #999;
  }

  .date {
    color: #666;
    font-size: 0.9rem;
    margin-top: 0.1rem;
  }
}

.description {
  margin-top: 0.5rem;
  line-height: 1.4;
}

.about-text {
  white-space: pre-wrap;
}

.highlights-list {
  margin-top: 0.5rem;
  padding-left: 1.2rem;
  list-style-type: none;

  li {
    margin-bottom: 0.25rem;
    line-height: 1.4;
    position: relative;

    &::before {
      content: '●';
      position: absolute;
      left: -1.2rem;
      font-size: 0.8rem;
      top: 0.1rem;
    }
  }
}

.keywords {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}

.skills-list {
  li {
    margin-bottom: 0.5rem;
  }
}

.inline-list {
  li {
    display: inline-block;
    margin-right: 1.5rem;
  }
}
</style>
