import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../metadata/Helmet";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../actions/OrderAction";
import "./ListOrders.css";
const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  console.log(orders);
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title={"My Orders"} />

      <h1 className="my-5 latesttext " style={{ textAlign: "center" }}>
        My Orders
      </h1>
      <div className="centertable">
        {loading ? (
          <></>
        ) : (
          <table>
            <tr>
              <th>Order ID</th>
              <th>Num Of Items</th>
              <th>Ammount</th>
            </tr>
            {orders &&
              orders.map((e, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{e.orderItems.length}</td>
                      <td>{`₹${e.totalPrice}`}</td>
                    </tr>
                  </>
                );
              })}
          </table>
        )}
      </div>
    </>
  );
};

export default ListOrders;
