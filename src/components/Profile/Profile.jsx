import { useContext, useEffect, useState } from "react";
import EventsList from "../Dashboard/Events/EventsList";
import { UserDataContext } from "./UserDataProvider";

export default function Profile() {

  const { userData } = useContext(UserDataContext);

  const [nombre, setNombre] = useState("");
  const [nickname, setNickname] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [ciudad, setCiudad] = useState("")
  const [descripcion, setDescripcion] = useState("")



  useEffect(() => {
    if (userData) {
      setNombre(userData.nombre + " " + userData.apellido)
      setNickname(userData.nickname)
      setCorreo(userData.correo_electronico)
      setFechaNacimiento(userData.fecha_nacimiento)
      setCiudad(userData.ciudad ? userData.ciudad.nombre : 'Sin asignar')
      setDescripcion(userData.descripcion)
    }
  }, [userData]);



  return (

    // Contenedor principal
    <div className="flex flex-col lg:flex-row lg:h-[89vh] justify-center overflow-hidden">

      {/* Card información del perfil */}
      <div className="basis-[45%] flex items-start justify-center rounded-3xl border-2 border-indigo-400 bg-slate-200 py-5 m-8 overflow-auto">

        {/* Información */}
        <div className="flex flex-col ">

          {/* Foto de perfil */}
          <img src={localStorage.getItem('profilePicture')} alt="" className="w-24 h-24 mx-auto rounded-full" />

          {/* Nickname */}
          <p className="text-indigo-500 text-center pt-4 font-bold text-xl">
            {nickname}
          </p>
          <p className="text-black text-center pt-4 pb-1 font-bold text-base">
            Acerca de mi
          </p>

          {descripcion !== '' && descripcion !== null ? (
            <div className="text-black text-center">
              {descripcion}

            </div>
          ) : (
            <div className="bg-gray-100">No hay una descripcion disponible</div>
          )}

          <p className="text-black text-center pt-4 font-bold text-base">
            Nombre:
          </p>
          <p className="text-black text-center text-base">
            {nombre}
          </p>
          <p className="text-black text-center pt-4 font-bold text-base">
            Intereses:
          </p>
          {userData && <p className="text-center">{userData.intereses.reduce((strResultado, interes, index) => {
            if (userData.intereses.length === 1) {
              return strResultado += interes.nombre
            } else {
              if (index === 0) {
                return strResultado += interes.nombre + ', '
              } else if (index === userData.intereses.length - 1) {
                return strResultado += interes.nombre.toLowerCase() + '.'
              } else {
                return strResultado += interes.nombre.toLowerCase() + ', '
              }
            }
          }, '')}</p>}
          <p className="text-black text-center pt-4 font-bold text-base">
            Correo electrónico:
          </p>
          <p className="text-black text-center text-base">
            {correo}
          </p>
          <p className="text-black text-center pt-4 font-bold text-base">
            Fecha de nacimiento:
          </p>
          <p className="text-black text-center text-base">
            {fechaNacimiento}
          </p>
          <p className="text-black text-center pt-2 font-bold text-base">
            Ciudad:
          </p>
          <p className="text-black text-center text-base">
            {ciudad}
          </p>
          <button className="bg-indigo-500 max-w-[250px] rounded-xl mt-3 mx-auto px-5 py-2 font-bold text-white text-sm hover:bg-indigo-700"
            onClick={() => window.location.href = '/profile/config'}
          >
            Editar perfil
          </button>
        </div>
      </div>

      {/* Historial de actividades */}
      <div className="pb-4 m-8 overflow-y-auto">

        <h3 className="font-bold text-3xl text-gray-900 text-center mb-3">Historial de actividades</h3>
        <p className="text-center">
          Aqui se mostraran los eventos en los que has estado inscrito
        </p>
        <EventsList activeFilter='historial' />
      </div>
    </div>
  );
}