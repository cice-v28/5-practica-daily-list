import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import lists from "./reducers/lists";
import user from "./reducers/user";
import thunk from "redux-thunk";

const composeDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

export default createStore(
  combineReducers({
    lists,
    user
  }),
  composeDevtools(),
  applyMiddleware(thunk)
);
