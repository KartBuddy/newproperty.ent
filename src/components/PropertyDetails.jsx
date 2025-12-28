import { useParams, useNavigate } from "react-router-dom";
import { properties } from "../components/properties";
import { MapPin, Bed, Bath, Square, Phone, Home } from "lucide-react";
import { useEffect } from "react";
import { Heart } from "lucide-react";
import { useState } from "react";
import Navbar from "./NavBar";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === Number(id));

  if (!property) return <div className="p-10">Property not found</div>;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const preferredAgents = [
    {
      id: 1,
      name: "Kamal Bhattar",
      company: "Shree Balaji Properties",
      since: 2011,
      buyers: "2500+",
      sale: 12,
      rent: 15,
      image: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 2,
      name: "Desai Rakesh",
      company: "Tejasvi Realty Pvt. Ltd.",
      since: 1992,
      buyers: "4500+",
      sale: 129,
      rent: 54,
      image: "https://i.pravatar.cc/100?img=32",
    },
    {
      id: 3,
      name: "Arun Jain",
      company: "Bhavya Bhairav Real Estate",
      since: 1994,
      buyers: "2500+",
      sale: 29,
      rent: 21,
      image: "https://i.pravatar.cc/100?img=48",
    },
  ];

  const loanOffers = [
    {
      id: 1,
      bank: "State Bank of India",
      rate: "8.5%",
      amount: "₹50L",
      tenure: "30 Yr",
      emi: "₹38.4K",
      reward: "₹10,000 Cash Reward",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg",
    },
    {
      id: 2,
      bank: "Bank of Maharashtra",
      rate: "8.3%",
      amount: "₹1Cr",
      tenure: "30 Yr",
      emi: "₹75.5K",
      reward: "₹20,000 Cash Reward",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bank_of_Maharashtra_logo.svg",
    },
    {
      id: 3,
      bank: "Bank of Baroda",
      rate: "8.4%",
      amount: "₹70L",
      tenure: "30 Yr",
      emi: "₹53.3K",
      reward: "₹14,000 Cash Reward",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/55/Bank_of_Baroda_logo.svg",
    },
  ];
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Property Heading */}
        <div className="bg-white text-black rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" /> {property.location}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              For {property.type}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {property.category}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow overflow-hidden">
            {/* <img
              src={property.image}
              className="w-full h-[420px] object-cover"
            /> */}
            <div className="relative">
              <img
                src={property.image}
                className="w-full h-[420px] object-cover"
              />

              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow hover:scale-105 transition"
              >
                <Heart
                  className={`w-6 h-6 transition ${
                    liked ? "text-red-500" : "text-gray-500"
                  }`}
                  fill={liked ? "currentColor" : "none"}
                  strokeWidth={liked ? 2.5 : 2}
                />
              </button>
            </div>

            <div className="p-6">
              {/* Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-gray-700">
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5" /> {property.bedrooms} Beds
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5" /> {property.bathrooms} Baths
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5" /> {property.area}
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5" /> {property.category}
                </div>
              </div>

              {/* Price */}
              <p className="text-2xl font-bold text-blue-600 mb-6">
                {property.price}
              </p>

              {/* More Features */}
              <h2 className="text-xl text-black font-bold mb-4">
                More Features
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-6">
                <p>
                  <strong>Transaction:</strong> {property.type}
                </p>
                <p>
                  <strong>Category:</strong> {property.category}
                </p>
                <p>
                  <strong>Bedrooms:</strong> {property.bedrooms}
                </p>
                <p>
                  <strong>Bathrooms:</strong> {property.bathrooms}
                </p>
                <p>
                  <strong>Area:</strong> {property.area}
                </p>
                <p>
                  <strong>Location:</strong> {property.location}
                </p>
              </div>

              {/* Other Properties Section */}
              <div className="mt-12 text-black">
                <h2 className="text-2xl font-bold mb-6">
                  Other Properties in this Project and Nearby
                </h2>

                <div className="relative">
                  <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                    {properties
                      .filter((p) => p.id !== property.id)
                      .slice(0, 6)
                      .map((p) => (
                        <div
                          key={p.id}
                          className="min-w-[280px] bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                          onClick={() => navigate(`/property/${p.id}`)}
                        >
                          <img
                            src={p.image}
                            className="w-full h-44 object-cover rounded-t-xl"
                          />

                          <div className="p-4 space-y-1">
                            <p className="font-semibold">{p.title}</p>
                            <p className="text-blue-600 font-bold">{p.price}</p>
                            <p className="text-sm text-gray-500">
                              {p.location}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-white text-black rounded-xl shadow p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Contact Owner</h3>
            <p className="font-semibold">Raj Ojha</p>
            <p className="text-gray-500 mb-4">+91-87XXXXXXXX</p>

            <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Get Phone No.
            </button>
            {/* MB prefer */}
            <div className="mt-6">
              <h4 className="text-lg font-bold mb-4">MB Preferred Agents</h4>

              <div className="space-y-4">
                {preferredAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="border rounded-lg p-3 flex gap-3 items-start hover:shadow transition"
                  >
                    <img
                      src={agent.image}
                      className="w-12 h-12 rounded-full object-cover border"
                    />

                    <div className="flex-1">
                      <p className="font-semibold">{agent.name}</p>
                      <p className="text-xs text-gray-500">{agent.company}</p>

                      <div className="flex justify-between text-xs mt-2 text-gray-600">
                        <span>{agent.sale} Sale</span>
                        <span>{agent.rent} Rent</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Home Loan */}
            <div className="mt-8">
              <h4 className="text-lg font-bold mb-4">Home Loan Offers</h4>

              <div className="space-y-4">
                {loanOffers.map((loan) => (
                  <div
                    key={loan.id}
                    className="border rounded-lg p-4 hover:shadow transition space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <img src={loan.logo} className="w-8 h-8 object-contain" />
                      <p className="font-semibold">{loan.bank}</p>
                    </div>

                    <div className="grid grid-cols-2 text-xs text-gray-600 gap-y-1">
                      <p>
                        <strong>{loan.rate}</strong> Interest
                      </p>
                      <p>
                        <strong>{loan.amount}</strong> Amount
                      </p>
                      <p>
                        <strong>{loan.tenure}</strong> Tenure
                      </p>
                      <p>
                        <strong>{loan.emi}</strong> EMI
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-red-600 text-xs font-semibold">
                        {loan.reward}
                      </span>
                      <button className="bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700">
                        Claim
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
