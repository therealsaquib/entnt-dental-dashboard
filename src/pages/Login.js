import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.role === "Patient") {
        navigate("/patient-view");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 sm:p-10">
        <div className="text-center mb-6">
          <svg className="mx-auto mb-4" width="48" height="48" fill="none" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="24" fill="#2563eb" />
            <path d="M24 14c-5.523 0-10 4.03-10 9s4.477 9 10 9 10-4.03 10-9-4.477-9-10-9zm0 16c-3.866 0-7-2.686-7-6s3.134-6 7-6 7 2.686 7 6-3.134 6-7 6z" fill="#fff"/>
          </svg>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-500">Log in to your ENTNT Dental Dashboard</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="h-4 w-4 text-blue-500" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            Contact Admin
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;