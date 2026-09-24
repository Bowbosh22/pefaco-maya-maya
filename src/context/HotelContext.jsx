import { createContext, useContext } from 'react'

const HotelContext = createContext(null)

export function HotelProvider({ hotel, children }) {
  return <HotelContext.Provider value={hotel}>{children}</HotelContext.Provider>
}

export function useHotel() {
  const hotel = useContext(HotelContext)
  if (!hotel) throw new Error('useHotel doit être utilisé à l\'intérieur d\'un HotelProvider')
  return hotel
}
