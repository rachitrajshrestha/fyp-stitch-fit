import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategorySegment from "../component/category-segment";
import FeaturedSection from "../component/featured-section";
import Footer from "../component/Footer";
import HeroBanner from "../component/hero-banner";
import HowToMeasure from "../component/how-to-measure";
import ImageSlider from "../component/image-slider";
import NavBar from "../component/Navbar";
import ProductDescriptionHeader from "../component/product-description-header";
import heroBanner1 from "../assets/stitchandfit/HeroBanner/hero banner.jpg";

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
    <main className="min-h-screen flex flex-col">
      <NavBar
        theme={"light"}
        setTheme={function (theme: "light" | "dark"): void {
          throw new Error("Function not implemented.");
        }}
      />
      <HeroBanner />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <CategorySegment />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <HowToMeasure />
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <FeaturedSection />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Collections
          </h2>
          {/* <ImageSlider images={[]} /> */}
          <div className="relative bg-gray-900 text-white">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{
                backgroundImage:
                  "url('/placeholder.svg?height=600&width=1200')",
              }}
            ></div>
            <div className="w-full relative">
              <img
                src={heroBanner1}
                alt="Traditional clothing"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
        <ProductDescriptionHeader />
      </section>

      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>
          <ProductList />
        </div>
      </section> */}

      <Footer />
    </main>
  );
};

export default Home;
