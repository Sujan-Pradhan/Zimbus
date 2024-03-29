import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";

const ListOrder = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };
    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        action: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });
    return data; 
  };
  return (
    <>
      <MetaData title={"My Orders"} />
      <h1 className="my-5">My Orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTableV5
          data={setOrders()}
          className="px-5"
          bordered
          striped
          hover
        />
      )}
    </>
  );
};

export default ListOrder;
