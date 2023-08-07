import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import reqAxios from "../helpers/axios";
import { Link } from "react-router-dom";

const Favorite = ({ idUser, favorite, updateFavorite, setUpdateFavorite }) => {
  const [receta, setReceta] = useState({});
  let contador = 0;

  useEffect(() => {
    const obtenerReceta = async () => {
      try {
        const { data } = await reqAxios.get(
          `/recipes/get-recipe/${idUser}&${favorite}`
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

  const eliminarFavorito = async (e, id) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    try {
      await reqAxios.put(`/auth/delete-favorite/${id}`, {}, config);

      setUpdateFavorite(!updateFavorite);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error.response.data.msg,
      });
    }
  };

  return (
    <div className="bg-blue-800 rounded-md px-3 py-2 sm:px-7 sm:py-5 relative">
      <button
        className="absolute -top-5 -right-3 text-4xl"
        onClick={(e) => eliminarFavorito(e, favorite)}
      >
        <i className="fa-solid fa-heart text-red-600" />
      </button>
      <h1 className="font-bold text-xl text-center uppercase">{receta.name}</h1>
      <p className="text-start my-2 font-bold">
        INGREDIENTES
        {receta.ingredients &&
          receta.ingredients.map((ingredient) => (
            <span key={contador} className="pl-2 block text-lg text-slate-300">
              - {ingredient}
              {contador++}
            </span>
          ))}
      </p>
      {receta.link && (
        <a
          href={receta.link}
          className="my-4 bg-slate-950 hover:bg-slate-50 hover:text-black cursor-pointer rounded-lg px-5 py-3 font-bold uppercase block w-full sm:w-96"
        >
          Ir a la Pagína de Receta
        </a>
      )}

      <Link
        to={`/recipe/${receta._id}`}
        className="my-4 bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-lg px-5 py-3 font-bold uppercase block w-full sm:w-96"
      >
        Ver Receta
      </Link>
    </div>
  );
};

export default Favorite;
