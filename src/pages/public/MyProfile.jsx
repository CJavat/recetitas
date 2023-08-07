import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useRecetas from "../../hooks/useRecetas";
import reqAxios from "../../helpers/axios";
import { formatDate } from "../../helpers/formatDate";

import Favorite from "../../components/Favorite";

const MiPerfil = () => {
  const params = useParams();

  const { userInfo } = useRecetas();

  const [profile, setProfile] = useState({});
  const [updateFavorite, setUpdateFavorite] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const { data } = await reqAxios.get(`/auth/my-profile/${params.id}`);
        setProfile(data);
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
  }, [updateFavorite]);

  return (
    <div className="text-center">
      <h1 className="mt-5 uppercase font-bold text-4xl text-black dark:text-white">
        Mi <span className="text-blue-500">Perfil</span>
      </h1>

      <div className="my-10">
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-7 mx-auto w-full sm:w-[750px]">
          <p className="uppercase bg-white dark:bg-black w-full sm:w-[350px] py-5 border-2 dark:border-none rounded-md  text-xl">
            <span className="block font-bold text-sm text-blue-500">
              Nombre:{" "}
            </span>
            {profile.firstName}
          </p>

          <p className="uppercase bg-white dark:bg-black w-full sm:w-[350px] py-5 border-2 dark:border-none rounded-md  text-xl">
            <span className="block font-bold text-sm text-blue-500">
              Apellido:{" "}
            </span>
            {profile.lastName}
          </p>

          <p className="uppercase bg-white dark:bg-black w-full sm:w-[350px] py-5 border-2 dark:border-none rounded-md  text-xl">
            <span className="block font-bold text-sm text-blue-500">
              Email:{" "}
            </span>
            {profile.email}
          </p>

          <p className="uppercase bg-white dark:bg-black w-full sm:w-[350px] py-5 border-2 dark:border-none rounded-md  text-xl">
            <span className="block font-bold text-sm text-blue-500">
              Registrado desde:{" "}
            </span>
            {formatDate(profile.registered)}
          </p>
        </div>

        <Link
          to={`/edit-profile/${userInfo.id}`}
          className="bg-blue-500 hover:bg-blue-400 text-white cursor-pointer rounded-lg px-5 py-3 font-bold uppercase block my-10 w-full sm:w-96 mx-auto"
        >
          Editar Mi Perfil
        </Link>
      </div>

      <div className="w-full sm:sm:w-[750px] mx-auto px-5 py-3 text-white bg-white dark:bg-black border dark:border-none rounded-lg flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-10">
        <p className="uppercase text-2xl font-bold text-black dark:text-white">
          Mis recetas favoritas
        </p>
        {profile.favorites &&
          profile.favorites.map((favoriteState) => (
            <Favorite
              key={favoriteState}
              idUser={params.id}
              favorite={favoriteState}
              updateFavorite={updateFavorite}
              setUpdateFavorite={setUpdateFavorite}
            />
          ))}
      </div>
    </div>
  );
};

export default MiPerfil;

/*
  EDITAR CUENTA (TERMINADO)
  MOSTRAR INFORMACIÓN ()
  MOSTRAR LOS FAVORITOS ()
*/
