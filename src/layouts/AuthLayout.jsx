import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="flex-1 flex justify-center items-center px-3">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
