import React from "react";
import { Target, MoreHorizontal } from "lucide-react";

const GoalItem = ({ label, percentage, color, project }) => (
    <div className="space-y-3 group cursor-pointer hover:translate-x-1 transition-transform duration-300">
        <div className="flex items-center justify-between px-1">
            <div>
                <h4 className="text-[13px] font-extrabold text-brand-900 leading-none group-hover:text-brand-700 transition-colors">{label}</h4>
                <p className="text-[10px] font-bold text-brand-300 uppercase tracking-widest mt-1.5">{project}</p>
            </div>
            <span className="text-sm font-black text-brand-700 tabular-nums">{percentage}%</span>
        </div>
        <div className="h-2 w-full bg-slate-50 border border-slate-100/50 rounded-full overflow-hidden shadow-inner">
            <div
                className={`h-full ${color} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(73,136,196,0.2)]`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    </div>
);

const GoalsWidget = () => {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(15,40,84,0.03)] p-7 flex flex-col h-full hover:shadow-[0_20px_50px_rgba(15,40,84,0.08)] transition-all duration-500">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 shadow-sm shadow-brand-100/50">
                        <Target size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-extrabold text-brand-900 tracking-tight">Daily Goals</h2>
                        <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest mt-0.5">Progress tracking</p>
                    </div>
                </div>
                <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-300 hover:text-brand-700 transition-all">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-8">
                    <GoalItem
                        label="Client follow-up calls"
                        percentage={73}
                        color="bg-brand-500"
                        project="General • KartBuddy"
                    />
                    <GoalItem
                        label="Update property listings"
                        percentage={45}
                        color="bg-brand-700"
                        project="Inventory • KartBuddy"
                    />
                    <GoalItem
                        label="Review new leads"
                        percentage={63}
                        color="bg-brand-400"
                        project="Sales • KartBuddy"
                    />
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-brand-50 to-white border border-brand-100/30">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold text-brand-700 uppercase tracking-widest">Global Progress</span>
                        <span className="text-xs font-black text-brand-900">Over Target</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                        You've completed <span className="text-brand-700">12% more</span> tasks today than your daily average. Keep it up!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GoalsWidget;
