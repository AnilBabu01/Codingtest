const Order = require("../models/order");
const Product = require("../models/product");

// Create a new order   =>  /api/order/new
exports.getProducts = async (req, res, next) => {
  try {
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter();

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    // products = await apiFeatures.query;

    res.status(200).json({
      status: true,
      filteredProductsCount,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.newOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });
    if (orderItems) {
      order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
      });
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

// update Stock
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save();
}

// Get logged in user orders   =>   /api/orders/me
exports.myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    if (!orders) {
      return res.status(404).json({
        success: false,
        msg: "No Order found with this ID",
      });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {}
};
