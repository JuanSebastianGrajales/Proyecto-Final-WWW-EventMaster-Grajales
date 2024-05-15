import { useContext, useEffect, useState } from 'react'
import ButtonAddEvent from "./AddEvents/ButtonAddEvent.jsx"
import EventsAndPlaces from './EventsAndPlaces'
import { EventsContext } from './Events/EventsProvider'
import { PlacesContext } from './Places/PlacesProvider'

// Ubicaciones predeterminadas de acuerdo a la ciudad para centrar el mapa


export default function Dashboard() {
  const { fetchEvents } = useContext(EventsContext)
  const { fetchPlaces } = useContext(PlacesContext)

  // Estado para determinar si se hizo click en el botón agregar
  const [isToggled, setIsToggled] = useState(false);

  // Nombre de lugar obtenido de la api de OpenStreetMap
  const [placeName, setPlaceName] = useState('')

  useEffect(() => {
    fetchEvents()
    fetchPlaces()
  }, [])


  return (
    <div className="flex flex-col lg:flex-row w-full p-0 h-full mx-auto">
      <EventsAndPlaces />
      {/* Contenedor principal del mapa */}
      <div className="lg:basis-[70%] relative">
        <ButtonAddEvent
          isToggled={isToggled}
          setIsToggled={setIsToggled}
          placeName={placeName}
          setPlaceName={setPlaceName}/>
      </div>
      
    </div>
  )
}