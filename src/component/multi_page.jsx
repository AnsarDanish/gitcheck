import React from "react";
import axios from "axios";
import "../css/multipage.css";
import WorkInProgress from "./work_in_progress";

class Multipage extends React.Component {
  state = {
    record: [],
    button: [],
    name: "",
    tabname: this.props.tabname,
    rid: this.props.rid,
    rty: this.props.ty,
    value: new Date(),
    mainrecord: {},
    page_error: false,
    error: "",
    loading: false,
    loca: this.props.loca,
  };

  constructor(props) {
    super(props);
    this.formChangefn = this.formChangefn.bind(this);
    this.onCh = this.onCh.bind(this);
    this.callbtn = this.callbtn.bind(this);
    this.validationfn = this.validationfn.bind(this);
    this.fieldverify = this.fieldverify.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    // if (this.state.rty === "new") {
    this.setState({ loading: true });
    axios
      .get(
        this.state.loca + "/loom/get/single/blankrecord/" + this.state.tabname,
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
              mainrecord: blkrecord,
            });
          }
        }
      });
  }

  fieldverify(type, vl) {
    if (type === "email") {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "String") {
      // if (/[a-zA-Z]/g.test(vl)) {
      return "verified";
      // } else {
      //   return "unverified";
      // }
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

  validationfn(vl, index, ob, type) {
    var fomecord = this.state.record;
    if (fomecord[index].name === ob) {
      if (vl !== "") {
        fomecord[index].verified = this.fieldverify(fomecord[index].type, vl);
      } else {
        fomecord[index].verified = "initial";
      }
    }

    this.setState({ record: fomecord });
  }

  callbtn(nam) {
    var btn = this.state.button;
    var mnrecord = this.state.mainrecord;
    var rcd = this.state.record;
    var mandatory = [];
    var unverified = [];
    for (var i = 0; i < rcd.length; i++) {
      if (rcd[i].uivalid.visible === "true") {
        if (rcd[i].uivalid.mandatory === "true") {
          if (rcd[i].value === "") {
            mandatory.push(rcd[i].name);
          }
        }
        if (
          rcd[i].type === "int" ||
          rcd[i].type === "String" ||
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

    for (var ij = 0; ij < btn.length; ij++) {
      if (btn[ij].value === nam) {
        btntype = btn[ij].returnWebLocation;
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
        var token = localStorage.getItem("token");
        this.setState({ loading: true });
        mnrecord.formRecord[2].record = this.state.record;
        if (btn[ij].call_type === "multipage_api") {
          if (btntype === "SamePage") {
            // var pageNum = mnrecord.formRecord[5].pageNumber + 1;
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
                    this.setState({
                      loading: false,
                      record: rcd.formRecord[2].record,
                      button: rcd.formRecord[3].button,
                      mainrecord: rcd,
                    });
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
                    this.setState({
                      loading: false,
                      record: rcd.formRecord[2].record,
                    });
                  }
                }
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

  onCh(val) {
    this.setState({ value: val });
  }

  formChangefn(vl, index, ob) {
    var frecord = this.state.record;
    if (frecord[index].name === ob) {
      frecord[index].value = vl;
    }
    this.setState({ record: frecord });
  }

  render() {
    return (
      <div className=" form-control pagesetup">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div className=" maincompo ">
            {this.state.record.length === 0 && (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
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
                        <input
                          type="text"
                          className="form-control formpadd"
                          value={obj.value}
                          readOnly={obj.uivalid.read_only === "true"}
                          onChange={(e) =>
                            this.formChangefn(e.target.value, index, obj.name)
                          }
                          onMouseOut={(e) =>
                            this.validationfn(e.target.value, index, obj.name)
                          }
                        ></input>
                      </div>
                    ) : null}
                    {obj.type === "int" ? (
                      <div className="form-group">
                        {obj.verified === "unverified" && (
                          <div
                            className="alert alert-danger form_alt"
                            role="alert"
                          >
                            Please verify your integer number!
                          </div>
                        )}
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
                        <input
                          type="text"
                          className={
                            obj.verified === "unverified"
                              ? "form-control formpadd_danger"
                              : "form-control formpadd"
                          }
                          value={obj.value}
                          readOnly={obj.uivalid.read_only === "true"}
                          onChange={(e) =>
                            this.formChangefn(e.target.value, index, obj.name)
                          }
                          onMouseOut={(e) =>
                            this.validationfn(e.target.value, index, obj.name)
                          }
                        ></input>
                      </div>
                    ) : null}
                    {obj.type === "date" ? (
                      <div className=" form-group">
                        {obj.verified === "unverified" && (
                          <div
                            className="alert alert-danger form_alt"
                            role="alert"
                          >
                            please verify your date!
                          </div>
                        )}
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

                        <input
                          type="date"
                          className="objmargin"
                          value={obj.value}
                          readOnly={obj.uivalid.read_only === "true"}
                          onChange={(e) =>
                            this.formChangefn(e.target.value, index, obj.name)
                          }
                          onMouseOut={(e) =>
                            this.validationfn(e.target.value, index, obj.name)
                          }
                        ></input>
                        <input
                          type="time"
                          className="objpadd"
                          value={obj.value}
                          readOnly={obj.uivalid.read_only === "true"}
                          onChange={(e) =>
                            this.formChangefn(e.target.value, index, obj.name)
                          }
                          onMouseOut={(e) =>
                            this.validationfn(e.target.value, index, obj.name)
                          }
                        ></input>
                      </div>
                    ) : null}
                    {obj.type === "boolean" ? (
                      <div className="form-check fmcheck">
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
                        <input
                          type="checkbox"
                          className="checkpadd"
                          value={obj.value === "true" ? true : false}
                          readOnly={obj.uivalid.read_only === "true"}
                          onChange={(e) =>
                            this.formChangefn(e.target.value, index, obj.name)
                          }
                          onMouseOut={(e) =>
                            this.validationfn(e.target.value, index, obj.name)
                          }
                        ></input>
                      </div>
                    ) : null}
                    {obj.type === "reference" ? (
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
                        <input
                          type="text"
                          className="form-control formpadd"
                          value={obj.value.value}
                          readOnly={obj.uivalid.read_only === "true"}
                          onChange={(e) =>
                            this.formChangefn(e.target.value, index, obj.name)
                          }
                          onMouseOut={(e) =>
                            this.validationfn(e.target.value, index, obj.name)
                          }
                        ></input>
                      </div>
                    ) : null}
                  </div>
                )}
              </span>
            ))}
            <div className=" form-group ">
              {this.state.button.map((obj, bo_i) => (
                <button
                  className=" insrtbtn btn btn-primary "
                  key={bo_i}
                  onClick={() => this.callbtn(obj.value)}
                >
                  {obj.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Multipage;
