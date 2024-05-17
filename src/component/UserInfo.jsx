import React, { Component } from "react";
import axios from "axios";
import { Select, Card, Button, Flex, Input, Space } from "antd";
import { SearchProps } from 'antd/es/input/Search';
import WorkInProgress from "./work_in_progress";
import "../css/userInfo.css";
import { Modal } from "react-bootstrap";
import ModelList from "./model_list";
import ListComponent from "./list_component";
import FormComponent from "./form_component";
const { Option } = Select;
const { Search } = Input;

export class UserInfo extends Component {
  state = {
    loca: this.props.loca,
    loading: false,
    info_Rec: [],
    selectedOption: null,
    fieldError: false,
    show: false,
    filtarray: [],
    rid: "",
    tabname: "",
    fdnameVisible: false,
    dbName: "",
    inputVisible: false,
    setAddress: { id: "", value: "" },
    setWorker: { id: "", value: "" },
    setWorkshop: { id: "", value: "" },
    showCard: false,
    singleRecord: [],
    multipleRecord: [],
    list: [],
    noRecord: false,
    page_error: false,
    page_clicked: 0,
    page_count: 0,
    tablabel: "",
    col_mn: [],
    prefCall: [],
  };

  constructor(props) {
    super(props);

    // this.showDetails = this.showDetails.bind(this);
    this.formChangeFn = this.formChangeFn.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/info/name", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          const rcd = resp.data;
          console.log("record", rcd);
          if (rcd !== "") {
            if ("Error" in rcd) {
              this.setState({
                loading: false,
                page_error: true,
                error: rcd.Error,
              });
            } else {
              this.setState({
                info_Rec: rcd.infoRecord[2].records,
              });
              console.log("info", this.state.info_Rec);
            }
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = (tab) => {
    let flt = this.state.filtarray;
    if (flt.length > 0) {
      flt = [];
    }
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
    this.setState({ show: true, filtarray: flt });
  }

  formChangeFn(e, tab) {
    console.log(this.state.tabname, "tabname");
    this.setState({ fieldError: false });
    if (tab === "workshop") {
      let xx = this.state.setWorkshop;
      xx.value = e;
      xx.id = "";
      this.setState({ setWorkshop: xx });
      console.log(this.state.setWorkshop);
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
    } else if (tab === "address") {
      let xx = this.state.setAddress;
      xx.value = e;
      xx.id = "";
      this.setState({ setAddress: xx });
    } else if (tab === "worker") {
      let xx = this.state.setWorker;
      xx.value = e;
      xx.id = "";
      this.setState({ setWorker: xx });
    }
  }

  setRef(val, ref_id, tab, dbName) {
    console.log(this.state.tabname, "tabname");
    if (this.state.tabname === "workshop") {
      let xx = this.state.setWorkshop;
      xx.value = val;
      xx.id = ref_id;
      this.setState({ setWorkshop: xx, fieldError: false });
      this.showDetails(
        this.state.setWorkshop.id,
        this.state.setWorkshop.value,
        tab,
        dbName
      )
      console.log(({ setWorkshop: xx, fieldError: false }));
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
    } else if (this.state.tabname === "worker") {
      let xx = this.state.setWorker;
      xx.value = val;
      xx.id = ref_id;
      this.setState({ setWorker: xx, fieldError: false });
      this.showDetails(
        this.state.setWorker.id,
        this.state.setWorker.value,
        tab,
        dbName
      )
      console.log(({ setWorker: xx, fieldError: false }));
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
  //     material_in_use: 'setOut',
  //     address: 'setAddress',
  //     worker: 'setWorker'
  //   };

  //   const tabname = this.state.tabname;
  //   const stateVariable = stateMap[tabname];
  //   if (stateVariable) {
  //     let xx = this.state[stateVariable];
  //     xx.value = val;
  //     xx.id = ref_id;
  //     const newState = { [stateVariable]: xx, fieldError: false };
  //     console.log(newState);
  //     this.setState(newState);
  //   }
  //   this.handleClose();
  // }

  callInfoDashboardRecord = (value) => {
    // console.log(nam);
    const { info_Rec, loca } = this.state;

    console.log("this is a dashRecord");
    // this.setState({ loading: true });
    const selectedOption = info_Rec.find(item => item.name === value);
    console.log(selectedOption);
    if (selectedOption) {
      this.setState({
        rid: selectedOption.id,
        selectedOption: value,
        dbName: selectedOption.name,
        fdname: selectedOption.fdname,
        tabname: selectedOption.tabName,
        fdnameVisible: true,
        inputVisible: true,
        loading: false,
      });
    }
    // console.log(this.state.dName);
    console.log("Selected value:", value);
  };

  // toggleCardVisibility = () => {
  //   this.setState((prevState) => ({
  //     showCard: !prevState.showCard,
  //   }));
  // };
  showDetails = (rid, value, tabname, dbName) => {
    console.log(rid, value, tabname, dbName);
    console.log("Show Details is Clicked");
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/multi/table/info/map/" +
        tabname +
        "/" +
        dbName +
        "/" +
        rid +
        "/" +
        value,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        const userRecord = res.data;
        console.log(userRecord);
        // console.log(sin, mul);
        this.setState({
          singleRecord: userRecord.infoRecord[0].SingleRecord,
          multipleRecord: userRecord.infoRecord[0].MultipleRecord,
          showCard: true
        });
        console.log(this.state.multipleRecord);
        //  this.setList1(this.state.multipleRecord)
      },
        (error) => {
          let err = { message: error.message, code: error.response.status };
          this.props.showErrorCompo({ state: { err: err } });
        }
      );
    // this.toggleCardVisibility();
  }



  // renderTabContent = (tabInfo) => {
  //   const { rid, tabname, fdname, fieldError, stateKey, onChangeFn, handleShowFn, dbName } = tabInfo;
  //   console.log(tabInfo, this.state);
  //   return (
  //     <div className="col-md-6">
  //       {console.log("abdulhale")}
  //       <p className="mb-0 ms-1 font-monospace">{fdname}</p>
  //       <input
  //         className={
  //           fieldError && this.state[stateKey].value === ""
  //             ? "mtr_client_search form-control mtr_unverifi"
  //             : "mtr_client_search form-control"
  //         }
  //         style={{ margin: "0px" }}
  //         type="text"
  //         aria-label="Default"
  //         value={this.state[stateKey].value}
  //         onChange={(e) => onChangeFn(e.target.value, tabname)}
  //       ></input>
  //       <i
  //         className="fa fa-search vlpointer mtr_clt_ref"
  //         style={{ marginLeft: "-1px" }}
  //         onClick={() => handleShowFn(tabname)}
  //       ></i>
  //       {console.log(this.state[stateKey].value, "abdullllllll1")}
  //       {this.state[stateKey].value && (
  //         <Flex gap="small" wrap="wrap">
  //           <Button
  //             type="primary"
  //             className="mt-3"
  //             onClick={() => this.showDetails(this.state[stateKey].id, this.state[stateKey].value, tabname, dbName)}
  //           >
  //             Show Details
  //           </Button>
  //         </Flex>
  //       )}
  //     </div>
  //   );
  // };

  render() {
    const { rid, info_Rec, loading, selectedOption, showCard, fieldError, fdname, show, loca, dbName, tabname, fdnameVisible, isMobile } = this.state; // Destructure infoRecord from state
    return (
      <div className="UserInfo">
        <div className="pagesetup">
          {fieldError === true && (
            <div className="alert alert-danger form_alt" role="alert">
              {"Please fill mark in red"}
            </div>
          )}
          {loading === true ? (
            <WorkInProgress></WorkInProgress>
          ) : (
            <Select
              value={selectedOption}
              onChange={(value) => this.callInfoDashboardRecord(value)}
              style={{
                width: "300px",
                marginTop: "10px",
                marginLeft: "13px",
              }}
              showSearch
              placeholder="Select Dashboard Info"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {info_Rec.map((item, i) => (
                <Option key={i} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
          {selectedOption && fdnameVisible && (
            <div className="row" style={{ marginTop: "15px", marginLeft: "0px" }}>
              {tabname === "address" && (
                <div className="col-md-6">
                  {console.log(tabname)}
                  <p className="mb-0 ms-1 font-monospace">{fdname}</p>
                  <input
                    className={
                      fieldError && this.state.setAddress.value === ""
                        ? "mtr_client_search form-control mtr_unverifi"
                        : "mtr_client_search form-control"
                    }
                    style={{ margin: "0px" }}
                    type="text"
                    aria-label="Default"
                    value={this.state.setAddress.value}
                    onChange={(e) => this.formChangeFn(e.target.value, "address")}
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    style={{ marginLeft: "-1px" }}
                    onClick={() => this.handleShow("address")}
                  ></i>
                  {this.state.setAddress.value && (
                    <Button
                      type="primary"
                      className="mt-3"
                      onClick={() =>
                        this.showDetails(
                          this.state.setAddress.id,
                          this.state.setAddress.value,
                          tabname,
                          dbName
                        )
                      }
                    >
                      Show Details
                    </Button>
                  )}
                </div>
              )}
              {console.log(tabname)}
              {tabname === "worker" && (
                <div className="col-md-6">
                  {console.log(tabname)}
                  <p className="mb-0 ms-1 font-monospace">{fdname}</p>
                  <input
                    className={
                      fieldError && this.state.setWorker.value === ""
                        ? "mtr_client_search form-control mtr_unverifi"
                        : "mtr_client_search form-control"
                    }
                    style={{ margin: "0px" }}
                    type="text"
                    aria-label="Default"
                    value={this.state.setWorker.value}
                    onChange={(e) => { console.log(e); this.formChangeFn(e.target.value, "worker") }}
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    style={{ marginLeft: "-1px" }}
                    onClick={() => this.handleShow("worker")}
                  ></i>
                  {/* {this.state.setWorker.value && (
                    this.showDetails(
                      this.state.setWorker.id,
                      this.state.setWorker.value,
                      tabname,
                      dbName
                    )
                  )} */}
                </div>
              )}
              {tabname === "workshop" && (
                <div className="col-md-6">
                  {console.log(tabname, "workshop tab")}
                  <p className="mb-0 ms-1 font-monospace">{fdname}</p>
                  <input
                    className={
                      fieldError && this.state.setWorkshop.value === ""
                        ? "mtr_client_search form-control mtr_unverifi"
                        : "mtr_client_search form-control"
                    }
                    style={{ margin: "0px" }}
                    type="text"
                    aria-label="Default"
                    value={this.state.setWorkshop.value}
                    onChange={(e) => { console.log(e); this.formChangeFn(e.target.value, "workshop", dbName) }}
                  ></input>
                  <i
                    className="fa fa-search vlpointer mtr_clt_ref"
                    style={{ marginLeft: "-1px" }}
                    onClick={() => this.handleShow("workshop")}
                  ></i>
                  {console.log(this.state.setWorkshop.value)}
                  {/* {this.state.setWorkshop.value && (() =>)} */}
                </div>
              )}
            </div>
          )}
          {showCard === true ? (

            <div className="row">
              {/* <div className="row"> */}
              {console.log(this.state.multipleRecord)}
              {this.state.multipleRecord.map((card, index) => (
                // <div key={index} className=" col-md-6 col-lg-4 col-xl-3">
                <div key={index} className=" col-md-6 p-4 card-style">
                  <div className="card crd">
                    <div className="card-body">
                      <ListComponent
                        unmountMe={""}
                        listName={""}
                        timeline={""}
                        /*    filter={this.state.filter}
                           showFormCompo={(nm, rid, ty) =>
                             this.showFormCompo(nm, rid, ty)
                           } */
                        /*  ty={this.state.formRecordType} */
                        loca={this.state.loca}
                        isMobile={this.state.isMobile}
                        contextMenu={this.state.contextMenu}
                        labelContext={this.state.labelContext}
                        showListCompo={(nm, fil, tm) =>
                          this.showListCompo(nm, fil, tm)
                        }
                        showViewCompo={this.showViewCompo}
                        showErrorCompo={(error) => this.showErrorCompo(error)}
                        isDashboardinfo={true}
                        dashData={card}
                      ></ListComponent>

                    </div>
                  </div>
                </div>
              ))}
              {/* </div> */}
              {/* <div className="row"> */}
              {console.log(this.state.multipleRecord)}
              {console.log(this.state.singleRecord)}
              {this.state.singleRecord.map((card, index) => (
                // <div key={index} className=" col-md-6 col-lg-4 col-xl-3">
                <div key={index} className=" col-md-6 p-4 card-style">
                  <div className="card crd">
                    <div className="card-body">
                      <FormComponent
                        // showListCompo={(nm, fil, tm) =>
                        //   this.showListCompo(nm, fil, tm)
                        // }
                        unmountMe={this.handleFormCompo}
                        tabname={this.state.tabname}
                        rid={this.state.rid}
                        ty={this.state.formRecordType}
                        isMobile={this.state.isMobile}
                        // showFormCompo={(nm, rid, ty) =>
                        //   this.showFormCompo(nm, rid, ty)
                        // }
                        // showClientInfoRec={(nm, rid) =>
                        //   this.showClientInfoRec(nm, rid)
                        // }
                        // i_d={this.state.i_d}
                        // showRoleSelectionCompo={(id, rt) =>
                        //   this.showRoleSelectionCompo(id, rt)
                        // }
                        // showMainCompo={(userinfo) => this.showMainCompo(userinfo)}
                        // showHtmlPage={(filter, record) =>
                        //   this.showHtmlPage(filter, record)
                        // }
                        loca={this.state.loca}
                        contextMenu={this.state.contextMenu}
                        labelContext={this.state.labelContext}
                        showViewCompo={this.showViewCompo}
                        showStatusCompo={this.showStatusCompo}
                        isDashboardInfo={true}
                        dashboardData={card}
                      // showErrorCompo={(error) => this.showErrorCompo(error)}
                      // showNotificationCompo={(cnt) =>
                      //   this.showNotificationCompo(cnt)
                      // }

                      // showIncomeExpense={this.showIncomeExpense}
                      ></FormComponent>
                    </div>
                  </div>
                </div>
              ))}
              {/* </div> */}


            </div>
          ) : null}


        </div>
        <Modal
          dialogClassName="my-modal"
          show={show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModelList
              setRef={(val, r_id) => this.setRef(val, r_id, tabname, dbName)}
              loca={loca}
              colBoolean={true}
              tabname={tabname}
              isMobile={isMobile}
              otherLocation={true}
            // ref_filt={this.state.filtarray}
            ></ModelList>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div >
    );
  }
}

export default UserInfo;
