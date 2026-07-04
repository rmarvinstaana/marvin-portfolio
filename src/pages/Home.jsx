import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import useTypewriter from '../hooks/useTypewriter'
import content from '../../content.json'

export default function Home() {
  const { hero } = content
  const role = useTypewriter(hero.typewriterRoles, { typeSpeed: 65, deleteSpeed: 35, pauseMs: 2000 })

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
            <span className="typewriter-cursor" />
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
    </PageTransition>
  )
}
