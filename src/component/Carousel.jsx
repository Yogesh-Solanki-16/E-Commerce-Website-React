import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/img4.jpg"; // Make sure the image exists

const Carousel = () => {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-12 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-snug text-white drop-shadow-xl">
          Welcome to <span className="text-red-600">Badshah Store</span>
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-white drop-shadow-lg">
          Discover premium quality products at unbeatable prices.
        </p>

        <Link to="/products">
          <button className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300">
            Start Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Carousel;
