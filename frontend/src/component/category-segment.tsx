import categoryBlouse from "../assets/stitchandfit/blouse10.jpg";
import categoryParty from "../assets/stitchandfit/dress4.jpg";
import categoryFormal from "../assets/stitchandfit/formals0.jpg";
import categoryCasual from "../assets/stitchandfit/dress5.jpg";
import categoryOccasion from "../assets/stitchandfit/lehenga0.jpg";
import categoryFabrics from "../assets/stitchandfit/blouse10.jpg";
import { Link } from "react-router-dom";

interface Category {
  name: string;
  img: string;
  slug: string;
}

export default function CategorySegment() {
  const categories: Category[] = [
    { name: "Blouses", img: categoryBlouse, slug: "blouses" },
    { name: "Party", img: categoryParty, slug: "party" },
    { name: "Formal", img: categoryFormal, slug: "formal" },
    { name: "Casual", img: categoryCasual, slug: "casual" },
    { name: "Occasion", img: categoryOccasion, slug: "occasion" },
    { name: "Fabrics", img: categoryFabrics, slug: "fabrics" },
  ];

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex justify-center min-w-max gap-4 md:gap-8">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/search?q=${category.slug}`}
            className="flex flex-col items-center group"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-rose-500 transition-all duration-300">
              <img
                src={category.img || "/placeholder.svg"}
                alt={category.name}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-2 text-sm md:text-base font-medium text-center text-gray-800">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
