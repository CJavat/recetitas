import { useContext } from "react";
import { RecetasProvider } from "../context/RecetasProvider";

const useRecetas = () => {
  return useContext(RecetasProvider);
};

export default useRecetas;
