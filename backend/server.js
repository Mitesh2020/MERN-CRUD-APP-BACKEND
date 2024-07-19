const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

app.use(cors());

dotenv.config();

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected successfully");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);

      console.log("running successfully at", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error : ", error);
  });

app.use("/api/user", userRoute);
