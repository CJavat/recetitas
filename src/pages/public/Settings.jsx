import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import reqAxios from "../../helpers/axios";
import useRecetas from "../../hooks/useRecetas";

const Settings = () => {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useRecetas();

  const [cambiarPassword, setCambiarPassword] = useState("");
  const [cambiarEmail, setCambiarEmail] = useState("");

  const handleCambiarPassword = (e) => {
    e.preventDefault();

    const sendPassword = async () => {
      try {
        const { data } = await reqAxios.post(
          `/auth/new-password/${userInfo.id}`,
          { password: cambiarPassword }
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
      }
    };

    sendPassword();
  };

  const handleCambiarEmail = (e) => {
    e.preventDefault();

    const sendEmail = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        };

        const { data } = await reqAxios.post(
          "/auth/change-email",
          { email: cambiarEmail },
          config
        );

        Swal.fire("¡EXITO!", data.msg, "success");

        setUserInfo({});
        localStorage.removeItem("token");
        navigate("/auth");
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: error.response.data.msg,
        });
      }
    };

    sendEmail();
  };

  const eliminarCuenta = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado no podrás recuperar la cuenta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Borrarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        reqAxios
          .delete(`/auth/delete-account/${id}`)
          .then((response) => {
            Swal.fire(
              "¡Borrado!",
              "Tu cuenta se ha borrado con exito",
              "success"
            );
            console.log(response);

            setUserInfo({});
            localStorage.removeItem("token");
            navigate("/auth");
          })
          .catch((error) => {
            console.log(error);

            Swal.fire({
              icon: "error",
              title: "ERROR",
              text: error.response.data.msg,
            });
          });
      }
    });
  };

  return (
    <div className="my-10 flex flex-col justify-center items-center gap-10">
      <div className="w-full">
        <h2 className="text-center font-bold uppercase text-2xl sm:text-4xl mb-16">
          Cambiar
          <span className="text-blue-500"> Contraseña</span>
        </h2>

        <div className="mx-auto mt-20 sm:w-[550px] py-16 px-5 bg-white dark:bg-black rounded-lg relative flex flex-col justify-center items-center">
          <i className="fa-solid fa-lock px-10 py-10 rounded-full text-5xl absolute -top-16 bg-white dark:bg-black" />

          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleCambiarPassword}
          >
            <input
              type="password"
              placeholder="Contraseña"
              value={cambiarPassword}
              onChange={(e) => setCambiarPassword(e.target.value)}
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
      <div className="w-full">
        <h2 className="text-center font-bold uppercase text-2xl sm:text-4xl mb-16">
          Cambiar
          <span className="text-blue-500"> Email</span>
        </h2>

        <div className="mx-auto mt-20 sm:w-[550px] py-16 px-5 bg-white dark:bg-black rounded-lg relative flex flex-col justify-center items-center">
          <i className="fa-solid fa-envelope px-10 py-10 rounded-full text-5xl absolute -top-16 bg-white dark:bg-black" />
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleCambiarEmail}
          >
            <input
              type="email"
              placeholder="Email"
              value={cambiarEmail}
              onChange={(e) => setCambiarEmail(e.target.value)}
              className="outline-none bg-transparent border-b-2 border-b-black dark:border-b-white focus:border-b-blue-500 dark:focus:border-b-blue-500 focus:placeholder:text-blue-500"
              required
            />

            <input
              type="submit"
              value="Cambiar Email"
              className="bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-lg px-5 py-3 font-bold uppercase mt-10"
            />
          </form>
        </div>
      </div>
      <button
        onClick={() => eliminarCuenta(userInfo.id)}
        className="uppercase border border-red-600 text-red-600 hover:text-white hover:bg-red-600 text-xl text-center font-bold rounded-md py-5 px-7 w-full sm:w-[300px]"
      >
        Eliminar Cuenta
      </button>
    </div>
  );
};

export default Settings;
