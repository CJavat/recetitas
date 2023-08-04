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

        {/* //TODO: ESCONDER NAV EN AUTHLAYOUT */}
        <div className="flex justify-center items-center">
          <nav className="hidden sm:flex">Menu normal</nav>

          <div className="sm:hidden">
            <button onClick={() => setMenuActive(!menuActive)}>
              <i className="fa-solid fa-bars text-5xl" />
            </button>

            <nav
              className={`bg-white text-black dark:bg-black dark:text-white absolute top-0 left-0 w-full transform visible duration-500 ease-in-out ${
                menuActive ? "visible opacity-100" : "invisible opacity-0"
              }  `}
            >
              <div className="relative text-center pt-16">
                <button
                  className="absolute top-2 right-2 text-xl border rounded-md px-5 py-2"
                  onClick={() => setMenuActive(!menuActive)}
                >
                  X
                </button>

                {/* //TODO: MODIFICAR */}
                <ul className="h-screen text-2xl">
                  <a href="#">
                    <li>Elemento 1</li>
                  </a>
                  <a href="#">
                    <li>Elemento 2</li>
                  </a>
                  <a href="#">
                    <li>Elemento 3</li>
                  </a>
                  <a href="#">
                    <li>Elemento 4</li>
                  </a>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
