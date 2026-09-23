import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import useTypewriter from '../hooks/useTypewriter'
import content from '../../content.json'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function FeaturedCard({ item }) {
  const isExternal = /^https?:\/\//.test(item.href)
  const inner = (
    <>
      <span className="tag">{item.tag}</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <span className="go">{item.ctaLabel}</span>
    </>
  )
  return (
    <div className="card">
      {isExternal ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer"
           style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {inner}
        </a>
      ) : (
        <Link to={item.href} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {inner}
        </Link>
      )}
    </div>
  )
}

export default function Home() {
  const { hero } = content
  const typed = useTypewriter(hero.typewriterRoles, { typeSpeed: 65, deleteSpeed: 35, pauseMs: 2000 })
  const role = prefersReducedMotion ? hero.typewriterRoles[0] : typed

  return (
    <PageTransition>
      <Helmet>
        <title>Marvin Sta. Ana | Head of Content</title>
        <meta name="description" content="Head of Content at mb.io (MultiBank Group). 8+ years in FX/CFD, crypto, and Web3 content. 3 brands, 300+ posts, 150+ live blog articles." />
      </Helmet>

      <section className="hero">
        <p className="hero-eyebrow">{hero.eyebrow}</p>
        <h1 className="hero-name">{hero.name}</h1>

        <div className="typer-wrap">
          <span>{role}</span>
          {!prefersReducedMotion && <span className="cursor" />}
        </div>

        <p className="hero-sub">{hero.subtitle}</p>

        <div className="ctas">
          <Link to={hero.ctaPrimary.href} className="btn btn-primary">{hero.ctaPrimary.label}</Link>
          <Link to={hero.ctaSecondary.href} className="btn btn-outline">{hero.ctaSecondary.label}</Link>
          {hero.ctaCv && (
            <a href={hero.ctaCv.href} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              ↓ {hero.ctaCv.label}
            </a>
          )}
        </div>

        <p className="hero-sarcasm">{hero.sarcasticSubline}</p>

        {hero.stats && hero.stats.length > 0 && (
          <div className="ticker">
            {hero.stats.map((s, i) => (
              <div key={i} className={`tick ${s.highlight ? 'hi' : ''}`}>
                <div className="val">{s.value}{s.suffix ? ` ${s.suffix}` : ''}</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {hero.featured && hero.featured.length > 0 && (
        <section className="featured">
          <p className="section-eyebrow">{hero.featuredEyebrow || 'Selected Work'}</p>
          <h2 className="section-title">{hero.featuredTitle || 'Proof, not promises'}</h2>
          <p className="section-subtitle">{hero.featuredSubtitle}</p>

          <div className="cards">
            {hero.featured.map((item, i) => (
              <FeaturedCard key={i} item={item} />
            ))}
          </div>
        </section>
      )}
    </PageTransition>
  )
}
