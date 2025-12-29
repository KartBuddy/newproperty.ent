import React from "react";
import { Bell, Trash2, Edit3, Clock, ChevronDown, Sparkles, Plus } from "lucide-react";

const ReminderItem = ({ text, time, icons = true }) => (
    <div className="group p-5 bg-slate-50/30 hover:bg-white hover:shadow-[0_10px_30px_rgba(15,40,84,0.06)] border border-transparent hover:border-brand-50 rounded-2xl transition-all duration-300 cursor-pointer">
        <div className="flex items-start justify-between gap-4">
            <p className="text-[13px] font-bold text-brand-900 leading-relaxed group-hover:text-brand-700 transition-colors">{text}</p>
            {icons && (
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <button className="p-1.5 hover:bg-brand-50 rounded-lg text-slate-300 hover:text-brand-700 transition-all"><Bell size={14} /></button>
                    <button className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-300 hover:text-rose-600 transition-all"><Trash2 size={14} /></button>
                    <button className="p-1.5 hover:bg-brand-50 rounded-lg text-slate-300 hover:text-brand-700 transition-all"><Edit3 size={14} /></button>
                </div>
            )}
        </div>
        {time && <p className="text-[10px] text-brand-300 mt-3 font-extrabold uppercase tracking-widest">{time}</p>}
    </div>
);

const RemindersWidget = () => {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(15,40,84,0.03)] p-7 flex flex-col h-full relative hover:shadow-[0_20px_50px_rgba(15,40,84,0.08)] transition-all duration-500 overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-full blur-3xl opacity-30 mt-[-20%] mr-[-10%]" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50/50 flex items-center justify-center text-brand-700 shadow-sm shadow-brand-100/50">
                        <Clock size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-extrabold text-brand-900 tracking-tight">Reminders</h2>
                        <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest mt-0.5">Don't miss a thing</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-4 px-1">
                        <ChevronDown size={14} className="text-brand-400" />
                        <span className="text-[11px] font-black text-brand-900 uppercase tracking-widest">Today</span>
                        <span className="w-5 h-5 rounded-full bg-brand-50 text-[10px] font-black text-brand-700 flex items-center justify-center ml-1 border border-brand-100/50">2</span>
                    </div>
                    <div className="space-y-4">
                        <ReminderItem
                            text="Follow up on the premium villa listing agreement."
                            time="Due in 2 hours"
                        />
                        <ReminderItem
                            text="Send quarterly reports to the property owners."
                            time="Tomorrow • 9:00 am"
                        />
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="absolute bottom-8 right-8 group relative z-20">
                <button className="w-14 h-14 rounded-2xl bg-brand-700 flex items-center justify-center text-white shadow-xl shadow-brand-200 cursor-pointer hover:bg-brand-900 hover:scale-110 active:scale-95 transition-all duration-300">
                    <Plus size={24} />
                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-brand-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
                        Add Reminder
                    </div>
                </button>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-4 border-white shadow-sm" />
            </div>
        </div>
    );
};

export default RemindersWidget;
