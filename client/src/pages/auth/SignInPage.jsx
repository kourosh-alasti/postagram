import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill out all fields before trying to login!");
    }

    const response = await fetch(
      `${import.meta.env.API_ENDPOINT}/api/auth/sign-in`,
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

    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-slate-400 bg-slate-800 p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold text-slate-400">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label
              className="mb-1 block text-sm font-semibold text-slate-400"
              htmlFor="username_input"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username_input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded px-3 py-1 text-slate-800 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="mb-1 block text-sm font-semibold text-slate-400"
              htmlFor="password_input"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded px-3 py-1 text-slate-800 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-lg border border-slate-500 bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link to="/auth/sign-up">
            <span className="font-semibold text-slate-200">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
