const express = require("express");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

const { newProduct } = require("../controllers/productController");

router.post(
  "/admin/product/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  newProduct
);

module.exports = router;
