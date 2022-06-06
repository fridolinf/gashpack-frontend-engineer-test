import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";

const rootReducers = combineReducers({
  moviesReducer,
});
export default rootReducers;
