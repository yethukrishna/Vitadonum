import { faAddressCard, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const defaultImage =
  "https://cdn-icons-png.freepik.com/512/219/219988.png";

const ProfileHeader = () => {
  const [dropDownStatus, setDropDownStatus] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 🔹 load logged-in user
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setDropDownStatus(false);
    navigate("/");
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropDownStatus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full p-3 flex justify-between items-center bg-gray-800 text-white shadow-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="https://i.pinimg.com/736x/c3/5c/bc/c35cbc1c9598463c01bb818f13ff420c.jpg"
          alt="logo"
          className="w-12 h-12 rounded"
        />
        <h1 className="text-xl md:text-3xl font-semibold tracking-wide">
          <Link to="/">VITADONUM</Link>
        </h1>
      </div>

      {/* Right side */}
      {user && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropDownStatus(!dropDownStatus)}
            className="rounded-full"
          >
            <img
              src={
                user.profile
                  ? `http://localhost:4000/upload/${user.profile}`
                  : defaultImage
              }
              alt="profile"
              className="w-10 h-10 rounded-full border-black object-cover"
            />
          </button>

          {dropDownStatus && (
            <div className="absolute right-0 mt-3 w-48 bg-black shadow-lg rounded-md border z-50 text-white">
              <Link to="/profile">
                <p className="px-4 py-2 text-sm hover:bg-red-500 cursor-pointer flex items-center gap-2">
                  <FontAwesomeIcon icon={faAddressCard} /> Profile
                </p>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-red-500 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPowerOff} /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
