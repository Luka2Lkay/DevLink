require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();

const { db } = require("./src/config/db_config");
const { userRoutes } = require("./src/routes/user_routes");
const { projectRoutes } = require("./src/routes/project_routes");
const { inviteRoutes } = require("./src/routes/invite_routes");

app.use(
  cors({
    origin: "https://super-duper-robot-9q5jrvq5vjjhp96q-5173.app.github.dev",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(db.mongoDbUrl)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("MongoDB connection closed. Exiting...");
  process.exit(0);
});

app.get("/", (req, res) => {
  res
    .type("html")
    .status(200)
    .send("<h1 style='text-align: center'>The application is running!</h1>");
});

userRoutes(app);
projectRoutes(app);
inviteRoutes(app);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
