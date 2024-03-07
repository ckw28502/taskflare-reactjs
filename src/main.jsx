import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/landing pages/Login.jsx";
import LandingContainer from "./pages/landing pages/LandingContainer.jsx";
import { ToastContainer } from "react-toastify";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            <LandingContainer>
              <Login />
            </LandingContainer>
          }
        />
      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>,
);
