import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetInquiryByIdQuery, useDeleteInquiryMutation } from "../features/api/apiSlice";
import {
    Mail, Calendar, Trash2, ArrowLeft, MessageSquare,
    AlertCircle, Loader2, CheckCircle2, User, Phone,
    ExternalLink, Copy, Share2, Building2, MapPin, IndianRupee
} from "lucide-react";

const InquiryDetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: inquiry, isLoading, error } = useGetInquiryByIdQuery(id);
    const [deleteInquiry] = useDeleteInquiryMutation();
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const handleDelete = async () => {
        if (window.confirm("Delete this inquiry?")) {
            try {
                await deleteInquiry(id).unwrap();
                setToast({ show: true, message: "Deleted successfully", type: "success" });
                setTimeout(() => {
                    setToast({ show: false, message: "", type: "success" });
                    navigate("/admin/inquiries");
                }, 1500);
            } catch (err) {
                setToast({ show: true, message: "Delete failed", type: "error" });
                setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
            }
        }
    };

    const handleWhatsApp = () => {
        if (!inquiry?.phone) return;
        const cleanPhone = inquiry.phone.replace(/\D/g, "");
        window.open(`https://wa.me/${cleanPhone}`, "_blank");
    };

    const handleEmail = () => {
        if (!inquiry?.email) return;
        const subject = `Re: Inquiry about ${inquiry.property_title || "Property"}`;
        window.location.href = `mailto:${inquiry.email}?subject=${encodeURIComponent(subject)}`;
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-brand-700 animate-spin" />
                <p className="text-xs font-bold text-brand-400 uppercase tracking-widest">Loading details...</p>
            </div>
        );
    }

    if (error || !inquiry) {
        return (
            <div className="text-center py-20 px-6">
                <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-brand-900 mb-4">Inquiry not found</h3>
                <button
                    onClick={() => navigate("/admin/inquiries")}
                    className="px-8 py-3 bg-brand-900 text-white rounded-xl font-bold"
                >
                    Back to Inquiries
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {toast.show && (
                <div className="fixed top-24 right-8 z-[100] animate-in slide-in-from-right">
                    <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border ${
                        toast.type === "success" 
                            ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                            : "bg-rose-50 border-rose-100 text-rose-700"
                    }`}>
                        {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <p className="text-sm font-bold">{toast.message}</p>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => navigate("/admin/inquiries")}
                    className="flex items-center gap-2 text-slate-500 hover:text-brand-900 font-bold transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Inquiries</span>
                </button>
                <button
                    onClick={handleDelete}
                    className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all"
                    title="Delete Inquiry"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 pb-12 border-b border-slate-50">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-[28px] bg-brand-700 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-brand-200">
                                {inquiry.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-brand-900 tracking-tight">{inquiry.name}</h2>
                                <p className="text-slate-400 font-bold flex items-center gap-2 mt-1">
                                    <Calendar size={14} />
                                    {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                                        month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                                <div className="p-5 bg-slate-50 rounded-2xl font-bold text-slate-700 flex items-center justify-between group">
                                    <span>{inquiry.email}</span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(inquiry.email);
                                            setToast({ show: true, message: "Email copied", type: "success" });
                                            setTimeout(() => setToast({ show: false, message: "", type: "success" }), 2000);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 text-brand-400 hover:text-brand-700 transition-all"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                                <div className="p-5 bg-slate-50 rounded-2xl font-bold text-slate-700 flex items-center justify-between group text-lg">
                                    <span>{inquiry.phone || "Not provided"}</span>
                                    {inquiry.phone && (
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(inquiry.phone);
                                                setToast({ show: true, message: "Phone copied", type: "success" });
                                                setTimeout(() => setToast({ show: false, message: "", type: "success" }), 2000);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 text-brand-400 hover:text-brand-700 transition-all"
                                        >
                                            <Copy size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Property Interested In</label>
                            <div className="p-8 bg-gradient-to-br from-brand-50 to-indigo-50 rounded-[32px] border border-brand-100">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-700 flex items-center justify-center shrink-0">
                                        <Building2 size={24} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black text-brand-900 mb-1">
                                            {inquiry.property_title || "Unknown Property"}
                                        </h3>
                                        {(inquiry.city || inquiry.state) && (
                                            <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                                                <MapPin size={14} className="text-brand-500" />
                                                {inquiry.city}{inquiry.city && inquiry.state ? ', ' : ''}{inquiry.state}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {inquiry.price && (
                                    <div className="flex items-center gap-2 pt-4 border-t border-brand-100">
                                        <IndianRupee size={16} className="text-brand-600" />
                                        <span className="text-2xl font-black text-brand-700">
                                            {new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: 'INR',
                                                maximumFractionDigits: 0,
                                            }).format(inquiry.price)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message Content</label>
                            <div className="p-8 md:p-10 bg-slate-50/50 rounded-[32px] border border-slate-100 leading-relaxed text-slate-600 font-medium text-lg italic whitespace-pre-wrap">
                                "{inquiry.message || "No message provided"}"
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 pt-12 mt-12 border-t border-slate-100">
                        {inquiry.phone && (
                            <button
                                onClick={handleWhatsApp}
                                className="w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-5 bg-emerald-600 text-white rounded-[24px] font-black text-[13px] uppercase tracking-[0.15em] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 hover:-translate-y-1 active:translate-y-0"
                            >
                                <Share2 size={22} strokeWidth={2.5} /> Chat on WhatsApp
                            </button>
                        )}
                        <button
                            onClick={handleEmail}
                            className="w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-5 bg-brand-700 text-white rounded-[24px] font-black text-[13px] uppercase tracking-[0.15em] hover:bg-brand-600 transition-all shadow-xl shadow-brand-700/20 hover:-translate-y-1 active:translate-y-0"
                        >
                            <Mail size={22} strokeWidth={2.5} /> Send Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InquiryDetailView;