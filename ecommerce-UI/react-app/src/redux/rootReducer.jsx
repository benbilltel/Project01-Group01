import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer"
import commonReducer from "./reducers/commonReducer";
import categoryReducer from "./reducers/categoryReducer"
const rootReducer = combineReducers({
    userReducer,
    commonReducer,
    categoryReducer
})
export default rootReducer