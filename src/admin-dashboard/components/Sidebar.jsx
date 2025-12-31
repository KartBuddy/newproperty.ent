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
    User,
    Mail
} from "lucide-react";

const SidebarItem = ({ icon: Icon, label, path, shortcut, collapsed, setIsMobileMenuOpen }) => (
    <NavLink
        to={path}
        onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
        className={({ isActive }) =>
            `flex items-center justify-between group px-3.5 py-2.5 rounded-xl transition-all duration-200 ${isActive
                ? "bg-brand-700 text-white shadow-lg shadow-brand-100"
                : "text-slate-500 hover:bg-slate-50 hover:text-brand-900"
            }`
        }
    >
        <div className="flex items-center gap-3">
            <Icon size={20} className={`${collapsed ? "mx-auto" : ""} transition-colors`} />
            {!collapsed && <span className="text-sm font-semibold tracking-tight">{label}</span>}
        </div>
        {!collapsed && shortcut && (
            <div className={`flex items-center gap-0.5 px-1.5 py-0.5 border rounded-lg text-[10px] transition-colors shadow-sm font-bold ${path === window.location.pathname ? "bg-brand-600 border-brand-500 text-brand-100" : "bg-white border-slate-200 text-slate-400 group-hover:border-slate-300"
                }`}>
                <span>{shortcut}</span>
            </div>
        )}
    </NavLink>
);

const Sidebar = ({ collapsed, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-brand-900/40 backdrop-blur-sm z-[70] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div
                className={`h-screen bg-white border-r border-slate-100 transition-all duration-300 flex flex-col fixed lg:relative z-[80] lg:z-[60] ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    } ${collapsed ? "lg:w-[80px]" : "lg:w-[280px] w-[280px]"} shadow-[1px_0_20px_rgba(15,40,84,0.03)]`}
            >
                {/* Sidebar Top: Logo/Brand */}
                <div className={`p-5 mb-4 relative`}>
                    <div
                        className={`flex items-center gap-3.5 p-2.5 rounded-2xl bg-brand-50/30 border border-brand-50/50 transition-all cursor-default ${collapsed ? "lg:justify-center" : ""}`}
                    >
                        <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-200 shrink-0">
                            <Building2 size={20} className="text-white" />
                        </div>
                        {(!collapsed || isMobileMenuOpen) && (
                            <div className="flex-1 overflow-hidden">
                                <span className="text-sm font-extrabold text-brand-900 truncate block tracking-tight">KartBuddy</span>
                                <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mt-0.5">Admin Panel</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-4 space-y-1.5 scrollbar-hide mt-2">
                    <SidebarItem icon={Home} label="Overview" path="/admin/overview" shortcut="1" collapsed={collapsed} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                    <SidebarItem icon={Building2} label="Properties" path="/admin/properties" shortcut="2" collapsed={collapsed} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                    <SidebarItem icon={Mail} label="Contact Submissions" path="/admin/messages" shortcut="3" collapsed={collapsed} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                </div>

                {/* Bottom Nav */}
                <div className="p-4 mt-auto border-t border-slate-50">
                    <div className="space-y-1.5">
                        <SidebarItem icon={Settings} label="Settings" path="/admin/settings" collapsed={collapsed} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
