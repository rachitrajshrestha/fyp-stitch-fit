import "../style/Navbar.css";
import dark_search_icon from "../assets/search-w.png";
import light_search_icon from "../assets/search-b.png";
import logo_dark from "../assets/stitch_fit_white_logo.png";
import logo_light from "../assets/stitch_fit_black_logo.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className="navbar">
      <img
        src={theme == "light" ? logo_light : logo_dark}
        alt="Logo"
        className="logo"
      />
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>
      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img
          src={theme == "light" ? dark_search_icon : light_search_icon}
          alt="Search Icon"
        />
      </div>
      <img
        onClick={toggle_mode}
        src={theme == "light" ? toggle_light : toggle_dark}
        alt=""
        className="theme-toggle"
      />
    </div>
  );
};

export default Navbar;
