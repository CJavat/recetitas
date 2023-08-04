import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import reqAxios from "../../helpers/axios";

const ConfirmAccount = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [accountActivated, setAccountActivated] = useState(false);

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        await reqAxios.post(`/auth/confirm-account/${params.token}`);
        setAccountActivated(true);
      } catch (error) {
        console.log(error);
        setAccountActivated(false);
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: error.response.data.msg,
        });
      }
    };

    confirmAccount();
  }, []);

  const redirect = () => {
    setTimeout(() => {
      navigate("/auth");
    }, 3000);
  };

  return accountActivated ? (
    <div className="py-10 px-3 border border-green-500 text-green-500 sm:border-none text-center text-xl sm:text-5xl font-bold uppercase rounded-md">
      <p>Tu cuenta se activó correctamente</p>

      {redirect()}
    </div>
  ) : (
    <div className="py-10 px-3 border border-red-500 sm:border-none text-center text-xl sm:text-5xl font-bold uppercase rounded-md">
      <p className="text-red-500">Ocurrió un error al activar tu cuenta </p>

      <p className="text-blue-500 mt-7">Inténtalo otra vez</p>
    </div>
  );
};

export default ConfirmAccount;
