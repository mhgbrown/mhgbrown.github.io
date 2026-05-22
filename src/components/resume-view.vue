<template>
  <div class="resume-content">
    <section v-if="sortedWork.length" id="experience" class="resume-section">
      <h2>Experience</h2>
      <ul class="resume-list">
        <li v-for="job in sortedWork" :key="job.name + job.position">
          <div class="resume-item-header">
            <div class="header-main">
              <strong>{{ job.position }}</strong>
            </div>
            <div class="header-sub">
              <em>{{ job.name }}</em>
            </div>
            <span class="date">{{ job.startDate }} — {{ job.endDate || 'Present' }}</span>
          </div>
          <p class="description">{{ job.summary }}</p>
          <ul v-if="job.highlights && job.highlights.length" class="highlights-list">
            <li v-for="(highlight, idx) in job.highlights" :key="idx">{{ highlight }}</li>
          </ul>
        </li>
      </ul>
    </section>

    <section v-if="sortedProjects.length" id="projects" class="resume-section">
      <h2>Projects</h2>
      <ul class="resume-list">
        <li v-for="project in sortedProjects" :key="project.name">
          <div class="resume-item-header">
            <div class="header-main">
              <strong>{{ project.name }}</strong>
            </div>
            <div v-if="project.associatedWith" class="header-sub">
              <em>{{ project.associatedWith }}</em>
            </div>
            <span class="date">{{ project.startDate }} — {{ project.endDate }}</span>
          </div>
          <p class="description">{{ project.description }}</p>
          <p v-if="project.keywords" class="keywords">
            <strong>Keywords:</strong> {{ project.keywords.join(', ') }}
          </p>
        </li>
      </ul>
    </section>

    <section v-if="resume.skills" id="skills" class="resume-section">
      <h2>Skills</h2>
      <ul class="resume-list skills-list">
        <li v-for="skill in resume.skills" :key="skill.name">
          <strong>{{ skill.name }}:</strong> {{ skill.keywords.join(', ') }}
        </li>
      </ul>
    </section>

    <section v-if="resume.education" id="education" class="resume-section">
      <h2>Education</h2>
      <ul class="resume-list">
        <li v-for="edu in resume.education" :key="edu.institution + edu.area">
          <div class="resume-item-header">
            <div class="header-main">
              <strong>{{ edu.institution }}</strong>
            </div>
            <div class="header-sub">
              <span>{{ edu.studyType }} {{ edu.area }}</span>
            </div>
            <span class="date">{{ edu.startDate }} — {{ edu.endDate }}</span>
          </div>
        </li>
      </ul>
    </section>

    <section v-if="resume.basics && resume.basics.summary" id="about" class="resume-section">
      <h2>About</h2>
      <div class="description about-text" v-html="resume.basics.summary">
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useResumeStore } from '@/store.ts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { sortChronologically } from '@/utils/date-sort.ts'

const store = useResumeStore()
const { resume } = storeToRefs(store)

const sortedWork = computed(() => {
  if (!resume.value.work) return []
  return [...resume.value.work].sort(sortChronologically)
})

const sortedProjects = computed(() => {
  if (!resume.value.projects) return []
  return [...resume.value.projects].sort(sortChronologically)
})
</script>

<style lang="scss">
.resume-section {
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;
    padding-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
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
