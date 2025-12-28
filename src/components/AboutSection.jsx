import { Award } from "lucide-react";

const AboutSection = ({ activeSection }) => {
  if (activeSection !== "about") return null;

  return (
    <div className="w-full max-w-full px-6 lg:px-12 xl:px-16 2xl:px-24 py-8 lg:py-20">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-8 lg:mb-12">
          About Us
        </h2>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div>
            <div className="flex items-center mb-4 lg:mb-6">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mr-3 sm:mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  15 Years of Excellence
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Trusted Property Broker
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
              Welcome to our property brokerage firm! With 15 years of dedicated
              experience in the real estate industry, I have built a reputation
              as a trusted property broker specializing in both sales and
              rentals across residential and commercial sectors.
            </p>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
              Over the past 15 years, I have successfully facilitated hundreds
              of property transactions, helping families find their dream homes
              and businesses secure ideal commercial spaces.
            </p>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
              Whether you're looking to buy, sell, or rent residential
              properties like flats, bungalows, and penthouses, or commercial
              spaces such as offices, shops, and warehouses, my extensive market
              knowledge and strong network ensure you get the best deals at
              competitive prices.
            </p>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              My 15 years of experience have taught me that every client has
              unique requirements. I pride myself on providing personalized
              service, honest advice, and complete transparency throughout the
              property transaction process.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                Our Services
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700">
                <li>✓ Residential Property Sales</li>
                <li>✓ Commercial Property Sales</li>
                <li>✓ Residential Rentals</li>
                <li>✓ Commercial Rentals</li>
                <li>✓ Property Management</li>
                <li>✓ Investment Consultation</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                Why Choose Us
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700">
                <li>✓ 15+ Years Experience</li>
                <li>✓ 500+ Happy Clients</li>
                <li>✓ Local Market Expertise</li>
                <li>✓ Transparent Dealings</li>
                <li>✓ End-to-End Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
