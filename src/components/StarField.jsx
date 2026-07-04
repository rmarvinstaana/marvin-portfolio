import { useEffect, useRef } from 'react'

const LAYERS = [
  { count: 120, speed: 0.03, size: 0.8, opacity: 0.4 },
  { count: 70,  speed: 0.06, size: 1.4, opacity: 0.65 },
  { count: 30,  speed: 0.12, size: 2.2, opacity: 0.9 },
]

function makeStars(layer, w, h) {
  return Array.from({ length: layer.count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: layer.size * (0.6 + Math.random() * 0.8),
    opacity: layer.opacity * (0.5 + Math.random() * 0.5),
    speed: layer.speed * (0.8 + Math.random() * 0.4),
    twinkleOffset: Math.random() * Math.PI * 2,
  }))
}

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w = window.innerWidth
    let h = window.innerHeight
    let stars = LAYERS.map(l => ({ layer: l, list: makeStars(l, w, h) }))
    let raf

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
      stars = LAYERS.map(l => ({ layer: l, list: makeStars(l, w, h) }))
    }

    canvas.width = w
    canvas.height = h

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 0.01

      stars.forEach(({ layer, list }) => {
        list.forEach(star => {
          const twinkle = 0.8 + 0.2 * Math.sin(t * 1.5 + star.twinkleOffset)
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
          ctx.fill()

          // Slow parallax drift upward
          star.y -= star.speed
          if (star.y < -2) star.y = h + 2
        })
      })

      raf = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="starfield-canvas" ref={canvasRef} />
}
