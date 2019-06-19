const instructions = require("./instructions");

class CPU {
  constructor({ id, code, room, x, stack, i, deathMessage, isTemp }) {
    this.id = id;
    this.code = code || "";
    this.x = x || 0;
    this.room = room || 0;
    this.stack = stack || [];
    this.i = i || 0;
    this.ticks = 0;
    this.deathMessage = deathMessage || "";
    this.isDead = false;
    this.isTemp = isTemp || false;
    this.parseCode();
    this.validateCode();
  }
  resetBot() {
    this.x = 0;
    this.room = 0;
    this.i = 0;
    this.ticks = 0;
    this.isDead = false;
    this.deathMessage = "";
    this.stack = [];
  }
  updateCode(code) {
    this.code = code || "";
    this.parseCode();
    this.validateCode();
  }
  runTick(world) {
    if (this.isDead) {
      return;
    }

    let cmd = this.codeArray.find(l => l.line == this.i + 1);
    if (!cmd) {
      this.die("Out of instructions");
      return;
    }
    this.ticks++;
    let ins = instructions[cmd.cmd];
    let error = ins.mutator({ bot: this, args: cmd.args, world: world });
    if (error) {
      this.die(error);
    }
  }
  toJSON() {
    return {
      id: this.id,
      code: this.code,
      x: this.x,
      room: this.room,
      stack: this.stack,
      i: this.i,
      ticks: this.ticks,
      deathMessage: this.deathMessage,
      isDead: this.isDead,
      isTemp: this.isTemp,
      codeArray: this.codeArray
    };
  }
  die(msg) {
    this.isDead = true;
    this.deathMessage = msg;
    console.log("BOT DIED", msg);
  }
  validateCode() {
    let valid = true;
    this.codeArray = this.codeArray.map(line => {
      line.valid = this.validateLine(line);
      return line;
    });
  }
  validateLine(line) {
    if (line.type == "blank") {
      return true;
    }
    let ins = instructions[line.cmd];
    if (!ins) {
      return false;
    }
    //validate arguments.
    if (!ins.argNums.includes(line.args.length)) {
      return false;
    }

    let valid = true;
    ins.args.map((ad, i) => {
      let oneValid = false;
      let givenArg = line.args[i];
      if (!ad.optional && !givenArg) {
        vaild = false;
        return;
      }
      if (ad.optional && !givenArg) {
        return;
      }
      ad.match.map(vfunc => {
        if (vfunc(givenArg) == true) {
          oneValid = true;
        }
      });
      if (!oneValid) {
        valid = false;
      }
    });
    return valid;
  }
  parseCode() {
    let lineNum = 0;
    this.codeArray = this.code.split("\n").map((l, i) => {
      l = l.trim().toUpperCase();
      if (l == "" || l.startsWith(";")) {
        return { type: "blank" };
      }
      lineNum++;
      l = l.split(";")[0].trim();
      l = applySugar(l);
      let c = l.split(" ");

      return {
        type: "code",
        cmd: c[0],
        text: l,
        args: c.slice(1) || [],
        line: lineNum
      };
    });
  }
}

module.exports = CPU;

function applySugar(text) {
  if (
    text.startsWith("TEST") &&
    (text.includes("<") ||
      text.includes(">") ||
      text.includes("=") ||
      text.includes("!="))
  ) {
    let cmd = "";
    let symbol = "";
    if (text.includes("<")) {
      symbol = "<";
      cmd = "TLT";
    }
    if (text.includes(">")) {
      symbol = ">";
      cmd = "TGT";
    }
    if (text.includes("=")) {
      symbol = "=";
      cmd = "TEQ";
    }
    if (text.includes("!=")) {
      symbol = "!=";
      cmd = "TNE";
    }

    let t = text.split(" ").filter(a => a != "");
    if (!t[3]) {
      if (!t[1].split(symbol)[0] || !t[1].split(symbol)[1]) {
        return text;
      }
      return cmd + " " + t[1].split(symbol)[0] + " " + t[1].split(symbol)[1];
    }
    return cmd + " " + t[1] + " " + t[3];
  }
  if (text == "FLIP") {
    return "SWAP";
  }
  if (text.startsWith("REPL")) {
    return text.replace("REPL","FORK");
  }
  return text;
}
