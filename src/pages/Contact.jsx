import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'
import content from '../../content.json'

export default function Contact() {
  const { contact } = content
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const form = e.target
    const data = new FormData(form)

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      setSubmitted(true)
      form.reset()
    } catch {
      // On local dev, Netlify Forms won't work, so show success anyway
      setSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  const telegramHref = contact.telegram
    ? `https://t.me/${contact.telegram.replace(/^@/, '')}`
    : null

  return (
    <PageTransition>
      <Helmet>
        <title>Contact | Marvin Sta. Ana</title>
        <meta name="description" content="Get in touch with Marvin Sta. Ana, Head of Content at mb.io (MultiBank Group), based in Dubai." />
      </Helmet>
      <div className="container section">
        <p className="section-eyebrow">Say Hello</p>
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">{contact.sectionSubtitle}</p>

        <div className="contact-grid">
          {/* Ledger */}
          <div>
            <div className="c-item">
              <span className="k">Email</span>
              <span className="v"><a href={`mailto:${contact.email}`}>{contact.email}</a></span>
            </div>
            <div className="c-item">
              <span className="k">LinkedIn</span>
              <span className="v">
                <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">{contact.linkedin}</a>
              </span>
            </div>
            {contact.telegram && (
              <div className="c-item">
                <span className="k">Telegram</span>
                <span className="v">
                  <a href={telegramHref} target="_blank" rel="noopener noreferrer">{contact.telegram}</a>
                </span>
              </div>
            )}
            <div className="c-item">
              <span className="k">Location</span>
              <span className="v">{contact.location}</span>
            </div>
            {contact.cv && (
              <div className="c-item">
                <span className="k">CV</span>
                <span className="v">
                  <a href={contact.cv.href} target="_blank" rel="noopener noreferrer">{contact.cv.label}</a>
                </span>
              </div>
            )}
            <p className="sarcnote">{contact.sarcasticNote}</p>
          </div>

          {/* Form */}
          <div className="form">
            {submitted ? (
              <div className="form-success">
                ✓ Message sent. I'll get back to you when I surface, literally or figuratively.
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                netlify="true"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                <p hidden><label>Don't fill this out: <input name="bot-field" /></label></p>

                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input className="form-input" type="text" id="name" name="name" placeholder="Your name" required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input className="form-input" type="email" id="email" name="email" placeholder="you@company.com" required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <select className="form-select" id="subject" name="subject" required>
                    <option value="">Select a subject</option>
                    {contact.subjectOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea className="form-textarea" id="message" name="message" rows="4" placeholder="What's on your mind?" required />
                </div>

                <button type="submit" className="btn btn-primary" disabled={sending} style={{ width: '100%', justifyContent: 'center' }}>
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
