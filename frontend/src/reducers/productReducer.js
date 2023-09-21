import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_RESET,
  DELETE_REVIEWS_REQUEST,
  DELETE_REVIEWS_SUCCESS,
  DELETE_REVIEWS_FAIL,
  DELETE_REVIEWS_RESET,
} from "../constants/productConstants";

export const PRODUCT_INITIAL_STATE = {
  products: [],
};

export const productReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_PRODUCTS_REQUEST:
    case ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload.products,
        productCount: payload.productCount,
        resPerPage: payload.resPerPage,
        filteredProductsCount: payload.filteredProductsCount,
      };
    case ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload,
      };
    case ALL_PRODUCTS_FAIL:
    case ADMIN_PRODUCTS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        product: payload.product,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        error: payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDeleteUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload,
      };
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productReviewReducer = (state = { reviews: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: payload,
      };
    case GET_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productReviewDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload,
      };

    case DELETE_REVIEWS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case DELETE_REVIEWS_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
