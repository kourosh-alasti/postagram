import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-3 bg-slate-900 text-white">
      <Outlet />
    </div>
  );
};

export default RootLayout;
