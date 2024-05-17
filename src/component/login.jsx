import React, { Component } from "react";
import "../css/login.css";
import axios from "axios";
import WorkInProgress from "./work_in_progress";
import { toast } from "react-toastify";

class Login extends Component {
  state = {
    resp: [],
    showlogin: false,
    callDash: false,
    loading: false,
    language: this.props.language,
    username: "",
    password: "",
    pageError: false,
    error: "",
    setUserInfo: {},
    loca: this.props.loca,
    isMobile: this.props.isMobile,
    showHidePassword: "fa fa-eye-slash hidepassword",
    flag: true,
    register: this.props.reg,
  };

  _isMounted = false;

  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.dismiss = this.dismiss.bind(this);
    this.logincall = this.logincall.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.callForgetPassword = this.callForgetPassword.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.callNewPassword = this.callNewPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideShowPassword = this.hideShowPassword.bind(this);
    this.verifyRecord = this.verifyRecord.bind(this);
  }

  componentDidMount() {
    let reg = this.state.register;
    let tab_name = localStorage.getItem("tableName");
   if (reg !== null && reg !== undefined) {
    if (reg.state.registered === true || reg.state.registered === "true") {
      if (tab_name === "client_new") {
        toast("Successfully Registered. You will receive login username and password via email or sms after approval within a 48 hours. Thank you!", {
          autoClose: 3000,
          toastId: 1,
          position: "bottom-center",
          theme: "colored",
          type: "success",
        });
      } else if (tab_name === "loom_registration") {
        toast("Successfully Registered. You will receive login username and password via email or sms. Thank you!", {
          autoClose: 3000,
          toastId: 1,
          position: "bottom-center",
          theme: "colored",
          type: "success",
        });
      }
     }
   }
     localStorage.removeItem("register");
    // this.setState({ isMounted: true })
    this._isMounted = true;
    this.verifyRecord();
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    // this.setState({ isMounted: false });
    console.log(this._isMounted, "notunmount");
    this._isMounted = false;
    console.log(this._isMounted, "unmounted");
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isMobile !== state.isMobile) {
      return {
        isMobile: props.isMobile,
      };
    }
    return null;
  }

  verifyRecord() {
    console.log(this._isMounted);
    var token = localStorage.getItem("token");
    console.log(token);
    if (token !== "" && token !== null) {
      axios
        .get(this.state.loca + "/verify", {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            var userInfo = {
              userId: res.data[3].userId,
              username: res.data[3].username,
              name: res.data[3].name,
              admin: res.data[3].admin,
              cid: res.data[3].cid,
              mobileNumber: res.data[3].mobileNumber,
            };
            var rsp = res.data[0].response;
            if (rsp === "verified" || rsp === "refereshed") {
              if (rsp === "verified") {
                if (this._isMounted) {
                  console.log("if isMounted is true");
                  this.setState({ showlogin: false });
                }
                localStorage.setItem("userDetails", JSON.stringify(userInfo));
                this.dismiss();
              } else if (rsp === "refereshed") {
                localStorage.setItem("token", res.data[1].token);
                this.setState({ showlogin: false });
                localStorage.setItem("userDetails", JSON.stringify(userInfo));
                this.dismiss();
              }
            } else if (rsp === "fail" || rsp === "not_verified") {
              localStorage.setItem("token", "");
              this.setState({ showlogin: true });
            }
          } else {
            this.setState({ showlogin: true });
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              localStorage.setItem("token", "");
              if (
                error.response.data.cause.startsWith(
                  "io.jsonwebtoken.ExpiredJwtException: JWT expired at "
                )
              ) {
                this.setState({ showlogin: true });
              }
              this.setState({ showlogin: true });
            }
          } else if (error.request) {
          } else {
          }
        });
    } else {
      this.setState({ showlogin: true });
      // 
    }
  }

  dismiss() {
    if(this._isMounted){
      this.setState({ loading: false });
    }
    this.props.unmountMe();
    // this.props.showDash();
    this.props.showMainCompo(JSON.parse(localStorage.getItem("userDetails")));
  }

  showRegister(language, type) {
    this.props.showRegister(language, type);
  }

  callForgetPassword() {
    this.props.showForgetPassword();
  }

  callNewPassword(op, un) {
    this.props.showNewPassword(op, un);
  }

  logincall() {
    // let bodyFormData = new FormData();
    // bodyFormData.set("username", this.username.value);
    // bodyFormData.set("password", this.password.value);
    // bodyFormData.set("application", "loomyarn");
    this.setState({ loading: true });
    axios
      .post(
        this.state.loca + "/authenticate",
        {
          username: this.username.value,
          password: this.password.value,
          application: "loomyarn",
        },
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.authenticated === true) {
            var token = res.data.token;
            var userInfo = {
              userId: res.data.userId,
              username: res.data.username,
              name: res.data.name,
              admin: res.data.admin,
              cid: res.data.cid,
              mobileNumber: res.data.mobileNumber,
            };
            localStorage.setItem("userDetails", JSON.stringify(userInfo));
            if (res.data.passwordReset) {
              this.callNewPassword(this.password.value, this.username.value);
            } else {
              if (token != null) {
                localStorage.setItem("token", token);
                this.dismiss();
                this.verifyRecord();
              }
            }
          } else {
            this.setState({
              error: res.data.error,
              loading: false,
              pageError: true,
            });
          }
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  setLanguage(val) {
    this.setState({
      language: val,
    });
  }

  hideShowPassword() {
    if (!this.state.flag) {
      this.setState({
        showHidePassword: "fa fa-eye-slash hidepassword",
        flag: !this.state.flag,
      });
    } else {
      this.setState({
        showHidePassword: "fa fa-eye hidepassword",
        flag: !this.state.flag,
      });
    }
  }

  setFlag(e) {
    this.setState({ flag: !e.target.checked });
  }

  setErrorMessage() {
    if (this.state.pageError === true) {
      this.setState({ pageError: false, error: "" });
    }
  }

  render() {
    return (
      <div>
        {this.state.loading === true && <WorkInProgress></WorkInProgress>}
        <div>
          {this.state.showlogin === true && (
            <div>
              {this.state.isMobile ? (
                <div className="container">
                  <div className="d-flex justify-content-center h-100">
                    <div className="card_log" style={{ marginTop: "3.5rem" }}>
                      <div className="card-header lang">
                        {this.state.pageError === true && (
                          <div
                            className="alertgp alert-danger"
                            style={{ color: "black" }}
                          >
                            {this.state.error}
                          </div>
                        )}
                        <h3 className="cen">
                          {this.state.language === "English"
                            ? "Sign In"
                            : this.state.language === "Hindi"
                              ? "साइन इन"
                              : this.state.language === "Urdu"
                                ? "سائن ان"
                                : "Sign In"}
                        </h3>
                        <div className="justify-content-start cen_set">
                          <span className="pad5" style={{ color: "white" }}>
                            {this.state.language === "English"
                              ? "Language"
                              : this.state.language === "Hindi"
                                ? "भाषा"
                                : this.state.language === "Urdu"
                                  ? "زبان"
                                  : "Language"}{" "}
                          </span>
                          <select
                            value={this.state.language}
                            className="form-control form-select"
                            style={{
                              marginLeft: "5px",
                              lineHeight: "1.5",
                              width: "50%",
                            }}
                            onChange={(e) => {
                              this.setLanguage(e.target.value);
                            }}
                          >
                            <option value={"English"}>
                              {this.state.language === "English"
                                ? "English"
                                : this.state.language === "Hindi"
                                  ? "अंग्रेज़ी"
                                  : this.state.language === "Urdu"
                                    ? "انگریزی"
                                    : "English"}
                            </option>
                            <option value={"Hindi"}>
                              {this.state.language === "English"
                                ? "Hindi"
                                : this.state.language === "Hindi"
                                  ? "हिन्दी"
                                  : this.state.language === "Urdu"
                                    ? "ہندی"
                                    : "Hindi"}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="card-body cen_set">
                        <div className="input-group form-group pb-2">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i
                                className=" ftsize fa fa-user"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Profile"
                              ></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            name="username"
                            placeholder={
                              this.state.language === "English"
                                ? "Username"
                                : this.state.language === "Hindi"
                                  ? "उपयोगकर्ता नाम"
                                  : this.state.language === "Urdu"
                                    ? "صارف نام"
                                    : "username"
                            }
                            className="form-control"
                            ref={(username) => {
                              this.username = username;
                            }}
                          ></input>
                        </div>
                        <div className="input-group form-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="ftsize fa fa-key "></i>
                            </span>
                          </div>
                          <input
                            type={this.state.flag ? "password" : "text"}
                            name="password"
                            placeholder={
                              this.state.language === "English"
                                ? "Password"
                                : this.state.language === "Hindi"
                                  ? "पासवर्ड"
                                  : this.state.language === "Urdu"
                                    ? "پاس ورڈ"
                                    : "password"
                            }
                            className="form-control"
                            ref={(password) => {
                              this.password = password;
                            }}
                            onChange={() => {
                              this.setErrorMessage();
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                this.logincall();
                              }
                            }}
                          ></input>
                          {/* <div className="input-group-prepend">
                          <i
                            className={this.state.showHidePassword}
                            aria-hidden="true"
                            onClick={this.hideShowPassword}
                          ></i>
                        </div> */}
                        </div>

                        {/* <div className="align-items-center remember">
                        {this.state.language === "English"
                          ? "Remember Me"
                          : this.state.language === "Hindi"
                            ? "मुझे याद रखें "
                            : this.state.language === "Urdu"
                              ? "مجھے یاد رکھنا"
                              : "Remember Me"}

                        <input type="checkbox" className="pos"></input>
                      </div> */}
                        <div
                          className=" row align-items-center  justify-content-center remember "
                          style={{ fontSize: "16px", color: "white" }}
                        >
                          Show Password
                          <input
                            type="checkbox"
                            checked={!this.state.flag}
                            onChange={(e) => {
                              this.setFlag(e);
                            }}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="form-group cen">
                          <input
                            type="button"
                            value={
                              this.state.language === "English"
                                ? "Login"
                                : this.state.language === "Hindi"
                                  ? "लॉग इन"
                                  : this.state.language === "Urdu"
                                    ? "لاگ ان"
                                    : "Login"
                            }
                            className="btn float-right login_btn"
                            onClick={this.logincall}
                          ></input>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                          {this.state.language === "English"
                            ? "Don't have an account?"
                            : this.state.language === "Hindi"
                              ? "खाता नहीं है?"
                              : this.state.language === "Urdu"
                                ? "اکاؤنٹ نہیں ہے؟"
                                : "Don't have an account?"}
                        </div>
                        <div className="d-flex justify-content-center links">
                          <button
                            className="btn btnyellow"
                            onClick={() =>
                              this.showRegister(this.state.language, "user")
                            }
                          >
                            {this.state.language === "English"
                              ? "Sign Up for User"
                              : this.state.language === "Hindi"
                                ? "उपयोगकर्ता के लिए साइन अप करें"
                                : this.state.language === "Urdu"
                                  ? "صارف کے لیے سائن اپ کریں"
                                  : "Sign In"}
                          </button>
                          <button
                            className="btn btnyellow"
                            onClick={() =>
                              this.showRegister(this.state.language, "client")
                            }
                          >
                            {this.state.language === "English"
                              ? "Sign Up For Client"
                              : this.state.language === "Hindi"
                                ? "ग्राहक के लिए साइन अप करें"
                                : this.state.language === "Urdu"
                                  ? "کلائنٹ کے لیے سائن اپ کریں"
                                  : "Sign In"}
                          </button>
                        </div>
                        <div className="d-flex justify-content-center links">
                          <button
                            className="btn btnyellow"
                            style={{ marginTop: "1%" }}
                            onClick={() => this.callForgetPassword()}
                          >
                            {this.state.language === "English"
                              ? "Forgot your password?"
                              : this.state.language === "Hindi"
                                ? "पासवर्ड भूल गए हैं? "
                                : this.state.language === "Urdu"
                                  ? "اپنا پاس ورڈ بھول گئے؟"
                                  : "Forgot your password?"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="container">
                  <div className="d-flex justify-content-center h-100">
                    <div className="card_log card_log_mar">
                      <div className="card-header lang">
                        {this.state.pageError === true && (
                          <div
                            className="alertgp alert-danger cen"
                            style={{ color: "black" }}
                          >
                            {this.state.error}
                          </div>
                        )}
                        <h3 className="cen">
                          {this.state.language === "English"
                            ? "Sign In"
                            : this.state.language === "Hindi"
                              ? "साइन इन"
                              : this.state.language === "Urdu"
                                ? "سائن ان"
                                : "Sign In"}
                        </h3>
                        <div className="justify-content-start cen_set">
                          <span className="pad5" style={{ color: "white" }}>
                            {this.state.language === "English"
                              ? "Language"
                              : this.state.language === "Hindi"
                                ? "भाषा"
                                : this.state.language === "Urdu"
                                  ? "زبان"
                                  : "Language"}{" "}
                          </span>
                          <select
                            value={this.state.language}
                            className="form-control form-select"
                            style={{
                              marginLeft: "5px",
                              lineHeight: "1.3",
                              width: "50%",
                            }}
                            onChange={(e) => {
                              this.setLanguage(e.target.value);
                            }}
                          >
                            <option value={"English"}>
                              {this.state.language === "English"
                                ? "English"
                                : this.state.language === "Hindi"
                                  ? "अंग्रेज़ी"
                                  : this.state.language === "Urdu"
                                    ? "انگریزی"
                                    : "English"}
                            </option>
                            <option value={"Hindi"}>
                              {this.state.language === "English"
                                ? "Hindi"
                                : this.state.language === "Hindi"
                                  ? "हिन्दी"
                                  : this.state.language === "Urdu"
                                    ? "ہندی"
                                    : "Hindi"}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="card-body cen_set">
                        <div className="input-group form-group pb-2">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i
                                className=" ftsize fa fa-user "
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Profile"
                              ></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            name="username"
                            placeholder={
                              this.state.language === "English"
                                ? "Username"
                                : this.state.language === "Hindi"
                                  ? "उपयोगकर्ता नाम"
                                  : this.state.language === "Urdu"
                                    ? "صارف نام"
                                    : "username"
                            }
                            className="form-control"
                            ref={(username) => {
                              this.username = username;
                            }}
                            onChange={() => {
                              this.setErrorMessage();
                            }}
                          ></input>
                        </div>
                        <div className="input-group form-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="ftsize fa fa-key "></i>
                            </span>
                          </div>
                          <input
                            type={this.state.flag ? "password" : "text"}
                            name="password"
                            placeholder={
                              this.state.language === "English"
                                ? "Password"
                                : this.state.language === "Hindi"
                                  ? "पासवर्ड"
                                  : this.state.language === "Urdu"
                                    ? "پاس ورڈ"
                                    : "password"
                            }
                            className="form-control"
                            ref={(password) => {
                              this.password = password;
                            }}
                            onChange={() => {
                              this.setErrorMessage();
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                this.logincall();
                              }
                            }}
                          ></input>
                          {/* <div className="input-group-prepend">
                            <i
                              className={this.state.showHidePassword}
                              aria-hidden="true"
                              onClick={this.hideShowPassword}
                            ></i>
                          </div> */}
                        </div>

                        {/* <div className="align-items-center remember">
                          {this.state.language === "English"
                            ? "Remember Me"
                            : this.state.language === "Hindi"
                              ? "मुझे याद रखें "
                              : this.state.language === "Urdu"
                                ? "مجھے یاد رکھنا"
                                : "Remember Me"}

                          <input type="checkbox" className="pos"></input>
                        </div> */}
                        <div
                          className=" row align-items-center  justify-content-center remember "
                          style={{ fontSize: "16px", color: "white" }}
                        >
                          Show Password
                          <input
                            type="checkbox"
                            checked={!this.state.flag}
                            onChange={(e) => {
                              this.setFlag(e);
                            }}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="form-group cen">
                          <input
                            type="button"
                            value={
                              this.state.language === "English"
                                ? "Login"
                                : this.state.language === "Hindi"
                                  ? "लॉग इन"
                                  : this.state.language === "Urdu"
                                    ? "لاگ ان"
                                    : "Login"
                            }
                            className="btn float-right login_btn"
                            onClick={this.logincall}
                          ></input>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                          {this.state.language === "English"
                            ? "Don't have an account?"
                            : this.state.language === "Hindi"
                              ? "खाता नहीं है?"
                              : this.state.language === "Urdu"
                                ? "اکاؤنٹ نہیں ہے؟"
                                : "Don't have an account?"}
                        </div>
                        <div className="d-flex justify-content-center links">
                          <button
                            className="btn btnyellow"
                            onClick={() =>
                              this.showRegister(this.state.language, "user")
                            }
                          >
                            {this.state.language === "English"
                              ? "Sign Up for User"
                              : this.state.language === "Hindi"
                                ? "उपयोगकर्ता के लिए साइन अप करें"
                                : this.state.language === "Urdu"
                                  ? "صارف کے لیے سائن اپ کریں"
                                  : "Sign In"}
                          </button>
                          <button
                            className="btn btnyellow"
                            onClick={() =>
                              this.showRegister(this.state.language, "client")
                            }
                          >
                            {this.state.language === "English"
                              ? "Sign Up For Client"
                              : this.state.language === "Hindi"
                                ? "ग्राहक के लिए साइन अप करें"
                                : this.state.language === "Urdu"
                                  ? "کلائنٹ کے لیے سائن اپ کریں"
                                  : "Sign In"}
                          </button>
                        </div>
                        <div className="d-flex justify-content-center links">
                          <button
                            className="btn btnyellow"
                            style={{ marginTop: "1%" }}
                            onClick={() => this.callForgetPassword()}
                          >
                            {this.state.language === "English"
                              ? "Forgot your password?"
                              : this.state.language === "Hindi"
                                ? "पासवर्ड भूल गए हैं? "
                                : this.state.language === "Urdu"
                                  ? "اپنا پاس ورڈ بھول گئے؟"
                                  : "Forgot your password?"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
