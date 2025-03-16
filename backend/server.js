require("dotenv").config();
const { sequelize } = require("./models");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");

require("dotenv").config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

// app.get("/", (req, res) => {
//   res.send("<h1>Home Page</h1>");
//   // res.render("index");
// });

// app.post("/register", (req, res) => {
//   const sql =
//     "INSERT INTO Login(`username`, `email`, `phone`, `password`) Values (?)";
//   const values = [
//     req.body.username,
//     req.body.email,
//     req.body.phone,
//     req.body.password,
//   ];
// });

// const checkConnection = async () => {
//   console.log("Checking database connection...");
// };

// const createAllTable = async () => {
//   console.log("Creating all tables...");
// };

app.listen(SERVER_PORT, async (req, res) => {
  console.log(`App is listening on PORT ${SERVER_PORT}`);
  try {
    // await checkConnection();
    // await createAllTable();
  } catch (error) {
    console.log("Failed to initialize the database", error);
    process.exit(1);
  }
});

// app.listen(5001, () => {
//   console.log("server started");
// });

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Database synced");
//     app.listen(8081, () => console.log("App is listening on PORT 8081"));
//   })
//   .catch((err) => console.error("Database connection failed:", err));
