import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import reqAxios from "../../helpers/axios";

const EditAccount = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const { data } = await reqAxios.get(`/auth/my-profile/${params.id}`);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: error.response.data.msg,
        });
      }
    };

    obtenerDatos();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();

    const data = {
      id: params.id,
      firstName,
      lastName,
    };

    try {
      const respuesta = await reqAxios.put("/auth/edit-account", data);

      Swal.fire("¡EXITO!", respuesta.data.msg, "success");
      navigate(`/my-profile/${params.id}`);
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
    <div className="w-full mt-10">
      <h2 className="text-center font-bold uppercase text-2xl sm:text-4xl">
        Editar
        <span className="text-blue-500"> Cuenta</span>
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
            type="submit"
            value="Actualizar Datos"
            className="bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-lg px-5 py-3 font-bold uppercase mt-10"
          />
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
