import React, { Component } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import "../css/OtpVerification.css";

class OtpVerification extends Component {
  state = {
    otp: false,
    time: 0,
    first: "",
    second: "",
    third: "",
    fourth: "",
    page_error: false,
    error: "",
    page_message: false,
    message: "",
    minutes: 1,
    seconds: 59,
    loca: this.props.loca,
    isMobile: this.props.isMobile,
    register: localStorage.getItem("register"),
    isResent: false,
    btn_disable: false,
  };

  constructor(props) {
    super(props);
    this.GenerateNewpinfn = this.GenerateNewpinfn.bind(this);
    this.forgetpasscall = this.forgetpasscall.bind(this);
    this.clearinput = this.clearinput.bind(this);
    this.resendOTP = this.resendOTP.bind(this);
    this.timer = this.timer.bind(this);
    this.fieldverify = this.fieldverify.bind(this);
    this.inputRefs = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ];
  }

  componentDidMount() {
    this.timer();
  }

  handleKeyDown = (index, e) => {
    const { key, target } = e;
    console.log(key, target, e.value);
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      // Move focus to the previous input box
      this.inputRefs[index - 1].current.focus();
    } else if (index < this.inputRefs.length - 1 && target.value !== "") {
      // Move focus to the next input box if a value is entered
      this.inputRefs[index + 1].current.focus();
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.isMobile !== state.isMobile) {
      return {
        isMobile: props.isMobile,
      };
    }
    return null;
  }

  componentDidUpdate() {
    this.timer();
    if (this.state.second === 1) {
      this.setState({ page_message: false, message: "" });
    }
  }

  forgetpasscall() {
    this.props.showForgetPassword();
  }

  GenerateNewpinfn() {
    this.setState({btn_disable: true});
    var first = this.state.first;
    var second = this.state.second;
    var third = this.state.third;
    var fourth = this.state.fourth;
    var otp = this.state.otp;

    let o = first + second + third + fourth;
    if (o !== "") {
      let email = localStorage.getItem("email");
      if (email !== "" || email !== null) {
        if (otp === true) {
          if (this.state.register === false) {
            let fp = { forget_password: { email: email, otp: o } };
            axios.post(this.state.loca + "/loom/set/matchOtp", fp, {}).then(
              (resp) => {
                let optresp = resp.data;
                if ("Error" in optresp) {
                  this.setState({
                    page_error: true,
                    error: optresp.Error,
                    page_message: false,
                    message: "",
                    btn_disable: false
                  });
                } else {
                  this.setState({
                    page_message: true,
                    message: optresp.Success,
                    page_error: false,
                    error: "",
                    btn_disable: false,
                  });
                  this.props.showGenerateNewPin();
                }
              },
              (error) => {
                this.props.showErrorCompo();
                console.log(error);
              }
            );
          } else {
            let mobile = localStorage.getItem("mobile");
            let tab_name = localStorage.getItem("tableName");
            let fp = { forget_password: { mobile: mobile, otp: o , table_name: tab_name} };
            axios
              .post(
                this.state.loca + "/loom/set/mobile/matchOtp/external",
                fp,
                {}
              )
              .then((resp) => {
                let optresp = resp.data;
                if ("Error" in optresp) {
                  this.setState({ page_error: true, error: optresp.Error, btn_disable: false });
                } else {
                  this.setState({
                    page_message: true,
                    message: optresp.Success,
                    page_error: false,
                    error: "",
                    btn_disable: false
                  });
                  this.props.showLogin({ state: { registered: true } });
                }
              });
          }
        } else {
          this.setState({
            page_error: true,
            error: "OTP not match.",
          });
        }
      } else {
        this.setState({
          page_error: true,
          error: "Email id not found...",
        });
      }
    } else {
      this.setState({
        page_error: true,
        error: "Enter OTP...",
      });
    }
  }

  resendOTP(otp) {
    if (otp === true) {
      if (this.state.register === false) {
        let email = localStorage.getItem("email");
        let fp = { resend_otp: { email: email } };
        axios.post(this.state.loca + "/loom/set/resend/otp", fp, {}).then(
          (resp) => {
            let optresp = resp.data;
            if ("Error" in optresp) {
              this.setState({
                page_error: true,
                error: optresp.Error,
                page_message: false,
                message: "",
                isResent: false,
              });
            } else {
              this.setState({
                page_message: true,
                message: optresp.Message,
                page_error: false,
                error: "",
                minutes: 1,
                seconds: 59,
                first: "",
                second: "",
                third: "",
                fourth: "",
                isResent: false,
              });
            }
          },
          (error) => {
            this.props.showErrorCompo();
            console.log(error);
          }
        );
      } else {
        let mobile = localStorage.getItem("mobile");
        let tab_name = localStorage.getItem("tableName")
        let fp = { resend_otp: { mobile: mobile, table_name: tab_name }};
        axios
          .post(this.state.loca + "/loom/set/resend/otp/external", fp, {})
          .then(
            (resp) => {
              let optresp = resp.data;
              if ("Error" in optresp) {
                this.setState({
                  page_error: true,
                  error: optresp.Error,
                  page_message: false,
                  message: "",
                  isResent: false,
                });
              } else {
                this.setState({
                  minutes: 1,
                  seconds: 59,
                  first: "",
                  second: "",
                  third: "",
                  fourth: "",
                  page_message: true,
                  message: optresp.Message,
                  page_error: false,
                  error: "",
                  isResent: false,
                });
              }
            },
            (error) => {
              this.props.showErrorCompo();
              console.log(error);
            }
          );
      }
    }
  }

  clearinput(n) {
    console.log("in", n);
    switch (n) {
      case 1:
        this.setState({ first: "" });
        break;
      case 2:
        this.setState({ second: "" });
        break;
      case 3:
        this.setState({ third: "" });
        break;
      case 4:
        this.setState({ fourth: "" });
        break;
      default:
        this.setState({
          page_error: true,
          error: "Error in int",
          page_message: false,
          message: "",
        });
        break;
    }
  }

  fieldverify(e, n) {
    n = n + 1;
    if (/\d/.test(e)) {
      this.setState({
        otp: true,
        page_message: false,
        message: "",
        page_error: false,
        error: "",
      });
      switch (n) {
        case 1:
          this.setState({ first: e });
          /*       if (e.length === 1) {
            document.getElementById("secondinp").focus();
          } */
          break;
        case 2:
          this.setState({ second: e });
          /*      if (e.length === 1) {
            document.getElementById("thirdinp").focus();
          } */
          break;
        case 3:
          this.setState({ third: e });
          /*      if (e.length === 1) {
            document.getElementById("fourthinp").focus();
          } */
          break;
        case 4:
          if (e.length === 1) {
            this.setState({ fourth: e });
          }
          break;
        default:
          this.setState({
            page_error: true,
            error: "Error in int",
            page_message: false,
            message: "",
          });
          break;
      }
      return "verified";
    } else {
      this.setState({ otp: false });
      return "unverified";
    }
  }

  // timer() {
  //   var time = this.state.time;
  //   for (let i = 0; i < 31; i++) {
  //     setTimeout(() => {
  //       this.setTime(time + 1);
  //     }, 1000);
  //   }
  // }

  timer() {
    var min = this.state.minutes;
    var sec = this.state.seconds;
    const interval = setInterval(() => {
      if (sec > 0) {
        clearInterval(interval);
        this.setState({ seconds: sec - 1 });
      }

      if (sec === 0) {
        if (min === 0) {
          clearInterval(interval);
        } else {
          clearInterval(interval);
          this.setState({ seconds: 59, minutes: min - 1 });
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }

  setTime() {
    this.setState({ time: 0 });
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <Card
          className="cardddd  ctd"
          style={{
            background: "grey",
            marginTop: "120px",
            borderRadius: "8px",
          }}
        >
          <CardHeader style={{ background: "grey" }}>
            <h3>OTP Verification</h3>
          </CardHeader>

          <CardBody className="cardchild" style={{ background: "grey" }}>
            {this.state.page_error === true && (
              <div
                className="alertgp alert-danger"
                style={{ color: "black", width: "193px", margin: "auto" }}
              >
                {this.state.error}
              </div>
            )}

            {this.state.page_message === true && (
              <div className="alertgp alert-success" style={{ color: "black" }}>
                {this.state.message}
              </div>
            )}
            <div style={{ textAlign: "center", padding: "15px" }}></div>
            {/*          <div className="lom_td">
              <input
                id="firstinp"
                className="otpinp"
                type="int"
                value={this.state.first}
                onChange={(e) => this.fieldverify(e.target.value, 1)}
                onKeyUp={(e) => {
                  console.log(this.state.first.length , e.key);
                  if (this.state.first.length === 1 && e.key === "Backspace") {
                    this.clearinput(1);
                  }
                }}
              />
              <input
                id="secondinp"
                className="otpinp"
                type="int"
                value={this.state.second}
                maxLength={1}
                onChange={(e) => this.fieldverify(e.target.value, 2)}
                onKeyUp={(e) => {
                  
                  console.log( this.state.second.length , e.key);
                  console.log( this.state.second.length == 1, e.key === "Backspace");
                  if (this.state.second.length && e.key === "Backspace") {
                    console.log(this.state.first.length , e.key);
                    this.clearinput(2);
                  }
                }}
              />
              <input
                id="thirdinp"
                className="otpinp"
                type="int"
                value={this.state.third}
                onChange={(e) => this.fieldverify(e.target.value, 3)}
                onKeyUp={(e) => {
                  if (this.state.third.length === 1 && e.key === "Backspace") {
                    this.clearinput(3);
                  }
                }}
              />
              <input
                id="fourthinp"
                className="otpinp"
                type="int"
                value={this.state.fourth}
                onChange={(e) => this.fieldverify(e.target.value, 4)}
                onKeyUp={(e) => {
                 
                  if (this.state.fourth.length === 1 && e.key === "Backspace") {
                    this.clearinput(4);
                  }
                }}

              />
            </div> */}

{[0, 1, 2, 3].map(index => (
        <input
          key={index}
          type="text"
          maxLength="1"
          onKeyDown={e => this.handleKeyDown(index, e)}
          value={index==0? this.state.first:(index==1?this.state.second:(index==2?this.state.third:this.state.fourth))}
          ref={this.inputRefs[index]}
          style={{ width: '30px', marginRight: '5px' }}
          onChange={(e) => this.fieldverify(e.target.value, index)}
        />
      ))}

            <div className="countdown-text">
              {this.state.seconds > 0 || this.state.minutes > 0 ? (
                <p style={{ color: "white" }}>
                  Time Remaining:{" "}
                  {this.state.minutes < 10
                    ? `0${this.state.minutes}`
                    : this.state.minutes}
                  :
                  {this.state.seconds < 10
                    ? `0${this.state.seconds}`
                    : this.state.seconds}
                </p>
              ) : (
                <p style={{ color: "white" }}>Didn't recieve code?</p>
              )}

              <button
                disabled={
                  this.state.seconds > 0 ||
                  this.state.minutes > 0 ||
                  this.state.isResent
                }
                style={{
                  color:
                    this.state.seconds > 0 || this.state.minutes > 0
                      ? "#000000"
                      : "##606060",
                }}
                onClick={(e) => this.resendOTP(true)}
              >
                Resend OTP
              </button>
            </div>
            {/* <div className="form-group">
              <input
                type="button"
                value="Resend OTP"
                className="btn-hover"
                onClick={(e) => this.resendOTP(true)}
              ></input>
            </div> */}
            <div className="form-group" style={{ marginTop: "22px" }}>
              <input
               disabled={this.state.btn_disable === true}
                type="button"
                value="Verify"
                className="btn-hover"
                onClick={(e) => this.GenerateNewpinfn(e.target.value)}
                style={{ backgroundColor: "#ffc312" }}
              ></input>
            </div>
          </CardBody>

          <CardFooter style={{ background: "grey" }}>
            <div className="d-flex links">
              <a
                href="/#"
                onClick={this.forgetpasscall}
                style={{ color: "black" }}
              >
                <i
                  className="fa fa-arrow-left"
                  style={{ color: "black", marginTop: "6px" }}
                ></i>{" "}
                Back
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default OtpVerification;
