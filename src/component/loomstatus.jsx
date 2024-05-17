import React, { Component } from "react";
import axios from "axios";
import WorkInProgress from "./work_in_progress";
import { Input } from "reactstrap";
import { Button, Modal as Mod } from "react-bootstrap";
import { json } from "react-router-dom";

class LoomStatusComponent extends Component {
  state = {
    records: [],
    loading: false,
    loca: this.props.loca,
    page_error: false,
    error: "",
    page_message: false,
    message: "",
    status: "",
    loom_num: "",
    workshopRec: [],
    workshop_num: "",
    showButton: false,
    off_all: false,
    model_error: false,
    reason: "",
    closebtn: false,
    issueType: [],
    type: "",
    on_off: [],
    setStatus: "",
  };

  constructor(props) {
    super(props);
    this.callbtn = this.callbtn.bind(this);
    this.getStatusRecords = this.getStatusRecords.bind(this);
    this.setValue = this.setValue.bind(this);
    this.closeList = this.closeList.bind(this);
    this.btnSubmitFun = this.btnSubmitFun.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.callFunc = this.callFunc.bind(this);

    this.state.issueType.push({ name: "none", label: "None" });
    this.state.issueType.push({ name: "robberyIssue", label: "Robbery Issue" });
    this.state.issueType.push({
      name: "inventoryIssue",
      label: "Inventory Issue",
    });
    this.state.issueType.push({
      name: "electricityIssue",
      label: "Electricity Issue",
    });
    this.state.issueType.push({
      name: "loomComponentIssue",
      label: "LoomComponent Issue",
    });
    this.state.issueType.push({ name: "strikeIssue", label: "Strike Issue" });
    this.state.issueType.push({ name: "taxIssue", label: "Tax Issue" });
    this.state.issueType.push({ name: "generalIssue", label: "General Issue" });
    this.state.issueType.push({
      name: "employee Issue",
      label: "Employee Issue",
    });
    this.state.issueType.push({ name: "orderIssue", label: "Order Issue" });
    this.state.issueType.push({ name: "vendorIssue", label: "Vendor Issue" });
    this.state.issueType.push({ name: "paymentIssue", label: "Payment Issue" });
    this.state.issueType.push({
      name: "infrastructureIssue",
      label: "Infrastructure Issue",
    });
    this.state.issueType.push({ name: "other", label: "Other" });

    this.state.on_off.push({ name: "none", label: "None" });
    this.state.on_off.push({ name: "onAll", label: "On All" });
    this.state.on_off.push({ name: "offAll", label: "Off All" });
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/get/workshop/record", {
        headers: { authorization: "Bearer " + token },
      })
      .then(
        (resp) => {
          let res = resp.data;
          console.log("workshop: ", res);
          if (res !== "") {
            if ("Error" in res) {
              this.setState({
                loading: false,
                page_error: true,
                error: res.Error,
              });
            } else {
              this.setState({ workshopRec: res.workshop, loading: false });
            }
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  getStatusRecords(val) {
    if (val !== "") {
      if (val === "none") {
        this.setState({ records: [], loading: false, workshop_num: val });
      } else {
        this.setState({ workshop_num: val, records: [] });
        var token = localStorage.getItem("token");
        axios
          .get(this.state.loca + "/loom/get/status/record/" + val, {
            headers: { authorization: "Bearer " + token },
          })
          .then(
            (resp) => {
              let res = resp.data;
              console.log("status: ", res);
              if (res !== "") {
                if ("Error" in res) {
                  this.setState({
                    loading: false,
                    page_error: true,
                    error: res.Error,
                  });
                } else {
                  this.setState({
                    records: res.loom,
                    loading: false,
                    closebtn: false,
                  });
                }
              }
            },
            (error) => {
              this.props.showErrorCompo();
              console.log(error);
            }
          );
      }
    }
  }

  callbtn(val, workshop, loom, workshopName, loomName) {
    if (val !== "" || val !== null) {
      if (val === "on") {
        var status = {
          workshop_id: workshop,
          workshop_name: workshopName,
          loom_id: loom,
          loom_name: loomName,
          tableName: "loom_issue",
        };
        localStorage.setItem("status", JSON.stringify(status));
        alert("create Issue Record");
        this.props.showFormCompo("loom_issue", 0, "new");
        this.setState({ showButton: true, loom_num: loom });
      } else {
        let body = {
          Status_val: val,
          workshop_number: workshop,
          loom_number: loom,
        };
        var token = localStorage.getItem("token");
        axios
          .post(this.state.loca + "/loom/update/status/record", body, {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            },
          })
          .then(
            (resp) => {
              let res = resp.data;
              if (res !== "") {
                if ("Error" in res) {
                  this.setState({
                    loading: false,
                    page_error: true,
                    error: res.Error,
                    showButton: false,
                  });
                } else {
                  this.setState({
                    loading: false,
                    status: res.status,
                    loom_num: res.loom_number,
                    showButton: false,
                  });
                  if (res.status === "on") {
                    this.getStatusRecords(this.state.workshop_num);
                  }
                }
              }
            },
            (error) => {
              this.props.showErrorCompo();
              console.log(error);
            }
          );
      }
    }
  }

  createRecord() {
    this.props.showFormCompo("loom_issue", 0, "new");
  }

  setValue(val) {
    this.setState({ off_all: val });
  }

  closeList() {
    this.setState({ off_all: false });
  }

  setReason(e) {
    this.setState({ reason: e.target.value, model_error: false });
  }

  setIssueType(e) {
    this.setState({ type: e.target.value });
  }

  changeStatus(val) {
    if (val === "onAll") {
      this.setState({ setStatus: val });
      this.btnSubmitFun("", val);
    } else if (val === "offAll") {
      this.setState({ setStatus: val, off_all: true });
    } else {
      this.setState({ setStatus: val });
    }
  }

  btnSubmitFun(val, status) {
    if (status === "onOff") {
      if (
        val === null ||
        (val === "" && this.state.type === null) ||
        this.state.type === ""
      ) {
        this.setState({
          model_error: true,
          error: "Please fill fields mark in red",
        });
      } else if (
        this.state.type === null ||
        this.state.type === "" ||
        this.state.type === "none"
      ) {
        this.setState({
          model_error: true,
          error: "Please fill fields mark in red",
        });
      } else if (val === null || val === "") {
        this.setState({
          model_error: true,
          error: "Please fill fields mark in red",
        });
      } else {
        let json = {
          workshop_number: this.state.workshop_num,
          reason: this.state.reason,
          issue_type: this.state.type,
          on_off: status,
        };
        this.callFunc(json);
      }
    } else if (status === "onAll") {
      let json = {
        workshop_number: this.state.workshop_num,
        reason: this.state.reason,
        issue_type: this.state.type,
        on_off: status,
      };
      this.callFunc(json);
    }
  }

  callFunc(json) {
    var token = localStorage.getItem("token");
    axios
      .post(this.state.loca + "/loom/status/set/onoffall", json, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        let res = resp.data;
        this.setState({ off_all: false, records: res.loom, closebtn: true });
      });
  }

  render() {
    return (
      <div className="pagesetup">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div>
            <div>
              <label className="d-flex" style={{ fontWeight: "bold" }}>
                Select Workshop
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  this.getStatusRecords(e.target.value);
                }}
                value={this.state.workshop_num}
              >
                <option value={"none"}>None</option>
                {this.state.workshopRec.map((obj, ind) => (
                  <option key={ind} value={obj.workshopNumber}>
                    {obj.workshopNumber}
                  </option>
                ))}
              </select>
            </div>
            {this.state.page_error === true && (
              <div className="alert alert-danger form_alt" role="alert">
                {this.state.error}
              </div>
            )}
            {this.state.page_message === true && (
              <div className="alert alert-success form_alt" role="alert">
                {this.state.message}
              </div>
            )}
            {this.state.records.length === 0 && <div>No Record Found</div>}
            {this.state.records.length !== 0 && (
              <div>
                <div
                  className="row"
                  style={{ marginTop: "7px", marginLeft: "9px" }}
                >
                  <div className="col-md-2">
                    <span>Update All Records:</span>
                  </div>
                  <div className="col-md-1">
                    <select
                      className=" selct_optfil "
                      onChange={(e) => this.changeStatus(e.target.value)}
                      value={this.state.setStatus}
                      // style={{ marginLeft: "-80px" }}
                    >
                      {this.state.on_off.map((clm, cl_o) => (
                        <option value={clm.name} key={cl_o}>
                          {clm.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            {this.state.records.length !== 0 && (
              <table className="table table-striped">
                <thead>
                  <tr>
                      <td className="h6">Status Records</td>
                    {/* <strong>Status Records</strong> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Loom Number</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                  {this.state.records.map((obj_in, index_in) => (
                    <tr key={index_in}>
                      <td>{obj_in.loom}</td>
                      <td>{obj_in.status}</td>
                      <td>
                        {obj_in.status === "on" ||
                        (this.state.status === "on" &&
                          obj_in.loom === this.state.loom_num) ? (
                          <i
                            className="fa fa-toggle-off"
                            style={{
                              color: "#269900",
                              fontSize: "larger",
                              fontWeight: "bold",
                            }}
                            aria-hidden="true"
                            onClick={() =>
                              this.callbtn(
                                obj_in.status,
                                obj_in.workshop,
                                obj_in.loom,
                                obj_in.workshopName,
                                obj_in.loomName
                              )
                            }
                          ></i>
                        ) : (
                          <i
                            className="fa fa-toggle-on"
                            style={{
                              color: "#cc0000",
                              fontSize: "larger",
                              fontWeight: "bold",
                            }}
                            aria-hidden="true"
                            onClick={() =>
                              this.callbtn(
                                obj_in.status,
                                obj_in.workshop,
                                obj_in.loom,
                                obj_in.workshopName,
                                obj_in.loomName
                              )
                            }
                          ></i>
                        )}
                      </td>
                      {/* <td>
                                                <div>
                                                    {this.state.showButton === true && this.state.loom_num === obj_in.loom && (
                                                        <input
                                                            type="button"
                                                            value="Insert"
                                                            className="csm_btn csm_btn_pri col-md-5 sub-btn"
                                                            onClick={() => {
                                                                this.createRecord();
                                                            }}
                                                        ></input>
                                                    )}
                                                </div>
                                            </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        <Mod show={this.state.off_all} onHide={this.closeList} size="xl">
          <Mod.Header closeButton>
            <Mod.Title>Reason</Mod.Title>
          </Mod.Header>
          {this.state.model_error === true && (
            <div className="alert alert-danger form_alt" role="alert">
              {this.state.error}
            </div>
          )}
          <Mod.Body>
            <div className="row">
              <div className="col-md-2">Issue Type :</div>
              <div className="col-md-1">
                <select
                  className={
                    this.state.model_error === true
                      ? "selct_optfil unverifi"
                      : "selct_optfil "
                  }
                  onChange={(e) => this.setIssueType(e)}
                  value={this.state.type}
                  style={{marginBottom: "15px" }}
                >
                  {this.state.issueType.map((clm, cl_o) => (
                    <option value={clm.name} key={cl_o}>
                      {clm.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Input
              className={
                this.state.model_error === true
                  ? "lom_form_control formpadd unverifi"
                  : "lom_form_control "
              }
              type="text"
              placeholder="Status Off Reason"
              onChange={(e) => {
                this.setReason(e);
              }}
            ></Input>
          </Mod.Body>
          <Mod.Footer>
            <Button
              onClick={(e) => {
                this.btnSubmitFun(this.state.reason, "onOff");
              }}
            >
              Submit
            </Button>
          </Mod.Footer>
        </Mod>
      </div>
    );
  }
}
export default LoomStatusComponent;
