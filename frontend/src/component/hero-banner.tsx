export default function HeroBanner() {
  return (
    <div className="relative bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
        }}
      ></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Summer Collection 2025
          </h1>
          <p className="text-xl mb-8">
            Discover our latest arrivals with styles perfect for the season.
            Limited time offers available now.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/product"
              className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Shop Now
            </a>
            <a
              href="/"
              className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              View Categories
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
