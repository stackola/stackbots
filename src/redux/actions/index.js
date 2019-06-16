import * as userActions from "./user";
import * as botsActions from "./bots";

export const ActionCreators = Object.assign({}, botsActions, userActions);
