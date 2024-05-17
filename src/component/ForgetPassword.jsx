import React, { Component } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import "../css/UpdatePassword.css";
import "../css/login.css"

class ForgetPassword extends Component {
  state = {
    email: "",
    page_error: false,
    error: "",
    page_message: false,
    message: "",
    loca: this.props.loca,
    isMobile: this.props.isMobile,
    isOtpSent:false
  };

  constructor(props) {
    super(props);
    this.sendOTPcallfn = this.sendOTPcallfn.bind(this);
    this.logincall = this.logincall.bind(this);
    this.fieldverify = this.fieldverify.bind(this);
  }

  componentDidMount() { }

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

  fieldverify(e) {
    this.setState({
      page_error: false,
      error: "",
    });
    if (
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e)
    ) {
      this.setState({ email: e });
    } else {
      this.setState({ email: "" });
    }
  }

  sendOTPcallfn() {
    this.setState({
      isOtpSent:true
    });
    var email = this.state.email;
    if (email === "") {
      this.setState({
        page_error: true,
        error: "Please enter your email id",
        isOtpSent:false
      });
    } else {
      let fp = { forget_password: { email: email } };
      console.log(fp);
      axios.post(this.state.loca + "/loom/set/forgetpassword", fp, {}).then(
        (resp) => {
          const fpd = resp.data;
          console.log(fpd);
          if ("Error" in fpd) {
            this.setState({
              page_error: true,
              error: fpd.Error,
              isOtpSent:false
            });
          } else {
            this.setState({
              page_message: true,
              message: fpd.Message,
            });
            let e = fpd.email;
            localStorage.setItem("email", e);
            this.props.showOtpVerification();
          }
        },
        (error) => {
          this.props.showErrorCompo();
          this.setState({
            isOtpSent:false
          });
          console.log(error);
        }
      );
    }
  }

/*   text-align: center;
  margin: auto;
  width: 350px; */

  render() {
    return (
      <div className="container  login_container">
        <div style={{ flexGrow: 1, alignItems: "center", height: "100vh" }} className="d-flex justify-content-center">
          <Card
            className="carrd"
            style={{ background: "grey", borderRadius: "8px" }} //marginTop: "97px",
          >
            <CardHeader style={{ background: "grey" }}>
              <h3>Forgot Password</h3>
            </CardHeader>
            {this.state.page_error === true && (
              <div className="alertgp alert-danger"
                style={{ color: "black" }}>{this.state.error}</div>
            )}
            {this.state.page_message === true && (
              <div className="alertgp alert-success"
                style={{ color: "black"  ,textAlign:"center" ,margin:"auto" ,width:"350px"}}>{this.state.message}</div>
            )}
            <CardBody className="cardchild" style={{ background: "grey" }}>
              <div style={{ textAlign: "center", padding: "15px" }}>
                <i
                  className="fa fa-user"
                  aria-hidden="true"
                  // data-toggle="tooltip"
                  // data-placement="bottom"
                  // title="Profile"
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
                  type="email"
                  name="email"
                  placeholder="Enter Email Id"
                  className="inpp"
                  onChange={(e) => this.fieldverify(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      this.sendOTPcallfn();
                    }
                  }}
                ></input>
              </div>
              <div className="form-group" style={{ marginTop: "22px" }}>
                <input
                  type="button"
                  value="Send OTP"
                  className="btn-hover"
                  onClick={this.sendOTPcallfn}
                  disabled={this.state.isOtpSent}
                   style={{backgroundColor:"#ffc312"}}
                ></input>
              </div>
            </CardBody>

            <CardFooter style={{ background: "grey" }}>
              <div className="d-flex links">
               
                <a href="/#" onClick={this.logincall} style={{ color: "black" }}>
                <i
                  className="fa fa-arrow-left"
                  style={{ color: "black", marginTop: "6px" }}
                ></i> Back
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}

export default ForgetPassword;
