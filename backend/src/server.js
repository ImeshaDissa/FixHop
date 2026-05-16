require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const jobRoutes = require("./routes/jobs");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/jobs", jobRoutes);

//health
app.get("/", (req, res) => {
  res.json({ message: "FixHop API is running" });
});

//404-unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

//error handler...global
app.use(errorHandler);

//conn 
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

module.exports = app; //for tests
