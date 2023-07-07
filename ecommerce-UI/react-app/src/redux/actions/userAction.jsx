import UserService from "../../services/userService";
import {
  USER_GET_BY_USERNAME,
  USER_INSERT,
  COMMON_ERROR_SET,
  COMMON_MESSAGE_SET,
} from "./actionType";
export const insertUser = (user, navigate) => async (dispatch) => {
  const userService = new userService();
  try {
    const response = await userService.insertUser(user);
    dispatch({
      type: USER_INSERT,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUserByUserName = (user, navigate) => async (dispatch) => {
  const userService = new UserService();

  try {
    const response = await userService.getUserByUserName(user.userName);
    if (response.status === 200) {
      if (response.data.password == user.password) {
        dispatch({
          type: USER_GET_BY_USERNAME,
          payload: response.data,
        });
        if (response.data.type == "User") {
          navigate("/");
        }
        if (response.data.type == "Admin") {
          navigate("/");
        }
      } else {
        dispatch({
          type: COMMON_ERROR_SET,
          payload: "Wrong password!",
        });
      }
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data.message,
    });
  }
};
