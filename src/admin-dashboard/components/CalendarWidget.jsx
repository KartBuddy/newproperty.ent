import React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MoreHorizontal, ChevronDown, Video } from "lucide-react";

const CalendarWidget = () => {
    const days = [
        { day: "Fri", date: "04" },
        { day: "Sat", date: "05" },
        { day: "Sun", date: "06" },
        { day: "Mon", date: "07", active: true },
        { day: "Tue", date: "08" },
        { day: "Wed", date: "09" },
        { day: "Thu", date: "10" },
    ];

    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(15,40,84,0.03)] p-7 flex flex-col h-full hover:shadow-[0_20px_50px_rgba(15,40,84,0.08)] transition-all duration-500">
            <div className="flex items-center justify-between mb-8 px-1">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 shadow-sm shadow-brand-100/50">
                        <CalendarIcon size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-extrabold text-brand-900 tracking-tight">Schedule</h2>
                        <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest mt-0.5">Events & Meetings</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-extrabold text-slate-400 hover:text-brand-700 hover:bg-white transition-all">
                    December <ChevronDown size={14} />
                </button>
            </div>

            <div className="flex justify-between items-center mb-10 px-2 bg-slate-50/30 py-4 rounded-2xl border border-slate-50/50">
                <button className="p-1.5 hover:bg-white rounded-lg text-slate-300 hover:text-brand-700 transition-all shadow-sm">
                    <ChevronLeft size={16} />
                </button>
                <div className="flex gap-4">
                    {days.map((d, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                            <span className="text-[9px] text-brand-300 font-black uppercase tracking-[0.1em]">{d.day}</span>
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black transition-all ${d.active
                                    ? "bg-brand-700 text-white shadow-xl shadow-brand-200 scale-110"
                                    : "text-slate-500 hover:bg-white hover:text-brand-700"
                                }`}>
                                {d.date}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="p-1.5 hover:bg-white rounded-lg text-slate-300 hover:text-brand-700 transition-all shadow-sm">
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="bg-gradient-to-br from-brand-900 to-brand-700 rounded-[24px] p-6 text-white shadow-2xl shadow-brand-200 relative overflow-hidden group border border-brand-500/20">
                <div className="absolute -right-6 -top-6 w-20 h-20 bg-brand-500 rounded-full blur-2xl opacity-30 group-hover:scale-150 transition-transform duration-700" />

                <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="px-2.5 py-1 bg-white/15 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest">Ongoing</span>
                    <MoreHorizontal size={18} className="text-brand-200 hover:text-white cursor-pointer transition-colors" />
                </div>

                <h4 className="text-sm font-extrabold mb-1 relative z-10 tracking-tight">Vashi Property Visit</h4>
                <p className="text-[10px] text-brand-200/80 font-bold uppercase tracking-widest mb-6 relative z-10">Today • 10:00 - 11:30 am</p>

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2.5 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
                        <Video size={14} className="text-brand-200" />
                        <span className="text-[10px] font-bold">Join Meet</span>
                    </div>
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-xl border-2 border-brand-700 overflow-hidden bg-brand-800 shadow-lg">
                                <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                        ))}
                        <div className="relative z-10 w-8 h-8 rounded-xl border-2 border-brand-700 bg-brand-500 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                            +4
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarWidget;
