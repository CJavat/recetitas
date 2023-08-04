import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import reqAxios from "../../helpers/axios";

const EditAccount = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const updateProfile = async (e) => {
    e.preventDefault();
    // if (password !== repeatPassword) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "ERROR EN LA CONTRASEÑA",
    //     text: "Las contraseñas deben ser iguales",
    //   });
    // }

    // const data = {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    // };

    // try {
    //   const respuesta = await reqAxios.post("/auth/sign-up", data);
    //   Swal.fire("Cuenta Creada", respuesta.data.msg, "success");
    //   navigate("/auth");
    // } catch (error) {
    //   console.log(error);

    //   Swal.fire({
    //     icon: "error",
    //     title: "ERROR",
    //     text: error.response.data.msg,
    //   });
    // }
  };

  //TODO: TERMINAR COMPONENTE

  return (
    <div className="w-full">
      <h2 className="text-center font-bold uppercase text-2xl sm:text-4xl">
        Registra una cuenta y
        <span className="text-blue-500"> registra tus recetas</span>
      </h2>

      <div className="mx-auto mt-10 sm:w-[550px] py-10 px-5 bg-white dark:bg-black rounded-lg">
        <form className="flex flex-col gap-5" onSubmit={updateProfile}>
          <input
            type="text"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="outline-none bg-transparent border-b-2 border-b-black dark:border-b-white focus:border-b-blue-500 dark:focus:border-b-blue-500 focus:placeholder:text-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="outline-none bg-transparent border-b-2 border-b-black dark:border-b-white focus:border-b-blue-500 dark:focus:border-b-blue-500 focus:placeholder:text-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none bg-transparent border-b-2 border-b-black dark:border-b-white focus:border-b-blue-500 dark:focus:border-b-blue-500 focus:placeholder:text-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none bg-transparent border-b-2 border-b-black dark:border-b-white focus:border-b-blue-500 dark:focus:border-b-blue-500 focus:placeholder:text-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Repite tu contraseña"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="outline-none bg-transparent border-b-2 border-b-black dark:border-b-white focus:border-b-blue-500 dark:focus:border-b-blue-500 focus:placeholder:text-blue-500"
            required
          />

          <input
            type="submit"
            value="Registrarme"
            className="bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-lg px-5 py-3 font-bold uppercase mt-10"
          />
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
