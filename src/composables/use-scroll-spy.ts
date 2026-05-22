import { onMounted, onUnmounted } from 'vue'
import { useResumeStore } from '@/store.ts'

/**
 * Vue 3 Composable to spy on scroll position and update URL fragment (hash) based on the active section.
 * It also handles smooth scrolling when landing on a URL with a fragment or on hash change.
 *
 * @param selectors Array of CSS selectors for sections to spy on
 * @param threshold Offset in pixels from top of viewport to determine active section
 */
export function useScrollSpy() {
  const store = useResumeStore()
  let isScrollingToHash = false
  let scrollTimeout: number | null = null

  const handleScroll = () => {
    // Skip updating hash if we are programmatically scrolling to a section
    if (isScrollingToHash) return

    const currentHash = window.location.hash
    if (!currentHash || currentHash === '#') return

    try {
      const el = document.querySelector(currentHash) as HTMLElement | null
      if (el) {
        const rect = el.getBoundingClientRect()
        const threshold = 150

        // If the current section is no longer active / in-view around the threshold
        const isCurrentlyActive = rect.top <= threshold && rect.bottom > threshold

        // If not active, or if we're near the very top of the page, clear the hash
        if (!isCurrentlyActive || window.scrollY < 50) {
          window.history.replaceState(
            null,
            '',
            window.location.pathname + window.location.search
          )
        }
      }
    } catch (err) {
      // Handle potential invalid selector errors from malformed hashes
      console.error(err)
    }
  }

  const scrollToHash = () => {
    const hash = window.location.hash
    if (hash) {
      try {
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
      } catch (err) {
        // Handle potential invalid selector errors from malformed hashes
        console.error(err)
      }
    }
  }

  const onHashChange = () => {
    scrollToHash()
  }

  const handleLinkClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    const anchor = target?.closest('a')
    if (anchor) {
      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#')) {
        try {
          const targetEl = document.querySelector(href) as HTMLElement | null
          if (targetEl) {
            e.preventDefault()
            isScrollingToHash = true

            const scrollOnly = anchor.getAttribute('data-scroll-only') === 'true'

            if (!scrollOnly) {
              // Update URL hash with history.pushState so it pushes to browser history
              window.history.pushState(null, '', href)
            }

            // Smoothly scroll to target
            targetEl.scrollIntoView({ behavior: 'smooth' })

            if (scrollTimeout) {
              window.clearTimeout(scrollTimeout)
            }
            scrollTimeout = window.setTimeout(() => {
              isScrollingToHash = false
            }, 1000)
          }
        } catch (err) {
          console.error(err)
        }
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('click', handleLinkClick)

    const hash = window.location.hash
    if (hash) {
      // If there is a hash, scroll to it on initial mount and clear saved scroll position to prevent conflicts
      store.saveScrollPosition(0)
      setTimeout(scrollToHash, 150)
    } else if (store.scrollPosition > 0) {
      // Restore the exact pixel scroll position immediately
      const savedPos = store.scrollPosition
      store.saveScrollPosition(0)
      window.scrollTo(0, savedPos)

      // And scroll again after a short delay to account for any layout rendering shifts
      setTimeout(() => {
        window.scrollTo(0, savedPos)
      }, 50)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('hashchange', onHashChange)
    window.removeEventListener('click', handleLinkClick)
    if (scrollTimeout) {
      window.clearTimeout(scrollTimeout)
    }
  })
}
