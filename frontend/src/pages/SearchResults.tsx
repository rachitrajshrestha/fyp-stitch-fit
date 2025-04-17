import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import ProductFilters from "../component/product-filter";

interface Product {
  category: string;
  imageUrl: string;
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isNew?: boolean;
  oldPrice?: number;
}

const SearchResults = () => {
  const [results, setResults] = useState<Product[]>([]);
  const { search } = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 10000],
    sortBy: "default",
  });

  const query = new URLSearchParams(search).get("q");

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:8081/search/products?q=${query}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.error("Search failed", err));
    }
  }, [query]);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (filters.category) {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Sort products
    if (filters.sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <main className="min-h-screen">
      <Navbar
        theme={"light"}
        setTheme={function (theme: "light" | "dark"): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="relative w-full h-[400px] overflow-hidden">
        <img
          src="/hero-banner.jpg"
          alt="Shop the latest collection"
          className="object-cover absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Summer Collection 2024
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
            Discover our latest arrivals with styles perfect for the season
          </p>
          <button className="bg-white text-black font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl mb-6">Search Results for "{query}"</h2>
          <h1 className="text-3xl font-bold mb-8">Our Products</h1>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                categories={Array.from(
                  new Set(products.map((p) => p.category))
                )}
              />
            </div>

            <div className="container mx-auto px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.length > 0 ? (
                results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="block"
                  >
                    <div className="rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg border border-gray-200">
                      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                        <img
                          src={`http://localhost:8081/${product.imageUrl}`}
                          alt={product.name}
                          className="object-cover transition-transform duration-300 hover:scale-110 w-full h-full"
                        />
                        {product.isNew && (
                          <span className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 line-clamp-1">
                          {product.name}
                        </h2>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                          {product.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">
                            Rs {product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No results found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SearchResults;
