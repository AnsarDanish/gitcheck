import React, { Component } from "react";
import "../css/leftcomp.css";
import axios from "axios";

class LeftNav extends Component {
  state = {
    records: [],
    searchrcd: [],
    showLeftPane: true,
    height: "100px",
    page_error: false,
    error: "",
    landingPref: {},
    loca: this.props.loca,
    cls_all: true,
    isMobile: this.props.isMobile,
    loading: true,
    // contextMenu: [],
  };

  constructor(props) {
    super(props);
    this.state.height = props.height;
    this.setOpen = this.setOpen.bind(this);
    this.callRecord = this.callRecord.bind(this);
    this.callList = this.callList.bind(this);
    this.callOther = this.callOther.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.searchModule = this.searchModule.bind(this);
    this.callMulti = this.callMulti.bind(this);
    this.callMultipage = this.callMultipage.bind(this);
    this.callRegister = this.callRegister.bind(this);
    this.callPreference = this.callPreference.bind(this);
    this.callProperties = this.callProperties.bind(this);
    this.callTheme = this.callTheme.bind(this);
    this.callView = this.callView.bind(this);
    this.callChecklist = this.callChecklist.bind(this);
    this.callClientInfo = this.callClientInfo.bind(this);
    this.setSection = this.setSection.bind(this);
    this.closeAppMenu = this.closeAppMenu.bind(this);
    this.closeSection = this.closeSection.bind(this);
    this.callVariable = this.callVariable.bind(this);
    this.callInventory = this.callInventory.bind(this);
    this.callMaterialCompo = this.callMaterialCompo.bind(this);
    this.callWorkerInfo = this.callWorkerInfo.bind(this);
    this.callViewSalary = this.callViewSalary.bind(this);
    this.callInitialSetupCompo = this.callInitialSetupCompo.bind(this);
    this.callUserInfoCompo = this.callUserInfoCompo.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/get/modules", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const modul = res.data;
        console.log(modul);
        if (modul !== "") {
          if ("Error" in modul) {
            this.setState({
              loading: false,
              page_error: true,
              error: modul.Error,
            });
          } else {
            var lst = [];
            for (var k = 0; k < modul.applicatioMenu[2].records.length; k++) {
              for (
                var j = 0;
                j < modul.applicatioMenu[2].records[k].section.length;
                j++
              ) {
                modul.applicatioMenu[2].records[k].section[j].ref = true;
              }
            }
            for (var i = 0; i < modul.applicatioMenu[2].records.length; i++) {
              lst.push({
                application_menu:
                  modul.applicatioMenu[2].records[i].application_menu,
                section: modul.applicatioMenu[2].records[i].section,
                ref: true,
                ref_all: true,
              });
            }
            this.setState({
              records: lst,
              searchrcd: lst,
              landingPref: module.landingPref,
            });
            this.props.sendLandingPref(modul.landingPref);
          }
        }
      });
  }

  static getDerivedStateFromProps(props, state) {
    return {
      height: props.height,
      isMobile: props.isMobile,
    };
  }

  callRecord(lt, rid, call_type) {
    this.props.showFormCompo(lt, rid, call_type);
  }

  callInitialSetupCompo() {
    this.props.showInitialSetupCompo();
  }

  callUserInfoCompo() {
    this.props.showUserInfoCompo();
  }

  callList(lt, fil) {
    localStorage.removeItem("pageClicked");
    this.props.showListCompo(lt, fil, "");
  }

  callOther(md) {
    this.props.showOtherCompo(md);
  }

  callReportNew() {
    this.props.showReportCompoNew();
  }

  callMulti(md) {
    this.props.showMultiCompo(md);
  }

  callMultipage(md) {
    this.props.showMultiPage(md);
  }

  callRegister(md) {
    this.props.showClientReg(md);
  }

  callPreference(md) {
    this.props.showOwnerPrefComp(md);
  }

  callProperties() {
    this.props.showPropCompo();
  }

  callTheme() {
    this.props.showThemeCompo();
  }

  callView(md) {
    this.props.showViewCompo();
  }

  callMultiTable(md) {
    this.props.showMultiTable(md);
  }

  callChecklist() {
    this.props.showChecklistCompo();
  }

  callInventory(lt, fil) {
    this.props.showInventoryCompo(lt, fil, "");
  }

  callClientRPage(md) {
    this.props.showC(md);
  }

  callClientInfo(md) {
    this.props.showClientInfo(md);
  }

  callVariable() {
    this.props.showVariableCompo();
  }

  callStatus() {
    this.props.showStatusCompo();
  }

  callViewReport(lt, fil) {
    this.props.showViewTabularReport(lt, fil, "");
  }

  callWorkerInfo(lt, fil) {
    this.props.showViewTabularReport(lt, fil, "");
  }

  callMaterialCompo() {
    this.props.showMaterialCompo();
  }

  callIncomeExpense() {
    this.props.showIncomeExpense();
  }

  callViewSalary(lt, fil) {
    this.props.showViewTabularReport(lt, fil, "");
  }

  handleLeft() {
    this.props.handleLeftPane();
  }

  setSection(o_i, sec_i, val) {
    var searchrcd = this.state.searchrcd;
    searchrcd[o_i].section[sec_i].ref = val;
    this.setState({ searchrcd: searchrcd });
  }

  searchModule(nam) {
    if (nam.length > 2) {
      var rcd = JSON.stringify(this.state.records);
      var searchrcd = JSON.parse(rcd);
      var abc = [];
      for (var i = 0; i < searchrcd.length; i++) {
        var app_m = searchrcd[i].application_menu.toLowerCase();
        if (app_m.includes(nam.toLowerCase())) {
          abc.push({
            application_menu: searchrcd[i].application_menu,
            section: searchrcd[i].section,
            ref: true,
            ref_all: true,
          });
        } else {
          var cnt = 0;
          var mod = [];

          for (var j = 0; j < searchrcd[i].section.length; j++) {
            var sec_m = searchrcd[i].section[j].app_section.toLowerCase();
            if (sec_m.includes(nam.toLowerCase())) {
              mod.push(searchrcd[i].section[j]);
              cnt++;
            } else {
              for (var s = 0; s < searchrcd[i].section[j].module.length; s++) {
                var mod_m =
                  searchrcd[i].section[j].module[s].loom_module.toLowerCase();
                if (mod_m.includes(nam.toLowerCase())) {
                  var sec = {};
                  sec = searchrcd[i].section[j].module[s];
                  searchrcd[i].section[j].module = [];
                  searchrcd[i].section[j].module.push(sec);
                  mod.push(searchrcd[i].section[j]);
                  cnt++;
                }
              }
            }
          }
          if (cnt > 0) {
            abc.push({
              application_menu: searchrcd[i].application_menu,
              section: mod,
              ref: true,
              ref_all: true,
            });
          }
        }
      }
      this.setState({ searchrcd: abc });
    } else if (nam === "") {
      this.setState({ searchrcd: this.state.records });
    }
  }

  setOpen(i, rf) {
    const rcd = this.state.records;
    rcd[i].ref = !rf;
    this.setState({ records: rcd });
  }

  closeAppMenu() {
    var searchrcd = this.state.searchrcd;
    for (var s = 0; s < searchrcd.length; s++) {
      searchrcd[s].ref = !this.state.cls_all;
    }
    this.setState({ searchrcd: searchrcd, cls_all: !this.state.cls_all });
  }

  closeSection(o_i) {
    var searchrcd = this.state.searchrcd;
    for (var j = 0; j < searchrcd[o_i].section.length; j++) {
      searchrcd[o_i].section[j].ref = !searchrcd[o_i].ref_all;
    }
    searchrcd[o_i].ref_all = !searchrcd[o_i].ref_all;
    this.setState({
      searchrcd: searchrcd,
    });
  }

  render() {
    return (

      <div>
        <div
          className="list-group "
          style={{ height: this.state.height, minHeight: this.state.height }}
        >
          {this.state.isMobile ? (
            <div>
              <div className="search-block">
                <input
                  className=" lfnavserach form-control mr-sm-2  "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => this.searchModule(e.target.value)}
                ></input>

                {/* <div className="col-md-1" style={{ padding: "0px" }}>
                      <button type="submit" className="search-button">
                        <i className="fa fa-search search-ic" aria-hidden="true"></i>
                      </button>
                    </div> */}

                {/* <div
                      className={
                        this.state.showLeftPane ? "" : "left_icon_zero"
                      }
                      onClick={this.handleLeft}
                    >
                      {this.state.showLeftPane ? (
                        <i className="fa fa-arrow-left left_icon"></i>
                      ) : (
                        <i className="fa fa-arrow-right left_icon"></i>
                      )}
                    </div> */}

                <div className="arr_width">
                  <div className="left_icon" onClick={this.handleLeft}>
                    <i className="fa fa-arrow-left"></i>
                  </div>
                </div>
                <div className="arr_width">
                  <div
                    type="button"
                    className="left_icon"
                    onClick={this.closeAppMenu}
                  >
                    {this.state.cls_all ? "-" : "+"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="search-block">
                <input
                  className=" lfnavserach form-control mr-sm-2  "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => this.searchModule(e.target.value)}
                ></input>
                {/* <div className="col-md-1" style={{ padding: "0px" }}>
								      <button type="submit" className="search-button">
									    <i className="fa fa-search search-ic" aria-hidden="true"></i>
								      </button>
							        </div> */}
                {/* <div
                  className={this.state.showLeftPane ? "" : "left_icon_zero"}
                  onClick={this.handleLeft}
                >
                  {this.state.showLeftPane ? (
                    <i className="fa fa-arrow-left left_icon"></i>
                  ) : (
                    <i className="fa fa-arrow-right left_icon"></i>
                  )}
                </div> */}
                <div className="arr_width">
                  <div className="left_icon" onClick={this.handleLeft}>
                    <i className="fa fa-arrow-left"></i>
                  </div>
                </div>
                <div className="arr_width">
                  <div
                    type="button"
                    className="left_icon"
                    onClick={this.closeAppMenu}
                  >
                    {this.state.cls_all ? "-" : "+"}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="pagesetupleft">
            {this.state.searchrcd.map((obj, o_i) => (
              <div key={o_i}>
                <div className="list-group-item appm">
                  {obj.application_menu}
                  <span className="flri">
                    {obj.ref_all === true && (
                      <i
                        className="fa fa-arrow-down vlpointer arrow_sty"
                        aria-hidden="true"
                        onClick={(e) => this.closeSection(o_i)}
                      ></i>
                    )}
                    {obj.ref_all === false && (
                      <i
                        className="fa fa-arrow-right vlpointer arrow_sty"
                        aria-hidden="true"
                        onClick={(e) => this.closeSection(o_i)}
                      ></i>
                    )}
                    <button
                      type="button"
                      className={obj.ref ? "buttn" : "buttnp"}
                      onClick={(pr) => this.setOpen(o_i, obj.ref)}
                    >
                      {obj.ref ? "-" : "+"}
                    </button>
                  </span>
                </div>
                {obj.ref === true && (
                  <div id={obj.application_menu}>
                    {obj.section.map((obj_sec, sec_i) => (
                      <div key={sec_i}>
                        <div className="sec">
                          {obj_sec.ref === true && (
                            <i
                              className="fa fa-arrow-down vlpointer "
                              aria-hidden="true"
                              onClick={() => this.setSection(o_i, sec_i, false)}
                            ></i>
                          )}
                          {obj_sec.ref === false && (
                            <i
                              className="fa fa-arrow-right vlpointer "
                              aria-hidden="true"
                              onClick={() => this.setSection(o_i, sec_i, true)}
                            ></i>
                          )}
                          <span>{obj_sec.app_section}</span>
                        </div>

                        {obj_sec.ref === true && (
                          <div className="mmd">
                            {obj_sec.module.map((obj_m, m_i) => (
                              <div key={m_i}>
                                {obj_m.type === "list" && (
                                  <div
                                    onClick={() =>
                                      this.callList(
                                        obj_m.loom_table,
                                        obj_m.filter
                                      )
                                    }
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col1">
                                      LI
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "new" && (
                                  <div
                                    onClick={() =>
                                      this.callRecord(
                                        obj_m.loom_table,
                                        "0",
                                        obj_m.type
                                      )
                                    }
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col2">
                                      IN
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "record" && (
                                  <div
                                    onClick={() =>
                                      this.callRecord(
                                        obj_m.loom_table,
                                        obj_m.recordid,
                                        obj_m.type
                                      )
                                    }
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col2">
                                      RC
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "other" && (
                                  <div
                                    onClick={() =>
                                      this.callOther()
                                      // obj_m.other_location
                                    }
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col3">
                                      OT
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "report_new" && (
                                  <div
                                    onClick={() =>
                                      // this.callOther()
                                      this.callReportNew()
                                      // obj_m.other_location
                                    }
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type" style={{ "backgroundColor": "rgb(20 175 181 / 89%)" }}>
                                      RPT
                                    </span>
                                  </div>
                                )
                                }
                                {obj_m.type === "multiinsert" && (
                                  <div
                                    onClick={() =>
                                      this.callMulti(obj_m.loom_table)
                                    }
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col4">
                                      MI
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "multipage" && (
                                  <div
                                    onClick={() =>
                                      this.callMultipage(obj_m.loom_table)
                                    }
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col5">
                                      MP
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "register" && (
                                  <div
                                    onClick={() =>
                                      this.callRegister(obj_m.loom_table)
                                    }
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col3">
                                      RG
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "preference" && (
                                  <div
                                    onClick={() =>
                                      this.callPreference(obj_m.loom_table)
                                    }
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col2">
                                      PF
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "properties" && (
                                  <div
                                    onClick={this.callProperties}
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col3">
                                      PP
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "theme" && (
                                  <div
                                    onClick={this.callTheme}
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col4">
                                      TE
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "view" && (
                                  <div
                                    onClick={() =>
                                      this.callView(obj_m.loom_table)
                                    }
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col5">
                                      VE
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "multitable" && (
                                  <div
                                    onClick={() =>
                                      this.callMultiTable(obj_m.filter_name)
                                    }
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col4">
                                      MT
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "checklist" && (
                                  <div
                                    onClick={this.callChecklist}
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col4">
                                      CL
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "clienInfo" && (
                                  <div
                                    onClick={() =>
                                      this.callClientInfo(obj_m.filter)
                                    }
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col4">
                                      CI
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "var" && (
                                  <div
                                    onClick={() => this.callVariable()}
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col3">
                                      VR
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "status" && (
                                  <div
                                    onClick={() => this.callStatus()}
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col3">
                                      ST
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "viewReport" && (
                                  <div
                                    onClick={() =>
                                      this.callViewReport(
                                        obj_m.loom_table,
                                        obj_m.filter
                                      )
                                    }
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col1">
                                      VR
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "workerInfo" && (
                                  <div
                                    onClick={() =>
                                      this.callWorkerInfo(
                                        obj_m.loom_table,
                                        obj_m.filter
                                      )
                                    }
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col1">
                                      WI
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "material" && (
                                  <div
                                    onClick={() => this.callMaterialCompo()}
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col6">
                                      MTR
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "incomeExpense" && (
                                  <div
                                    onClick={() => this.callIncomeExpense()}
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col6">
                                      IE
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "inventory" && (
                                  <div
                                    onClick={() =>
                                      this.callInventory(
                                        obj_m.loom_table,
                                        obj_m.filter
                                      )
                                    }
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col4">
                                      NV
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "viewSalary" && (
                                  <div
                                    onClick={() =>
                                      this.callViewSalary(
                                        obj_m.loom_table,
                                        obj_m.filter
                                      )
                                    }
                                    className="list-group-item list-group-item-action navpointer "
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col4">
                                      NV
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "setup" && (
                                  <div
                                    onClick={() => this.callInitialSetupCompo()}
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col7">
                                      IS
                                    </span>
                                  </div>
                                )}
                                {obj_m.type === "info" && (
                                  <div
                                    onClick={() => this.callUserInfoCompo()}
                                    className="list-group-item list-group-item-action navpointer"
                                  >
                                    {obj_m.loom_module}
                                    <span className="mod-set mod_type mod-col8">
                                      DI
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default LeftNav;
