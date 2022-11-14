import React, { useEffect, useState } from "react";
import Product from "../product/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/ProductAction";
import "./Home.css";
const Home = () => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState([1000]);
  const [category, setCategory] = useState("");

  const categories = [
    "Select Categories",
    "Women",
    "Men",
    "Kids",
    "Beauty",
    "Electronic Device",
    "Mobile",
    "Accessories",
    "Jewellery",
  ];
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts(price, category));
  }, [dispatch, price, category]);

  return (
    <>
      <div className="mainHome-products">
        {!products ? (
          ""
        ) : (
          <>
            <section id="products" className="container mt-5">
              <h1>Latest Products</h1>
              <ul className="pl-0">
                {categories.map((category) => (
                  <li
                    style={{
                      cursor: "pointer",
                      listStyleType: "none",
                    }}
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <div className="row">
                {products &&
                  products.map((product) => {
                    return (
                      <>
                        <Product key={product._id} product={product} />
                      </>
                    );
                  })}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
