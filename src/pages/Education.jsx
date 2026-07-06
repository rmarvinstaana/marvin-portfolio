import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import content from '../../content.json'

export default function Education() {
  const { education } = content

  return (
    <PageTransition>
      <Helmet>
        <title>Education | Marvin Sta. Ana</title>
        <meta name="description" content="Marvin Sta. Ana's education: an MBA from King's Business School and a BFA from Ateneo de Manila University, plus ongoing certifications." />
      </Helmet>
      <div className="container section">
        <p className="section-eyebrow">{education.eyebrow || 'Foundations'}</p>
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">{education.sectionSubtitle}</p>

        {/* Degrees */}
        <p className="section-eyebrow" style={{ marginTop: '8px' }}>Degrees</p>
        <div className="deg-grid">
          {education.degrees.map((deg) => (
            <div key={deg.id} className={`deg-card ${deg.lead ? 'lead-deg' : ''}`}>
              <span className="deg-tag">{deg.tag}</span>
              <h3>{deg.degree}</h3>
              <div className="deg-school">{deg.institution}</div>
              <div className="deg-year">{deg.period}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <p className="section-eyebrow" style={{ marginTop: '64px' }}>Licenses &amp; Certifications</p>
        <div className="cert-grid">
          {education.certifications.map((cert) => (
            <div key={cert.id} className={`cert-card ${cert.hot ? 'hot-cert' : ''}`}>
              <h4>{cert.name}</h4>
              <div className="cert-org">{cert.issuer}</div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
