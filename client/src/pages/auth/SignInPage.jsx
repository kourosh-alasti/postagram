import { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login");
    if (username === "" || password === "")
      setError("Need both username and password to login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label
              className="mb-1 block text-sm font-semibold text-gray-700"
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="mb-1 block text-sm font-semibold text-gray-700"
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
