const ORBS = [
  { size: 500, color: '#7b2fff', top: '10%',  left: '-10%', duration: 28 },
  { size: 400, color: '#00e5ff', top: '60%',  right: '-8%', duration: 34 },
  { size: 320, color: '#7b2fff', top: '40%',  left: '55%',  duration: 22 },
  { size: 260, color: '#00e5ff', top: '-5%',  right: '20%', duration: 40 },
  { size: 200, color: '#7b2fff', bottom: '5%', left: '30%', duration: 30 },
]

export default function ParticleOrbs() {
  return (
    <div className="orbs-container" aria-hidden="true">
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="orb"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${-i * 4}s`,
          }}
        />
      ))}
    </div>
  )
}
