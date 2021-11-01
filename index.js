const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to database");
    app.emit("connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(routes);
app.on("connected", () => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000: http://localhost:3000");
  });
});
