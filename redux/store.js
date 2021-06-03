import { createStore, compose, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import reducer from "./reducer/rootReducer";
const middleware = [thunk];
const make = () =>
  createStore(reducer, compose(applyMiddleware(...middleware)));

export const wrapper = createWrapper(make, { debug: true });
