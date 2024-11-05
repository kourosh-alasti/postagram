import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-3 bg-slate-900 text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
