import { createContext, useState } from "react";
// import Swal from "sweetalert2";
// import clienteAxios from "../helpers/clienteAxios";

const RecetasContext = createContext();

const RecetasProvider = ({ children }) => {
  const [prueba, setPrueba] = useState(false); // State de prueba

  return (
    <RecetasContext.Provider value={{ prueba, setPrueba }}>
      {children}
    </RecetasContext.Provider>
  );
};

export { RecetasProvider };
export default RecetasContext;
