import React, { Component } from "react";
import "../css/work_in_progress.css";

class WorkInProgress extends Component {
  state = {
    tabname: this.props.tableName,
    type: this.props.type
  };

  render() {
    return (
      <div>
        {/* {console.log(this.state.tabname)}
        {console.log(this.state.type)} */}
        {/* {this.state.tabname === "client_new" && this.state.type === "record" && (
          <div className="alert alert-warning mt-2">Do not refresh this page!</div>
        )} */}
        <div
          className="main"
          style={{ marginTop: "16px", textAlign: "center" }}
        >
          <div className="loader"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }
}
export default WorkInProgress;
