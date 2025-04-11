import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, clearError } from "../features/auth/authSlice";
import "../styles/pages/_login.scss";
import PropTypes from "prop-types";

const Login = () => {
  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select relevant state from Redux store
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Redirect to user profile page if already authenticated
    if (isAuthenticated) {
      navigate("/user");
    }

    // Cleanup function to clear any login errors when the component unmounts
    // or when authentication status changes.
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission page reload
    // Dispatch login action with email and password
    dispatch(loginUser({ email, password }));
  };

  return (
    <main className="login-page">
      <section className="sign-in-content">
        <i className="login-icon fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {/* Display login error message if it exists */}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Submit button is disabled and shows loading text during login attempt */}
          <button
            type="submit"
            className="sign-in-button button"
            disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
