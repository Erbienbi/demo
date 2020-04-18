import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
// import { } from "./reducers";
import thunk from "redux-thunk"
import logger from "redux-logger";
const reducers = combineReducers({
});

const store = createStore(reducers, applyMiddleware(thunk, logger))

export default store