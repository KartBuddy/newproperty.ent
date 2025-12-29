import React from "react";
import { Phone, Mail, MapPin, Send, MessageSquare } from "lucide-react";

const ContactSection = ({ activeSection }) => {
  if (activeSection !== "contact") return null;

  return (
    <section className="bg-slate-50 py-24" id="contact">
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
            <div className="p-12 lg:p-20 bg-white">
              <h3 className="text-3xl font-extrabold text-brand-900 tracking-tight mb-8">
                Send a Message
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Courtney Henry"
                      className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-brand-900 font-medium placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="courtney@example.com"
                      className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-brand-900 font-medium placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1">Property Interest</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-brand-900 font-medium appearance-none">
                    <option>Residential Sale</option>
                    <option>Commercial Lease</option>
                    <option>Property Management</option>
                    <option>Investment Advice</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1">Your Message</label>
                  <textarea
                    placeholder="Tell us about what you're looking for..."
                    rows="4"
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-brand-900 font-medium placeholder:text-slate-300 resize-none"
                  />
                </div>

                <button className="w-full flex items-center justify-center gap-3 bg-brand-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-800 transition-all active:scale-95 shadow-xl shadow-brand-900/10 group">
                  Send Inquiry
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
