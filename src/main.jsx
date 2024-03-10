import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/landing pages/Login.jsx";
import LandingContainer from "./pages/landing pages/LandingContainer.jsx";
import { ToastContainer } from "react-toastify";
import Register from "./pages/landing pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route 
          path="/login" 
          element={
            <LandingContainer>
              <Login />
            </LandingContainer>
          }
        />
        <Route 
          path="/register" 
          element={
            <LandingContainer>
              <Register />
            </LandingContainer>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>,
);
