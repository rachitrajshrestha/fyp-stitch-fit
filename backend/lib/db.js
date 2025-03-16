const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

let connection;

module.exports.connectToDatabase = async () => {
  try {
    if (!connection) {
      console.log("Attempting to connect to the database...");
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });
      console.log("Database connection successful!");
    }
    return connection;
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err; // Re-throw the error to be caught in your route
  }
};
