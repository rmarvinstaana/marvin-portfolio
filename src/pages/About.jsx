import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import content from '../../content.json'

// The bio paragraphs contain <b>...</b> markers around emphasized phrases.
// The copy is trusted local content, so we render it directly.
function HowIWorkHeading({ heading, accent }) {
  if (accent && heading.includes(accent)) {
    const [before, after] = heading.split(accent)
    return <h3>{before}<span>{accent}</span>{after}</h3>
  }
  return <h3>{heading}</h3>
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
        <p className="section-eyebrow">{about.eyebrow || 'Who is this guy'}</p>
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">{about.sectionSubtitle}</p>

        <div className="about-grid">
          <img src="/headshot.jpg" alt="Marvin Sta. Ana" className="avatar" />
          <div className="bio">
            {about.bio.map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
        </div>

        {about.funFacts && about.funFacts.length > 0 && (
          <div className="facts">
            {about.funFacts.map((fact, i) => (
              <div key={i} className="fact">
                <span className="emoji">{fact.emoji}</span>
                <span className="txt">{fact.label}</span>
              </div>
            ))}
          </div>
        )}

        {about.howIWork && (
          <div className="how">
            <p className="section-eyebrow">{about.howIWork.eyebrow || 'How I Work'}</p>
            <HowIWorkHeading heading={about.howIWork.heading} accent={about.howIWork.headingAccent} />
            {about.howIWork.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
