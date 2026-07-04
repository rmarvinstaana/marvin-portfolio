import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import PortfolioModal from '../components/PortfolioModal'
import content from '../../content.json'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export default function Portfolio() {
  const { portfolio } = content
  const [active, setActive] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)

  const filtered = active === 'All'
    ? portfolio.items
    : portfolio.items.filter(item => item.category === active)

  const handleCardClick = (item) => {
    if (item.modalId) setSelectedItem(item)
  }

  return (
    <PageTransition>
      <div className="container section">
        <motion.p className="section-eyebrow" {...fadeUp(0)}>{portfolio.eyebrow || 'The Receipts'}</motion.p>
        <motion.h2 className="section-title" {...fadeUp(0.05)}>Portfolio</motion.h2>
        <motion.p className="section-subtitle" {...fadeUp(0.1)}>"{portfolio.sectionSubtitle}"</motion.p>

        {/* Filter Tabs */}
        <motion.div className="portfolio-tabs" {...fadeUp(0.15)}>
          {portfolio.categories.map(cat => (
            <button
              key={cat}
              className={`portfolio-tab ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Card Grid */}
        <motion.div className="portfolio-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const hasModal = !!item.modalId
              const hasMultiLinks = Array.isArray(item.links) && item.links.length > 0
              const hasExternalLink = !hasModal && !hasMultiLinks && item.link && item.link !== '#'

              return (
                <motion.div
                  key={item.id}
                  className={`portfolio-card ${item.featured ? 'portfolio-card--featured' : ''} ${hasModal ? 'portfolio-card--clickable' : ''}`}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => hasModal && handleCardClick(item)}
                  role={hasModal ? 'button' : undefined}
                  tabIndex={hasModal ? 0 : undefined}
                  onKeyDown={hasModal ? (e) => e.key === 'Enter' && handleCardClick(item) : undefined}
                >
                  {/* Themed visual header */}
                  <div className={`pcard-visual pcard-visual--${item.theme || 'mix'}`}>
                    <span className="pcard-glyph">{item.glyph || '📄'}</span>
                    {item.featured && <span className="pcard-flag">Built In-Role</span>}
                  </div>

                  <div className="pcard-body">
                    {/* Category tag */}
                    <span className="pcard-category">{item.category}</span>

                    {/* Title */}
                    <h3 className="portfolio-card-title">{item.title}</h3>

                    {/* Description */}
                    <p className="portfolio-card-desc">{item.description}</p>

                    {/* Badge pills */}
                    {item.badges && item.badges.length > 0 && (
                      <div className="pcard-badges">
                        {item.badges.map((b, i) => (
                          <span key={i} className="pcard-badge">{b}</span>
                        ))}
                      </div>
                    )}

                    {/* Single result badge */}
                    {item.resultBadge && (
                      <div className="portfolio-result-badge">📊 {item.resultBadge}</div>
                    )}

                    {/* Multiple result badges */}
                    {item.resultBadges && item.resultBadges.length > 0 && (
                      <div className="portfolio-result-badges">
                        {item.resultBadges.map((badge, i) => (
                          <div key={i} className="portfolio-result-badge-item">
                            <div className="portfolio-result-badge-value">{badge.value}</div>
                            <div className="portfolio-result-badge-label">{badge.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Modal CTA */}
                    {hasModal && (
                      <span className="pcard-cta" style={{ cursor: 'pointer' }}>
                        View Project →
                      </span>
                    )}

                    {/* Single external link with custom label */}
                    {hasExternalLink && (
                      <a
                        href={item.link}
                        className="pcard-cta"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.ctaLabel || 'View Project →'}
                      </a>
                    )}

                    {/* Multi-link buttons */}
                    {hasMultiLinks && (
                      <div className="portfolio-multi-links" onClick={(e) => e.stopPropagation()}>
                        {item.links.map((l, idx) => (
                          <a
                            key={idx}
                            href={l.href}
                            className="portfolio-multi-link-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {l.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <PortfolioModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
