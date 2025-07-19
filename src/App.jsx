import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";

import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import ProtectRoute from "./ProtectedRoute/ProtectRoute";
import useGeoLocation from "./hooks/useGeoLocation";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

// Lazy-loaded routes
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Product = lazy(() => import("./pages/Product"));
const Contact = lazy(() => import("./pages/Contact"));
const Error = lazy(() => import("./pages/Error"));
const Card = lazy(() => import("./pages/Card"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const LoginForm = lazy(() => import("./auth/LoginForm"));
const RegistrationForm = lazy(() => import("./auth/RegistrationForm"));

function App() {
  const [dropdown, setDropdown] = useState(false);
  const routerLocation = useLocation();
  const hideLayoutPaths = ["/login", "/register"];
  const shouldHideLayout = hideLayoutPaths.includes(routerLocation.pathname);

  const { location, getLocation } = useGeoLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      {!shouldHideLayout && (
        <Navbar
          location={location}
          dropdown={dropdown}
          setDropdown={setDropdown}
          getLocation={getLocation}
        />
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<Error />} />

          <Route element={<ProtectRoute />}>
            <Route
              path="/card"
              element={<Card location={location} getLocation={getLocation} />}
            />
          </Route>
        </Routes>
      </Suspense>

      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
