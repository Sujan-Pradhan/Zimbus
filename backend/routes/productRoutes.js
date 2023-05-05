const express = require("express");
const {
  getProducts,
  newProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productControllers");
const {
  isAuthenticatedUser,
  authorizeUserRoles,
} = require("../middlewares/auth");
const router = express.Router();

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeUserRoles("admin"),
  newProduct
);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeUserRoles("admin"),
  updateProduct
);
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeUserRoles("admin"),
  deleteProduct
);

// For reviews
router.put("/review", isAuthenticatedUser, createProductReview);
router.get("/reviews", isAuthenticatedUser, getProductReviews);
router.delete("/reviews", isAuthenticatedUser, deleteReview);

module.exports = router;
