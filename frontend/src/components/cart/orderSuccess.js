import React from "react";
import MetaData from "../layouts/MetaData";
import { Link } from "react-router-dom";

const orderSuccess = () => {
  return (
    <>
      <MetaData title={"Order Success"} />
      <div className="contatainer container-fluid">
        <div className="row justify-content-center">
          <div className="col-6 mt-5 text-center">
            <img
              src="/images/order_success.png"
              alt="Order Success"
              width="200"
              height="200"
              className="my-5 img-fluid d-block mx-auto"
            />
            <h2>Your Order has been placed successfully</h2>

            <Link to="/orders/me">Go to Orders</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default orderSuccess;
