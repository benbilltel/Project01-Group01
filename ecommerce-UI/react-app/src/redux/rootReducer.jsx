import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import commonReducer from "./reducers/commonReducer";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
const rootReducer = combineReducers({
  userReducer,
  commonReducer,
  categoryReducer,
  productReducer,
  cartReducer,
});
export default rootReducer;
