import { useState } from 'react'
import Footer from '../components/Footer'

const INFO = [
  { label: 'Adresse', value: "Avenue de l'aéroport, à proximité de l'aéroport international Maya-Maya, Brazzaville" },
  { label: 'Téléphone', value: '+242 05 604 8030', href: 'tel:+242056048030' },
  { label: 'Réception', value: '24h/24, 7j/7' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', dates: '', message: '' })

  const mailtoHref = `mailto:contact@pefaco-mayamaya.example?subject=${encodeURIComponent(
    'Demande de réservation — ' + (form.name || 'Site web')
  )}&body=${encodeURIComponent(
    `Nom : ${form.name}\nDates envisagées : ${form.dates}\n\n${form.message}`
  )}`

  return (
    <main>
      <section style={{
        padding: 'calc(var(--nav-h) + clamp(48px,7vw,96px)) clamp(20px,4vw,56px) clamp(56px,8vw,88px)',
        background: 'var(--sand)',
      }}>
        <p className="eyebrow"><span className="t-label">Contact</span></p>
        <h1 style={{
          fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px,5vw,60px)',
          color: 'var(--espresso)', maxWidth: 780, lineHeight: 1.1,
        }}>
          Nous joindre
        </h1>
        <p className="t-body" style={{ maxWidth: 560, marginTop: 20 }}>
          Pour une réservation immédiate, l'appel téléphonique reste le plus rapide.
          Pour une demande groupe, événement ou séjour prolongé, le formulaire ci-dessous
          prépare un e-mail que vous n'avez plus qu'à envoyer.
        </p>
      </section>

      <section style={{
        padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)',
        display: 'grid', gap: 56, gridTemplateColumns: '1fr 1.2fr', maxWidth: 1100, margin: '0 auto',
      }} className="contact-grid">
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 40 }}>
            {INFO.map((i) => (
              <div key={i.label}>
                <p className="t-label" style={{ marginBottom: 8 }}>{i.label}</p>
                {i.href
                  ? <a href={i.href} style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--espresso)' }}>{i.value}</a>
                  : <p style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--espresso)', maxWidth: 340 }}>{i.value}</p>}
              </div>
            ))}
          </div>
          <a href="tel:+242056048030" className="btn-solid">Appeler maintenant</a>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); window.location.href = mailtoHref }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <div>
            <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>Nom</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--line)', background: 'var(--ivory)', fontFamily: 'var(--sans)', fontSize: 14 }}
            />
          </div>
          <div>
            <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>Dates envisagées</label>
            <input
              value={form.dates}
              onChange={(e) => setForm((f) => ({ ...f, dates: e.target.value }))}
              placeholder="ex. 12 au 15 octobre"
              style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--line)', background: 'var(--ivory)', fontFamily: 'var(--sans)', fontSize: 14 }}
            />
          </div>
          <div>
            <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>Message</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--line)', background: 'var(--ivory)', fontFamily: 'var(--sans)', fontSize: 14, resize: 'vertical' }}
            />
          </div>
          <button type="submit" className="btn-solid" style={{ alignSelf: 'flex-start' }}>Préparer l'e-mail</button>
        </form>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
