import { Search, MapPin, Bed, Bath, Square } from "lucide-react";

const PropertiesSection = ({
  activeSection,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filteredProperties,
  navigate,
}) => {
  if (!(activeSection === "properties" || activeSection === "home"))
    return null;

  return (
    <div className="w-full max-w-full px-6 lg:px-12 xl:px-16 2xl:px-24 py-12 lg:py-16">
      <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-800 mb-6 lg:mb-10">
        Available Properties
      </h2>

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
          {["all", "sale", "rent"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium whitespace-nowrap text-sm sm:text-base ${
                filterType === t
                  ? "bg-blue-600 text-white"
                  : "bg-white text-white-700 border border-gray-300"
              }`}
            >
              {t === "all" ? "All" : t === "sale" ? "For Sale" : "For Rent"}
            </button>
          ))}
        </div>
      </div>

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
                  property.type === "sale" ? "bg-green-500" : "bg-purple-500"
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
                  <span className="text-xs sm:text-sm">{property.area}</span>
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
    </div>
  );
};

export default PropertiesSection;
