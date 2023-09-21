import { combineReducers } from "redux";
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productDeleteUpdateReducer,
  productReviewReducer,
  productReviewDeleteReducer,
} from "../reducers/productReducer";
import {
  allUsersReducer,
  authReducer,
  forgetPasswordReducer,
  userDetailReducer,
  userReducer,
} from "../reducers/userReducer";
import { cartReducer } from "../reducers/cartReducers";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailReducer,
  orderReducer,
} from "../reducers/orderReducers";

export const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProductReducer: newProductReducer,
  productDeleteUpdateReducer: productDeleteUpdateReducer,
  productReviews:productReviewReducer,
  productReviewDeleteReducer:productReviewDeleteReducer,
  auth: authReducer,
  user: userReducer,
  userDetailReducer:userDetailReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailReducer,
  allOrdersReducer: allOrdersReducer,
  orderReducer: orderReducer,
  allUsersReducer: allUsersReducer,
  newReview: newReviewReducer,
});
