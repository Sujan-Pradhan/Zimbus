const express = require("express");
const {
  getProducts,
  newProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const { isAuthenticatedUser, authorizeUserRoles } = require("../middlewares/auth");
const router = express.Router();

router.post("/admin/product/new", isAuthenticatedUser,authorizeUserRoles('admin'), newProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.put("/admin/product/:id", isAuthenticatedUser,authorizeUserRoles('admin'), updateProduct);
router.delete("/admin/product/:id", isAuthenticatedUser,authorizeUserRoles('admin'), deleteProduct);

module.exports = router;
