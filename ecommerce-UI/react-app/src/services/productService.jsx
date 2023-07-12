import axios from "axios";
import { API_PRODUCT, API_USER } from "./constant";
export default class ProductService {
  insertProduct = async (formData) => {
    try {
      return await axios.post(API_PRODUCT, formData);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // console.log("formData not found");
      } else {
        // console.log("Error while fetching formData:", error);
      }
      throw error;
    }
  };
  getAllProducts = async () => {
    try {
      return await axios.get(API_USER);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // console.log("product not found");
      } else {
        // console.log("Error while fetching product:", error);
      }
      throw error;
    }
  };

}
