const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const { db } = require("./src/config/db_config");
const {userRoutes} = require("./src/routes/user_routes")

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  next();
});

mongoose
  .connect(db.mongoDbUrl)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.log("Oops1 Connection failed!", error);
  });

app.get("/", (req, res) => {
  res.set("content-type", "text/html");
  res
    .status(200)
    .send("<h1 style='text-align: center'>The application is running!</h1>");
});

userRoutes(app);

app.listen(port, () => {
  console.log(`App is running in port ${port}`);
});
