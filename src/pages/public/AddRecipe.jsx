import { useState } from "react";
import { Link } from "react-router-dom";

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState("");
  const [ingredient, setIngredient] = useState("");

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
  };

  return (
    <div className="w-full">
      <h2 className="text-center font-bold uppercase text-2xl sm:text-4xl">
        Registra una cuenta y
        <span className="text-blue-500"> registra tus recetas</span>
      </h2>

      <div className="mx-auto mt-20 sm:w-[550px] py-16 px-5 bg-white dark:bg-black rounded-lg relative flex flex-col justify-center items-center">
        <i className="fa-solid fa-table-list px-10 py-10 rounded-full text-5xl absolute -top-16 bg-white dark:bg-black" />

        <form className="flex flex-col gap-5 w-full" /* onSubmit={saveData} */>
          {/* 
            //TODO: TERMINAR ESTA PARTE, AGREGAR MIN HEIGHT Y LO QUE SOBRESALGA, PONERLE EL SCROLL, DARLE ESTILOS Y GUARDAR 
          */}
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
            required
          />

          <input
            type="file"
            accept=".jpg,.png"
            onChange={leerLogo}
            className="w-full text-sm text-slate-500 uppercase font-bold file:block sm:file:inline file:mr-4 file:py-2
            file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-200 file:text-black
            dark:file:bg-slate-800 dark:file:text-white hover:file:bg-slate-50 dark:hover:file:bg-slate-900 
            hover:file:cursor-pointer file:uppercase"
            required
          />

          <div className="border flex flex-col justify-center items-center">
            <div>
              <input
                type="text"
                placeholder="Ingrediente"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className="outline-none bg-transparent border-b-2 border-b-black dark:border-b-white focus:border-b-blue-500 dark:focus:border-b-blue-500 focus:placeholder:text-blue-500"
                required
              />

              <button
                type="button"
                className="border border-blue-500 text-blue-500 font-sans text-xl rounded-md px-5 py-3"
                onClick={() => addMoreIngredients(ingredient)}
              >
                +
              </button>
            </div>

            {ingredients.length > 0 &&
              ingredients.map((ingredientState, index) => (
                <span key={index + 1} className="text-red-500">
                  {ingredientState}
                </span>
              ))}
          </div>

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
//TODO: TERMINAR COMPONENTE
