import * as types from "./types";

//We have to define action types in types.js, here we make them available as functions that can be mapped to props.

export function setBots(bots) {
  return {
    type: types.SET_BOTS,
    payload: bots
  };
}

export function addBot(bot) {
  return {
    type: types.ADD_BOT,
    payload: bot
  };
}

export function updateBot(id, values) {
  return {
    type: types.UPDATE_BOT,
    payload: { id, values }
  };
}

export function runTick(cb) {
  return {
    type: types.RUN_TICK,
    payload: cb
  };
}

export function resetBots() {
  return {
    type: types.RESET_BOTS
  };
}
