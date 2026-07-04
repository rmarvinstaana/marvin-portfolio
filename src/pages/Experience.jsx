import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import content from '../../content.json'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export default function Experience() {
  const { experience } = content

  return (
    <PageTransition>
      <div className="container section">
        <motion.p className="section-eyebrow" {...fadeUp(0)}>Career</motion.p>
        <motion.h2 className="section-title" {...fadeUp(0.05)}>Experience</motion.h2>
        <motion.p className="section-subtitle" {...fadeUp(0.1)}>"{experience.sectionSubtitle}"</motion.p>

        <motion.div
          className="timeline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {experience.jobs.map((job, i) => (
            <motion.div
              key={job.id}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div className="timeline-header">
                <div className="timeline-title">{job.title}</div>
                <div className="timeline-company">{job.company}</div>
                <div className="timeline-meta">
                  <span className="timeline-period">📅 {job.period}</span>
                  <span className="timeline-location">📍 {job.location}</span>
                </div>
              </div>
              {job.bullets.length > 0 && (
                <ul className="timeline-bullets">
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Speaking Engagements */}
        <hr className="divider" />

        <motion.p className="section-eyebrow" {...fadeUp(0)}>Public Speaking</motion.p>
        <motion.h3
          className="section-title"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
          {...fadeUp(0.05)}
        >
          Speaking Engagements
        </motion.h3>
        <motion.p className="section-subtitle" {...fadeUp(0.1)}>"{experience.speakingSubtitle}"</motion.p>

        <div className="speaking-grid">
          {experience.speaking.map((s, i) => (
            <motion.div
              key={s.id}
              className="speaking-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="speaking-event">{s.event}</div>
              <div className="speaking-topic">{s.topic}</div>
              <div className="speaking-meta">
                <span className="speaking-tag">📅 {s.date}</span>
                <span className="speaking-tag">📍 {s.location}</span>
                <span className="speaking-tag">{s.format === 'in-person' ? '🎤 In-Person' : '💻 Virtual'}</span>
              </div>
              <p className="speaking-desc">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
