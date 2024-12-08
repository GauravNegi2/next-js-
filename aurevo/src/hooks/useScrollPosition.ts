import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')

  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const updateScrollPosition = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      if (direction !== scrollDirection && (scrollY - lastScrollY > 0.5 || scrollY - lastScrollY < -0.5)) {
        setScrollDirection(direction)
      }
      setScrollPosition(scrollY)
      lastScrollY = scrollY > 0 ? scrollY : 0
    }

    window.addEventListener('scroll', updateScrollPosition, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollPosition)
  }, [scrollDirection])

  return { scrollPosition, scrollDirection }
}

