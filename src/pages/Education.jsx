import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import content from '../../content.json'

const DEGREE_ICONS = ['🎓', '📋', '✍️', '📊', '📚']

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export default function Education() {
  const { education } = content

  return (
    <PageTransition>
      <div className="container section">
        <motion.p className="section-eyebrow" {...fadeUp(0)}>Academic</motion.p>
        <motion.h2 className="section-title" {...fadeUp(0.05)}>Education</motion.h2>
        <motion.p className="section-subtitle" {...fadeUp(0.1)}>"{education.sectionSubtitle}"</motion.p>

        {/* Degrees */}
        <motion.div
          className="edu-degrees"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {education.degrees.map((deg, i) => (
            <motion.div
              key={deg.id}
              className="edu-card"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div className="edu-icon">{DEGREE_ICONS[i] || '🎓'}</div>
              <div>
                <div className="edu-degree">{deg.degree}</div>
                <div className="edu-institution">{deg.institution}</div>
                <div className="edu-period">{deg.period}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.p
          className="section-eyebrow"
          style={{ marginBottom: '24px' }}
          {...fadeUp(0)}
        >
          Certifications
        </motion.p>
        <motion.h3
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '32px' }}
          {...fadeUp(0.05)}
        >
          Credentials & Certifications
        </motion.h3>

        <div className="cert-grid">
          {education.certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="cert-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <div className="cert-name">{cert.name}</div>
              <div className="cert-issuer">{cert.issuer}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
