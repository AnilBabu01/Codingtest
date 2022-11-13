const Product = require("../models/product");
const APIFeatures = require("../utility/apiFeatures");
const router = require("../routes/auth");

//create new product

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

// Get all products api/getproducts?keyword=apple
exports.getProducts = async (req, res) => {
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;

  // products = await apiFeatures.query;

  res.status(200).json({
    status: true,
    length: products.length,
    products,
  });
};

// get single product

exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: false, msg: "Product not fund" });
    } else {
      res.status(201).json({
        status: true,
        product,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
