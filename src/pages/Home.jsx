import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import useTypewriter from '../hooks/useTypewriter'
import content from '../../content.json'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function FeaturedCard({ item, delay }) {
  const isExternal = /^https?:\/\//.test(item.href)
  const inner = (
    <>
      <span className="featured-tag">{item.tag}</span>
      <h3 className="featured-title">{item.title}</h3>
      <p className="featured-desc">{item.description}</p>
      <span className="featured-cta">{item.ctaLabel}</span>
    </>
  )

  return (
    <motion.div
      className="featured-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
    >
      {isExternal ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="featured-card-link">
          {inner}
        </a>
      ) : (
        <Link to={item.href} className="featured-card-link">
          {inner}
        </Link>
      )}
    </motion.div>
  )
}

export default function Home() {
  const { hero } = content
  const typed = useTypewriter(hero.typewriterRoles, { typeSpeed: 65, deleteSpeed: 35, pauseMs: 2000 })
  const role = prefersReducedMotion ? hero.typewriterRoles[0] : typed

  return (
    <PageTransition>
      <section className="hero">
        <div className="hero-content">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            mb.io · MultiBank Group · Dubai, UAE
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Marvin Sta. Ana
          </motion.h1>

          <motion.div
            className="hero-typewriter-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <span>{role}</span>
            {!prefersReducedMotion && <span className="typewriter-cursor" />}
          </motion.div>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Link to={hero.ctaPrimary.href} className="btn btn-primary">
              {hero.ctaPrimary.label}
            </Link>
            <Link to={hero.ctaSecondary.href} className="btn btn-outline">
              {hero.ctaSecondary.label}
            </Link>
            {hero.ctaCv && (
              <a href={hero.ctaCv.href} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                {hero.ctaCv.label} ↓
              </a>
            )}
          </motion.div>

          <motion.p
            className="hero-sarcasm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            {hero.sarcasticSubline}
          </motion.p>
        </div>
      </section>

      {/* Stat ticker */}
      {hero.stats && hero.stats.length > 0 && (
        <motion.div
          className="stat-ticker"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="stat-ticker-inner">
            {hero.stats.map((s, i) => (
              <div key={i} className={`stat-cell ${s.highlight ? 'stat-cell--hl' : ''}`}>
                <div className="stat-value">
                  <span className="stat-num">{s.value}</span>
                  {s.suffix && <span className="stat-suffix">{s.suffix}</span>}
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Selected Work */}
      {hero.featured && hero.featured.length > 0 && (
        <section className="container section selected-work">
          <motion.p className="section-eyebrow"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            Selected Work
          </motion.p>
          <motion.h2 className="section-title"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
          >
            Proof, not promises
          </motion.h2>
          <motion.p className="section-subtitle"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            Three things that show how I run content: on the ground, in the calendar, and in the tooling.
          </motion.p>

          <div className="featured-grid">
            {hero.featured.map((item, i) => (
              <FeaturedCard key={i} item={item} delay={0.15 + i * 0.08} />
            ))}
          </div>
        </section>
      )}
    </PageTransition>
  )
}
