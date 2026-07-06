import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const LINKS = [
  { to: '/',           label: 'Home', end: true },
  { to: '/about',      label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/education',  label: 'Education' },
  { to: '/skills',     label: 'Skills' },
  { to: '/portfolio',  label: 'Portfolio' },
  { to: '/contact',    label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={close} title="Home">MSA<span>.</span></Link>

          <ul className="nav-links">
            {LINKS.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            className={`nav-hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav-mobile ${open ? 'open' : ''}`}>
        {LINKS.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={close}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  )
}
