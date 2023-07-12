import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer"
import commonReducer from "./reducers/commonReducer";
import categoryReducer from "./reducers/categoryReducer"
import productReducer from "./reducers/productReducer"
const rootReducer = combineReducers({
    userReducer,
    commonReducer,
    categoryReducer,
    productReducer
})
export default rootReducer