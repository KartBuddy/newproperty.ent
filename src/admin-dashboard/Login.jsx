import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Building2 } from "lucide-react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login and redirect to dashboard
        navigate("/admin/overview");
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
                        <h1 className="text-4xl font-extrabold text-brand-900 tracking-tight">Welcome Back</h1>
                        <p className="text-sm font-medium text-slate-400">
                            Enter your email and password to access your account.
                        </p>
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6 text-left">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-widest ml-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-slate-300 shadow-sm"
                            placeholder="sellostore@company.com"
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
                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-slate-300 shadow-sm"
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
                        <button type="button" className="text-xs font-bold text-brand-700 hover:text-brand-900 transition-colors">
                            Forgot Your Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-brand-700 text-white rounded-2xl text-sm font-extrabold shadow-xl shadow-brand-200 hover:bg-brand-900 transition-all transform active:scale-[0.98]"
                    >
                        Log In
                    </button>
                </form>

                {/* Or Login With */}
                <div className="space-y-6">
                    <div className="relative flex items-center justify-center">
                        <div className="w-full border-t border-slate-100"></div>
                        <span className="absolute px-4 bg-white text-[10px] font-bold text-slate-300 uppercase tracking-widest">Or Login With</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5 object-contain" alt="Google" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-4 h-4 object-contain" alt="Apple" />
                            Apple
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-xs font-bold text-slate-400">
                    Don't Have An Account? <button className="text-brand-700 hover:text-brand-900 transition-colors">Register Now.</button>
                </p>
            </div>
        </div>
    );
};

export default Login;
