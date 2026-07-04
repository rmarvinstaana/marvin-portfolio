import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'admin'
const TABS = ['About', 'Experience', 'Education', 'Skills', 'Portfolio', 'Contact']

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

/* ─── Save to Netlify Function ───────────────────────────────────── */
async function saveContent(data) {
  const res = await fetch('/.netlify/functions/save-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

/* ─── About Tab ─────────────────────────────────────────────────── */
function AboutTab({ data, onChange, onSave, saveStatus }) {
  return (
    <div>
      <div className="admin-section-title">About Section</div>

      <div className="form-group" style={{ marginBottom: 16 }}>
        <label className="form-label">Section Subtitle (sarcastic line)</label>
        <input
          className="form-input"
          value={data.about.sectionSubtitle}
          onChange={e => onChange('about', { ...data.about, sectionSubtitle: e.target.value })}
        />
      </div>

      <div className="form-group" style={{ marginBottom: 16 }}>
        <label className="form-label">Bio Paragraphs (one per line)</label>
        <textarea
          className="admin-textarea"
          style={{ minHeight: 200 }}
          value={data.about.bio.join('\n\n')}
          onChange={e => onChange('about', { ...data.about, bio: e.target.value.split('\n\n').filter(Boolean) })}
        />
      </div>

      <div className="admin-section-title" style={{ marginTop: 24 }}>Fun Facts</div>
      {data.about.funFacts.map((fact, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input
            className="form-input"
            style={{ width: 60 }}
            value={fact.emoji}
            onChange={e => {
              const arr = [...data.about.funFacts]
              arr[i] = { ...arr[i], emoji: e.target.value }
              onChange('about', { ...data.about, funFacts: arr })
            }}
            placeholder="Emoji"
          />
          <input
            className="form-input"
            value={fact.label}
            onChange={e => {
              const arr = [...data.about.funFacts]
              arr[i] = { ...arr[i], label: e.target.value }
              onChange('about', { ...data.about, funFacts: arr })
            }}
            placeholder="Label"
          />
          <button
            className="admin-btn-delete"
            onClick={() => {
              const arr = data.about.funFacts.filter((_, j) => j !== i)
              onChange('about', { ...data.about, funFacts: arr })
            }}
          >✕</button>
        </div>
      ))}
      <button
        className="admin-btn-add"
        onClick={() => onChange('about', { ...data.about, funFacts: [...data.about.funFacts, { emoji: '⭐', label: 'New Fact' }] })}
      >+ Add Fact</button>

      <SaveBar onSave={onSave} status={saveStatus} />
    </div>
  )
}

/* ─── Experience Tab ─────────────────────────────────────────────── */
function ExperienceTab({ data, onChange, onSave, saveStatus }) {
  const [modal, setModal] = useState(null) // { type: 'job'|'speak', item, idx }

  const jobs = data.experience.jobs
  const speaking = data.experience.speaking

  const saveJob = (item, idx) => {
    const arr = [...jobs]
    if (idx === -1) arr.push({ ...item, id: `job-${Date.now()}` })
    else arr[idx] = item
    onChange('experience', { ...data.experience, jobs: arr })
    setModal(null)
  }

  const delJob = (idx) => {
    onChange('experience', { ...data.experience, jobs: jobs.filter((_, i) => i !== idx) })
  }

  const saveSpeak = (item, idx) => {
    const arr = [...speaking]
    if (idx === -1) arr.push({ ...item, id: `speak-${Date.now()}` })
    else arr[idx] = item
    onChange('experience', { ...data.experience, speaking: arr })
    setModal(null)
  }

  const delSpeak = (idx) => {
    onChange('experience', { ...data.experience, speaking: speaking.filter((_, i) => i !== idx) })
  }

  return (
    <div>
      <div className="admin-section-title">Work Experience</div>
      {jobs.map((job, i) => (
        <div key={job.id} className="admin-list-item">
          <div className="admin-list-item-info">
            <div className="admin-list-item-title">{job.title}</div>
            <div className="admin-list-item-sub">{job.company} · {job.period}</div>
          </div>
          <div className="admin-item-actions">
            <button className="admin-btn-edit" onClick={() => setModal({ type: 'job', item: { ...job, bullets: job.bullets.join('\n') }, idx: i })}>Edit</button>
            <button className="admin-btn-delete" onClick={() => delJob(i)}>Delete</button>
          </div>
        </div>
      ))}
      <button className="admin-btn-add" onClick={() => setModal({ type: 'job', item: { title: '', company: '', period: '', location: '', bullets: '' }, idx: -1 })}>+ Add Role</button>

      <div className="admin-section-title" style={{ marginTop: 32 }}>Speaking Engagements</div>
      {speaking.map((s, i) => (
        <div key={s.id} className="admin-list-item">
          <div className="admin-list-item-info">
            <div className="admin-list-item-title">{s.event}</div>
            <div className="admin-list-item-sub">{s.date} · {s.location}</div>
          </div>
          <div className="admin-item-actions">
            <button className="admin-btn-edit" onClick={() => setModal({ type: 'speak', item: { ...s }, idx: i })}>Edit</button>
            <button className="admin-btn-delete" onClick={() => delSpeak(i)}>Delete</button>
          </div>
        </div>
      ))}
      <button className="admin-btn-add" onClick={() => setModal({ type: 'speak', item: { event: '', date: '', location: '', format: 'in-person', topic: '', description: '' }, idx: -1 })}>+ Add Engagement</button>

      <SaveBar onSave={onSave} status={saveStatus} />

      {modal?.type === 'job' && (
        <Modal title={modal.idx === -1 ? 'Add Role' : 'Edit Role'} onClose={() => setModal(null)}>
          <JobForm item={modal.item} onSave={(item) => saveJob({ ...item, bullets: item.bullets.split('\n').filter(Boolean) }, modal.idx)} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'speak' && (
        <Modal title={modal.idx === -1 ? 'Add Engagement' : 'Edit Engagement'} onClose={() => setModal(null)}>
          <SpeakForm item={modal.item} onSave={(item) => saveSpeak(item, modal.idx)} onClose={() => setModal(null)} />
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
          <input className="form-input" value={form[k]} onChange={f(k)} />
        </div>
      ))}
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Bullet Points (one per line)</label>
        <textarea className="admin-textarea" value={form.bullets} onChange={f('bullets')} />
      </div>
      <div className="admin-modal-actions">
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSave(form)}>Save</button>
      </div>
    </>
  )
}

function SpeakForm({ item, onSave, onClose }) {
  const [form, setForm] = useState(item)
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))
  return (
    <>
      {[['event', 'Event Name'], ['date', 'Date'], ['location', 'Location'], ['topic', 'Topic / Talk Title']].map(([k, l]) => (
        <div className="form-group" key={k} style={{ marginBottom: 12 }}>
          <label className="form-label">{l}</label>
          <input className="form-input" value={form[k]} onChange={f(k)} />
        </div>
      ))}
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Format</label>
        <select className="form-select" value={form.format} onChange={f('format')}>
          <option value="in-person">In-Person</option>
          <option value="virtual">Virtual</option>
        </select>
      </div>
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Description</label>
        <textarea className="admin-textarea" value={form.description} onChange={f('description')} />
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
          <SimpleForm fields={[['degree','Degree'],['institution','Institution'],['period','Period']]} item={modal.item} onSave={(it) => saveDeg({ ...it, id: modal.item.id || `edu-${Date.now()}` }, modal.idx)} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === 'cert' && (
        <Modal title={modal.idx === -1 ? 'Add Certification' : 'Edit Certification'} onClose={() => setModal(null)}>
          <SimpleForm fields={[['name','Name'],['issuer','Issuer']]} item={modal.item} onSave={(it) => saveCert({ ...it, id: modal.item.id || `cert-${Date.now()}` }, modal.idx)} onClose={() => setModal(null)} />
        </Modal>
      )}
    </div>
  )
}

/* ─── Skills Tab ─────────────────────────────────────────────────── */
function SkillsTab({ data, onChange, onSave, saveStatus }) {
  const renderGroup = (groupKey, groupList, groupIdPrefix) => (
    <>
      {groupList.map((group, gi) => (
        <div key={group.id} style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
            <input
              className="form-input"
              value={group.groupName}
              onChange={e => {
                const arr = [...groupList]
                arr[gi] = { ...arr[gi], groupName: e.target.value }
                onChange('skills', { ...data.skills, [groupKey]: arr })
              }}
              style={{ fontWeight: 600 }}
            />
            <button
              className="admin-btn-delete"
              onClick={() => onChange('skills', { ...data.skills, [groupKey]: groupList.filter((_, j) => j !== gi) })}
            >✕</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {group.tags.map((tag, ti) => (
              <div key={ti} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 8px' }}>
                <input
                  style={{ background: 'none', border: 'none', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', width: `${tag.length + 2}ch`, outline: 'none' }}
                  value={tag}
                  onChange={e => {
                    const arr = [...groupList]
                    const tags = [...arr[gi].tags]
                    tags[ti] = e.target.value
                    arr[gi] = { ...arr[gi], tags }
                    onChange('skills', { ...data.skills, [groupKey]: arr })
                  }}
                />
                <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.75rem' }} onClick={() => {
                  const arr = [...groupList]
                  arr[gi] = { ...arr[gi], tags: arr[gi].tags.filter((_, j) => j !== ti) }
                  onChange('skills', { ...data.skills, [groupKey]: arr })
                }}>✕</button>
              </div>
            ))}
            <button style={{ background: 'none', border: '1px dashed var(--purple)', color: 'var(--purple)', borderRadius: 6, padding: '4px 12px', fontSize: '0.8rem', cursor: 'pointer' }}
              onClick={() => {
                const arr = [...groupList]
                arr[gi] = { ...arr[gi], tags: [...arr[gi].tags, 'New Tag'] }
                onChange('skills', { ...data.skills, [groupKey]: arr })
              }}>+ Tag</button>
          </div>
        </div>
      ))}
      <button className="admin-btn-add" onClick={() => {
        const newGroup = { id: `${groupIdPrefix}-${Date.now()}`, groupName: 'New Group', tags: [] }
        onChange('skills', { ...data.skills, [groupKey]: [...groupList, newGroup] })
      }}>+ Add Group</button>
    </>
  )

  return (
    <div>
      <div className="admin-section-title">Skill Groups</div>
      {renderGroup('groups', data.skills.groups, 'sg')}
      <div className="admin-section-title" style={{ marginTop: 32 }}>Tool Groups</div>
      {renderGroup('toolGroups', data.skills.toolGroups, 'tg')}
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
            <div className="admin-list-item-title">{item.title}</div>
            <div className="admin-list-item-sub">{item.category}</div>
          </div>
          <div className="admin-item-actions">
            <button className="admin-btn-edit" onClick={() => setModal({ item: { ...item }, idx: i })}>Edit</button>
            <button className="admin-btn-delete" onClick={() => onChange('portfolio', { ...data.portfolio, items: items.filter((_, j) => j !== i) })}>Delete</button>
          </div>
        </div>
      ))}
      <button className="admin-btn-add" onClick={() => setModal({ item: { title: '', category: 'Campaigns', description: '', link: '#' }, idx: -1 })}>+ Add Item</button>
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
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Description</label>
        <textarea className="admin-textarea" value={form.description} onChange={f('description')} />
      </div>
      <div className="form-group" style={{ marginBottom: 12 }}>
        <label className="form-label">Link URL</label>
        <input className="form-input" value={form.link} onChange={f('link')} />
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
  const f = (k) => (e) => onChange('contact', { ...c, [k]: e.target.value })
  return (
    <div>
      <div className="admin-section-title">Contact Info</div>
      {[['email','Email'],['linkedin','LinkedIn URL'],['location','Location'],['sectionSubtitle','Section Subtitle'],['sarcasticNote','Sarcastic Note']].map(([k, l]) => (
        <div className="form-group" key={k} style={{ marginBottom: 14 }}>
          <label className="form-label">{l}</label>
          {k === 'sarcasticNote' ? (
            <textarea className="admin-textarea" value={c[k]} onChange={f(k)} />
          ) : (
            <input className="form-input" value={c[k]} onChange={f(k)} />
          )}
        </div>
      ))}
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
          <input className="form-input" value={form[k]} onChange={f(k)} />
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
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === 'yes')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState('About')
  const [data, setData] = useState(null)
  const [saveStatus, setSaveStatus] = useState(null)

  useEffect(() => {
    if (authed) {
      fetch('/content.json').then(r => r.json()).then(setData)
    }
  }, [authed])

  const login = (e) => {
    e.preventDefault()
    if (password === PASS) {
      sessionStorage.setItem('admin_auth', 'yes')
      setAuthed(true)
    } else {
      setLoginError('Wrong password. Try again, or just guess harder.')
    }
  }

  const logout = () => {
    sessionStorage.removeItem('admin_auth')
    setAuthed(false)
    setData(null)
  }

  const onChange = (section, val) => {
    setData(prev => ({ ...prev, [section]: val }))
  }

  const onSave = async () => {
    setSaveStatus({ msg: 'Saving...' })
    try {
      await saveContent(data)
      setSaveStatus({ msg: '✓ Saved successfully' })
    } catch (err) {
      setSaveStatus({ msg: `✗ Save failed: ${err.message}`, error: true })
    }
    setTimeout(() => setSaveStatus(null), 4000)
  }

  if (!authed) {
    return (
      <PageTransition>
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
