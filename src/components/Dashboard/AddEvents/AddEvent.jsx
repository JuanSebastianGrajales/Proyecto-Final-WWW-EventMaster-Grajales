/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ConfirmacionEventoCreado from "../../VentanaModal";
import interestListEvents from "../../../utils/Interests/interestListEvent";
import { UserDataContext } from "../../Profile/UserDataProvider";

const AddEvent = ({ setIsToggled }) => {

  // Importar la función para actualizar lista de eventos una vez creado
  // const { fetchEvents } = useContext(EventsContext);

  // Importar datos del usuario
  const { userData } = useContext(UserDataContext)

  // Estado para guardar el lugar seleccionado
  // const [lugarSeleccionado, setLugarSeleccionado] = useState('')

  // Variable para mostrar confirmación de evento creado en un
  const [confirmacionEventoCreado, setConfirmacionEventoCreado] =
    useState(false);

  const [intereses, setIntereses] = useState(null);

  const [advertenciaIntereses, setAdvertenciaIntereses] = useState(false)


  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function getIntereses() {
      const interesEvento = await interestListEvents();
      setIntereses(interesEvento);
    }
    getIntereses();
  }, []);

  // Función para modificar los intereses seleccionados al hacer click
  function handleInteresesEvento(index) {
    setAdvertenciaIntereses(false)
    const nuevosIntereses = intereses.slice();
    nuevosIntereses[index].marcado = !nuevosIntereses[index].marcado;
    setIntereses(nuevosIntereses);
  }

  return (
    <>
      {confirmacionEventoCreado && (
        <ConfirmacionEventoCreado
          estado={confirmacionEventoCreado}
          cambiarEstado={setIsToggled}
        >
          <h1 className="text-center m-6 text-sm font-semibold">
            Evento creado satisfactoriamente
          </h1>
        </ConfirmacionEventoCreado>
      )}
      <div className="w-full px-3 mb-4 mt-3 items-center relative" onClick={(e) => {
        if (!['buscar', 'campo-lugar', 'lista-lugares'].includes(e.target.id)) {
          document.getElementById('lista-lugares').style.display = 'none'
        }
      }}>
        <div className="w-full items-center text-center justify-center pb-3">
          <h1 className="font-semibold text-indigo-700 text-base my-7 w-fit text-center mx-auto">
            Añade un evento
          </h1>
          {/* Inicio del formulario */}
          <form >
            {/* Nombre del evento */}

            <input
              className={`w-full px-4 py-2 mb-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 text-sm`}
              placeholder="Nombre del evento"
              {...register("nombre", {
                required: true,
              })}
            />
            {errors.nombre && <p className="mb-3">{errors.nombre.message} *</p>}
            {/* Descripción */}

            <textarea
              type="text"
              placeholder="Descripcion del evento"
              rows={3}
              className="w-full mb-2 text-sm px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 resize-none"
              {...register("descripcion", {
                required: true,
              })}
            />
            {errors.descripcion?.type === "required" && (
              <p className="mb-3">Campo descripcion es requerido *</p>
            )}
            {/* Lugar y fecha */}
            <div className="flex flex-col min-[550px]:flex-row min-[550px]:items-center justify-between mb-2">
              {/* Lugar */}
              <div className="basis-[50%] min-[550px]:mr-2">
                <div className="relative border-0 bg-transparent">

                  {/* Botón para desplegar la lista de lugares */}
                  <input
                    id="campo-lugar"
                    readOnly={true}
                    onKeyUp={(event) => {
                      if (event.key === "Escape") {
                        document.getElementById("lista-lugares").style.display =
                          "none";
                      }
                    }}
                    autoComplete="off"
                    onClick={() => {
                      const lista = document.getElementById("lista-lugares");
                      lista.style.display =
                        lista.style.display === "block" ? "none" : "block";
                    }}
                    placeholder="Selecciona un lugar ▼"
                    className="text-sm w-full px-4 py-2 rounded-lg border-2 border-gray-200 bg-white mr-2 focus:border-indigo-500 focus:border-2 outline-none cursor-pointer text-center placeholder:text-black"
                  // {...register("lugar", {
                  //   required: true,
                  // })}
                  />
                  {errors.lugar?.type === "required" && (
                    <p className="mb-3">Lugar requerido *</p>
                  )}

                  {/* Lista de lugares */}
                  <ul
                    id="lista-lugares"
                    className="hidden absolute top-[100%] right-0 left-0 bg-white rounded-lg border-[1px] border-indigo-500 px-3 max-h-[173px] overflow-y-auto z-10"
                  >
                    {/* Barra de búsqueda de lugares */}
                    <input
                      type="search"
                      placeholder="Buscar..."
                      id="buscar"
                      autoComplete="off"
                      className="mt-2 py-1 px-1 w-full text-sm outline-none border-b-[1px] focus:border-gray-500"

                      // Función de búsqueda al escribir
                      onKeyUp={(event) => {
                        // setTextoCampoLugar(event.target.value.toLowerCase())
                        if (event.key === "Escape") {
                          document.getElementById("lista-lugares").style.display =
                            "none";
                        } else {
                          const listaLugares =
                            document.getElementById("lista-lugares");
                          listaLugares.style.display = "block";
                          const textSearch = event.target.value.toLowerCase();
                          const places = listaLugares.getElementsByTagName("li");

                          for (let i = 0; i < places.length; i++) {
                            if (
                              places[i].textContent
                                .toLowerCase()
                                .includes(textSearch)
                            ) {
                              places[i].style.display = "block";
                            } else {
                              places[i].style.display = "none";
                            }
                          }
                        }
                      }}
                    />

                  </ul>
                </div>
              </div>

              {/* Fecha */}
              <div className="mt-2 min-[550px]:mt-0 basis-[50%] min-[550px]:ml-2 flex-shrink">
                <input
                  className="w-full px-[6px] py-2 rounded-lg border-2 border-gray-200 text-sm focus:border-indigo-500"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  max="2023-12-31"
                  {...register("fecha", {
                    required: true,
                  })}
                />
                {errors.eventDate?.type === "required" && (
                  <p className="mb-3">Campo fecha es requerido *</p>
                )}
              </div>
            </div>
            {/* Hora de inicio y hora final */}
            <div className="flex items-center justify-between px-0">
              {/* Hora de inicio */}
              <div className="mr-2">
                <input
                  type="text"
                  placeholder="Hora de inicio"
                  className="w-full px-4 py-2 text-center border border-gray-300 rounded-md focus:outline-none text-sm"
                  {...register("hora_inicio", {
                    required: true,
                    pattern: {
                      value: /([0-1]?[0-9]|2[0-3]):[0-5][0-9]/,
                      message: "Formato de hora de inicio no válido",
                    },
                  })}
                />
                {errors.hora_inicio?.type === "required" && (
                  <p>Campo hora inicio es requerido *</p>
                )}
              </div>
              {/* Hora final */}
              <div className="ml-2">

                <input
                  type="text"
                  placeholder="Hora final"
                  className="w-full px-4 py-2 text-center border border-gray-300 rounded-md focus:outline-none text-sm"
                  {...register("hora_final", {
                    required: true,
                    pattern: {
                      value: /([0-1]?[0-9]|2[0-3]):[0-5][0-9]/,
                      message: "Formato de hora de inicio no válido",
                    },
                  })}
                />
                {errors.hora_final?.type === "required" && (
                  <p>Campo hora inicio es requerido *</p>
                )}
              </div>
            </div>
            {/*Intereses en evento*/}
            {intereses && (
              <div className="mt-5 w-full text-center mb-3 min-[550px]:col-span-2 px-3">
                <label className="font-semibold text-sm px-1">
                  Seleciona los intereses del evento
                </label>

                <div className="border-2 border-gray-400 py-5 rounded-lg w-full mt-1 mb-1 mx-auto flex justify-center flex-wrap">
                  {intereses &&
                    intereses.map((elemento, index) => (
                      <span
                        key={elemento.codigo_interes}
                        className={`rounded-full px-2 py-1 my-1 mx-1 cursor-pointer select-none ${elemento.marcado
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-200"
                          }`}
                        onClick={() => handleInteresesEvento(index)}
                      >
                        {elemento.nombre}
                      </span>
                    ))}
                </div>
                <p className="text-xs text-red-700">¡No es posible cambiar los intereses luego de guardarlos, escoge con precaución!</p>
              </div>
            )}

            {advertenciaIntereses && <p>Debes seleccionar al menos uno de tus intereses: {userData.intereses.reduce((strResultado, interes, index) => {
              if (index === 0) {
                return strResultado += interes.nombre + ', '
              } else if (index === userData.intereses.length - 1) {
                return strResultado += interes.nombre.toLowerCase() + '.'
              } else {
                return strResultado += interes.nombre.toLowerCase() + ', '
              }
            }, '')}</p>}

            {/* Botón crear evento */}
            <button
              type="submit"
              className="bg-indigo-500 rounded-3xl mt-5 py-2 px-3 font-bold text-white text-sm hover:w hover:duration-100 hover:bg-indigo-700"
              onClick={() =>
                console.log(document.getElementById("campo-lugar").value)
              }
            >
              Crear evento
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
