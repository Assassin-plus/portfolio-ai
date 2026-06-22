import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Smooth-scrolls to a same-page section by id. Under HashRouter the URL hash is
// the route, so `href="#id"` anchors can't be used — this navigates home first
// when on a detail route, then scrolls once the target section has mounted.
function scrollToId(id: string, tries = 20) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    return
  }
  if (tries > 0) requestAnimationFrame(() => scrollToId(id, tries - 1))
}

export function useSectionNav() {
  const navigate = useNavigate()
  const location = useLocation()
  return useCallback(
    (id: string) => {
      if (location.pathname !== '/') {
        navigate('/')
        scrollToId(id)
      } else {
        scrollToId(id)
      }
    },
    [navigate, location.pathname],
  )
}
