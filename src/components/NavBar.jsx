import { Building2, Menu, X, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({
  activeSection = "",
  handleNavClick,
  mobileMenuOpen = false,
  setMobileMenuOpen = () => { },
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onNavClick = (key) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        handleNavClick?.(key);
      }, 50);
    } else {
      handleNavClick?.(key);
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { key: "home", label: "Home" },
    { key: "properties", label: "Properties" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl px-6 py-3 max-w-7xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="p-2 bg-brand-900 rounded-lg text-white group-hover:bg-brand-800 transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-brand-900">
                New Property <span className="text-brand-500">Enterprises</span>
              </span>
              <span className="text-xs text-brand-600">MAHARERA: A031242502948</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavClick(item.key)}
                className={`text-sm font-semibold transition-colors duration-200 hover:text-brand-500 ${activeSection === item.key
                    ? "text-brand-600"
                    : "text-slate-600"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-2 bg-white/95 backdrop-blur-lg border border-slate-100 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-1 p-2">
              {navLinks.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onNavClick(item.key)}
                  className={`flex w-full items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeSection === item.key
                      ? "bg-brand-50 text-brand-600"
                      : "text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
