import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square } from "lucide-react";

const Hero = ({
  activeSection,
  handleNavClick,
  setShowAddForm,
  propertyList = []
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter featured properties (e.g., top 4)
  const featuredProperties = propertyList.length > 0
    ? propertyList.slice(0, 4)
    : [
      {
        _id: "default-1",
        title: "Modern Skyline Penthouse",
        description: "Experience the pinnacle of luxury living with panoramic city views and world-class amenities.",
        price: "₹4.5 Cr",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",
        location: "Worli, Mumbai",
        bedrooms: 4,
        bathrooms: 3,
        area: "3200 sq ft",
        type: "sale"
      },
      {
        _id: "default-2",
        title: "Serene Garden Villa",
        description: "A peaceful retreat nestled in lush greenery, offering privacy and modern elegance.",
        price: "₹3.2 Cr",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
        location: "Thane West, Maharashtra",
        bedrooms: 5,
        bathrooms: 4,
        area: "4500 sq ft",
        type: "sale"
      }
    ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProperties.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredProperties.length]);

  if (activeSection !== "home") return null;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredProperties.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length);

  return (
    <div className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-brand-900" id="home">
      {/* Background Images */}
      {featuredProperties.map((property, index) => (
        <div
          key={property._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/40 to-transparent z-10"></div>
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover animate-ken-burns"
          />
        </div>
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-20 flex items-center">
        <div className="max-w-3xl animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="inline-flex items-center gap-2 bg-brand-500/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/10">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse"></span>
            <span className="text-xs font-black text-brand-100 uppercase tracking-[0.2em]">Featured Property</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6">
            {featuredProperties[currentSlide].title}
          </h1>

          <p className="text-xl md:text-2xl text-brand-100/80 mb-10 leading-relaxed font-medium max-w-2xl">
            {featuredProperties[currentSlide].description || "Discover premium living spaces verified for quality and comfort in the most sought-after locations."}
          </p>

          <div className="flex flex-wrap items-center gap-8 mb-12 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-400" />
              <span className="font-bold">{featuredProperties[currentSlide].location}</span>
            </div>
            <div className="flex items-center gap-6 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-brand-400" />
                <span className="font-bold">{featuredProperties[currentSlide].bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-brand-400" />
                <span className="font-bold">{featuredProperties[currentSlide].bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-2">
                <Square className="w-5 h-5 text-brand-400" />
                <span className="font-bold">{featuredProperties[currentSlide].area}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => handleNavClick("properties")}
              className="w-full sm:w-auto bg-brand-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-400 transition-all shadow-2xl shadow-brand-500/20 active:scale-95 text-sm"
            >
              Buy This Home
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleNavClick("properties")}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95 text-sm"
            >
              Rent Property
            </button>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-12 right-4 sm:right-12 z-30 flex items-center gap-4">
        <div className="flex items-center gap-2 mr-8">
          {featuredProperties.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-brand-500" : "w-2 bg-white/30"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Image Overlays / Thumbnails (Visual strip as requested) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-12 z-30 hidden xl:flex flex-col gap-4">
        {featuredProperties.map((property, index) => (
          <button
            key={property._id}
            onClick={() => setCurrentSlide(index)}
            className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-110 active:scale-95 ${index === currentSlide ? "border-brand-500 scale-110 shadow-2xl shadow-brand-500/40" : "border-transparent opacity-50"}`}
          >
            <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
