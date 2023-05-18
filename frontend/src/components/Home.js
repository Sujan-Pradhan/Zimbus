import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../App.css";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productAction";
import Product from "./product/Products";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([1, 10000]);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const { keyword } = useParams();
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, alert, error, keyword, currentPage, price]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
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
                {keyword ? (
                  <>
                    <div className="col-6 cool-md-3 mt-5 mb-5">
                      <div className="px-5">
                        <Range
                          marks={{
                            1: `$1`,
                            10000: `$10000`,
                          }}
                          min={1}
                          max={10000}
                          defaultValue={[1, 10000]}
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{
                            placement: "top",
                            visible: true,
                          }}
                          value={price}
                          onChange={(price) => setPrice(price)}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products &&
                          products.map((product) => (
                            <Product key={product._id} product={product} col={4} />
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))
                )}
              </div>
            </section>
          </div>
          {resPerPage <= productCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
