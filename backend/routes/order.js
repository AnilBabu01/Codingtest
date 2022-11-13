const express = require("express");

const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

const { newOrder } = require("../controllers/orderComtroller");

router.post("/order/neworder", isAuthenticatedUser, newOrder);

module.exports = router;
