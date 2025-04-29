import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import banner1 from "../assets/stitchandfit/about/aboutbanner.jpg";
import banner2 from "../assets/stitchandfit/about/about2.webp";
import Character1 from "../assets/stitchandfit/Character/character1.jpg";
import Character2 from "../assets/stitchandfit/Character/character2.jpg";
import Character3 from "../assets/stitchandfit/Character/character3.jpg";

export default function About() {
  return (
    <>
      <Navbar
        theme={"light"}
        setTheme={function (theme: "light" | "dark"): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">About Us</h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              We're a team of passionate individuals dedicated to creating
              exceptional experiences and delivering innovative solutions.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="mb-4">
                  Stitch and Fit stands up as an innovative platform that gives
                  customers the freedom to build their own style. Our proposal
                  is a perfect blend of technology and creativity, providing an
                  interactive solution in which customers can browse a wide
                  selection of styles, select the best suit for their needs, and
                  even personalize costumes with their own unique ideas. Stitch
                  and Fit's easy interface allows consumers to easily provide
                  their measurements, guaranteeing that each piece is fitted to
                  perfection. This platform not only updates the way people
                  shop, but also promotes uniqueness and acceptance by
                  responding to a variety of body measurements and fashionable
                  preferences.
                </p>
                <p>
                  Today, we continue to push boundaries and explore new
                  possibilities, always keeping our core values of integrity,
                  excellence, and customer satisfaction at the heart of
                  everything we do.
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img
                  src={banner2}
                  alt="Our company story"
                  className="object-cover"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
            <div className="bg-gray-100 p-8 rounded-lg">
              <p className="text-xl text-center italic">
                "To empower businesses and individuals through innovative
                technology solutions that solve real-world problems and create
                meaningful impact."
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p>
                  We constantly seek new ideas and approaches, pushing the
                  boundaries of what's possible to deliver cutting-edge
                  solutions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                <p>
                  We conduct our business with honesty, transparency, and
                  ethical standards that earn the trust of our clients and
                  partners.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p>
                  We strive for excellence in everything we do, maintaining the
                  highest standards of quality and professionalism.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "CEO & Founder",
                  img: Character1,
                },
                {
                  name: "Sam Rivera",
                  role: "CTO",
                  img: Character2,
                },
                {
                  name: "Taylor Chen",
                  role: "Design Director",
                  img: Character3,
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={member.img || "/placeholder.svg"}
                      alt={member.name}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
