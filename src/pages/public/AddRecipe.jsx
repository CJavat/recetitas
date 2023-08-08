import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useRecetas from "../../hooks/useRecetas";
import reqAxios from "../../helpers/axios";

const AddRecipe = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [procedure, setProcedure] = useState("");

  const { userInfo } = useRecetas();

  const leerLogo = (e) => {
    const archivo = e.target.value;
    if (
      archivo.split(".").lastIndexOf("png") !== archivo.split(".").length - 1 &&
      archivo.split(".").lastIndexOf("jpg") !== archivo.split(".").length - 1
    ) {
      e.target.value = null;
      return alert("Sólo está permitido subir imagenes PNG o JPG");
    }

    setPicture(e.target.files[0]);
  };

  const addMoreIngredients = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
    setIngredient("");
    console.log(ingredient);
  };

  const removeMoreIngredients = (ingredient, index) => {
    console.log(ingredient, index);
    const newArray = ingredients.filter((ingredientState, i) => i !== index);
    setIngredients(newArray);
  };

  const saveData = async (e) => {
    e.preventDefault();
    try {
      if (ingredients.length === 0) {
        throw new Error("DEBES AGREGAR AL MENOS 1 INGREDIENTE");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("link", link);
      formData.append("picture", picture);
      formData.append("procedure", procedure);
      formData.append("userId", userInfo.id);
      ingredients.map((ingredient, i) => {
        formData.append(`ingredients[${i}]`, ingredient);
      });

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const { data } = await reqAxios.post(
        "/recipes/add-recipe",
        formData,
        config
      );

      Swal.fire("Cuenta Creada", data.msg, "success");
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error.response?.data ? error.response?.data : error,
      });
    }

    setName("");
    setIngredients([]);
    setLink("");
    setPicture("");
    setIngredient("");
    setProcedure("");
  };

  return (
    <div className="w-full">
      <h2 className="text-center font-bold uppercase text-2xl sm:text-4xl mt-10">
        Registra una cuenta y
        <span className="text-blue-500"> registra tus recetas</span>
      </h2>

      <div className="mx-auto mt-20 sm:w-[550px] py-16 px-5 bg-white dark:bg-black rounded-lg relative flex flex-col justify-center items-center">
        <i className="fa-solid fa-table-list px-10 py-10 rounded-full text-5xl absolute -top-16 bg-white dark:bg-black" />

        <form className="flex flex-col gap-5 w-full" onSubmit={saveData}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none bg-transparent border-b-2 border-b-black dark:border-b-white focus:border-b-blue-500 dark:focus:border-b-blue-500 focus:placeholder:text-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Link de la página"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="outline-none bg-transparent border-b-2 border-b-black dark:border-b-white focus:border-b-blue-500 dark:focus:border-b-blue-500 focus:placeholder:text-blue-500"
          />

          <input
            type="file"
            accept=".jpg,.png"
            onChange={leerLogo}
            className="w-full text-sm text-slate-500 uppercase font-bold file:block sm:file:inline file:mr-4 file:py-2
            file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-200 file:text-black
            dark:file:bg-slate-800 dark:file:text-white hover:file:bg-slate-50 dark:hover:file:bg-slate-900 
            hover:file:cursor-pointer file:uppercase"
          />

          <div className="bg-slate-50 dark:bg-slate-950 pt-2 rounded-md flex flex-col justify-center items-center max-h-[300px] scrollbar overflow-y-auto">
            <div className="flex justify-center items-center w-full px-3 h-fit ">
              <input
                type="text"
                placeholder="Ingrediente"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className="flex-1 h-10 outline-none bg-transparent border-b-2 border-b-black dark:border-b-white focus:border-b-blue-500 dark:focus:border-b-blue-500 focus:placeholder:text-blue-500"
              />

              <button
                type="button"
                className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-sans text-xl w-10 h-10 rounded-md"
                onClick={() => addMoreIngredients(ingredient)}
              >
                +
              </button>
            </div>

            {ingredients.length > 0 && (
              <div className="flex flex-col justify-center items-center gap-2 w-10/12 mt-5">
                {ingredients.map((ingredientState, index) => (
                  <p
                    key={index + 1}
                    className="relative border border-black text-black dark:border-white dark:text-white  rounded-md w-full px-3 py-3"
                  >
                    {ingredientState}

                    <button
                      key={index + 1}
                      type="button"
                      className="absolute top-1 right-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-sans text-xl w-10 h-10 rounded-md"
                      onClick={() =>
                        removeMoreIngredients(ingredientState, index)
                      }
                    >
                      -
                    </button>
                  </p>
                ))}
              </div>
            )}
          </div>

          <textarea
            value={procedure}
            onChange={(e) => setProcedure(e.target.value)}
            placeholder="Procedimiento de la receta"
            className="mt-7 resize-none scrollbar bg-slate-50 dark:bg-slate-950 border border-slate-500 px-3 py-2 min-h-[150px] rounded-md outline-none bg-transparent focus:placeholder:text-blue-500"
          />

          <input
            type="submit"
            value="Agregar Receta"
            className="bg-blue-500 text-white hover:bg-blue-400 cursor-pointer rounded-lg px-5 py-3 font-bold uppercase mt-10"
          />
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
