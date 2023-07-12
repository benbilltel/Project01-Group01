import {
  PRODUCTS_GET_ALL,
  PRODUCT_CLEAR_STATE,
  PRODUCT_DELETE,
  PRODUCT_INSERT,
  PRODUCT_SET,
  PRODUCT_UPDATE,
} from "../actions/actionType";

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
    case PRODUCT_SET:
      return { ...state, product: payload };
    case PRODUCT_UPDATE:
      return { ...state, product: {}, products: [] };
    case PRODUCT_DELETE:
      return {
        ...state,
        products: state.products.filter((item) => item.id !== payload),
      };
    default:
      return state;
  }
};
export default productReducer;
