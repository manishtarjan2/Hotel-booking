const router = require("express").Router();
const Hotel = require("../models/Hotel");

// Get all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// Get hotel by ID
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hotel" });
  }
});

// Add new hotel
router.post("/", async (req, res) => {
  try {
    const { name, location, price, description, image } = req.body;

    // Validation
    if (!name || !location || !price) {
      return res.status(400).json({ error: "Name, location, and price are required" });
    }

    const newHotel = new Hotel({
      name,
      location,
      price,
      description,
      image
    });

    await newHotel.save();
    res.status(201).json({ message: "Hotel added successfully", hotel: newHotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add hotel" });
  }
});

module.exports = router;