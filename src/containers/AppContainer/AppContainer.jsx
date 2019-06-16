import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "redux/actions";
import { bindActionCreators } from "redux";

import InputField from "components/InputField";
import style from "./AppContainer.less";

import { Route, Link, withRouter, Switch, Redirect } from "react-router-dom";
import BotList from "../../components/BotList/BotList";

@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.addBot();
  }
  doTick() {
    clearInterval(this.int);
    this.int = setInterval(() => {
      this.props.runTick();
    }, 333);
  }
  render() {
    return (
      <div styleName={"main"}>
        <BotList />
        <div style={{ flex: 1 }}>
          <button
            onClick={() => {
              this.props.runTick();
            }}
          >
            Run tick
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
              this.props.resetBots();
            }}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default AppContainer;
