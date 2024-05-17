import React, { Component } from "react";
import axios from "axios";
import ModelList from "./model_list";
import { Modal, Button } from "react-bootstrap";
import "../css/materialcompo.css";
import "../css/formcompo.css";

class MaterialComponent extends Component {
  state = {
    loca: this.props.loca,
    isMobile: this.props.isMobile,
    laoding: false,
    page_error: false,
    error: "",
    page_message: false,
    message: "",
    show: false,
    setWorkshop: { id: "", value: "" },
    setInventory: { id: "", value: "" },
    setItem: { id: "", value: "" },
    setLoom: { id: "", value: "" },
    setOut: { id: "", value: "" },
    tabname: "",
    filtarray: [],
    fieldError: false,
  };

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.formChangeFn = this.formChangeFn.bind(this);
    this.setRef = this.setRef.bind(this);
    this.submitFn = this.submitFn.bind(this);
    this.checkBlankFieldVal = this.checkBlankFieldVal.bind(this);
  }

  componentDidMount() { }

  componentDidUpdate(props) { }

  handleShow(tab) {
    console.log(tab);
    let flt = this.state.filtarray;
    if (flt.length > 0) {
      flt = [];
    }
    if (tab === "loom") {
      if (this.state.setWorkshop.value !== "") {
        let ff = {
          co: "workshop_id",
          cl: "Workshop",
          mc: "=",
          an: "",
          ct: "reference",
          af: "",
          rf: {
            id: this.state.setWorkshop.id,
            value: this.state.setWorkshop.value,
          },
          dc: { id: "", value: "" },
        };
        flt.push(ff);
      } else {
        let ff = {
          co: "workshop_id",
          cl: "Workshop",
          mc: "=",
          an: "",
          ct: "reference",
          af: "",
          rf: {
            id: "0",
            value: "",
          },
          dc: { id: "", value: "" },
        };
        flt.push(ff);
      }
    } else if (tab === "inventory") {
      let xx = {
        co: "state",
        cl: "State",
        mc: "=",
        an: "New",
        ct: "choice",
        af: "AND",
        rf: { id: "", value: "" },
        dc: { id: "", value: "" },
      };
      if (this.state.setWorkshop.value !== "" && this.state.setItem.value !== "") {
        let wrk = {
          co: "workshop_id",
          cl: "Workshop",
          mc: "=",
          an: "",
          ct: "reference",
          af: "",
          rf: {
            id: this.state.setWorkshop.id,
            value: this.state.setWorkshop.value,
          },
          dc: { id: "", value: "" },
        };
        let itm = {
          co: "item_id",
          cl: "Item",
          mc: "=",
          an: "",
          ct: "reference",
          af: "AND",
          rf: { id: this.state.setItem.id, value: this.state.setItem.value },
          dc: { id: "", value: "" },
        };
        flt.push(wrk);
        flt.push(itm);
        flt.push(xx);
      } else if (this.state.setWorkshop.value !== "" && this.state.setItem.value === "") {
        let wrk = {
          co: "workshop_id",
          cl: "Workshop",
          mc: "=",
          an: "",
          ct: "reference",
          af: "",
          rf: {
            id: this.state.setWorkshop.id,
            value: this.state.setWorkshop.value,
          },
          dc: { id: "", value: "" },
        };
        let itm = {
          co: "item_id",
          cl: "Item",
          mc: "=",
          an: "",
          ct: "reference",
          af: "AND",
          rf: { id: "0", value: "" },
          dc: { id: "", value: "" },
        };
        flt.push(wrk);
        flt.push(itm);
        flt.push(xx);
      } else if (this.state.setWorkshop.value === "" && this.state.setItem.value !== "") {
        let wrk = {
          co: "workshop_id",
          cl: "Workshop",
          mc: "=",
          an: "",
          ct: "reference",
          af: "",
          rf: {
            id: "0",
            value: "",
          },
          dc: { id: "", value: "" },
        };
        let itm = {
          co: "item_id",
          cl: "Item",
          mc: "=",
          an: "",
          ct: "reference",
          af: "AND",
          rf: { id: this.state.setItem.id, value: this.state.setItem.value },
          dc: { id: "", value: "" },
        };
        flt.push(wrk);
        flt.push(itm);
        flt.push(xx);
      } else {
        let wrk = {
          co: "workshop_id",
          cl: "Workshop",
          mc: "=",
          an: "",
          ct: "reference",
          af: "",
          rf: {
            id: "0",
            value: "",
          },
          dc: { id: "", value: "" },
        };
        let itm = {
          co: "item_id",
          cl: "Item",
          mc: "=",
          an: "",
          ct: "reference",
          af: "AND",
          rf: { id: "0", value: "" },
          dc: { id: "", value: "" },
        };
        flt.push(wrk);
        flt.push(itm);
        flt.push(xx);
      }

    } else if (tab === "material_in_use") {
      if (this.state.setLoom.value !== "") {
        let ff = {
          co: "loom_id",
          cl: "Loom",
          mc: "=",
          an: "",
          ct: "reference",
          af: "",
          rf: { id: this.state.setLoom.id, value: this.state.setLoom.value },
          dc: { id: "", value: "" },
        };
        let tt = {
          co: "active",
          cl: "Active",
          mc: "=",
          an: "true",
          ct: "boolean",
          af: "AND",
          rf: { id: "", value: "" },
          dc: { id: "", value: "" },
        };
        flt.push(ff);
        flt.push(tt);
      } else {
        let ff = {
          co: "loom_id",
          cl: "Loom",
          mc: "=",
          an: "",
          ct: "reference",
          af: "",
          rf: { id: "0", value: "" },
          dc: { id: "", value: "" },
        };
        let tt = {
          co: "active",
          cl: "Active",
          mc: "=",
          an: "true",
          ct: "boolean",
          af: "AND",
          rf: { id: "", value: "" },
          dc: { id: "", value: "" },
        };
        flt.push(ff);
        flt.push(tt);
      }
    }
    this.setState({ show: true, tabname: tab, filtarray: flt });
  }


  handleClose() {
    this.setState({ show: false });
  }

  formChangeFn(e, tab) {
    console.log(this.state.tabname, "tabname");
    this.setState({ fieldError: false });
    if (tab === "workshop") {
      let xx = this.state.setWorkshop;
      xx.value = e;
      xx.id = "";
      this.setState({ setWorkshop: xx });
    } else if (tab === "inventory") {
      let xx = this.state.setInventory;
      xx.value = e;
      xx.id = "";
      this.setState({ setInventory: xx });
    } else if (tab === "item") {
      let xx = this.state.setItem;
      xx.value = e;
      xx.id = "";
      this.setState({ setItem: xx });
    } else if (tab === "loom") {
      let xx = this.state.setLoom;
      xx.value = e;
      xx.id = "";
      this.setState({ setLoom: xx });
    } else if (tab === "material_in_use") {
      let xx = this.state.setOut;
      xx.value = e;
      xx.id = "";
      this.setState({ setOut: xx });
    }
  }

  setRef(val, ref_id) {
    console.log(this.state.tabname, "tabname");
    if (this.state.tabname === "workshop") {
      let xx = this.state.setWorkshop;
      xx.value = val;
      xx.id = ref_id;
      this.setState({ setWorkshop: xx, fieldError: false });
    } else if (this.state.tabname === "inventory") {
      let xx = this.state.setInventory;
      xx.value = val;
      xx.id = ref_id;
      this.setState({ setInventory: xx, fieldError: false });
    } else if (this.state.tabname === "loom") {
      let xx = this.state.setLoom;
      xx.value = val;
      xx.id = ref_id;
      this.setState({ setLoom: xx, fieldError: false });
    } else if (this.state.tabname === "item") {
      let xx = this.state.setItem;
      xx.value = val;
      xx.id = ref_id;
      this.setState({ setItem: xx, fieldError: false });
    } else if (this.state.tabname === "material_in_use") {
      let xx = this.state.setOut;
      xx.value = val;
      xx.id = ref_id;
      this.setState({ setOut: xx, fieldError: false });
    }
    this.handleClose();
  }

  // setRef(val, ref_id) {
  //   console.log(this.state.tabname, "tabname");
  //   const stateMap = {
  //     workshop: 'setWorkshop',
  //     inventory: 'setInventory',
  //     loom: 'setLoom',
  //     item: 'setItem',
  //     material_in_use: 'setOut'
  //   };

  //   const tabname = this.state.tabname;
  //   const stateVariable = stateMap[tabname];
  //   if (stateVariable) {
  //     let xx = this.state[stateVariable];
  //     xx.value = val;
  //     xx.id = ref_id;
  //     const newState = { [stateVariable]: xx, fieldError: false };
  //     this.setState(newState);
  //   }
  //   this.handleClose();
  // }


  submitFn() {
    this.setState({ loading: true });
    let body = {
      records: [
        {
          workshop: this.state.setWorkshop,
          inventory: this.state.setInventory,
          item: this.state.setItem,
          loom: this.state.setLoom,
          outItem: this.state.setOut,
        },
      ],
    };
    var token = localStorage.getItem("token");
    axios
      .post(this.state.loca + "/loom/set/material/records", body, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          let res = resp.data;
          if (res !== "") {
            if ("Error" in res) {
              this.setState({
                loading: false,
                page_error: true,
                error: res.Error,
              });
            } else {
              this.setState({
                loading: false,
                page_message: true,
                message: res.Message,
              });
            }
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  checkBlankFieldVal() {
    let wks = this.state.setWorkshop.value;
    let loom = this.state.setLoom.value;
    let item = this.state.setItem.value;
    let inv = this.state.setInventory.value;
    let out = this.state.setOut.value;
    if (wks === "" || loom === "" || item === "" || inv === "" || out === "") {
      this.setState({ fieldError: true });
    } else {
      if (
        wks !== "" &&
        loom !== "" &&
        item !== "" &&
        inv !== "" &&
        out !== ""
      ) {
        this.submitFn();
      }
    }
  }

  render() {
    return (
      <div className="container pagesetup mt-5">
        {!(this.state.isMobile) ? (
          <div className=" maincompo2">
            <div className="tab_head mtr_tab">{"Set Material Records"}</div>
            <div className="mtr_bdr">
              {this.state.page_error === true && (
                <div className="alert alert-danger form_alt" role="alert">
                  {this.state.error}
                </div>
              )}
              {this.state.page_message === true && (
                <div className="alert alert-success form_alt" role="alert">
                  {this.state.message}
                </div>
              )}
              {this.state.fieldError === true && (
                <div className="alert alert-danger form_alt" role="alert">
                  {"Please fill mark in red"}
                </div>
              )}
              <div className="row">
                <div className="col-md-6">
                  <span className="clt">Workshop</span>
                  <input
                    className={
                      this.state.fieldError === true &&
                        this.state.setWorkshop.value === ""
                        ? "mtr_client_search form-control mtr_unverifi"
                        : "mtr_client_search form-control"
                    }
                    type="text"
                    aria-label="Default"
                    value={this.state.setWorkshop.value}
                    onChange={(e) =>
                      this.formChangeFn(e.target.value, "workshop")
                    }
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    onClick={(e) => this.handleShow("workshop")}
                  ></i>
                </div>
                <div className="col-md-6">
                  <span className="clt">Loom</span>
                  <input
                  style={{marginLeft:"2.5rem"}}
                    className={
                      this.state.fieldError === true &&
                        this.state.setLoom.value === ""
                        ? "mtr_client_search form-control mtr_unverifi"
                        : "mtr_client_search form-control"
                    }
                    type="text"
                    aria-label="Default"
                    value={this.state.setLoom.value}
                    onChange={(e) => this.formChangeFn(e.target.value, "loom")}
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    onClick={(e) => this.handleShow("loom")}
                  ></i>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <span className="clt">Item</span>
                  <input
                  style={{marginLeft:"3.2rem"}}
                    className={
                      this.state.fieldError === true &&
                        this.state.setItem.value === ""
                        ? "mtr_client_search form-control mtr_unverifi"
                        : "mtr_client_search form-control"
                    }
                    type="text"
                    aria-label="Default"
                    value={this.state.setItem.value}
                    onChange={(e) => this.formChangeFn(e.target.value, "item")}
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    onClick={(e) => this.handleShow("item")}
                  ></i>
                </div>
                <div className="col-md-6">
                  <span className="clt">Inventory</span>
                  <input
                    className={
                      this.state.fieldError === true &&
                        this.state.setItem.value === ""
                        ? "mtr_client_search form-control mtr_unverifi"
                        : "mtr_client_search form-control"
                    }
                    type="text"
                    aria-label="Default"
                    value={this.state.setInventory.value}
                    onChange={(e) =>
                      this.formChangeFn(e.target.value, "inventory")
                    }
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    onClick={(e) => this.handleShow("inventory")}
                  ></i>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <span className="clt">Out Item</span>
                  <input
                  style={{marginLeft:"1.5rem"}}
                    className={
                      this.state.fieldError === true &&
                        this.state.setOut.value === ""
                        ? "mtr_client_search form-control mtr_unverifi"
                        : "mtr_client_search form-control"
                    }
                    type="text"
                    aria-label="Default"
                    value={this.state.setOut.value}
                    onChange={(e) =>
                      this.formChangeFn(e.target.value, "material_in_use")
                    }
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    onClick={(e) => this.handleShow("material_in_use")}
                  ></i>
                </div>
              </div>
              <div className="btncen">
                <input
                  type="button"
                  value="Put To Use"
                  className="btn csm_btn csm_btn_pri col-md-2 sub-btn"
                  onClick={this.checkBlankFieldVal}
                ></input>
              </div>
            </div>
          </div>
        ) : (
          <div className="maincompo2">
            <div className="tab_head mtr_tab">{"Set Material Records"}</div>
            <div className="mtr_bdr_mob">
              {this.state.page_error === true && (
                <div className="alert alert-danger form_alt" role="alert">
                  {this.state.error}
                </div>
              )}
              {this.state.page_message === true && (
                <div className="alert alert-success form_alt" role="alert">
                  {this.state.message}
                </div>
              )}
              {this.state.fieldError === true && (
                <div className="alert alert-danger form_alt" role="alert">
                  {"Please fill mark in red"}
                </div>
              )}
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <span className="clt">Workshop</span>
                  </div>
                  <div>
                    <input
                      className={
                        this.state.fieldError === true &&
                          this.state.setWorkshop.value === ""
                          ? "mtr_client_search_mob form-control mtr_unverifi"
                          : "mtr_client_search_mob form-control"
                      }
                      type="text"
                      aria-label="Default"
                      value={this.state.setWorkshop.value}
                      onChange={(e) =>
                        this.formChangeFn(e.target.value, "workshop")
                      }
                    ></input>
                    <i
                      className="fa fa-search vlpointer mtr_clt_ref"
                      onClick={(e) => this.handleShow("workshop")}
                    ></i>
                  </div>
                </div>
                <div className="col-md-6">
                  <span className="clt">Loom</span>
                  <input
                    className={
                      this.state.fieldError === true &&
                        this.state.setLoom.value === ""
                        ? "mtr_client_search_mob form-control mtr_unverifi"
                        : "mtr_client_search_mob form-control"
                    }
                    type="text"
                    aria-label="Default"
                    value={this.state.setLoom.value}
                    onChange={(e) => this.formChangeFn(e.target.value, "loom")}
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    onClick={(e) => this.handleShow("loom")}
                  ></i>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <span className="clt">Item</span>
                  <input
                    className={
                      this.state.fieldError === true &&
                        this.state.setItem.value === ""
                        ? "mtr_client_search_mob form-control mtr_unverifi"
                        : "mtr_client_search_mob form-control"
                    }
                    type="text"
                    aria-label="Default"
                    value={this.state.setItem.value}
                    onChange={(e) => this.formChangeFn(e.target.value, "item")}
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    onClick={(e) => this.handleShow("item")}
                  ></i>
                </div>
                <div className="col-md-6">
                  <span className="clt">Inventory</span>
                  <input
                    className={
                      this.state.fieldError === true &&
                        this.state.setItem.value === ""
                        ? "mtr_client_search_mob form-control mtr_unverifi"
                        : "mtr_client_search_mob form-control"
                    }
                    type="text"
                    aria-label="Default"
                    value={this.state.setInventory.value}
                    onChange={(e) =>
                      this.formChangeFn(e.target.value, "inventory")
                    }
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    onClick={(e) => this.handleShow("inventory")}
                  ></i>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <span className="clt">Out Item</span>
                  <input
                    className={
                      this.state.fieldError === true &&
                        this.state.setOut.value === ""
                        ? "mtr_client_search_mob form-control mtr_unverifi"
                        : "mtr_client_search_mob form-control"
                    }
                    type="text"
                    aria-label="Default"
                    value={this.state.setOut.value}
                    onChange={(e) =>
                      this.formChangeFn(e.target.value, "material_in_use")
                    }
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    onClick={(e) => this.handleShow("material_in_use")}
                  ></i>
                </div>
              </div>
              <div className="btncen">
                <input
                  type="button"
                  value="Put To Use"
                  className="btn csm_btn csm_btn_pri col-md-2 sub-btn"
                  onClick={this.checkBlankFieldVal}
                ></input>
              </div>
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
              otherLocation={true}
              ref_filt={this.state.filtarray}
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

export default MaterialComponent;
