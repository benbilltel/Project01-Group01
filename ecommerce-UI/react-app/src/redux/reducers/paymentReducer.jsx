import {
  PAYMENT_CLEAR_CARTS,
  PAYMENT_CLEAR_STATE,
  PAYMENT_GET_ORDER_INFO_USER,
  PAYMENT_INSERT_ORDER_INFO,
  PAYMENT_SET_CARTS,
} from "../actions/actionType";

const initialState = {
  orderInfo: {},
  orderInfos: [],
  cartsPay: [],
};

const paymentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PAYMENT_INSERT_ORDER_INFO:
      return { ...state, orderInfo: payload };
    case PAYMENT_SET_CARTS:
      return { ...state, cartsPay: payload };
    case PAYMENT_GET_ORDER_INFO_USER:
      return { ...state, orderInfos: payload };
    case PAYMENT_CLEAR_CARTS:
      return { ...state, cartsPay: [] };
    case PAYMENT_CLEAR_STATE:
      return { ...state, orderInfo: {}, orderInfos: [], cartsPay: [] };
    default:
      return state;
  }
};
export default paymentReducer;
