require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

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
