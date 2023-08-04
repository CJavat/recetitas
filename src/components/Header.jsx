import { useState } from "react";
import { Link } from "react-router-dom";
import useRecetas from "../hooks/useRecetas";
import logo_black from "../assets/recetitas_logo_black.png";
import logo_white from "../assets/recetitas_logo_white.png";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const { isDarkMode, setIsDarkMode } = useRecetas();

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white px-5 py-2 flex justify-between">
      <Link className="text-center flex flex-col justify-center items-center">
        <img
          src={isDarkMode ? logo_white : logo_black}
          alt="Recetitas Logo"
          className="w-20 sm:w-36"
        />
        <p className="text-2xl font-bold text-blue-500">Recetitas</p>
      </Link>

      <div className="flex flex-col justify-around sm:justify-center items-center sm:gap-5">
        <button
          className="text-4xl text-black dark:text-white"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? (
            <i className="fa-regular fa-sun" />
          ) : (
            <i className="fa-regular fa-moon" />
          )}
        </button>

        {localStorage.getItem("token") && (
          <div className="flex justify-center items-center">
            <div className="h-fit">
              <button
                className="sm:hidden"
                onClick={() => setMenuActive(!menuActive)}
              >
                <i className="fa-solid fa-bars text-5xl" />
              </button>

              <nav
                className={`w-full bg-white dark:bg-black text-black dark:text-white sm:visible absolute sm:relative top-0 left-0 transform visible duration-500 ease-in-out ${
                  menuActive
                    ? "visible opacity-100"
                    : "invisible opacity-0 sm:visible sm:opacity-100"
                }  `}
              >
                <div className="relative text-center pt-16 sm:pt-0">
                  <button
                    className="sm:hidden absolute top-2 right-2 text-xl border rounded-md px-5 py-2"
                    onClick={() => setMenuActive(!menuActive)}
                  >
                    X
                  </button>

                  <ul className="uppercase h-screen sm:h-fit text-2xl sm:text-xl font-bold sm:flex sm:justify-center sm:items-center sm:gap-3">
                    <a href="#" className="hover:text-blue-500">
                      <li>Agregar Receta</li>
                    </a>
                    <a href="#" className="hover:text-blue-500">
                      <li>Mi Perfil</li>
                    </a>
                    <a href="#" className="hover:text-blue-500">
                      <li>Mis Favoritas</li>
                    </a>
                    <a href="#" className="hover:text-blue-500">
                      <li>Ajustes</li>
                    </a>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
