const express = require("express");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

const { newProduct, getProducts } = require("../controllers/productController");

router.post(
  "/admin/product/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  newProduct
);
router.route("/getAllproducts").get(getProducts);
module.exports = router;
