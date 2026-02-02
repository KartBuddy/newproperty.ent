import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, Bed, Bath, Square, Phone, Home, Heart,
  ChevronLeft, ChevronRight, CheckCircle2,
  Mail, MessageSquare, IndianRupee, Percent,
  Clock, ShieldCheck, PlayCircle
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useGetPropertyByIdQuery, useGetPropertiesQuery, useAddInquiryMutation, useToggleLikeMutation } from "../features/api/apiSlice";
import Navbar from "./NavBar";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [inquiryData, setInquiryData] = useState({ name: "", email: "", phone: "", message: "" });

  const { data: property, isLoading: isPropertyLoading } = useGetPropertyByIdQuery(id);
  const { data: allProperties = [] } = useGetPropertiesQuery();
  const [addInquiry, { isLoading: isInquirySubmitting }] = useAddInquiryMutation();
  const [toggleLike] = useToggleLikeMutation();

  const handleLike = async () => {
    try {
      await toggleLike(property.id).unwrap();
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isPropertyLoading || !property) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-brand-500 rounded-full mb-4"></div>
        <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Loading Experience...</p>
      </div>
    </div>
  );

  const slides = property.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200"];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    try {
      await addInquiry({ ...inquiryData, property_id: property.id }).unwrap();
      alert("Inquiry submitted successfully!");
      setInquiryData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Failed to submit inquiry: " + (err.data?.message || err.error));
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-brand-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {property.type === 'sale' ? 'Exclusive Sale' : 'Premium Lease'}
              </span>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-capitalize">
                {property.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
              {property.title}
            </h1>
            <p className="flex items-center text-slate-500 font-bold">
              <MapPin className="w-5 h-5 mr-2 text-brand-500" /> {property.location}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end animate-in fade-in slide-in-from-right-4 duration-500">
            <p className="text-brand-600 text-3xl font-black mb-1">{property.formattedPrice}</p>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-tighter">Listed on {new Date(property.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="relative group rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl aspect-[16/9]">
              <img
                src={slides[currentSlide]}
                className="w-full h-full object-cover"
                alt={`Property slide ${currentSlide}`}
              />

              {slides.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-500 hover:border-brand-500"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-500 hover:border-brand-500"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? "bg-brand-500 w-8" : "bg-white/40 hover:bg-white/60"
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={handleLike}
                className="absolute top-6 right-6 w-auto px-4 h-14 bg-white rounded-3xl shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 group/heart"
              >
                <span className="font-black text-slate-900">{property.likes || 0}</span>
                <Heart
                  className={`w-7 h-7 transition-colors duration-300 ${property.isLiked ? "text-rose-500 fill-rose-500" : "text-slate-400 group-hover/heart:text-rose-400"
                    }`}
                  strokeWidth={2.5}
                />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Bed, label: "Bedrooms", value: property.bedrooms || "N/A" },
                { icon: Bath, label: "Bathrooms", value: property.bathrooms || "N/A" },
                { icon: Square, label: "Total Area", value: property.area },
                { icon: ShieldCheck, label: "Parking", value: property.parking ? "Available" : "No" },
              ].map((spec, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <spec.icon className="w-6 h-6 text-brand-500 mb-4" />
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{spec.label}</p>
                  <p className="text-slate-900 font-black text-lg">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-black">
              <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-brand-500 rounded-full"></span>
                Property Description
              </h2>
              {/* <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 font-medium text-lg leading-relaxed whitespace-pre-wrap">
                  {property.description || "No description provided for this property."}
                </p>
              </div> */}

              <div className="mt-10 pt-10 border-t border-slate-50">
                <h3 className="text-xl font-black text-slate-900 mb-6 font-capitalize">{property.property_type} Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    `Location: ${property.address}, ${property.city}`,
                    `Pincode: ${property.pincode}`,
                    `Owner: ${property.owner_name || "Confidential"}`,
                    `Parking: ${property.parking ? "Dedicated Spot" : "Not Available"}`,
                    `Status: ${property.status}`
                  ].map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-slate-600 font-bold">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-brand-900 text-white rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <h3 className="text-2xl font-black mb-6 relative z-10">Get in Touch</h3>

              <div className="flex items-center gap-4 mb-8 p-4 bg-brand-800 rounded-[1.5rem] border border-brand-700 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-700 flex items-center justify-center border border-brand-600">
                  <Home className="w-6 h-6 text-brand-200" />
                </div>
                <div>
                  <p className="font-black text-lg">Interested in this Property</p>
                  <p className="text-brand-400 text-sm font-bold">call me/Whatsapp</p>
                </div>
              </div>

              <div className="space-y-4 mb-8 relative z-10">
                <a href="tel:9223376243" className="w-full bg-brand-500 text-white py-4 rounded-[1.25rem] font-black hover:bg-brand-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-500/20 active:scale-95 text-center">
                  <Phone className="w-5 h-5 text-brand-200" /> 9223376243
                </a>
                <a href="https://wa.me/919223376243" target="_blank" rel="noopener noreferrer" className="w-full bg-brand-800 text-white py-4 rounded-[1.25rem] font-black hover:bg-brand-700 transition-all flex items-center justify-center gap-3 border border-brand-700 active:scale-95 text-center">
                  <MessageSquare className="w-5 h-5 text-brand-400" /> WhatsApp
                </a>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-4 relative z-10">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={inquiryData.name}
                  onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                  className="w-full bg-brand-800 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-brand-500 placeholder:text-brand-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={inquiryData.email}
                  onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                  className="w-full bg-brand-800 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-brand-500 placeholder:text-brand-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={inquiryData.phone}
                  onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                  className="w-full bg-brand-800 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-brand-500 placeholder:text-brand-500"
                />
                <textarea
                  placeholder="Tell us about your interest..."
                  value={inquiryData.message}
                  onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                  rows="3"
                  className="w-full bg-brand-800 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-brand-500 placeholder:text-brand-500"
                ></textarea>
                <button
                  type="submit"
                  disabled={isInquirySubmitting}
                  className="w-full bg-white text-brand-900 py-4 rounded-[1.25rem] font-black hover:bg-brand-50 transition-all uppercase tracking-widest text-xs active:scale-95 disabled:opacity-50"
                >
                  {isInquirySubmitting ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
