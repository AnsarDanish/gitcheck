import React, { Component } from "react";
import axios from "axios";
import WorkInProgress from "./work_in_progress";

class RoleSelectionComponent extends Component {
  state = {
    loading: false,
    columnarray: [],
    columnarray2: [],
    i_d: this.props.i_d,
    rt: this.props.rt,
    page_error: false,
    error: "",
    page_message: false,
    message: "",
    loca: this.props.loca,
  };

  constructor(props) {
    super(props);
    this.getInitialDetails = this.getInitialDetails.bind(this);
    this.setColumn = this.setColumn.bind(this);
    this.getDetailsList = this.getDetailsList.bind(this);
    this.changeCheckBox = this.changeCheckBox.bind(this);
    this.setColumnbtn = this.setColumnbtn.bind(this);
    this.submitColumnbtn = this.submitColumnbtn.bind(this);
  }

  componentDidMount() {
    this.getDetailsList();
  }

  getInitialDetails(col_mn) {
    let loca = this.state.loca;
    let json = { id: this.state.i_d };

    let url = "";
    var token = localStorage.getItem("token");
    if (this.state.rt === "user_role") {
      url = loca + "/loom/get/role";
    } else if (this.state.rt === "group_role") {
      url = loca + "/loom/get/group/role";
    } else if (this.state.rt === "group_user") {
      url = loca + "/loom/get/group/user";
    }
    axios
      .post(url, json, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          let roleList = resp.data;
          if ("Error" in roleList) {
            this.setState({
              loading: false,
              page_error: true,
              error: roleList.Error,
            });
          } else {
            this.setColumn(roleList.roleList, col_mn);
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  setColumn(prf, col_mn) {
    var clm = col_mn;
    var clm2 = [];
    for (var ii = 0; ii < clm.length; ii++) {
      clm[ii].check = false;
    }
    for (var i = 0; i < clm.length; i++) {
      for (var p = 0; p < prf.length; p++) {
        if (clm[i].id === prf[p].id) {
          clm[i].check = true;
          clm2.push({ name: clm[i].label, id: clm[i].id });
        }
      }
    }
    this.setState({
      columnarray: clm,
      columnarray2: clm2,
    });
  }

  getDetailsList() {
    let name = "";
    if (this.state.rt === "group_user") {
      name = "local_user";
    } else {
      name = "role";
    }
    var tablere = '{"formRecordList":[';
    tablere += '{"application":{"id":"","name":"loom"}}';
    tablere += ',{"table":{"id":"","name":"' + name + '"}}';
    tablere += ',{"records":[]}';
    tablere +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';
    tablere += ',{"sort":{"asc":"true","column":"id"}}';
    tablere +=
      ',{"filter": [{"co": "","cl": "","mc": "", "an": "","ct": "","af": "","rf": { "id": "", "value": "" }}]}';
    tablere += ',{"timeLine":""}]}';
    // tablere += ',{"timeLine":"' + "" + '"}]}';
    var token = localStorage.getItem("token");
    axios
      .post(
        this.state.loca + "/loom/get/multiple/allrecord",
        tablere.toString(),
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        }
      )
      .then((resp) => {
        let roleList = resp.data;
        console.log("record: ", roleList);
        let recordList = roleList.formRecordList[2].records;
        if (roleList !== "") {
          console.log(roleList);
          if ("Error" in roleList) {
            this.setState({
              loading: false,
              page_error: true,
              error: roleList.Error,
            });
          } else {
            let name = [];
            let id = [];
            for (let i = 0; i < recordList.length; i++) {
              for (let j = 0; j < recordList[i].record.length; j++) {
                if (j === 0 && recordList[i].record[j].name === "id") {
                  id.push(recordList[i].record[j].value);
                }
                if (recordList[i].record[j].name === "name") {
                  name.push(recordList[i].record[j].value);
                  break;
                }
              }
            }
            let col_mn = [];
            for (let i = 0; i < name.length; i++) {
              col_mn.push({ label: name[i], id: id[i], check: false });
            }
            this.setState({
              columnarray: col_mn,
              loading: false,
            });
            this.getInitialDetails(col_mn);
          }
        }
      },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        });
  }

  changeCheckBox(e, index) {
    var col = this.state.columnarray;
    col[index].check = e;
    this.setState({ columnarray: col });
  }

  setColumnbtn() {
    var colm = this.state.columnarray;
    var colm2 = [];
    for (var i = 0; i < colm.length; i++) {
      if (colm[i].check === true) {
        colm2.push({ name: colm[i].label, id: colm[i].id });
      }
    }
    this.setState({ columnarray2: colm2 });
  }

  submitColumnbtn() {
    var columnarray2 = this.state.columnarray2;
    var token = localStorage.getItem("token");

    if (this.state.rt === "group_user") {
      let json = { users: [], id: this.state.i_d };
      for (let i = 0; i < columnarray2.length; i++) {
        json.users.push(columnarray2[i]);
      }

      axios
        .post(this.state.loca + "/loom/set/group/user", json, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        })
        .then(
          (resp) => {
            let result = resp.data;
            if (result !== "") {
              if ("Error" in result) {
                this.setState({
                  loading: false,
                  page_error: true,
                  error: result.Error,
                  page_message: false,
                  message: "",
                });
              } else {
                this.setState({
                  loading: false,
                  page_message: true,
                  message: result.Message,
                  page_error: false,
                  error: "",
                });
              }
            }
          },
          (error) => {
            this.props.showErrorCompo();
            console.log(error);
          }
        );
    } else {
      let json = { roles: [], id: this.state.i_d };
      for (let i = 0; i < columnarray2.length; i++) {
        json.roles.push(columnarray2[i]);
      }
      let loca = this.state.loca;
      let url = "";
      if (this.state.rt === "user_role") {
        url = loca + "/loom/set/role";
      } else if (this.state.rt === "group_role") {
        url = loca + "/loom/set/group/role";
      }
      axios
        .post(url, json, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        })
        .then(
          (resp) => {
            let result = resp.data;
            if (result !== "") {
              if ("Error" in result) {
                this.setState({
                  loading: false,
                  page_error: true,
                  error: result.Error,
                  page_message: false,
                  message: "",
                });
              } else {
                this.setState({
                  loading: false,
                  page_message: true,
                  message: result.Message,
                  page_error: false,
                  error: "",
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

  render() {
    return (
      <div className="">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div className="container justifyContentCenter align-items-center my-5 ">
            {this.state.page_error === true && (
              <div className="alertgp alert-danger"
                style={{ color: "black" }}>{this.state.error}</div>
            )}
            {this.state.page_message === true && (
              <div className="alertgp alert-success"
                style={{ color: "black" }}>{this.state.message}</div>
            )}
            <div className="row">
              <div className="card col-md-6">
                {this.state.columnarray.length > 0 &&
                  this.state.columnarray.map((obj, obj_i) => (
                    <div key={obj_i}>
                      <div className="row">
                        <div className="col-md-10">{obj.label}</div>
                        <div className="col-md-2">
                          <input
                            className="chx_bx"
                            type="checkbox"
                            checked={obj.check ? true : false}
                            onChange={(e) => {
                              this.changeCheckBox(e.target.checked, obj_i);
                            }}
                          ></input>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="card col-md-6">
                {this.state.columnarray2.length > 0 &&
                  this.state.columnarray2.map((obp, obj_p) => (
                    <div key={obj_p}>{obp.name}</div>
                  ))}
              </div>
            </div>
            <div className="row my-3  justifyContentAround">
              <div className="col-md-3">
                <button
                  type="button"
                  className=" btnnn btn btn-primary"
                  onClick={() => {
                    this.setColumnbtn();
                  }}
                >
                  Set
                </button>
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  className=" btnnn btn btn-primary"
                  onClick={() => {
                    this.submitColumnbtn();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RoleSelectionComponent;
