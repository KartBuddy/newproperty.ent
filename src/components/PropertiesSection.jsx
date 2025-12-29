import { Search, MapPin, Bed, Bath, Square, ArrowRight, SlidersHorizontal } from "lucide-react";

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
    <section className="bg-slate-50 py-24" id="properties">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-900 tracking-tight mb-4">
              Explore Our <span className="text-brand-500">Premium</span> Collections
            </h2>
            <p className="text-slate-600 font-medium text-lg">
              Browse through a curated selection of residential and commercial properties verified by our experts.
            </p>
          </div>

          <button className="hidden md:flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors">
            View All Listings
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 p-2 mb-16 max-w-5xl mx-auto overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-2">
            {/* Tabs */}
            <div className="flex bg-slate-50 p-1.5 rounded-[2rem] w-full lg:w-auto min-w-[320px]">
              {[
                { id: "all", label: "All Properties" },
                { id: "sale", label: "Buy a Home" },
                { id: "rent", label: "Rentals" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`flex-1 px-6 py-4 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all duration-300 relative overflow-hidden ${filterType === tab.id
                    ? "bg-white text-brand-900 shadow-xl shadow-brand-900/5 ring-1 ring-slate-100 scale-[1.02]"
                    : "text-slate-400 hover:text-brand-600"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="hidden lg:block w-px h-10 bg-slate-100 mx-4"></div>

            {/* Search */}
            <div className="flex-1 w-full relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-brand-500" />
              <input
                type="text"
                placeholder="Search by neighborhood, building or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-5 bg-transparent border-none focus:ring-0 text-brand-900 font-bold placeholder:text-slate-300 placeholder:font-medium"
              />
            </div>

            {/* Filter Toggle */}
            <button className="hidden lg:flex items-center gap-2 bg-brand-900 text-white px-8 py-5 rounded-[1.8rem] font-black uppercase tracking-widest hover:bg-brand-800 transition-all active:scale-95 shadow-xl shadow-brand-900/10 text-xs">
              <SlidersHorizontal className="w-4 h-4" />
              Extended Filters
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-full text-white text-[10px] uppercase font-black tracking-widest ${property.type === "sale" ? "bg-emerald-500" : "bg-indigo-500"
                    }`}>
                    For {property.type}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <button
                    onClick={() => navigate(`/property/${property._id}`)}
                    className="w-full bg-white text-brand-900 py-3 rounded-xl font-bold text-sm shadow-xl"
                  >
                    View Property
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-extrabold text-brand-900 leading-tight flex-1">
                    {property.title}
                  </h3>
                </div>

                <div className="flex items-center text-slate-500 mb-6 font-medium text-sm">
                  <MapPin className="w-4 h-4 mr-1.5 text-brand-500" />
                  <span className="truncate">{property.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-slate-50">
                  {property.bedrooms > 0 && (
                    <div className="flex flex-col items-center gap-1">
                      <Bed className="w-5 h-5 text-slate-400 group-hover:text-brand-500 transition-colors" />
                      <span className="text-[10px] font-black text-slate-800 uppercase leading-none mt-1">{property.bedrooms} Beds</span>
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-1">
                    <Bath className="w-5 h-5 text-slate-400 group-hover:text-brand-500 transition-colors" />
                    <span className="text-[10px] font-black text-slate-800 uppercase leading-none mt-1">{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Square className="w-5 h-5 text-slate-400 group-hover:text-brand-500 transition-colors" />
                    <span className="text-[10px] font-black text-slate-800 uppercase leading-none mt-1 truncate max-w-full">
                      {property.area.split(' ')[0]} <span className="text-[8px]">SQFT</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Price</span>
                    <span className="text-2xl font-black text-brand-600">
                      {property.formattedPrice}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/property/${property._id}`)}
                    className="p-3 bg-brand-50 text-brand-600 rounded-xl hover:bg-brand-600 hover:text-white transition-all active:scale-90"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
