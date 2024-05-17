import React, { Component } from 'react'
import axios from "axios";
import WorkInProgress from "./work_in_progress";
// import "../css/.css";
import "../css/initialCSS.css";

class InitialSetupComponent extends React.Component {
  state = {
    initButton: false,
    initButton1: false,
    initButton2: false,
    initButton3: false,
    initButton4: false,
    initButton5: false,
    initButton6: false,
    initButton7: false,
    initRecordButton: false,
    isProcessing: [
      { state: "false" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
    ],
    disableArr: [
      { state: "true" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
      { state: "false" },
    ],
    showProgressBar: false,
    now: 0,
    loading: false,
    loca: this.props.loca,
  }

  constructor(props) {
    super(props);
    this.initialdisplaynull = this.initialdisplaynull.bind(this);
    this.initialsetupcallapi1 = this.initialsetupcallapi1.bind(this);
    this.initialsetupcallapi2 = this.initialsetupcallapi2.bind(this);
    this.initialsetupcallapi3 = this.initialsetupcallapi3.bind(this);
    this.initialsetupcallapi4 = this.initialsetupcallapi4.bind(this);
    this.initialsetupcallapi5 = this.initialsetupcallapi5.bind(this);
    this.initialsetupcallapi6 = this.initialsetupcallapi6.bind(this);
    this.initialsetupcallapi7 = this.initialsetupcallapi7.bind(this);
    this.setupRecordcallapi = this.setupRecordcallapi.bind(this);
  }

  componentDidMount() {
  }

  initialdisplaynull() {
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/initialsetup/delete", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const modul = res.data;
        }
      });
  };

  initialsetupcallapi() {
    var token = localStorage.getItem("token");
    let proArr = this.state.isProcessing;
    proArr[0].state = "true";
    this.setState({ isProcessing: [...proArr] });
    this.setState({ loading: true })
    this.setState({ now: 0 });
    axios
      .get(this.state.loca + "/loom/initialsetup", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          proArr[0].state = "false";
          this.setState({ isProcessing: [...proArr] });
          let arr = this.state.disableArr;
          arr[0].state = "success";
          arr[1].state = "true";
          this.setState({
            disableArr: arr,
            initButton: true,
            now: 100,
            loading: false,
          });
          this.initialsetupcallapi1();
        }
      });
  };

  initialsetupcallapi1() {
    var token = localStorage.getItem("token");
    let proArr = this.state.isProcessing;
    proArr[1].state = "true";
    this.setState({ isProcessing: [...proArr] });
    this.setState({ loading: true })
    this.setState({ now: 0 });
    axios
      .get(this.state.loca + "/loom/initialsetup/1", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          proArr[1].state = "false";
          this.setState({ isProcessing: [...proArr] });
          let arr = this.state.disableArr;
          arr[1].state = "success";
          arr[2].state = "true";

          this.setState({
            disableArr: arr,
            initButton1: true,
            now: 100,
            loading: false,
          });
          this.initialsetupcallapi2();
        }
      });
  };

  initialsetupcallapi2() {
    var token = localStorage.getItem("token");
    let proArr = this.state.isProcessing;
    proArr[2].state = "true";
    this.setState({ isProcessing: [...proArr] });
    this.setState({ loading: true })
    this.setState({ now: 0 });
    axios
      .get(this.state.loca + "/loom/initialsetup/2", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          proArr[2].state = "false";
          this.setState({ isProcessing: [...proArr] });
          let arr = this.state.disableArr;
          arr[2].state = "success";
          arr[3].state = "true";
          this.setState({
            disableArr: arr,
            initButton2: true,
            now: 100,
            loading: false,
          });
          this.initialsetupcallapi3();
        }
      });
  };

  initialsetupcallapi3() {
    var token = localStorage.getItem("token");
    let proArr = this.state.isProcessing;
    proArr[3].state = "true";
    this.setState({ isProcessing: [...proArr] });
    this.setState({ loading: true })
    this.setState({ now: 0 });
    axios
      .get(this.state.loca + "/loom/initialsetup/3", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          proArr[3].state = "false";
          this.setState({ isProcessing: [...proArr] });
          let arr = this.state.disableArr;
          arr[3].state = "success";
          arr[4].state = "true";

          this.setState({
            disableArr: arr,
            initButton3: true,
            now: 100,
            loading: false,
          });
          this.initialsetupcallapi4();
        }
      });
  };

  initialsetupcallapi4() {
    var token = localStorage.getItem("token");
    let proArr = this.state.isProcessing;
    proArr[4].state = "true";
    this.setState({ isProcessing: [...proArr] });
    this.setState({ loading: true })
    this.setState({ now: 0 });
    axios
      .get(this.state.loca + "/loom/initialsetup/4", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          proArr[4].state = "false";
          this.setState({ isProcessing: [...proArr] });
          let arr = this.state.disableArr;
          arr[4].state = "success";
          arr[5].state = "true";
          this.setState({
            disableArr: arr,
            initButton4: true,
            now: 100,
            loading: false,
          });
          this.initialsetupcallapi5();
        }
      });
  };

  initialsetupcallapi5() {
    var token = localStorage.getItem("token");
    let proArr = this.state.isProcessing;
    proArr[5].state = "true";
    this.setState({ isProcessing: [...proArr] });
    this.setState({ loading: true })
    this.setState({ now: 0 });
    axios
      .get(this.state.loca + "/loom/initialsetup/5", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          proArr[5].state = "false";
          this.setState({ isProcessing: [...proArr] });
          let arr = this.state.disableArr;
          arr[5].state = "success";
          arr[6].state = "true";
          this.setState({
            disableArr: arr,
            initButton5: true,
            now: 100,
            loading: false,
          });
          this.initialsetupcallapi6();
        }
      });
  };

  initialsetupcallapi6() {
    var token = localStorage.getItem("token");
    let proArr = this.state.isProcessing;
    proArr[6].state = "true";
    this.setState({ isProcessing: [...proArr] });
    this.setState({ loading: true })
    this.setState({ now: 0 });
    axios
      .get(this.state.loca + "/loom/initialsetup/6", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          proArr[6].state = "false";
          this.setState({ isProcessing: [...proArr] });
          let arr = this.state.disableArr;
          arr[6].state = "success";
          arr[7].state = "true";
          this.setState({
            disableArr: arr,
            initButton6: true,
            now: 100,
            loading: false,
          });
          this.initialsetupcallapi7();
        }
      });
  };

  initialsetupcallapi7() {
    var token = localStorage.getItem("token");
    let proArr = this.state.isProcessing;
    proArr[7].state = "true";
    this.setState({ isProcessing: [...proArr] });
    this.setState({ loading: true })
    this.setState({ now: 0 });
    axios
      .get(this.state.loca + "/loom/initialsetup/7", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          proArr[7].state = "false";
          this.setState({ isProcessing: [...proArr] });
          let arr = this.state.disableArr;
          arr[7].state = "success";
          arr[8].state = "true";
          this.setState({
            disableArr: arr,
            initButton7: true,
            now: 100,
            loading: false,
          });
          this.setupRecordcallapi();
        }
      });
  };

  setupRecordcallapi() {
    var token = localStorage.getItem("token");
    let proArr = this.state.isProcessing;
    proArr[8].state = "true";
    this.setState({ isProcessing: [...proArr] });
    this.setState({ loading: true })
    this.setState({ now: 0 });
    axios
      .get(this.state.loca + "/loom/dummyinsert2", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          proArr[8].state = "false";
          this.setState({ isProcessing: [...proArr] });
          let arr = this.state.disableArr;
          arr[8].state = "success";
          this.setState({
            disableArr: arr,
            initRecordButton: true,
            now: 100,
            loading: false,
          });
          this.initialdisplaynull();
          window.location.reload(true);
        }
      });
  };

  render() {
    return (
      <div className="container text-center">
        <div className="alert alert-warning mt-2">Do not refresh this page!</div>
        {this.state.loading === true ? <WorkInProgress /> : ""}
        <div className="row row-cols-4 justify-content-center  mt-5">
          <div className="col-sm-2">
            <button
              type="button"
              onClick={() => this.initialsetupcallapi()}
              disabled={
                this.state.disableArr[0].state === "false" ||
                this.state.disableArr[0].state === "success" || this.state.isProcessing[0].state === "true"
              }
              className={
                this.state.disableArr[0].state === "success"
                  ? " btnnn btn btn-success"
                  : " btnnn btn btn-primary"
              }
            >
              {this.state.isProcessing[0].state === "true" ? (
                <span>
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </span>
              ) : (
                "Initial Setup 1"
              )}
            </button>
          </div>
        </div>
        <div className="row row-cols-4 justify-content-center  mt-5">
          <div className="col-sm-2">
            <button
              type="button"
              onClick={() => this.initialsetupcallapi1()}
              disabled={
                this.state.disableArr[1].state === "false" ||
                this.state.disableArr[1].state === "success" || this.state.isProcessing[1].state === "true"
              }
              className={
                this.state.disableArr[1].state === "success"
                  ? " btnnn btn btn-success"
                  : " btnnn btn btn-primary"
              }
            >
              {this.state.isProcessing[1].state === "true" ? (
                <span>
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </span>
              ) : (
                "Initial Setup 2"
              )}
            </button>
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              onClick={() => this.initialsetupcallapi2()}
              disabled={
                this.state.disableArr[2].state === "false" ||
                this.state.disableArr[2].state === "success" || this.state.isProcessing[2].state === "true"
              }
              className={
                this.state.disableArr[2].state === "success"
                  ? " btnnn btn btn-success"
                  : " btnnn btn btn-primary"
              }
            >
              {this.state.isProcessing[2].state === "true" ? (
                <span>
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </span>
              ) : (
                "Initial Setup 3"
              )}
            </button>
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              onClick={() => this.initialsetupcallapi3()}
              disabled={
                this.state.disableArr[3].state === "false" ||
                this.state.disableArr[3].state === "success" || this.state.isProcessing[3].state === "true"
              }
              className={
                this.state.disableArr[3].state === "success"
                  ? " btnnn btn btn-success"
                  : " btnnn btn btn-primary"
              }
            >
              {this.state.isProcessing[3].state === "true" ? (
                <span>
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </span>
              ) : (
                "Initial Setup 4"
              )}
            </button>
          </div>
        </div>
        <div className="row row-cols-4 justify-content-center mt-5">
          <div className="col-sm-2">
            <button
              type="button"
              onClick={() => this.initialsetupcallapi4()}
              disabled={
                this.state.disableArr[4].state === "false" ||
                this.state.disableArr[4].state === "success" || this.state.isProcessing[4].state === "true"
              }
              className={
                this.state.disableArr[4].state === "success"
                  ? " btnnn btn btn-success"
                  : " btnnn btn btn-primary"
              }
            >
              {this.state.isProcessing[4].state === "true" ? (
                <span>
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </span>
              ) : (
                "Initial Setup 5"
              )}
            </button>
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              onClick={() => this.initialsetupcallapi5()}
              disabled={
                this.state.disableArr[5].state === "false" ||
                this.state.disableArr[5].state === "success" || this.state.isProcessing[5].state === "true"
              }
              className={
                this.state.disableArr[5].state === "success"
                  ? " btnnn btn btn-success"
                  : " btnnn btn btn-primary"
              }
            >
              {this.state.isProcessing[5].state === "true" ? (
                <span>
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </span>
              ) : (
                "Initial Setup 6"
              )}
            </button>
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              onClick={() => this.initialsetupcallapi6()}
              disabled={
                this.state.disableArr[6].state === "false" ||
                this.state.disableArr[6].state === "success" || this.state.isProcessing[6].state === "true"
              }
              className={
                this.state.disableArr[6].state === "success"
                  ? " btnnn btn btn-success"
                  : " btnnn btn btn-primary"
              }
            >
              {this.state.isProcessing[6].state === "true" ? (
                <span>
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </span>
              ) : (
                "Initial Setup 7"
              )}
            </button>
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              onClick={() => this.initialsetupcallapi7()}
              disabled={
                this.state.disableArr[7].state === "false" ||
                this.state.disableArr[7].state === "success" || this.state.isProcessing[7].state === "true"
              }
              className={
                this.state.disableArr[7].state === "success"
                  ? " btnnn btn btn-success"
                  : " btnnn btn btn-primary"
              }
            >
              {this.state.isProcessing[7].state === "true" ? (
                <span>
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </span>
              ) : (
                "Initial Setup 8"
              )}
            </button>
          </div>
        </div>
        <div className="row row-cols-4 justify-content-center mt-5">
          <div className="col-sm-2">
            <button
              type="button"
              onClick={() => this.setupRecordcallapi()}
              disabled={
                this.state.disableArr[8].state === "false" ||
                this.state.disableArr[8].state === "success" || this.state.isProcessing[8].state === "true"
              }
              className={
                this.state.disableArr[8].state === "success"
                  ? " btnnn btn btn-success "
                  : " btnnn btn btn-primary "
              }
            >
              {this.state.isProcessing[8].state === "true" ? (
                <span>
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </span>
              ) : (
                "Setup Record"
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default InitialSetupComponent;
