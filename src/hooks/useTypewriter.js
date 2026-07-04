import { useState, useEffect } from 'react'

export default function useTypewriter(words, { typeSpeed = 70, deleteSpeed = 40, pauseMs = 1800 } = {}) {
  const [displayText, setDisplayText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [phase, setPhase] = useState('typing') // 'typing' | 'pausing' | 'deleting'

  useEffect(() => {
    if (!words || words.length === 0) return
    const word = words[wordIdx % words.length]
    let timeout

    if (phase === 'typing') {
      if (displayText.length < word.length) {
        timeout = setTimeout(() => setDisplayText(word.slice(0, displayText.length + 1)), typeSpeed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 100)
    } else if (phase === 'deleting') {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(t => t.slice(0, -1)), deleteSpeed)
      } else {
        setWordIdx(i => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, wordIdx, phase, words, typeSpeed, deleteSpeed, pauseMs])

  return displayText
}
