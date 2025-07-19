import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { Store } from "./store/Store.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <App />

        <ScrollToTop
          smooth
          component={<FaArrowUp size={20} />}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            borderRadius: "50%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            width: "45px",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            right: 20,
            bottom: 30,
          }}
        />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
