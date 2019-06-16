import React from "react";
import style from "./BotDisplay.less";
import Spacer from "../Spacer/Spacer";
import TextareaAutosize from "react-autosize-textarea";
export default class BotDisplay extends React.Component {
  render() {
    let bot = this.props.bot;
    let instruction = bot.i - 1;

    //console.log(lines);
    let lines = bot.codeArray.map((l, i) => {
      return l.type == "blank" ? (
        <div styleName={"lineNum"} key={"line" + i}>
          &nbsp;
        </div>
      ) : (
        <div styleName={"lineNum"} key={"line" + i}>
          {l.line}
          {l.valid && l.line - 1 == instruction && (
            <div styleName="currentIns" />
          )}
          {!l.valid && <div styleName="error" />}
        </div>
      );
    });
    return (
      <div styleName="BotDisplay">
        <div styleName="title">Bot #{bot.id}</div>
        <Spacer h={4} />
        <div styleName="codeWrap">
          <div styleName="lineNums">{lines}</div>
          <TextareaAutosize
            onChange={e => {
              this.props.updateBot(bot.id, {
                ...bot,
                code: e.target.value,
                codeArray: codeToLines(e.target.value)
              });
            }}
            styleName="code"
            value={bot.code}
          />
        </div>
      </div>
    );
  }
}

function codeToLines(code) {
  let ei = 0;
  return code.split("\n").map((l, i) => {
    l = l.trim().toUpperCase();
    if (l == "" || l.startsWith(";")) {
      return { type: "blank" };
    }
    ei++;
    return { type: "code", cmd: l, line: ei, valid: validateLine(l) };
  });
}

function validateLine(line) {
  if (line.length > 20) {
    return false;
  }
  if (line.startsWith(";")) {
    return true;
  }
  if (line == "NOOP") {
    return true;
  }

  let cmdArray = line.split(" ");

  if (
    cmdArray[0] == "ROT" ||
    cmdArray[0] == "RJMP" ||
    cmdArray[0] == "AJMP" ||
    cmdArray[0] == "SUBM" ||
    cmdArray[0] == "WALK" ||
    cmdArray[0] == "WAIT" ||
    cmdArray[0] == "REPL"
  ) {
    if (cmdArray.length !== 2) {
      return false;
    }
    if (validnxp(cmdArray[1])) {
      return true;
    }
  }

  if (cmdArray[0] == "PUSH") {
    if (cmdArray.length !== 2) {
      return false;
    }
    if (validnx(cmdArray[1])) {
      return true;
    }
  }

  if (cmdArray[0] == "POP") {
    if (cmdArray.length == 1) {
      return true;
    }
    if (cmdArray.length == 2) {
      return cmdArray[1] == "X";
    }
  }

  if (cmdArray[0] == "MARK") {
    if (cmdArray.length == 2) {
      return true;
    }
  }

  if (cmdArray[0] == "SEND") {
    if (cmdArray.length == 3) {
      return validnxp(cmdArray[1] && cmdArray[2]);
    }
  }
  if (
    cmdArray[0] == "RECV" ||
    cmdArray[0] == "ADDI" ||
    cmdArray[0] == "SUBI" ||
    cmdArray[0] == "MULI" ||
    cmdArray[0] == "DIVI"
  ) {
    if (cmdArray.length == 1) {
      return true;
    }
    if (cmdArray.length !== 2) {
      return false;
    }
    if (validxp(cmdArray[1])) {
      return true;
    }
  }

  if (cmdArray[0] == "JUMP" || cmdArray[0] == "TJMP" || cmdArray[0] == "FJMP") {
    if (cmdArray.length !== 2) {
      return false;
    }
    return true;
  }

  if (cmdArray[0] == "TEST") {
    if (cmdArray.length == 4) {
      return validexpression(cmdArray[1], cmdArray[2], cmdArray[3]);
    }
  }

  return false;
}

function validnx(e) {
  return e == "X" || isNumeric(e);
}
function validnxp(e) {
  return e == "X" || e == "POP" || isNumeric(e);
}

function validxp(e) {
  return e == "X" || e == "PUSH";
}

function isNumeric(val) {
  return (
    Number(parseFloat(val)) == val &&
    !val.split("").includes("E") &&
    !val.split("").includes(".")
  );
}

function validexpression(a, b, c) {
  if (b == ">" || b == "<" || b == "=") {
    return validnxp(a) && validnxp(c);
  }
  return false;
}
