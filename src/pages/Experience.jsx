import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import content from '../../content.json'

function Badges({ badges }) {
  if (!badges || badges.length === 0) return null
  return (
    <div className="badges">
      {badges.map((b, i) => (
        <span key={i} className={`badge ${b.variant === 'key' ? 'key' : ''}`}>{b.label}</span>
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
        <p className="section-eyebrow">Track Record</p>
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">{experience.sectionSubtitle}</p>

        {/* Timeline */}
        {timelineJobs.map((job) => (
          <div key={job.id} className="job">
            <div className="job-head">
              <h3>{job.title} · <span className="co">{job.company}</span></h3>
              <span className="period">{job.period}</span>
            </div>
            <Badges badges={job.badges} />
            {job.bullets.length > 0 && (
              <ul>
                {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            )}
          </div>
        ))}

        {/* Earlier roles: native details accordions */}
        {earlierJobs.length > 0 && (
          <div className="earlier-roles">
            <p className="section-eyebrow">Earlier Roles · 2020 and before</p>
            {earlierJobs.map((job) => (
              <details key={job.id} className="fold">
                <summary>
                  <span className="fold-title">{job.title} · <span className="co">{job.company}</span></span>
                  <span className="period">{job.period}</span>
                </summary>
                <ul>
                  {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </details>
            ))}
          </div>
        )}

        {/* Industry Presence */}
        {presence.length > 0 && (
          <div className="events">
            <p className="section-eyebrow">{experience.industryPresenceEyebrow}</p>
            <h2 className="section-title" style={{ fontSize: '28px' }}>{experience.industryPresenceHeading}</h2>
            <p className="section-subtitle">{experience.industryPresenceSubtitle}</p>

            <div className="event-grid">
              {presence.map((p, i) => (
                <div key={i} className={`event ${p.lead ? 'lead' : ''}`}>
                  <span className="yr">{p.period}</span>
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
