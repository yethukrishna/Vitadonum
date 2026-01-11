import {faUser,faBars,faAddressCard,faPowerOff} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ scrollToAbout, scrollToMission, scrollToHope }) => {
  const [dropDownStatus, setDropDownStatus] = useState(false);
  const [menuStatus, setMenuStatus] = useState(false);
  const [token, setToken] = useState(null);

  const dropdownRef = useRef(null);
  const location = useLocation();

  // ✅ SYNC LOGIN STATUS
  useEffect(() => {
    const syncToken = () => {
      const tok = sessionStorage.getItem("token");
      setToken(tok);
    };

    syncToken();
    window.addEventListener("storage", syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
    };
  }, []);

  // logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setDropDownStatus(false);
    window.location.href = "/";
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
    <>
      {/* ===== HEADER ===== */}
      <div className="w-full p-3 flex justify-between items-center bg-black text-white shadow-xl">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pinimg.com/736x/c3/5c/bc/c35cbc1c9598463c01bb818f13ff420c.jpg"
            alt="logo"
            className="w-12 h-12 rounded"
          />
          <h1 className="text-xl md:text-3xl font-semibold">
            <Link to="/">VITADONUM</Link>
          </h1>
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-4">
          {!token && (
            <Link to="/auth">
              <button className="border border-red-500 text-red-500 px-3 py-2 rounded flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} /> Login
              </button>
            </Link>
          )}

          {token && (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropDownStatus(!dropDownStatus)}>
                <img
                  src="https://i.pinimg.com/1200x/19/0e/c4/190ec45e85a736714a81a796bd48a8ad.jpg"
                  className="w-10 h-10 rounded-full border"
                />
              </button>

              {dropDownStatus && (
                <div className="absolute right-0 mt-3 w-48 bg-black border rounded text-white">
                  <Link to="/profile">
                    <p className="px-4 py-2 hover:bg-red-500 flex gap-2">
                      <FontAwesomeIcon icon={faAddressCard} /> Profile
                    </p>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-500 flex gap-2"
                  >
                    <FontAwesomeIcon icon={faPowerOff} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="text-2xl"
            onClick={() => setMenuStatus(!menuStatus)}
          />
        </div>
      </div>

      {/* NAV */}
      <nav className="py-4 px-6">
        <ul
          className={`${
            menuStatus ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-6 justify-center text-white`}
        >
          <li>
            <Link to="/">Home</Link>
          </li>

          <li
            onClick={() =>
              location.pathname === "/"
                ? scrollToAbout()
                : (window.location.href = "/#about")
            }
          >
            About
          </li>

          <li
            onClick={() =>
              location.pathname === "/"
                ? scrollToHope()
                : (window.location.href = "/#hope")
            }
          >
            Requests
          </li>

          <li
            onClick={() =>
              location.pathname === "/"
                ? scrollToMission()
                : (window.location.href = "/#mission")
            }
          >
            Our Mission
          </li>

          {!token && (
            <li className="md:hidden">
              <Link to="/auth">
                <button className="border border-red-500 px-4 py-2 rounded">
                  Login
                </button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
