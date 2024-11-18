import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
// import img from "../assets/images/images.png";

const LoginPage = () => {
  const location = useLocation();
  const userType = location.state?.userType || "manufacturer";

  const [username, setUsername] = useState("");
  const [passphrase, setPassphrase] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();

    const loginDetails = { username, password, passphrase, userType };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(`Logged in as: ${data.userType}`);
      } else {
        toast.error("Please check your credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mx-4">
        {/* Left Side - Illustration */}
        <div className="flex justify-center mb-6">
          {/* <img src={img} alt="Illustration" className="w-24 h-24" /> */}
        </div>

        {/* Heading and Description */}
        <h1 className="text-3xl font-bold text-center text-green-600 mb-2">AgriChain</h1>
        <p className="text-gray-500 text-center mb-8">
          "Empowering transparent and efficient agriculture supply chains with blockchain technology."
        </p>

        {/* Login Form */}
        <form onSubmit={loginSubmit} className="space-y-5">
          <h2 className="text-xl font-semibold text-gray-800 text-center">Welcome, {userType}</h2>

          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username or Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          

          <div>
            <input
              type="password"
              id="passphrase"
              name="passphrase"
              placeholder="Passphrase"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg w-full hover:bg-green-600 transition duration-300"
          >
            Sign In
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Or sign in with Google
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;