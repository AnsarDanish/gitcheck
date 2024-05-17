import React, { Component } from "react";

export class ApUser extends Component {
  state = {
    sr: null,
    userDetails: {},
  };

  constructor(userDetails, setRecord) {
    super(userDetails);
    this.state.userDetails = JSON.parse(userDetails);
    this.state.sr = setRecord;
  }

  getUserId() {
    let userid = this.state.userDetails.userId;
    return userid;
  }

  getName() {
    let name = this.state.userDetails.name;
    return name;
  }

  getUserName() {
    let username = this.state.userDetails.username;
    return username;
  }

  getCid() {
    let cid = this.state.userDetails.cid;
    return cid;
  }

  // getId() {
  //   let id = this.state.userDetails.id;
  //   return id;
  // }

  // getLabel() {
  //   let label = this.state.userDetails.label;
  //   return label;
  // }

  // getUniId() {
  //   let uniId=this.state.userDetails.uniId;
  //   return uniId;
  // }

  render() {
    return <div>ApUser</div>;
  }
}

export default ApUser;
