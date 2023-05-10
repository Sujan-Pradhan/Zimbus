import React, { useEffect } from "react";
import "../App.css";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productAction";
import Product from "./product/Products";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
     return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, alert, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container container-fluid">
            <MetaData title={"Buy Best Products Online"} />
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
              <div className="row">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
