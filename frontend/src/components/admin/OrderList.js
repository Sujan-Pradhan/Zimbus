import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { allOrders, clearErrors, deleteOrder } from "../../actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

const OrderList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, orders, totalAmount } = useSelector(
    (state) => state.allOrdersReducer
  );

  const { isDeleted } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Succesfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, alert, isDeleted, navigate]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
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
          label: "Actions",
          field: "actions",
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
        actions: (
          <>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2 "
              onClick={() => deleteOrderHandler(order._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return data;
  };
  return (
    <>
      <MetaData title={"All Orders List"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All Orders</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default OrderList;
