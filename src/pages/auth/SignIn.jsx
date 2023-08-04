import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useRecetas from "../../hooks/useRecetas";
import reqAxios from "../../helpers/axios";

const SignIn = () => {
  const navigate = useNavigate();
  const { setActiveToken } = useRecetas();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const respuesta = await reqAxios.post("/auth/sign-in", data);

      setActiveToken(respuesta.data.token);
      localStorage.setItem("token", respuesta.data.token);
      navigate("/");
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
    <div className="w-full">
      <h2 className="text-center font-bold uppercase text-2xl sm:text-4xl mb-16">
        Iniciar
        <span className="text-blue-500"> Sesión</span>
      </h2>

      <div className="mx-auto mt-20 sm:w-[550px] py-16 px-5 bg-white dark:bg-black rounded-lg relative flex flex-col justify-center items-center">
        <i className="fa-solid fa-user px-10 py-10 rounded-full text-5xl absolute -top-16 bg-white dark:bg-black" />

        <form className="flex flex-col gap-5 w-full" onSubmit={login}>
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
            type="submit"
            value="Iniciar Sesión"
            className="bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-lg px-5 py-3 font-bold uppercase mt-10"
          />
        </form>

        <div className="w-full flex flex-col sm:flex-row gap-3 justify-around text-sm mt-7">
          <Link
            to="/auth/forgot-password"
            className="font-bold uppercase hover:text-blue-500"
          >
            Olvidé mi password
          </Link>

          <Link
            to="/auth/sign-up"
            className="font-bold uppercase text-blue-500 hover:text-white"
          >
            Registrarme
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
