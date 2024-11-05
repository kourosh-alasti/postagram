import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center gap-3 bg-slate-900 text-white">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
