import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex bg-slate-50 h-screen font-sans antialiased text-slate-900 overflow-hidden">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
                    <div className="max-w-7xl mx-auto h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
