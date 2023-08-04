import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Search from "../components/Search";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="px-5 flex-1">
        {/* <Search /> */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
