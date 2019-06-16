import React from "react";
import style from "./BotData.less";

export default class BotData extends React.Component {
  render() {
    let bot = this.props.bot;
    return (
      <div styleName="BotData">
        <div styleName="row">
          <div styleName="key">X</div>
          <div styleName="value" title={bot.x}>
            {bot.x}
          </div>
        </div>
        <div styleName="row noFlex">
          <div styleName="key">Stack</div>
          <div styleName="stack value" title={bot.x}>
            {bot.stack
              .slice()
              .reverse()
              .map((b, i) => (
                <div key={i + ":" + b}>{b}</div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
