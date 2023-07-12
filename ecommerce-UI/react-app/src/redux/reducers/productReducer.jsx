import { PRODUCTS_GET_ALL, PRODUCT_CLEAR_STATE, PRODUCT_INSERT } from "../actions/actionType";

const initialState = {
  product: {},
  products: [],
};
const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_INSERT:
      return { ...state, product: payload };
    case PRODUCTS_GET_ALL:
      return { ...state, products: payload };
    case PRODUCT_CLEAR_STATE:
      return { ...state, product: {}, products: [] };
    default:
      return state;
  }
};
export default productReducer;
