import { useContext } from "react";
import RecetasContext from "../context/RecetasProvider";

const useRecetas = () => {
  return useContext(RecetasContext);
};

export default useRecetas;
