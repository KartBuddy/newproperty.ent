import React, { useState } from "react";
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
      <header className="bg-white shadow-md sticky top-0 z-50 w-full">
        <div className="w-full max-w-full px-6 lg:px-12 xl:px-16 2xl:px-24 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                New Property Enterprises
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              {[
                { key: "home", label: "Home" },
                { key: "properties", label: "Property" },
                { key: "about", label: "About Us" },
                { key: "contact", label: "Contact Us" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm lg:text-base transition whitespace-nowrap ${
                    activeSection === item.key
                      ? "bg-black text-white shadow-md"
                      : "bg-gray-900 text-white hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden bg-gray-900 text-white p-2 rounded-xl"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2">
              {[
                { key: "home", label: "Home" },
                { key: "properties", label: "Property" },
                { key: "about", label: "About Us" },
                { key: "contact", label: "Contact Us" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`block w-full text-left px-5 py-3 rounded-xl font-semibold transition ${
                    activeSection === item.key
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      {activeSection === "home" && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 lg:py-28 xl:py-32 w-full">
          <div className="w-full max-w-full px-6 lg:px-12 xl:px-16 2xl:px-24 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-6">
              Find Your Dream Property
            </h2>
            <p className="text-base sm:text-lg lg:text-2xl xl:text-3xl mb-8 lg:mb-10">
              Residential & Commercial Properties for Sale and Rent
            </p>
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => handleNavClick("properties")}
                className="bg-white text-white-600 px-8 lg:px-12 py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-base lg:text-lg xl:text-xl"
              >
                Browse Properties
              </button>

              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-green-700 transition text-base lg:text-lg"
              >
                + Add Property
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Properties Section */}
      {(activeSection === "properties" || activeSection === "home") && (
        <div className="w-full max-w-full px-6 lg:px-12 xl:px-16 2xl:px-24 py-12 lg:py-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-800 mb-6 lg:mb-10">
            Available Properties
          </h2>

          {/* Search and Filter */}
          <div className="mb-6 lg:mb-8 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by location or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium whitespace-nowrap text-sm sm:text-base ${
                  filterType === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-white-700 border border-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("sale")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium whitespace-nowrap text-sm sm:text-base ${
                  filterType === "sale"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-white-700 border border-gray-300"
                }`}
              >
                For Sale
              </button>
              <button
                onClick={() => setFilterType("rent")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium whitespace-nowrap text-sm sm:text-base ${
                  filterType === "rent"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-white-700 border border-gray-300"
                }`}
              >
                For Rent
              </button>
            </div>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition flex flex-col h-full"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 sm:h-52 lg:h-60 xl:h-64 object-cover"
                  />

                  <span
                    className={`absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold ${
                      property.type === "sale"
                        ? "bg-green-500"
                        : "bg-purple-500"
                    }`}
                  >
                    For {property.type === "sale" ? "Sale" : "Rent"}
                  </span>
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate">
                      {property.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4 text-xs sm:text-sm text-gray-600">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="text-xs sm:text-sm">
                        {property.area}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-xl font-bold text-blue-600 truncate max-w-[55%]">
                      {property.price}
                    </span>

                    <button
                      onClick={() => navigate(`/property/${property.id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base sm:text-lg">
                No properties found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      )}

      {/* About Us Section */}

      {/* About Us Section */}
      {activeSection === "about" && (
        <div className="w-full max-w-full px-6 lg:px-12 xl:px-16 2xl:px-24 py-8 lg:py-20">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-8 lg:mb-12">
              About Us
            </h2>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
              <div>
                <div className="flex items-center mb-4 lg:mb-6">
                  <Award className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                      15 Years of Excellence
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Trusted Property Broker
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                  Welcome to our property brokerage firm! With 15 years of
                  dedicated experience in the real estate industry, I have built
                  a reputation as a trusted property broker specializing in both
                  sales and rentals across residential and commercial sectors.
                </p>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                  Over the past 15 years, I have successfully facilitated
                  hundreds of property transactions, helping families find their
                  dream homes and businesses secure ideal commercial spaces. My
                  expertise covers the entire spectrum of real estate - from
                  luxury villas and apartments to office spaces, retail shops,
                  and industrial properties.
                </p>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                  Whether you're looking to buy, sell, or rent residential
                  properties like flats, bungalows, and penthouses, or
                  commercial spaces such as offices, shops, and warehouses, my
                  extensive market knowledge and strong network ensure you get
                  the best deals at competitive prices.
                </p>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  My 15 years of experience have taught me that every client has
                  unique requirements. I pride myself on providing personalized
                  service, honest advice, and complete transparency throughout
                  the property transaction process. Your satisfaction and trust
                  are my top priorities. Let's work together to find the perfect
                  property that meets your needs and budget.
                </p>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                    Our Services
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700">
                    <li>✓ Residential Property Sales</li>
                    <li>✓ Commercial Property Sales</li>
                    <li>✓ Residential Rentals</li>
                    <li>✓ Commercial Rentals</li>
                    <li>✓ Property Management</li>
                    <li>✓ Investment Consultation</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                    Why Choose Us
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700">
                    <li>✓ 15+ Years Experience</li>
                    <li>✓ 500+ Happy Clients</li>
                    <li>✓ Local Market Expertise</li>
                    <li>✓ Transparent Dealings</li>
                    <li>✓ End-to-End Support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Our Team Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12 mt-8 lg:mt-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 lg:mb-12 text-center">
              Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Team Member 1 */}
              <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 text-center hover:shadow-lg transition">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl text-white font-bold">
                    RK
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Rajesh Kumar
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  Founder & CEO
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  With 15+ years in real estate, Rajesh leads our team with
                  expertise in luxury properties and commercial spaces.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-gradient-to-b from-green-50 to-white rounded-xl p-6 text-center hover:shadow-lg transition">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl text-white font-bold">
                    PS
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Priya Sharma
                </h3>
                <p className="text-green-600 font-semibold mb-3">
                  Sales Manager
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  Priya specializes in residential properties and has helped
                  over 200 families find their dream homes.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-gradient-to-b from-purple-50 to-white rounded-xl p-6 text-center hover:shadow-lg transition">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl text-white font-bold">
                    AM
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Amit Mehta
                </h3>
                <p className="text-purple-600 font-semibold mb-3">
                  Rental Specialist
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  Amit handles all rental properties with a focus on matching
                  clients with perfect rental solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      {activeSection === "contact" && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-8 lg:mb-12 text-center">
              Contact Us
            </h2>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Get in Touch
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Have questions? We're here to help you find the perfect
                  property.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-gray-800">
                        Phone
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-gray-800">
                        Email
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        info@eliteproperties.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-gray-800">
                        Address
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        Thane, Maharashtra, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  ></textarea>
                  <button
                    onClick={() =>
                      alert("Thank you! We will contact you soon.")
                    }
                    className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
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
