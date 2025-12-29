import React from "react";
import { ShieldCheck, Zap, Globe, Heart, Award, Clock, Mail, Linkedin, Twitter } from "lucide-react";

const AboutSection = ({ activeSection }) => {
  if (activeSection !== "about") return null;

  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Listings",
      description: "Every property on our platform undergoes a rigorous 4-step verification process to ensure transparency and trust.",
    },
    {
      icon: Zap,
      title: "Instant Virtual Tours",
      description: "Experience properties from the comfort of your home with our high-definition 3D virtual walkthroughs.",
    },
    {
      icon: Globe,
      title: "Global Search",
      description: "Access premium inventory across the country with smart filters tailored to your unique lifestyle needs.",
    },
    {
      icon: Award,
      title: "Expert Consulting",
      description: "Our certified real estate advisors provide data-backed insights to help you make informed investment decisions.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Dedicated account managers available around the clock to assist you with inquiries and paperwork.",
    },
    {
      icon: Heart,
      title: "Client-First Approach",
      description: "We don't just find houses; we find homes. Your satisfaction and peace of mind are our top priorities.",
    },
  ];

  const teamMembers = [
    {
      name: "Jonathan Richards",
      role: "Founder & Lead Broker",
      bio: "With over 15 years of dedicated experience in the premium real estate market, Jonathan has facilitated over $500M in property transactions.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Sarah Chen",
      role: "Head of Operations",
      bio: "Sarah brings a wealth of strategic management experience, ensuring every client's journey from search to closing is seamless.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Marcus Thompson",
      role: "Senior Investment Advisor",
      bio: "A specialist in high-yield property portfolios, Marcus helps our clients identify the most lucrative opportunities in the market.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <section className="bg-white py-24 overflow-hidden" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-block bg-brand-50 px-4 py-1.5 rounded-full text-brand-600 text-[10px] font-black uppercase tracking-widest mb-6">
            Our Legacy & Vision
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-900 tracking-tight leading-tight mb-6">
            15 Years of <span className="text-brand-500">Unmatched Expertise</span> in Real Estate
          </h2>
          <p className="text-slate-600 font-medium text-lg leading-relaxed">
            Founded by industry veterans with a combined 15 years of experience, KartBuddy stands as a beacon of trust and innovation. We bridge the gap between traditional reliability and modern technology to deliver a sophisticated property acquisition experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[2rem] border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:bg-brand-900 group-hover:text-white transition-all duration-300">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-brand-900 mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 p-12 bg-brand-900 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
            <div>
              <div className="text-4xl font-black text-white mb-2">15+</div>
              <div className="text-brand-300 text-[10px] font-extrabold uppercase tracking-widest">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-2">10k+</div>
              <div className="text-brand-300 text-[10px] font-extrabold uppercase tracking-widest">Properties List</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-2">2.5k</div>
              <div className="text-brand-300 text-[10px] font-extrabold uppercase tracking-widest">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-2">98%</div>
              <div className="text-brand-300 text-[10px] font-extrabold uppercase tracking-widest">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-4">Meet Our Strategic Team</h2>
            <p className="text-slate-500 font-medium">The dedicated professionals driving innovation and excellence in every property transaction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-[2.5rem] mb-6 aspect-[4/5] bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 gap-4">
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-500 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-500 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-500 transition-colors">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-brand-900 mb-1">{member.name}</h3>
                <p className="text-brand-500 font-bold text-sm uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-slate-500 font-medium leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
