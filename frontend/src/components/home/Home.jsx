import React, { useEffect } from "react";
import Product from "../product/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/ProductAction";
import "./Home.css";
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="mainHome-products">
        {!products ? (
          ""
        ) : (
          <>
            <section id="products" className="container mt-5">
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
