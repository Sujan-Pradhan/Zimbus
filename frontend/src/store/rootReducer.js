import { combineReducers } from "redux";
import {
  productReducer,
  productDetailsReducer,
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
  auth: authReducer,
  user: userReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailReducer,
});
