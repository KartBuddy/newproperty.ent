import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Bed, Bath, Square } from "lucide-react";

const dummyProperties = [
  {
    id: 1,
    title: "Luxury Villa in Thane West",
    type: "sale",
    category: "residential",
    price: "₹2.5 Cr",
    location: "Thane West, Maharashtra",
    bedrooms: 4,
    bathrooms: 3,
    area: "2400 sq ft",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
  },
  {
    id: 2,
    title: "Commercial Office Space",
    type: "rent",
    category: "commercial",
    price: "₹85,000/month",
    location: "Ghodbunder Road, Thane",
    bedrooms: 0,
    bathrooms: 2,
    area: "1800 sq ft",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
  },
  {
    id: 3,
    title: "Modern 3BHK Apartment",
    type: "sale",
    category: "residential",
    price: "₹1.8 Cr",
    location: "Majiwada, Thane",
    bedrooms: 3,
    bathrooms: 2,
    area: "1650 sq ft",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = dummyProperties.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Property not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-white-600 font-semibold hover:underline"
        >
          ← Back to Properties
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[420px] object-cover"
          />

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-3">{property.title}</h1>

            <p className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              {property.location}
            </p>

            <div className="flex gap-6 text-gray-700 mb-6">
              {property.bedrooms > 0 && (
                <div className="flex items-center">
                  <Bed className="w-5 h-5 mr-1" /> {property.bedrooms} Beds
                </div>
              )}
              <div className="flex items-center">
                <Bath className="w-5 h-5 mr-1" /> {property.bathrooms} Baths
              </div>
              <div className="flex items-center">
                <Square className="w-5 h-5 mr-1" /> {property.area}
              </div>
            </div>

            <div className="text-2xl font-bold text-blue-600 mb-6">
              {property.price}
            </div>

            <p className="text-gray-600 leading-relaxed">
              This is a premium {property.category} property available for{" "}
              {property.type}. Located in {property.location}, this property
              offers excellent connectivity, modern amenities, and a great
              investment opportunity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
