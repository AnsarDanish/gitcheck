import React, { Component } from "react";
import axios from "axios";
import "../css/login.css";
import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { message } from "antd";

class SetNewPassword extends Component {
  state = {
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
    flag: false,
    errorMsg: [],
    op: this.props.op,
    un: this.props.un,
    loca: this.props.loca,
    isMobile: this.props.isMobile,
    page_message: false,
    message: "",
    showHideflag: true,
  };

  constructor(props) {
    super(props);
    this.logincall = this.logincall.bind(this);
    this.updateCall = this.updateCall.bind(this);
    this.setNewPassword = this.setNewPassword.bind(this);
    this.setConfirmPassword = this.setConfirmPassword.bind(this);
    this.setOldPassword = this.setOldPassword.bind(this);
    this.setFlag = this.setFlag.bind(this);
  }

  componentDidMount() {
    if (this.state.op === undefined || this.state.un === undefined) {
      this.logincall();
    }
  }

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

  updateCall() {
    let eMsg = [];
    console.log("ghasdgfad: ", this.state.op, this.state.oldPassword);
    if (this.state.op === this.state.oldPassword) {
      this.setState({ errorMsg: [], flag: false });
    } else {
      console.log("innnnnnnnnnn");
      eMsg.push("old password is wrong!!");
      this.setState({ flag: true });
    }
    if (this.state.newPassword === this.state.confirmPassword) {
      this.setState({ errorMsg: [], flag: false });
    } else {
      console.log("innnnnnnnnnn1");
      eMsg.push("NewPassword and ConfirmPassword does not match!!");
      this.setState({ flag: true });
    }
    if (!eMsg.length > 0) {
      let json = {
        username: this.state.un,
        password: this.state.newPassword,
      };
      var token = localStorage.getItem("token");
      axios
        .post(this.state.loca + "/loom/set/newpassword", json, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        })
        .then(
          (resp) => {
            let result = resp.data;
            console.log(result);
            if ("Error" in result) {
              this.setState({ flag: true, errorMsg: result.Error, message: "" });
            } else {
              // if (resp.data.newPasswordSet) {
              //   this.props.showLogin();
              // }
              this.setState({ page_message: true, message: result.Success, flag: false, errorMsg:[] });
              this.props.showLogin();
            }
          },
          (error) => {
            this.props.showErrorCompo();
            console.log(error);
          }
        );
    } else {
      this.setState({ errorMsg: eMsg, flag: true, message: "", page_message: false });
    }
  }

  setOldPassword(e) {
    this.setState({ oldPassword: e, flag: false });
  }

  setNewPassword(e) {
    this.setState({ newPassword: e, flag: false });
  }

  setConfirmPassword(e) {
    this.setState({ confirmPassword: e, flag: false });
  }

  setFlag(e) {
    this.setState({ showHideflag: !e.target.checked });
  }

  render() {
    return (
      <div className="container" style={{ flexGrow: 1 }}>
        <div className="d-flex justify-content-center h-100">
          <Card
            className="cardddd"
            style={{
              background: "grey",
              marginTop: "97px",
              borderRadius: "8px",
            }}
          >
            <CardHeader style={{ background: "grey" }}>
              <h3>Set New Password</h3>
            </CardHeader>
            {console.log(this.state.flag, this.state.errorMsg)}
            {this.state.flag === true && (
              <div className="alertgp alert-danger"
                style={{ color: "black" }}>{this.state.errorMsg}</div>
            )}
            {this.state.page_message === true && (
              <div className="alertgp alert-success"
                style={{ color: "black" }}>{this.state.message}</div>
            )}
            <CardBody className="cardchild" style={{ background: "grey" }}>
              <div style={{ textAlign: "center", padding: "15px" }}>
                <i
                  className="fa fa-user"
                  aria-hidden="true"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Profile"
                  style={{
                    color: "white",
                    border: "2.5px solid white",
                    height: "4.5rem",
                    width: "4.5rem",
                    fontSize: "62px",
                    textAlign: "center",
                    borderRadius: "39px",
                    marginTop: "-49",
                  }}
                ></i>
              </div>

              <div className=" usericpadd input-group form-group pb-2">
                <input
                  type={this.state.showHideflag ? "password" : "text"}
                  name="password"
                  placeholder="Oldpassword"
                  className=" inpp "
                  value={this.state.oldPassword}
                  onChange={(e) => {
                    this.setOldPassword(e.target.value);
                  }}
                ></input>
              </div>
              <div className=" usericpadd input-group form-group pb-2">
                <input
                  type={this.state.showHideflag ? "password" : "text"}
                  name="password"
                  placeholder="NewPassword"
                  className=" inpp "
                  value={this.state.newPassword}
                  onChange={(e) => {
                    this.setNewPassword(e.target.value);
                  }}
                ></input>
              </div>

              <div className=" usericpadd input-group form-group">
                <input
                  type={this.state.showHideflag ? "password" : "text"}
                  name="password"
                  placeholder="ConfirmPassword"
                  className=" inpp"
                  value={this.state.confirmPassword}
                  onChange={(e) => {
                    this.setConfirmPassword(e.target.value);
                  }}
                ></input>
              </div>
              <div
                className=" row align-items-center  justify-content-center remember "
                style={{ fontSize: "16px", color: "white" }}
              >
                Show Password
                <input
                  type="checkbox"
                  checked={!this.state.showHideflag}
                  onChange={(e) => {
                    this.setFlag(e);
                  }}
                  aria-hidden="true"
                />
              </div>
              {/* {this.state.flag &&
                this.state.errorMsg.map((obj, index) => (
                  <div key={index} style={{ color: "white", marginTop: "8px" }}>
                    {obj}
                  </div>
                ))} */}
              <div className="form-group" style={{ marginTop: "22px" }}>
                <input
                  type="button"
                  value="Update"
                  className="csm_btn csm_btn_pri col-md-2 sub-btn"
                  onClick={() => {
                    this.updateCall();
                  }}
                ></input>
              </div>
            </CardBody>
{/* 
            <CardFooter style={{ background: "grey" }}>
              <div className="d-flex links">
                <i
                  className="fa fa-arrow-left"
                  style={{ color: "black", marginTop: "6px" }}
                ></i>
                <a
                  href="/#"
                  onClick={this.logincall}
                  style={{ color: "black" }}
                >
                  Login
                </a>
              </div>
            </CardFooter> */}
          </Card>
        </div>
      </div>
    );
  }
}

export default SetNewPassword;
