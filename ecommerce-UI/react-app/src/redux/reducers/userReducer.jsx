import { USER_GET_BY_USERNAME } from "../actions/actionType";
const initialState = {
  user: {
    id: "",
    name: "",
    userName: "",
    passWord: "",
    email: "",
    phoneNumber: "",
    type: "",
  },
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_GET_BY_USERNAME:
      return { ...state, user:payload };

    default:
      return state;
  }
};
export default userReducer;
