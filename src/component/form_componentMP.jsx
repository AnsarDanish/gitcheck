import axios from "axios";
import { Modal, Button, Tab, Nav, Col, Row } from "react-bootstrap";
import React from "react";
import "../css/formcompo.css";
import ModelList from "./model_list";
import WorkInProgress from "./work_in_progress";
import RelationListComponent from "./relationlist_component";

class FormComponentMP extends React.Component {
  state = {
    refrecord: {},
    name: "",
    value: new Date(),
    page_error: false,
    error: "",
    loading: false,
    showmodel: false,
    showlist: true,
    columnid: "",
    cur_ref_name: "",
    cur_ref_type: "",
    cur_ref_index: 0,
    tabname: this.props.tabname,
    rid: this.props.rid,
    rty: this.props.ty,
    rvalue: "",
    page_message: false,
    message: "",
    show: false,
    tabrelation: {},
    relation_loading: false,
    tabrel: false,
    tablabel: this.props.first_record.formRecord[1].table.label,
    tabId: this.props.first_record.formRecord[1].table.id,
    record: this.props.first_record.formRecord[2].record,
    button: this.props.first_record.formRecord[3].button,
    mainrecord: this.props.first_record,
    first_record: this.props.first_record,
    loca: this.props.loca,
    // tabId: "",
    isMobile: this.props.isMobile,
  };

  constructor(props) {
    super(props);
    this.formChangefn = this.formChangefn.bind(this);
    this.onCh = this.onCh.bind(this);
    this.callbtn = this.callbtn.bind(this);
    this.validationfn = this.validationfn.bind(this);
    this.setRefrecord = this.setRefrecord.bind(this);
    this.setcolumn = this.setcolumn.bind(this);
    this.closemodal = this.closemodal.bind(this);
    this.setRef = this.setRef.bind(this);
    this.callNextPage = this.callNextPage.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.relationVerify = this.relationVerify.bind(this);
    this.fieldverify = this.fieldverify.bind(this);
    this.callfilter = this.callfilter.bind(this);
    this.calltimeline = this.calltimeline.bind(this);
    this.setRecord = this.setRecord.bind(this);
    this.callTableColumn = this.callTableColumn.bind(this);

  }

  componentDidMount() {}

  componentDidUpdate(props) {
    if (props.tabname !== this.state.tabname || props.rid !== this.state.rid) {
      var token = localStorage.getItem("token");
      this.setState({ loading: true, tabname: props.tabname, rid: props.rid });
      // if (this.state.rty === "new") {
      axios
        .get(
          this.state.loca +
            "/loom/get/single/blankrecord/mp/" +
            props.tabname +
            "/multiTable",
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then((resp) => {
          const blkrecord = resp.data;
          if (blkrecord !== "") {
            if ("Error" in blkrecord) {
              this.setState({
                loading: false,
                page_error: true,
                error: blkrecord.Error,
              });
            } else {
              this.setState({
                loading: false,
                record: blkrecord.formRecord[2].record,
                button: blkrecord.formRecord[3].button,
              });
            }
          }
        });
      // } else if (this.state.rty === "record") {
      //   axios
      //     .get(
      //       this.state.loca +
      //         "/loom/get/singlerecord/" +
      //         props.tabname +
      //         "/" +
      //         props.rid,
      //       {
      //         headers: {
      //           // "Content-Type": "application/json",
      //           authorization: "Bearer " + token,
      //         },
      //       }
      //     )
      //     .then((resp) => {
      //       const record = resp.data;
      //       console.log(record);
      //       if (record !== "") {
      //         if ("Error" in record) {
      //           this.setState({
      //             loading: false,
      //             page_error: true,
      //             error: record.Error,
      //           });
      //         } else {
      //           var mmm = record.formRecord[2].record;
      //           console.log(mmm);
      //           var rvalue = "";
      //           for (var i = 0; i < mmm.length; i++) {
      //             mmm[i].clicked = false;
      //             if (mmm[i].displayColumn === "true") {
      //               rvalue = mmm[i].value;
      //             }
      //             if (mmm[i].value !== "") {
      //               mmm[i].verified = "verified";
      //             } else {
      //               mmm[i].verified = "initial";
      //             }
      //           }
      //           this.relationVerify(rvalue);
      //           this.setState({
      //             mainrecord: record,
      //             record: mmm,
      //             loading: false,
      //             button: record.formRecord[3].button,
      //             rvalue: rvalue,
      //           });
      //         }
      //       }
      //     });
      // }
    }
  }

  async relationVerify(rvalue) {
    var token = localStorage.getItem("token");
    this.setState({ relation_loading: true });
    var json = {
      relation: [
        {
          tabname: this.state.tabname,
          recordid: this.state.rid,
          value: rvalue,
        },
      ],
    };
    axios
      .post(this.state.loca + "/loom/get/relation", json, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        var record = resp.data;
        if (record !== "") {
          if ("Error" in record) {
            this.setState({
              loading: false,
              page_error: true,
              error: record.Error,
            });
          } else {
            this.setState({
              tabrelation: record,
              relation_loading: false,
              tabrel: true,
            });
          }
        }
      });
  }

  setRecord(value) {
    this.setState({ record: value });
    return "record";
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  callbtn(nam) {
    this.props.callbtn(nam);
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
      if (
        /^(?:(?:(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec))(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:(?:0?2|(?:Feb))(\/|-|\.)(?:29)\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
          vl
        )
      ) {
        return "verified";
      } else {
        return "unverified";
      }
    }
  }

  validationfn(vl, index, ob, type, id) {
    var formrecord = this.state.record;
    if (type === "reference") {
      if (vl !== "") {
        if (formrecord[index].clicked === true) {
          formrecord[index].verified = "verified";
        } else {
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
                    this.setState({ record: formrecord });
                  } else {
                    formrecord[index].verified = "verified";
                    var rfrcd = this.state.refrecord;
                    rfrcd.record = [];
                    this.setState({ record: formrecord, refrecord: rfrcd });
                  }

                  this.setState({ record: formrecord });
                  return;
                }
              }
            });
        }
      } else {
        formrecord[index].verified = "initial";
        this.setState({ record: formrecord });
      }
    } else {
      var minLength = formrecord[index].uivalid.min_length;
      if (minLength !== 0 && vl.length < minLength) {
        formrecord[index].verified = "unverified";
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
    }
      this.setState({ record: formrecord });
    }
  }

  callNextPage() {
    this.props.showListCompo(this.state.tabname);
  }

  onCh(val) {
    this.setState({ value: val });
  }

  async callTableColumn(val, ot) {
    var token = localStorage.getItem("token");
    if (val !== "" && val !== "none" && val !== this.state.tabname) {
      this.setState({ colState: false, tabname: val, col_mn: [{}] });
      axios
        .get(this.state.loca + "/loom/get/column/" + val, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((resp) => {
          const coldata = resp.data;
          console.log(coldata);
          if (coldata !== "") {
            if ("Error" in coldata) {
              this.setState({
                loading: false,
                page_error: true,
                error: coldata.Error,
              });
            } else {
              var col_array = [];
              col_array.push({ id: "", name: "none", label: "None" });
              for (var c = 0; c < coldata.columnRecords.length; c++) {
                col_array.push(coldata.columnRecords[c]);
              }
              if (ot === true) {
                this.setState({
                  colState: true,
                  column_other: col_array,
                });
              } else {
                this.setState({
                  colState: true,
                  col_mn: col_array,
                });
              }
            }
          }
        });
    }
  }

  formChangefn(vl, index, ob, type, id, vrf) {
    var frecord = this.state.record;
    console.log(frecord);
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
            frecord[index].rcd_info = "true";
            var rfrcd = this.state.refrecord;
            rfrcd.record = [];
            this.setState({ record: frecord, refrecord: rfrcd });
            this.validationfn(vl, index, ob, type, id);
          }
        } else {
          if (frecord[index].name === ob) {
            frecord[index].value.value = vl;
            frecord[index].value.id = id;
            this.setState({ record: frecord });
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
                  var ref_rcd =
                  refrencercd.referenceRecordList[2].records.length;
                if (ref_rcd >= 5) {
                  ref_rcd = 5;
                }
                for (var i = 0; i < ref_rcd; i++) {
                  rff.push(refrencercd.referenceRecordList[2].records[i]);
                }
                }
              }
              var rf = { index: index, record: rff };
              this.setState({ refrecord: rf });
            });
        }
      } else {
        if (frecord[index].name === ob) {
          frecord[index].value.value = vl;
          frecord[index].value.id = id;
          var refrcd = this.state.refrecord;
          refrcd.record = [];
          this.setState({ record: frecord, refrecord: refrcd });
        }
      }
    } else {
      if (frecord[index].name === ob) {
        frecord[index].value = vl;
        this.setState({ record: frecord });
      }
    }
  }

  setRefrecord(vl, index, ob, type, id) {
    
    this.formChangefn(vl, index, ob, type, id, true);
   
  }

  setcolumn(index, name, type, col) {
    this.setState({
      columnid: col,
      cur_ref_name: name,
      cur_ref_type: type,
      cur_ref_index: index,
      showmodel: true,
    });
    this.handleShow();
  }

  closemodal() {
    this.setState({ showmodel: false });
  }

  setRef(val, r_id) {
    this.setRefrecord(
      val,
      this.state.cur_ref_index,
      this.state.cur_ref_name,
      this.state.cur_ref_type,
      r_id
    );
    this.handleClose();
  }

  callfilter(filtarray, index) {
    var rcd = this.state.record;
    rcd[index].value = { filter: filtarray };
    this.setState({
      filtarray: filtarray,
      record: rcd,
    });
  }

  calltimeline(timeline) {
    this.setState({
      timeline: timeline,
    });
  }

  render() {
    return (
      <div className="pagesetup ">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div>
            <div className=" form-group ">
              <div className="btndiv">
                <div className="row">
                  <div className="col-md-5"></div>
                  <div className="col-md-2">
                    <div className="tab_head ">{this.state.tablabel}</div>
                  </div>
                  <div className="col-md-5">
                    <div className="btndivin">
                      {this.state.button.map((obj, oo_i) => (
                        <button
                          className=" insrtbtn2 btn btn-primary "
                          key={oo_i}
                          onClick={(e) => this.callbtn(obj.name)}
                        >
                          {obj.value}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" maincompo ">
              {this.state.page_error === true && (
                <div
                  className="alert alert-danger form_alt"
                  role="alert"
                >
                  {this.state.error}
                </div>
              )}
              {this.state.page_message === true && (
                <div
                  className="alert alert-success form_alt"
                  role="alert"
                >
                  {this.state.message}
                </div>
              )}

              {this.state.record.length === 0 && (
                <div>Dont have response...</div>
              )}
              {this.state.record.length > 0 && (
                <div>
                  {this.state.record.map((obj, index) => (
                    <span key={index}>
                      {obj.uivalid.visible === "true" && (
                        <div className="  inppd " key={obj.name}>
                          {obj.type === "String" ? (
                            <div className="form-group objpdg ">
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
                          {obj.type === "int" ? (
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
                                  Please verify your integer number!
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
                          {obj.type === "date" ? (
                            <div className=" form-group">
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
                                  please verify your date!
                                </div>
                              )}
                              <input
                                type="date"
                                className={
                                  obj.verified === "unverified"
                                    ? "objmargin unverifi"
                                    : "objmargin "
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
                          {obj.type === "time" ? (
                            <div className=" form-group">
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
                                  please verify your date!
                                </div>
                              )}
                              <input
                                type="time"
                                className={
                                  obj.verified === "unverified"
                                    ? "objpadd unverifi"
                                    : "objpadd"
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
                          {obj.type === "datetime" ? (
                            <div className=" form-group">
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
                                  please verify your date!
                                </div>
                              )}
                              <input
                                type="datetime-local"
                                step="1"
                                className={
                                  obj.verified === "unverified"
                                    ? "objmargin unverifi"
                                    : "objmargin "
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
                          {obj.type === "boolean" ? (
                            <div className="form-check fmcheck">
                              {obj.uivalid.mandatory === "true" &&
                                obj.value === "true" && (
                                  <i
                                    className="fa fa-asterisk mndtryfalse"
                                    aria-hidden="true"
                                  ></i>
                                )}

                              {obj.uivalid.mandatory === "true" &&
                                obj.value === "false" && (
                                  <i
                                    className="fa fa-asterisk mndtrytrue"
                                    aria-hidden="true"
                                  ></i>
                                )}
                              <input
                                type="checkbox"
                                className={
                                  obj.verified === "unverified"
                                    ? "checkpadd unverifi"
                                    : "checkpadd"
                                }
                                checked={obj.value === "true" ? true : false}
                                readOnly={obj.uivalid.read_only === "true"}
                                onChange={(e) =>
                                  this.formChangefn(
                                    e.target.checked.toString(),
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
                              <span>{obj.label}</span>
                            </div>
                          ) : null}
                          {obj.type === "choice" && obj.name !== "filter" ? (
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
                                (obj.value === "None" || obj.value === "") && (
                                  <i
                                    className="fa fa-asterisk mndtrytrue"
                                    aria-hidden="true"
                                  ></i>
                                )}
                              <span>{obj.label}</span>
                              <select
                                className="form-control form-select formpadd "
                                aria-label="Default select example"
                                onMouseOut={(e) =>
                                  this.validationfn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                onChange={(e) =>
                                  this.formChangefn(
                                    e.target.value,
                                    index,
                                    obj.name
                                  )
                                }
                                maxLength={obj.uivalid.max_length}
                                readOnly={obj.uivalid.read_only === "true"}
                              >
                                <option value="None">None</option>

                                {obj.choice.map((ch, chi) => (
                                  <option key={chi} value={ch.name}>
                                    {ch.value}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : null}
                          {obj.type === "reference" ? (
                            <div>
                              <div className="form-group">
                                {obj.uivalid.mandatory === "true" &&
                                  // obj.value.id !== "0" &&
                                  obj.value.value !== "" && (
                                    <i
                                      className="fa fa-asterisk mndtryfalse"
                                      aria-hidden="true"
                                    ></i>
                                  )}

                                {obj.uivalid.mandatory === "true" &&
                                  // obj.value.id === "0" &&
                                  obj.value.value === "" && (
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
                                    value={obj.value.value}
                                    readOnly={obj.uivalid.read_only === "true"}
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
                                  <div className="btnsrc vlpointer">
                                    <i
                                      className="fa fa-search"
                                      // aria-hidden="true"
                                      // data-bs-toggle="modal"
                                      // data-bs-target="#staticBackdrop"

                                      onClick={(e) =>
                                        this.setcolumn(
                                          index,
                                          obj.name,
                                          obj.type,
                                          obj.id
                                        )
                                      }
                                    ></i>
                                  </div>
                                </div>
                              </div>
                              {this.state.refrecord.index === index &&
                                this.state.refrecord.record.length > 0 && (
                                  <div>
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
                </div>
              )}
              <div className=" form-group ">
                {this.state.button.map((obj, ob_i) => (
                  <button
                    className=" insrtbtn btn btn-primary "
                    key={ob_i}
                    onClick={(e) => this.callbtn(obj.value)}
                  >
                    {obj.name}
                  </button>
                ))}
              </div>
              <div>
                <div>
                  {this.state.tabrel === true &&
                    this.state.tabrelation !== undefined && (
                      <div>
                        {this.state.tabrelation.relation.length > 0 ? (
                          <div className="tab-content">
                            <Tab.Container
                              id="left-tabs-example"
                              defaultActiveKey={
                                this.state.tabrelation.relation[0]
                                  .formRecordList[1].table.value
                              }
                            >
                              <Nav variant="pills" className="flex-column">
                                <Row className="rw">
                                  {this.state.tabrelation.relation.map(
                                    (nama, tab_ia) => (
                                      <Col
                                        md={2}
                                        key={tab_ia}
                                        className="nopad"
                                      >
                                        <Nav.Item className="cur">
                                          <Nav.Link
                                            eventKey={
                                              nama.formRecordList[1].table.value
                                            }
                                          >
                                            {nama.formRecordList[1].table.value}
                                          </Nav.Link>
                                        </Nav.Item>
                                      </Col>
                                    )
                                  )}
                                </Row>
                              </Nav>

                              <Tab.Content>
                                {this.state.tabrelation.relation.map(
                                  (nam, tab_i) => (
                                    <Tab.Pane
                                      key={tab_i}
                                      eventKey={
                                        nam.formRecordList[1].table.value
                                      }
                                    >
                                      <RelationListComponent
                                        listName={
                                          nam.formRecordList[1].table.value
                                        }
                                        recordList={nam}
                                        showFormCompo={(nm, rid, ty) =>
                                          this.props.showFormCompo(nm, rid, ty)
                                        }
                                      ></RelationListComponent>
                                    </Tab.Pane>
                                  )
                                )}
                              </Tab.Content>
                            </Tab.Container>
                          </div>
                        ) : null}
                      </div>
                    )}
                </div>
              </div>

              <Modal
                dialogClassName="my-modal"
                show={this.state.show}
                onHide={this.handleClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ModelList
                    setRef={(val, r_id) => this.setRef(val, r_id)}
                    columnid={this.state.columnid}
                    tabId={this.state.tabId}
                    loca={this.state.loca}
                    colBoolean={true}
                    isMobile={this.state.isMobile}
                  ></ModelList>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* {this.state.showmodel === true ? ( */}
              {/* <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="staticBackdropLabel"
                      style={{ color: "black" }}
                    >
                      List Here!
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-body" style={{ color: "black" }}>
                    {this.state.showmodel === true ? (
                      <ModelList
                        setRef={(val) => this.setRef(val)}
                        columnid={this.state.columnid}
                      ></ModelList>
                    ) : null}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={this.closemodal}
                    >
                      Close
                    </button>
                    {/ * <button type="button" className="btn btn-primary">
											SaveChanges
										</button> * /}
                  </div>
                </div>
              </div>
            </div> */}
              {/* ) : null} */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FormComponentMP;
