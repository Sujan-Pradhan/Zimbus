const express = require("express");
const orderRouter = express.Router();

const {
  isAuthenticatedUser,
  authorizeUserRoles,
} = require("../middlewares/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

orderRouter.post("/order/new", isAuthenticatedUser, newOrder);
orderRouter.get("/order/:id", isAuthenticatedUser, getSingleOrder);
orderRouter.get("/orders/me", isAuthenticatedUser, myOrders);
orderRouter.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeUserRoles("admin"),
  allOrders
);
orderRouter.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeUserRoles("admin"),
  updateOrder
);
orderRouter.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeUserRoles("admin"),
  deleteOrder
);

module.exports = orderRouter;
