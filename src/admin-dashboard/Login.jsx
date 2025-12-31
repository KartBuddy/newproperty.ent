import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Building2, Loader2, AlertCircle } from "lucide-react";
import { useLoginMutation } from "../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const response = await login({ email, password }).unwrap();
            console.log(response);

            if (response.success) {
                dispatch(setCredentials({ user: response.user }));
                navigate("/admin/overview");
            }
        } catch (err) {
            console.error("Login failed:", err);
            setErrorMsg(err.data?.message || "Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-plus-jakarta">
            <div className="w-full max-w-md space-y-10 text-center">
                {/* Branding/Logo */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-700 flex items-center justify-center text-white shadow-xl shadow-brand-200">
                        <Building2 size={28} />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold text-brand-900 tracking-tight">Admin Portal</h1>
                        <p className="text-sm font-medium text-slate-400">
                            Secure access for KartBuddy administrators.
                        </p>
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6 text-left">
                    {errorMsg && (
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium text-red-600 leading-relaxed">{errorMsg}</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-widest ml-1">Email</label>
                        <input
                            type="email"
                            required
                            disabled={isLoading}
                            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-slate-300 shadow-sm disabled:opacity-60 disabled:bg-slate-50"
                            placeholder="admin@kartbuddy.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative group">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                disabled={isLoading}
                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-slate-300 shadow-sm disabled:opacity-60 disabled:bg-slate-50"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand-700 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-700 focus:ring-brand-500 transition-all" />
                            <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Remember Me</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-brand-700 text-white rounded-2xl text-sm font-extrabold shadow-xl shadow-brand-200 hover:bg-brand-900 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Validating...
                            </>
                        ) : (
                            "Sign In to Dashboard"
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-xs font-bold text-slate-400 border-t border-slate-100 pt-8">
                    &copy; 2025 KartBuddy logistics pvt. ltd. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
