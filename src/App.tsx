import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
// Import your components/pages here
import { Home } from "./components/Home";
import { NotFound } from "./components/NotFound";
import { MealForm } from "./components/MealForm/MealForm";
import dietIcon from "./dietaManzana.png";
import Dashboard from "./components/DashBoard/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="top-bar">
          <img src={dietIcon} alt="Diet Icon" className="title-icon" />
          <h1 className="title">
            <a href="http://localhost:3001/"></a>Diet Wizard
          </h1>
        </div>
        <div className="content-container">
          <div className="sidebar">
            <Link to="/Dashboard" className="sidebar-link">
              Meal
            </Link>
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/MealForm" element={<MealForm />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    </Router>
  );
};

export default App;
