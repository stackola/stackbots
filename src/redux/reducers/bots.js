//Reducers: Manages data, state
import createReducer from "../lib/createReducer";
import * as types from "../actions/types";
import { combineReducers } from "redux";

import * as World from "../../../standalone/world";

let defaultBot = {
  isValid: true,
  deathMessage: "",
  isDead: false,
  x: 0,
  temp: false,
  ticks: 0,
  i: 0
};
let defaultCode = `;FIBONACCI
PUSH 0
DUPL
POP X
PUSH 1

MARK LOOP
DUPL
PUSH X
ADDI
SWAP
DUPL
POP X
SWAP
JUMP LOOP`;
const GlobWorld = new World({ code: defaultCode });
export const bots = createReducer(
  {
    world: GlobWorld.toJSON(),
    bots: GlobWorld.bots.map(b => b.toJSON())
  },
  {
    [types.SET_BOTS](state, action) {
      return state;
    },
    [types.RESET_BOTS](state, action) {
      GlobWorld.reset();
      return {
        world: GlobWorld.toJSON(),
        bots: GlobWorld.bots.map(b => b.toJSON())
      };
      return state;
    },
    [types.ADD_BOT](state, action) {
      GlobWorld.addBot();
      return {
        world: GlobWorld.toJSON(),
        bots: GlobWorld.bots.map(b => b.toJSON())
      };
    },
    [types.UPDATE_BOT](state, action) {
      GlobWorld.updateCode(action.payload.id, action.payload.code);
      return {
        world: GlobWorld.toJSON(),
        bots: GlobWorld.bots.map(b => b.toJSON())
      };
    },
    [types.RUN_TICK](state, action) {
      GlobWorld.runTick();
      return {
        world: GlobWorld.toJSON(),
        bots: GlobWorld.bots.map(b => b.toJSON())
      };
    },
    [types.RUN_10](state, action) {
      for (var i = 0; i < action.payload; i++) {
        GlobWorld.runTick();
      }
      return {
        world: GlobWorld.toJSON(),
        bots: GlobWorld.bots.map(b => b.toJSON())
      };
    }
  }
);

function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}
