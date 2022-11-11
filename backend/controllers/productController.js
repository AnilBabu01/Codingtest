const Product = require("../models/product");

const router = require("../routes/auth");

//create new product api/product/new

exports.newProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};
