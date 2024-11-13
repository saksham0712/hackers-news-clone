// src/LoginRegister.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [username, setUsername] = useState(""); // Track username input
  const [password, setPassword] = useState(""); // Track password input
  const [error, setError] = useState(""); // Track error messages
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate(); // For navigation

  // Check if the user is already logged in (via localStorage)
  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      navigate("/"); // Redirect to home page if logged in
    }
  }, [navigate]);

  // Handle Registration
  const handleRegister = () => {
    if (!username || !password) {
      setError("Please provide both username and password");
      return;
    }

    const storedUser = localStorage.getItem(username);
    if (storedUser) {
      setError("Username already exists");
      return;
    }

    // Store the new user in localStorage
    const user = { username, password };
    localStorage.setItem(username, JSON.stringify(user));

    setError(""); // Clear any error
    setUsername(""); // Clear the username input
    setPassword(""); // Clear the password input
    setIsLogin(true); // Switch to login form
  };

  // Handle Login
  const handleLogin = () => {
    if (!username || !password) {
      setError("Please provide both username and password");
      return;
    }

    const storedUser = localStorage.getItem(username);
    if (!storedUser) {
      setError("Username not found");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.password !== password) {
      setError("Incorrect password");
      return;
    }

    // Successful login
    localStorage.setItem("username", username); 
    navigate("/"); 
  };

  return (
    <div className="w-full m-auto max-w-sm p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl text-center mb-6">{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full p-3 border border-gray-300 rounded"
        />

        <button
          onClick={isLogin ? handleLogin : handleRegister}
          className="w-full p-3 bg-orange-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      <div className="mt-4 text-center">
        <button
          onClick={() => {
            setIsLogin(!isLogin); // Toggle between Login and Register
            setError(""); // Clear error on toggle
            setUsername(""); // Clear input fields on toggle
            setPassword("");
          }}
          className="text-orange-500 hover:underline"
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;
