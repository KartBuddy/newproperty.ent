import React, { useState } from "react";
import { useGetPropertiesQuery, useDeletePropertyMutation } from "../features/api/apiSlice";
import { Plus, Search, Filter, Home, MapPin, Bath, Bed, Square, MoreVertical, Trash2, Edit, Building2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ... (PropertyCard content stays exactly the same)
const PropertyCard = ({ property, onEdit, onDelete }) => (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(15,40,84,0.03)] overflow-hidden hover:shadow-[0_20px_50px_rgba(15,40,84,0.08)] hover:-translate-y-1 transition-all duration-300 group">
        <div className="relative h-60">
            <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl shadow-brand-900/10">
                <Heart size={14} className="text-rose-500 fill-rose-500" />
                <span className="text-[11px] font-extrabold text-brand-700">{property.likes || 0}</span>
            </div>
            <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[11px] font-extrabold text-brand-700 shadow-xl shadow-brand-900/10 uppercase tracking-wider">
                {property.type === 'sale' ? 'For Sale' : 'For Rent'}
            </div>
        </div>
        <div className="p-7">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-bold text-brand-900 line-clamp-1 flex-1 pr-4">{property.title}</h3>
                <div className="text-brand-700 font-extrabold text-sm tracking-tight">{property.price}</div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 font-medium">
                <MapPin size={14} className="text-brand-300" />
                <span className="truncate">{property.location}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-slate-50 pt-6">
                <div className="flex flex-col items-center gap-1.5">
                    <Bed size={16} className="text-brand-300" />
                    <span className="text-[11px] font-bold text-slate-600">{property.bedrooms} Bed</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 border-x border-slate-50 px-2">
                    <Bath size={16} className="text-brand-300" />
                    <span className="text-[11px] font-bold text-slate-600">{property.bathrooms} Bath</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                    <Square size={16} className="text-brand-300" />
                    <span className="text-[11px] font-bold text-slate-600 truncate">{property.area}</span>
                </div>
            </div>
            <div className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <button
                    onClick={() => onEdit(property.id)}
                    className="flex-1 py-2.5 bg-slate-50 text-[11px] font-bold text-slate-600 hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    <Edit size={14} /> Edit
                </button>
                <button
                    onClick={() => onDelete(property.id)}
                    className="flex-1 py-2.5 bg-slate-50 text-[11px] font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    <Trash2 size={14} /> Delete
                </button>
            </div>
        </div>
    </div>
);

const Properties = () => {
    const navigate = useNavigate();
    const { data: properties, isLoading, error } = useGetPropertiesQuery();
    const [deleteProperty] = useDeletePropertyMutation();

    const [searchTerm, setSearchTerm] = useState("");

    const filteredProperties = properties?.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (id) => {
        navigate(`/admin/properties/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await deleteProperty(id).unwrap();
            } catch (err) {
                console.error('Failed to delete property:', err);
            }
        }
    };

    return (
        <div className="flex flex-col gap-10 pb-12">
            {/* Search and Filters Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-brand-900 tracking-tight">Manage Properties</h2>
                    <p className="text-sm font-bold text-brand-400 mt-1 uppercase tracking-[0.1em]">Browse and update your listings</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group min-w-[300px]">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-all" />
                        <input
                            type="text"
                            placeholder="Search by title or location..."
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-[24px] text-sm font-medium focus:ring-8 focus:ring-brand-500/5 focus:border-brand-200 outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2.5 px-6 py-4 bg-white border border-slate-100 rounded-[24px] text-sm font-extrabold text-slate-600 hover:bg-slate-50 transition-all shadow-sm group">
                        <Filter size={18} className="text-brand-300 group-hover:text-brand-500" /> Filters
                    </button>
                    <button
                        onClick={() => navigate("/admin/properties/add")}
                        className="flex items-center gap-2.5 px-8 py-4 bg-brand-700 text-white rounded-[24px] text-sm font-extrabold hover:bg-brand-900 transition-all shadow-2xl shadow-brand-200 flex-shrink-0"
                    >
                        <Plus size={20} /> Add New Listing
                    </button>
                </div>
            </div>

            {/* Properties Grid */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-brand-100 rounded-full" />
                        <div className="absolute inset-0 border-4 border-brand-700 rounded-full border-t-transparent animate-spin" />
                    </div>
                    <p className="text-xs font-bold text-brand-400 uppercase tracking-widest animate-pulse">Fetching Listings...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center min-h-[500px] text-slate-400 gap-6 bg-white rounded-[40px] border border-dashed border-slate-200 p-12 text-center">
                    <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500">
                        <Building2 size={40} />
                    </div>
                    <div>
                        <p className="text-lg font-extrabold text-brand-900">Failed to load properties</p>
                        <p className="text-sm font-medium mt-1">Please ensure your backend API is running at localhost:5000</p>
                    </div>
                    <button onClick={() => window.location.reload()} className="px-6 py-3 bg-brand-50 text-brand-700 rounded-2xl text-xs font-extrabold hover:bg-brand-100 transition-all">Retry Connection</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-10">
                    {filteredProperties?.map(property => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Properties;
