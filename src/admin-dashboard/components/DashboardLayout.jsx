import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex bg-slate-50 h-screen font-sans antialiased text-slate-900 overflow-hidden relative">
            {/* Sidebar with mobile support */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-4 lg:p-5">
                    <div className="max-w-7xl mx-auto h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
