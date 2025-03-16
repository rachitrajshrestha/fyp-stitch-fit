import { useEffect, useState } from "react";
import NavBar from "../component/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../component/Card";
import Footer from "../component/Footer";

const Home = () => {
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:8081/auth/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 201) {
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const [theme, setTheme] = useState<"light" | "dark">("light"); // Import useState if needed

  return (
    <div>
      <NavBar theme={theme} setTheme={setTheme} />
      <Card></Card>
      {/* <Footer></Footer> */}
      <div>Home</div>
    </div>
  );
};

export default Home;
