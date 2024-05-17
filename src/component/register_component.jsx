import React from "react";
import axios from "axios";
import "../css/registercompo.css";
import "../css/formcompo.css";
import "../css/listcompo.css";
import WorkInProgress from "./work_in_progress";
import ApForm from "../ApForm";
import { error } from "jquery";

class RegisterComponent extends React.Component {
  state = {
    showlogin: false,
    showRegister: true,
    record: [],
    showRecord: [],
    formrecord: {},
    refrecord: {},
    name: "",
    tabname: this.props.tabname,
    rid: this.props.rid,
    rty: this.props.ty,
    value: new Date(),
    mainrecord: {},
    page_error: false,
    error: "",
    verify_error: "",
    loading: false,
    language: this.props.language,
    type: this.props.type,
    page_message: false,
    message: "",
    columnid: "",
    cur_ref_name: "",
    cur_ref_type: "",
    cur_ref_index: 0,
    tabId: "",
    clientRec: {},
    loca: this.props.loca,
    isMobile: this.props.isMobile,
    validation_error: false,
    validation: "",
    ob: "",
    tableName: "",
    ap_form:{},
    uiScript:"",
    register: false,
    ap_form: {},
    uiScript: ""
  };

  constructor(props) {
    super(props);
    this.formChangefn = this.formChangefn.bind(this);
    this.onCh = this.onCh.bind(this);
    this.Registerfn = this.Registerfn.bind(this);
    this.validationfn = this.validationfn.bind(this);
    this.fieldverify = this.fieldverify.bind(this);
    this.goBack = this.goBack.bind(this);
    this.setRecord = this.setRecord.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendOTPcallfn = this.sendOTPcallfn.bind(this);
  }
  setRecord(value) {
    this.setState({ record: value });
    return "record";
  }

  componentDidMount() {
    this.setState({ loading: true });
    let url = "";
    if (this.state.type === "user") {
      url = this.state.loca + "/loom/registration/user/" + this.state.language;
    } else if (this.state.type === "client") {
      url =
        this.state.loca + "/loom/registration/client/" + this.state.language;
    }
    axios
      .get(url, {
        headers: {},
      })
      .then((resp) => {
        const mltpgrecord = resp.data;
        console.log(mltpgrecord);
        if (mltpgrecord !== "") {
          if ("Error" in mltpgrecord) {
            this.setState({
              loading: false,
              page_error: true,
              error: mltpgrecord.Error,
            });
          } else {
            var mmm = mltpgrecord.formRecord[2].record;
            for (var i = 0; i < mmm.length; i++) {
              mmm[i].verified = "initial";
            }
            var script = mltpgrecord.formRecord[3].uiscript
            console.log(script);
            /*       setap_form(
                    new ApForm(mmm, setRecord, {}, null)
               ); */
            this.setState({
              page_message: false,
              page_error: false,
              message: "",
              loading: false,
              record: mmm,
              formrecord: mltpgrecord,
              tableName: mltpgrecord.formRecord[1].table.value,
              tabId: mltpgrecord.formRecord[1].table.id,
              ap_form: new ApForm(mmm, this.setRecord("")),
              uiScript: script
            });
          }
        }
      });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isMobile !== state.isMobile) {
      return {
        isMobile: props.isMobile,
      };
    }
    return null;
  }

  onCh(val) {
    this.setState({ value: val });
  }
  onChange(func, val) {
    let fn = new Function(["ap_user", "ap_form", "val"], func);
    fn(this.state.ap_user, this.state.ap_form, val);
  }

  formChangefn(vl, index, ob, obj) {
    this.setState({ verify_error: "", page_error: false, validation_error: false, validation: "" })
    var frecord = this.state.record;
    frecord[index].verified = "initial";
    if (frecord[index].name === ob) {
      if (frecord[index].type === "String") {
        if (frecord[index].validation === "number") {
          if (/^[0-9]*$/.test(vl)) {
            frecord[index].value = vl;
            this.setState({ record: frecord, validation_error: false, validation: "", verify_error: "" });
          } else {
            document.getElementById("myPopup");
            this.setState({ validation_error: true, validation: "Only Accept Number", ob: ob, verify_error: "" });
          }
        } else if (frecord[index].validation === "character") {
          if (/^[a-zA-Z\s]*$/.test(vl)) {
            frecord[index].value = vl;
            this.setState({ record: frecord, validation_error: false, validation: "" });
          } else {
            document.getElementById("myPopup");
            this.setState({ validation_error: true, validation: "Only Accept Character", ob: ob, verify_error: "" });
          }
        } else if (frecord[index].validation === "withoutSpecialCharacter") {
          if (/^[_A-z0-9\s]*((-|\s)*[_A-z0-9])*$/.test(vl)) {
            frecord[index].value = vl;
            this.setState({ record: frecord });
          }
        } else if (frecord[index].validation === "withSpecialCharacter") {
          if (/^[ A-Za-z0-9_@./#&+,'-]*$/.test(vl)) {
            frecord[index].value = vl;
            this.setState({ record: frecord });
          }
        } else if (frecord[index].validation === "zipCode") {
          if (/^[0-9]{5}(?:-[0-9]{4})?$/.test(vl)) {
            frecord[index].value = vl;
            this.setState({ record: frecord });
          }
        } else if (frecord[index].validation === "decimal") {
          if (/^\d*\.?\d*$/.test(vl)) {
            frecord[index].value = vl;
            this.setState({ record: frecord });
          }
        } else if (frecord[index].validation === "ipAddress") {
          if (/((([0-9a-fA-F]){1,4})\\:){7}([0-9a-fA-F]){1,4}$/.test(vl)) {
            frecord[index].value = vl;
            this.setState({ record: frecord });
            //Ipv4 = (([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])
            //Ipv6 = ((([0-9a-fA-F]){1,4})\\:){7}([0-9a-fA-F]){1,4}
          }
        } else {
          if (/^[a-zA-Z0-9_\s]*$/.test(vl)) {
            frecord[index].value = vl;
            this.setState({ record: frecord });
          }
        }
      } else {
        frecord[index].value = vl;
        this.setState({ record: frecord });
      }
    }

    var uiScript = this.state.uiScript;
    console.log(uiScript);
    if (obj)
      var type = obj.type
    console.log(uiScript);
    for (let i = 0; i < uiScript.length; i++) {
      let field = uiScript[i].field.name;
      let func = uiScript[i].script;
      let ui_type = uiScript[i].type;
      //script
      if (type === "choice") {
        if (field === ob && ui_type === "onchange") {
          this.onChange(func, vl);
        }
      } else {
        if (field === ob && ui_type === "onchange") {
          this.onChange(func, vl);
        }
        if (field === ob && ui_type === "oncelledit") {
          this.onCellEdit(func, vl);
        }
      }
    }
  }

  validationfn(vl, index, ob) {
    var fomecord = this.state.record;
    var minLength = fomecord[index].uivalid.min_length;
    this.setState({ page_error: false, error: "", page_message: false, message: "", verify_error: "" });
    if (vl !== "") {
      if (minLength !== 0 && vl.length < minLength) {
        this.setState({ verify_error: "Please verify your character!" });
        fomecord[index].verified = "unverified";
      } else {
        if (fomecord[index].name === ob) {
          fomecord[index].verified = this.fieldverify(fomecord[index].type, vl);
          if (vl !== "") {
            fomecord[index].verified = this.fieldverify(fomecord[index].type, vl);
          } else {
            fomecord[index].verified = "initial";
          }
        }
      }
    } else {
      this.setState({ page_error: false, error: "" })
    }
    this.setState({ record: fomecord });
  }

  Registerfn() {
    var rcd = this.state.record;
    console.log(rcd);
    var mandatory = [];
    var unverified = [];
    for (var i = 0; i < rcd.length; i++) {
      if (rcd[i].uivalid.visible === "true") {
        if (rcd[i].uivalid.mandatory === "true") {
          if (rcd[i].value === "") {
            mandatory.push(rcd[i].label);
          }
        }
        if (
          rcd[i].type === "int" ||
          rcd[i].type === "String" ||
          rcd[i].type === "email" ||
          rcd[i].type === "date" ||
          rcd[i].type === "aadhar_number"
        ) {
          var veri = this.fieldverify(rcd[i].type, rcd[i].value);
          if (veri === "unverified") {
            unverified.push(rcd[i].label);
          }
        }
      }
    }
    if (mandatory.length === 0 && unverified.length === 0) {
      var frcd = this.state.formrecord;
      frcd.formRecord[2].record = this.state.record;
      this.setState({ loading: true });
      console.log(frcd);
      var token = localStorage.getItem("token");
      axios
        .post(this.state.loca + "/loom/create/externalrecord", frcd, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        })
        .then((resp) => {
          const mltpgrecord = resp.data;
          console.log(mltpgrecord);
          if ("Error" in mltpgrecord) {
            this.setState({
              loading: false,
              page_error: true,
              error: mltpgrecord.Error,
              page_message: false,
              message: "",
            });
          } else {
            let rcd = mltpgrecord.formRecord[2].record;
            let tab_name = mltpgrecord.formRecord[1].table.value;
            for (let i = 0; i < rcd.length; i++) {
              if (rcd[i].name === "contact_number") {
                localStorage.setItem("tableName", tab_name);
                this.sendOTPcallfn(rcd[i].value);
              }
            }
            // this.setState({
            //   loading: false,
            //   page_message: true,
            //   message: mltpgrecord.formRecord[4].Message,
            //   page_error: false,
            //   error: "",
            // });
          }
        });
    } else {
      this.setState({
        page_error: true,
        error: " Check Mandatory fields not set:" + mandatory,
      });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

   sendOTPcallfn (mobile) {
    let tab_name = localStorage.getItem("tableName");
    if (mobile === "" || mobile < 10) {
      alert("check your mobile number");
    } else {
      let fp = { forget_password: { mobile: mobile, table_name: tab_name} };
      axios
        .post(this.state.loca + "/loom/set/mobile/send/external", fp, {
          headers: { },
        })
        .then(
          (resp) => {
            const fpd = resp.data;
            if (fpd.hasOwnProperty("Error")) {
              alert(fpd.Error);
              // setError(true);
              this.setState({error:fpd.Error})
            } else {
              let e = fpd.mobile;
              this.setState({register: true});
              localStorage.setItem("mobile", e);
              localStorage.setItem("register", true);
              this.props.showOtpVerification();
              // navigate("/otpverify");
            }
          },
          (error) => {
            //console.log(error);
            this.setState({page_error: true, error: "Enter a valid mobile no"})
          }
        );
    }
  };

  fieldverify(type, vl) {
    if (type === "email") {
      // if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(vl)) {
      if (
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(vl)
        // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        //   vl
        // )
      ) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "String") {
      // if (/^[a-z\s]{0,255}$/.test(vl)) {
      return "verified";
      // } else {
      //   return "unverified";
      // }
    }

    if (type === "int") {
      if (/^[0-9]*$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "date") {
      if (
        /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(
          vl
        )
      ) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "aadhar_number") {
      if (
        /\d{12}/.test(
          vl
        )
      ) {
        return "verified";
      } else {
        return "unverified";
      }
      // if (/^[0-9]{12}$/.test(vl) && !/[a-zA-Z@#$%^&*()_+~!]+/.test(vl)) {
      //   return "verified";
      // } else {
      //   return "unverified";
      // }
    }
  }

  goBack() {
    this.props.showLogin();
  }

  render() {
    return (
      <div className="container pagesetup mt-5">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div className=" maincompo2">
            <div onClick={this.goBack} >
              <i
                className="fa fa-arrow-left"
                style={{ color: "white", marginRight: "3px", cursor: "pointer" }}
              ></i>
              <a href="#" style={{ color: "white", textDecoration: "none", fontFamily: "system-ui", fontSize: "17px" }}>
                Back
              </a>
            </div>
            <div className="text_al">
              <div className="useric">
                <i
                  className="fa fa-user-circle-o"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Profile"
                ></i>
              </div>

              <span className="mainsp">
                {this.state.tableName === "loom_registration" ? (
                  this.state.language === "English"
                    ? "User Registration Form!"
                    : this.state.language === "Hindi"
                      ? "उपयोगकर्ता पंजीकरण प्रपत्र!"
                      : "User Registration Form!"
                ) : null}
                {this.state.tableName === "client_new" ? (
                  this.state.language === "English"
                    ? "Client Registration Form!"
                    : this.state.language === "Hindi"
                      ? "ग्राहक पंजीकरण फॉर्म!"
                      : "Client Registration Form!"
                ) : null}
              </span>
            </div>
            {this.state.page_error === true && (
              <div
                className="alert alert_danger"
                role="alert"
                style={{
                  padding: "0.2rem 0.2rem",
                  marginBottom: "0px",
                }}
              >
                {this.state.error}
              </div>
            )}
            {this.state.page_message === true && (
              <div
                className="alert alert-success"
                role="alert"
                style={{
                  padding: "0.2rem 0.2rem",
                  marginBottom: "0px",
                }}
              >
                {this.state.message}
              </div>
            )}
            {/* {this.state.record.length === 0 && (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )} */}
            <div className="">
              <div className="">
                {this.state.record.map((obj, index) => (
                  <span key={index}>
                    {obj.columnAccess === "true" && obj.uivalid.visible === "true" && (
                      <div className={this.state.isMobile ? "row col-md-6" : "dblock col-md-6"}>
                        <div key={obj.name}>
                          <div className="inppd ">
                            {obj.type === "String" ? (
                              <div className="form-group objpdg mrg">
                                {obj.verified === "unverified" && (
                                  <div
                                    className="alert alert_danger"
                                    role="alert"
                                    style={{
                                      padding: "0.2rem 0.2rem",
                                      marginBottom: "0px",
                                      width: "95%",
                                    }}
                                  >
                                    {this.state.verify_error}
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

                                <span className="mainlab">{obj.label}</span>
                                {this.state.ob === obj.name && this.state.validation_error === true && this.state.validation !== "" &&
                                  <span className="popup_txt_form popuptext" id="myPopup">{this.state.validation}</span>
                                }

                                <input
                                  type="text"
                                  className={
                                    obj.verified === "unverified"
                                      ? "with form-control formpadd_danger"
                                      : "with form-control formpadd"
                                  }
                                  value={obj.value}
                                  readOnly={obj.uivalid.read_only === "true"}
                                  maxLength={obj.uivalid.max_length}
                                  onChange={(e) =>
                                    this.formChangefn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                  onBlur={(e) =>
                                    this.validationfn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                ></input>
                              </div>
                            ) : null}

                            {/* Name Field End */}
                            {obj.type === "int" ? (
                              <div className="form-group objpdg mrg">
                                {obj.verified === "unverified" && (
                                  <div
                                    className="alert alert_danger"
                                    role="alert"
                                    style={{
                                      padding: "0.2rem 0.2rem",
                                      marginBottom: "0px",
                                      width: "95%",
                                    }}
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
                                <span className="mainlab">{obj.label}</span>
                                <input
                                  type="text"
                                  className={
                                    obj.verified === "unverified"
                                      ? "with form-control formpadd_danger"
                                      : "with form-control formpadd"
                                  }
                                  value={obj.value}
                                  readOnly={obj.uivalid.read_only === "true"}
                                  maxLength={obj.uivalid.max_length}
                                  onChange={(e) =>
                                    this.formChangefn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                  onBlur={(e) =>
                                    this.validationfn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                ></input>
                              </div>
                            ) : null}
                            {obj.type === "aadhar_number" ? (
                              <div className="form-group objpdg mrg">
                                {obj.verified === "unverified" && (
                                  <div
                                    className="alert alert_danger"
                                    role="alert"
                                    style={{
                                      padding: "0.2rem 0.2rem",
                                      marginBottom: "0px",
                                      width: "95%",
                                    }}
                                  >
                                    Please verify your aadhar number!
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
                                <span className="mainlab">{obj.label}</span>
                                <input
                                  type="text"
                                  className={
                                    obj.verified === "unverified"
                                      ? "with form-control formpadd_danger"
                                      : "with form-control formpadd"
                                  }
                                  value={obj.value}
                                  readOnly={obj.uivalid.read_only === "true"}
                                  maxLength={obj.uivalid.max_length}
                                  onChange={(e) =>
                                    this.formChangefn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                  onBlur={(e) =>
                                    this.validationfn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                ></input>
                              </div>
                            ) : null}
                            {obj.type === "email" ? (
                              <div className="form-group objpdg mrg">
                                {obj.verified === "unverified" && (
                                  <div
                                    className="alert alert_danger"
                                    role="alert"
                                    style={{
                                      padding: "0.2rem 0.2rem",
                                      marginBottom: "0px",
                                      width: "95%",
                                    }}
                                  >
                                    Email Format Not Correct!
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
                                <span className="mainlab">{obj.label}</span>
                                <input
                                  type="email"
                                  className={
                                    obj.verified === "unverified"
                                      ? "with form-control formpadd_danger"
                                      : "with form-control formpadd"
                                  }
                                  value={obj.value}
                                  maxLength={obj.uivalid.max_length}
                                  readOnly={obj.uivalid.read_only === "true"}
                                  onChange={(e) =>
                                    this.formChangefn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                  onBlur={(e) =>
                                    this.validationfn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                ></input>
                              </div>
                            ) : null}
                            {obj.type === "choice" ? (
                              <div className="form-group mrg">
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
                                <span className="mainlab">{obj.label}</span>
                                <select
                                  className={
                                    obj.verified === "unverified"
                                      ? "with form-control form-select formpadd_danger"
                                      : "with form-control form-select formpadd"
                                  }
                                  aria-label="Default select example"
                                  value={obj.value}
                                  onBlur={(e) =>
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
                            {obj.type === "date" ? (
                              <div className=" form-group mrg">
                                {obj.verified === "unverified" && (
                                  <div
                                    className={
                                      obj.verified === "unverified"
                                        ? "form-control formpadd_danger"
                                        : "form-control formpadd"
                                    }
                                    role="alert"
                                    style={{
                                      padding: "0.2rem 0.2rem",
                                      marginBottom: "0px",
                                      width: "95%",
                                    }}
                                  >
                                    please verify your date of birth!
                                  </div>
                                )}
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
                                <span className="mainlab">{obj.label}</span>

                                <input
                                  type="date"
                                  className={
                                    obj.verified === "unverified"
                                      ? "with form-control formpadd_danger"
                                      : "with form-control formpadd"
                                  }
                                  value={obj.value}
                                  maxLength={obj.uivalid.max_length}
                                  readOnly={obj.uivalid.read_only === "true"}
                                  onChange={(e) =>
                                    this.formChangefn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                  onBlur={(e) =>
                                    this.validationfn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                ></input>
                              </div>
                            ) : null}
                            {obj.type === "time" ? (
                              <div className=" form-group">
                                {obj.verified === "unverified" && (
                                  <div
                                    className={
                                      obj.verified === "unverified"
                                        ? "with form-control formpadd_danger"
                                        : "with form-control formpadd"
                                    }
                                    role="alert"
                                    style={{
                                      padding: "0.2rem 0.2rem",
                                      marginBottom: "0px",
                                      width: "95%",
                                    }}
                                  >
                                    please verify your time!
                                  </div>
                                )}
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
                                <span className="mainlab">{obj.label}</span>

                                <input
                                  type="time"
                                  className="form-control formpadd"
                                  value={obj.value}
                                  maxLength={obj.uivalid.max_length}
                                  readOnly={obj.uivalid.read_only === "true"}
                                  onChange={(e) =>
                                    this.formChangefn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                  onBlur={(e) =>
                                    this.validationfn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                ></input>
                              </div>
                            ) : null}
                            {obj.type === "datetime" ? (
                              <div className=" form-group">
                                {obj.verified === "unverified" && (
                                  <div
                                    className={
                                      obj.verified === "unverified"
                                        ? "with form-control formpadd_danger"
                                        : "with form-control formpadd"
                                    }
                                    role="alert"
                                    style={{
                                      padding: "0.2rem 0.2rem",
                                      marginBottom: "0px",
                                      width: "95%",
                                    }}
                                  >
                                    please verify your date and time!
                                  </div>
                                )}
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
                                <span className="mainlab">{obj.label}</span>

                                <input
                                  type="datetime-local"
                                  step="1"
                                  className={
                                    obj.verified === "unverified"
                                      ? "form-control formpadd_danger"
                                      : "form-control formpadd"
                                  }
                                  value={obj.value}
                                  maxLength={obj.uivalid.max_length}
                                  readOnly={obj.uivalid.read_only === "true"}
                                  onChange={(e) =>
                                    this.formChangefn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                  onBlur={(e) =>
                                    this.validationfn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                ></input>
                              </div>
                            ) : null}
                            {obj.type === "boolean" ? (
                              <div className="form-check">
                                <span className="mainlab">{obj.label}</span>
                                <input
                                  type="checkbox"
                                  // className="checkpadd"
                                  className="form-control checkpadd"
                                  maxLength={obj.uivalid.max_length}
                                  checked={obj.value === "true" ? true : false}
                                  readOnly={obj.uivalid.read_only === "true"}
                                  onChange={(e) =>
                                    this.formChangefn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                  onBlur={(e) =>
                                    this.validationfn(
                                      e.target.value,
                                      index,
                                      obj.name
                                    )
                                  }
                                ></input>
                              </div>
                            ) : null}
                            {obj.type === "lookup" ? (
                              <div className="form-group mrg">
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
                                <span className="mainlab">{obj.label}</span>
                                <select
                                  className="with form-control form-select formpadd "
                                  aria-label="Default select example"
                                  value={obj.value}
                                  onBlur={(e) =>
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
                                  {obj.lookup.map((ch, chi) => (
                                    <option key={chi} value={ch.name}>
                                      {ch.value}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="btncen">
              <button
                type="button"
                className="btttt btn btn-success"
                onClick={this.Registerfn}
              >
                {this.state.language === "English"
                  ? "Register"
                  : this.state.language === "Hindi"
                    ? "पंजीकरण करवाना"
                    : "Registration Form!"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default RegisterComponent;
