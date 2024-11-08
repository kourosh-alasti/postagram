import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      const response = await fetch("http://localhost:8000/api/auth/token", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = await response.json();
      console.log(body);
      setAuth(body.isAuthenticated);
    };

    handleAuth();
  }, []);

  return (
    <>
      {auth ? (
        <div className="flex h-full w-full flex-col items-center gap-3 bg-slate-900 text-white">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      ) : (
        <Navigate to="/auth/sign-in" />
      )}
    </>
  );
};

export default MainLayout;
