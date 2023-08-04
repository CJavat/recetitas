import useRecetas from "../hooks/useRecetas";
import logo_black from "../assets/recetitas_logo_black.png";
import logo_white from "../assets/recetitas_logo_white.png";
import { useState } from "react";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const { isDarkMode, setIsDarkMode } = useRecetas();

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white px-5 flex justify-between">
      <div className="text-center flex flex-col">
        <img
          src={isDarkMode ? logo_white : logo_black}
          alt="Recetitas Logo"
          className="w-36"
        />
        <p className="text-2xl font-bold text-blue">Recetitas</p>
      </div>

      <div className="flex flex-col justify-around">
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

        <div className="flex justify-center items-center">
          <nav className="hidden sm:flex">Menu normal</nav>

          <div className="sm:hidden">
            <button onClick={() => setMenuActive(!menuActive)}>
              <i className="fa-solid fa-bars text-5xl" />
            </button>

            {/* //TODO: HACER QUE EL MENÚ SE ESTIRE HACIA ABAJO CON MOVIMIENTO */}
            <nav
              className={`w-1/2 transform transition duration-500 ease-in-out ${
                menuActive ? "-translate-Y-16" : "translate-Y-16"
              }  `}
            >
              <ul className="min-h-screen bg-red-400">
                <li>Elemento 1</li>
                <li>Elemento 2</li>
                <li>Elemento 3</li>
                <li>Elemento 4</li>
                <li>Elemento 5</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
