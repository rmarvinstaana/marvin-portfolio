import { useState } from 'react'
import { googleAppAds } from '../data/ads/googleAppAds'

function MbIcon() {
  return (
    <div style={{
      width: 48, height: 48, borderRadius: 10,
      background: 'linear-gradient(135deg, #f97316, #ea580c)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 800, fontSize: 15, flexShrink: 0,
      fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.5px',
    }}>mb</div>
  )
}

function StarRating({ rating = 4.5 }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < full ? 1 : (i === full && half ? 0.5 : 0)
        return (
          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id={`sg-${i}`}>
                <stop offset={`${filled * 100}%`} stopColor="#FBBC04" />
                <stop offset={`${filled * 100}%`} stopColor="#e0e0e0" />
              </linearGradient>
            </defs>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={`url(#sg-${i})`} />
          </svg>
        )
      })}
      <span style={{ fontSize: 11, color: '#5F6368', marginLeft: 2 }}>{rating}</span>
    </div>
  )
}

export default function GoogleAppAdMockup() {
  const [activeGroup, setActiveGroup] = useState(0)
  const [combIndex, setCombIndex] = useState(0)
  const group = googleAppAds.groups[activeGroup]
  const total = group.headlines.length

  const handleGroupSwitch = (idx) => {
    setActiveGroup(idx)
    setCombIndex(0)
  }

  const prev = () => setCombIndex(i => (i - 1 + total) % total)
  const next = () => setCombIndex(i => (i + 1) % total)

  const headline = group.headlines[combIndex]
  const description = group.descriptions[combIndex]

  return (
    <div className="ad-mockup-wrap">
      {/* Group tabs */}
      <div className="ad-mockup-tabs">
        {googleAppAds.groups.map((g, i) => (
          <button
            key={g.id}
            className={`ad-mockup-tab ${activeGroup === i ? 'active' : ''}`}
            onClick={() => handleGroupSwitch(i)}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Phone frame */}
      <div className="ad-phone-frame">
        {/* Google Play store card style */}
        <div className="gapp-card">
          {/* App header row */}
          <div className="gapp-header">
            <MbIcon />
            <div className="gapp-app-info">
              <div className="gapp-app-name">mb.io</div>
              <div className="gapp-app-sub">MultiBank Group</div>
              <StarRating rating={4.5} />
            </div>
            <button className="gapp-install-btn">Install</button>
          </div>

          {/* Ad copy */}
          <div className="gapp-copy">
            <div className="gapp-sponsored">Sponsored</div>
            <div className="gapp-headline">{headline}</div>
            <div className="gapp-description">{description}</div>
          </div>

          {/* Navigation */}
          <div className="ad-nav-row">
            <button className="ad-nav-btn" onClick={prev}>← Prev</button>
            <span className="ad-nav-counter">{combIndex + 1} / {total}</span>
            <button className="ad-nav-btn" onClick={next}>Next →</button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="ad-disclaimer">Trading involves risk.</p>
      </div>

      {/* All copy reference */}
      <div className="ad-copy-reference">
        <div className="ad-ref-section">
          <div className="ad-ref-label">All Headlines · {group.label}</div>
          {group.headlines.map((h, i) => (
            <div key={i} className={`ad-ref-item ${i === combIndex ? 'active' : ''}`} onClick={() => setCombIndex(i)}>
              <span className="ad-ref-num">{i + 1}</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
        <div className="ad-ref-section">
          <div className="ad-ref-label">All Descriptions · {group.label}</div>
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
