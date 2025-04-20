const { User } = require("../models/index");
const express = require("express");
// const connectToDatabase = require("../lib/db");
const bcrypt = require("bcrypt");
const { connectToDatabase } = require("../lib/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", async (req, res) => {
  const { username, email, phone, address, password } = req.body;
  try {
    const db = await connectToDatabase();
    const [row] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (row.length > 0) {
      return res.status(409).json({ message: "user already existed" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, email, phone, address, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, now(), now())",
      [
        username,
        email,
        phone,
        address,
        hashPassword,
        new Date().toDateString(),
        new Date().toDateString(),
      ]
    );

    return res.status(201).json({ message: "user created sccuessfully" });
  } catch (err) {
    console.error("Database connection failed:", err);
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = await connectToDatabase();
    const [row] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (row.length === 0) {
      return res.status(404).json({ message: "user not existed" });
    }
    const isMatch = await bcrypt.compare(password, row[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "wrong password" });
    }

    const token = jwt.sign({ id: row[0].id }, process.env.JWT_KEY, {
      expiresIn: "3h",
    });

    return res.status(201).json({ token: token });
  } catch (err) {
    console.error("Database connection failed:", err);
    return res.status(500).json(err);
  }
});

router.get("/home", verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [row] = await db.query("select * from users where id = ?", [
      req.userId,
    ]);
    if (row.length === 0) {
      return res.status(404).json({ message: " user not existed" });
    }

    return res.status(201).json({ user: row[0] });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
