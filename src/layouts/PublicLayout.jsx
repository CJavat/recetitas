import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Buscar from "../components/Buscar";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Buscar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
