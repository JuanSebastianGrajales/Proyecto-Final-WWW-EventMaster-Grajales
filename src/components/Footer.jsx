import React from "react";

const Footer = () => {
  return (
    // Contenedor del footer
    <footer className="absoulte bottom-0 bg-gray-800 p-2 py-6 ">

      {/* Contenedor para limitar el ancho del contenido del footer */}
      <div className="flex justify-center min-[506px]:justify-center flex-wrap min-[824px]:flex-nowrap items-center text-left lg:text-left w-full "> {/* [&>div]:border-2 [&>ul]:border-2 */}

        {/* Contenedor título de la app y logo de GitHub */}
        <div className="flex items-center px-4 flex-shrink-0 text-center min-[506px]:text-left">
          <div className="inline-block">
            <h4 className="text-3xl fonat-semibold text-gray-100 text-center">
              EventMaster
            </h4>
            <h5 className="text-lg text-gray-100">
              Gestiona tus eventos a gusto
            </h5>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
