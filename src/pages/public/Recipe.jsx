import { useEffect, useState } from "react";
import reqAxios from "../../helpers/axios";
import { useParams } from "react-router-dom";
import useRecetas from "../../hooks/useRecetas";
import Swal from "sweetalert2";

const Recipe = () => {
  const params = useParams();
  const { userInfo } = useRecetas();

  const [receta, setReceta] = useState({});

  useEffect(() => {
    const obtenerReceta = async () => {
      try {
        const { data } = await reqAxios.get(
          `/recipes/get-recipe/${userInfo.id}&${params.id}`
        );

        setReceta(data);
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: error.response.data.msg,
        });
      }
    };
    obtenerReceta();
  }, []);

  return <div>{receta.name}</div>;
};

export default Recipe;

//TODO: TERMINAR COMPONENTE
/*
  MOSTRAR IMAGEN DE LA RECETA
  MOSTRAR INFORMACIÓN DE LA RECETA
  AGREGAR BOTÓN DE ELIMINAR
  AGREGAR BOTÓN DE EDITAR 
*/
{
  /* <i className="fa-solid fa-heart" /> 
  <i className="fa-regular fa-heart" /> */
}
