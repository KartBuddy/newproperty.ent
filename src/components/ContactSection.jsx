import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useSubmitContactMutation } from "../features/api/apiSlice";
import SetPropertyFeatures from "./SetPropertyFeatures";

const ContactSection = ({ activeSection }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Residential Sale",
    message: ""
  });

  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  if (activeSection !== "contact") return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitContact(formData).unwrap();
      setToast({ show: true, message: response.message, type: "success" });
      setFormData({ name: "", email: "", phone: "", subject: "Residential Sale", message: "" });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 5000);
    } catch (err) {
      setToast({ show: true, message: err.data?.message || "Something went wrong. Please try again.", type: "error" });
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 5000);
    }
  };

  return (
    <section className="bg-slate-50 py-24 relative overflow-hidden" id="contact">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-24 right-4 z-[100] animate-in slide-in-from-right duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${toast.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-rose-50 border-rose-100 text-rose-700"
            }`}>
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <p className="text-sm font-black tracking-tight">{toast.message}</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info Column */}
            <div className="bg-brand-900 p-12 lg:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-200/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-brand-800/50 px-3 py-1 rounded-full mb-8 border border-brand-700">
                  <MessageSquare className="w-4 h-4 text-brand-300" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-100">Ready to assist</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                  Let's find your <span className="text-brand-300">dream</span> property.
                </h2>

                <p className="text-brand-200 font-medium text-lg mb-12 leading-relaxed">
                  Our dedicated team of advisors is standing by to help you navigate the market with confidence. Reach out today.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-brand-800 rounded-2xl flex items-center justify-center group-hover:bg-brand-700 transition-colors">
                      <Phone className="w-6 h-6 text-brand-300" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-brand-400 uppercase tracking-widest mb-1">Call Us Anywhere</div>
                      <div className="text-xl font-bold">+91 98765 43210</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-brand-800 rounded-2xl flex items-center justify-center group-hover:bg-brand-700 transition-colors">
                      <Mail className="w-6 h-6 text-brand-300" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-brand-400 uppercase tracking-widest mb-1">Email us at</div>
                      <div className="text-xl font-bold">hello@kartbuddy.com</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-brand-800 rounded-2xl flex items-center justify-center group-hover:bg-brand-700 transition-colors">
                      <MapPin className="w-6 h-6 text-brand-300" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-brand-400 uppercase tracking-widest mb-1">Visit our office</div>
                      <div className="text-xl font-bold">Hiranandani Estate, Thane</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <form onSubmit={handleSubmit} className="p-12 lg:p-20 bg-white">
              <h3 className="text-3xl font-extrabold text-brand-900 tracking-tight mb-8">
                Send a Message
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Courtney Henry"
                      className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-brand-900 font-medium placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="courtney@example.com"
                      className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-brand-900 font-medium placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-brand-900 font-medium placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1">Property Interest</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-brand-900 font-medium appearance-none outline-none"
                  >
                    <option>Residential Sale</option>
                    <option>Commercial Lease</option>
                    <option>Property Management</option>
                    <option>Investment Advice</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1">Your Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about what you're looking for..."
                    rows="4"
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-brand-900 font-medium placeholder:text-slate-300 resize-none"
                  />
                </div>

                <button
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-brand-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-800 transition-all active:scale-95 shadow-xl shadow-brand-900/10 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      Sending Message...
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                <SetPropertyFeatures />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
