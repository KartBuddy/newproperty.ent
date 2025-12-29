import React from "react";
import { MoreHorizontal, Plus, Maximize2, ChevronDown, ChevronRight, CheckSquare } from "lucide-react";

const TaskRow = ({ label, priority, dueDate, statusColor, priorityColor }) => (
    <div className="group flex items-center justify-between py-3.5 px-4 hover:bg-slate-50/50 transition-all duration-200 border-b border-slate-50 last:border-0 ml-4 border-l-2 border-l-transparent hover:border-l-brand-500">
        <div className="flex items-center gap-4">
            <div className={`w-2.5 h-2.5 rounded-full ${statusColor} shadow-sm`} />
            <span className="text-sm font-semibold text-slate-700 tracking-tight">{label}</span>
            <ChevronDown size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex items-center gap-8">
            <div className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${priorityColor}`}>
                {priority}
            </div>
            <div className="text-[11px] font-bold text-slate-400 w-24 text-right tabular-nums">
                {dueDate}
            </div>
        </div>
    </div>
);

const TaskTable = () => {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(15,40,84,0.03)] overflow-hidden flex flex-col h-full hover:shadow-[0_20px_50px_rgba(15,40,84,0.08)] transition-all duration-500">
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-slate-50 bg-slate-50/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 shadow-sm shadow-brand-100/50">
                        <CheckSquare size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-extrabold text-brand-900 tracking-tight">My Tasks</h2>
                        <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest mt-0.5">Focus for today</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                    <button className="p-2 hover:bg-white hover:text-brand-700 rounded-xl transition-all shadow-sm"><Plus size={18} /></button>
                    <button className="p-2 hover:bg-white hover:text-brand-700 rounded-xl transition-all shadow-sm"><Maximize2 size={16} /></button>
                    <button className="p-2 hover:bg-white hover:text-brand-700 rounded-xl transition-all shadow-sm"><MoreHorizontal size={18} /></button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                {/* Section: IN PROGRESS */}
                <div>
                    <div className="px-2 flex items-center gap-2 mb-4">
                        <ChevronDown size={14} className="text-brand-400" />
                        <span className="bg-brand-50 text-brand-700 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm shadow-brand-100/30">In Progress</span>
                        <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-widest">• 2 tasks</span>
                    </div>

                    <TaskRow
                        label="Property valuation for Client A"
                        priority="High"
                        dueDate="Today"
                        statusColor="bg-brand-500"
                        priorityColor="bg-rose-50 text-rose-600 border border-rose-100/50"
                    />
                    <TaskRow
                        label="Draft agreement for Silver Oak Villa"
                        priority="Low"
                        dueDate="3 days left"
                        statusColor="bg-brand-500"
                        priorityColor="bg-slate-50 text-slate-500 border border-slate-100"
                    />
                    <div className="mt-2 py-3 px-8 text-[11px] font-extrabold text-brand-400 cursor-pointer hover:text-brand-700 hover:translate-x-1 transition-all flex items-center gap-2 uppercase tracking-widest">
                        <Plus size={14} className="p-0.5 bg-brand-50 rounded-md" /> Add Task
                    </div>
                </div>

                {/* Section: TO DO */}
                <div className="mt-8">
                    <div className="px-2 flex items-center gap-2 mb-4">
                        <ChevronRight size={14} className="text-slate-400" />
                        <span className="bg-slate-50 text-slate-500 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider border border-slate-100">To Do</span>
                        <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-widest">• 1 task</span>
                    </div>
                </div>

                {/* Section: UPCOMING */}
                <div className="mt-8 mb-6">
                    <div className="px-2 flex items-center gap-2 mb-4">
                        <ChevronRight size={14} className="text-slate-400" />
                        <span className="bg-brand-100/50 text-brand-600 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider border border-brand-100/30">Upcoming</span>
                        <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-widest">• 1 task</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskTable;
