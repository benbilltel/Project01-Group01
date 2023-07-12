import ProductService from "../../services/productService";
import {
  COMMON_ERROR_SET,
  COMMON_MESSAGE_SET,
  PRODUCTS_GET_ALL,
  PRODUCT_CLEAR_STATE,
  PRODUCT_INSERT,
} from "./actionType";

export const insertProduct = (formData, navigate) => async (dispatch) => {
  const productService = new ProductService();
  try {
    const response = await productService.insertProduct(formData);

    if (response.status === 201) {
      dispatch({
        type: PRODUCT_INSERT,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Product was saved!",
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.data.message,
      });
    }
    navigate("/admin/productAdmin/list");
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Something was wrong!",
    });
  }
};
export const getAllProducts = () => async (dispatch) => {
  const productService = new ProductService();
 
  try {
    const response = await productService.getAllProducts();
    if (response.status === 200) {
      dispatch({
        type: PRODUCTS_GET_ALL,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: "Products does not available!",
    });
  }
};
export const clearStateProduct = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CLEAR_STATE,
  });
};
