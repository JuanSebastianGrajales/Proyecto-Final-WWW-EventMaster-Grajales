import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserDataContext } from "./Profile/UserDataProvider";
import ErrorLogin from "./VentanaModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Login = () => {
  // Función para consultar info del usuario en la bd cuando se haga login
  const { userData, getUserDataFromDB } = useContext(UserDataContext);

  //Obtencíon de datos con react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Redirección con base en si tiene o no el perfil completo
  useEffect(() => {
    if (userData) {
      !userData.genero ||
      !userData.fecha_nacimiento ||
      !userData.ciudad ||
      userData.intereses.length === 0
        ? (window.location.href = "/profile/config")
        : (window.location.href = "/dashboard");
    }
  }, [userData]);

  // Verificar login con email y contraseña
  const onSubmit = async (data) => {
    try {
      // Petición para buscar el usuario en la bd y generar el token JWT
      const response = await axios.post(
        "http://localhost:5000/api/create/JWT",
        data
      );

      // Si se generó el token:
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Token a localStorage
        getUserDataFromDB(); // Obtención de los datos del usuario
      }
      // Si no se generó el token
      else {
        console.log("la respuesta es: " + response.data.token);
        console.log(
          "tienes algo mal en la contraseña, o usuario O no estas registrado"
        );
        cambiarEstadoErrorLogin(true);
      }
    } catch (error) {
      // Aquí puedes manejar los errores que ocurran durante la solicitud
      console.error(error);
    }
  };

  const [estadoErrorLogin, cambiarEstadoErrorLogin] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // Contenedor principal
    <div className="flex flex-col justify-center items-center py-5 lg:min-h-[89vh] bg-gray-100">
      {/* Contenedor del formulario (card) */}

      <div className="px-10 pt-10 pb-0 bg-white text-gray-500 rounded shadow-xl w-[70%] mx-5 max-w-[440px] overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <h1 className="font-bold text-3xl text-gray-900 text-center mb-7">
            EventMaster
          </h1>

          {/* Div correo */}
          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <div className="flex">
                <input
                  type="text"
                  className="w-full pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none"
                  placeholder="Correo"
                  {...register("email", {
                    required: true,
                  })}
                />
              </div>
              {errors.email?.type === "required" && (
                <p>El correo es requerido es requerido *</p>
              )}
            </div>
          </div>

          {/* Div contraseña */}
          <div className="flex flex-col -mx-3">
            <div className="w-full px-3 mb-3">
              <div className="flex relative items-center justify-center">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none"
                  placeholder={"Contraseña"}
                  {...register("password", {
                    required: true,
                  })}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      className={`h-6 ${
                        showPassword ? "text-gray-700" : "text-gray-700"
                      }`}
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className={`h-6 ${
                        showPassword ? "text-gray-500" : "text-gray-700"
                      }`}
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
              {errors.password?.type === "required" && (
                <p>La contraseña es requerido *</p>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="w-full px-3">
            <button
              type="submit"
              className="block w-full max-w-xs mx-auto mt-5 bg-[#00A5CF] hover:bg-[#007390] focus:bg-[#007390] text-white rounded-lg px-3 py-3 font-semibold"
            >
              Iniciar sesión
            </button>
            <div className="flex items-center pt-5 justify-center">
              <a
                href="/recoverpassword"
                className="text-sm font-semibold text-[#00A5CF] hover:text-[#007390] text-right"
              >
                Recuperar contraseña
              </a>
            </div>

            <ErrorLogin
              estado={estadoErrorLogin}
              cambiarEstado={cambiarEstadoErrorLogin}
            >
              <h1 className="text-center text-xl font-semibold mt-9 mb-3">
                ¡Error al intentar iniciar sesión!
              </h1>
              <p className="text-center mb-5">
                Por favor verifíca que la información de tu correo y/o
                contraseña estén bien.
              </p>
            </ErrorLogin>
          </div>
        </form>
        <div className="text-center pb-5 pt-2 select-none text-gray-300">__________________________________________</div>
          <a
            href="/register"
            className=" flex justify-center text-semibold font-bold text-[#00A5CF] hover:text-[#007390] pb-4"
          >
            {" "}
            Registrarse
          </a>
      </div>
    </div>
  );
};

export default Login;
