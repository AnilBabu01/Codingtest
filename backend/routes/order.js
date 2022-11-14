const express = require("express");

const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

const { newOrder, myOrders } = require("../controllers/orderComtroller");

router.post("/order/neworder", isAuthenticatedUser, newOrder);
router.get("/order/myorder", isAuthenticatedUser, myOrders);

module.exports = router;
