import { useState } from "react";

function NavbarUser() {
  const isAuth = localStorage.getItem("token");

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex-shrink-0 z-50">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-300 hover:text-white px-3 py-1 rounded-md text-sm font-medium focus:outline-none z-50"
      >
        Ingresar
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-48 bg-white divide-y divide-gray-200 rounded-md shadow-lg">
          {/* Opciones de perfil */}
          {/* Tu código existente */}

          {isAuth ? (
            // Opciones para usuarios autenticados
            <>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-400 hover:duration-500 z-50"
              >
                Perfil
              </a>
              <a
                href="/login"
                className="block px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-200 hover:duration-500 z-50"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("profilePicture");
                }}
              >
                Cerrar sesión
              </a>
            </>
          ) : (
            // Opciones para usuarios no autenticados
            <>
              <a
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-400 hover:duration-500 z-50"
              >
                Iniciar sesión
              </a>
              <a
                href="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-400 hover:duration-500 z-50"
              >
                Registrarse
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default NavbarUser;
