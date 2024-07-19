const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
//const port = process.env.PORT || 4000;

const allowedOrigins = ['https://mern-crud-app-frontend-khaki.vercel.app/', 'https://mern-crud-app-backend-d0aq.onrender.com'];
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  credentials: true // Required for sending cookies across domains (if applicable)
};
app.use(cors(corsOptions)); // Apply CORS middleware with options

//app.use(cors());

dotenv.config();

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected successfully");
    app.listen((err) => {
      if (err) console.log(err);

      //console.log("running successfully at", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error : ", error);
  });

app.use("", userRoute);
