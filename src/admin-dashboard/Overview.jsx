import React from "react";
import TaskTable from "./components/TaskTable";
import GoalsWidget from "./components/GoalsWidget";
import ProjectList from "./components/ProjectList";
import CalendarWidget from "./components/CalendarWidget";
import RemindersWidget from "./components/RemindersWidget";
import { Sparkles, ArrowRight } from "lucide-react";

const ActionButton = ({ label, icon: Icon, primary }) => (
    <button className={`px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2.5 transition-all duration-300 shadow-sm ${primary
            ? "bg-brand-700 text-white shadow-brand-200 hover:bg-brand-900 hover:shadow-lg hover:-translate-y-0.5"
            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
        }`}>
        {Icon && <Icon size={18} />}
        {label}
    </button>
);

const Overview = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="flex flex-col gap-10">
            {/* Greeting Section */}
            <div className="relative overflow-hidden p-8 rounded-[40px] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(15,40,84,0.04)]">
                {/* Background blobs */}
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-50 rounded-full blur-3xl opacity-50" />
                <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-brand-50 rounded-full blur-3xl opacity-50" />

                <div className="relative z-10">
                    <span className="text-xs font-extrabold text-brand-400 uppercase tracking-[0.2em]">{currentDate}</span>
                    <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-900 tracking-tight leading-tight">Admin Dashboard</h1>
                            <p className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-brand-700 via-brand-500 to-brand-300 bg-clip-text text-transparent mt-2">
                                Welcome back to KartBuddy.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mb-1">
                            <ActionButton label="Ask AI" icon={Sparkles} primary />
                            <ActionButton label="Properties" icon={ArrowRight} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 flex-1 pb-12">
                {/* Left Column (8/12) */}
                <div className="xl:col-span-8 flex flex-col gap-8">
                    <div className="flex-1 min-h-[500px]">
                        <TaskTable />
                    </div>
                    <div className="h-[400px]">
                        <GoalsWidget />
                    </div>
                </div>

                {/* Right Column (4/12) */}
                <div className="xl:col-span-4 flex flex-col gap-8">
                    <div className="min-h-[350px]">
                        <ProjectList />
                    </div>
                    <div className="min-h-[400px]">
                        <CalendarWidget />
                    </div>
                    <div className="min-h-[300px] flex-1">
                        <RemindersWidget />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
