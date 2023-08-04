import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between px-3">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
