import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "redux/actions";
import { bindActionCreators } from "redux";
import style from "./BotList.less";
import BotDisplay from "../BotDisplay/BotDisplay";
import Spacer from "../Spacer/Spacer";

import debounceRender from "react-debounce-render";
class BotList extends React.Component {
  doTick() {
    clearInterval(this.int);
    this.int = setInterval(() => {
      this.props.runTick();
    }, 1000 / 10);
  }
  render() {
    return (
      <div styleName="BotList">
        <button
          onClick={() => {
            clearInterval(this.int);
            this.props.runTick();
          }}
        >
          Run tick / Pause
        </button>
        <button
          onClick={() => {
            this.doTick();
          }}
        >
          Run ticks
        </button>
        <button
          onClick={() => {
            clearInterval(this.int);
            this.props.resetBots();
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            this.props.addBot();
          }}
        >
          Add new bot
        </button>
        <Spacer h={12} />
        {Object.values(this.props.bots.bots).map(b => {
          return (
            <BotDisplay
              key={b.id}
              updateBot={this.props.updateBot}
              bot={b}
              ticks={b.ticks}
              i={b.i}
            />
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bots: state.bots
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

let DBotList = connect(
  mapStateToProps,
  mapDispatchToProps
)(debounceRender(BotList, 1000 / 60, { leading: true, maxWait: 1000 / 8 }));

export default DBotList;
