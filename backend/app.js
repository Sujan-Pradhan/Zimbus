const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload")

const errorMiddleware = require("./middlewares/errors");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())

const products = require("./routes/productRoutes");
const users = require("./routes/userRoutes");
const orders = require("./routes/orderRoutes");

app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", orders);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
