import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "redux/actions";
import { bindActionCreators } from "redux";

import InputField from "components/InputField";
import style from "./AppContainer.less";

import { Route, Link, withRouter, Switch, Redirect } from "react-router-dom";
import BotList from "../../components/BotList/BotList";
import { codeToLines } from "../../components/BotDisplay/BotDisplay";

const defaultCode = `;FIBONACCI
PUSH 0
DUPL
POP X
PUSH 1

MARK LOOP
DUPL
PUSH X
ADDI
FLIP
DUPL
POP X
FLIP
JUMP LOOP`;

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
    this.props.addBot({
      code: defaultCode,
      codeArray: codeToLines(defaultCode)
    });
  }

  render() {
    return (
      <div styleName={"main"}>
        <BotList />
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
