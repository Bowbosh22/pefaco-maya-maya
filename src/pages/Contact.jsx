import { useState } from 'react'
import { useHotel } from '../context/HotelContext'
import Footer from '../components/Footer'

const fieldStyle = {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid var(--line)',
  background: 'var(--ivory)',
  fontFamily: 'var(--sans)',
  fontSize: 14,
}

export default function Contact() {
  const hotel = useHotel()
  const [form, setForm] = useState({ name: '', dates: '', message: '' })

  const contactRows = [
    { label: 'Adresse', value: hotel.address },
    hotel.phone ? { label: 'Téléphone', value: hotel.phone, href: hotel.phoneHref } : { label: 'Téléphone', value: "À confirmer avec l'hôtel" },
    hotel.bookingEmail ? { label: 'E-mail', value: hotel.bookingEmail, href: `mailto:${hotel.bookingEmail}` } : null,
    hotel.website ? { label: 'Site web', value: hotel.website.replace(/^https?:\/\//, ''), href: hotel.website } : null,
    { label: 'Réception', value: hotel.reception },
  ].filter(Boolean)

  const mailtoHref = `mailto:${hotel.bookingEmail || `contact@pefaco-${hotel.slug}.example`}?subject=${encodeURIComponent(
    `Demande de réservation — Pefaco ${hotel.shortName} — ${form.name || 'Site web'}`
  )}&body=${encodeURIComponent(
    `Établissement : ${hotel.name}\nNom : ${form.name}\nDates envisagées : ${form.dates}\n\n${form.message}`
  )}`

  const whatsappHref = hotel.whatsapp ? `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(hotel.whatsappMessage)}` : null

  const practicalRows = hotel.practicalInfo
    ? [
        { label: 'Arrivée', value: hotel.practicalInfo.checkIn },
        { label: 'Départ', value: hotel.practicalInfo.checkOut },
        { label: 'Annulation', value: hotel.practicalInfo.cancellation },
        { label: 'Parking', value: hotel.practicalInfo.parking },
        { label: 'Animaux', value: hotel.practicalInfo.pets },
      ]
    : []

  return (
    <main>
      <section style={{ padding: 'calc(var(--nav-h) + clamp(48px,7vw,96px)) clamp(20px,4vw,56px) clamp(56px,8vw,88px)', background: 'var(--sand)' }}>
        <p className="eyebrow">
          <span className="t-label">Contact</span>
        </p>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(32px,5vw,60px)',
            color: 'var(--espresso)',
            maxWidth: 780,
            lineHeight: 1.1,
          }}
        >
          Nous joindre
        </h1>
        <p className="t-body" style={{ maxWidth: 560, marginTop: 20 }}>
          {hotel.phoneHref
            ? "Pour une réservation immédiate, l'appel téléphonique reste le plus rapide. Pour une demande groupe, événement ou séjour prolongé, le formulaire ci-dessous prépare un e-mail que vous n'avez plus qu'à envoyer."
            : 'Les coordonnées directes de cet établissement sont en cours de confirmation. Le formulaire ci-dessous prépare une demande de réservation par e-mail, à envoyer directement à l\'hôtel.'}
        </p>
      </section>

      <section
        className="contact-grid"
        style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)', display: 'grid', gap: 56, gridTemplateColumns: '1fr 1.2fr', maxWidth: 1100, margin: '0 auto' }}
      >
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 40 }}>
            {contactRows.map((row) => (
              <div key={row.label}>
                <p className="t-label" style={{ marginBottom: 8 }}>
                  {row.label}
                </p>
                {row.href ? (
                  <a
                    href={row.href}
                    {...(row.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--espresso)' }}
                  >
                    {row.value}
                  </a>
                ) : (
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--espresso)', maxWidth: 340 }}>{row.value}</p>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {hotel.phoneHref && (
              <a href={hotel.phoneHref} className="btn-solid">
                Appeler maintenant
              </a>
            )}
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-outline">
                WhatsApp
              </a>
            )}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            window.location.href = mailtoHref
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <div>
            <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>
              Nom
            </label>
            <input required value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} style={fieldStyle} />
          </div>
          <div>
            <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>
              Dates envisagées
            </label>
            <input
              value={form.dates}
              onChange={(e) => setForm((prev) => ({ ...prev, dates: e.target.value }))}
              placeholder="ex. 12 au 15 octobre"
              style={fieldStyle}
            />
          </div>
          <div>
            <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>
              Message
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              style={{ ...fieldStyle, resize: 'vertical' }}
            />
          </div>
          <button type="submit" className="btn-solid" style={{ alignSelf: 'flex-start' }}>
            Préparer l'e-mail
          </button>
        </form>
      </section>

      {practicalRows.length > 0 && (
        <section style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)', background: 'var(--sand)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p className="t-label" style={{ marginBottom: 16 }}>
              Informations pratiques
            </p>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                fontSize: 'clamp(26px,3vw,36px)',
                color: 'var(--espresso)',
                marginBottom: 12,
                maxWidth: 640,
              }}
            >
              Avant votre séjour
            </h2>
            <p className="t-body" style={{ maxWidth: 640, marginBottom: 40, color: 'var(--soft)' }}>
              Informations usuelles pour un établissement 5 étoiles — à confirmer avec Pefaco avant toute publication officielle.
            </p>
            <div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              {practicalRows.map((row) => (
                <div key={row.label}>
                  <p className="t-label" style={{ marginBottom: 10 }}>
                    {row.label}
                  </p>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--espresso)', lineHeight: 1.5 }}>{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
