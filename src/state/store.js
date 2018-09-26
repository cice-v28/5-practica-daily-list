import { createStore, combineReducers, compose } from "redux";
import lists from "./reducers/lists";

const composeDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

export default createStore(
  combineReducers({
    lists
  }),
  composeDevtools()
);
