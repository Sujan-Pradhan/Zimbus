const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middlewares/errors");

// Setting up config file
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const products = require("./routes/productRoutes");
const users = require("./routes/userRoutes");
const orders = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");

app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", orders);
app.use("/api/v1", payment);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
