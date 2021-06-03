import { combineReducers } from "redux";
import state from "./state";
import apiReducer from "./apiReducer";
export default combineReducers({
  state,
  apiReducer,
});
