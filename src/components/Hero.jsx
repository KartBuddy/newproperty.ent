const Hero = ({
  activeSection,
  heroImages,
  currentHero,
  handleNavClick,
  setShowAddForm,
}) => {
  if (activeSection !== "home") return null;

  return (
    <div
      className="relative w-full h-[80vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${heroImages[currentHero]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-full px-6 lg:px-12 xl:px-16 2xl:px-24 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 drop-shadow-lg">
          Find Your Dream Property
        </h2>
        <p className="text-base sm:text-lg lg:text-2xl xl:text-3xl mb-8 lg:mb-10 drop-shadow-md">
          Residential & Commercial Properties for Sale and Rent
        </p>
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => handleNavClick("properties")}
            className="bg-white text-white-600 px-8 lg:px-12 py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-base lg:text-lg xl:text-xl shadow-md"
          >
            Browse Properties
          </button>

          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-green-700 transition text-base lg:text-lg shadow-md"
          >
            + Add Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
