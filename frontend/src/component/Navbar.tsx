"use client";

import type React from "react";

import { useEffect, useState } from "react";
import "../style/Navbar.css";
import dark_search_icon from "../assets/search-w.png";
import light_search_icon from "../assets/search-b.png";
import logo_dark from "../assets/stitch_fit_white_logo.png";
import logo_light from "../assets/stitch_fit_black_logo.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";
import profile_icon from "../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:8081/auth/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.user); // 👈 Set user info here
        })
        .catch((err) => {
          console.error("Failed to fetch user", err);
          setUser(null);
        });
    }
  }, []);

  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className={`navbar ${theme === "dark" ? "dark" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <img
            src={theme === "light" ? logo_light : logo_dark}
            alt="Logo"
            className="logo"
          />
          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={menuOpen ? "active" : ""}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product">Products</Link>
          </li>
          <li>
            <Link to="/">Design</Link>
          </li>
          <li>
            <Link to="/">Measurements</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Contact us</Link>
          </li>
        </ul>

        <div className="navbar-right">
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <img
              src={theme === "light" ? dark_search_icon : light_search_icon}
              alt="Search Icon"
            />
          </div>
          <img
            onClick={toggle_mode}
            src={theme === "light" ? toggle_light : toggle_dark}
            alt="Theme toggle"
            className="theme-toggle"
          />
          <div className="profile-box">
            {user ? (
              <div className="dropdown">
                <img
                  src={profile_icon}
                  alt="Profile"
                  className="profile-icon"
                />
                <div className="dropdown-content">
                  <span>{user.username}</span>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-link">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
