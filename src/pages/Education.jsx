import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import content from '../../content.json'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

// The two King's Business School programs are postgraduate (lead/amber styling).
// The three Ateneo programs are undergraduate; the two flagged "(Minor)" read as Minor.
function degreeTag(deg) {
  if (deg.institution.includes("King's")) return { label: 'Postgraduate', lead: true }
  if (deg.degree.includes('(Minor)')) return { label: 'Minor', lead: false }
  return { label: 'Undergraduate', lead: false }
}

function isHighlightCert(cert) {
  return cert.issuer.includes('Pennsylvania') || cert.name.includes('AI Applications')
}

export default function Education() {
  const { education } = content

  return (
    <PageTransition>
      <div className="container section">
        <motion.p className="section-eyebrow" {...fadeUp(0)}>Foundations</motion.p>
        <motion.h2 className="section-title" {...fadeUp(0.05)}>Education</motion.h2>
        <motion.p className="section-subtitle" {...fadeUp(0.1)}>
          One MBA, three undergraduate programs, and a certification habit that never really stopped.
        </motion.p>

        {/* Degrees */}
        <div className="degree-grid">
          {education.degrees.map((deg, i) => {
            const tag = degreeTag(deg)
            return (
              <motion.div
                key={deg.id}
                className={`degree-card ${tag.lead ? 'degree-card--lead' : ''}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <span className={`degree-tag ${tag.lead ? 'degree-tag--amber' : 'degree-tag--blue'}`}>
                  {tag.label}
                </span>
                <div className="degree-name">{deg.degree}</div>
                <div className="degree-school">{deg.institution}</div>
                <div className="degree-year">{deg.period}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Certifications */}
        <motion.p className="section-eyebrow" style={{ marginTop: '64px' }} {...fadeUp(0)}>
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
              className={`cert-card ${isHighlightCert(cert) ? 'cert-card--highlight' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
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
