import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const featuredProperties = [
  {
    id: 1,
    projectName: "Green Valley Residency",
    image1:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",
    image2: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800",
    area: "Thane West",
    propertyTypes: ["1 RK", "1 BHK", "2 BHK"],
  },
  {
    id: 2,
    projectName: "Skyline Heights",
    image1:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1600",
    image2:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    area: "Powai",
    propertyTypes: ["2 BHK", "3 BHK"],
  },
  {
    id: 3,
    projectName: "Ocean Pearl",
    image1:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1600",
    image2:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800",
    area: "Nerul",
    propertyTypes: ["3 BHK", "4 BHK", "Terrace Flats"],
  },
];

export default function Hero1() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredProperties.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {featuredProperties.map((property, index) => (
        <div
          key={property.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={property.image1}
            className="w-full h-full object-cover"
            alt={property.projectName}
          />

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Text overlay */}
          <div className="absolute bottom-10 left-10 text-white z-10 max-w-xl">
            <h2 className="text-4xl font-bold mb-2">{property.projectName}</h2>
            <p className="text-lg mb-1">
              <strong>Area:</strong> {property.area}
            </p>
            <p className="text-lg mb-3">
              <strong>Property Types:</strong>{" "}
              {property.propertyTypes.join(", ")}
            </p>

            <div className="flex gap-3">
              <img
                src={property.image1}
                className="w-24 h-16 object-cover rounded border border-white/30"
              />
              <img
                src={property.image2}
                className="w-24 h-16 object-cover rounded border border-white/30"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={() =>
          setCurrent(
            (current - 1 + featuredProperties.length) %
              featuredProperties.length
          )
        }
        className="absolute top-1/2 left-6 z-20 p-3 bg-black/40 text-white rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => setCurrent((current + 1) % featuredProperties.length)}
        className="absolute top-1/2 right-6 z-20 p-3 bg-black/40 text-white rounded-full"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
