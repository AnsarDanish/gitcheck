import React, { Component } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import "../css/OtpVerification.css";
import { error } from "jquery";

class GenerateNewPin extends Component {
  state = {
    password: "",
    confirmPassword: "",
    error: false,
    fieldSet: false,
    page_error: false,
    ch_error: "",
    page_message: false,
    message: "",
    loca: this.props.loca,
    isMobile: this.props.isMobile,
    flag: true,
  };

  constructor(props) {
    super(props);
    this.change_password = this.change_password.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setConfirmPassword = this.setConfirmPassword.bind(this);
    this.logincall = this.logincall.bind(this);
    this.setFlag = this.setFlag.bind(this);
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    if (props.isMobile !== state.isMobile) {
      return {
        isMobile: props.isMobile,
      };
    }
    return null;
  }

  logincall() {
    this.props.showLogin();
  }

  change_password() {
    var pas_wrd = this.state.password;
    if (this.state.password === this.state.confirmPassword) {
      let email = localStorage.getItem("email");
      let fp = { forget_password: { email: email, password: pas_wrd } };
      axios.post(this.state.loca + "/loom/set/createnewpassword", fp, {}).then(
        (resp) => {
          let cnp = resp.data;
          if ("Error" in cnp) {
            this.setState({
              page_error: true,
              ch_error: cnp.Error,
            });
          } else {
            this.setState({
              page_message: true,
              message: cnp.Success,
              fieldSet: false,
              error: false,
            });
            this.props.showLogin();
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
    } else {
      this.setState({
        page_error: true,
        ch_error: "Password not matched",
      });
    }
  }

  setPassword(e) {
    console.log("ppppp: ", e, this.state.confirmPassword);
    if (this.state.confirmPassword !== "") {
      if (e !== this.state.confirmPassword) {
        console.log("innnnnnn");
        this.setState({ error: true, fieldSet: true });
      } else {
        this.setState({ error: false, fieldSet: true });
      }
    }
    this.setState({ password: e, page_error: false, ch_error: "" });
  }

  setConfirmPassword(e) {
    var frst_passwrd = this.state.password;
    if (frst_passwrd !== "") {
      if (this.state.password === e) {
        this.setState({ error: false, confirmPassword: e, fieldSet: true });
      } else {
        this.setState({ error: true, confirmPassword: e, fieldSet: true });
      }
    } else {
      this.setState({
        fieldSet: false,
        page_error: true,
        ch_error: "Firstly fill password field.",
      });
    }
  }

  setFlag(e) {
    this.setState({ flag: !e.target.checked });
  }

  render() {
    return (
      <div className="d-flex justify-content-center ">
        <Card
          className="cardddd"
          style={{ background: "grey", marginTop: "97px", borderRadius: "8px" }}
        >
          <CardHeader style={{ background: "grey" }}>
            <h3>Generate New Pin</h3>
          </CardHeader>

          {this.state.page_error === true && (
            <div className="alertgp alert-danger" style={{ color: "black" }}>
              {this.state.ch_error}
            </div>
          )}

          {this.state.page_message === true && (
            <div className="alertgp alert-success" style={{ color: "black" }}>
              {this.state.message}
            </div>
          )}

          <CardBody className="cardchild" style={{ background: "grey" }}>
            <div style={{ textAlign: "center", padding: "15px" }}>
              <i
                className="fa fa-user"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Profile"
                aria-hidden="true"
                style={{
                  color: "white",
                  border: "2.5px solid white",
                  height: "4.5rem",
                  width: "4.5rem",
                  fontSize: "76px",
                  textAlign: "center",
                  borderRadius: "39px",
                  marginTop: "-49",
                }}
              ></i>
            </div>
            <div className=" usericpadd input-group form-group pb-2">
              <input
                type={this.state.flag ? "password" : "text"}
                name="password"
                value={this.state.password}
                placeholder="New Password"
                className="inpp "
                onChange={(e) => this.setPassword(e.target.value)}
              ></input>
            </div>

            <div className=" usericpadd input-group form-group pb-2">
              <input
                type={this.state.flag ? "password" : "text"}
                name="password"
                value={this.state.confirmPassword}
                placeholder="Confirm Password"
                className=" inpp "
                onChange={(e) => this.setConfirmPassword(e.target.value)}
              ></input>
            </div>
            {this.state.error === true && this.state.fieldSet === true && (
              <div className="alertgp alert-danger" style={{ color: "black" }}>
                Password Missmatch.
              </div>
            )}

            {this.state.error === false && this.state.fieldSet === true && (
              <div className="alertgp alert-success" style={{ color: "black" }}>
                Password Matched.
              </div>
            )}
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
            <div className="form-group" style={{ marginTop: "22px" }}>
              <input
                type="button"
                value="Submit"
                className="btn-hover"
                onClick={this.change_password}
              ></input>
            </div>
          </CardBody>

          {/* <CardFooter style={{ background: "grey" }}>
            <div className="d-flex links">
              <i
                className="fa fa-arrow-left"
                style={{ color: "black", marginTop: "6px" }}
              ></i>
              <a href="/#" onClick={this.logincall} style={{ color: "black" }}>
                Re-Login
              </a>
            </div>
          </CardFooter> */}
        </Card>
      </div>
    );
  }
}

export default GenerateNewPin;
