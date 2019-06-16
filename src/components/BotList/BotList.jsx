import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "redux/actions";
import { bindActionCreators } from "redux";
import style from "./BotList.less";
import BotDisplay from "../BotDisplay/BotDisplay";
import Spacer from "../Spacer/Spacer";

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class BotList extends React.Component {
  render() {
    return (
      <div styleName="BotList">
        <div
          onClick={() => {
            this.props.addBot();
          }}
        >
          Add new bot
        </div>
        <Spacer h={12} />
        {Object.values(this.props.bots.bots).map(b => {
          return (
            <BotDisplay key={b.id} updateBot={this.props.updateBot} bot={b} />
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

export default BotList;