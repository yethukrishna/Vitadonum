import {faBars,faPowerOff} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="w-full p-3 flex justify-between items-center bg-black text-white shadow-2xl z-50">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pinimg.com/736x/c3/5c/bc/c35cbc1c9598463c01bb818f13ff420c.jpg"
            alt="logo"
            className="w-12 h-12 rounded"
          />
          <h1 className="text-xl md:text-3xl font-semibold tracking-wide">
            <Link to="/admin-home">VITADONUM</Link>
          </h1>
        </div>

        {/* DESKTOP LOGOUT */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="border border-red-500 text-red-500 rounded px-4 py-2 hover:bg-white hover:text-black transition flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPowerOff} /> Logout
          </button>
        </div>

        {/* MOBILE */}
        <div className="md:hidden">
          <FontAwesomeIcon icon={faBars} className="text-2xl cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
