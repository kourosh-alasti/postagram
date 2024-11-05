import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");

      setUsername("");
      setPassword("");
      setConfirmPassword("");

      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username_input"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username_input"
              id="username_input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="5 flex flex-col gap-1">
            <label
              htmlFor="password_input"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="text"
              name="password_input"
              id="password_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="5 flex flex-col gap-1">
            <label
              htmlFor="confirm-password_input"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="text"
              name="confirm-password_input"
              id="confirm-password_input"
              value={confirm}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="foucs:outline-none w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span onClick={() => navigate("/auth/sign-in")}> Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
