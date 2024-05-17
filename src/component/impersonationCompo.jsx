import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "../css/listcompo.css";
import "../css/formcompo.css";
import ModelList from "./model_list";

class ImpersonationCompo extends Component {
  state = {
    role: "",
    showClientList: false,
    adminPanel: this.props.adminPanel,
    showUserList: false,
    clt_rec: "",
    user_rec: "",
    show: false,
    loca: this.props.loca,
    tabname: "",
    columnid: 0,
    loading: false,
    page_message: false,
    message: "",
    user_record: this.props.user_rcd,
    adminClient_rec: "",
    isAdminClient: true,
    isMobile: this.props.isMobile,
  };

  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.formChangeFunc = this.formChangeFunc.bind(this);
    this.formChangeUserClient = this.formChangeUserClient.bind(this);
    this.changeClientVal = this.changeClientVal.bind(this);
    this.changeUserVal = this.changeUserVal.bind(this);
    this.setImpersonationValue = this.setImpersonationValue.bind(this);
    this.getAdminClient = this.getAdminClient.bind(this);
    this.changeAdminClientVal = this.changeAdminClientVal.bind(this);
    this.setRef = this.setRef.bind(this);
    this.setAdminClientRec = this.setAdminClientRec.bind(this);
  }

  componentDidMount() {
    let rcd = this.state.user_record;
    if (JSON.stringify(rcd) !== "{}") {
      if (this.state.adminPanel && rcd.adminClient.id !== "0") {
        this.setState({ adminClient_rec: rcd.adminClient.value });
        if (rcd.admin === "true") {
          this.setState({ role: "admin" });
        } else if (
          rcd.admin === "false" &&
          rcd.user === "false" &&
          rcd.client.id !== "0"
        ) {
          this.setState({
            role: "client",
            showClientList: true,
            showUserList: false,
            clt_rec: rcd.client.value,
          });
        } else if (
          rcd.admin === "false" &&
          rcd.user === "true" &&
          rcd.impersonateUser.id !== "0" &&
          rcd.client.id !== "0"
        ) {
          this.setState({
            role: "user",
            showClientList: false,
            showUserList: true,
            user_rec: rcd.impersonateUser.value,
          });
        }
      }
    }
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  changeRole(e) {
    if (e.target.value === "client") {
      this.setState({
        showClientList: true,
        showUserList: false,
        tabname: "client",
        role: e.target.value,
      });
    } else if (e.target.value === "user") {
      this.setState({
        showClientList: false,
        showUserList: true,
        tabname: "local_user",
        role: e.target.value,
      });
    } else {
      this.setState({
        showClientList: false,
        showUserList: false,
        role: e.target.value,
      });
      this.setImpersonationValue(e.target.value, "", "");
    }
  }

  changeClientVal(val) {
    this.setState({ clt_rec: val });
    this.setImpersonationValue("client", val, "");
  }

  changeUserVal(val) {
    this.setState({ user_rec: val });
    this.setImpersonationValue("user", "", val);
  }

  changeAdminClientVal(val) {
    this.setState({ adminClient_rec: val });
    this.setAdminClientRec(val);
  }

  getAdminClient() {
    this.handleShow();
    this.setState({ tabname: "client" });
  }

  setRef(val, ref_id) {
    if (this.state.role === "client") {
      this.changeClientVal(val);
    } else if (this.state.role === "user") {
      this.changeUserVal(val);
    } else if (this.state.isAdminClient) {
      this.changeAdminClientVal(val);
    }
    this.handleClose();
  }

  setAdminClientRec(val) {
    var token = localStorage.getItem("token");
    var json = {
      admin_cltVal: val,
    };
    axios
      .post(this.state.loca + "/loom/set/adminclient/impersonation", json, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          const impt_record = resp.data;
          if (impt_record !== "") {
            var msg = impt_record.Message;
            if (msg !== "") {
              this.setState({ page_message: true, message: msg });
            }
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  setImpersonationValue(s_role, s_client, s_user) {
    var token = localStorage.getItem("token");
    var json = {
      role: s_role,
      clientVal: s_client,
      userVal: s_user,
    };
    axios
      .post(this.state.loca + "/loom/set/impersonation/value", json, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          const impt_record = resp.data;
          if (impt_record !== "") {
            console.log(impt_record);
            var msg = impt_record.Message;
            var reload = impt_record.reload;
            if (msg !== "") {
              this.setState({ page_message: true, message: msg });
              if (reload === "true") {
                this.props.setImp(reload);
              }
            }
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  formChangeFunc(e) {
    this.setState({ adminClient_rec: e.target.value });
    this.setAdminClientRec(e.target.value);
  }

  formChangeUserClient(e) {
    if (this.state.adminPanel) {
      if (this.state.role === "client") {
        this.setState({ clt_rec: e.target.value });
        this.setImpersonationValue("client", "", e.target.value);
      } else if (this.state.role === "user") {
        this.setState({ user_rec: e.target.value });
        this.setImpersonationValue("user", "", e.target.value);
      }
    }
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }} className="usernoti_outerline">
        {!(this.state.isMobile) ? (
          <div>
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
            {this.state.adminPanel === true && (
              <div className="row">
                <div className=" act_as col-md-1">Act as:</div>
                <select
                  className="form-select prefinputlis"
                  aria-label="Default"
                  value={this.state.role}
                  onChange={(e) => this.changeRole(e)}
                >
                  <option value="admin">Admin</option>
                  <option value="client">Client</option>
                  <option value="user">User</option>
                </select>
              </div>
            )}
            {this.state.showClientList === true && (
              <div>
                <span className="clt">Client:</span>
                <input
                  className="act-client client_search form-control"
                  type="text"
                  aria-label="Default"
                  value={this.state.clt_rec}
                  onChange={(e) => this.formChangeUserClient(e)}
                ></input>
                <i
                  className="fa fa-search vlpointer mtr_clt_ref"
                  onClick={(e) => this.handleShow()}
                ></i>
              </div>
            )}
            {this.state.showUserList === true && (
              <div>
                <span className="user">User:</span>
                <input
                  className="act-client client_search form-control"
                  type="text"
                  aria-label="Default"
                  value={this.state.user_rec}
                  onChange={(e) => this.formChangeUserClient(e)}
                ></input>
                <i
                  className="fa fa-search vlpointer mtr_clt_ref"
                  onClick={(e) => this.handleShow()}
                ></i>
              </div>
            )}

            <span>
              <span className="clt">Follow Client:</span>
              <input
                className="act-client client_search form-control"
                type="text"
                aria-label="Default"
                value={this.state.adminClient_rec}
                onChange={(e) => this.formChangeFunc(e)}
              ></input>
              <i
                className="fa fa-search vlpointer mtr_clt_ref"
                onClick={(e) => this.getAdminClient()}
              ></i>
            </span>
          </div>
        ) : (
          <div>
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
            {this.state.adminPanel === true && (
              <div className="row">
                <span>Act as:</span>
                <select
                  className="form-select prefinputlis"
                  aria-label="Default"
                  value={this.state.role}
                  onChange={(e) => this.changeRole(e)}
                >
                  <option value="admin">Admin</option>
                  <option value="client">Client</option>
                  <option value="user">User</option>
                </select>
              </div>
            )}
            {this.state.showClientList === true && (
              <div>
              <div className="row">
                <span >Client:</span>
                <input
                  className="mtr_client_search_mob form-control"
                  type="text"
                  aria-label="Default"
                  value={this.state.clt_rec}
                  onChange={(e) => this.formChangeUserClient(e)}
                ></input>
  </div>
                <i
                  className="fa fa-search mtr_clt_ref"
                  onClick={(e) => this.handleShow()}
                ></i>
                </div>
            )}
            {this.state.showUserList === true && (
              <div>
                <span>User:</span>
                <input
                  className="mtr_client_search_mob form-control"
                  type="text"
                  aria-label="Default"
                  value={this.state.user_rec}
                  onChange={(e) => this.formChangeUserClient(e)}
                ></input>
                <i
                  className="fa fa-search mtr_clt_ref"
                  onClick={(e) => this.handleShow()}
                ></i>
              </div>
            )}

            <div> 
              <span>Follow Client:</span>
              <input
                className="mtr_client_search_mob form-control"
                type="text"
                aria-label="Default"
                value={this.state.adminClient_rec}
                onChange={(e) => this.formChangeFunc(e)}
              ></input>
              <i
                className="fa fa-search mtr_clt_ref"
                aria-hidden="true"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={(e) => this.getAdminClient()}
              ></i>
            </div>
          </div>
        )}

        <Modal
          dialogClassName="my-modal"
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModelList
              setRef={(val, r_id) => this.setRef(val, r_id)}
              loca={this.state.loca}
              colBoolean={false}
              tabname={this.state.tabname}
              isMobile={this.state.isMobile}
            ></ModelList>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ImpersonationCompo;
