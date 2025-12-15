import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function Home({ isAuthenticated, setIsAuthenticated, user, setUser }) {
  const [activeTab, setActiveTab] = useState("hotels"); // hotels, login, register, bookings
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [bookingData, setBookingData] = useState({
    hotelId: "",
    checkInDate: "",
    checkOutDate: "",
    guestCount: 1,
  });

  // Fetch hotels on component mount
  useEffect(() => {
    fetchHotels();
  }, []);

  // Fetch bookings when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchBookings();
    }
  }, [isAuthenticated, user]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/hotels`);
      setHotels(response.data);
    } catch (error) {
      showAlert("Failed to load hotels", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/bookings/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to load bookings:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, loginData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      setIsAuthenticated(true);
      setLoginData({ email: "", password: "" });
      setActiveTab("hotels");
      showAlert("Login successful!", "success");
    } catch (error) {
      showAlert(error.response?.data?.error || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/register`, registerData);
      setRegisterData({ name: "", email: "", password: "" });
      showAlert("Registration successful! Please login.", "success");
      setActiveTab("login");
    } catch (error) {
      showAlert(error.response?.data?.error || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setActiveTab("login");
      showAlert("Please login to make a booking", "error");
      return;
    }

    try {
      setLoading(true);
      const bookingPayload = {
        ...bookingData,
        hotelId: bookingData.hotelId,
        userId: user.id,
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/bookings`, bookingPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookingData({
        hotelId: "",
        checkInDate: "",
        checkOutDate: "",
        guestCount: 1,
      });
      showAlert("Booking created successfully!", "success");
      fetchBookings();
      setActiveTab("bookings");
    } catch (error) {
      showAlert(error.response?.data?.error || "Booking failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="content">
      {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "hotels" ? "active" : ""}`}
          onClick={() => setActiveTab("hotels")}
        >
          🏨 Hotels
        </button>
        {isAuthenticated ? (
          <>
            <button
              className={`tab-btn ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => setActiveTab("bookings")}
            >
              📅 My Bookings
            </button>
            <button
              className={`tab-btn ${activeTab === "booking-form" ? "active" : ""}`}
              onClick={() => setActiveTab("booking-form")}
            >
              ➕ New Booking
            </button>
          </>
        ) : (
          <>
            <button
              className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              🔐 Login
            </button>
            <button
              className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              📝 Register
            </button>
          </>
        )}
      </div>

      {/* Hotels List */}
      {activeTab === "hotels" && (
        <div>
          <h2>Available Hotels</h2>
          {loading ? (
            <p>Loading hotels...</p>
          ) : (
            <div className="hotels-grid">
              {hotels && hotels.length > 0 ? (
                hotels.map((hotel) => (
                  <div key={hotel._id} className="hotel-card">
                    {hotel.image && <img src={hotel.image} alt={hotel.name} />}
                    <div className="hotel-info">
                      <h3>{hotel.name}</h3>
                      <div className="hotel-location">📍 {hotel.location}</div>
                      <div className="hotel-rating">⭐ {hotel.rating || 4.5}</div>
                      <div className="hotel-price">${hotel.price}</div>
                      {hotel.description && <div className="hotel-description">{hotel.description}</div>}
                      <button
                        className="button"
                        onClick={() => {
                          setBookingData({ ...bookingData, hotelId: hotel._id });
                          setActiveTab("booking-form");
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hotels available</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Login Form */}
      {activeTab === "login" && !isAuthenticated && (
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      )}

      {/* Register Form */}
      {activeTab === "register" && !isAuthenticated && (
        <div className="form-container">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>
            <button type="submit" className="button" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      )}

      {/* Booking Form */}
      {activeTab === "booking-form" && isAuthenticated && (
        <div className="form-container">
          <h2>Create a Booking</h2>
          <form onSubmit={handleBooking}>
            <div className="form-group">
              <label>Hotel</label>
              <select
                value={bookingData.hotelId}
                onChange={(e) =>
                  setBookingData({ ...bookingData, hotelId: e.target.value })
                }
                required
              >
                <option value="">Select a hotel</option>
                {hotels.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name} - ${hotel.price}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                value={bookingData.checkInDate}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    checkInDate: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                value={bookingData.checkOutDate}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    checkOutDate: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Number of Guests</label>
              <input
                type="number"
                min="1"
                value={bookingData.guestCount}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    guestCount: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <button type="submit" className="button" disabled={loading}>
              {loading ? "Creating booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      )}

      {/* My Bookings */}
      {activeTab === "bookings" && isAuthenticated && (
        <div>
          <h2>My Bookings</h2>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <div className="hotels-grid">
              {bookings.map((booking) => (
                <div key={booking._id} className="hotel-card">
                  <div className="hotel-info">
                    <h3>Booking #{booking._id.slice(-6)}</h3>
                    <div className="hotel-location">
                      📅 {new Date(booking.checkInDate).toLocaleDateString()} to{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </div>
                    <div className="hotel-price">
                      {booking.guestCount} Guest{booking.guestCount > 1 ? "s" : ""}
                    </div>
                    <div className="hotel-description">
                      Status:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}