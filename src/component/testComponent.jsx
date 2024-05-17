import React, { Component } from "react";
import { LoomWebContext } from "../Context.jsx";
// import { useNavigate } from "react-router-dom";

class TestComponent extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.callbtn = this.callbtn.bind(this);
  }

  componentDidMount() {
    this.context.test = "kulsum";
    const test = this.context.test;
    console.log(test);
  }

  callbtn() {
    // this.props.navigate("/demoCompo");
    // let navigate = useNavigate();
    // navigate("/demoCompo");
  }

  render() {
    return (
      <div>
        {
          <button type="button" name="Click" onClick={this.callbtn}>
            Click
          </button>
        }
      </div>
    );
  }
}

// export function AppWithRouter(props) {
//   const navigate = useNavigate();
//   return <TestComponent navigate={navigate}></TestComponent>;
// }

TestComponent.contextType = LoomWebContext;

export default TestComponent;
