import { Navigate, Outlet, useParams } from 'react-router-dom'
import { findHotelBySlug } from '../data/hotels'
import { HotelProvider } from '../context/HotelContext'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import WhatsAppFloat from '../components/WhatsAppFloat'
import ReservationReminderBanner from '../components/ReservationReminderBanner'

export default function HotelLayout() {
  const { hotel: slug } = useParams()
  const hotel = findHotelBySlug(slug)

  if (!hotel) return <Navigate to="/" replace />

  return (
    <HotelProvider hotel={hotel}>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <WhatsAppFloat />
      <ReservationReminderBanner />
    </HotelProvider>
  )
}
