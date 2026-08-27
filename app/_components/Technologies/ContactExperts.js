"use client"
import React from "react";

const ContactExperts = () => {
  return (
    <section className="w-full bg-[#1d1d1d] py-20 px-6">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE FORM */}
        <div>
          <button className="bg-[#1DB954] text-white px-5 py-2 rounded text-sm font-semibold mb-6">
            ● Technology Services
          </button>

          <h2 className="text-white text-4xl font-bold mb-10">
            Contact With <span className="text-[#1DB954]">Experties</span>
          </h2>

          <form className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="bg-transparent border-b border-gray-500 text-white outline-none py-2"
              />

              <input
                type="text"
                placeholder="Phone"
                className="bg-transparent border-b border-gray-500 text-white outline-none py-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border-b border-gray-500 text-white outline-none py-2"
              />

              <input
                type="text"
                placeholder="Subject"
                className="bg-transparent border-b border-gray-500 text-white outline-none py-2"
              />
            </div>

            <textarea
              placeholder="Message"
              rows="4"
              className="w-full bg-transparent border-b border-gray-500 text-white outline-none py-2"
            ></textarea>

            <button className="w-full bg-[#1DB954] hover:bg-green-600 text-white py-3 font-semibold transition">
              Send Message
            </button>

          </form>
        </div>


        {/* RIGHT SIDE MAP */}
        <div className="w-full h-[450px] rounded overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps?q=Dubai&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default ContactExperts;