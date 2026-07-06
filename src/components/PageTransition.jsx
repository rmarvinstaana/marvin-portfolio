import { motion } from 'framer-motion'

// Simple 0.4s fade with an 8px rise on route change. The dark-theme
// slide-and-scale transitions of the old design have been removed.
const variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      className="page-wrapper"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
