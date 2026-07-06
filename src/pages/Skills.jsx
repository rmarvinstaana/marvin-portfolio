import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import content from '../../content.json'

function Proof({ proof, href }) {
  if (!proof) return null
  const isInternal = href && href.startsWith('/')
  if (isInternal) {
    return <Link to={href} className="proof">{proof}</Link>
  }
  return <a className="proof" href={href || '#'}>{proof}</a>
}

export default function Skills() {
  const { skills } = content

  return (
    <PageTransition>
      <Helmet>
        <title>Skills | Marvin Sta. Ana</title>
        <meta name="description" content="Marvin Sta. Ana's skills: AI-native content production, event marketing, crypto and Web3, finance content, strategy, and growth." />
      </Helmet>
      <div className="container section">
        <p className="section-eyebrow">{skills.eyebrow || 'Toolkit'}</p>
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">{skills.sectionSubtitle}</p>

        <div className="skill-groups">
          {skills.groups.map((group) => (
            <div key={group.id} className={`sgroup ${group.hot ? 'hot' : ''}`}>
              <h3>{group.groupName}</h3>
              <Proof proof={group.proof} href={group.proofHref} />
              <div className="chips">
                {group.tags.map((tag, ti) => (
                  <span key={ti} className="chip">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
