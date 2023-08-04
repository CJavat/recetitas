import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRecetas from "../../hooks/useRecetas";
import reqAxios from "../../helpers/axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useRecetas();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const saveData = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      console.log("PASSWORD INCORRECTORY");
      //TODO: TERMINAR VALIDACIÓN Y MOSTRAR ALERTA CON SWITALERT2
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const respuesta = await reqAxios.get("/auth/sign-up", data);
      console.log(respuesta.data);
      //TODOS: TERMINAR CONSULTA
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-center font-bold uppercase text-2xl sm:text-4xl">
        Registra una cuenta y
        <span className="text-blue-500"> registra tus recetas</span>
      </h2>

      <div className="mx-auto mt-10 sm:w-[550px] py-10 px-5 bg-white dark:bg-black rounded-lg">
        <form className="flex flex-col gap-5" onSubmit={saveData}>
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
            className="bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-lg px-5 py-3 font-bold uppercase"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
