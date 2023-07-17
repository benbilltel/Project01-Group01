import { PAYMENT_INSERT_ORDER_INFO } from "../actions/actionType";
  
  const initialState = {
    oderInfo:{},
    oderInfos:[],
    cartsPay: [],
  };
  
  const paymentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case PAYMENT_INSERT_ORDER_INFO:
        return { ...state, oderInfo: payload };
    //   case CART_GET_ALL:
    //     return { ...state, carts: payload, count: payload.length };
    //   case CART_CLEAR_STATE:
    //     return { ...state, cart: {}, carts: [], count: 0 };
    //   case CART_SET:
    //     return { ...state, cart: payload };
    //   case CART_DELETE_PRODUCT:
    //     return {
    //       ...state,
    //       carts: state.carts.filter((item) => item.productDto.id !== payload),
    //       count: state.count - 1,
    //     };
      default:
        return state;
    }
  };
  export default paymentReducer;