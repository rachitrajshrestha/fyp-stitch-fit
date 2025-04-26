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
import cartIcon from "../assets/basket-cart-icon-27.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
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
          setUser(res.data.user);
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

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handlelogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div className={`navbar ${theme === "dark" ? "dark" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <img
            onClick={handlelogoClick}
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
            <Link to="/measurements">Measurements</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
        </ul>

        <div className="navbar-right">
          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <img
                src={theme === "light" ? dark_search_icon : light_search_icon}
                alt="Search Icon"
              />
            </button>
          </form>
          {/* <img
            onClick={toggle_mode}
            src={theme === "light" ? toggle_light : toggle_dark}
            alt="Theme toggle"
            className="theme-toggle"
          /> */}
          <img
            onClick={handleCartClick}
            src={cartIcon}
            alt="cart"
            className="theme-toggle"
          />
          <div className="profile-box">
            {user ? (
              <div className="dropdown" onClick={toggleDropdown}>
                <div className="profile-display">
                  <img
                    src={profile_icon}
                    alt="Profile"
                    className="profile-icon"
                  />
                  <span className="username">{user.username}</span>
                </div>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link to="/orders" className="dropdown-item">
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item logout-btn"
                    >
                      Logout
                    </button>
                  </div>
                )}
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
