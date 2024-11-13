// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/Login";
import Home from "./components/Home";

const App = () => {
  return (
    <Router> 
      <div className="flex min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<LoginRegister />} /> 
          <Route path="/" element={<Home />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
