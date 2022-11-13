import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Metadata from "../metadata/Helmet";
import { getProductDetails } from "../actions/ProductAction";
import { addItemToCart } from "../actions/CartAction";
import "./Product.css";
const ProduuctDetails = () => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const alert = useAlert();

  const { product } = useSelector((state) => state.productDetails);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { id } = useParams();
  console.log(product, cartItems);
  const addToCart = () => {
    const token = localStorage.getItem("testtoken");

    if (token) {
      dispatch(addItemToCart(id, quantity));
      alert.success("Item Added to Cart");
    }
  };
  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  return (
    <>
      <Metadata title={product.productname} />
      <div className="mainprodetaits">
        <div>
          {product && (
            <>
              <div className="row f-flex justify-content-around latesttextprodel ">
                <div
                  className="col-12 col-lg-5 img-fluid productImg"
                  id="product_image"
                >
                  <img
                    alt="img"
                    className="proimg"
                    src={product.images ? product.images[0].url : ""}
                    style={{ marginBottom: "10rem" }}
                  />
                </div>

                <div
                  style={{ marginRight: "2rem" }}
                  className="col-12 col-lg-5 mt-5"
                >
                  <h3>{product.productname}</h3>
                  <p id="product_id">Product # {product._id}</p>

                  <p id="product_price">₹{product.price}</p>
                  <div className="">
                    <span
                      className="btn btn-danger minus"
                      onClick={decreaseQty}
                    >
                      -
                    </span>

                    <input
                      type="number"
                      className="form-control count d-inline"
                      value={quantity}
                      readOnly
                    />

                    <span
                      className="btn btn-primary plus"
                      onClick={increaseQty}
                    >
                      +
                    </span>
                  </div>
                  {user ? (
                    <button
                      type="button"
                      id="cart_btn"
                      className="btn btn-primary d-inline ml-4"
                      disabled={product.stock === 0}
                      onClick={addToCart}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="alert alert-danger mt-5" type="alert">
                      Login Require to add to cart
                    </div>
                  )}

                  <hr />

                  <p>Status:{product && product.status}</p>

                  <hr />

                  <h4 className="mt-2">Description:</h4>
                  <p>{product.desc}</p>
                  <hr />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProduuctDetails;
