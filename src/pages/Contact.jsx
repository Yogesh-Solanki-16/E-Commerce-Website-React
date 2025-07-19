import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "@formspree/react";
const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;

const Contact = () => {
  const [location, setLocation] = useState(null);
  const [state, handleSubmit] = useForm(formId);
  const formRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (err) => {
        console.error("Location Error:", err.message);
      }
    );
  }, []);

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Thanks for joining!");
      formRef.current?.reset();
    }
  }, [state.succeeded]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
          Get in Touch with <span className="text-red-400">Store</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="text-white space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Contact Info</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Have a question or need support? We're here to help you with
                your electronics journey.
              </p>
            </div>
            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <strong>Address:</strong> Ahmedabad, Gujarat, India
              </p>
              <p>
                <strong>Email:</strong> badshah@store.com
              </p>
              <p>
                <strong>Phone:</strong> +91 98798 71016
              </p>
            </div>

            {/* Map Embed */}
            {location && (
              <div
                data-aos="zoom-in-down"
                className="rounded-xl overflow-hidden border mt-6"
              >
                <iframe
                  title="Your Location"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
                ></iframe>
              </div>
            )}
          </div>

          {/* Form */}
          <form
            data-aos="zoom-in-left"
            className="space-y-5"
            action={`https://formspree.io/f/${formId}`}
            method="POST"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div>
              <label className="block text-white mb-1 text-sm">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-1 text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-1 text-sm">
                Your Message
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition duration-300 text-sm sm:text-base"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
