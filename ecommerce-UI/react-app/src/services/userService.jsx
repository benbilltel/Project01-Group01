import axios from "axios";
import { API_USER } from "./constant";
export default class UserService {
  insertUser = async (user) => {
    return await axios.post(API_USER, user);
  };
  getUserByUserName = async (userName) => {
    try {
      return await axios.get(API_USER + "userName=" + userName);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // console.log("User not found");
      } else {
        // console.log("Error while fetching user:", error);
      }
      throw error;
    }
  };
}