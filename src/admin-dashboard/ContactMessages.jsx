import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetContactSubmissionsQuery, useDeleteContactSubmissionMutation } from "../features/api/apiSlice";
import { Search, Mail, Calendar, Trash2, Eye, MessageSquare, AlertCircle, Loader2, CheckCircle2, Filter, ArrowUpDown } from "lucide-react";

const ContactMessages = () => {
    const navigate = useNavigate();
    const { data: response, isLoading, error, refetch } = useGetContactSubmissionsQuery();
    const [deleteSubmission] = useDeleteContactSubmissionMutation();
    const [searchTerm, setSearchTerm] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const messages = response?.data || [];

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            try {
                await deleteSubmission(id).unwrap();
                setToast({ show: true, message: "Submission deleted successfully", type: "success" });
                setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
            } catch (err) {
                setToast({ show: true, message: "Failed to delete submission", type: "error" });
                setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
            }
        }
    };

    const StatusBadge = ({ date }) => {
        const isNew = new Date(date) > new Date(Date.now() - 24 * 60 * 60 * 1000);
        return (
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border shadow-sm ${isNew
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                    : "bg-slate-50 text-slate-400 border-slate-100"
                }`}>
                {isNew ? "New" : "Read"}
            </span>
        );
    };

    const handleViewDetail = (id) => {
        navigate(`/admin/messages/${id}`);
    };

    return (
        <div className="flex flex-col gap-8 pb-12 relative min-h-[700px]">
            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed top-24 right-8 z-[100] animate-in slide-in-from-right duration-500">
                    <div className={`flex items-center gap-4 px-8 py-5 rounded-[24px] shadow-2xl border backdrop-blur-md ${toast.type === "success" ? "bg-emerald-50/90 border-emerald-100 text-emerald-700 font-extrabold" : "bg-rose-50/90 border-rose-100 text-rose-700 font-extrabold"
                        }`}>
                        {toast.type === "success" ? <CheckCircle2 className="w-6 h-6 animate-bounce" /> : <AlertCircle className="w-6 h-6 animate-pulse" />}
                        <p className="text-sm tracking-tight">{toast.message}</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-brand-900 tracking-tight">Contact Submissions</h2>
                    <p className="text-sm font-extrabold text-brand-400 mt-1.5 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-brand-200"></span>
                        Admin Inquiry Management
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group min-w-full lg:min-w-[400px]">
                        <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-all duration-300" />
                        <input
                            type="text"
                            placeholder="Filter by name, email, or subject..."
                            className="w-full pl-14 pr-6 py-4.5 bg-white border border-slate-100 rounded-[28px] text-sm font-bold focus:ring-8 focus:ring-brand-500/5 focus:border-brand-200 outline-none transition-all shadow-sm placeholder:text-slate-300 placeholder:font-semibold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-4.5 bg-white border border-slate-100 rounded-[24px] text-slate-400 hover:text-brand-700 hover:bg-slate-50 transition-all shadow-sm">
                        <Filter size={20} />
                    </button>
                    <button onClick={refetch} className="p-4.5 bg-white border border-slate-100 rounded-[24px] text-slate-400 hover:text-brand-700 hover:bg-brand-50 transition-all shadow-sm group">
                        <ArrowUpDown size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(15,40,84,0.03)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-10 py-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Sender</th>
                                    <th className="px-8 py-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Contact Details</th>
                                    <th className="px-8 py-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Subject</th>
                                    <th className="px-8 py-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Date Received</th>
                                    <th className="px-8 py-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                    <th className="px-10 py-6 text-right text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="6" className="py-24 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <Loader2 className="w-10 h-10 text-brand-700 animate-spin" />
                                                <p className="text-xs font-black text-brand-400 uppercase tracking-widest animate-pulse">Synchronizing Records...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="6" className="py-24 text-center">
                                            <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                                            <p className="text-lg font-black text-brand-900 uppercase">Synchronization Failed</p>
                                            <button onClick={refetch} className="mt-8 px-10 py-4 bg-rose-50 text-rose-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all">Retry Link</button>
                                        </td>
                                    </tr>
                                ) : filteredMessages.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-24 text-center">
                                            <MessageSquare className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                                            <p className="text-xl font-black text-brand-900 uppercase">Clear Records</p>
                                            <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest italic">No inquiries found for this filter</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMessages.map((msg) => (
                                        <tr
                                            key={msg.id}
                                            onClick={() => handleViewDetail(msg.id)}
                                            className="group hover:bg-slate-50/50 transition-all cursor-pointer"
                                        >
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-[18px] bg-brand-50/50 text-brand-700 flex items-center justify-center font-black text-sm uppercase group-hover:bg-brand-700 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                                                        {msg.name.charAt(0)}
                                                    </div>
                                                    <span className="font-extrabold text-brand-900 text-sm tracking-tight">{msg.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-8">
                                                <div className="flex items-center gap-2.5 text-slate-500 font-bold text-xs group-hover:text-brand-600 transition-colors">
                                                    <Mail size={14} className="opacity-40" />
                                                    {msg.email}
                                                </div>
                                            </td>
                                            <td className="px-8 py-8">
                                                <span className="font-bold text-slate-700 text-xs line-clamp-1 max-w-[200px]">{msg.subject}</span>
                                            </td>
                                            <td className="px-8 py-8">
                                                <div className="flex items-center gap-2.5 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                                                    <Calendar size={14} className="opacity-30" />
                                                    {new Date(msg.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-8 py-8">
                                                <StatusBadge date={msg.created_at} />
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleViewDetail(msg.id); }}
                                                        className="p-3 bg-white text-brand-700 rounded-xl hover:bg-brand-700 hover:text-white transition-all shadow-sm border border-slate-100"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                                                        className="p-3 bg-white text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-slate-100"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactMessages;
