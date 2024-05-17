import React, { Component } from "react";
import "../css/otpVerify.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class OTPVerify extends Component {
  state = {
    first: "",
    second: "",
    third: "",
    fourth: "",
    page_message: false,
    message: "",
    page_error: false,
    error: "",
    minutes: 1,
    seconds: 59,
    record: this.props.record,
    verified: this.props.verified,
    time: 0,
    loca:this.props.loca,
    IsResent:false
  };

  constructor(props) {
    super(props);
    this.verifyOTPAndChangeClient = this.verifyOTPAndChangeClient.bind(this);
    this.resendOTP = this.resendOTP.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate(props) {
    this.timer();
  }

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

  verifyOTPAndChangeClient() {
    var first = this.state.first;
    var second = this.state.second;
    var third = this.state.third;
    var fourth = this.state.fourth;

    let xx = first + second + third + fourth;
    var token = localStorage.getItem("token");
    let jj = { json: { record: this.state.record, otp: xx } };
    console.log("json: ", jj);
    axios
      .post(this.state.loca + "/loom/get/verifyotp/changeclient", jj, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        const rcd = resp.data;
        if (rcd !== "") {
          if ("Error" in rcd) {
            toast(rcd.Error, {
              position: "top-center",
              theme: "colored",
              type: "error",
            });
          } else {
            // this.setState({ loading: false, showVerifyOtp: false });
            var msg = rcd.Message;
            if (msg !== "") {
              toast(msg, {
                position: "top-center",
                theme: "colored",
                type: "success",
              });
            }
          }
        }
      });
  }

  resendOTP(otp) {
    if (otp === true) {
    var token = localStorage.getItem("token");
    // let jj = { json: { record: this.state.record } };
    // console.log("json: ", jj);
    this.setState({IsResent:true})
    axios
      .post(this.state.loca + "/loom/get/reset/client/sendOtp", this.state.record, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        const rcd = resp.data;
        if (rcd !== "") {
          if ("Error" in rcd) {
            toast(rcd.Error, {
              position: "top-center",
              theme: "colored",
              type: "error",
              
            });
            this.setState({IsResent:false})
          } else {
            this.setState({ minutes: 1,
              seconds: 59,
              first: "",
              second: "",
              third: "",
              fourth: "" })
            var msg = rcd.result;
            if (msg !== "") {
              toast(msg, {
                position: "top-center",
                theme: "colored",
                type: "success",
              });
            }
            this.setState({IsResent:true})
          }
        }
      }).catch(()=>{

      })
    }
  }

  clearinput(n) {
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
    if (/\d/.test(e)) {
      //   this.setState({ otp: true, page_message: false, message: "", page_error: false, error: "" });
      switch (n) {
        case 1:
          this.setState({ first: e });
          if (e.length === 1) {
            document.getElementById("secondinp").focus();
          }
          break;
        case 2:
          this.setState({ second: e });
          if (e.length === 1) {
            document.getElementById("thirdinp").focus();
          }
          break;
        case 3:
          this.setState({ third: e });
          if (e.length === 1) {
            document.getElementById("fourthinp").focus();
          }
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

  render() {
    return (
      <div>
        <div className="">
          <input
            id="firstinp"
            className="otp_inp"
            type="int"
            value={this.state.first}
            onChange={(e) => this.fieldverify(e.target.value, 1)}
            onKeyUp={(e) => {
              if (this.state.first.length === 1 && e.key === "Backspace") {
                this.clearinput(1);
              }
            }}
          />
          <input
            id="secondinp"
            className="otp_inp"
            type="int"
            value={this.state.second}
            maxLength={1}
            onChange={(e) => this.fieldverify(e.target.value, 2)}
            onKeyUp={(e) => {
              if (this.state.second.length === 1 && e.key === "Backspace") {
                this.clearinput(2);
              }
            }}
          />
          <input
            id="thirdinp"
            className="otp_inp"
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
            className="otp_inp"
            type="int"
            value={this.state.fourth}
            onChange={(e) => this.fieldverify(e.target.value, 4)}
            onKeyUp={(e) => {
              if (this.state.fourth.length === 1 && e.key === "Backspace") {
                this.clearinput(4);
              }
            }}
          />
        </div>
        <div className="countdown-text">
          {this.state.seconds > 0 || this.state.minutes > 0 ? (
            <p style={{ color: "black" }}>
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
            <p style={{ color: "black" }}>Didn't recieve code?</p>
          )}

          <button
            disabled={(this.state.seconds > 0 || this.state.minutes > 0) || (this.state.IsResent)}
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
          <button  onClick={this.verifyOTPAndChangeClient}>
            Verify OTP
          </button>
        </div>
      </div>
    );
  }
}

export default OTPVerify;
