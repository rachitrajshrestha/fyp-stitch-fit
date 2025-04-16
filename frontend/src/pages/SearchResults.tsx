import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchResults = () => {
  const [results, setResults] = useState<any[]>([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:8081/products/search?q=${query}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.error("Search failed", err));
    }
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
