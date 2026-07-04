import { useState } from 'react'
import { googleSearchAds } from '../data/ads/googleSearchAds'

function GoogleLogo() {
  const letters = [
    { char: 'G', color: '#4285F4' }, { char: 'o', color: '#EA4335' },
    { char: 'o', color: '#FBBC05' }, { char: 'g', color: '#4285F4' },
    { char: 'l', color: '#34A853' }, { char: 'e', color: '#EA4335' },
  ]
  return (
    <div style={{ fontSize: 26, fontWeight: 700, fontFamily: 'Arial, sans-serif', letterSpacing: '-1px', lineHeight: 1 }}>
      {letters.map((l, i) => <span key={i} style={{ color: l.color }}>{l.char}</span>)}
    </div>
  )
}

export default function GoogleSearchAdMockup() {
  const [activeGroup, setActiveGroup] = useState(0)
  const [combIndex, setCombIndex] = useState(0)
  const group = googleSearchAds.groups[activeGroup]
  const total = group.headlines.length

  const handleGroupSwitch = (idx) => {
    setActiveGroup(idx)
    setCombIndex(0)
  }

  const prev = () => setCombIndex(i => (i - 1 + total) % total)
  const next = () => setCombIndex(i => (i + 1) % total)

  // Build rotating headline pair: headlines[i] | headlines[(i+1) % total]
  const h1 = group.headlines[combIndex]
  const h2 = group.headlines[(combIndex + 1) % total]
  const desc = group.descriptions[combIndex % group.descriptions.length]

  return (
    <div className="ad-mockup-wrap">
      {/* Group tabs */}
      <div className="ad-mockup-tabs">
        {googleSearchAds.groups.map((g, i) => (
          <button
            key={g.id}
            className={`ad-mockup-tab ${activeGroup === i ? 'active' : ''}`}
            onClick={() => handleGroupSwitch(i)}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* SERP mockup */}
      <div className="gserp-frame">
        {/* Google logo + search bar */}
        <div className="gserp-top">
          <GoogleLogo />
          <div className="gserp-searchbar">
            <span className="gserp-query">{group.searchQuery}</span>
            <span className="gserp-search-icon">🔍</span>
          </div>
        </div>

        <div className="gserp-divider" />

        {/* Ad result */}
        <div className="gserp-result">
          <div className="gserp-sponsored">Sponsored</div>
          <div className="gserp-display-url">
            <span className="gserp-domain">{group.displayUrl}</span>
            <span className="gserp-url-caret">›</span>
          </div>
          <div className="gserp-headline">
            {h1} | {h2}
          </div>
          <div className="gserp-description">{desc}</div>
        </div>

        {/* Navigation */}
        <div className="ad-nav-row" style={{ marginTop: 16 }}>
          <button className="ad-nav-btn" onClick={prev}>← Prev</button>
          <span className="ad-nav-counter">{combIndex + 1} / {total}</span>
          <button className="ad-nav-btn" onClick={next}>Next →</button>
        </div>

        <p className="ad-disclaimer">Trading involves risk.</p>
      </div>

      {/* Full copy reference */}
      <div className="ad-copy-reference">
        <div className="ad-ref-section">
          <div className="ad-ref-label">All Headlines — {group.label}</div>
          {group.headlines.map((h, i) => (
            <div key={i} className={`ad-ref-item ${i === combIndex ? 'active' : ''}`} onClick={() => setCombIndex(i)}>
              <span className="ad-ref-num">{i + 1}</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
        <div className="ad-ref-section">
          <div className="ad-ref-label">All Descriptions — {group.label}</div>
          {group.descriptions.map((d, i) => (
            <div key={i} className={`ad-ref-item ${i === combIndex ? 'active' : ''}`} onClick={() => setCombIndex(i)}>
              <span className="ad-ref-num">{i + 1}</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
