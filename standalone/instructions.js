let argTypes = {
  X: a => {
    return a == "X";
  },
  NUM: a => {
    return isNumeric(a);
  },
  TOP: a => {
    return a == "TOP";
  },
  POP: a => {
    return a == "POP";
  },
  EXP: a => {
    //console.log(a);
    return (
      a.includes("&gt;") ||
      a.includes("=") ||
      a.includes(">") ||
      a.includes("!=")
    );
  },
  MARK: a => {
    let letters = "abcdefghijklmnopqrstuvwxyz0123456789"
      .toUpperCase()
      .split("");
    return a
      .split("")
      .map(letter => letters.includes(letter))
      .reduce((a, b) => a && b);
  }
};

//[argTypes.X, argTypes.TOP, argTypes.POP, argTypes.NUM]

let instructions = {
  PUSH: {
    cmd: "PUSH",
    argNums: [1],
    args: [
      {
        match: [argTypes.X, argTypes.TOP, argTypes.POP, argTypes.NUM]
      }
    ],
    mutator: ({ bot, args, world }) => {
      let writeValue = bot.x; //default.
      getVal: {
        if (isNumeric(args[0])) {
          //Get from int
          writeValue = parseInt(args[0]);
          break getVal;
        }
        if (bot.stack.length == 0) {
          return "Can not read from empty stack.";
        }
        if (args[0] == "POP") {
          //Get from POP
          writeValue = bot.stack.pop();
          break getVal;
        }
        if (args[0] == "TOP") {
          //Get from x
          writeValue = bot.stack[bot.stack.length - 1];
          break getVal;
        }
      }
      bot.stack.push(writeValue);
      bot.i++;
    }
  },
  POP: {
    cmd: "POP",
    argNums: [0, 1],
    args: [{ match: [argTypes.X], optional: true }],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length == 0) {
        return "Can't pop empty stack";
      }
      if (args[0]) {
        //want to store in x
        bot.x = bot.stack.pop();
      } else {
        //discard
        bot.stack.pop();
      }
      bot.i++;
    }
  },
  TOP: {
    cmd: "TOP",
    argNums: [1],
    args: [{ match: [argTypes.X] }],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length == 0) {
        return "Can't read from empty stack.";
      }
      bot.x = bot.stack[bot.stack.length - 1];
      bot.i++;
    }
  },
  LINE: {
    cmd: "LINE",
    argNums: [0],
    args: [],
    mutator: ({ bot, args, world }) => {
      bot.stack.push(bot.i + 1);
      bot.i++;
    }
  },
  TEQ: {
    cmd: "TEQ",
    argNums: [0, 2],
    args: [
      {
        optional: true,
        match: [argTypes.X, argTypes.TOP, argTypes.POP, argTypes.NUM]
      },
      {
        optional: true,
        match: [argTypes.X, argTypes.TOP, argTypes.POP, argTypes.NUM]
      }
    ],
    mutator: ({ bot, args, world }) => {
      //default:
      if (!args[0]) {
        args[0] = "POP";
        args[1] = "POP";
      }
      let a = null;
      let b = null;
      //Get first item:
      getVal1: {
        if (args[0] == "X") {
          a = bot.x;
          break getVal1;
        }
        if (isNumeric(args[0])) {
          //Get from int
          a = parseInt(args[0]);
          break getVal1;
        }
        if (bot.stack.length == 0) {
          return "Can not read from empty stack.";
        }
        if (args[0] == "POP") {
          //Get from POP
          a = bot.stack.pop();
          break getVal1;
        }
        if (args[0] == "TOP") {
          //Get from x
          a = bot.stack[bot.stack.length - 1];
          break getVal1;
        }
      }

      getVal2: {
        if (args[1] == "X") {
          b = bot.x;
          break getVal2;
        }
        if (isNumeric(args[1])) {
          //Get from int
          b = parseInt(args[1]);
          break getVal2;
        }
        if (bot.stack.length == 0) {
          return "Can not read from empty stack.";
        }
        if (args[1] == "POP") {
          //Get from POP
          b = bot.stack.pop();
          break getVal2;
        }
        if (args[1] == "TOP") {
          //Get from x
          b = bot.stack[bot.stack.length - 1];
          break getVal2;
        }
      }
      //console.log("doin.");
      //console.log(args[0], args[1]);
      //console.log(a, b);
      bot.stack.push(a == b ? 1 : 0);
      bot.i++;
    }
  },

  TNE: {
    cmd: "TNE",
    argNums: [0, 2],
    args: [
      {
        optional: true,
        match: [argTypes.X, argTypes.TOP, argTypes.POP, argTypes.NUM]
      },
      {
        optional: true,
        match: [argTypes.X, argTypes.TOP, argTypes.POP, argTypes.NUM]
      }
    ],
    mutator: ({ bot, args, world }) => {
      //default:
      if (!args[0]) {
        args[0] = "POP";
        args[1] = "POP";
      }
      let a = null;
      let b = null;
      //Get first item:
      getVal1: {
        if (args[0] == "X") {
          a = bot.x;
          break getVal1;
        }
        if (isNumeric(args[0])) {
          //Get from int
          a = parseInt(args[0]);
          break getVal1;
        }
        if (bot.stack.length == 0) {
          return "Can not read from empty stack.";
        }
        if (args[0] == "POP") {
          //Get from POP
          a = bot.stack.pop();
          break getVal1;
        }
        if (args[0] == "TOP") {
          //Get from x
          a = bot.stack[bot.stack.length - 1];
          break getVal1;
        }
      }

      getVal2: {
        if (args[1] == "X") {
          b = bot.x;
          break getVal2;
        }
        if (isNumeric(args[1])) {
          //Get from int
          b = parseInt(args[1]);
          break getVal2;
        }
        if (bot.stack.length == 0) {
          return "Can not read from empty stack.";
        }
        if (args[1] == "POP") {
          //Get from POP
          b = bot.stack.pop();
          break getVal2;
        }
        if (args[1] == "TOP") {
          //Get from x
          b = bot.stack[bot.stack.length - 1];
          break getVal2;
        }
      }
      //console.log("doin.");
      //console.log(args[0], args[1]);
      //console.log(a, b);
      bot.stack.push(a == b ? 0 : 1);
      bot.i++;
    }
  },

  TLT: {
    cmd: "TLT",
    argNums: [0, 2],
    args: [
      {
        optional: true,
        match: [argTypes.X, argTypes.TOP, argTypes.POP, argTypes.NUM]
      },
      {
        optional: true,
        match: [argTypes.X, argTypes.TOP, argTypes.POP, argTypes.NUM]
      }
    ],
    mutator: ({ bot, args, world }) => {
      //default:
      if (!args[0]) {
        args[0] = "POP";
        args[1] = "POP";
      }
      let a = null;
      let b = null;
      //Get first item:
      getVal1: {
        if (args[0] == "X") {
          a = bot.x;
          break getVal1;
        }
        if (isNumeric(args[0])) {
          //Get from int
          a = parseInt(args[0]);
          break getVal1;
        }
        if (bot.stack.length == 0) {
          return "Can not read from empty stack.";
        }
        if (args[0] == "POP") {
          //Get from POP
          a = bot.stack.pop();
          break getVal1;
        }
        if (args[0] == "TOP") {
          //Get from x
          a = bot.stack[bot.stack.length - 1];
          break getVal1;
        }
      }

      getVal2: {
        if (args[1] == "X") {
          b = bot.x;
          break getVal2;
        }
        if (isNumeric(args[1])) {
          //Get from int
          b = parseInt(args[1]);
          break getVal2;
        }
        if (bot.stack.length == 0) {
          return "Can not read from empty stack.";
        }
        if (args[1] == "POP") {
          //Get from POP
          b = bot.stack.pop();
          break getVal2;
        }
        if (args[1] == "TOP") {
          //Get from x
          b = bot.stack[bot.stack.length - 1];
          break getVal2;
        }
      }
      //console.log("doin.");
      //console.log(args[0], args[1]);
      //console.log(a, b);
      bot.stack.push(a < b ? 1 : 0);
      bot.i++;
    }
  },

  TGT: {
    cmd: "TGT",
    argNums: [0, 2],
    args: [
      {
        optional: true,
        match: [argTypes.X, argTypes.TOP, argTypes.POP, argTypes.NUM]
      },
      {
        optional: true,
        match: [argTypes.X, argTypes.TOP, argTypes.POP, argTypes.NUM]
      }
    ],
    mutator: ({ bot, args, world }) => {
      //default:
      if (!args[0]) {
        args[0] = "POP";
        args[1] = "POP";
      }
      let a = null;
      let b = null;
      //Get first item:
      getVal1: {
        if (args[0] == "X") {
          a = bot.x;
          break getVal1;
        }
        if (isNumeric(args[0])) {
          //Get from int
          a = parseInt(args[0]);
          break getVal1;
        }
        if (bot.stack.length == 0) {
          return "Can not read from empty stack.";
        }
        if (args[0] == "POP") {
          //Get from POP
          a = bot.stack.pop();
          break getVal1;
        }
        if (args[0] == "TOP") {
          //Get from x
          a = bot.stack[bot.stack.length - 1];
          break getVal1;
        }
      }

      getVal2: {
        if (args[1] == "X") {
          b = bot.x;
          break getVal2;
        }
        if (isNumeric(args[1])) {
          //Get from int
          b = parseInt(args[1]);
          break getVal2;
        }
        if (bot.stack.length == 0) {
          return "Can not read from empty stack.";
        }
        if (args[1] == "POP") {
          //Get from POP
          b = bot.stack.pop();
          break getVal2;
        }
        if (args[1] == "TOP") {
          //Get from x
          b = bot.stack[bot.stack.length - 1];
          break getVal2;
        }
      }
      //console.log("doin.");
      //console.log(args[0], args[1]);
      //console.log(a, b);
      bot.stack.push(a > b ? 1 : 0);
      bot.i++;
    }
  },
  NOOP: {
    cmd: "NOOP",
    argNums: [0],
    args: [],
    mutator: ({ bot, args, world }) => {
      bot.i++;
    }
  },
  SWAP: {
    cmd: "SWAP",
    argNums: [0],
    args: [],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length < 2) {
        return "Not enough items for swapping.";
      }
      let a = bot.stack.pop();
      let b = bot.stack.pop();
      bot.stack.push(a);
      bot.stack.push(b);
      bot.i++;
    }
  },
  FORK: {
    cmd: "FORK",
    argNums: [1],
    args: [{ match: [argTypes.MARK] }],
    mutator: ({ bot, args, world }) => {
      let m = args[0];
      //find line;
      let l = null;
      l = bot.codeArray
        .filter(cl => cl.type != "blank")
        .find(cl => {
          return cl.args[0] == m;
        });
      //console.log("FOUND JUMP!", l);
      if (!l) {
        return "MARK not found.";
      }
      world.addBot({
        code: bot.code,
        x: bot.x,
        room: bot.room,
        stack: bot.stack.slice(),
        i: l.line,
        x: bot.x,
        isTemp: true
      });
      bot.i++;
    }
  },
  JUMP: {
    cmd: "JUMP",
    argNums: [1],
    args: [{ match: [argTypes.MARK] }],
    mutator: ({ bot, args, world }) => {
      let m = args[0];
      //find line;
      let l = null;
      l = bot.codeArray
        .filter(cl => cl.type != "blank")
        .find(cl => {
          return cl.args[0] == m;
        });
      //console.log("FOUND JUMP!", l);
      if (!l) {
        return "MARK not found.";
      }
      bot.i = l.line;
    }
  },
  CALL: {
    cmd: "CALL",
    argNums: [1],
    args: [{ match: [argTypes.MARK] }],
    mutator: ({ bot, args, world }) => {
      let m = args[0];
      //find line;
      let l = null;
      l = bot.codeArray
        .filter(cl => cl.type != "blank")
        .find(cl => {
          return cl.cmd == "MARK" && cl.args[0] == m;
        });
      //console.log("FOUND JUMP!", l);
      if (!l) {
        return "MARK not found.";
      }
      bot.stack.push(bot.i + 1);
      bot.i = l.line;
    }
  },
  RET: {
    cmd: "RET",
    argNums: [0],
    args: [],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length == 0) {
        return "Nowhere to return to.";
      }
      let a = bot.stack.pop();
      bot.i = a;
    }
  },
  TJMP: {
    cmd: "TJMP",
    argNums: [1],
    args: [],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length == 0) {
        return "Can not read from empty stack";
      }
      if (bot.stack[bot.stack.length - 1] == 0) {
        //dont jump;
        bot.i++;
        return;
      }
      let m = args[0];
      //find line;
      let l = null;
      l = bot.codeArray
        .filter(cl => cl.type != "blank")
        .find(cl => {
          return cl.args[0] == m;
        });
      //console.log("FOUND JUMP!", l);
      if (!l) {
        return "MARK not found.";
      }
      bot.i = l.line;
    }
  },
  FJMP: {
    cmd: "FJMP",
    argNums: [1],
    args: [],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length !== 0 && bot.stack[bot.stack.length - 1] != 0) {
        bot.i++;
        return;
      }
      let m = args[0];
      //find line;
      let l = null;
      l = bot.codeArray
        .filter(cl => cl.type != "blank")
        .find(cl => {
          return cl.args[0] == m;
        });
      //console.log("FOUND JUMP!", l);
      if (!l) {
        return "MARK not found.";
      }
      bot.i = l.line;
    }
  },
  ADDI: {
    cmd: "ADDI",
    argNums: [0],
    args: [],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length < 2) {
        return "Not enough items for math.";
      }
      let a = bot.stack.pop();
      let b = bot.stack.pop();
      if (!(isNumeric(a) && isNumeric(b))) {
        return "Can't do maths on string.";
      }
      bot.stack.push(a + b);
      bot.i++;
    }
  },
  MULI: {
    cmd: "MULI",
    argNums: [0],
    args: [],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length < 2) {
        return "Not enough items for math.";
      }
      let a = bot.stack.pop();
      let b = bot.stack.pop();
      if (!(isNumeric(a) && isNumeric(b))) {
        return "Can't do maths on string.";
      }
      bot.stack.push(a * b);
      bot.i++;
    }
  },
  SUBI: {
    cmd: "SUBI",
    argNums: [0],
    args: [],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length < 2) {
        return "Not enough items for math.";
      }
      let a = bot.stack.pop();
      let b = bot.stack.pop();
      if (!(isNumeric(a) && isNumeric(b))) {
        return "Can't do maths on string.";
      }
      bot.stack.push(a - b);
      bot.i++;
    }
  },
  DIVI: {
    cmd: "DIVI",
    argNums: [0],
    args: [],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length < 2) {
        return "Not enough items for math.";
      }
      let a = bot.stack.pop();
      let b = bot.stack.pop();
      if (!(isNumeric(a) && isNumeric(b))) {
        return "Can't do maths on string.";
      }
      bot.stack.push(Math.floor(a / b));
      bot.i++;
    }
  },
  MODI: {
    cmd: "MODI",
    argNums: [0],
    args: [],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length < 2) {
        return "Not enough items for math.";
      }
      let a = bot.stack.pop();
      let b = bot.stack.pop();
      if (!(isNumeric(a) && isNumeric(b))) {
        return "Can't do maths on string.";
      }
      bot.stack.push(a % b);
      bot.i++;
    }
  },
  DUPL: {
    cmd: "DUPL",
    argNums: [0],
    args: [],
    mutator: ({ bot, args, world }) => {
      if (bot.stack.length == 0) {
        return "Can't read from empty stack.";
      }
      bot.stack.push(bot.stack[bot.stack.length - 1]);
      bot.i++;
    }
  },
  MARK: {
    cmd: "MARK",
    argNums: [1],
    args: [{ match: [argTypes.MARK] }],
    mutator: ({ bot, args, world }) => {
      bot.i++;
    }
  }
};

module.exports = instructions;

function isNumeric(val) {
  val = val.toString();
  return (
    Number(parseFloat(val)) == val &&
    !val.split("").includes("E") &&
    !val.split("").includes(".")
  );
}
