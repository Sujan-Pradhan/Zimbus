const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// Handle the Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// Setting up config file
dotenv.config({ path: "backend/config/config.env" });

// console.log(a);

// connecting to db
connectDatabase();


// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 8000;
const mode = process.env.NODE_ENV || "DEVELOPMENT";

const server = app.listen(port, () => {
  console.log(`Server started on PORT: ${port} in ${mode} mode`);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
