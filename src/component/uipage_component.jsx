import React, { Component } from "react";
import "../css/uipage.css";

class UiPageComponent extends Component {
  state = {
    name: this.props.name,
    filter: {
      filter: [
        {
          co: "name",
          cl: "Name",
          mc: "=",
          an: "Client Details",
          ct: "String",
          af: "",
          rf: { id: "", value: "" },
        },
      ],
    },
  };

  constructor(props) {
    super(props);
    this.callbtn = this.callbtn.bind(this);
  }

  componentDidMount() {}

  callbtn() {
    // this.props.showClientInfo(this.state.filter);
    console.log(this.state.filter);
    this.props.showVariableCompo(this.state.filter);
  }

  render() {
    return (
      <div className="ui">
        {this.state.name === "initial" && (
          <div className="uipage uiform">
            <div className="hedd">Welcome To LoomYarn</div>
            <br></br>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-3"></div>
              <div className="col-md-4">
                <div className="hedd2">
                  Fill up your details. It will help in setting up your system.
                </div>
                <button className="mainbtn" onClick={this.callbtn}>
                  Click Here
                </button>
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UiPageComponent;
