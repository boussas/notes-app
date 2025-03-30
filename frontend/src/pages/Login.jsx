import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavBar } from "../Components/NavBar";

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data);
        window.location.href = "/";
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Login failed, please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex flex-1 items-center justify-center px-4 py-8">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
              Login
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
              <p className="text-center mt-4 text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
