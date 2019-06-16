//Reducers: Manages data, state
import createReducer from "../lib/createReducer";
import * as types from "../actions/types";
import { combineReducers } from "redux";

let defaultBot = {
  code: "",
  codeArray: [],
  isValid: true,
  deathMessage: "",
  isDead: false,
  i: 0,
  x: { type: "num", value: 0 },
  stack: [],
  recv: false,
  sending: false,
  sendData: {},
  recvData: {}
};
//Define name and default value
export const bots = createReducer(
  { bots: {} },
  {
    [types.SET_BOTS](state, action) {
      return { ...state, bots: action.payload };
    },
    [types.ADD_BOT](state, action) {
      let nextId = getNextId(state.bots);
      return {
        ...state,
        bots: {
          ...state.bots,
          [nextId]: { ...defaultBot, ...action.payload, id: nextId }
        }
      };
    },
    [types.UPDATE_BOT](state, action) {
      return {
        ...state,
        bots: {
          ...state.bots,
          [action.payload.id]: {
            ...(state.bots[action.payload.id] || {}),
            ...action.payload.values
          }
        }
      };
    },
    [types.RUN_TICK](state, action) {
      //for each bot, ordered by id(?) , run next instruction.
      let ret = { ...state };
      let bots = Object.values(state.bots)
        .filter(b => !b.isDead)
        .sort((a, b) => a.id - b.id);
      console.log(bots);
      for (var botCounter = 0; botCounter < bots.length; botCounter++) {
        console.log("running bot", botCounter);
        let bot = bots[botCounter];
      }
      return ret;
    }
  }
);

function getNextId(obj) {
  let i = 0;
  while (1) {
    if (!obj[i]) {
      return i;
    }
    i++;
  }
}

/*
Instructions:

// push num/x
// pop x|blank

//send data=num/x/pop ip=num/x/pop
//recv x/push

//noop
//wait num/x/pop

//walk num/x/pop

//subm num/x/pop


//mark NAME

//rot num/x/pop

//addi x/push
//subi x/push
//muli x/push
//divi x/push


EXPRESSION:
test EXPRESSION
pop<pop
pop>pop
pop=pop
x|pop

//jump mark
//tjmp mark
//fjmp mark

//rjmp num/x/pop
//ajmp num/x/pop

//repl num/x/pop
*/
