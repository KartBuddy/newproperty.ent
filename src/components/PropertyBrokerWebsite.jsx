import React, { useState } from "react";
import { useGetPropertiesQuery } from "../features/api/apiSlice";
import {
  Building2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp,
} from "lucide-react";
import { data, Link, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Hero from "./Hero";
import PropertiesSection from "./PropertiesSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import AddPropertyForm from "./AddPropertyForm";
import Hero1 from "./Hero1";

const PropertyBrokerWebsite = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const {
    data: properties = [],
    isLoading,
    isError,
    refetch,
  } = useGetPropertiesQuery();
  console.log(properties);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city?.toLowerCase().includes(searchTerm.toLowerCase());

    // Mapping backend property_type/status to frontend filterType
    const matchesFilter =
      filterType === "all" ||
      (filterType === "sale" && property.status === "available") || // Temporary mapping
      (filterType === "rent" && property.status === "rented"); // Need to clarify this mapping

    return matchesSearch && matchesFilter;
  });

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);

    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-100 selection:text-brand-900">
      <Navbar
        {...{
          activeSection,
          handleNavClick,
          mobileMenuOpen,
          setMobileMenuOpen,
        }}
      />

      <main>
        {/* <Hero
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          setShowAddForm={setShowAddForm}
          propertyList={properties}
        /> */}
        <Hero1 />

        <PropertiesSection
          {...{
            activeSection,
            searchTerm,
            setSearchTerm,
            filterType,
            setFilterType,
            filteredProperties,
            navigate,
          }}
        />

        <AboutSection activeSection={activeSection} />

        <ContactSection activeSection={activeSection} />
      </main>

      {showAddForm && <AddPropertyForm onClose={() => setShowAddForm(false)} />}

      {/* Footer */}
      <footer className="bg-brand-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-4">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-brand-500 rounded-lg text-white">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tight">
                  New Property{" "}
                  <span className="text-brand-400">Enterprises</span>
                </span>
              </div>
              <p className="text-brand-200 font-medium leading-relaxed">
                The most trusted platform for premium real estate. We connect
                you with verified spaces that match your lifestyle and
                professional needs.
              </p>
              <div className="flex items-center gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-brand-800 rounded-xl flex items-center justify-center hover:bg-brand-500 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Platform</h4>
              <ul className="space-y-4 text-brand-200 font-medium">
                <li>
                  <button
                    onClick={() => handleNavClick("home")}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick("properties")}
                    className="hover:text-white transition-colors"
                  >
                    Browse Properties
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick("about")}
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick("contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact Support
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <Link to={"/admin"}>
                <h4 className="text-lg font-bold mb-8">Company</h4>
              </Link>
              <ul className="space-y-4 text-brand-200 font-medium">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Newsletter</h4>
              <p className="text-brand-200 font-medium mb-6">
                Stay updated with the latest premium listings and market
                insights.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-brand-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 placeholder:text-brand-400"
                />
                <button className="bg-brand-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-brand-400 transition-colors text-center">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-brand-400 text-sm font-medium">
              © 2025 KartBuddy Enterprises. Built for the modern market.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 text-brand-400 hover:text-white transition-colors font-bold text-sm"
            >
              Back to Top
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PropertyBrokerWebsite;
