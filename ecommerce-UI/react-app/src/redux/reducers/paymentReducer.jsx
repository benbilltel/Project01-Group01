import { PAYMENT_INSERT_ORDER_INFO, PAYMENT_SET_CARTS } from "../actions/actionType";

const initialState = {
  orderInfo: {},
  oderInfos: [],
  cartsPay: [],
};

const paymentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PAYMENT_INSERT_ORDER_INFO:
      return { ...state, orderInfo: payload };
    case PAYMENT_SET_CARTS:
      return { ...state, cartsPay: payload };
    default:
      return state;
  }
};
export default paymentReducer;
