import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  state = {};

  render() {
    const { isFinish, isStart } = this.props;
    const nodeType = isFinish ? "node-finish" : isStart ? "node-start" : "";
    return <div className={`node ${nodeType}`}></div>;
  }
}

export default Node;

export const DEFAULT_NODE = {
  row: 0,
  col: 0,
};
