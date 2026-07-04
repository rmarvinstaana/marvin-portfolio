import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.22, ease: 'easeIn' } },
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
