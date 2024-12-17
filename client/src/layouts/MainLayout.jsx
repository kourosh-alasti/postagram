import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const { state } = useLocation();
  const { isAuth = null } = state;

  const isAuthenticated = isAuth || false;

  const [auth, setAuth] = useState(isAuthenticated);

  useEffect(() => {
    const handleAuth = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/api/auth/token`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const body = await response.json();
      setAuth(body.isAuthenticated);
    };

    handleAuth();
  }, []);

  if (auth === false) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <>
      <div className="flex h-full w-full flex-col items-center gap-3 bg-slate-900 text-white">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
