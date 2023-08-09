import { combineReducers } from "redux";
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productDeleteUpdateReducer,
} from "../reducers/productReducer";
import {
  authReducer,
  forgetPasswordReducer,
  userReducer,
} from "../reducers/userReducer";
import { cartReducer } from "../reducers/cartReducers";
import {
  myOrdersReducer,
  newOrderReducer,
  orderDetailReducer,
} from "../reducers/orderReducers";

export const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProductReducer: newProductReducer,
  productDeleteUpdateReducer:productDeleteUpdateReducer,
  auth: authReducer,
  user: userReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailReducer,
  newReview: newReviewReducer,
});
