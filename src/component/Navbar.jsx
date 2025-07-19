import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { FaSortDown, FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { replaceState } from "../store/StoreSlice";

const Navbar = ({ location, dropdown, setDropdown, getLocation }) => {
  const product = useSelector((state) => state.cart);
  const [user, setUser] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.email || user?.phoneNumber || "guest";
    const cart = JSON.parse(localStorage.getItem(`cartItems_${userId}`)) || [];
    dispatch(replaceState(cart));
  }, []);

  const removeData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.email || user?.phoneNumber;
    if (userId) {
      // localStorage.removeItem(`cartItems_${userId}`);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMobileMenu(false);
    toast.success("Logout Success!");
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-3xl">
            <span className="text-red-600 font-serif">S</span>tore
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 font-semibold">
          {["/", "/products", "/about", "/contact"].map((path, idx) => {
            const labels = ["Home", "Products", "About", "Contact"];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${
                    isActive ? "border-b-2 border-red-500" : "text-gray-700"
                  } hover:text-red-500 transition`
                }
              >
                {labels[idx]}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-6">
          <div className="relative hidden md:flex items-center gap-2 text-sm">
            <FaLocationDot className="text-red-500" />
            <div>
              {location ? (
                <div className="-space-y-1">
                  <p>{location.state_district}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                <span className="text-gray-400 italic">Detect Location</span>
              )}
            </div>
            <FaSortDown
              onClick={toggleDropdown}
              className="cursor-pointer"
              aria-label="Toggle location dropdown"
            />
            {dropdown && (
              <div className="absolute top-14 right-0 w-64 bg-white border p-5 rounded shadow-lg z-50">
                <div className="flex justify-between items-center mb-3">
                  <h1 className="font-semibold text-lg">Change Location</h1>
                  <IoMdClose
                    onClick={toggleDropdown}
                    className="cursor-pointer text-gray-600"
                  />
                </div>
                <button
                  onClick={getLocation}
                  className="bg-red-500  text-center text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Detect location
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/card" className="relative">
            <FiShoppingCart size={26} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {product.length}
            </span>
          </Link>

          {/* Auth Button (Desktop) */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <p className="text-sm font-semibold">
                {user.email || user.phoneNumber || user.displayName}
              </p>

              <button
                onClick={removeData}
                className="w-full btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-red-600  hover:bg-white group py-1.5 px-2.5"
              >
                <span className="w-56 h-48  bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-center text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-red-600  hover:bg-white group py-1.5 px-2.5"
            >
              <span className="w-56 h-48  bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-center text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign In
              </span>
            </button>
          )}

          {/* Hamburger Icon (Mobile) */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileMenu(true)}
          >
            <HiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col justify-between h-full">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FaUserCircle className="text-3xl text-gray-600" />
                <div>
                  <p className="text-sm font-semibold">Welcome,</p>
                  <p className="text-xs text-gray-500">
                    {user
                      ? user.email || user.phoneNumber || user.displayName
                      : "Guest"}
                  </p>
                </div>
              </div>
              <IoMdClose
                size={24}
                className="cursor-pointer"
                onClick={() => setMobileMenu(false)}
              />
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-4 text-base font-medium">
              <NavLink to="/" onClick={() => setMobileMenu(false)}>
                Home
              </NavLink>
              <NavLink to="/products" onClick={() => setMobileMenu(false)}>
                Products
              </NavLink>
              <NavLink to="/about" onClick={() => setMobileMenu(false)}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setMobileMenu(false)}>
                Contact
              </NavLink>
            </nav>

            {/* Auth Buttons */}
            <div className="mt-6">
              {user ? (
                <button
                  onClick={removeData}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenu(false);
                  }}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-4">
            Made by Badshah
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
