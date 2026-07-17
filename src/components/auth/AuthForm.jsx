import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = location.pathname === "/login";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await logIn(email, password);
      } else {
        await signUp(email, password);
      }
      navigate("/blogs");
    } catch (err) {
      console.error("Auth Error : ", err);
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "aut/wrong-password"
      ) {
        setError("Invalied email or password");
      } else if (err.code === "aut/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else {
        setError("Failed to authenticate. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleToggleMode() {
    setError("");
    if (isLogin) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white border border-grey-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-grey-800 mb-6">
        {" "}
        {isLogin ? "Welcome Back " : "Create an Account"}{" "}
      </h2>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          {loading ? (
            <>
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Processing...</span>
            </>
          ) : isLogin ? (
            "Log In"
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-6">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={handleToggleMode}
          className="text-blue-600 font-medium hover:underline focus:outline-none"
        >
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
