import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600">
          We're here to assist you with all your auto parts needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section - Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Send us a Message
          </h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Section - Contact Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Our Contact Info
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Have questions? We’re here to help! Feel free to reach out to us
            directly.
          </p>

          <div className="flex items-center mb-4">
            <i className="fas fa-phone-alt text-blue-600 mr-4 text-2xl"></i>
            <p className="text-lg text-gray-800">+1 800 123 4567</p>
          </div>
          <div className="flex items-center mb-4">
            <i className="fas fa-envelope text-blue-600 mr-4 text-2xl"></i>
            <p className="text-lg text-gray-800">support@autopartsstore.com</p>
          </div>
          <div className="flex items-center mb-4">
            <i className="fas fa-map-marker-alt text-blue-600 mr-4 text-2xl"></i>
            <p className="text-lg text-gray-800">
              123 Auto St., Car City, CA 90001
            </p>
          </div>

          {/* Optional Map Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Visit Our Store
            </h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.432737426784!2d144.95373631566592!3d-37.81627977975172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d7d7c0c68e5%3A0x6bcd66ec31fc58e5!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1611774297633!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Store Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
