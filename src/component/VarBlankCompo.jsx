import React, { Component } from "react";
import axios from "axios";
import WorkInProgress from "./work_in_progress";
import { Input } from "reactstrap";
import { Modal, Button } from "react-bootstrap";
import "../css/varBlankCompo.css";
import "../css/formcompo.css";
import ModelList from "./model_list";
import { toast } from "react-toastify";

class VarBlankCompo extends Component {
  state = {
    filter: this.props.filter,
    loca: this.props.loca,
    userInfo: this.props.userInfo,
    loading: false,
    page_error: false,
    error: "",
    page_message: false,
    message: "",
    record: [],
    refrecord: [],
    button: [],
    mainRecord: [],
    selection: "",
    showModelList: "",
    filtarray: [
      {
        co: "",
        cl: "",
        mc: "",
        an: "",
        ct: "",
        af: "",
        rf: { id: "", value: "" },
        ch: [],
      },
    ],
    tablabel: "",
    columnId: 0,
    objName: "",
    objLabel: "",
    setObjIndex: "",
    objType: "",
    form_rcd: [],
    change_val: "",
    btn_disable: false,
    textareaEmpty: false // Add a state to track if the textarea is empty
  };

  constructor(props) {
    super(props);
    this.textAreaRef = React.createRef()
    this.getInitialRecord = this.getInitialRecord.bind(this);
    this.clickRefrence = this.clickRefrence.bind(this);
    this.setRefRcd = this.setRefRcd.bind(this);
    this.formChangefn = this.formChangefn.bind(this);
    this.fieldverify = this.fieldverify.bind(this);
    this.validationfn = this.validationfn.bind(this);
    this.callbtn = this.callbtn.bind(this);
    this.cancelModelList = this.cancelModelList.bind(this);
    this.clickRefrence = this.clickRefrence.bind(this);
    this.submitfn = this.submitfn.bind(this);
    this.setRef = this.setRef.bind(this);
    console.log(this.textAreaRef.current);
  }

  componentDidMount() {
    this.getInitialRecord();
  }

  getInitialRecord() {
    if (this.state.filter != null) {
      let val = "";
      var filter = this.state.filter.filter;
      if (filter[0].co === "name") {
        val = filter[0].an;
      }
      this.submitfn(val);
    }
    var token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(this.state.loca + "/loom/get/var/list", {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          let res = resp.data;
          console.log(res);
          if (res.forms.length > 0) {
            this.setState({ form_rcd: res.forms, loading: false });
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  };

  submitfn(val) {
    if (val !== "none") {
      this.setState({ change_val: val });
      var token = localStorage.getItem("token");
      this.setState({ loading: true });
      axios
        .get(this.state.loca + "/loom/get/var/blank/" + val, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          const blankrcd = res.data;
          console.log(blankrcd);
          this.setState({ mainRecord: blankrcd });
          if ("Error" in blankrcd) {
            this.setState({ error: blankrcd.Error, loading: false, page_error: true });
          } else {
            this.setState({
              record: blankrcd.record,
              button: blankrcd.button,
              tablabel: blankrcd.form.name,
              loading: false,
            });
            console.log(this.state.tablabel);
          }
        },
          (error) => {
            this.props.showErrorCompo();
            console.log(error);
          });
    } else {
      this.setState({
        record: [],
        button: [],
        tablabel: "",
        change_val: "none"
      });
    }
  }

  setRefRcd(vl, index, ob, type, id) {
    this.formChangefn(vl, index, ob, type, id, true);
  }

  clickRefrence(e, id, name, type, index, label) {
    e.preventDefault();
    this.setState({
      columnId: id,
      objName: name,
      objType: type,
      setObjIndex: index,
      objLabel: label,
      showModelList: true,
    });
  }

  formChangefn(vl, index, ob, type, id, vrf) {
    console.log("formchange");
    var frecord = this.state.record;
    if (type === "reference") {
      if (vrf === false) {
        frecord[index].clicked = false;
      }
      if (vl.length > 2) {
        if (vrf === true) {
          if (frecord[index].name === ob) {
            frecord[index].value.name = vl;
            frecord[index].clicked = true;
            frecord[index].value.id = id;
            this.setState({ record: frecord, refrecord: {} });
            this.validationfn(vl, index, ob, type, id);
          }
        } else {
          if (frecord[index].name === ob) {
            frecord[index].value.name = vl;
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
            },
              (error) => {
                this.props.showErrorCompo();
                console.log(error);
              });
        }
      } else {
        if (frecord[index].name === ob) {
          frecord[index].value.name = vl;
          frecord[index].value.id = id;
          this.setState({ record: frecord, refrecord: {} });
        }
      }
    } else {
      if (frecord[index].name === ob) {
        frecord[index].value = vl;
        this.setState({ record: frecord });
      }
    }
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
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          vl
        )
      ) {
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

  validationfn(vl, index, ob, type, id) {
    console.log("validation");
    var formrecord = this.state.record;
    if (type === "reference") {
      if (vl !== "") {
        var veri = '{"referenceRecord":[{"columnid":"' + id + '"},';
        veri += '{"tabvalue":"' + vl + '"}]}';
        var token = localStorage.getItem("token");
        axios
          .post(this.state.loca + "/lom/reference/verify", veri.toString(), {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            },
          })
          .then((resp) => {
            const refrencercd = resp.data;
            if (refrencercd.Result === "Unverified") {
              formrecord[index].verified = "unverified";
              this.setState({ record: formrecord });
            } else {
              formrecord[index].verified = "verified";
              this.setState({ record: formrecord, refrecord: [] });
            }
            this.setState({ record: formrecord });
            return;
          },
            (error) => {
              this.props.showErrorCompo();
              console.log(error);
            });
      } else {
        formrecord[index].verified = "initial";
        this.setState({ record: formrecord });
      }
    } else {
      if (formrecord[index].name === ob) {
        if (type === "int" || vl !== "") {
          formrecord[index].verified = this.fieldverify(
            formrecord[index].type,
            vl
          );
        } else {
          formrecord[index].verified = "initial";
        }
      }
      this.setState({ record: formrecord });
    }
  }

  callbtn(nam) {
    console.log(nam);
    this.setState({ btn_disable: true });
    var btntype = "";
    var foundbtn = false;
    var btn = this.state.button;
    console.log(btn);

    for (var ij = 0; ij < btn.length; ij++) {
      if (btn[ij].name === nam) {
        btntype = btn[ij].returnWebLocation;
        foundbtn = true;
        break;
      }
    }

    console.log(foundbtn === true && btntype !== "");
    if (foundbtn === true && btntype !== "") {
      this.setState({
        page_error: false,
        error: "",
        page_message: false,
        message: "",
      });

      setTimeout(() => {

        var mnrecord = this.state.mainRecord;
        console.log(mnrecord);
        mnrecord.record = this.state.record;
        var r_value = this.state.record[3].value;
        console.log(r_value);
        if (r_value !== "") {
          var token = localStorage.getItem("token");
          axios
            .post(this.state.loca + btn[ij].webUrl, mnrecord, {
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
              },
            })
            .then((resp) => {
              let rcdd = resp.data;
              console.log(rcdd);
              if (rcdd !== "") {
                if ("Error" in rcdd) {
                  this.setState({
                    loading: false,
                    page_error: true,
                    error: rcdd.Error,
                  });
                } else {
                  this.setState({ loading: false });
                  var msg = rcdd.Message;
                  console.log(msg);
                  if (msg !== "") {
                    toast(`${msg + "fully Insert"} `, {
                      position: "top-center",
                      theme: "colored",
                      type: "success",
                    })
                    this.setState({
                      page_message: true,
                      // message: msg,
                      page_error: false,
                      error: "",
                      btn_disable: true
                    });
                  }
                }
              }
            },
              (error) => {
                this.props.showErrorCompo();
                console.log(error);
              })
            .finally(() => {
              this.setState({ btn_disable: false });
            });

        } else {
          if (r_value === "") {
            console.log(this.textAreaRef);
            this.setState({ textareaEmpty: true });
            if (this.state.textareaEmpty === true) {
              this.textAreaRef.current.focus({ behavior: 'smooth' });
            }
            toast.info('Please Fill Your Details', {
              position: "top-center",
              theme: "colored",
              type: "info",
            });
          }
          this.setState({ btn_disable: false });
        }
        this.setState({ loading: false })
      }, 1000)
    }
  }

  cancelModelList() {
    this.setState({ filtarray: "null", showModelList: false });
  }

  setRef(id, val) {
    this.formChangefn(
      val,
      this.state.objIndex,
      this.state.objName,
      this.state.objType,
      id,
      true
    );
    this.cancelModelList();
  }

  render() {
    return (
      <div className="pagesetup">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div>
            <div>
              <label className="d-flex p-1">Select Form</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  this.submitfn(e.target.value);
                }}
                value={this.state.change_val}
              >
                {console.log(this.state.change_val)}
                <option value={"none"}>
                  None
                </option>
                {console.log(this.state.form_rcd)}
                {this.state.form_rcd.map((obj, ind) => (
                  <option key={ind} value={obj.name}>
                    {obj.name}
                  </option>
                ))}
              </select>
            </div>

            {(this.state.change_val !== "none" && this.state.change_val !== "" ?
              <div>
                {console.log(this.state.change_val)}
                <div className="btndiv client-details-box">
                  <div className="row fr">
                    <div className="col-md"></div>
                    <div className="col-md tab_head">{this.state.tablabel}</div>
                    <div className="col-md">
                      <div className="btndivin inst-btn">
                        {this.state.record.length !== 0 && (
                          <div>
                            {this.state.button.map((obj, oo_i) => (
                              <button
                                key={oo_i}
                                onClick={(e) => this.callbtn(obj.name)}
                                disabled={this.state.btn_disable === true}
                                // className={
                                //   this.state.btn_disable === true
                                //     ? "csm_btn csm_btn_pri col-md-2 sub-btn disabled"
                                //     : " csm_btn csm_btn_pri col-md-2 sub-btn btn-primary"
                                // }
                                className={
                                  this.state.btn_disable === true
                                    ? "insrtbtn2 btn btn-primary btn-sm disabled"
                                    : " insrtbtn2 btn btn-primary btn-sm"
                                }
                                style={{
                                  backgroundColor: this.state.btn_disable
                                    ? "gray"
                                    : "",
                                }}
                              >
                                {obj.value}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div> : ""
            )}
            <div className="maincompo_blk">
              {this.state.page_error === true && (
                <div
                  className="alert alert-danger form_alt"
                  role="alert"
                >
                  {this.state.error}
                </div>
              )}
              {/* {this.state.page_message === true && (
                <div
                  className="alert alert-success form_alt"
                  role="alert"
                >
                  {this.state.message}
                </div>
              )} */}
              {this.state.record.length === 0 && (
                <div>Dont have response...</div>
              )}
              {this.state.record.length > 0 && (
                <div>
                  {this.state.record.map((obj, index) => (
                    <span key={index}>
                      <div className="inppd" key={obj.name}>
                        {obj.type === "String" && obj.label === "Name" ? (
                          <div className="form-group objpdg ">
                            <span className="field_hd">{obj.label}</span>
                            {obj.verified === "unverified" && (
                              <div
                                className="alert alert-danger form_alt"
                                role="alert"
                              >
                                Please verify your charecter not except
                                number!
                              </div>
                            )}
                            <Input
                              type="text"
                              className={
                                obj.verified === "unverified"
                                  ? "form-control formpadd_danger unverifi"
                                  : "form-control formpadd "
                              }
                              value={this.state.userInfo.name + " Loom Details"}
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
                            ></Input>
                          </div>
                        ) : null}
                        {obj.type === "String" && obj.label !== "Name" ? (
                          <div className="form-group objpdg ">
                            <span className="field_hd">{obj.label}</span>
                            {obj.verified === "unverified" && (
                              <div
                                className="alert alert-danger form_alt"
                                role="alert"
                              >
                                Please verify your charecter not except
                                number!
                              </div>
                            )}
                            <Input
                              type="text"
                              className={
                                obj.verified === "unverified"
                                  ? "form-control formpadd_danger unverifi"
                                  : "form-control formpadd "
                              }
                              value={obj.value}
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
                            ></Input>
                          </div>
                        ) : null}
                        {obj.type === "int" ? (
                          <div className="form-group">
                            <span className="field_hd">{obj.label}</span>
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
                            <span className="field_hd">{obj.label}</span>
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
                            <span className="field_hd">{obj.label}</span>
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
                              step="1"
                              className={
                                obj.verified === "unverified"
                                  ? "objpadd unverifi"
                                  : "objpadd"
                              }
                              value={obj.value}
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
                            <span className="field_hd">{obj.label}</span>
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
                        {obj.type === "email" ? (
                          <div className="form-group">
                            <span className="field_hd">{obj.label}</span>
                            {obj.verified === "unverified" && (
                              <div
                                className="alert alert-danger form_alt"
                                role="alert"
                              >
                                Please verify your email!
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
                            <input
                              type="checkbox"
                              className={
                                obj.verified === "unverified"
                                  ? "checkpadd unverifi"
                                  : "checkpadd"
                              }
                              checked={obj.value === "true" ? true : false}
                              onChange={(e) => {
                                this.formChangefn(
                                  e.target.checked.toString(),
                                  index,
                                  obj.name,
                                  obj.type,
                                  obj.id,
                                  false
                                );
                              }}
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
                            <span className="field_hd">{obj.label}</span>
                          </div>
                        ) : null}
                        {obj.type === "choice" && obj.name !== "filter" ? (
                          <div className="form-group ">
                            <span className="field_hd">{obj.label}</span>
                            <select
                              className="form-control form-select formpadd "
                              aria-label="Default select example"
                              value={obj.value}
                              onMouseOut={(e) =>
                                this.validationfn(
                                  e.target.value,
                                  index,
                                  obj.name,
                                  obj.type,
                                  obj.id
                                )
                              }
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
                              <span className="field_hd">{obj.label}</span>
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
                                // onMouseOut={(e) =>
                                //   this.validationfn(
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
                                        index,
                                        obj.label
                                      );
                                    }}
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
                                          this.setRefRcd(
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
                        {obj.type === "multi_line_text" ? (
                          <div className="form-group objpdg ">
                            {console.log(obj.label)}
                            <span className="field_hd">{obj.label}</span>
                            {obj.verified === "unverified" && (
                              <div
                                className="alert alert-danger form_alt"
                                role="alert"
                              >
                                Please verify your charecter not except
                                number!
                              </div>
                            )}
                            {console.log(this.textAreaRef.current)}
                            {console.log(obj.verified)}
                            <textarea
                              ref={this.textAreaRef}
                              type="text"
                              className={
                                obj.verified === "unverified"
                                  ? "form-control formpadd_danger unverifi"
                                  : "form-control formpadd areaheight"
                              }
                              value={obj.value}
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
                            ></textarea>
                          </div>
                        ) : null}
                        {obj.type === "long_description" ? (
                          <div className="form-group objpdg ">
                            {/* <span className="field_hd">{obj.label}</span> */}
                            {obj.verified === "unverified" && (
                              <div
                                className="alert alert-danger form_alt"
                                role="alert"
                              >
                                Please verify your charecter not except
                                number!
                              </div>
                            )}
                            <pre>{obj.value}</pre>
                            {/* <Input
                                type="text"
                                className={
                                  obj.verified === "unverified"
                                    ? "form-control formpadd_danger unverifi"
                                    : "form-control formpadd "
                                }
                                value={obj.value}
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
                              >
                              </Input> */}
                          </div>
                        ) : null}
                      </div>
                    </span>
                  ))}
                </div>
              )}
              {console.log(this.state.record)}
              {console.log(this.state.record[3])}
              {this.state.record.length !== 0 && (
                <div className=" form-group ">
                  {this.state.button.map((obj, ob_i) => (
                    <button
                      key={ob_i}
                      onClick={(e) => this.callbtn(obj.name)}
                      disabled={this.state.btn_disable === true}
                      // className={
                      //   this.state.btn_disable === true
                      //     ? "csm_btn csm_btn_pri col-md-2 sub-btn disabled"
                      //     : " csm_btn csm_btn_pri col-md-2 sub-btn"
                      // }
                      className={
                        this.state.btn_disable === true
                          ? "insrtbtn2 btn btn-primary btn-sm disabled"
                          : " insrtbtn2 btn btn-primary btn-sm"
                      }
                      style={{
                        backgroundColor: this.state.btn_disable
                          ? "gray"
                          : "",
                        marginLeft: "5px",
                      }}
                    >
                      {obj.value}
                    </button>
                  ))}
                </div>
              )}

              <Modal
                dialogClassName="my-modal"
                show={this.state.show}
                onHide={this.handleClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ModelList
                    setRef={(val, r_id) => this.setRef(val, r_id)}
                    columnid={this.state.columnId}
                    tabId={this.state.tabId}
                    loca={this.state.loca}
                    colBoolean={true}
                    ref_filt={this.state.ref_filter}
                    isMobile={this.state.isMobile}
                    isVar={true}
                  ></ModelList>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default VarBlankCompo;
