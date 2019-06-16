import React from "react";
import style from "./Spacer.less";

export default class Spacer extends React.Component {
  render() {
    return (
      <div
        styleName="Spacer"
        style={{ width: this.props.w || 0, height: this.props.h || 0 }}
      />
    );
  }
}
