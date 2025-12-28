import React from "react";
import { Building2, Menu, X } from "lucide-react";

const Navbar = ({
  activeSection,
  handleNavClick,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="w-full max-w-full px-6 lg:px-12 xl:px-16 2xl:px-24 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              New Property Enterprises
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            {[
              { key: "home", label: "Home" },
              { key: "properties", label: "Property" },
              { key: "about", label: "About Us" },
              { key: "contact", label: "Contact Us" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm lg:text-base transition whitespace-nowrap ${
                  activeSection === item.key
                    ? "bg-black text-white shadow-md"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-gray-900 text-white p-2 rounded-xl"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            {[
              { key: "home", label: "Home" },
              { key: "properties", label: "Property" },
              { key: "about", label: "About Us" },
              { key: "contact", label: "Contact Us" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`block w-full text-left px-5 py-3 rounded-xl font-semibold transition ${
                  activeSection === item.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
