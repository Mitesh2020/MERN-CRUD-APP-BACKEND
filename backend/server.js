const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

// Consider using a process manager like PM2 for production (optional)
const port = process.env.PORT || 4000;

// CORS configuration (optional)
const allowedOrigins = ['https://mern-crud-app-frontend-khaki.vercel.app', 'https://mern-crud-app-backend-capv.onrender.com'];
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  credentials: true // Required for sending cookies across domains (if applicable)
};
app.use(cors(corsOptions)); // Apply CORS middleware with options

dotenv.config();

// Mongoose connection with proper error handling
mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    // Optional: Exit the process on connection failure (consider retries in production)
    process.exit(1);
  });

app.use("", userRoute); // Mount user route at the root path
