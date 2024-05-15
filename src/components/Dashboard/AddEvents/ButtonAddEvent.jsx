/* eslint-disable react/prop-types */
import { useState } from "react";
import AddEvent from "./AddEvent";
import AddPlaces from "./AddPlaces";

export default function ButtonAddEventAndPlace({
  isToggled,
  setIsToggled,
  isToggledMarker,
  setIsToggledMarker,

  placeName,
  setPlaceName
}) {
  const handleToggle = () => {

    setIsToggled(!isToggled);
    setPlaceName('Seleccione una ubicación')
  };

  const handleToggleMarker = () => {
    setIsToggledMarker(!isToggledMarker);
  };

  const [activeTab, setActiveTab] = useState("events");

  return (
    <>

      <button
        className="rounded w-[100px] h-[60px] absolute left-4 z-[400] bg-[#00A5CF] hover:bg-[#007390] text-white p-0"
        onClick={handleToggle}
      >
        Agregar evento
      </button>

      {isToggled && (

        // Card con los controles y el contenido
        <div className="rounded-xl min-w-[250px] max-h-[40vh] sm:max-h-[50vh] lg:max-h-[60vh] sm:w-[590px] absolute bottom-[15%] left-5 right-5 sm:left-12 z-[400] bg-gray-200 shadow-md items-center justify-center overflow-y-auto ">


          {/* Contenedor de botones crear evento y crear lugar */}
          <div className="flex font-semibold text-sm overflow-hidden w-full">
            <button
              className={`flex-grow py-[10px] border-b-gray-200 ${activeTab === "events"
                ? "bg-indigo-500 text-white rounded-l-[14px]"
                : "bg-gray-200 "
                }`}
              onClick={() => setActiveTab("events")}
            >
              Crear eventos
            </button>
            {/* <button
              className={`flex-grow py-[10px] border-b-gray-200 ${activeTab === "places"
                ? "bg-indigo-500 text-white rounded-r-[14px]"
                : "bg-gray-200 "
                }`}
              onClick={() => setActiveTab("places")}
            >
              Crear lugares
            </button> */}
          </div>

          <div className="flex flex-col px-4">

            <div className="">
              {activeTab == "events" ? (
                <AddEvent
                  setIsToggled={setIsToggled}
                />
              ) : (
                <AddPlaces
                  handleToggleMarker={handleToggleMarker}
                  placeName={placeName}
                  setIsToggled={setIsToggled}
                  isToggledMarker={isToggledMarker}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
