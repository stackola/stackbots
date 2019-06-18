import React from "react";
import style from "./BotDisplay.less";
import Spacer from "../Spacer/Spacer";
import TextareaAutosize from "react-autosize-textarea";
import BotData from "../BotData/BotData";
export default class BotDisplay extends React.PureComponent {
  render() {
    let bot = this.props.bot;
    let instruction = bot.i;

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
        <div styleName="title">
          Bot #{bot.id} ({this.props.ticks})
        </div>
        <Spacer h={4} />

        <div styleName="codeWrap">
          <div styleName="lineNums">{lines}</div>
          <TextareaAutosize
            onChange={e => {
              this.props.updateBot(bot.id, e.target.value);
            }}
            styleName="code"
            value={bot.code}
          />
          <BotData bot={bot} />
        </div>
        {bot.isDead && <div styleName="deathMsg">{bot.deathMessage}</div>}
      </div>
    );
  }
}

