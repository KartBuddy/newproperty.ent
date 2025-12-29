import React from "react";
import { MoreHorizontal, Plus, Briefcase, ChevronRight, ChevronDown, Sparkles, Target, Palette } from "lucide-react";

const ProjectItem = ({ label, tasks, teammates, iconColor, icon: Icon }) => (
    <div className="flex items-center justify-between p-5 bg-white rounded-[24px] border border-slate-100 hover:border-brand-200 hover:shadow-[0_10px_30px_rgba(15,40,84,0.06)] transition-all duration-300 cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${iconColor} flex items-center justify-center text-white shadow-lg shadow-brand-100/50 group-hover:scale-105 transition-transform`}>
                <Icon size={28} />
            </div>
            <div>
                <h4 className="text-sm font-extrabold text-brand-900 group-hover:text-brand-700 transition-colors uppercase tracking-tight">{label}</h4>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                    <span>{tasks} tasks</span>
                    <span className="text-brand-100">•</span>
                    <span>{teammates} leads</span>
                </div>
            </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand-50 group-hover:text-brand-700 transition-all">
            <ChevronRight size={18} />
        </div>
    </div>
);

const ProjectList = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 shadow-sm shadow-brand-100/50">
                        <Briefcase size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-extrabold text-brand-900 tracking-tight">Active Categories</h2>
                        <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest mt-0.5">Project management</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-extrabold text-slate-400 hover:text-brand-700 hover:bg-white transition-all">
                    Recents <ChevronDown size={14} />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {/* New Category Placeholder */}
                <div className="flex items-center gap-4 p-5 border-2 border-dashed border-slate-100 rounded-[24px] hover:border-brand-300 hover:bg-brand-50/20 transition-all duration-300 cursor-pointer group">
                    <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-200 group-hover:border-brand-300 group-hover:text-brand-500 transition-colors">
                        <Plus size={28} />
                    </div>
                    <div>
                        <span className="text-sm font-extrabold text-slate-300 group-hover:text-brand-700 transition-colors uppercase tracking-tight">Add New Category</span>
                        <p className="text-[10px] font-bold text-slate-200 mt-1 uppercase tracking-widest">Create new workflow</p>
                    </div>
                </div>

                <ProjectItem
                    label="Residential Sales"
                    tasks={6}
                    teammates={12}
                    iconColor="bg-brand-700"
                    icon={Building2}
                />
                <ProjectItem
                    label="Commercial Leasing"
                    tasks={2}
                    teammates={32}
                    iconColor="bg-brand-500"
                    icon={Target}
                />
                <ProjectItem
                    label="Legal Documentation"
                    tasks={4}
                    teammates={9}
                    iconColor="bg-brand-900"
                    icon={Palette}
                />
            </div>
        </div>
    );
};

// Use Building2 icon for residential sales
import { Building2 } from "lucide-react";

export default ProjectList;
