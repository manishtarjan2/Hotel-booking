const router = require("express").Router();
const Booking = require("../models/Booking");

// Create booking
router.post("/", async (req, res) => {
  try {
    const { userId, hotelId, checkInDate, checkOutDate, guestCount } = req.body;

    // Validation
    if (!userId || !hotelId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ error: "All booking fields are required" });
    }

    const newBooking = new Booking({
      userId,
      hotelId,
      checkInDate,
      checkOutDate,
      guestCount: guestCount || 1,
      bookingDate: new Date()
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Get bookings by user
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

module.exports = router;