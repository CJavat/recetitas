import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import reqAxios from "../helpers/axios";

const RecetasContext = createContext();

const RecetasProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );
  const [userInfo, setUserInfo] = useState({});
  const [activeToken, setActiveToken] = useState("");
  const [mandarPeticion, setMandarPeticion] = useState(false);

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

  useEffect(() => {
    const decodeToken = async () => {
      try {
        if (localStorage.getItem("token")) {
          const localToken = localStorage.getItem("token");

          const { data } = await reqAxios.post("/auth/decode-token", {
            token: localToken,
          });

          setUserInfo({ id: data.id, email: data.email });
        }
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: error.response,
        });
      }
    };

    decodeToken();
  }, [Object.keys(userInfo).length, mandarPeticion]);

  return (
    <RecetasContext.Provider
      value={{
        isDarkMode,
        userInfo,
        activeToken,
        mandarPeticion,
        setIsDarkMode,
        setUserInfo,
        setActiveToken,
        setMandarPeticion,
      }}
    >
      {children}
    </RecetasContext.Provider>
  );
};

export { RecetasProvider };
export default RecetasContext;
