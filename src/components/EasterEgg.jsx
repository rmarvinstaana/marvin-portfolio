import { motion } from 'framer-motion'

export default function EasterEgg() {
  return (
    <motion.div
      className="easter-egg-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="easter-egg-content">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, type: 'spring' }}
        >
          <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🎮</p>
          <h2 className="easter-egg-title gradient-text">You found the easter egg.</h2>
          <p className="easter-egg-text">
            Unfortunately, I can't give you $MBG for this.<br />
            Blockchain doesn't work that way.
          </p>
          <p style={{ marginTop: '24px', fontSize: '0.75rem', color: 'rgba(160,174,192,0.4)', fontFamily: 'var(--font-mono)' }}>
            ↑ ↑ ↓ ↓ ← → ← → B A. Nice one.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
