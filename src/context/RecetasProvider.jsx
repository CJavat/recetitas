import { createContext, useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import clienteAxios from "../helpers/clienteAxios";

const RecetasContext = createContext();

const RecetasProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, [isDarkMode]);

  return (
    <RecetasContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </RecetasContext.Provider>
  );
};

export { RecetasProvider };
export default RecetasContext;
