import { combineReducers } from "redux";
import {
    productReducer,
    productDetailsReducer,
} from "../reducers/productReducer";

export const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
});
