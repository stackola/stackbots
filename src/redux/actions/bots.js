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

export function updateBot(id, code) {
  return {
    type: types.UPDATE_BOT,
    payload: { id, code }
  };
}

export function runTick() {
  return {
    type: types.RUN_TICK
  };
}

export function run10(number = 10) {
  return {
    type: types.RUN_10,
    payload: number
  };
}

export function resetBots() {
  return {
    type: types.RESET_BOTS
  };
}
