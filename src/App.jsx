import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// StarField and ParticleOrbs are intentionally not rendered: the Phase 1 redesign
// replaced them with a fixed grid + amber/blue radial glow background in index.css.
// The component files are kept in the repo in case the space theme is ever revived.
import Nav from './components/Nav'
import Footer from './components/Footer'
import EasterEgg from './components/EasterEgg'

import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Education from './pages/Education'
import Skills from './pages/Skills'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [easterEgg, setEasterEgg] = useState(false)

  useEffect(() => {
    const KONAMI = [
      'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
      'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
      'b','a'
    ]
    let idx = 0
    const handler = (e) => {
      if (e.key === KONAMI[idx]) {
        idx++
        if (idx === KONAMI.length) {
          setEasterEgg(true)
          idx = 0
          setTimeout(() => setEasterEgg(false), 3500)
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Nav />
      <AnimatedRoutes />
      <Footer />
      <AnimatePresence>
        {easterEgg && <EasterEgg />}
      </AnimatePresence>
    </BrowserRouter>
  )
}
