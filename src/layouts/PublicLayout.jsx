import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
// import Search from "../components/Search";
import Footer from "../components/Footer";
// import useRecetas from "../hooks/useRecetas";
import { useEffect } from "react";

const PublicLayout = () => {
  const navigate = useNavigate();
  // const { userInfo, setUserInfo } = useRecetas();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/auth");
    }
  }, []);

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
