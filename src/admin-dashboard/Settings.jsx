import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    User,
    Lock,
    Mail,
    Shield,
    Save,
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff
} from "lucide-react";
import {
    useUpdateProfileMutation,
    useUpdatePasswordMutation
} from "../features/api/apiSlice";
import { selectCurrentUser, setCredentials } from "../features/auth/authSlice";

const Settings = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);

    // Profile State
    const [profileData, setProfileData] = useState({
        name: user?.name || "",
        email: user?.email || ""
    });

    // Password State
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [updateProfile, { isLoading: isProfileLoading }] = useUpdateProfileMutation();
    const [updatePassword, { isLoading: isPasswordLoading }] = useUpdatePasswordMutation();

    const [feedback, setFeedback] = useState({ type: null, message: "" });

    useEffect(() => {
        if (user) {
            setProfileData({ name: user.name, email: user.email });
        }
    }, [user]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await updateProfile(profileData).unwrap();
            dispatch(setCredentials({
                user: { ...user, ...result.user },
                token: localStorage.getItem('kartbuddy_token') // Keep existing token
            }));
            setFeedback({ type: 'success', message: "Profile updated successfully!" });
        } catch (err) {
            setFeedback({ type: 'error', message: err.data?.message || "Failed to update profile" });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setFeedback({ type: 'error', message: "New passwords do not match" });
            return;
        }
        try {
            await updatePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            }).unwrap();
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setFeedback({ type: 'success', message: "Password updated successfully!" });
        } catch (err) {
            setFeedback({ type: 'error', message: err.data?.message || "Failed to update password" });
        }
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-10 pb-12">
            <header className="px-1">
                <h2 className="text-2xl md:text-3xl font-extrabold text-brand-900 tracking-tight">Account Settings</h2>
                <p className="text-[10px] md:text-sm font-bold text-brand-400 mt-1 uppercase tracking-[0.1em]">Manage your profile and security credentials</p>
            </header>

            {feedback.message && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 animate-slide-in shadow-sm border ${feedback.type === 'success'
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                    : 'bg-rose-50 border-rose-100 text-rose-700'
                    }`}>
                    {feedback.type === 'success' ? <CheckCircle2 size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
                    <span className="text-xs md:text-sm font-bold">{feedback.message}</span>
                    <button
                        onClick={() => setFeedback({ type: null, message: "" })}
                        className="ml-auto text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
                {/* Profile Section */}
                <section className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-[0_10px_30px_rgba(15,40,84,0.03)] flex flex-col gap-6 md:gap-8 h-fit">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand-50 rounded-2xl text-brand-700 shrink-0">
                            <User size={22} />
                        </div>
                        <div>
                            <h3 className="text-base md:text-lg font-black text-brand-900 tracking-tight">Profile info</h3>
                            <p className="text-[10px] font-bold text-brand-400 uppercase tracking-wide mt-0.5">Basic Account Details</p>
                        </div>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-4 md:space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] md:text-[11px] font-black text-brand-900 uppercase tracking-widest px-1">Full Name</label>
                            <div className="relative group">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold text-brand-900 focus:bg-white focus:ring-4 focus:ring-brand-500/5 focus:border-brand-200 outline-none transition-all shadow-inner"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] md:text-[11px] font-black text-brand-900 uppercase tracking-widest px-1">Email Address</label>
                            <div className="relative group">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold text-brand-900 focus:bg-white focus:ring-4 focus:ring-brand-500/5 focus:border-brand-200 outline-none transition-all shadow-inner"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isProfileLoading}
                            className="w-full py-3.5 md:py-4 bg-brand-700 text-white rounded-2xl text-xs font-extrabold hover:bg-brand-900 transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-brand-200 disabled:opacity-50"
                        >
                            <Save size={18} />
                            {isProfileLoading ? "Saving..." : "Update Profile"}
                        </button>
                    </form>
                </section>

                {/* Security Section */}
                <section className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-[0_10px_30px_rgba(15,40,84,0.03)] flex flex-col gap-6 md:gap-8 h-fit">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 shrink-0">
                            <Shield size={22} />
                        </div>
                        <div>
                            <h3 className="text-base md:text-lg font-black text-brand-900 tracking-tight">Security</h3>
                            <p className="text-[10px] font-bold text-brand-400 uppercase tracking-wide mt-0.5">Updated Security Credentials</p>
                        </div>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4 md:space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] md:text-[11px] font-black text-brand-900 uppercase tracking-widest px-1">Current Password</label>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                                <input
                                    type={showPasswords.current ? "text" : "password"}
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    className="w-full pl-12 pr-12 py-3.5 md:py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold text-brand-900 focus:bg-white focus:ring-4 focus:ring-rose-500/5 focus:border-rose-200 outline-none transition-all shadow-inner"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500"
                                >
                                    {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] md:text-[11px] font-black text-brand-900 uppercase tracking-widest px-1">New Password</label>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type={showPasswords.new ? "text" : "password"}
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full pl-12 pr-12 py-3.5 md:py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold text-brand-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 outline-none transition-all shadow-inner"
                                    placeholder="New password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
                                >
                                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] md:text-[11px] font-black text-brand-900 uppercase tracking-widest px-1">Confirm New Password</label>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold text-brand-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 outline-none transition-all shadow-inner"
                                    placeholder="Confirm password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
                                >
                                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPasswordLoading}
                            className="w-full py-3.5 md:py-4 bg-rose-600 text-white rounded-2xl text-xs font-extrabold hover:bg-rose-700 transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-rose-200 disabled:opacity-50"
                        >
                            <Lock size={18} />
                            {isPasswordLoading ? "Updating..." : "Update password"}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Settings;
