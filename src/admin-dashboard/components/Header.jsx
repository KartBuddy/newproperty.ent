import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/api/apiSlice";
import {
    Menu,
    Search,
    Bell,
    LogOut,
    User,
    ChevronDown
} from "lucide-react";

const Header = ({ collapsed, setCollapsed, setIsMobileMenuOpen }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const [logoutMutation] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutMutation().unwrap();
            dispatch(logout());
            navigate("/admin/login");
        } catch (err) {
            console.error("Logout failed:", err);
            dispatch(logout());
            navigate("/admin/login");
        }
    };

    return (
        <header className="h-16 bg-white border-b border-slate-100 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
                {/* Desktop Toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex p-2 hover:bg-brand-50 rounded-xl text-brand-700 transition-all duration-200"
                    title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    <Menu size={22} />
                </button>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="lg:hidden p-2 hover:bg-brand-50 rounded-xl text-brand-700 transition-all duration-200"
                >
                    <Menu size={22} />
                </button>

                <div className="relative group max-w-[200px] md:max-w-sm w-full transition-all duration-300 hidden sm:block">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-50 rounded-xl text-sm focus:bg-white focus:border-brand-200 outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
                {/* Notifications */}
                <button className="relative p-2 text-slate-400 hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full" />
                </button>

                <div className="hidden md:block h-6 w-px bg-slate-100" />

                {/* User Profile */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-2 md:gap-3 cursor-pointer group px-1 md:px-2 py-1.5 rounded-xl hover:bg-brand-50/50 transition-all">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 shadow-sm ring-2 ring-white group-hover:ring-brand-50 transition-all overflow-hidden font-bold shrink-0">
                            {user?.name?.[0]?.toUpperCase() || <User size={18} />}
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-xs md:text-sm font-bold text-slate-800 leading-none">{user?.name || "Admin"}</p>
                            <p className="text-[10px] font-bold text-brand-400 mt-1 lowercase tracking-wider truncate max-w-[100px]">{user?.email || "Admin"}</p>
                        </div>
                        <ChevronDown size={14} className="text-slate-400 group-hover:text-brand-600 transition-colors hidden md:block" />
                    </div>

                    <button
                        title="Logout"
                        onClick={handleLogout}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    >
                        <LogOut size={18} md:size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
