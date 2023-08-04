import { createContext, useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import clienteAxios from "../helpers/clienteAxios";

const RecetasContext = createContext();

const RecetasProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );
  // const [userInfo, setUserInfo] = useState({});

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

  // useEffect(() => {}, []);

  return (
    <RecetasContext.Provider
      value={{ isDarkMode, /* userInfo, */ setIsDarkMode /* setUserInfo */ }}
    >
      {children}
    </RecetasContext.Provider>
  );
};

export { RecetasProvider };
export default RecetasContext;
