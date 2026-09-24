import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

const WHATSAPP_ICON = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
      fill="#FFFFFF"
    />
    <path
      d="M12.05 2C6.494 2 2 6.477 2 12c0 1.813.485 3.583 1.406 5.136L2 22l5.005-1.378A10.07 10.07 0 0012.05 22C17.606 22 22.1 17.523 22.1 12S17.606 2 12.05 2zm0 18.11c-1.67 0-3.303-.446-4.73-1.29l-.34-.2-3.033.836.828-2.955-.221-.303A8.09 8.09 0 013.99 12c0-4.44 3.62-8.05 8.06-8.05 4.44 0 8.06 3.61 8.06 8.05 0 4.44-3.62 8.11-8.06 8.11z"
      fill="#FFFFFF"
    />
  </svg>
)

export default function WhatsAppFloat() {
  const hotel = useHotel()
  const style = {
    position: 'fixed',
    right: 'clamp(16px, 4vw, 28px)',
    bottom: 'clamp(16px, 4vw, 28px)',
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: '#25D366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
    zIndex: 999,
  }

  return (
    <>
      {hotel.whatsapp ? (
        <a
          href={`https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(hotel.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter l'hôtel sur WhatsApp"
          className="whatsapp-float"
          style={style}
        >
          {WHATSAPP_ICON}
        </a>
      ) : (
        <Link
          to={`/${hotel.slug}/contact`}
          aria-label="Contacter l'hôtel"
          className="whatsapp-float"
          style={style}
        >
          {WHATSAPP_ICON}
        </Link>
      )}
      <style>{`
        .whatsapp-float { transition: transform 0.25s ease; }
        .whatsapp-float:hover { transform: scale(1.08); }
        @media (max-width: 480px) {
          .whatsapp-float { width: 54px; height: 54px; }
        }
      `}</style>
    </>
  )
}
