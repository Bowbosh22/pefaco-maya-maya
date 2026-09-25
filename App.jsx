import { HashRouter, Route, Routes } from 'react-router-dom'
import PropertySelector from './pages/PropertySelector'
import HotelLayout from './pages/HotelLayout'
import Home from './pages/Home'
import Chambres from './pages/Chambres'
import ChambreDetails from './pages/ChambreDetails'
import Reservation from './pages/Reservation'
import Restaurant from './pages/Restaurant'
import Contact from './pages/Contact'
import { ReservationDraftProvider } from './context/ReservationDraftContext'

// HashRouter est conservé volontairement : GitHub Pages ne sait pas router
// des chemins comme /maya-maya/chambres côté serveur (404 sur un refresh),
// alors que les URLs en #/maya-maya/chambres fonctionnent sans configuration
// particulière.
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PropertySelector />} />
      <Route path="/:hotel" element={<HotelLayout />}>
        <Route index element={<Home />} />
        <Route path="chambres" element={<Chambres />} />
        <Route path="chambres/:slug" element={<ChambreDetails />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="restaurant" element={<Restaurant />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ReservationDraftProvider>
        <AppRoutes />
      </ReservationDraftProvider>
    </HashRouter>
  )
}
