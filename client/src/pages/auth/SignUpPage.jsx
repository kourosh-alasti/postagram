import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !username) {
      return toast.error(
        "Please fill out all fields before trying to sign up!",
      );
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/auth/sign-up`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
    );

    const data = await response.json();

    if (data.error) {
      return toast.error(data.error.message);
    }

    toast.success(data.message);

    navigate("/", { state: { isAuth: true } });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-slate-400 bg-slate-800 p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-400">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username_input"
              className="mb-1 block text-sm font-semibold text-slate-400"
            >
              Username
            </label>
            <input
              type="text"
              name="username_input"
              id="username_input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded px-3 py-1 text-slate-800 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password_input"
              className="mb-1 block text-sm font-semibold text-slate-400"
            >
              Password
            </label>
            <input
              type="text"
              name="password_input"
              id="password_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded px-3 py-1 text-slate-800 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="foucs:outline-none w-full rounded-lg border border-slate-500 bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/auth/sign-in">
            <span className="font-semibold text-slate-200">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
