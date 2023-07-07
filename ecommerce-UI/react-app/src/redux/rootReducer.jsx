import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer"
import commonReducer from "./reducers/commonReducer";
const rootReducer = combineReducers({
    userReducer,
    commonReducer
})
export default rootReducer