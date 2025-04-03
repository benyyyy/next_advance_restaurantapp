import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-5xl w-full flex flex-col md:flex-row">
        {/* Left Section - Contact Details */}
        <div className="md:w-1/2 p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-4">
            We are here to assist you! Feel free to contact us anytime.
          </p>
          <div className="mt-6">
            <p className="text-lg font-semibold text-gray-700">📍 Address:</p>
            <p className="text-gray-600">
             124 Contriverz pvt ltd,mohali ,Punjab,  India
            </p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-700">📞 Phone:</p>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-700">📧 Email:</p>
            <p className="text-gray-600">contact@restaurant.com</p>
          </div>
        </div>

        {/* Right Section - Google Map */}
        <div className="md:w-1/2 p-6">
          <iframe
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.2537169601155!2d76.68367717532253!3d30.711266986670193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fefaabdca956b%3A0xd58540d41c7211a7!2sContriverz!5e0!3m2!1sen!2sin!4v1743653005830!5m2!1sen!2sin"    
            width="100%"
            height="500"
            style={{ border: "0", borderRadius: "12px" }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
