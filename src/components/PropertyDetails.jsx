import { useParams, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const dummyProperties = [
  {
    id: 1,
    title: "1600 Sq-ft 4 BHK Flat For Sale in JVPD Scheme, Mumbai",
    location: "JVPD Scheme, Mumbai",
    price: "₹8.25 Cr",
    emi: "₹2.86L",
    area: "1600 sqft",
    floor: "4 (Out of 6 Floors)",
    transaction: "Resale",
    status: "Ready to Move",
    facing: "North",
    furnished: "Furnished",
    age: "Above 20 years",
    additional: "1 Servant Room",
    owner: "Sandeep",
    phone: "+91-90XXXXXXXX",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    ],
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = dummyProperties.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold mb-2">Property Not Found</h1>
        <p className="text-gray-600 mb-4">
          The property you are looking for does not exist or was removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 font-medium"
          >
            ← Back
          </button>
          <span className="text-gray-600 text-sm">Property ID: 80895335</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price & Title */}
          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <h1 className="text-2xl font-bold">{property.price}</h1>
              <span className="text-gray-600">EMI - {property.emi}</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                PREMIUM LOCALITY
              </span>
            </div>
            <h2 className="text-lg font-medium">{property.title}</h2>
            <p className="text-gray-600 flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1 text-blue-600" />
              {property.location}
            </p>
          </div>

          {/* Image Gallery */}
          <div className="bg-white rounded-xl shadow p-4 grid grid-cols-4 gap-2">
            <img
              src={property.images[0]}
              className="col-span-4 md:col-span-2 row-span-2 h-72 w-full object-cover rounded-lg"
            />
            {property.images.slice(1, 5).map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-36 w-full object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Key Info */}
          <div className="bg-white rounded-xl shadow p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Info label="Super Built-Up Area" value={property.area} />
            <Info label="Floor" value={property.floor} />
            <Info label="Transaction Type" value={property.transaction} />
            <Info label="Status" value={property.status} />
            <Info label="Additional Rooms" value={property.additional} />
            <Info label="Facing" value={property.facing} />
            <Info label="Furnished Status" value={property.furnished} />
            <Info label="Age Of Construction" value={property.age} />
          </div>

          {/* More Details */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-xl font-semibold mb-4">More Details</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <strong>Price Breakup:</strong> ₹8.25 Cr | ₹41,25,000
                Registration
              </p>
              <p>
                <strong>Address:</strong> JVPD Scheme, Western Mumbai,
                Maharashtra
              </p>
              <p>
                <strong>Furnishing:</strong> {property.furnished}
              </p>
              <p>
                <strong>Description:</strong> Multistorey apartment is available
                for sale in a good locality.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow p-5 sticky top-24">
            <h3 className="text-lg font-semibold mb-2">Contact Owner</h3>
            <p className="font-medium">{property.owner}</p>
            <p className="text-gray-500 text-sm mb-4">{property.phone}</p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full font-semibold">
              Get Phone No.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-xs">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default PropertyDetails;
