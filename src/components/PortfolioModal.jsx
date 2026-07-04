import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ArticleRenderer from './ArticleRenderer'
import GoogleAppAdMockup from './GoogleAppAdMockup'
import GoogleSearchAdMockup from './GoogleSearchAdMockup'

import { bitcoinHalvingContent } from '../data/articles/bitcoinHalving'
import { dedollarisationContent } from '../data/articles/dedollarisation'
import { oilTradingContent } from '../data/articles/oilTrading'
import { forexMistakesContent } from '../data/articles/forexMistakes'
import { movingAveragesContent } from '../data/articles/movingAverages'
import { storageCaseStudyContent } from '../data/articles/storageCaseStudy'
import { plumbingCaseStudyContent } from '../data/articles/plumbingCaseStudy'

const ARTICLES = {
  'bitcoin-halving': bitcoinHalvingContent,
  'dedollarisation': dedollarisationContent,
  'oil-trading': oilTradingContent,
  'forex-mistakes': forexMistakesContent,
  'moving-averages': movingAveragesContent,
  'storage-case-study': storageCaseStudyContent,
  'plumbing-case-study': plumbingCaseStudyContent,
}

const AD_MOCKUPS = {
  'google-app-campaigns': GoogleAppAdMockup,
  'google-search-campaigns': GoogleSearchAdMockup,
}

function getTitle(nodes) {
  const h1 = nodes.find(n => n.type === 'h1')
  return h1 ? h1.text : ''
}

export default function PortfolioModal({ item, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const isArticle = ARTICLES[item.modalId]
  const AdMockup = AD_MOCKUPS[item.modalId]

  const title = isArticle
    ? getTitle(ARTICLES[item.modalId])
    : item.title

  return (
    <motion.div
      className="pmodal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="pmodal-container"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Sticky header */}
        <div className="pmodal-header">
          <div className="pmodal-header-left">
            {item.tag && <span className="pmodal-tag">{item.tag}</span>}
            <h2 className="pmodal-title">{title}</h2>
          </div>
          <button className="pmodal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Scrollable content */}
        <div className="pmodal-body">
          <div className="pmodal-content">
            {item.resultBadge && (
              <div className="pmodal-result-badge">
                <span>📊</span> {item.resultBadge}
              </div>
            )}

            {isArticle && (
              <ArticleRenderer nodes={ARTICLES[item.modalId]} />
            )}

            {AdMockup && (
              <AdMockup />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
