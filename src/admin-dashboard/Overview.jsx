import React from "react";
import {
    Home as HomeIcon,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    Heart,
    Building2,
    List,
    Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetDashboardStatsQuery } from "../features/api/apiSlice";

const StatCard = ({ title, value, change, icon: Icon, trend, color, iconColor }) => (
    <div className="bg-white p-5 md:p-7 rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(15,40,84,0.03)] hover:shadow-[0_20px_50px_rgba(15,40,84,0.08)] transition-all duration-300 group">
        <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                <Icon size={24} className={iconColor || color.replace('bg-', 'text-')} />
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-extrabold shadow-sm ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
            </div>
        </div>
        <div>
            <h3 className="text-[10px] md:text-sm font-bold text-brand-400 mb-2 uppercase tracking-widest leading-tight">{title}</h3>
            <p className="text-2xl md:text-3xl font-black text-brand-900 tracking-tight">{value}</p>
        </div>
    </div>
);

const ShortcutCard = ({ title, description, icon: Icon, onClick, color }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-4 md:gap-5 p-4 md:p-6 bg-white rounded-[24px] md:rounded-[28px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group w-full"
    >
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 shrink-0`}>
            <Icon size={22} md:size={24} />
        </div>
        <div className="min-w-0">
            <h4 className="text-sm md:text-base font-black text-brand-900 truncate">{title}</h4>
            <p className="text-[10px] md:text-xs font-bold text-brand-400 mt-0.5 uppercase tracking-wide truncate">{description}</p>
        </div>
    </button>
);

const Overview = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetDashboardStatsQuery();
    const stats = data?.stats;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-4 border-brand-100 rounded-full" />
                    <div className="absolute inset-0 border-4 border-brand-700 rounded-full border-t-transparent animate-spin" />
                </div>
                <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest animate-pulse">Loading Analytics...</p>
            </div>
        );
    }

    const dashboardCards = [
        {
            title: "Total Properties",
            value: stats?.totalProperties || 0,
            change: "+12%",
            trend: "up",
            icon: HomeIcon,
            color: "bg-brand-500",
            iconColor: "text-brand-600"
        },
        {
            title: "Client Inquiries",
            value: stats?.totalInquiries || 0,
            change: "+18%",
            trend: "up",
            icon: MessageSquare,
            color: "bg-indigo-500",
            iconColor: "text-indigo-600"
        },
        {
            title: "Total Likes",
            value: stats?.totalLikes || 0,
            change: "+24%",
            trend: "up",
            icon: Heart,
            color: "bg-rose-500",
            iconColor: "text-rose-600"
        },
        {
            title: "Engagement Rate",
            value: "94.2%",
            change: "+4.5%",
            trend: "up",
            icon: TrendingUp,
            color: "bg-emerald-500",
            iconColor: "text-emerald-600"
        }
    ];

    const shortcuts = [
        {
            title: "Add Property",
            description: "Create new listing",
            icon: Plus,
            color: "bg-brand-700",
            onClick: () => navigate("/admin/properties/add")
        },
        {
            title: "Manage Listings",
            description: "View all properties",
            icon: List,
            color: "bg-indigo-600",
            onClick: () => navigate("/admin/properties")
        },
        {
            title: "Settings",
            description: "Profile & Security",
            icon: Settings,
            color: "bg-slate-700",
            onClick: () => navigate("/admin/settings")
        }
    ];

    return (
        <div className="flex flex-col gap-6 md:gap-10 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-brand-900 tracking-tight">Dashboard</h2>
                    <p className="text-[10px] md:text-sm font-bold text-brand-400 mt-1 uppercase tracking-[0.1em]">Real-time business performance</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/admin/properties/add")}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand-700 text-white rounded-xl text-xs font-extrabold hover:bg-brand-900 transition-all shadow-lg shadow-brand-200"
                    >
                        <Plus size={16} /> New Listing
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8">
                {dashboardCards.map((card, index) => (
                    <StatCard key={index} {...card} />
                ))}
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-10">
                {/* Quick Actions */}
                <div className="xl:col-span-1 flex flex-col gap-4 md:gap-6">
                    <h3 className="text-base md:text-lg font-black text-brand-900 px-2 tracking-tight">Quick Shortcuts</h3>
                    <div className="grid grid-cols-1 gap-3 md:gap-4">
                        {shortcuts.map((shortcut, index) => (
                            <ShortcutCard key={index} {...shortcut} />
                        ))}
                    </div>
                </div>

                {/* Recent Inquiries */}
                <div className="xl:col-span-2 bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-[0_10px_30px_rgba(15,40,84,0.03)]">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                        <h3 className="text-base md:text-lg font-black text-brand-900 tracking-tight">Recent Inquiries</h3>
                        <button
                            onClick={() => navigate("/admin/properties")}
                            className="text-[10px] font-black text-brand-600 hover:text-brand-700 uppercase tracking-widest"
                        >
                            View All
                        </button>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                        {stats?.recentInquiries?.length > 0 ? stats.recentInquiries.map((inquiry, i) => (
                            <div key={i} className="flex items-center gap-4 md:gap-5 group cursor-pointer p-3 hover:bg-brand-50/50 rounded-2xl transition-all border border-transparent hover:border-brand-100">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold shadow-sm ring-2 ring-white group-hover:ring-brand-50 shrink-0">
                                    {inquiry.name[0].toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900 truncate">{inquiry.name}</p>
                                    <p className="text-[10px] font-bold text-brand-400 mt-0.5 uppercase tracking-wide truncate">Property: {inquiry.property_title || "Unknown"}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-[9px] font-black text-slate-400 group-hover:text-brand-500 transition-colors uppercase tracking-wider">
                                        {new Date(inquiry.created_at).toLocaleDateString()}
                                    </div>
                                    <div className="hidden sm:block text-[8px] font-bold text-brand-300 mt-1 uppercase">New Inquiry</div>
                                </div>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                <MessageSquare size={40} className="text-slate-100 mb-4" />
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No inquiries yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
