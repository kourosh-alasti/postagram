import { Link } from "react-router-dom";

const Navbar = () => {
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
        <Link to="/profile" className="group">
          <li className="underline-offset-[3.5px] group-hover:underline">
            Profile
          </li>
        </Link>
        <Link to="/auth/sign-up">
          <button className="rounded-md border border-slate-400 bg-indigo-500 px-4 py-2">
            Sign Up
          </button>
        </Link>
      </ul>
    </header>
  );
};

export default Navbar;
