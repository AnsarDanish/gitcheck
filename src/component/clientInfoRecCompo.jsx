import React, { Component } from "react";
import axios from "axios";
import { Button, Table } from "reactstrap";
import ModelList from "./model_list";
import { Modal } from "react-bootstrap";
import "../css/multi_insert.css";
import WorkInProgress from "./work_in_progress";

class ClientInfoRecCompo extends Component {
  state = {
    record: {},
    formRecord: [],
    refrecord: [],
    button: [],
    mainRecord: [],
    flag: false,
    headings: [],
    pageError: false,
    error: "",
    columnId: "",
    cur_ref_name: "",
    cur_ref_type: "",
    cur_ref_index: 0,
    objLabel: "",
    showModelList: false,
    rid: this.props.rid,
    tableName: this.props.tabname,
    loca: this.props.loca,
  };

  constructor(props) {
    super(props);
    this.getInitialData = this.getInitialData.bind(this);
    this.getInitialFormData = this.getInitialFormData.bind(this);
    this.getRecordForm = this.getRecordForm.bind(this);
    this.formChangefn = this.formChangefn.bind(this);
    this.validationfn = this.validationfn.bind(this);
    this.setRefrecord = this.setRefrecord.bind(this);
    this.setRef = this.setRef.bind(this);
    this.cancelModelList = this.cancelModelList.bind(this);
    this.callbtn = this.callbtn.bind(this);
    this.clickRefrence = this.clickRefrence.bind(this);
    this.fieldverify = this.fieldverify.bind(this);
  }

  componentDidMount() {
    this.getInitialData();
  }

  getInitialData() {
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/get/userform/record/" + this.state.rid, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        let result = resp.data;
        console.log(result);
        this.getInitialFormData();
        this.setState({
          headings: result.headings,
          record: result.records,
        });
      });
  }

  getInitialFormData() {
    var token = localStorage.getItem("token");
    axios
      .get(
        this.state.loca +
        "/loom/get/singlerecord/" +
        this.state.tableName +
        "/" +
        this.state.rid,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((resp) => {
        const mprecord = resp.data;
        if (mprecord !== "") {
          if ("Error" in mprecord) {
            this.setState({
              loading: false,
              page_error: true,
              error: mprecord.Error,
            });
          } else {
            this.setState({
              formRecord: mprecord.formRecord[2].record,
              mainRecord: mprecord,
              button: mprecord.formRecord[3].button,
              flag: true,
              loading: false,
            });
          }
        }
      },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        });
  }

  getRecordForm(r_id) {
    var token = localStorage.getItem("token");
    axios
      .get(
        this.state.loca +
        "/loom/get/singlerecord/" +
        this.state.tableName +
        "/" +
        r_id,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((resp) => {
        const mprecord = resp.data;
        if (mprecord !== "") {
          if ("Error" in mprecord) {
            this.setState({
              loading: false,
              page_error: true,
              error: mprecord.Error,
            });
          } else {
            this.setState({
              formRecord: mprecord.formRecord[2].record,
              mainRecord: mprecord,
              button: mprecord.formRecord[3].button,
              flag: true,
              loading: false,
            });
          }
        }
      },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        });
  }

  formChangefn(vl, index, ob, type, id, vrf) {
    var frecord = this.state.formRecord;
    if (type === "reference") {
      if (vrf === false) {
        frecord[index].clicked = false;
      }
      if (vl.length > 2) {
        if (vrf === true) {
          if (frecord[index].name === ob) {
            frecord[index].value.value = vl;
            frecord[index].value.id = id;
            frecord[index].clicked = true;
            var rfrcd2 = this.state.refrecord;
            rfrcd2.record = [];
            this.setState({ formrecord: frecord, refrecord: rfrcd2 });
            this.validationfn(vl, index, ob, type, id);
          }
        } else {
          if (frecord[index].name === ob) {
            frecord[index].value.value = vl;
            frecord[index].value.id = id;
            this.setState({ formrecord: frecord });
          }
          var veri = '{"referenceRecord":[{"columnid":"' + id + '"},';
          veri += '{"tabvalue":"' + vl + '"}]}';
          var token = localStorage.getItem("token");
          var rff = [];
          axios
            .post(this.state.loca + "/loom/reference/record", veri.toString(), {
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
              },
            })
            .then((resp) => {
              const refrencercd = resp.data;
              if (refrencercd !== "") {
                if ("Error" in refrencercd) {
                  this.setState({
                    loading: false,
                    page_error: true,
                    error: refrencercd.Error,
                  });
                } else {
                  rff = refrencercd.referenceRecordList[2].records;
                }
              }
              var rf = { index: index, record: rff };
              this.setState({ refrecord: rf });
            },
              (error) => {
                this.props.showErrorCompo();
                console.log(error);
              });
        }
      } else {
        if (frecord[index].name === ob) {
          frecord[index].value.value = vl;
          // frecord[index].value.id = id;
          frecord[index].value.id = "0";
          var rfrcd3 = this.state.refrecord;
          rfrcd3.record = [];
          this.setState({ formrecord: frecord, refrecord: rfrcd3 });
        }
      }
    } else {
      if (frecord[index].name === ob) {
        frecord[index].value = vl;
        this.setState({ formrecord: frecord });
      }
    }
  }

  validationfn(vl, index, ob, type, id) {
    var formrecord = this.state.formRecord;
    if (type === "reference") {
      if (vl !== "") {
        var token = localStorage.getItem("token");
        var veri = '{"referenceRecord":[{"columnid":"' + id + '"},';
        veri += '{"tabvalue":"' + vl + '"}]}';
        axios
          .post(this.state.loca + "/loom/reference/verify", veri.toString(), {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            },
          })
          .then((resp) => {
            const refrencercd = resp.data;
            if (refrencercd !== "") {
              if ("Error" in refrencercd) {
                this.setState({
                  loading: false,
                  page_error: true,
                  error: refrencercd.Error,
                });
              } else {
                if (refrencercd.Result === "Unverified") {
                  formrecord[index].verified = "unverified";
                  this.setState({ formrecord: formrecord });
                } else {
                  formrecord[index].verified = "verified";
                  var rfrcd = this.state.refrecord;
                  rfrcd.record = [];
                  this.setState({ formrecord: formrecord, refrecord: rfrcd });
                }

                this.setState({ formrecord: formrecord });
                return;
              }
            }
          });
      } else {
        formrecord[index].verified = "initial";
        this.setState({ formrecord: formrecord });
      }
    } else {
      if (formrecord[index].name === ob) {
        if (vl !== "") {
          formrecord[index].verified = this.fieldverify(
            formrecord[index].type,
            vl
          );
        } else {
          formrecord[index].verified = "initial";
        }
      }
      this.setState({ formrecord: formrecord });
    }
  }

  setRefrecord(vl, index, ob, type, id) {
    this.formChangefn(vl, index, ob, type, id, true);
  }

  setRef(val, id) {
    this.cancelModelList();
  }

  cancelModelList() {
    this.setState({
      showModelList: false,
    });
  }

  callbtn(nam) {
    var btn = this.state.button;
    var mnrecord = this.state.mainRecord;
    var rcd = this.state.formRecord;

    var mandatory = [];
    var unverified = [];

    for (let i = 0; i < rcd.length; i++) {
      if (rcd[i].name === "filter") {
        rcd[i].value = { filter: this.state.filtarray };
        break;
      }
    }

    for (var i = 0; i < rcd.length; i++) {
      if (rcd[i].uivalid.visible === "true") {
        if (rcd[i].uivalid.mandatory === "true") {
          if (rcd[i].value === "") {
            mandatory.push(rcd[i].name);
          }
        }
        if (
          rcd[i].type === "String" ||
          rcd[i].type === "int" ||
          rcd[i].type === "email" ||
          rcd[i].type === "date" ||
          rcd[i].type === "reference"
        ) {
          var veri = this.fieldverify(rcd[i].type, rcd[i].value);
          var msnd = rcd[i].uivalid.mandatory;
          if (veri === "unverified" && msnd === "true") {
            unverified.push(rcd[i].name);
          }
        }
      }
    }

    var btntype = "";
    var foundbtn = false;
    var btnRtype = "";

    for (var ij = 0; ij < btn.length; ij++) {
      if (btn[ij].name === nam) {
        btntype = btn[ij].returnWebLocation;
        btnRtype = btn[ij].recordReturnType;
        foundbtn = true;
        break;
      }
    }
    if (foundbtn === true && btntype !== "") {
      if (mandatory.length === 0 && unverified.length === 0) {
        this.setState({
          page_error: false,
          error: "",
          loading: true,
          page_message: false,
          message: "",
        });
        mnrecord.formRecord[2].record = rcd;
        if (btnRtype === "Grid") {
          this.props.showClientInfoRec(this.state.tableName, this.state.rid);
          // navigation("/clientinforecord", {
          //   state: { rid: this.state.rid, tableName: this.state.tableName },
          // });
        } else {
          var token = localStorage.getItem("token");
          if (btn[ij].call_type === "run_scrip") {
            var json =
              '{"rcd_Button":[' +
              JSON.stringify(btn[ij]) +
              "," +
              JSON.stringify(mnrecord) +
              "]}";
            axios
              .post(this.state.loca + btn[ij].webUrl, json, {
                headers: {
                  "Content-Type": "application/json",
                  authorization: "Bearer " + token,
                },
              })
              .then((resp) => {
                const rcd = resp.data;
                console.log(rcd);
                if (rcd !== "") {
                  if ("Error" in rcd) {
                    this.setState({
                      loading: false,
                      page_error: true,
                      error: rcd.Error,
                    });
                  } else {
                    this.setState({ loading: false });
                    var msg = "rcd.formRecord[4].message";
                    if (msg !== "") {
                      this.setState({ page_message: true, message: msg });
                    }
                    if (btntype === "NextPage") {
                      // var nextP = btn[ij].nextPage;
                      var nextP = rcd.formRecord[3].button.nextPage;
                      if (nextP === "List") {
                        this.callNextPage();
                      }
                    }
                  }
                }
              });
          } else {
            axios
              .post(this.state.loca + btn[ij].webUrl, mnrecord, {
                headers: {
                  "Content-Type": "application/json",
                  authorization: "Bearer " + token,
                },
              })
              .then((resp) => {
                const rcd = resp.data;
                if (rcd !== "") {
                  if ("Error" in rcd) {
                    this.setState({
                      loading: false,
                      page_error: true,
                      error: rcd.Error,
                    });
                  } else {
                    this.setState({ loading: false });
                    var msg = rcd.formRecord[4].message;
                    if (msg !== "") {
                      this.setState({ page_message: true, message: msg });
                    }
                    if (btntype === "NextPage") {
                      var nextP = btn[ij].nextPage;
                      if (nextP === "List") {
                        this.callNextPage();
                      }
                    }
                  }
                }
              },
                (error) => {
                  this.props.showErrorCompo();
                  console.log(error);
                });
          }
        }
      } else {
        var error_String = "";
        if (mandatory.length > 0) {
          error_String += " Check mandatory fields not set: " + mandatory;
        }
        if (unverified.length > 0) {
          error_String += " Fields unverified:" + unverified;
        }
        this.setState({
          loading: false,
          page_error: true,
          error: error_String,
        });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }
  }

  clickRefrence(index, name, type, col) {
    this.setState({
      columnId: col,
      cur_ref_name: name,
      cur_ref_type: type,
      cur_ref_index: index,
      showModelList: true,
    });
    this.handleShow();
  }

  fieldverify(type, vl) {
    if (type === "String") {
      // if (/[a-zA-Z]/g.test(vl)) {
      return "verified";
      // } else {
      //   return "unverified";
      // }
    }

    if (type === "email") {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "int") {
      if (/^[0-9]*[0-9][0-9]*$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "date") {
      if (/^[+-]?\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "time") {
      if (/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "reference") {
      if (/[a-zA-Z]/g.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "filter") {
      if (/[a-zA-Z]/g.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
  }

  render() {
    return (
      <div className="">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div>
            {this.state.pageError && (
              <div className="alert alert-danger mt-3"
                style={{ color: "black" }}> {this.state.error}</div>
            )}
            <Table className="objname">
              <thead>
                <tr>
                  {this.state.flag &&
                    this.state.headings.map((obj, index) => (
                      <th key={index}>{obj}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {this.state.flag &&
                  this.state.record.row.map((obj, row_ind) => (
                    <tr key={row_ind}>
                      {obj.cols.map((obj_in, col_ind) => (
                        <td key={col_ind}>{obj_in.value}</td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div className="pagesetup formTop">
              <div className=" maincompo ">
                {this.state.formRecord.length === 0 && (
                  <div>Dont have response...</div>
                )}
                {this.state.formRecord.length > 0 && (
                  <div style={{ textAlign: "start" }}>
                    {this.state.formRecord.map((obj, index) => (
                      <span key={index}>
                        {obj.uivalid.visible === "true" && (
                          <div key={obj.name}>
                            {obj.type === "String" && obj.name === "comment" ? (
                              <div className=" form-group  ">
                                {obj.uivalid.mandatory === "true" &&
                                  obj.value !== "" && (
                                    <i
                                      className="fa fa-asterisk mndtryfalse"
                                      aria-hidden="true"
                                    ></i>
                                  )}

                                {obj.uivalid.mandatory === "true" &&
                                  obj.value === "" && (
                                    <i
                                      className="fa fa-asterisk mndtrytrue"
                                      aria-hidden="true"
                                    ></i>
                                  )}
                                <span>{obj.label}</span>
                                {obj.verified === "unverified" && (
                                  <div
                                    className="alert alert-danger form_alt"
                                    role="alert"
                                  >
                                    Please verify your cherecter not except
                                    number!
                                  </div>
                                )}
                                <input
                                  type="text"
                                  className={
                                    obj.verified === "unverified"
                                      ? "form-control formpadd_danger unverifi"
                                      : "form-control formpadd "
                                  }
                                  value={obj.value}
                                  readOnly={obj.uivalid.read_only === "true"}
                                  maxLength={obj.uivalid.max_length}
                                  onChange={(e) =>
                                    this.formChangefn(
                                      e.target.value,
                                      index,
                                      obj.name,
                                      obj.type,
                                      obj.id,
                                      false
                                    )
                                  }
                                  onMouseOut={(e) =>
                                    this.validationfn(
                                      e.target.value,
                                      index,
                                      obj.name,
                                      obj.type,
                                      obj.id
                                    )
                                  }
                                ></input>
                              </div>
                            ) : null}
                            {/* {obj.type === "JSONObject" ? (
                          <div className=" form-group  ">
                            {obj.uivalid.mandatory === "true" &&
                              obj.value !== "" && (
                               <i
                                      className="fa fa-asterisk mndtryfalse"
                                      aria-hidden="true"
                                    ></i>
                              )}

                            {obj.uivalid.mandatory === "true" &&
                              obj.value === "" && (
                               <i
                                      className="fa fa-asterisk mndtrytrue"
                                      aria-hidden="true"
                                    ></i>
                              )}
                            <span>{obj.label}</span>
                            {obj.verified === "unverified" && (
                              <div
                                className="alert alert-danger"
                                role="alert"
                                style={{
                                  padding: "0.2rem 0.2rem",
                                  marginBottom: "0px",
                                }}
                              >
                                Please verify your cherecter not except number!
                              </div>
                            )}
                            <input
                              type="text"
                              className={
                                obj.verified === "unverified"
                                  ? "form-control formpadd_danger unverifi"
                                  : "form-control formpadd "
                              }
                              value={JSON.stringify(obj.value)}
                              readOnly={obj.uivalid.read_only === "true"}
                              maxLength={obj.uivalid.max_length}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.value,
                                  index,
                                  obj.name,
                                  obj.type,
                                  obj.id,
                                  false
                                )
                              }
                              onMouseOut={(e) =>
                                this.validationfn(
                                  e.target.value,
                                  index,
                                  obj.name,
                                  obj.type,
                                  obj.id
                                )
                              }
                            ></input>
                          </div>
                        ) : null} */}
                            {obj.type === "choice" && obj.name === "state" && (
                              <div className="form-group ">
                                {obj.uivalid.mandatory === "true" &&
                                  obj.value !== "None" &&
                                  obj.value !== "" && (
                                    <i
                                      className="fa fa-asterisk mndtryfalse"
                                      aria-hidden="true"
                                    ></i>
                                  )}

                                {obj.uivalid.mandatory === "true" &&
                                  (obj.value === "None" ||
                                    obj.value === "") && (
                                    <i
                                      className="fa fa-asterisk mndtrytrue"
                                      aria-hidden="true"
                                    ></i>
                                  )}
                                <span>{obj.label}</span>
                                <select
                                  className="form-control form-select formpadd "
                                  aria-label="Default select example"
                                  value={obj.value}
                                  onChange={(e) => {
                                    this.formChangefn(
                                      e.target.value,
                                      index,
                                      obj.name,
                                      obj.type,
                                      obj.id,
                                      false
                                    );
                                  }}
                                  maxLength={obj.uivalid.max_length}
                                  readOnly={obj.uivalid.read_only === "true"}
                                >
                                  <option value="None">None</option>

                                  {obj.choice.map((ch, chi) => (
                                    <option key={chi} value={ch.value}>
                                      {ch.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                            {obj.type === "reference" &&
                              obj.name === "local_user_id" ? (
                              <div>
                                <div className="form-group">
                                  {obj.uivalid.mandatory === "true" &&
                                    obj.value !== "" && (
                                      <i
                                        className="fa fa-asterisk mndtryfalse"
                                        aria-hidden="true"
                                      ></i>
                                    )}

                                  {obj.uivalid.mandatory === "true" &&
                                    obj.value === "" && (
                                      <i
                                        className="fa fa-asterisk mndtrytrue"
                                        aria-hidden="true"
                                      ></i>
                                    )}
                                  <span>{obj.label}</span>
                                  {obj.verified === "unverified" && (
                                    <div
                                      className="alert alert-danger form_alt"
                                      role="alert"
                                    >
                                      record not found!
                                    </div>
                                  )}
                                  <div style={{ display: "flex" }}>
                                    <input
                                      type="text"
                                      className={
                                        obj.verified === "unverified"
                                          ? "form-control formpadd formbor unverifi"
                                          : "form-control formpadd formbor"
                                      }
                                      maxLength={obj.uivalid.max_length}
                                      defaultValue={obj.value.name}
                                      readOnly={true}
                                    // onChange={(e) => {
                                    //   formChangefn(
                                    //     e.target.value,
                                    //     index,
                                    //     obj.name,
                                    //     obj.type,
                                    //     obj.id,
                                    //     false
                                    //   );
                                    // }}
                                    // onMouseOut={(e) =>
                                    //   validationfn(
                                    //     e.target.value,
                                    //     index,
                                    //     obj.name,
                                    //     obj.type,
                                    //     obj.id
                                    //   )
                                    // }
                                    ></input>
                                    <div className="btnsrc vlpointer">
                                      <i
                                        className="fa fa-search"
                                        aria-hidden="true"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        onClick={(e) => {
                                          this.clickRefrence(
                                            e,
                                            obj.id,
                                            obj.name,
                                            obj.type,
                                            index
                                          );
                                        }}
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                                {this.state.refrecord.index === index &&
                                  this.state.refrecord.record.length > 0 && (
                                    <div className="sf_container">
                                      {this.state.refrecord.record.map(
                                        (obj_ref, or_i) => (
                                          <div
                                            className="refrcd"
                                            onClick={(e) =>
                                              this.setRefrecord(
                                                obj_ref.value,
                                                index,
                                                obj.name,
                                                obj.type,
                                                obj_ref.id
                                              )
                                            }
                                            key={or_i}
                                          >
                                            {obj_ref.value}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>
                            ) : null}
                          </div>
                        )}
                      </span>
                    ))}
                    <div className="btndiv mt-3">
                      {this.state.button.map((obj, oo_i) => (
                        <div key={oo_i}>
                          {obj.name === "Update" && (
                            <button
                              className=" insrtbtn2 btn btn-primary "
                              key={oo_i}
                              onClick={(e) => this.callbtn(obj.name)}
                            >
                              {obj.value}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Modal
              show={this.state.showModelList}
              onHide={this.cancelModelList}
              size="xl"
            >
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ModelList
                  setRef={this.setRef}
                  columnid={this.state.columnId}
                  onCancel={this.cancelModelList}
                  previousFilter={"null"}
                  previousTimeLine={" "}
                  tableName={this.state.objLabel}
                  loca={this.state.loca}
                  colBoolean={true}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.cancelModelList}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default ClientInfoRecCompo;
