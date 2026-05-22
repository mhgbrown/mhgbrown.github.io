<template>
  <div class="resume-content">
    <section class="resume-section bio">
      <p>{{ resume.bio }}</p>
    </section>

    <section class="resume-section">
      <h2>Experience</h2>
      <ul class="resume-list">
        <li v-for="job in resume.experience" :key="job.company + job.title">
          <div class="resume-item-header">
            <strong>{{ job.company }}</strong>
            <span class="spacer">|</span>
            <em>{{ job.title }}</em>
            <span class="date">{{ job.startDate }} — {{ job.endDate || 'Present' }}</span>
          </div>
          <p class="description">{{ job.description }}</p>
        </li>
      </ul>
    </section>

    <section class="resume-section">
      <h2>Skills</h2>
      <ul class="resume-list skills-list">
        <li v-for="group in resume.skills" :key="group.category">
          <strong>{{ group.category }}:</strong> {{ group.items.join(', ') }}
        </li>
      </ul>
    </section>

    <section class="resume-section">
      <h2>Education</h2>
      <ul class="resume-list">
        <li v-for="edu in resume.education" :key="edu.school">
          <div class="resume-item-header">
            <strong>{{ edu.school }}</strong>
            <span class="spacer">|</span>
            <span>{{ edu.degree }}</span>
            <span class="date">{{ edu.year }}</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="resume-section">
      <h2>Projects</h2>
      <ul class="resume-list">
        <li v-for="project in resume.projects" :key="project.id">
          <div class="resume-item-header">
            <strong>
              <router-link :to="{ name: 'project', params: { id: project.id } }">
                {{ project.text }}
              </router-link>
            </strong>
            <span v-if="project.technology" class="spacer">|</span>
            <em v-if="project.technology">{{ project.technology }}</em>
          </div>
          <p class="description">{{ project.description }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useResumeStore } from '@/store.ts'
import { storeToRefs } from 'pinia'

const store = useResumeStore()
const { resume } = storeToRefs(store)
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
  }
}

.resume-item-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  .spacer {
    color: #999;
  }

  .date {
    margin-left: auto;
    color: #666;
    font-size: 0.9rem;
  }
}

.description {
  margin-top: 0.5rem;
  line-height: 1.4;
}

.skills-list {
  li {
    margin-bottom: 0.5rem;
  }
}
</style>
