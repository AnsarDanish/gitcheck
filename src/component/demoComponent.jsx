import React, { Component } from "react";
import { LoomWebContext } from "../Context.jsx";

class DemoComponent extends Component {
  state = {};

  componentDidMount() {
    const test = this.context.test;
    console.log(test);
  }

  render() {
    return <div></div>;
  }
}

DemoComponent.contextType = LoomWebContext;
export default DemoComponent;
