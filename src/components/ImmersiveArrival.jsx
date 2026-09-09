import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// NOTE — pas de vidéo réelle de l'hôtel disponible pour l'instant : cette section
// reprend l'esprit "scroll immersif" de Maison Verte (ImmersiveMorning.jsx) mais en
// enchaînant des photos fixes plutôt qu'une vidéo. Dès qu'un tournage ou des rushs
// existent, cette section peut être remplacée par le même pattern vidéo que les
// autres démos, sans changer la structure de la page.
const SCENES = [
  {
    image: 'https://images.unsplash.com/photo-1784411641863-d163d776ed55?w=1800&q=80',
    label: 'Arrivée',
    title: "À deux minutes de l'aéroport.",
    text: "Le vol atterrit, la navette attend, la chambre est déjà prête.",
  },
  {
    image: '/assets/chambre-lit.jpg',
    label: 'Chambres',
    title: 'Le calme après la piste.',
    text: "Climatisation, literie soignée, vue dégagée — l'étape aérienne s'arrête ici.",
  },
  {
    image: 'https://images.unsplash.com/photo-1722477936580-84aa10762b0b?w=1800&q=80',
    label: 'Petit-déjeuner',
    title: 'Un buffet, tôt, sans compromis.',
    text: "Pour les vols du matin comme pour les réveils tardifs.",
  },
  {
    image: 'https://images.unsplash.com/photo-1776763255480-014a64ee137d?w=1800&q=80',
    label: 'Détente',
    title: 'Une pause entre deux rendez-vous.',
    text: "La piscine, le bar, un moment avant la prochaine réunion ou le prochain vol.",
  },
]

export default function ImmersiveArrival() {
  const sectionRef = useRef(null)
  const frameRefs = useRef([])
  const textRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${SCENES.length * 100}%`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const idx = Math.min(SCENES.length - 1, Math.floor(self.progress * SCENES.length))
          frameRefs.current.forEach((el, i) => {
            if (!el) return
            gsap.to(el, { opacity: i === idx ? 1 : 0, duration: 0.5, overwrite: true })
          })
          textRefs.current.forEach((el, i) => {
            if (!el) return
            gsap.to(el, {
              opacity: i === idx ? 1 : 0,
              y: i === idx ? 0 : 16,
              duration: 0.5,
              overwrite: true,
            })
          })
        },
      })
      return () => st.kill()
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: 'var(--espresso)' }}
    >
      {SCENES.map((s, i) => (
        <div
          key={i}
          ref={(el) => (frameRefs.current[i] = el)}
          style={{
            position: 'absolute', inset: 0, opacity: i === 0 ? 1 : 0,
            backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />
      ))}

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(36,28,21,0.12) 0%, rgba(36,28,21,0.35) 55%, rgba(36,28,21,0.72) 100%)',
      }} />

      <div style={{ position: 'absolute', top: 'calc(var(--nav-h) + 24px)', left: 'clamp(20px,4vw,56px)' }}>
        <span className="stars">★★★★★</span>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: 'clamp(28px,6vw,72px)', color: 'var(--ivory)',
      }}>
        <div style={{ position: 'relative', minHeight: 190 }}>
          {SCENES.map((s, i) => (
            <div
              key={i}
              ref={(el) => (textRefs.current[i] = el)}
              style={{
                position: 'absolute', left: 0, bottom: 0, maxWidth: 640,
                opacity: i === 0 ? 1 : 0, transform: `translateY(${i === 0 ? 0 : 16}px)`,
              }}
            >
              <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 10 }}>{s.label}</p>
              <h1 style={{
                fontFamily: 'var(--serif)', fontWeight: 400, fontStyle: 'normal',
                fontSize: 'clamp(30px, 5vw, 56px)', lineHeight: 1.08, marginBottom: 14,
              }}>{s.title}</h1>
              <p className="t-body" style={{ color: 'rgba(248,243,234,0.85)' }}>{s.text}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 28 }}>
          {SCENES.map((_, i) => (
            <span key={i} style={{ width: 22, height: 1.4, background: 'rgba(248,243,234,0.35)' }} />
          ))}
          <span className="t-label" style={{ color: 'rgba(248,243,234,0.6)', marginLeft: 8 }}>Faites défiler</span>
        </div>
      </div>
    </section>
  )
}
