import { useContext, useState } from "react";
import { UserDataContext } from "../Profile/UserDataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function NavbarUser() {
  const { userData } = useContext(UserDataContext)

  const profilePicture = localStorage.getItem('profilePicture') ? localStorage.getItem('profilePicture') : userData ? userData.foto : null

  const isAuth = localStorage.getItem('token')

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
        {!profilePicture ? <span className="">
          <FontAwesomeIcon
          icon={faUser}
          style={{marginTop: "2px", height: "20px", border: "3px solid", borderRadius: "3vh", padding: "8px"}}/>
        </span>
          :
          <img src={profilePicture} alt="" className="rounded-full h-[50px] border-gray-400" />
        }
      </button>

      {isOpen && (
        <>
          {isAuth && (
            <div className="absolute right-0 z-50 mt-2 w-48 bg-white divide-y divide-gray-200 rounded-md shadow-lg">
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
                  localStorage.removeItem('token')
                  localStorage.removeItem('profilePicture')
                }}
              >
                Cerrar sesión
              </a>
            </div>
          )}

          {!isAuth && (
            <div className="absolute right-0 z-50 mt-2 w-48 bg-white divide-y divide-gray-200 rounded-md shadow-lg">
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
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NavbarUser;
