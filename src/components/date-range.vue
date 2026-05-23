<template>
  <span class="date">
    <time :datetime="startDate || undefined">{{ formatDate(startDate) }}</time> —
    <time v-if="isValidDate(endDate)" :datetime="endDate || undefined">{{ formatDate(endDate) }}</time>
    <span v-else>{{ formatDate(endDate) }}</span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  startDate: string | null | undefined
  endDate: string | null | undefined
}>()

const isValidDate = (date: string | null | undefined) => {
  return !!date && date.toLowerCase() !== 'present'
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const formatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return 'Present'
  const trimmed = dateStr.trim()
  if (trimmed.toLowerCase() === 'present') {
    return 'Present'
  }

  const parts = trimmed.split('-')
  if (parts.length === 2) {
    const year = parts[0]
    const monthVal = parseInt(parts[1], 10)
    if (!isNaN(monthVal) && monthVal >= 1 && monthVal <= 12) {
      return `${MONTH_NAMES[monthVal - 1]}, ${year}`
    }
  }

  return trimmed
}
</script>
