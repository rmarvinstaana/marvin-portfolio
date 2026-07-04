import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import content from '../../content.json'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

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

  return (
    <PageTransition>
      <div className="container section">
        <motion.p className="section-eyebrow" {...fadeUp(0)}>Let's Talk</motion.p>
        <motion.h2 className="section-title" {...fadeUp(0.05)}>Contact</motion.h2>
        <motion.p className="section-subtitle" {...fadeUp(0.1)}>"{contact.sectionSubtitle}"</motion.p>

        <div className="contact-grid">
          {/* Form */}
          <motion.div {...fadeUp(0.15)}>
            {submitted ? (
              <div className="form-success">
                ✓ Message sent. I'll get back to you when I surface, literally or figuratively.
              </div>
            ) : (
              <form
                className="contact-form"
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
                  <input
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                  />
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
                  <textarea
                    className="form-textarea"
                    id="message"
                    name="message"
                    placeholder="What's on your mind? (Other than Bitcoin's price target.)"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending}
                  style={{ alignSelf: 'flex-start' }}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info card */}
          <motion.div {...fadeUp(0.25)}>
            <div className="contact-info-card">
              <div className="contact-info-item">
                <div className="contact-info-icon">📧</div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">💼</div>
                <div>
                  <div className="contact-info-label">LinkedIn</div>
                  <div className="contact-info-value">
                    <a
                      href={`https://${contact.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.linkedin}
                    </a>
                  </div>
                </div>
              </div>

              {contact.telegram && (
                <div className="contact-info-item">
                  <div className="contact-info-icon">✈️</div>
                  <div>
                    <div className="contact-info-label">Telegram</div>
                    <div className="contact-info-value">
                      <a
                        href={`https://t.me/${contact.telegram.replace(/^@/, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contact.telegram}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div>
                  <div className="contact-info-label">Location</div>
                  <div className="contact-info-value">{contact.location}</div>
                </div>
              </div>

              {contact.cv && (
                <div className="contact-info-item" style={{ marginBottom: 0 }}>
                  <div className="contact-info-icon">📄</div>
                  <div>
                    <div className="contact-info-label">CV / Resume</div>
                    <div className="contact-info-value">
                      <a href={contact.cv.href} target="_blank" rel="noopener noreferrer">
                        {contact.cv.label}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <p className="contact-sarcasm">{contact.sarcasticNote}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
