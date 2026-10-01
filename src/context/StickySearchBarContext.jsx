import { createContext, useContext, useState } from 'react'

// Permet à RoomSearchBar (affichée sur la page d'accueil et la page Chambres)
// de signaler qu'elle est actuellement "collée" en bas de l'écran, pour que
// WhatsAppFloat (rendu globalement dans HotelLayout) puisse se décaler vers
// le haut et éviter le chevauchement sur mobile.
const StickySearchBarContext = createContext({ stuck: false, setStuck: () => {} })

export function StickySearchBarProvider({ children }) {
  const [stuck, setStuck] = useState(false)
  return (
    <StickySearchBarContext.Provider value={{ stuck, setStuck }}>
      {children}
    </StickySearchBarContext.Provider>
  )
}

export function useStickySearchBar() {
  return useContext(StickySearchBarContext)
}
