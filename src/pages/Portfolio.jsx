import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import PortfolioModal from '../components/PortfolioModal'
import content from '../../content.json'

export default function Portfolio() {
  const { portfolio } = content
  const [active, setActive] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)

  const filtered = active === 'All'
    ? portfolio.items
    : portfolio.items.filter(item => item.category === active)

  const openModal = (item) => { if (item.modalId) setSelectedItem(item) }

  return (
    <PageTransition>
      <Helmet>
        <title>Portfolio | Marvin Sta. Ana</title>
        <meta name="description" content="Marvin Sta. Ana's portfolio: campaigns, SEO case studies, content tooling, newsletters, and ad copy across crypto and finance." />
      </Helmet>
      <div className="container section">
        <p className="section-eyebrow">{portfolio.eyebrow || 'The Receipts'}</p>
        <h2 className="section-title">Portfolio</h2>
        <p className="section-subtitle">{portfolio.sectionSubtitle}</p>

        {/* Filter pills */}
        <div className="filters">
          {portfolio.categories.map(cat => (
            <button
              key={cat}
              className={`filter ${active === cat ? 'on' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card grid */}
        <div className="pf-grid">
          {filtered.map((item) => {
            const hasModal = !!item.modalId
            const hasMultiLinks = Array.isArray(item.links) && item.links.length > 0
            const hasExternalLink = !hasModal && !hasMultiLinks && item.link && item.link !== '#'

            return (
              <div
                key={item.id}
                className={`pf ${item.featured ? 'wide' : ''} ${hasModal ? 'pf--clickable' : ''}`}
                onClick={() => hasModal && openModal(item)}
                role={hasModal ? 'button' : undefined}
                tabIndex={hasModal ? 0 : undefined}
                onKeyDown={hasModal ? (e) => e.key === 'Enter' && openModal(item) : undefined}
              >
                <div className="pf-thumb">
                  <span className="pf-num">{item.index}</span>
                  {item.flag && <span className="pf-flag">{item.flag}</span>}
                </div>

                <div className="pf-body">
                  <span className="tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  {item.badges && item.badges.length > 0 && (
                    <div className="pf-badges">
                      {item.badges.map((b, i) => <span key={i} className="pf-badge">{b}</span>)}
                    </div>
                  )}

                  {item.resultBadges && item.resultBadges.length > 0 && (
                    <div className="pf-result-badges">
                      {item.resultBadges.map((badge, i) => (
                        <div key={i} className="pf-result-badge-item">
                          <div className="pf-result-badge-value">{badge.value}</div>
                          <div className="pf-result-badge-label">{badge.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.resultBadge && (
                    <div className="pf-badges"><span className="pf-badge">{item.resultBadge}</span></div>
                  )}

                  {hasMultiLinks && (
                    <div className="pf-multi-links" onClick={(e) => e.stopPropagation()}>
                      {item.links.map((l, idx) => (
                        <a key={idx} href={l.href} className="pf-multi-link" target="_blank" rel="noopener noreferrer">
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}

                  {hasModal && <span className="go">View Project →</span>}

                  {hasExternalLink && (
                    <a
                      href={item.link}
                      className="go"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.ctaLabel || 'View Project →'}
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
