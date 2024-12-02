import React from "react";

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          Your trusted destination for premium auto parts and accessories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section - Textual Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            We are an e-commerce platform dedicated to providing high-quality
            auto parts and accessories. With years of experience in the
            automotive industry, we offer a comprehensive selection of products
            designed to keep your vehicle in top condition.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            From car batteries to suspension parts, we deliver reliable and
            affordable solutions for every car enthusiast and professional
            mechanic. We are passionate about delivering products that meet the
            highest standards of performance and safety.
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center items-center">
          <img
            src="https://via.placeholder.com/400x300.png?text=Auto+Parts+Image"
            alt="Auto Parts"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <div className="text-4xl text-blue-600 mb-4">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Quality Assurance
            </h3>
            <p className="text-lg text-gray-600">
              We ensure every product meets the highest industry standards for
              durability and performance.
            </p>
          </div>
          {/* Value 2 */}
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <div className="text-4xl text-green-600 mb-4">
              <i className="fas fa-truck"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Fast Delivery
            </h3>
            <p className="text-lg text-gray-600">
              With our efficient logistics, we provide fast shipping to ensure
              your parts arrive on time.
            </p>
          </div>
          {/* Value 3 */}
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <div className="text-4xl text-red-600 mb-4">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Customer Support
            </h3>
            <p className="text-lg text-gray-600">
              Our dedicated support team is here to help you with any queries or
              issues you may have.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
