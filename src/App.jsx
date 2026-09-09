import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Chambres from './pages/Chambres'
import ChambreDetails from './pages/ChambreDetails'
import Contact from './pages/Contact'

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppContent() {
  return (
    <>
      <Navbar />
      <ScrollReset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chambres" element={<Chambres />} />
        <Route path="/chambres/:slug" element={<ChambreDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
