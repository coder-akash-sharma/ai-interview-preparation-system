 const interviewRoutes = require("./routes/interviewRoutes");
 const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ==========================================
// CONFIG
// ==========================================

const connectDB = require("./config/db");

// ==========================================
// ROUTES
// ==========================================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");


// ==========================================
// APP
// ==========================================

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// DATABASE
// ==========================================

connectDB();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

// ==========================================
// SERVE UPLOADED FILES
// ==========================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ==========================================
// API ROUTES
// ==========================================

// Authentication
app.use("/api/auth", authRoutes);

// User
app.use("/api/user", userRoutes);

// Resume
app.use("/api/resume", resumeRoutes);

// Interview
app.use("/api/interview", interviewRoutes);

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "AI Interview Backend is running 🚀",
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});