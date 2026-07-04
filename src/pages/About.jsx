import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import content from '../../content.json'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

// Renders the howIWork heading with the "AI-native, by default" portion in amber.
function HowIWorkHeading({ heading }) {
  const accent = 'AI-native, by default'
  if (heading.includes(accent)) {
    const [before] = heading.split(accent)
    return (
      <h3 className="howiwork-heading">
        {before}<span className="amber">{accent}</span>
      </h3>
    )
  }
  return <h3 className="howiwork-heading">{heading}</h3>
}

export default function About() {
  const { about } = content

  return (
    <PageTransition>
      <Helmet>
        <title>About | Marvin Sta. Ana</title>
        <meta name="description" content="About Marvin Sta. Ana: Head of Content with 8+ years across finance, FX/CFD, crypto, and Web3, now at mb.io (MultiBank Group)." />
      </Helmet>
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

        {/* Fun facts */}
        {about.funFacts && about.funFacts.length > 0 && (
          <div className="fun-facts-strip">
            <div className="fun-facts-grid">
              {about.funFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  className="fun-fact-item"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <div className="fun-fact-emoji">{fact.emoji}</div>
                  <div className="fun-fact-label">{fact.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* How I work */}
        {about.howIWork && (
          <motion.div className="howiwork-panel" {...fadeUp(0.1)}>
            <HowIWorkHeading heading={about.howIWork.heading} />
            {about.howIWork.paragraphs.map((para, i) => (
              <p key={i} className="howiwork-para">{para}</p>
            ))}
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}
