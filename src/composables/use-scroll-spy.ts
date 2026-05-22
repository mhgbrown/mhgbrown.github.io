import { onMounted, onUnmounted } from 'vue'

/**
 * Vue 3 Composable to spy on scroll position and update URL fragment (hash) based on the active section.
 * It also handles smooth scrolling when landing on a URL with a fragment or on hash change.
 *
 * @param selectors Array of CSS selectors for sections to spy on
 * @param threshold Offset in pixels from top of viewport to determine active section
 */
export function useScrollSpy(selectors: string[], threshold = 150) {
  let isScrollingToHash = false
  let scrollTimeout: number | null = null

  const handleScroll = () => {
    // Skip updating hash if we are programmatically scrolling to a section
    if (isScrollingToHash) return

    let activeId = ''

    // Check if we are at the bottom of the page to ensure the last section is represented
    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 50

    if (isAtBottom) {
      for (let i = selectors.length - 1; i >= 0; i--) {
        const el = document.querySelector(selectors[i]) as HTMLElement | null
        if (el) {
          activeId = el.id
          break
        }
      }
    } else {
      for (const selector of selectors) {
        const el = document.querySelector(selector) as HTMLElement | null
        if (!el) continue

        const rect = el.getBoundingClientRect()
        // If the section spans across the threshold line near the top of the viewport
        if (rect.top <= threshold && rect.bottom > threshold) {
          activeId = el.id
          break
        }
      }
    }

    // If we're near the very top of the page, clear the hash
    if (window.scrollY < 50) {
      activeId = ''
    }

    const currentHash = window.location.hash
    if (activeId) {
      const newHash = `#${activeId}`
      if (currentHash !== newHash) {
        window.history.replaceState(null, '', newHash)
      }
    } else {
      if (currentHash && currentHash !== '#') {
        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search
        )
      }
    }
  }

  const scrollToHash = () => {
    const hash = window.location.hash
    if (hash) {
      const target = document.querySelector(hash) as HTMLElement | null
      if (target) {
        isScrollingToHash = true
        target.scrollIntoView({ behavior: 'smooth' })

        if (scrollTimeout) {
          window.clearTimeout(scrollTimeout)
        }
        scrollTimeout = window.setTimeout(() => {
          isScrollingToHash = false
        }, 1000)
      }
    }
  }

  const onHashChange = () => {
    scrollToHash()
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('hashchange', onHashChange)

    // Scroll to the active hash on initial mount (with a slight delay to ensure rendering is complete)
    setTimeout(scrollToHash, 150)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('hashchange', onHashChange)
    if (scrollTimeout) {
      window.clearTimeout(scrollTimeout)
    }
  })
}
