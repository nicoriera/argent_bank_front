import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { clearUserData } from "../features/user/userSlice";
import argentBankLogo from "../assets/img/argentBankLogo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { firstName } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserData());
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-5 py-3 bg-white">
      <Link to="/" className="flex items-center">
        <img
          className="max-w-full w-24"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link
              className="font-bold text-gray-700 mr-2 hover:underline"
              to="/profile">
              <i className="fa fa-user-circle mr-1"></i>
              {firstName}
            </Link>
            <button
              className="font-bold text-gray-700 hover:underline bg-transparent border-none cursor-pointer"
              onClick={handleLogout}>
              <i className="fa fa-sign-out mr-1"></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center text-gray-700 font-bold hover:underline">
            <i className="fa fa-user-circle mr-1"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
