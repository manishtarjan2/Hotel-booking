import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <div className="container">
            <h1>🏨 Hotel Booking</h1>
            <nav>
              {isAuthenticated && user && (
                <div>
                  <span>Welcome, {user.name}</span>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </nav>
          </div>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                user={user}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}