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
let defaultCode = `MARK TEST
PUSH 12
PUSH 24
PUSH X`;
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
      /*
      //console.time("tick")
      //for each bot, ordered by id(?) , run next instruction.
      
      let ret = { ...state };
      let bots = Object.values(state.bots)
        .filter(b => !b.isDead)
        .sort((a, b) => a.id - b.id);
      //console.log(bots);
      for (var botCounter = 0; botCounter < bots.length; botCounter++) {
        //console.log("running bot", botCounter);
        let bot = bots[botCounter];
        if (bot.isDead) {
          continue;
        }
        bot.ticks++;
        //console.log(bot);
        // current task:
        let currentLine = bot.codeArray.find(l => l.line == bot.i + 1);
        if (!currentLine) {
          //kill bot.
          ret.bots[bot.id] = {
            ...bot,
            isDead: true,
            deathMessage: "Out of instructions."
          };
          continue;
        }
        let cmdArray = currentLine.cmd.split(" ");

        let c = cmdArray[0];

        if (c == "NOOP" || c == "MARK") {
          bot.i++;
        }

        if (c == "JUMP") {
          let m = cmdArray[1];
          //find line;
          let l = null;
          l = bot.codeArray
            .filter(cl => cl.type != "blank")
            .find(cl => {
              return cl.cmd.startsWith("MARK " + m);
            });
          //console.log("FOUND JUMP!", l);
          if (!l) {
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "MARK not found."
            };
            continue;
          }
          bot.i = l.line;
        }

        if (c == "FJMP") {
          let m = cmdArray[1];
          //find line;
          let l = null;
          l = bot.codeArray
            .filter(cl => cl.type != "blank")
            .find(cl => {
              return cl.cmd.startsWith("MARK " + m);
            });
          //console.log("FOUND JUMP!", l);
          if (!l) {
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "MARK not found."
            };
            continue;
          }

          //pop the stack, if it's a 0, jump, else, dont.
          if (bot.stack.length == 0) {
            //do jump

            bot.i = l.line;
            ret.bots[bot.id] = bot;
            continue;
          }

          let a = bot.stack.pop();
          if (a == 0) {
            bot.i = l.line;
            ret.bots[bot.id] = bot;
            continue;
          }
          bot.i++;
        }

        if (c == "TJMP") {
          let m = cmdArray[1];
          //find line;
          let l = null;
          l = bot.codeArray
            .filter(cl => cl.type != "blank")
            .find(cl => {
              return cl.cmd.startsWith("MARK " + m);
            });
          //console.log("FOUND JUMP!", l);
          if (!l) {
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "MARK not found."
            };
            continue;
          }

          //if there's no stack, don't jump
          if (bot.stack.length == 0) {
            //dont jump
            bot.i++;

            ret.bots[bot.id] = bot;
            continue;
          }

          let a = bot.stack.pop();
          if (a != 0) {
            bot.i = l.line;
            ret.bots[bot.id] = bot;
            continue;
          }
          bot.i++;
        }

        if (c == "REPL") {
          let m = cmdArray[1];
          //find line;
          let l = null;
          l = bot.codeArray
            .filter(cl => cl.type != "blank")
            .find(cl => {
              return cl.cmd.startsWith("MARK " + m);
            });
          //console.log("FOUND JUMP!", l);
          if (!l) {
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "MARK not found."
            };
            continue;
          }
          let nextId = getNextId(ret.bots);
          ret.bots[nextId] = {
            ...defaultBot,
            id: nextId,
            stack: bot.stack.slice(),
            x: bot.x,
            i: l.line,
            code: bot.code,
            packets: [],
            temp: true,
            codeArray: bot.codeArray.slice()
          };
          bot.stack.push(nextId);
          bot.i++;
        }

        if (c == "FLIP") {
          if (bot.stack.length < 2) {
            bot.i++;
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "Stack too short to flip."
            };
            continue;
          }
          let a = bot.stack.pop();
          let b = bot.stack.pop();
          bot.stack.push(a);
          bot.stack.push(b);
          bot.i++;
        }

        if (c == "PUSH") {
          if (cmdArray[1] == "X") {
            bot.stack.push(bot.x);
            bot.i++;
          } else {
            bot.stack.push(cmdArray[1]);
            bot.i++;
          }
        }

        if (c == "POP") {
          if (bot.stack.length == 0) {
            bot.i++;
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "Nothing to pop."
            };
            continue;
          }
          let a = bot.stack.pop();
          if (cmdArray[1] && cmdArray[1] == "X") {
            bot.x = a;
          }
          bot.i++;
        }

        if (c == "IP") {
          if (cmdArray[1] && cmdArray[1] == "X") {
            bot.x = bot.id;
          } else {
            bot.stack.push(bot.id);
          }
          bot.i++;
        }

        if (c == "DUPL") {
          if (bot.stack.length == 0) {
            bot.i++;
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "Can't duplicate on empty stack."
            };
            continue;
          }
          bot.stack.push(bot.stack[bot.stack.length - 1]);
          bot.i++;
        }

        if (c == "ROT") {
          let rotateBy = 0;
          if (cmdArray[1] && cmdArray[1] == "X") {
            rotateBy = bot.x;
          }
          if (cmdArray[1] && isNumeric(cmdArray[1])) {
            rotateBy = parseInt(cmdArray[1]);
          }

          if (!cmdArray[1]) {
            //take value from stack.
            if (bot.stack.length == 0) {
              bot.i++;
              ret.bots[bot.id] = {
                ...bot,
                isDead: true,
                deathMessage: "Treid to pop empty stack."
              };
              continue;
            }
            rotateBy = bot.stack.pop();
          }
          if (!isNumeric(rotateBy)) {
            bot.i++;
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "Can't rotate by string (" + rotateBy + ")."
            };
            continue;
          }
          bot.stack = arrayRotate(bot.stack, rotateBy);
          bot.i++;
        }

        if (c == "RJMP") {
          let jumpBy = 0;
          if (cmdArray[1] && cmdArray[1] == "X") {
            jumpBy = bot.x;
          }
          if (cmdArray[1] && isNumeric(cmdArray[1])) {
            jumpBy = parseInt(cmdArray[1]);
          }

          if (!cmdArray[1]) {
            //take value from stack.
            if (bot.stack.length == 0) {
              bot.i++;
              ret.bots[bot.id] = {
                ...bot,
                isDead: true,
                deathMessage: "Treid to pop empty stack."
              };
              continue;
            }
            jumpBy = bot.stack.pop();
          }
          if (!isNumeric(jumpBy)) {
            bot.i++;
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "Can't jump by string (" + jumpBy + ")."
            };
            continue;
          }
          console.log("JUMPING", jumpBy);
          let newI = bot.i + parseInt(jumpBy);
          if (newI < 0) {
            newI = 0;
          }
          bot.i = newI;
        }

        if (c == "AJMP") {
          let jumpBy = 0;
          if (cmdArray[1] && cmdArray[1] == "X") {
            jumpBy = bot.x;
          }
          if (cmdArray[1] && isNumeric(cmdArray[1])) {
            jumpBy = parseInt(cmdArray[1]);
          }

          if (!cmdArray[1]) {
            //take value from stack.
            if (bot.stack.length == 0) {
              bot.i++;
              ret.bots[bot.id] = {
                ...bot,
                isDead: true,
                deathMessage: "Treid to pop empty stack."
              };
              continue;
            }
            jumpBy = bot.stack.pop();
          }
          if (!isNumeric(jumpBy)) {
            bot.i++;
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "Can't jump by string (" + jumpBy + ")."
            };
            continue;
          }
          console.log("JUMPING", jumpBy);
          if (jumpBy < 1) {
            jumpBy = 1;
          }
          bot.i = parseInt(jumpBy) - 1;
        }

        if (c == "MULI" || c == "ADDI" || c == "SUBI" || c == "DIVI") {
          if (bot.stack.length < 2) {
            bot.i++;
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "Not enough values on the stack to do maths."
            };
            continue;
          }
          let a = bot.stack.pop();
          let b = bot.stack.pop();

          if (!isNumeric(a) || !isNumeric(b)) {
            bot.i++;
            ret.bots[bot.id] = {
              ...bot,
              isDead: true,
              deathMessage: "Can't do math on strings."
            };
            continue;
          }
          a = parseInt(a);
          b = parseInt(b);
          if (c == "MULI") {
            bot.stack.push(a * b);
            bot.i++;
          }

          if (c == "ADDI") {
            bot.stack.push(a + b);
            bot.i++;
          }

          if (c == "SUBI") {
            bot.stack.push(a - b);
            bot.i++;
          }

          if (c == "DIVI") {
            bot.stack.push(Math.floor(a / b));
            bot.i++;
          }
        }

        ret.bots[bot.id] = bot;
      }

      //console.timeEnd("tick")
      return ret;
      */
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

function isNumeric(val) {
  if (typeof val == "number") {
    return true;
  }
  return (
    Number(parseFloat(val)) == val &&
    !val.split("").includes("E") &&
    !val.split("").includes(".")
  );
}

/*
Instructions:

IP
//test EXPRESSION
//subm num/x/pop
?//send data=num/x/pop ip=num/x/pop
//recv x/blank
//walk num/x/pop
?//wait num/x/pop

EXPRESSION:
pop<pop
pop>pop
pop=pop
x|pop



##//flip
##//noop
##//mark NAME

#//rot num/x/pop
#//rjmp num/x/pop
#//ajmp num/x/pop

##//addi 
##//subi 
##//muli 
##//divi 

##//jump mark
##//tjmp mark
##//fjmp mark

##// push num/x
##// pop x|blank

##// DUPL



##//repl num/x/pop
*/

function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}
