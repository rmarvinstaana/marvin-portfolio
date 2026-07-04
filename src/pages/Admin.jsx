import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import PageTransition from '../components/PageTransition'

const TABS = ['Hero', 'About', 'Experience', 'Education', 'Skills', 'Portfolio', 'Contact']

const AdminHelmet = () => (
  <Helmet>
    <title>Admin | Marvin Sta. Ana</title>
    <meta name="robots" content="noindex, nofollow" />
  </Helmet>
)

/* ─── Tiny modal for add/edit forms ─────────────────────────────── */
function Modal({ title, onClose, children }) {
  return (
    <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        className="admin-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="admin-modal-title">{title}</h3>
        {children}
      </motion.div>
    </div>
  )
}

/* ─── Save to Netlify Function (password verified server-side) ───── */
async function saveContent(content, password) {
  const res = await fetch('/.netlify/functions/save-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, content }),
  })
  if (!res.ok) {
    let msg = await res.text()
    try { msg = JSON.parse(msg).error || msg } catch { /* keep raw text */ }
    const err = new Error(msg)
    err.status = res.status
    throw err
  }
  return res.json()
}

/* ─── Hero Tab ──────────────────────────────────────────────────── */
function HeroTab({ data, onChange, onSave, saveStatus }) {
  const h = data.hero
  const set = (patch) => onChange('hero', { ...h, ...patch })
  const setCta = (key, field, value) => set({ [key]: { ...(h[key] || {}), [field]: value } })

  const stats = h.stats || []
  const featured = h.featured || []

  return (
    <div>
      <div className="admin-section-title">Hero Text</div>

      <div className="form-group" style={{ marginBottom: 14 }}>
        <label className="form-label">Subtitle</label>
        <input className="form-input" value={h.subtitle || ''} onChange={e => set({ subtitle: e.target.value })} />
      </div>
      <div className="form-group" style={{ marginBottom: 14 }}>
        <label className="form-label">Sarcastic Subline</label>
        <input className="form-input" value={h.sarcasticSubline || ''} onChange={e => set({ sarcasticSubline: e.target.value })} />
      </div>
      <div className="form-group" style={{ marginBottom: 14 }}>
        <label className="form-label">Typewriter Roles (one per line)</label>
        <textarea
          className="admin-textarea"
          value={(h.typewriterRoles || []).join('\n')}
          onChange={e => set({ typewriterRoles: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
        />
      </div>

      <div className="admin-section-title" style={{ marginTop: 24 }}>Call To Action Buttons</div>
      {[['ctaPrimary', 'Primary'], ['ctaSecondary', 'Secondary'], ['ctaCv', 'CV Download']].map(([key, label]) => (
        <div key={key} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">{label} Label</label>
            <input className="form-input" value={(h[key] || {}).label || ''} onChange={e => setCta(key, 'label', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">{label} Href</label>
            <input className="form-input" value={(h[key] || {}).href || ''} onChange={e => setCta(key, 'href', e.target.value)} />
          </div>
        </div>
      ))}

      <div className="admin-section-title" style={{ marginTop: 24 }}>Stat Ticker</div>
      {stats.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ width: 90 }}>
            <label className="form-label">Value</label>
            <input className="form-input" value={s.value} onChange={e => {
              const arr = [...stats]; arr[i] = { ...arr[i], value: e.target.value }; set({ stats: arr })
            }} />
          </div>
          <div className="form-group" style={{ width: 90 }}>
            <label className="form-label">Suffix</label>
            <input className="form-input" value={s.suffix} onChange={e => {
              const arr = [...stats]; arr[i] = { ...arr[i], suffix: e.target.value }; set({ stats: arr })
            }} />
          </div>
          <div className="form-group" style={{ flex: 1, minWidth: 160 }}>
            <label className="form-label">Label</label>
            <input className="form-input" value={s.label} onChange={e => {
              const arr = [...stats]; arr[i] = { ...arr[i], label: e.target.value }; set({ stats: arr })
            }} />
          </div>
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 12 }}>
            <input type="checkbox" checked={!!s.highlight} onChange={e => {
              const arr = [...stats]; arr[i] = { ...arr[i], highlight: e.target.checked }; set({ stats: arr })
            }} /> Highlight
          </label>
          <button className="admin-btn-delete" style={{ marginBottom: 8 }} onClick={() => set({ stats: stats.filter((_, j) => j !== i) })}>✕</button>
        </div>
      ))}
      <button className="admin-btn-add" onClick={() => set({ stats: [...stats, { value: '', suffix: '', label: '', highlight: false }] })}>+ Add Stat</button>

      <div className="admin-section-title" style={{ marginTop: 32 }}>Featured (Selected Work)</div>
      {featured.map((item, i) => (
        <div key={i} style={{ border: '1px solid var(--line)', borderRadius: 8, padding: 14, marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <div className="form-group" style={{ width: 160 }}>
              <label className="form-label">Tag</label>
              <input className="form-input" value={item.tag} onChange={e => {
                const arr = [...featured]; arr[i] = { ...arr[i], tag: e.target.value }; set({ featured: arr })
              }} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Title</label>
              <input className="form-input" value={item.title} onChange={e => {
                const arr = [...featured]; arr[i] = { ...arr[i], title: e.target.value }; set({ featured: arr })
              }} />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: 8 }}>
            <label className="form-label">Description</label>
            <textarea className="admin-textarea" value={item.description} onChange={e => {
              const arr = [...featured]; arr[i] = { ...arr[i], description: e.target.value }; set({ featured: arr })
            }} />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">CTA Label</label>
              <input className="form-input" value={item.ctaLabel} onChange={e => {
                const arr = [...featured]; arr[i] = { ...arr[i], ctaLabel: e.target.value }; set({ featured: arr })
              }} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Href</label>
              <input className="form-input" value={item.href} onChange={e => {
                const arr = [...featured]; arr[i] = { ...arr[i], href: e.target.value }; set({ featured: arr })
              }} />
            </div>
            <button className="admin-btn-delete" style={{ marginBottom: 8 }} onClick={() => set({ featured: featured.filter((_, j) => j !== i) })}>✕</button>
          </div>
        </div>
      ))}
      <button className="admin-btn-add" onClick={() => set({ featured: [...featured, { tag: '', title: '', description: '', ctaLabel: '', href: '' }] })}>+ Add Featured</button>

      <SaveBar onSave={onSave} status={saveStatus} />
    </div>
  )
}

/* ─── About Tab ─────────────────────────────────────────────────── */
function AboutTab({ data, onChange, onSave, saveStatus }) {
  const about = data.about
  const howIWork = about.howIWork || { heading: '', paragraphs: [] }

  return (
    <div>
      <div className="admin-section-title">About Section</div>

      <div className="form-group" style={{ marginBottom: 16 }}>
        <label className="form-label">Section Subtitle (sarcastic line)</label>
        <input
          className="form-input"
          value={about.sectionSubtitle}
          onChange={e => onChange('about', { ...about, sectionSubtitle: e.target.value })}
        />
      </div>

      <div className="form-group" style={{ marginBottom: 16 }}>
        <label className="form-label">Bio Paragraphs (blank line between paragraphs)</label>
        <textarea
          className="admin-textarea"
          style={{ minHeight: 200 }}
          value={about.bio.join('\n\n')}
          onChange={e => onChange('about', { ...about, bio: e.target.value.split('\n\n').map(s => s.trim()).filter(Boolean) })}
        />
      </div>

      <div className="admin-section-title" style={{ marginTop: 24 }}>Fun Facts</div>
      {about.funFacts.map((fact, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input
            className="form-input"
            style={{ width: 60 }}
            value={fact.emoji}
            onChange={e => {
              const arr = [...about.funFacts]
              arr[i] = { ...arr[i], emoji: e.target.value }
              onChange('about', { ...about, funFacts: arr })
            }}
            placeholder="Emoji"
          />
          <input
            className="form-input"
            value={fact.label}
            onChange={e => {
              const arr = [...about.funFacts]
              arr[i] = { ...arr[i], label: e.target.value }
              onChange('about', { ...about, funFacts: arr })
            }}
            placeholder="Label"
          />
          <button
            className="admin-btn-delete"
            onClick={() => onChange('about', { ...about, funFacts: about.funFacts.filter((_, j) => j !== i) })}
          >✕</button>
        </div>
      ))}
      <button
        className="admin-btn-add"
        onClick={() => onChange('about', { ...about, funFacts: [...about.funFacts, { emoji: '⭐', label: 'New Fact' }] })}
      >+ Add Fact</button>

      <div className="admin-section-title" style={{ marginTop: 32 }}>How I Work</div>
      <div className="form-group" style={{ marginBottom: 14 }}>
        <label className="form-label">Heading</label>
        <input
          className="form-input"
          value={howIWork.heading}
          onChange={e => onChange('about', { ...about, howIWork: { ...howIWork, heading: e.target.value } })}
        />
      </div>
      <div className="form-group" style={{ marginBottom: 14 }}>
        <label className="form-label">Paragraphs (blank line between paragraphs)</label>
        <textarea
          className="admin-textarea"
          style={{ minHeight: 160 }}
          value={(howIWork.paragraphs || []).join('\n\n')}
          onChange={e => onChange('about', { ...about, howIWork: { ...howIWork, paragraphs: e.target.value.split('\n\n').map(s => s.trim()).filter(Boolean) } })}
        />
      </div>

      <SaveBar onSave={onSave} status={saveStatus} />
    </div>
  )
}

/* ─── Experience Tab ─────────────────────────────────────────────── */
function ExperienceTab({ data, onChange, onSave, saveStatus }) {
  const [modal, setModal] = useState(null) // { type: 'job'|'presence', item, idx }

  const exp = data.experience
  const jobs = exp.jobs
  const presence = exp.industryPresence || []

  const saveJob = (form, idx) => {
    const badges = (form.badgesText || '').split('\n').map(l => l.trim()).filter(Boolean).map(l => {
      const [label, variant] = l.split('|').map(s => s.trim())
      return { label, variant: variant || 'amber' }
    })
    const job = {
      id: form.id || `job-${Date.now()}`,
      title: form.title,
      company: form.company,
      period: form.period,
      location: form.location,
      collapsed: !!form.collapsed,
      badges,
      bullets: (form.bullets || '').split('\n').map(s => s.trim()).filter(Boolean),
    }
    const arr = [...jobs]
    if (idx === -1) arr.push(job)
    else arr[idx] = job
    onChange('experience', { ...exp, jobs: arr })
    setModal(null)
  }

  const savePresence = (form, idx) => {
    const item = {
      period: form.period,
      title: form.title,
      lead: !!form.lead,
      description: form.description,
    }
    const arr = [...presence]
    if (idx === -1) arr.push(item)
    else arr[idx] = item
    onChange('experience', { ...exp, industryPresence: arr })
    setModal(null)
  }

  const openJob = (job, idx) => setModal({
    type: 'job',
    idx,
    item: {
      ...job,
      bullets: (job.bullets || []).join('\n'),
      badgesText: (job.badges || []).map(b => `${b.label}|${b.variant || 'amber'}`).join('\n'),
      collapsed: !!job.collapsed,
    },
  })

  return (
    <div>
      <div className="form-group" style={{ marginBottom: 16 }}>
        <label className="form-label">Section Subtitle</label>
        <input className="form-input" value={exp.sectionSubtitle} onChange={e => onChange('experience', { ...exp, sectionSubtitle: e.target.value })} />
      </div>

      <div className="admin-section-title">Work Experience</div>
      {jobs.map((job, i) => (
        <div key={job.id} className="admin-list-item">
          <div className="admin-list-item-info">
            <div className="admin-list-item-title">{job.title} {job.collapsed && <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>(collapsed)</span>}</div>
            <div className="admin-list-item-sub">{job.company} · {job.period}</div>
          </div>
          <div className="admin-item-actions">
            <button className="admin-btn-edit" onClick={() => openJob(job, i)}>Edit</button>
            <button className="admin-btn-delete" onClick={() => onChange('experience', { ...exp, jobs: jobs.filter((_, j) => j !== i) })}>Delete</button>
          </div>
        </div>
      ))}
      <button className="admin-btn-add" onClick={() => setModal({ type: 'job', idx: -1, item: { title: '', company: '', period: '', location: '', bullets: '', badgesText: '', collapsed: false } })}>+ Add Role</button>

      <div className="admin-section-title" style={{ marginTop: 32 }}>Industry Presence</div>
      <div className="form-group" style={{ marginBottom: 10 }}>
        <label className="form-label">Eyebrow</label>
        <input className="form-input" value={exp.industryPresenceEyebrow || ''} onChange={e => onChange('experience', { ...exp, industryPresenceEyebrow: e.target.value })} />
      </div>
      <div className="form-group" style={{ marginBottom: 10 }}>
        <label className="form-label">Heading</label>
        <input className="form-input" value={exp.industryPresenceHeading || ''} onChange={e => onChange('experience', { ...exp, industryPresenceHeading: e.target.value })} />
      </div>
      <div className="form-group" style={{ marginBottom: 16 }}>
        <label className="form-label">Subtitle</label>
        <input className="form-input" value={exp.industryPresenceSubtitle || ''} onChange={e => onChange('experience', { ...exp, industryPresenceSubtitle: e.target.value })} />
      </div>
      {presence.map((p, i) => (
        <div key={i} className="admin-list-item">
          <div className="admin-list-item-info">
            <div className="admin-list-item-title">{p.title} {p.lead && <span style={{ color: 'var(--amber)', fontSize: '0.75rem' }}>(lead)</span>}</div>
            <div className="admin-list-item-sub">{p.period}</div>
          </div>
          <div className="admin-item-actions">
            <button className="admin-btn-edit" onClick={() => setModal({ type: 'presence', idx: i, item: { ...p } })}>Edit</button>
            <button className="admin-btn-delete" onClick={() => onChange('experience', { ...exp, industryPresence: presence.filter((_, j) => j !== i) })}>Delete</button>
          </div>
        </div>
      ))}
      <button className="admin-btn-add" onClick={() => setModal({ type: 'presence', idx: -1, item: { period: '', title: '', description: '', lead: false } })}>+ Add Presence</button>

      <SaveBar onSave={onSave} status={saveStatus} />

      {modal?.type === 'job' && (
        <Modal title={modal.idx === -1 ? 'Add Role' : 'Edit Role'} onClose={() => setModal(null)}>
          <JobForm item={modal.item} onSave={(form) => saveJob(form, modal.idx)} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'presence' && (
        <Modal title={modal.idx === -1 ? 'Add Presence' : 'Edit Presence'} onClose={() => setModal(null)}>
          <PresenceForm item={modal.item} onSave={(form) => savePresence(form, modal.idx)} onClose={() => setModal(null)} />
        </Modal>
      )}
    </div>
  )
}

function JobForm({ item, onSave, onClose }) {
  const [form, setForm] = useState(item)
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))
  return (
    <>
      {[['title', 'Title'], ['company', 'Company'], ['period', 'Period'], ['location', 'Location']].map(([k, l]) => (
        <div className="form-group" key={k} style={{ marginBottom: 12 }}>
          <label className="form-label">{l}</label>
          <input className="form-input" value={form[k] || ''} onChange={f(k)} />
        </div>
      ))}
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={!!form.collapsed} onChange={e => setForm(p => ({ ...p, collapsed: e.target.checked }))} />
          Collapsed (renders as an accordion under Earlier Roles)
        </label>
      </div>
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Badges (one per line, format: label|variant where variant is amber or blue)</label>
        <textarea className="admin-textarea" value={form.badgesText || ''} onChange={f('badgesText')} placeholder="200+ posts · 5 platforms|amber" />
      </div>
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Bullet Points (one per line)</label>
        <textarea className="admin-textarea" style={{ minHeight: 160 }} value={form.bullets || ''} onChange={f('bullets')} />
      </div>
      <div className="admin-modal-actions">
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSave(form)}>Save</button>
      </div>
    </>
  )
}

function PresenceForm({ item, onSave, onClose }) {
  const [form, setForm] = useState(item)
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))
  return (
    <>
      {[['period', 'Period'], ['title', 'Title']].map(([k, l]) => (
        <div className="form-group" key={k} style={{ marginBottom: 12 }}>
          <label className="form-label">{l}</label>
          <input className="form-input" value={form[k] || ''} onChange={f(k)} />
        </div>
      ))}
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={!!form.lead} onChange={e => setForm(p => ({ ...p, lead: e.target.checked }))} />
          Lead (full-width, amber wash)
        </label>
      </div>
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Description</label>
        <textarea className="admin-textarea" value={form.description || ''} onChange={f('description')} />
      </div>
      <div className="admin-modal-actions">
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSave(form)}>Save</button>
      </div>
    </>
  )
}

/* ─── Education Tab ──────────────────────────────────────────────── */
function EducationTab({ data, onChange, onSave, saveStatus }) {
  const [modal, setModal] = useState(null)
  const degrees = data.education.degrees
  const certs = data.education.certifications

  const saveDeg = (item, idx) => {
    const arr = [...degrees]
    if (idx === -1) arr.push({ ...item, id: `edu-${Date.now()}` })
    else arr[idx] = item
    onChange('education', { ...data.education, degrees: arr })
    setModal(null)
  }

  const saveCert = (item, idx) => {
    const arr = [...certs]
    if (idx === -1) arr.push({ ...item, id: `cert-${Date.now()}` })
    else arr[idx] = item
    onChange('education', { ...data.education, certifications: arr })
    setModal(null)
  }

  return (
    <div>
      <div className="admin-section-title">Degrees</div>
      {degrees.map((deg, i) => (
        <div key={deg.id} className="admin-list-item">
          <div className="admin-list-item-info">
            <div className="admin-list-item-title">{deg.degree}</div>
            <div className="admin-list-item-sub">{deg.institution} · {deg.period}</div>
          </div>
          <div className="admin-item-actions">
            <button className="admin-btn-edit" onClick={() => setModal({ type: 'deg', item: { ...deg }, idx: i })}>Edit</button>
            <button className="admin-btn-delete" onClick={() => onChange('education', { ...data.education, degrees: degrees.filter((_, j) => j !== i) })}>Delete</button>
          </div>
        </div>
      ))}
      <button className="admin-btn-add" onClick={() => setModal({ type: 'deg', item: { degree: '', institution: '', period: '' }, idx: -1 })}>+ Add Degree</button>

      <div className="admin-section-title" style={{ marginTop: 32 }}>Certifications</div>
      {certs.map((cert, i) => (
        <div key={cert.id} className="admin-list-item">
          <div className="admin-list-item-info">
            <div className="admin-list-item-title">{cert.name}</div>
            <div className="admin-list-item-sub">{cert.issuer}</div>
          </div>
          <div className="admin-item-actions">
            <button className="admin-btn-edit" onClick={() => setModal({ type: 'cert', item: { ...cert }, idx: i })}>Edit</button>
            <button className="admin-btn-delete" onClick={() => onChange('education', { ...data.education, certifications: certs.filter((_, j) => j !== i) })}>Delete</button>
          </div>
        </div>
      ))}
      <button className="admin-btn-add" onClick={() => setModal({ type: 'cert', item: { name: '', issuer: '' }, idx: -1 })}>+ Add Certification</button>

      <SaveBar onSave={onSave} status={saveStatus} />

      {modal?.type === 'deg' && (
        <Modal title={modal.idx === -1 ? 'Add Degree' : 'Edit Degree'} onClose={() => setModal(null)}>
          <SimpleForm fields={[['degree', 'Degree'], ['institution', 'Institution'], ['period', 'Period']]} item={modal.item} onSave={(it) => saveDeg({ ...it, id: modal.item.id || `edu-${Date.now()}` }, modal.idx)} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'cert' && (
        <Modal title={modal.idx === -1 ? 'Add Certification' : 'Edit Certification'} onClose={() => setModal(null)}>
          <SimpleForm fields={[['name', 'Name'], ['issuer', 'Issuer']]} item={modal.item} onSave={(it) => saveCert({ ...it, id: modal.item.id || `cert-${Date.now()}` }, modal.idx)} onClose={() => setModal(null)} />
        </Modal>
      )}
    </div>
  )
}

/* ─── Skills Tab ─────────────────────────────────────────────────── */
function SkillsTab({ data, onChange, onSave, saveStatus }) {
  const renderGroup = (groupKey, groupList, groupIdPrefix, primary) => (
    <>
      {groupList.map((group, gi) => {
        const update = (patch) => {
          const arr = [...groupList]
          arr[gi] = { ...arr[gi], ...patch }
          onChange('skills', { ...data.skills, [groupKey]: arr })
        }
        return (
          <div key={group.id} style={{ marginBottom: 28, border: '1px solid var(--line)', borderRadius: 8, padding: 14 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
              <input
                className="form-input"
                value={group.groupName}
                onChange={e => update({ groupName: e.target.value })}
                style={{ fontWeight: 600 }}
              />
              <button
                className="admin-btn-delete"
                onClick={() => onChange('skills', { ...data.skills, [groupKey]: groupList.filter((_, j) => j !== gi) })}
              >✕</button>
            </div>

            {primary && (
              <>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <input type="checkbox" checked={!!group.hot} onChange={e => update({ hot: e.target.checked })} /> Hot (amber highlight)
                </label>
                <div className="form-group" style={{ marginBottom: 8 }}>
                  <label className="form-label">Proof line</label>
                  <input className="form-input" value={group.proof || ''} onChange={e => update({ proof: e.target.value })} />
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <label className="form-label">Proof link (blank for none)</label>
                  <input className="form-input" value={group.proofHref || ''} onChange={e => update({ proofHref: e.target.value || null })} />
                </div>
              </>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {group.tags.map((tag, ti) => (
                <div key={ti} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--line)', borderRadius: 6, padding: '4px 8px' }}>
                  <input
                    style={{ background: 'none', border: 'none', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', width: `${tag.length + 2}ch`, outline: 'none' }}
                    value={tag}
                    onChange={e => {
                      const tags = [...group.tags]; tags[ti] = e.target.value; update({ tags })
                    }}
                  />
                  <button style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.75rem' }} onClick={() => update({ tags: group.tags.filter((_, j) => j !== ti) })}>✕</button>
                </div>
              ))}
              <button style={{ background: 'none', border: '1px dashed var(--amber)', color: 'var(--amber)', borderRadius: 6, padding: '4px 12px', fontSize: '0.8rem', cursor: 'pointer' }}
                onClick={() => update({ tags: [...group.tags, 'New Tag'] })}>+ Tag</button>
            </div>
          </div>
        )
      })}
      <button className="admin-btn-add" onClick={() => {
        const newGroup = primary
          ? { id: `${groupIdPrefix}-${Date.now()}`, hot: false, groupName: 'New Group', proof: '', proofHref: null, tags: [] }
          : { id: `${groupIdPrefix}-${Date.now()}`, groupName: 'New Group', tags: [] }
        onChange('skills', { ...data.skills, [groupKey]: [...groupList, newGroup] })
      }}>+ Add Group</button>
    </>
  )

  return (
    <div>
      <div className="form-group" style={{ marginBottom: 16 }}>
        <label className="form-label">Eyebrow</label>
        <input className="form-input" value={data.skills.eyebrow || ''} onChange={e => onChange('skills', { ...data.skills, eyebrow: e.target.value })} />
      </div>
      <div className="form-group" style={{ marginBottom: 16 }}>
        <label className="form-label">Section Subtitle</label>
        <input className="form-input" value={data.skills.sectionSubtitle || ''} onChange={e => onChange('skills', { ...data.skills, sectionSubtitle: e.target.value })} />
      </div>

      <div className="admin-section-title">Skill Groups</div>
      {renderGroup('groups', data.skills.groups, 'sg', true)}
      <div className="admin-section-title" style={{ marginTop: 32 }}>Tool Groups</div>
      {renderGroup('toolGroups', data.skills.toolGroups, 'tg', false)}
      <SaveBar onSave={onSave} status={saveStatus} />
    </div>
  )
}

/* ─── Portfolio Tab ──────────────────────────────────────────────── */
function PortfolioTab({ data, onChange, onSave, saveStatus }) {
  const [modal, setModal] = useState(null)
  const items = data.portfolio.items

  const save = (item, idx) => {
    const arr = [...items]
    if (idx === -1) arr.push({ ...item, id: `p-${Date.now()}` })
    else arr[idx] = item
    onChange('portfolio', { ...data.portfolio, items: arr })
    setModal(null)
  }

  return (
    <div>
      <div className="admin-section-title">Portfolio Items</div>
      {items.map((item, i) => (
        <div key={item.id} className="admin-list-item">
          <div className="admin-list-item-info">
            <div className="admin-list-item-title">{item.glyph} {item.title} {item.featured && <span style={{ color: 'var(--amber)', fontSize: '0.75rem' }}>(featured)</span>}</div>
            <div className="admin-list-item-sub">{item.category} · {item.theme || 'mix'}</div>
          </div>
          <div className="admin-item-actions">
            <button className="admin-btn-edit" onClick={() => setModal({ item: { ...item }, idx: i })}>Edit</button>
            <button className="admin-btn-delete" onClick={() => onChange('portfolio', { ...data.portfolio, items: items.filter((_, j) => j !== i) })}>Delete</button>
          </div>
        </div>
      ))}
      <button className="admin-btn-add" onClick={() => setModal({ item: { title: '', category: data.portfolio.categories.find(c => c !== 'All') || '', description: '', link: '#', glyph: '📄', theme: 'mix', featured: false, badges: [] }, idx: -1 })}>+ Add Item</button>
      <SaveBar onSave={onSave} status={saveStatus} />

      {modal && (
        <Modal title={modal.idx === -1 ? 'Add Portfolio Item' : 'Edit Portfolio Item'} onClose={() => setModal(null)}>
          <PortfolioForm categories={data.portfolio.categories.filter(c => c !== 'All')} item={modal.item} onSave={(it) => save({ ...it, id: modal.item.id || `p-${Date.now()}` }, modal.idx)} onClose={() => setModal(null)} />
        </Modal>
      )}
    </div>
  )
}

function PortfolioForm({ item, categories, onSave, onClose }) {
  const [form, setForm] = useState(item)
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))
  return (
    <>
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Title</label>
        <input className="form-input" value={form.title} onChange={f('title')} />
      </div>
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Category</label>
        <select className="form-select" value={form.category} onChange={f('category')}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div className="form-group" style={{ width: 90, marginBottom: 12 }}>
          <label className="form-label">Glyph</label>
          <input className="form-input" value={form.glyph || ''} onChange={f('glyph')} placeholder="📄" />
        </div>
        <div className="form-group" style={{ flex: 1, marginBottom: 12 }}>
          <label className="form-label">Theme</label>
          <select className="form-select" value={form.theme || 'mix'} onChange={f('theme')}>
            <option value="amber">amber</option>
            <option value="blue">blue</option>
            <option value="mix">mix</option>
          </select>
        </div>
      </div>
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={!!form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} />
          Featured (wide flagship card with corner flag)
        </label>
      </div>
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Description</label>
        <textarea className="admin-textarea" value={form.description} onChange={f('description')} />
      </div>
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Badges (one per line)</label>
        <textarea
          className="admin-textarea"
          value={(form.badges || []).join('\n')}
          onChange={e => setForm(p => ({ ...p, badges: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) }))}
        />
      </div>
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Link URL</label>
        <input className="form-input" value={form.link || ''} onChange={f('link')} />
      </div>
      <div className="admin-modal-actions">
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSave(form)}>Save</button>
      </div>
    </>
  )
}

/* ─── Contact Tab ────────────────────────────────────────────────── */
function ContactTab({ data, onChange, onSave, saveStatus }) {
  const c = data.contact
  const cv = c.cv || { label: '', href: '' }
  const f = (k) => (e) => onChange('contact', { ...c, [k]: e.target.value })
  return (
    <div>
      <div className="admin-section-title">Contact Info</div>
      {[['email', 'Email'], ['linkedin', 'LinkedIn URL'], ['telegram', 'Telegram Handle'], ['location', 'Location'], ['sectionSubtitle', 'Section Subtitle'], ['sarcasticNote', 'Sarcastic Note']].map(([k, l]) => (
        <div className="form-group" key={k} style={{ marginBottom: 14 }}>
          <label className="form-label">{l}</label>
          {k === 'sarcasticNote' ? (
            <textarea className="admin-textarea" value={c[k] || ''} onChange={f(k)} />
          ) : (
            <input className="form-input" value={c[k] || ''} onChange={f(k)} />
          )}
        </div>
      ))}

      <div className="admin-section-title" style={{ marginTop: 24 }}>CV / Resume Link</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div className="form-group" style={{ flex: 1, marginBottom: 14 }}>
          <label className="form-label">Label</label>
          <input className="form-input" value={cv.label || ''} onChange={e => onChange('contact', { ...c, cv: { ...cv, label: e.target.value } })} />
        </div>
        <div className="form-group" style={{ flex: 1, marginBottom: 14 }}>
          <label className="form-label">Href</label>
          <input className="form-input" value={cv.href || ''} onChange={e => onChange('contact', { ...c, cv: { ...cv, href: e.target.value } })} />
        </div>
      </div>

      <div className="admin-section-title" style={{ marginTop: 24 }}>Subject Options</div>
      <div className="form-group" style={{ marginBottom: 14 }}>
        <label className="form-label">One per line (order matters)</label>
        <textarea
          className="admin-textarea"
          value={(c.subjectOptions || []).join('\n')}
          onChange={e => onChange('contact', { ...c, subjectOptions: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
        />
      </div>

      <SaveBar onSave={onSave} status={saveStatus} />
    </div>
  )
}

/* ─── Reusable helpers ───────────────────────────────────────────── */
function SimpleForm({ fields, item, onSave, onClose }) {
  const [form, setForm] = useState(item)
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))
  return (
    <>
      {fields.map(([k, l]) => (
        <div className="form-group" key={k} style={{ marginBottom: 12 }}>
          <label className="form-label">{l}</label>
          <input className="form-input" value={form[k] || ''} onChange={f(k)} />
        </div>
      ))}
      <div className="admin-modal-actions">
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSave(form)}>Save</button>
      </div>
    </>
  )
}

function SaveBar({ onSave, status }) {
  return (
    <div className="admin-save-bar">
      {status && (
        <span className={`admin-save-status ${status.error ? 'error' : ''}`}>
          {status.msg}
        </span>
      )}
      <button className="btn btn-primary" onClick={onSave}>Save Changes</button>
    </div>
  )
}

/* ─── Main Admin Page ────────────────────────────────────────────── */
export default function Admin() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem('admin_pass'))
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState('Hero')
  const [data, setData] = useState(null)
  const [saveStatus, setSaveStatus] = useState(null)

  useEffect(() => {
    if (authed) {
      fetch('/content.json').then(r => r.json()).then(setData)
    }
  }, [authed])

  const login = (e) => {
    e.preventDefault()
    if (!password.trim()) {
      setLoginError('Enter the password. It is checked when you save.')
      return
    }
    // No client-side comparison: the password is verified by the Netlify
    // function on save. We just stash it for this session to send with requests.
    sessionStorage.setItem('admin_pass', password)
    setAuthed(true)
  }

  const logout = () => {
    sessionStorage.removeItem('admin_pass')
    setAuthed(false)
    setData(null)
    setPassword('')
  }

  const onChange = (section, val) => {
    setData(prev => ({ ...prev, [section]: val }))
  }

  const onSave = async () => {
    setSaveStatus({ msg: 'Saving...' })
    try {
      await saveContent(data, sessionStorage.getItem('admin_pass') || '')
      setSaveStatus({ msg: '✓ Saved successfully' })
      setTimeout(() => setSaveStatus(null), 4000)
    } catch (err) {
      setSaveStatus({ msg: `✗ Save failed: ${err.message}`, error: true })
      if (err.status === 401) {
        // Wrong password: drop the session so the user re-enters it.
        setTimeout(() => logout(), 1500)
      } else {
        setTimeout(() => setSaveStatus(null), 5000)
      }
    }
  }

  if (!authed) {
    return (
      <PageTransition>
        <AdminHelmet />
        <div className="admin-login">
          <motion.div
            className="admin-login-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="admin-login-title gradient-text">Admin Panel</h2>
            <p className="admin-login-sub">MSA Portfolio · Restricted Area</p>
            <form onSubmit={login}>
              <div className="form-group" style={{ marginBottom: 12, textAlign: 'left' }}>
                <label className="form-label">Password</label>
                <input
                  className="form-input"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoFocus
                />
              </div>
              {loginError && <p className="admin-login-error">{loginError}</p>}
              <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                Access Panel
              </button>
            </form>
          </motion.div>
        </div>
      </PageTransition>
    )
  }

  if (!data) {
    return (
      <PageTransition>
        <AdminHelmet />
        <div className="admin-wrap">
          <p className="text-secondary font-mono" style={{ textAlign: 'center', paddingTop: 80 }}>
            Loading content...
          </p>
        </div>
      </PageTransition>
    )
  }

  const tabProps = { data, onChange, onSave, saveStatus }

  return (
    <PageTransition>
      <AdminHelmet />
      <div className="admin-wrap">
        <div className="container">
          <div className="admin-header">
            <h1 className="admin-title">Admin Panel <span className="gradient-text">✦</span></h1>
            <button className="btn btn-outline" onClick={logout} style={{ fontSize: '0.85rem', padding: '8px 20px' }}>
              Log Out
            </button>
          </div>

          <div className="admin-tabs">
            {TABS.map(t => (
              <button
                key={t}
                className={`admin-tab ${tab === t ? 'active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="admin-panel">
            {tab === 'Hero'       && <HeroTab {...tabProps} />}
            {tab === 'About'      && <AboutTab {...tabProps} />}
            {tab === 'Experience' && <ExperienceTab {...tabProps} />}
            {tab === 'Education'  && <EducationTab {...tabProps} />}
            {tab === 'Skills'     && <SkillsTab {...tabProps} />}
            {tab === 'Portfolio'  && <PortfolioTab {...tabProps} />}
            {tab === 'Contact'    && <ContactTab {...tabProps} />}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
