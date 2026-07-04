import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import SkillTag from '../components/SkillTag'
import content from '../../content.json'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

function ProofLine({ proof, href }) {
  if (!proof) return null
  if (href) {
    return <Link to={href} className="skill-proof skill-proof--link">{proof}</Link>
  }
  return <span className="skill-proof">{proof}</span>
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
        <motion.p className="section-eyebrow" {...fadeUp(0)}>{skills.eyebrow || 'Toolkit'}</motion.p>
        <motion.h2 className="section-title" {...fadeUp(0.05)}>Skills & Tools</motion.h2>
        <motion.p className="section-subtitle" {...fadeUp(0.1)}>"{skills.sectionSubtitle}"</motion.p>

        {/* Skill group cards */}
        <div className="skill-card-grid">
          {skills.groups.map((group, gi) => (
            <motion.div
              key={group.id}
              className={`skill-card ${group.hot ? 'skill-card--hot' : ''}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.06 }}
            >
              <div className="skill-card-head">
                <span className="skill-card-title">{group.groupName}</span>
                {group.hot && <span className="skill-hot-flag">HOT</span>}
              </div>
              <ProofLine proof={group.proof} href={group.proofHref} />
              <div className="tags-wrap skill-chips">
                {group.tags.map((tag, ti) => (
                  <SkillTag key={ti} label={tag} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools & platforms */}
        {skills.toolGroups && skills.toolGroups.length > 0 && (
          <div className="skills-section" style={{ marginTop: '64px' }}>
            <p className="skills-section-title">Tools & Platforms</p>
            {skills.toolGroups.map((group, gi) => (
              <motion.div
                key={group.id}
                className="skills-group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gi * 0.06 }}
              >
                <div className="skills-group-name">{group.groupName}</div>
                <div className="tags-wrap">
                  {group.tags.map((tag, ti) => (
                    <SkillTag key={ti} label={tag} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
