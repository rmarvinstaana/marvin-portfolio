import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import SkillTag from '../components/SkillTag'
import content from '../../content.json'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export default function Skills() {
  const { skills } = content

  return (
    <PageTransition>
      <div className="container section">
        <motion.p className="section-eyebrow" {...fadeUp(0)}>Capabilities</motion.p>
        <motion.h2 className="section-title" {...fadeUp(0.05)}>Skills & Tools</motion.h2>
        <motion.p className="section-subtitle" {...fadeUp(0.1)}>"{skills.sectionSubtitle}"</motion.p>

        {/* Skill Groups */}
        <div className="skills-section">
          <p className="skills-section-title">Skills</p>
          {skills.groups.map((group, gi) => (
            <motion.div
              key={group.id}
              className="skills-group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.08 }}
            >
              <div className="skills-group-name">{group.groupName}</div>
              <div className="tags-wrap">
                {group.tags.map((tag, ti) => (
                  <motion.span
                    key={ti}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: ti * 0.03 }}
                  >
                    <SkillTag label={tag} />
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tool Groups */}
        <div className="skills-section">
          <p className="skills-section-title">Tools & Platforms</p>
          {skills.toolGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              className="skills-group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.08 }}
            >
              <div className="skills-group-name">{group.groupName}</div>
              <div className="tags-wrap">
                {group.tags.map((tag, ti) => (
                  <motion.span
                    key={ti}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: ti * 0.03 }}
                  >
                    <SkillTag label={tag} />
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
