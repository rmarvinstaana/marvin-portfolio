import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import content from '../../content.json'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export default function About() {
  const { about } = content

  return (
    <PageTransition>
      <div className="container section">
        <motion.p className="section-eyebrow" {...fadeUp(0)}>Who is this guy</motion.p>
        <motion.h2 className="section-title" {...fadeUp(0.05)}>About Me</motion.h2>
        <motion.p className="section-subtitle" {...fadeUp(0.1)}>"{about.sectionSubtitle}"</motion.p>

        <div className="about-grid">
          {/* Avatar */}
          <motion.div className="about-avatar-wrap" {...fadeUp(0.15)}>
            <img src="/headshot.jpg" alt="Marvin Sta. Ana" className="about-avatar" />
            <div className="about-avatar-glow" />
          </motion.div>

          {/* Bio */}
          <motion.div className="about-bio" {...fadeUp(0.2)}>
            {about.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.div>
        </div>

      </div>
    </PageTransition>
  )
}
