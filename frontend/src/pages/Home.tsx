import { useEffect, useState } from "react";
import NavBar from "../component/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Card from "../component/Card";

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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div>
      <NavBar theme={theme} setTheme={setTheme} />
      {/* <Card></Card> */}
      {/* <ProductCard></ProductCard> */}
      {/* <Footer></Footer> */}

      {/* <Slider slides={[]}></Slider> */}
      <Card></Card>
      <Footer></Footer>
    </div>
  );
};

export default Home;
