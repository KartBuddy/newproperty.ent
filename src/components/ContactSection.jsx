import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = ({ activeSection }) => {
  if (activeSection !== "contact") return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-8 lg:mb-12 text-center">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Get in Touch
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Have questions? We're here to help you find the perfect property.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base text-gray-800">
                    Phone
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base text-gray-800">
                    Email
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    info@eliteproperties.com
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm sm:text-base text-gray-800">
                    Address
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Thane, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <button className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
