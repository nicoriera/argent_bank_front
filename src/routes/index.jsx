import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import User from "../pages/User";
import { useSelector } from "react-redux";

const Router = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/user"
        element={isAuthenticated ? <User /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export { Router };
