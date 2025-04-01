import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, clearError } from "../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Si l'utilisateur est déjà authentifié, rediriger vers la page de profil
    if (isAuthenticated) {
      navigate("/profile");
    }

    // Nettoyer les erreurs lors du démontage du composant
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, rememberMe }));
  };

  return (
    <main className="flex-1 bg-purple-950">
      <section className="box-border bg-white w-80 mx-auto mt-12 p-8">
        <i className="fa fa-user-circle text-5xl"></i>
        <h1>Sign In</h1>
        {error && (
          <div className="text-red-600 bg-red-100 border border-red-200 p-2.5 mb-4 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-left mb-4">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-1.5 text-lg border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col text-left mb-4">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-1.5 text-lg border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-1"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="submit"
            className="block w-full p-2 text-lg font-bold mt-4 bg-green-500 text-white cursor-pointer disabled:opacity-70"
            disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
