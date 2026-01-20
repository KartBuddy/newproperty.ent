import React, { useState } from "react";
import { useGetAdminPropertiesQuery, useDeletePropertyMutation, useGetPropertyByIdQuery, useUpdatePropertyApprovalMutation } from "../features/api/apiSlice";
import { Plus, Search, Filter, Home, MapPin, Bath, Bed, Square, MoreVertical, Trash2, Edit, Building2, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property, onEdit, onDelete, onClick }) => (
    <div onClick={onClick} className="bg-white rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(15,40,84,0.03)] overflow-hidden cursor-pointer">
        <div className="relative h-60">
            <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
            <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl shadow-brand-900/10">
                <Heart size={14} className="text-rose-500 fill-rose-500" />
                <span className="text-[11px] font-extrabold text-brand-700">{property.likes || 0}</span>
            </div>
            <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[11px] font-extrabold text-brand-700 shadow-xl shadow-brand-900/10 uppercase tracking-wider">
                {property.type === 'sale' ? 'For Sale' : 'For Rent'}
            </div>
            <div className="absolute top-16 right-5">
                <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest
                            ${property.approval_status === "approved"
                            ? "bg-emerald-500 text-white"
                            : property.approval_status === "pending"
                                ? "bg-amber-400 text-brand-900"
                                : "bg-rose-500 text-white"
                        }`}
                >
                    {property.approval_status}
                </span>
            </div>
        </div>
        <div className="p-7">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-bold text-brand-900 line-clamp-1 flex-1 pr-4">{property.title}</h3>
                <div className="text-brand-700 font-extrabold text-sm tracking-tight">{property.formattedPrice}</div>
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
            <div className="mt-8 flex items-center gap-3">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(property.id); }}
                    className="flex-1 py-2.5 bg-slate-50 text-[11px] font-bold text-slate-600 hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    <Edit size={14} /> Edit
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(property.id); }}
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
    const { data: properties, isLoading, error } = useGetAdminPropertiesQuery();
    const [deleteProperty] = useDeletePropertyMutation();

    const [selectedId, setSelectedId] = useState(null);

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
        <div className="flex flex-col gap-6">
            {/* Search and Filters Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold text-brand-900 tracking-tight">Manage Properties</h2>
                    <p className="text-xs font-bold text-brand-400 mt-0.5 uppercase tracking-widest">Browse and update your listings</p>
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
                        className="flex items-center gap-2.5 px-8 py-4 bg-brand-700 text-white rounded-[24px] text-sm font-extrabold hover:bg-brand-900 transition-all shadow-2xl shadow-brand-200 shrink-0"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProperties?.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onClick={() => setSelectedId(property.id)}
                        />
                    ))}
                </div>
            )}
            {selectedId && (
                <PropertyModal id={selectedId} onClose={() => setSelectedId(null)} />
            )}
        </div>
    );
};

export default Properties;

const PropertyModal = ({ id, onClose }) => {
    const { data: property, isLoading } = useGetPropertyByIdQuery(id, { skip: !id });
    const [updateApproval, { isLoading: isUpdating }] = useUpdatePropertyApprovalMutation();
    const [currentSlide, setCurrentSlide] = useState(0);

    if (!id) return null;

    const slides = property?.images && property.images.length > 0 ? property.images : property ? [property.image] : [];

    const next = (e) => { e?.stopPropagation(); setCurrentSlide((s) => (s + 1) % slides.length); };
    const prev = (e) => { e?.stopPropagation(); setCurrentSlide((s) => (s - 1 + slides.length) % slides.length); };

    const handleApproval = async (status) => {
        try {
            await updateApproval({ id, approved: status === "approved" }).unwrap();
        } catch (err) {
            console.error(err);
        }
        onClose();
    };

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 bg-black/50 px-4 py-8 flex items-center justify-center xl:justify-end">
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] xl:mr-8 md:flex">
                {/* Left: Image / Slider */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative flex-shrink-0 overflow-auto flex items-center justify-center bg-gray-100">
                    <img 
                        src={slides[currentSlide]} 
                        alt={property?.title} 
                        className="max-w-full max-h-full object-contain" 
                        style={{ maxHeight: '90vh' }}
                    />
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/90 rounded-full p-2 z-20">
                        <X size={18} />
                    </button>
                    {slides.length > 1 && (
                        <>
                            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 z-20">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 z-20">
                                <ChevronRight size={20} />
                            </button>
                        </>
                    )}
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between max-h-[90vh] overflow-auto">
                    <div>
                        <div className="flex items-start justify-between">
                            <div className="pr-4">
                                <h3 className="text-2xl font-black text-brand-900">{property?.title}</h3>
                                <p className="text-sm text-slate-500 mt-1">{property?.location}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest
                                    ${property?.approval_status === 'approved' ? 'bg-emerald-500 text-white' : property?.approval_status === 'pending' ? 'bg-amber-400 text-brand-900' : 'bg-rose-500 text-white'}`}>
                                    {property?.approval_status}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-slate-600 font-medium">{property?.description}</p>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-50 pt-6">
                            <div className="flex flex-col items-center gap-1.5">
                                <Bed size={16} className="text-brand-300" />
                                <span className="text-[11px] font-bold text-slate-600">{property?.bedrooms} Bed</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5 border-x border-slate-50 px-2">
                                <Bath size={16} className="text-brand-300" />
                                <span className="text-[11px] font-bold text-slate-600">{property?.bathrooms} Bath</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <Square size={16} className="text-brand-300" />
                                <span className="text-[11px] font-bold text-slate-600">{property?.area}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="bg-slate-50 rounded-xl p-4 mb-4">
                            <div className="text-sm font-extrabold text-brand-700">{property?.formattedPrice}</div>
                            <div className="text-xs text-slate-400 mt-2">Owner: {property?.owner_name || 'N/A'}</div>
                            <div className="text-xs text-slate-400 mt-1">Contact: {property?.owner_contact || 'N/A'}</div>
                        </div>

                        <div className="sticky bottom-0 bg-white pt-4 -mx-6 px-6 pb-6">
                            {property?.approval_status === 'pending' ? (
                                <div className="flex gap-3">
                                    <button onClick={() => handleApproval('approved')} className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl font-extrabold hover:bg-emerald-700">Approve</button>
                                    <button onClick={() => handleApproval('rejected')} className="flex-1 px-4 py-3 bg-rose-600 text-white rounded-xl font-extrabold hover:bg-rose-700">Reject</button>
                                </div>
                            ) : (
                                <button onClick={onClose} className="w-full px-4 py-3 bg-slate-100 rounded-xl font-extrabold">Close</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
