import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteProductReview,
  getProductReviews,
} from "../../actions/productAction";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import { MDBDataTable } from "mdbreact";
import { useNavigate } from "react-router-dom";
import { DELETE_REVIEWS_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, reviews } = useSelector(
    (state) => state.productReviews
  );

  const { isDeleted } = useSelector(
    (state) => state.productReviewDeleteReducer
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }
    if (isDeleted) {
      alert.success("Reviews Deleted Successfully");
      dispatch({ type: DELETE_REVIEWS_RESET });
    }
  }, [dispatch, error, alert, productId, isDeleted]);

  const deleteReviewHandler = (id) => {
    dispatch(deleteProductReview(id, productId));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(getProductReviews(productId));
  };
  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "des",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "des",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "des",
        },
        {
          label: "User",
          field: "user",
          sort: "des",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        coment: review.comment,
        user: review.name,
        actions: (
          <>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteReviewHandler(review._id)}
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
      <MetaData title={"Product Reviews"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Enter Product Id</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn btn-primary btn-block py-2"
                    id="search_button"
                    type="submit"
                  >
                    SEARCH
                  </button>
                </form>
              </div>
            </div>
            {reviews && reviews.length > 0 ? (
              <MDBDataTable
                data={setReviews}
                className="px-3"
                bordered
                striped
                hover
              />
            ) : (
              <p className="mt-5 text-center">No Reviews</p>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
