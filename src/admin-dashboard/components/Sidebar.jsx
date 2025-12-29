import React from "react";
import { NavLink } from "react-router-dom";
import {
    Search,
    Settings,
    HelpCircle,
    Plus,
    ChevronsUpDown,
    Command,
    Home,
    Building2,
    User
} from "lucide-react";

const SidebarItem = ({ icon: Icon, label, path, shortcut, collapsed }) => (
    <NavLink
        to={path}
        className={({ isActive }) =>
            `flex items-center justify-between group px-3.5 py-2.5 rounded-xl transition-all duration-200 ${isActive
                ? "bg-brand-50 text-brand-700 shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-brand-900"
            }`
        }
    >
        <div className="flex items-center gap-3">
            <Icon size={20} className={`${collapsed ? "mx-auto" : ""} transition-colors`} />
            {!collapsed && <span className="text-sm font-semibold tracking-tight">{label}</span>}
        </div>
        {!collapsed && shortcut && (
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-400 group-hover:border-slate-300 transition-colors shadow-sm font-bold">
                <span>{shortcut}</span>
            </div>
        )}
    </NavLink>
);

const Sidebar = ({ collapsed }) => {
    return (
        <div
            className={`h-screen bg-white border-r border-slate-100 transition-all duration-300 flex flex-col relative z-[60] ${collapsed ? "w-[80px]" : "w-[280px]"
                } shadow-[1px_0_20px_rgba(15,40,84,0.03)]`}
        >
            {/* Sidebar Top: Logo/Brand */}
            <div className={`p-5 mb-4`}>
                <div
                    className={`flex items-center gap-3.5 p-2.5 rounded-2xl bg-brand-50/30 border border-brand-50/50 transition-all cursor-default ${collapsed ? "justify-center" : ""}`}
                >
                    <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-200 shrink-0">
                        <Building2 size={20} />
                    </div>
                    {!collapsed && (
                        <div className="flex-1 overflow-hidden">
                            <span className="text-sm font-extrabold text-brand-900 truncate block tracking-tight">KartBuddy</span>
                            <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mt-0.5">Admin Panel</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 space-y-1.5 scrollbar-hide mt-2">
                <SidebarItem icon={Home} label="Overview" path="/admin/overview" shortcut="1" collapsed={collapsed} />
                <SidebarItem icon={Building2} label="Properties" path="/admin/properties" shortcut="2" collapsed={collapsed} />
            </div>

            {/* Bottom Nav */}
            <div className="p-4 mt-auto border-t border-slate-50">
                <div className="space-y-1.5">
                    <SidebarItem icon={Settings} label="Settings" path="/admin/settings" collapsed={collapsed} />
                    <SidebarItem icon={HelpCircle} label="Help" path="/admin/help" collapsed={collapsed} />
                </div>

                {!collapsed && (
                    <div className="mt-6 p-4 bg-brand-900 rounded-[24px] text-white shadow-xl shadow-brand-100 relative overflow-hidden group">
                        {/* Decorative element */}
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-700 rounded-full blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-500" />

                        <h4 className="text-xs font-extrabold mb-1 relative z-10">Premium Support</h4>
                        <p className="text-[10px] text-brand-200 leading-relaxed mb-3 relative z-10 font-medium">
                            Need help managing your properties?
                        </p>
                        <button className="w-full py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-[10px] font-bold transition-all relative z-10 shadow-lg shadow-brand-900/20">
                            Contact Support
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
