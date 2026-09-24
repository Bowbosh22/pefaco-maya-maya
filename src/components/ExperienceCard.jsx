export default function ExperienceCard({ image, title, text }) {
  return (
    <div>
      <div style={{ aspectRatio: '3/4', overflow: 'hidden', marginBottom: 24 }}>
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 22, marginBottom: 10, color: 'var(--espresso)' }}>
        {title}
      </h3>
      <p className="t-body">{text}</p>
    </div>
  )
}
