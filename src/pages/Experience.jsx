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

function Badges({ badges }) {
  if (!badges || badges.length === 0) return null
  return (
    <div className="job-badges">
      {badges.map((b, i) => (
        <span key={i} className={`job-badge job-badge--${b.variant || 'amber'}`}>{b.label}</span>
      ))}
    </div>
  )
}

export default function Experience() {
  const { experience } = content
  const timelineJobs = experience.jobs.filter(j => !j.collapsed)
  const earlierJobs = experience.jobs.filter(j => j.collapsed)
  const presence = experience.industryPresence || []

  return (
    <PageTransition>
      <Helmet>
        <title>Experience | Marvin Sta. Ana</title>
        <meta name="description" content="The experience of Marvin Sta. Ana: Head of Content at mb.io (MultiBank Group) and eight years across fintech, FX/CFD, and Web3 content." />
      </Helmet>
      <div className="container section">
        <motion.p className="section-eyebrow" {...fadeUp(0)}>Career</motion.p>
        <motion.h2 className="section-title" {...fadeUp(0.05)}>Experience</motion.h2>
        <motion.p className="section-subtitle" {...fadeUp(0.1)}>"{experience.sectionSubtitle}"</motion.p>

        {/* Timeline */}
        <motion.div
          className="timeline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {timelineJobs.map((job, i) => (
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
                  <span className="timeline-period">{job.period}</span>
                  <span className="timeline-location">{job.location}</span>
                </div>
                <Badges badges={job.badges} />
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

        {/* Earlier roles: collapsible accordions */}
        {earlierJobs.length > 0 && (
          <div className="earlier-roles">
            <motion.p className="section-eyebrow" {...fadeUp(0)}>Earlier Roles · 2020 and before</motion.p>
            {earlierJobs.map((job) => (
              <details key={job.id} className="earlier-role">
                <summary className="earlier-role-summary">
                  <span className="earlier-role-head">
                    <span className="earlier-role-title">{job.title}</span>
                    <span className="earlier-role-company">{job.company}</span>
                  </span>
                  <span className="earlier-role-period">{job.period}</span>
                  <span className="earlier-role-indicator" aria-hidden="true" />
                </summary>
                <ul className="timeline-bullets earlier-role-bullets">
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        )}

        {/* Industry Presence */}
        {presence.length > 0 && (
          <>
            <hr className="divider" />

            <motion.p className="section-eyebrow" {...fadeUp(0)}>{experience.industryPresenceEyebrow}</motion.p>
            <motion.h3
              className="section-title"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
              {...fadeUp(0.05)}
            >
              {experience.industryPresenceHeading}
            </motion.h3>
            <motion.p className="section-subtitle" {...fadeUp(0.1)}>"{experience.industryPresenceSubtitle}"</motion.p>

            <div className="presence-grid">
              {presence.map((p, i) => (
                <motion.div
                  key={i}
                  className={`presence-card ${p.lead ? 'presence-card--lead' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <div className="presence-period">{p.period}</div>
                  <div className="presence-title">{p.title}</div>
                  <p className="presence-desc">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </PageTransition>
  )
}
