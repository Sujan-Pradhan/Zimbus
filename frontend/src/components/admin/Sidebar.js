import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* <div className="row">
        <div className="col-2"> */}
      <div className="sidebar-wrapper">
        <nav id="sidebar">
          <ul className="list-styled component">
            <li>
              <Link to={"/dashboard"}>
                <i className="fa fa-tachometer"></i> Dashboard
              </Link>
            </li>
            <li>
              <a
                href={"#productSubmenu"}
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                <i className="fa fa-product-hunt"></i>Products
              </a>
              <ul className="collapse list-unstyled">
                <li>
                  <Link to={"/admin/products"}>
                    <i className="fa fa-clipboard"></i>All
                  </Link>
                </li>
                <li>
                  <Link to={"/admin/product"}>
                    <i className="fa fa-plus"></i>Create
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/admin/orders"}>
                <i className="fa fa-shopping-basket"></i>Orders
              </Link>
            </li>
            <li>
              <Link to={"admin/users"}>
                <i className="fa fa-users"></i>Users
              </Link>
            </li>
            <li>
              <Link to={"admin/reviews"}>
                <i className="fa fa-star"></i>Reviews
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* </div>
      </div> */}
    </>
  );
};

export default Sidebar;
