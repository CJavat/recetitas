import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reqAxios from "../../helpers/axios";
import useRecetas from "../../hooks/useRecetas";
import Swal from "sweetalert2";

const PublicIndex = () => {
  const { userInfo } = useRecetas();

  const [allRecipes, setAllRecipes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setCargando(true);
        const { data } = await reqAxios.get(
          `/recipes/get-recipes/${userInfo.id}`
        );
        console.log(data);
        setAllRecipes(data);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: error.response.data,
        });
      } finally {
        setCargando(false);
      }
    };

    if (userInfo.id) getRecipes();
  }, [userInfo]);

  return cargando ? (
    <p className="w-fit h-fit mx-auto mt-80 text-4xl font-bold text-green-500 border border-green-500">
      CARGANDO...
    </p>
  ) : (
    <div className="text-center">
      <h1 className="mt-5 uppercase font-bold text-4xl text-black dark:text-white">
        Mis <span className="text-blue-500">Recetas</span>
      </h1>

      {allRecipes.length > 0 ? (
        allRecipes.map((recetaState) => (
          <div
            key={recetaState._id}
            className="w-full sm:w-[550px] mx-auto my-10 px-5 py-3 bg-white dark:bg-black rounded-md text-left"
          >
            <Link to={`/recipe/${recetaState._id}`}>
              <p className="text-center font-bold text-2xl mb-5 pb-2 border-b-4 border-b-blue-500">
                {recetaState.name}
              </p>

              <div>
                <h3 className="text-slate-700 dark:text-slate-400 font-bold">
                  Procedimiento:{" "}
                </h3>
                <p>{recetaState.procedure}</p>
              </div>
              <div className="h-fit my-5 p-2 border border-slate-500 rounded-md bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-start">
                <h4 className="font-bold">Ingredientes:</h4>
                {recetaState.ingredients.map((ingredientState, index) => (
                  <p key={index}>* {ingredientState}</p>
                ))}
              </div>

              <div>
                {recetaState.picture.length > 0 ? (
                  <img
                    src={`http://127.0.0.1:8000/${recetaState.picture}`}
                    alt={`Logo ${recetaState.picture}`}
                    className="w-32 h-32 mx-auto"
                  />
                ) : (
                  <p className="border border-red-600 p-16 text-center flex justify-center items-center">
                    <span className="block">SIN LOGO</span>
                  </p>
                )}
              </div>
            </Link>

            <a
              target="_blank"
              rel="noreferrer"
              href={`https://${recetaState.link}`}
              className="mt-7 mb-3 block w-full text-center font-bold hover:text-blue-500 uppercase z-50"
            >
              Visitar Página Web
            </a>
          </div>
        ))
      ) : (
        <p>NO HAY RECETAS</p>
      )}

      <h2 className="mt-5 uppercase font-bold text-4xl text-black dark:text-white">
        Mis <span className="text-red-500">Favoritos</span>
      </h2>
    </div>
  );
};

export default PublicIndex;

/*
  AGREGAR ICONO DE FAVORITOS
*/

//TODO: TERMINAR COMPONENTE
