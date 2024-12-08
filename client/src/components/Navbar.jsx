import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const uname = Cookies.get("username");
    setUsername(uname);
  }, []);

  const handleLogout = () => {
    Cookies.remove("postagramToken");
    Cookies.remove("username");

    navigate("/auth/sign-in");
  };

  return (
    <header className="container mt-4 flex flex-row items-center justify-between rounded-md border px-4 py-2">
      <Link to="/">
        <h1 className="text-xl">Postagram</h1>
      </Link>

      <ul className="flex flex-row items-center gap-4">
        <Link to="/feed" className="group">
          <li className="underline-offset-[3.5px] group-hover:underline">
            Feed
          </li>
        </Link>
        <Link to="search" className="group">
          <li className="underline-offset-[3.5px] group-hover:underline">
            Search
          </li>
        </Link>
        <Link to={`/profile/${username}`} className="group">
          <li className="underline-offset-[3.5px] group-hover:underline">
            Profile
          </li>
        </Link>
        <button
          className="rounded-md border border-slate-400 bg-indigo-500 px-4 py-2"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </ul>
    </header>
  );
};

export default Navbar;
