import {
  USER_GET_BY_USERNAME,
  USER_CLEAR_STATE,
  USER_INSERT,
} from "../actions/actionType";
const initialState = {
  user: {},
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_GET_BY_USERNAME:
      return { ...state, user: payload };
    case USER_CLEAR_STATE:
      return {
        ...state,
        user: {},
      };
    case USER_INSERT:
      return {
        ...state,
        user: {},
      };

    default:
      return state;
  }
};
export default userReducer;
