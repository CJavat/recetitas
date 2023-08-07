import { useState } from "react";
import Swal from "sweetalert2";
import reqAxios from "../../helpers/axios";
import { useNavigate, useParams } from "react-router-dom";

const NewPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendPassword = async () => {
      try {
        const { data } = await reqAxios.post(
          `/auth/change-password/${params.token}`,
          { password }
        );
        Swal.fire("¡EXITO!", data.msg, "success");
        navigate("/auth");
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: error.response.data.msg,
        });

        navigate("/auth");
      }
    };

    sendPassword();
  };

  return (
    <div className="w-full">
      <h2 className="text-center font-bold uppercase text-2xl sm:text-4xl mb-16">
        Cambiar
        <span className="text-blue-500"> Contraseña</span>
      </h2>

      <div className="mx-auto mt-20 sm:w-[550px] py-16 px-5 bg-white dark:bg-black rounded-lg relative flex flex-col justify-center items-center">
        <i className="fa-solid fa-lock px-10 py-10 rounded-full text-5xl absolute -top-16 bg-white dark:bg-black" />

        <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
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
            value="Cambiar Contraseña"
            className="bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-lg px-5 py-3 font-bold uppercase mt-10"
          />
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
