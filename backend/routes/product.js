const express = require("express");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

const {
  newProduct,
  getProducts,
  getSingleProduct,
} = require("../controllers/productController");

router.post(
  "/admin/product/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  newProduct
);
router.route("/getAllproducts").get(getProducts);

router.route("/getSingleProduct/:id").get(getSingleProduct);
module.exports = router;
