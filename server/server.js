const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRouter");
const assignmentRoutes = require("./routes/assignmentRoutes");
const courseRoutes = require("./routes/courseRoutes"); 
const userRoutes = require("./routes/userRoutes");
const reminderRoutes = require("./routes/reminderRoutes"); 

dotenv.config();
const app = express();

// ✅ ALLOW BOTH LOCALHOST & VERCEL FRONTEND
const allowedOrigins = [
  "http://localhost:3000",
  "https://discuz-bgb2-ot4a4dl9e-bhumis-projects-ef39fb6d.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/dashboard", dashboardRoutes); 
app.use("/api/reminders", reminderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Mongo error:", err));
