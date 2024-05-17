import React, { Component } from "react";
import "../css/work_in_progress.css";

class WorkInProgressSmall extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"  style={{textAlign: "center"}}>Loading...</span>
        </div>
      </div>
    );
  }
}

export default WorkInProgressSmall;
