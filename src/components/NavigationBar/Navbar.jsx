import NavbarUser from "./NavbarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const activePath = window.location.pathname;

  return (
    // Contenedor navbar
    <nav className="bg-gray-800 flex flex-col justify-between h-full fixed left-0 top-0 z-[9999]">
      {/* Contenedor para reducir el ancho máximo de la navbar */}
      {/* <div className="max-w-7xl h-full mx-auto z-50 flex items-center border-2 border-red-500"> */}

      {/* Logo de la app */}
      <div className="flex items-center justify-center py-4">
        {/* {localStorage.getItem('token') && <NavbarSearch />} */}
        <div className="hidden md:block h-full">
          {" "}
          {/* Contenedor que muestra u oculta las opciones */}
          <div className="flex flex-col items-start justify-start flex-grow">
            <a
              href="/"
              className={`text-white px-6 py-3 w-full ${
                activePath === "/" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Inicio
            </a>

            <a
              href="/dashboard"
              className={`hover:text-white ${
                activePath === "/dashboard"
                  ? "text-white bg-gray-700 rounded-md"
                  : "text-gray-300 rounded-md hover:bg-gray-700"
              } px-2 py-2 mx-1  text-sm font-medium`}
            >
              Dashboard
            </a>
            <NavbarUser />
          </div>
        </div>
      </div>

      {/* Opciones de la navbar y foto de perfil */}
      <div className="flex items-center justify-center pb-4">
        {/* Botón controles de la navbar en móvil */}
        <button
          type="button"
          className="bg-gray-900 md:hidden flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700"
          aria-expanded="false"
          onClick={() => {
            const mm = document.getElementById("mobile-menu");
            mm.hidden ? (mm.hidden = false) : (mm.hidden = true);
          }}
        >
          {/* Icono del botón */}
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Ppciones de la navbar en móvil */}
      <div
        className="bg-gray-800 px-2 pt-2 pb-3 space-y-1 sm:px-3 z-[500] absolute right-0 left-0 text-center top-12"
        id="mobile-menu"
        hidden={true}
      >
        <a
          href="/"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Inicio
        </a>

        <a
          href="/dashboard"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Dashboard
        </a>

        <a
          href="/calendar"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Calendario
        </a>
      </div>
    </nav>
  );
};
