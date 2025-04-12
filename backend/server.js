require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const measurementRoutes = require("./routes/measurementRoutes");
const addressRouter = require("./routes/addressRoutes");

const fs = require("fs");
const path = require("path");
const { getUserAddresses } = require("./controller/addAddressController");

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/measurements", measurementRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/add-address", addressRouter);

app.listen(SERVER_PORT, async () => {
  console.log(`App is listening on PORT ${SERVER_PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
  } catch (error) {
    console.log("Failed to connect to the database", error);
    process.exit(1);
  }
});
