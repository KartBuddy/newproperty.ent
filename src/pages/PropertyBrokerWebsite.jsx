import React, { useState, useEffect } from "react";
import {
  Search,
  Home,
  Building2,
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Mail,
  Award,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { properties } from "../components/properties";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import PropertiesSection from "../components/PropertiesSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";

const PropertyBrokerWebsite = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const properties = [
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
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
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
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Retail Shop in Prime Location",
      type: "rent",
      category: "commercial",
      price: "₹1,20,000/month",
      location: "Naupada, Thane",
      bedrooms: 0,
      bathrooms: 1,
      area: "1200 sq ft",
      image:
        "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Spacious 2BHK Flat",
      type: "rent",
      category: "residential",
      price: "₹28,000/month",
      location: "Vartak Nagar, Thane",
      bedrooms: 2,
      bathrooms: 2,
      area: "1100 sq ft",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title: "Premium Penthouse",
      type: "sale",
      category: "residential",
      price: "₹4.2 Cr",
      location: "Hiranandani Estate, Thane",
      bedrooms: 5,
      bathrooms: 4,
      area: "3500 sq ft",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    },
  ];
  const [propertyList, setPropertyList] = useState(properties);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newProperty, setNewProperty] = useState({
    title: "",
    type: "sale",
    category: "residential",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    image: "",
  });

  const heroImages = [
    "https://images.unsplash.com/photo-1600106485793-d463d45905bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY3fHxpbmRpYSUyMGhvdXNlfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600",
    "https://images.unsplash.com/photo-1572120360610-d971b9b78825?w=1600",
  ];

  const [currentHero, setCurrentHero] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const filteredProperties = propertyList.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || property.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thank you ${formData.name}! We have received your property inquiry and will contact you soon.`
    );
    setShowPropertyForm(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      propertyType: "residential",
      transactionType: "sale",
      location: "",
      budget: "",
      message: "",
    });
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar
        {...{
          activeSection,
          handleNavClick,
          mobileMenuOpen,
          setMobileMenuOpen,
        }}
      />

      {/* Hero Section */}
      <Hero
        {...{
          activeSection,
          heroImages,
          currentHero,
          handleNavClick,
          setShowAddForm,
        }}
      />
      {/* Properties Section */}
      <PropertiesSection
        {...{
          activeSection,
          searchTerm,
          setSearchTerm,
          filterType,
          setFilterType,
          filteredProperties,
          navigate,
        }}
      />

      {/* About Us Section */}
      <AboutSection activeSection={activeSection} />
      {/* Contact Section */}
      <ContactSection activeSection={activeSection} />

      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-xl">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedProperty.title}
            </h3>

            <p className="text-gray-600 mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {selectedProperty.location}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              {selectedProperty.bedrooms > 0 && (
                <p>🛏 {selectedProperty.bedrooms} Bedrooms</p>
              )}
              <p>🛁 {selectedProperty.bathrooms} Bathrooms</p>
              <p>📐 {selectedProperty.area}</p>
              <p>💰 {selectedProperty.price}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedProperty(null)}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-xl relative">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-3 right-3 text-white-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Add New Property
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Property Title"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={newProperty.title}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, title: e.target.value })
                }
              />

              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={newProperty.type}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, type: e.target.value })
                }
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>

              <input
                type="text"
                placeholder="Price (e.g. ₹50,000/month or ₹2 Cr)"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={newProperty.price}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, price: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Location"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={newProperty.location}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, location: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Bedrooms"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={newProperty.bedrooms}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, bedrooms: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Bathrooms"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={newProperty.bathrooms}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, bathrooms: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Area (sq ft)"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                value={newProperty.area}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, area: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Image URL"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 sm:col-span-2"
                value={newProperty.image}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, image: e.target.value })
                }
              />
            </div>

            <button
              onClick={() => {
                if (
                  !newProperty.title ||
                  !newProperty.price ||
                  !newProperty.location
                ) {
                  alert("Please fill all required fields.");
                  return;
                }

                setPropertyList([
                  ...propertyList,
                  { ...newProperty, id: Date.now() },
                ]);
                setNewProperty({
                  title: "",
                  type: "sale",
                  category: "residential",
                  price: "",
                  location: "",
                  bedrooms: "",
                  bathrooms: "",
                  area: "",
                  image: "",
                });
                setShowAddForm(false);
              }}
              className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Save Property
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 lg:py-10 mt-12 lg:mt-16 w-full">
        <div className="w-full max-w-full px-6 lg:px-12 xl:px-16 2xl:px-24 text-center">
          <p className="text-sm sm:text-base text-gray-300">
            © 2025 Elite Properties. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            15 Years of Trusted Real Estate Services
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PropertyBrokerWebsite;
