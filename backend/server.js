const connectDatabase = require("./config/db");
const express = require("express");
const bodyparser = require("body-parser");

var cors = require("cors");
const app = express();

//allow all to requst domain

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/images", express.static("images"));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

// for check apis
app.get("/api", async (req, res) => {
  try {
    res.send("API is working");
  } catch (error) {
    console.log(error);
  }
});

//setting up config file
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
//cennectting to mongodb
connectDatabase();
app.listen(process.env.PORT, () => {
  console.log(
    `backend listening at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
