import { combineReducers } from "redux";

import * as userReducer from "./user";
import * as botsReducer from "./bots";

export default combineReducers(Object.assign({}, userReducer, botsReducer));
