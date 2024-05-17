import React from "react";
import Modal from "react-modal";
import axios from "axios";
import { Button, Modal as Mod } from "react-bootstrap";
import "../css/mainCompo.css";
import Dashboard from "./dashboard";
import FormComponent from "./form_component";
import Login from "./login";
import SortComponent from "./sort_component";
import ListComponent from "./list_component";
import LeftNav from "./left_navigation";
import ReportComponent from "./report_component";
import RegisterComponent from "./register_component";
import MultiInsert from "./multi_insert";
import Multipage from "./multi_page";
import ClientRegistration from "./client_registration";
import PropertiesComponent from "./properties_component";
import OwnerPreference from "./ownerPrefrence";
import ThemeDesignComponent from "./themedesign_component";
import FormViewComponent from "./formview_component";
import MultiTableRelation from "./multiTableRelation";
import CheckListComponent from "./checkList_component";
import ForgetPassword from "./ForgetPassword";
import GenerateNewPin from "./generateNewPin";
import SetNewPassword from "./setNewPassword";
import OtpVerification from "./OtpVerification";
import ClientInfoCompo from "./clientInfoCompo";
import ClientInfoRecCompo from "./clientInfoRecCompo";
import RoleSelectionComponent from "./roleSelectionComponent";
import HtmlPageComponent from "./htmlPage";
import UserNotificationCompo from "./userNotification";
import LoomStatusComponent from "./loomstatus";
import IncomeExpense from "./incomeExpense";
import InventoryComponent from "./inventory";
import UiPageComponent from "./uipage_component";
import ImpersonationCompo from "./impersonationCompo";
import VarBlankCompo from "./VarBlankCompo";
import TabularReportCompo from "./tabularReport";
import ViewTabularReport from "./viewTabularReport";
import MaterialComponent from "./materialComponent";
import WorkerInfoCompo from "./workerInfoCompo";
import SalaryCompo from "./salary_compo";
import ErrorPage from "./errorPage";
import InitialSetupComponent from "./InitialSetupComponent";
import ReportComponentNew from "./ReportComponentNew";
import UserInfo from "./UserInfo";
import { ToastContainer } from "react-toastify";


class MainComponent extends React.Component {
  state = {
    // pageHeight: 0,
    showMain: false,
    showlogin: true,
    showRegister: false,
    showLoginCompo: true,
    callDash: false,
    showSortedCompo: false,
    showListCompo: false,
    showFormCompo: false,
    sorted_name: "",
    url: "",
    showLeftPane: true,
    showReportCompo: false,
    showReportCompoNew: false,
    showMultiInsert: false,
    showMultiPage: false,
    showClientReg: false,
    height: "800px",
    width: "",
    isMobile: false,
    heightTop: "50px",
    tabname: "",
    rid: "",
    formRecordType: "",
    showPropCompo: false,
    showOwnerPrefComp: false,
    showThemeCompo: false,
    showViewCompo: false,
    showMultiTable: false,
    showChecklistCompo: false,
    showForgetPassword: false,
    showGenerateNewPin: false,
    showOtpVerification: false,
    showNewPassword: false,
    showClientInfo: false,
    showClientInfoRec: false,
    showRoleSelectionCompo: false,
    showHtmlPage: false,
    showMainCompo: false,
    showNotificationCompo: false,
    showUiPageCompo: false,
    showVarBlankCompo: false,
    showVariableCompo: false,
    showStatusCompo: false,
    showTabularReport: false,
    showViewTabularReport: false,
    showInventoryCompo: false,
    showInitialSetupCompo: false,
    showMaterialCompo: false,
    showIncomeExpense: false,
    showWorkerInfo: false,
    showViewSalary: false,
    showErrorCompo: false,
    showUserInfoCompo: false,
    back: new Map(),
    backMethod: new Map(),
    counter1: 0,
    counter2: 0,
    backLastIndex: 1,
    filter: "",
    timeline: "",
    mt_name: "",
    language: "English",
    registerType: "",
    op: "",
    un: "",
    i_d: "",
    rt: "",
    isOpen: false,
    username: "",
    userinfo: {},
    landingPref: {},
    html: "",
    script: "",
    msg: [],
    cnt: "",
    record: [],
    name: "",
    // loca: "https://apis.loomyarn.com",
    // loca: "https://loomyarn.com:8082",
    // loca: "http://192.168.0.114:8082",
    loca: "http://localhost:8082",
    test: "gauhar",
    adminPanel: false,
    reload: "",
    setRecord: {},
    report_name: "",
    impersonate_name: "",
    loading: true,
    contextMenu: [],
    labelContext: [],
    location: "",
    taskName: "",
  };

  constructor() {
    super();
    // this.handleResize = this.handleResize.bind(this);

    this.myRef = React.createRef();
    this.mainTop = React.createRef();

    this.showLogin = this.showLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.showDashboard = this.showDashboard.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);

    this.showSortCompo = this.showSortCompo.bind(this);
    this.handleSortCompo = this.handleSortCompo.bind(this);

    this.showListCompo = this.showListCompo.bind(this);
    this.handleListCompo = this.handleListCompo.bind(this);

    this.showFormCompo = this.showFormCompo.bind(this);
    this.handleFormCompo = this.handleFormCompo.bind(this);

    this.showPropCompo = this.showPropCompo.bind(this);

    this.showOtherCompo = this.showOtherCompo.bind(this);
    this.handleOtherCompo = this.handleOtherCompo.bind(this);

    this.showOwnerPrefComp = this.showOwnerPrefComp.bind(this);
    this.handleOwnerPrefComp = this.handleOwnerPrefComp.bind(this);

    this.showMultiCompo = this.showMultiCompo.bind(this);
    this.handleMultiCompo = this.handleMultiCompo.bind(this);

    this.showReportCompo = this.showReportCompo.bind(this);
    this.handleReportCompo = this.handleReportCompo.bind(this);

    this.showReportCompoNew = this.showReportCompoNew.bind(this);
    this.handleReportCompoNew = this.handleReportCompoNew.bind(this);

    this.showMultiPage = this.showMultiPage.bind(this);
    this.handleMultiPage = this.handleMultiPage.bind(this);

    this.showClientReg = this.showClientReg.bind(this);
    this.handleClientReg = this.handleClientReg.bind(this);

    this.registerCompo = this.registerCompo.bind(this);
    this.handleRegisterCompo = this.handleRegisterCompo.bind(this);

    this.handleLeftPane = this.handleLeftPane.bind(this);
    this.handleLeftNavCompo = this.handleLeftNavCompo.bind(this);

    this.showThemeCompo = this.showThemeCompo.bind(this);
    this.handleThemeCompo = this.handleThemeCompo.bind(this);

    this.showViewCompo = this.showViewCompo.bind(this);
    this.handleViewCompo = this.handleViewCompo.bind(this);

    this.showMultiTable = this.showMultiTable.bind(this);
    this.handleMultiTable = this.handleMultiTable.bind(this);

    this.showChecklistCompo = this.showChecklistCompo.bind(this);
    this.handleChecklistCompo = this.handleChecklistCompo.bind(this);

    this.showInventoryCompo = this.showInventoryCompo.bind(this);
    this.handleInventoryCompo = this.handleInventoryCompo.bind(this);

    this.showForgetPassword = this.showForgetPassword.bind(this);
    this.handleForgetPassword = this.handleForgetPassword.bind(this);

    this.showGenerateNewPin = this.showGenerateNewPin.bind(this);
    this.handleGenerateNewPin = this.handleGenerateNewPin.bind(this);

    this.showOtpVerification = this.showOtpVerification.bind(this);
    this.handleOtpVerification = this.handleOtpVerification.bind(this);

    this.showNewPassword = this.showNewPassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);

    this.showClientInfo = this.showClientInfo.bind(this);
    this.handleClientInfo = this.handleClientInfo.bind(this);

    this.showClientInfoRec = this.showClientInfoRec.bind(this);
    this.handleClientInfoRec = this.handleClientInfoRec.bind(this);

    this.showRoleSelectionCompo = this.showRoleSelectionCompo.bind(this);
    this.handleRoleSelectionCompo = this.handleRoleSelectionCompo.bind(this);

    this.showHtmlPage = this.showHtmlPage.bind(this);
    this.handleHtmlPage = this.handleHtmlPage.bind(this);

    this.showNotificationCompo = this.showNotificationCompo.bind(this);
    this.handleNotificationCompo = this.handleNotificationCompo.bind(this);

    this.sendLandingPref = this.sendLandingPref.bind(this);
    this.handleSendLandingPref = this.handleSendLandingPref.bind(this);

    this.showUiPageCompo = this.showUiPageCompo.bind(this);
    this.handleUiPageCompo = this.handleUiPageCompo.bind(this);

    this.showVariableCompo = this.showVariableCompo.bind(this);
    this.handleVariableCompo = this.handleVariableCompo.bind(this);

    this.showStatusCompo = this.showStatusCompo.bind(this);
    this.handleStatusCompo = this.handleStatusCompo.bind(this);

    this.showTabularReport = this.showTabularReport.bind(this);
    this.handleTabularReport = this.handleTabularReport.bind(this);

    this.showViewTabularReport = this.showViewTabularReport.bind(this);
    this.handleViewTabularReport = this.handleViewTabularReport.bind(this);

    this.showMaterialCompo = this.showMaterialCompo.bind(this);
    this.handleMaterialCompo = this.handleMaterialCompo.bind(this);

    this.showIncomeExpense = this.showIncomeExpense.bind(this);
    this.handleIncomeExpense = this.handleIncomeExpense.bind(this);

    this.showWorkerInfo = this.showWorkerInfo.bind(this);
    this.handleWorkerInfo = this.handleWorkerInfo.bind(this);

    this.showViewSalary = this.showViewSalary.bind(this);
    this.handleViewSalary = this.handleViewSalary.bind(this);

    this.showErrorCompo = this.showErrorCompo.bind(this);
    this.handleErrorCompo = this.handleErrorCompo.bind(this);

    this.showInitialSetupCompo = this.showInitialSetupCompo.bind(this);
    this.handleInitialSetupCompo = this.handleInitialSetupCompo.bind(this);

    this.showUserInfoCompo = this.showUserInfoCompo.bind(this);
    this.handleUserInfoCompo = this.handleUserInfoCompo.bind(this);

    this.callhome = this.callhome.bind(this);
    this.logout = this.logout.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getWindowDimensions = this.getWindowDimensions.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openList = this.openList.bind(this);
    this.setImp = this.setImp.bind(this);
    this.closeList = this.closeList.bind(this);
    this.getImpsUserInfo = this.getImpsUserInfo.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
    this.getContextMenu = this.getContextMenu.bind(this);
    this.getLabelContext = this.getLabelContext.bind(this);
    this.gotoBackAndRight = this.gotoBackAndRight.bind(this);
    this.checkHistorySize = this.checkHistorySize.bind(this);
    this.storeInHistory = this.storeInHistory.bind(this);
  }

  componentDidMount() {
    console.log("innnnnnnnn");
    // localStorage.setItem("abc", JSON.stringify(this.state.backMethod));
    setTimeout(() => {
      this.getWindowDimensions();
      // var rt = document.getElementById("root").clientHeight;

      // var height2 = document.getElementById("partop").clientHeight;
      // var hh = rt - height; //window.innerHeight - height; height +
      // this.setState({
      //   height: hh + "px",
      //   // heightTop: height + "px",
      //   showMain: true,
      // });
    }, 100);
    // this.setState({ pageHeight: window.innerHeight });
    // // Listen for window resize events
    // window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    console.log("innnnnnnnn111");
    // Clean up event listener
    setTimeout(() => {
    }, 5000);
    // localStorage.setItem("abc", JSON.stringify(this.state.backMethod));
    /*   handleResize() {
      this.setState({ pageHeight: window.innerHeight });
    } */
  }

  // componentDidUpdate() {
  //   setTimeout(() => {
  //     this.getWindowDimensions();
  //     // var rt = document.getElementById("root").clientHeight;

  //     // var height2 = document.getElementById("partop").clientHeight;
  //     // var hh = rt - height; //window.innerHeight - height; height +
  //     // this.setState({
  //     //   height: hh + "px",
  //     //   // heightTop: height + "px",
  //     //   showMain: true,
  //     // });
  //   }, 100);
  // }

  getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    var ht = document.getElementById("maintop").clientHeight;
    var hh = height - ht; //window.innerHeight - height; height +
    var wd = width;
    var mobile = false;
    var leftpane = false;
    if (wd <= 768) {
      // if (wd <= 500)
      mobile = true;
    }
    if (!mobile) {
      leftpane = true;
    }
    this.setState({
      height: hh + "px",
      width: wd,
      showMain: true,
      isMobile: mobile,
      showLeftPane: leftpane,
    });
  }

  registerCompo(lang, rtype) {
    this.showLoginFunction(false, true, false, false, false);
    this.setState({
      language: lang,
      registerType: rtype,
    });
  }

  checkHistorySize() {
    if (this.state.back.size > 25) {
      let count = 1;
      let bakLastIndex = this.state.backLastIndex;

      for (let key of this.state.back.keys()) {
        if (count === 1) {
          this.state.back.delete(key);
          this.state.backMethod.delete(key);
          this.setState({ backLastIndex: ++bakLastIndex });
          count++;
        } else {
          break;
        }
      }
    }
    setTimeout(() => {
    }, 1000);
  }

  setImp(rel) {
    this.setState({ reload: rel });
    window.location.reload(false);
  }

  // showLogin() {
  //   this.setState({ showlogin: true });
  // }

  showLogin(val) {
    if(val != null){
      this.setState({regis: val});
    }
    this.showLoginFunction(true, false, false, false, false, false, false);
  }

  storeInHistory(obj, methodName) {
    this.setState((prevState) => {
      const updatedMap = new Map(prevState.back);
      updatedMap.set(this.state.counter1, obj);
      return { back: updatedMap };
    });
    this.setState((prevState) => {
      const updatedMap = new Map(prevState.backMethod);
      updatedMap.set(this.state.counter1, methodName);
      return { backMethod: updatedMap };
    });
    this.setState({
      counter1: this.state.counter1 + 1,
      counter2: this.state.counter1 + 1,
    });
    setTimeout(() => {
    }, 1000);
  }

  callhome() {
    var lan_type = this.state.landingPref.type;
    if (lan_type === undefined) {
      if (lan_type === "dashboard") {
        this.showDashboard();
      } else if (lan_type === "report") {
        var rt_name = this.state.landingPref.report.value;
        this.showReportCompo(rt_name);
        this.showReportCompoNew();
      } else if (lan_type === "checklist") {
        this.showChecklistCompo();
      } else if (lan_type === "uipage") {
        this.showUiPageCompo("initial");
        // this.showHtmlPage(
        //   {
        //     filter: [
        //       {
        //         co: "name",
        //         cl: "Name",
        //         mc: "=",
        //         an: "uipage",
        //         ct: "String",
        //         af: "",
        //         rf: {
        //           id: "",
        //           value: "",
        //         },
        //       },
        //     ],
        //   },
        //   this.state.record
        // );
      } else {
        this.showDashboard();
      }
    } else {
      this.showDashboard();
    }
  }

  showReportCompo(name, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.name = name;
      this.storeInHistory(obj, "showReportCompo");
    }
    this.setState({
      report_name: name,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showReportCompoNew(nam, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.nam = nam;
      this.storeInHistory(obj, "showReportCompoNew");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      report_name: nam,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false
    );
  }

  showDashboard(bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      this.storeInHistory(obj, "showDashboard");
    }
    this.showFunction(
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );

  }

  showSortCompo(tab, url, name, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.tab = tab;
      obj.url = url;
      obj.name = name
      this.storeInHistory(obj, "showSortCompo");
    }
    this.showFunction(
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
    this.setState({
      sorted_name: tab,
      url: url,
      taskName: name
    });
  }

  showListCompo(name, fil, tm, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.name = name;
      obj.fil = fil;
      obj.tm = tm;
      this.storeInHistory(obj, "showListCompo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      tabname: name,
      filter: fil,
      timeline: tm,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showOtherCompo(nam, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.nam = nam;
      this.storeInHistory(obj, "showOtherCompo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
    });
    if ("report") {
      this.showFunction(
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      );
    }
  }

  showFormCompo(nam, recordid, ty, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.nam = nam;
      obj.recordid = recordid;
      obj.ty = ty;
      this.storeInHistory(obj, "showFormCompo");
    }
    var isMob = this.state.isMobile ? false : true;

    this.setState({
      tabname: nam,
      rid: recordid,
      formRecordType: ty,
      showLeftPane: isMob,
      showNotificationCompo: false,
    });
    this.showFunction(
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showPropCompo(bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      this.storeInHistory(obj, "showPropCompo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showMultiCompo(nam, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.nam = nam;
      this.storeInHistory(obj, "showMultiCompo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      tabname: nam,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showMultiPage(nam, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.nam = nam;
      this.storeInHistory(obj, "showMultiPage");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      tabname: nam,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showClientReg(nam, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.nam = nam;
      this.storeInHistory(obj, "showClientReg");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      tabname: nam,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showOwnerPrefComp(nam, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.nam = nam;
      this.storeInHistory(obj, "showOwnerPrefComp");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      tabname: nam,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showThemeCompo(bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      this.storeInHistory(obj, "showThemeCompo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showViewCompo(nam, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.nam = nam;
      this.storeInHistory(obj, "showViewCompo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      tabname: nam,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showMultiTable(nam, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.nam = nam;
      this.storeInHistory(obj, "showMultiTable");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      mt_name: nam,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showChecklistCompo(bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      this.storeInHistory(obj, "showChecklistCompo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showInventoryCompo(lt, fil, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.lt = lt;
      obj.fil = fil;
      this.storeInHistory(obj, "showInventoryCompo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      // filter: fil,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showClientInfo(fil, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.fil = fil;
      this.storeInHistory(obj, "showClientInfo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      filter: fil,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showClientInfoRec(nam, recordid, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.nam = nam;
      obj.recordid = recordid;
      this.storeInHistory(obj, "showClientInfoRec");
    }
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
    this.setState({
      tabname: nam,
      rid: recordid,
    });
  }

  showRoleSelectionCompo(id, rt, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.id = id;
      obj.rt = rt;
      this.storeInHistory(obj, "showRoleSelectionCompo");
    }
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
    this.setState({
      i_d: id,
      rt: rt,
    });
  }

  showHtmlPage(filter, record, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.filter = filter;
      obj.record = record;
      this.storeInHistory(obj, "showHtmlPage");
    }
    this.setState({ filter: filter, record: record });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showUiPageCompo(name, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.name = name;
      this.storeInHistory(obj, "showUiPageCompo");
    }
    this.setState({ name: name });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showVariableCompo(filter, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.filter = filter;
      this.storeInHistory(obj, "showVariableCompo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      filter: filter,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showStatusCompo(bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      this.storeInHistory(obj, "showStatusCompo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showTabularReport(id, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.id = id;
      this.storeInHistory(obj, "showTabularReport");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
      rid: id,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showViewTabularReport(name, fil, tm, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.name = name;
      obj.fil = fil;
      obj.tm = tm;
      this.storeInHistory(obj, "showViewTabularReport");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      tabname: name,
      filter: fil,
      timeline: tm,
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showMaterialCompo(bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      this.storeInHistory(obj, "showMaterialCompo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showIncomeExpense(bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      this.storeInHistory(obj, "showIncomeExpense");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false
    );
  }

  showWorkerInfo(id, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.id = id;
      this.storeInHistory(obj, "showWorkerInfo");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
      rid: id,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false
    );
  }

  showViewSalary(id, bck) {
    if (bck === undefined) {
      this.checkHistorySize();
      let obj = {};
      obj.id = id;
      this.storeInHistory(obj, "showViewSalary");
    }
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
      rid: id,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false
    );
  }

  showErrorCompo(error) {
    var isMob = this.state.isMobile ? false : true;
    if (error === undefined) {
      this.setState({ location: "null" });
    } else {
      this.setState({ location: error });
    }
    this.setState({
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
    );
  }

  showInitialSetupCompo() {
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false
    );
  }

  showUserInfoCompo() {
    var isMob = this.state.isMobile ? false : true;
    this.setState({
      showLeftPane: isMob,
    });
    this.showFunction(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    );
  }

  // showLoginCompo() {
  //   this.showLoginFunction(true, false, false, false, false, false, false);
  // }

  showRegister() {
    this.showLoginFunction(false, true, false, false, false, false, false);
  }

  showForgetPassword() {
    this.showLoginFunction(false, false, true, false, false, false, false);
  }

  showGenerateNewPin() {
    this.showLoginFunction(false, false, false, true, false, false, false);
  }

  showOtpVerification() {
    this.showLoginFunction(false, false, false, false, true, false, false);
  }

  showNewPassword(op, un) {
    this.setState({
      op: op,
      un: un,
    });
    this.showLoginFunction(false, false, false, false, false, true, false);
  }

  showMainCompo(userinfo) {
    this.setState({ userinfo: userinfo });
    this.showLoginFunction(false, false, false, false, false, false, true);
    if (!this.state.showlogin) {
      this.getImpsUserInfo();
    }
  }

  showNotificationCompo(cnt) {
    this.setState({
      cnt: cnt,
      showNotificationCompo: true,
    });
  }

  gotoBackAndRight(isBackAndRght) {
    let methodName;
    let obj;
    /*   if(this.state.counter2===this.state.counter1){ */
    /*    if(isBackAndRght==="back"){

    methodName = this.state.backMethod.get(this.state.counter2-2)
      obj =this.state.back.get(this.state.counter2-2) //  2-2  0
      if(this.state.counter2>this.state.backLastIndex)//  backLastIndex --> 1
       this.setState({counter2: this.state.counter2-1})
   }else{
    methodName = this.state.backMethod.get(this.state.counter2)
    obj =this.state.back.get(this.state.counter2)
    if(this.state.counter2 < this.state.counter1)
      this.setState({counter2: this.state.counter2+1})

   } */

    /*   }else{
      methodName = this.state.backMethod.get(this.state.counter2-1)
      obj =this.state.back.get(this.state.counter2-1)
      this.setState({counter2: this.state.counter2-1})
    } */

    if (isBackAndRght === "back") {
      methodName = this.state.backMethod.get(this.state.counter2 - 2);
      obj = this.state.back.get(this.state.counter2 - 2); //  2-2  0
      const [[firstKey1, firstValue1]] = this.state.back.entries();
      if (this.state.counter2 > firstKey1 + 1)
        this.setState({ counter2: this.state.counter2 - 1 });
    } else {
      methodName = this.state.backMethod.get(this.state.counter2);
      obj = this.state.back.get(this.state.counter2);
      if (this.state.counter2 < this.state.counter1)
        this.setState({ counter2: this.state.counter2 + 1 });
    }

    switch (methodName) {
      case "showReportCompo":
        this.showReportCompo(obj.name, "bck");
        break;
      case "showReportCompoNew":
        this.showReportCompoNew(obj.nam, "bck");
        break;
      case "showDashboard":
        this.showDashboard("bck");
        break;
      case "showSortCompo":
        this.showSortCompo(obj.tab, obj.url, obj.name, "bck");
        break;
      case "showListCompo":
        this.showListCompo(obj.name, obj.fil, obj.tm, "bck");
        break;
      case "showOtherCompo":
        this.showOtherCompo(obj.nam, "bck");
        break;
      case "showFormCompo":
        this.showFormCompo(obj.nam, obj.recordid, obj.ty, "bck");
        break;
      case "showPropCompo":
        this.showPropCompo("bck");
        break;
      case "showMultiCompo":
        this.showMultiCompo(obj.nam, "bck");
        break;
      case "showMultiPage":
        this.showMultiPage(obj.nam, "bck");
        break;
      case "showClientReg":
        this.showClientReg(obj.nam, "bck");
        break;
      case "showOwnerPrefComp":
        this.showOwnerPrefComp(obj.nam, "bck");
        break;
      case "showThemeCompo":
        this.showThemeCompo("bck");
        break;
      case "showViewCompo":
        this.showViewCompo(obj.nam, "bck");
        break;
      case "showMultiTable":
        this.showMultiTable(obj.nam, "bck");
        break;
      case "showChecklistCompo":
        this.showChecklistCompo("bck");
        break;
      case "showInventoryCompo":
        this.showInventoryCompo(obj.lt, obj.fil, "bck");
        break;
      case "showClientInfo":
        this.showClientInfo(obj.fil, "bck");
        break;
      case "showClientInfoRec":
        this.showClientInfoRec(obj.nam, obj.recordid, "bck");
        break;
      case "showRoleSelectionCompo":
        this.showRoleSelectionCompo(obj.id, obj.rt, "bck");
        break;
      case "showHtmlPage":
        this.showHtmlPage(obj.filter, obj.record, "bck");
        break;
      case "showUiPageCompo":
        this.showUiPageCompo(obj.name, "bck");
        break;
      case "showVariableCompo":
        this.showVariableCompo(obj.filter, "bck");
        break;
      case "showStatusCompo":
        this.showStatusCompo("bck");
        break;
      case "showTabularReport":
        this.showTabularReport(obj.id, "bck");
        break;
      case "showViewTabularReport":
        this.showViewTabularReport(obj.name, obj.fil, obj.tm, "bck");
        break;
      case "showMaterialCompo":
        this.showMaterialCompo("bck");
        break;
      case "showIncomeExpense":
        this.showIncomeExpense("bck");
        break;
      case "showWorkerInfo":
        this.showWorkerInfo(obj.id, "bck");
        break;
      case "showViewSalary":
        this.showViewSalary(obj.id, "bck");
        break;
      default:
        break;
    }
  }

  sendLandingPref(lanPref) {
    console.log(lanPref);
    this.setState({ landingPref: lanPref });
    if (lanPref !== undefined) {
      var lan_type = this.state.landingPref.type;
      if (lan_type === "dashboard") {
        this.showDashboard();
      } else if (lan_type === "report") {
        var rt_name = this.state.landingPref.report.value;
        this.showReportCompo(rt_name);
        this.showReportCompoNew();
      } else if (lan_type === "checklist") {
        this.showChecklistCompo();
      } else if (lan_type === "uipage") {
        this.showUiPageCompo("initial");
        // this.showHtmlPage(
        //   {
        //     filter: [
        //       {
        //         co: "name",
        //         cl: "Name",
        //         mc: "=",
        //         an: "uipage",
        //         ct: "String",
        //         af: "",
        //         rf: {
        //           id: "",
        //           value: "",
        //         },
        //       },
        //     ],
        //   },
        //   this.state.record
        // );
      } else {
        this.showDashboard();
      }
    } else {
      this.showDashboard();
    }
  }

  showFunction(
    dash,
    sort,
    list,
    form,
    report,
    multiInsert,
    multiPage,
    clien_reg,
    properties,
    ownerPref,
    theme,
    multiTable,
    checklist,
    view,
    clientinfo,
    clientInfoRec,
    roleSelection,
    htmlpage,
    landingPref,
    uiPage,
    variable,
    status,
    tabularReport,
    viewReport,
    inventory,
    materialCompo,
    incomeExpense,
    workerInfo,
    viewSalary,
    errorCompo,
    initialSetup,
    report_new,
    user_info,
  ) {
    this.setState({
      callDash: dash,
      showSortedCompo: sort,
      showListCompo: list,
      showFormCompo: form,
      showReportCompo: report,
      showMultiInsert: multiInsert,
      showMultiPage: multiPage,
      showClientReg: clien_reg,
      showPropCompo: properties,
      showOwnerPrefComp: ownerPref,
      showThemeCompo: theme,
      showMultiTable: multiTable,
      showChecklistCompo: checklist,
      showViewCompo: view,
      showClientInfo: clientinfo,
      showClientInfoRec: clientInfoRec,
      showRoleSelectionCompo: roleSelection,
      showHtmlPage: htmlpage,
      sendLandingPref: landingPref,
      showUiPageCompo: uiPage,
      showVariableCompo: variable,
      showStatusCompo: status,
      showTabularReport: tabularReport,
      showViewTabularReport: viewReport,
      showInventoryCompo: inventory,
      showMaterialCompo: materialCompo,
      showIncomeExpense: incomeExpense,
      showWorkerInfo: workerInfo,
      showViewSalary: viewSalary,
      showErrorCompo: errorCompo,
      showInitialSetupCompo: initialSetup,
      showReportCompoNew: report_new,
      showUserInfoCompo: user_info,
    });
  }

  showLoginFunction(
    login,
    register,
    forget,
    newpin,
    otpvrf,
    newpass,
    maincompo
  ) {
    this.setState({
      showLoginCompo: login,
      showRegister: register,
      showForgetPassword: forget,
      showGenerateNewPin: newpin,
      showOtpVerification: otpvrf,
      showNewPassword: newpass,
      // showMainCompo: maincompo,
    });
  }

  handleLogin() {
    this.setState({ showlogin: false });
  }

  handleDashboard() {
    this.setState({ callDash: false });
  }

  handleListCompo() {
    this.setState({ showListCompo: false });
  }

  handleOtherCompo() {
    this.setState({ showOtherCompo: false });
  }

  handleSortCompo() {
    this.setState({ showSortedCompo: false });
  }

  handleMultiCompo() {
    this.setState({ showMultiCompo: false });
  }

  handleFormCompo() {
    this.setState({ showFormCompo: false });
  }

  handleMultiPage() {
    this.setState({ showMultiPage: false });
  }

  handleClientReg() {
    this.setState({ showClientReg: false });
  }

  handleNewPassword() {
    this.setState({ showNewPassword: false });
  }

  handleOtpVerification() {
    this.setState({ showOtpVerification: false });
  }

  handleGenerateNewPin() {
    this.setState({ showGenerateNewPin: false });
  }

  handleForgetPassword() {
    this.setState({ showForgetPassword: false });
  }

  handleViewCompo() {
    this.setState({ showViewCompo: false });
  }

  handleMultiTable() {
    this.setState({ showMultiTable: false });
  }

  handleThemeCompo() {
    this.setState({ showThemeCompo: false });
  }

  handleChecklistCompo() {
    this.setState({ showChecklistCompo: false });
  }

  handleInventoryCompo() {
    this.setState({ showInventoryCompo: false });
  }

  handleInitialSetupCompo() {
    this.setState({ showInitialSetupCompo: false });
  }

  handleUserInfoCompo() {
    this.setState({ showUserInfoCompo: false });
  }

  handleOwnerPrefComp() {
    this.setState({ showOwnerPrefComp: false });
  }

  handleReportCompo() {
    this.setState({ showReportCompo: false });
  }

  handleReportCompoNew() {
    this.setState({ showReportCompoNew: false });
  }

  handleRegisterCompo() {
    this.setState({ showRegister: false });
  }

  handleClientInfo() {
    this.setState({ showClientInfo: false });
  }

  handleClientInfoRec() {
    this.setState({ showClientInfoRec: false });
  }

  handleRoleSelectionCompo() {
    this.setState({ showRoleSelectionCompo: false });
  }

  handleHtmlPage() {
    this.setState({ showHtmlPage: false });
  }

  handleSendLandingPref() {
    this.setState({ sendLandingPref: false });
  }

  handleUiPageCompo() {
    this.setState({ showUiPageCompo: false });
  }

  handleNotificationCompo() {
    this.setState({ showNotificationCompo: false });
  }

  handleVariableCompo() {
    this.setState({ showVariableCompo: false });
  }

  handleStatusCompo() {
    this.setState({ showStatusCompo: false });
  }

  handleTabularReport() {
    this.setState({ showTabularReport: false });
  }

  handleViewTabularReport() {
    this.setState({ showViewTabularReport: false });
  }

  handleMaterialCompo() {
    this.setState({ showMaterialCompo: false });
  }

  handleIncomeExpense() {
    this.setState({ showIncomeExpense: false });
  }

  handleWorkerInfo() {
    this.setState({ showWorkerInfo: false });
  }

  handleViewSalary() {
    this.setState({ showViewSalary: false });
  }

  handleErrorCompo() {
    this.setState({ showErrorCompo: false });
  }

  handleLeftNavCompo() {
    this.setState({
      showListCompo: false,
      showFormCompo: false,
      callDash: false,
      showSortedCompo: false,
      showPropCompo: false,
    });
    window.scroll({ top: 0, behavior: "smooth" });
  }

  handleLeftPane() {
    this.setState({ showLeftPane: !this.state.showLeftPane });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("tableName");
    this.setState({
      showlogin: true,
      showRegister: false,
      isOpen: false,
      showLoginCompo: true,
    });
  }

  goBack() {
    this.setState({ showRegister: false, showLoginCompo: true });
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  openList() {
    this.setState({ adminPanel: true });
  }

  closeList() {
    this.setState({ adminPanel: false });
  }

  async getImpsUserInfo() {
    var token = localStorage.getItem("token");
    await axios
      .get(this.state.loca + "/loom/get/userinfo/record", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        const record = resp.data;
        console.log(record);
        if (record !== null && record !== "" && record !== "undefined") {
          this.setState({ setRecord: record });
          if (record.admin === "true") {
            this.setState({ impersonate_name: record.adminClient.value });
          } else if (record.client.value !== null && record.user === "false") {
            if (window.screen.width > 500) {
              this.setState({
                impersonate_name: "Impersonated With " + record.client.value,
              });
            } else {
              const nameParts = record.client.value.split(" "); // Split the string at the first space
              const firstName = nameParts[0];
              this.setState({
                // impersonate_name: "IM " + record.client.value,
                impersonate_name: "IM " + firstName,
              });
            }
          } else if (
            record.user === "true" &&
            record.impersonateUser.value !== null
          ) {
            if (window.screen.width > 500) {
              this.setState({
                impersonate_name:
                  "Impersonated With " + record.impersonateUser.value,
              });
            } else {
              const nameParts = record.impersonateUser.value.split(" "); // Split the string at the first space
              const firstName = nameParts[0];
              this.setState({
                // impersonate_name: "IM " + record.impersonateUser.value,
                impersonate_name: "IM " + firstName,
              });
            }
          }
        }
      });
    this.getInitialData().then((data) => { });
  }

  async getInitialData() {
    var token = localStorage.getItem("token");
    await axios
      .get(this.state.loca + "/loom/get/Notification", {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        let result = resp.data;
        this.setState({
          msg: result.notification.messages,
          cnt: result.notification.count,
        });
      });
    this.getContextMenu();
  }

  getContextMenu() {
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/fetch/contextMenu", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        this.setState({
          contextMenu: resp.data,
          loading: false,
        });
        console.log(this.state.contextMenu);
      });
    this.getLabelContext();
  }

  getLabelContext() {
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/fetch/labelContext", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        this.setState({
          labelContext: resp.data,
          loading: false,
        });
      });
  }

  // handleTouchStart() {
  //   window.ReactNativeWebView.postMessage(
  //     JSON.stringify({ disableRefresh: true })
  //   );
  // }

  // handleTouchEnd() {
  //   window.ReactNativeWebView.postMessage(
  //     JSON.stringify({ disableRefresh: false })
  //   );
  // }

  // handleTouchMove() {
  //   window.ReactNativeWebView.postMessage(
  //     JSON.stringify({ disableRefresh: false })
  //   );
  // }

  // handleScroll() {
  //   window.ReactNativeWebView.postMessage(
  //     JSON.stringify({ disableRefresh: false })
  //   );
  // }

  //the below function is responsible for handling the scroll refresh behaviour on our left side navigation
  componentDidUpdate(prevProps, prevState) {
    // const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
    // if (isAndroid) {
    //   if (prevState.showLeftPane !== this.state.showLeftPane) {
    //     const disableRefreshReact = !this.state.showLeftPane ? false : true;
    //     window.ReactNativeWebView.postMessage(
    //       JSON.stringify({ disableRefresh: disableRefreshReact })
    //     );
    //   }
    // }
  }

  render() {
    return (
      <div ref={this.myRef} id="partop">
        <ToastContainer
          toastStyle={{ marginTop: "2vh" }}
          position="top-center"
          autoClose={1800}
        />
        <div className="mainTopBar" id="maintop" ref={this.mainTop}>
          {!this.state.showlogin && (
            <div>
              {this.state.isMobile ? (
                <div className="disfl mainbgcolor gutter main-div">
                  <div className="fl1 no_pad">
                    <div className="marleft10">
                      <span className="homeicon">
                        <span>
                          <i
                            className=" backic fa fa-arrow-left bck_btt_mrg"
                            aria-hidden="true"
                            onClick={() => {
                              this.gotoBackAndRight("back");
                            }}
                            style={{
                              position: "relative",
                              bottom: "3px",
                              fontSize: "19px",
                            }}
                          ></i>
                        </span>
                        <span>
                          <i
                            className=" backic fa fa-arrow-right bck_btt_mrg"
                            aria-hidden="true"
                            onClick={() => {
                              this.gotoBackAndRight("right");
                            }}
                            style={{
                              position: "relative",
                              bottom: "3px",
                              fontSize: "19px",
                              marginRight: "8px",
                            }}
                          ></i>
                        </span>
                        <span>
                          <i
                            className="fa fa-home home_top"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Home"
                            aria-hidden="true"
                            onClick={this.callhome}
                            style={{
                              top: "0px"
                            }}
                          ></i>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="fl ">
                    <div className="rig mx-2">

                      {this.state.userinfo.admin === "true" ? (
                        <span className="u-name text-capitalize">
                          {this.state.impersonate_name}
                        </span>
                      ) : (
                        <span className="u-name text-capitalize">
                          {this.state.userinfo.name}
                        </span>
                      )}
                      <span className="usericon">
                        <i
                          className="fa fa-user-circle-o"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Profile"
                          onClick={this.openModal}
                        ></i>
                      </span>
                      <span className="usericon">
                        <i
                          className="fa fa-bell"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notification"
                          aria-hidden="true"
                          onClick={this.showNotificationCompo}
                        >
                          {this.state.cnt > 0 && (
                            <span className="span-cnt">{this.state.cnt}</span>
                          )}
                        </i>
                      </span>
                      {this.state.userinfo.admin === "true" && (
                        <span className="usericon">
                          <i
                            className="fa fa-bars"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Impersonate"
                            aria-hidden="true"
                            onClick={this.openList}
                          ></i>
                        </span>
                      )}
                    </div>
                  </div>
                  {/* <div className="col-md-2 no_pad">
                <input
                  type="button"
                  className="btn btn-danger"
                  value="Logout"
                  onClick={this.logout}
                  style={{ padding: "0px 5px" }}
                ></input>
              </div> */}
                </div>
              ) : (
                <div className="disfl mainbgcolor gutter">
                  <div className="fl1 no_pad">
                    {/* <div className="marleft10"> */}
                    <div style={{ margin: "0px 30px" }}>
                      <div className="homeicon" style={{ display: "flex" }}>
                        <span>
                          <i
                            className=" backic fa fa-arrow-left bck_btt_mrg"
                            aria-hidden="true"
                            onClick={() => {
                              this.gotoBackAndRight("back");
                            }}
                            style={{
                              position: "relative",
                              bottom: "3px",
                              fontSize: "19px",
                            }}
                          ></i>
                        </span>
                        <span>
                          <i
                            className=" backic fa fa-arrow-right bck_btt_mrg"
                            aria-hidden="true"
                            onClick={() => {
                              this.gotoBackAndRight("right");
                            }}
                            style={{
                              position: "relative",
                              bottom: "3px",
                              fontSize: "19px",
                              marginRight: "8px",
                            }}
                          ></i>
                        </span>
                        <span>
                          <i
                            className="fa fa-home home_top"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Home"
                            aria-hidden="true"
                            onClick={this.callhome}
                          ></i>
                        </span>
                        <p className="loom_text">Loomweb</p>
                      </div>
                    </div>
                  </div>
                  <div className="fl2">
                    <div className="rig mx-4">

                      {this.state.userinfo.admin === "true" ? (
                        <span className="u-name text-capitalize">
                          {this.state.impersonate_name}
                        </span>
                      ) : (
                        <span className="u-name text-capitalize">
                          {this.state.userinfo.name}
                        </span>
                      )}
                      <span className="usericon">
                        <i
                          className="fa fa-user-circle-o"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Profile"
                          onClick={this.openModal}
                        ></i>
                      </span>
                      <span className="usericon">
                        <i
                          className="fa fa-bell"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Notification"
                          onClick={this.showNotificationCompo}
                        // onClick={this.showListCompo}
                        >
                          {this.state.cnt > 0 && (
                            <span className="span-cnt">{this.state.cnt}</span>
                          )}
                        </i>
                      </span>
                      {this.state.userinfo.admin === "true" && (
                        <span className="usericon">
                          <i
                            className="fa fa-bars"
                            aria-hidden="true"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Impersonate"
                            onClick={this.openList}
                          ></i>
                        </span>
                      )}
                    </div>
                  </div>
                  {/* <div className="col-md-2 no_pad">
                <input
                  type="button"
                  className="btn btn-danger"
                  value="Logout"
                  onClick={this.logout}
                  style={{ padding: "0px 5px" }}
                ></input>
              </div> */}
                </div>
              )}
            </div>
          )}
        </div>
        {this.state.showlogin ? (
          <div>
            {this.state.showRegister ? (
              <RegisterComponent
                isMobile={this.state.isMobile}
                unmountMe={this.handleRegisterCompo}
                showLogin={this.showLogin}
                // login={this.state.showlogin}
                // register={this.state.showRegister}
                type={this.state.registerType}
                language={this.state.language}
                loca={this.state.loca}
                showOtpVerification={() => this.showOtpVerification()}
              ></RegisterComponent>
            ) : null}
            {this.state.showLoginCompo ? (
              <Login
                unmountMe={this.handleLogin}
                // showDash={this.showDashboard}
                isMobile={this.state.isMobile}
                language={this.state.language}
                showRegister={(lang, rtype) => this.registerCompo(lang, rtype)}
                showForgetPassword={() => this.showForgetPassword()}
                showNewPassword={(op, un) => this.showNewPassword(op, un)}
                showMainCompo={(userinfo) => this.showMainCompo(userinfo)}
                reg = {this.state.regis}
                loca={this.state.loca}
              ></Login>
            ) : null}
            {this.state.showForgetPassword ? (
              <ForgetPassword
                isMobile={this.state.isMobile}
                unmountMe={this.handleForgetPassword}
                showLogin={() => this.showLogin()}
                showOtpVerification={() => this.showOtpVerification()}
                loca={this.state.loca}
              ></ForgetPassword>
            ) : null}
            {this.state.showGenerateNewPin ? (
              <GenerateNewPin
                isMobile={this.state.isMobile}
                unmountMe={this.handleGenerateNewPin}
                showLogin={() => this.showLogin()}
                loca={this.state.loca}
              ></GenerateNewPin>
            ) : null}
            {this.state.showOtpVerification ? (
              <OtpVerification
                isMobile={this.state.isMobile}
                unmountMe={this.handleOtpVerification}
                showForgetPassword={() => this.showForgetPassword()}
                showGenerateNewPin={() => this.showGenerateNewPin()}
                loca={this.state.loca}
                showLogin={(val) => this.showLogin(val)}
              ></OtpVerification>
            ) : null}
            {this.state.showNewPassword ? (
              <SetNewPassword
                isMobile={this.state.isMobile}
                unmountMe={this.handleNewPassword}
                showLogin={() => this.showLogin()}
                op={this.state.op}
                un={this.state.un}
                loca={this.state.loca}
              ></SetNewPassword>
            ) : null}
          </div>
        ) : (
          <div>
            <div
              className={this.state.showLeftPane ? "" : "left_icon_zero"}
              onClick={this.handleLeftPane}
            >
              {this.state.showLeftPane ? null : (
                <i className="fa fa-arrow-right"></i>
              )}
            </div>
            <div className="row" style={{ "--bs-gutter-x": "0px" }}>
              <div
                id="refresh-disabled"
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
                onTouchCancel={this.handleTouchEnd}
                onTouchMove={this.handleTouchMove}
                onScroll={this.handleScroll}
                className={`${this.state.showLeftPane &&
                  !this.state.isMobile &&
                  window.screen.width > 1200
                  ? "cl_small"
                  : this.state.showLeftPane && this.state.isMobile
                    ? "cl_small_mob"
                    : this.state.showLeftPane &&
                      !this.state.isMobile &&
                      window.screen.width > 767
                      ? "cl_tab"
                      : "cl_no"
                  }`}
                style={{
                  paddingRight: "0px",
                  height: this.state.height,
                  maxHeight: this.state.height,
                  borderTop: "0px",
                }}
              >
                <div className="">
                  <LeftNav
                    showListCompo={(nm, fil, tm) =>
                      this.showListCompo(nm, fil, tm)
                    }
                    showFormCompo={(nm, recordid, ty) =>
                      this.showFormCompo(nm, recordid, ty)
                    }
                    height={this.state.height}
                    showOtherCompo={(nm) => this.showOtherCompo(nm)}
                    showOwnerPrefComp={(nm) => this.showOwnerPrefComp(nm)}
                    showThemeCompo={(nm) => this.showThemeCompo(nm)}
                    showMultiCompo={(nm) => this.showMultiCompo(nm)}
                    showMultiPage={(nm) => this.showMultiPage(nm)}
                    showClientReg={(nm) => this.showClientReg(nm)}
                    showViewCompo={(nm) => this.showViewCompo(nm)}
                    showMultiTable={(nm) => this.showMultiTable(nm)}
                    showClientInfo={(nm) => this.showClientInfo(nm)}
                    sendLandingPref={(lanpref) => this.sendLandingPref(lanpref)}
                    showUiPageCompo={(name) => this.showUiPageCompo(name)}
                    showPropCompo={() => this.showPropCompo()}
                    showChecklistCompo={() => this.showChecklistCompo()}
                    showInventoryCompo={() => this.showInventoryCompo()}
                    showInitialSetupCompo={() => this.showInitialSetupCompo()}
                    showReportCompoNew={this.showReportCompoNew}
                    // nam, recordid, ty
                    showStatusCompo={this.showStatusCompo}
                    showTabularReport={this.showTabularReport}
                    showViewTabularReport={(nm, fil, tm) =>
                      this.showViewTabularReport(nm, fil, tm)
                    }
                    showUserInfoCompo={this.showUserInfoCompo}
                    showVariableCompo={(fil) => this.showVariableCompo(fil)}
                    showMaterialCompo={this.showMaterialCompo}
                    showIncomeExpense={this.showIncomeExpense}
                    showWorkerInfo={this.showWorkerInfo}
                    showViewSalary={this.showViewSalary}
                    unmountMe={this.handleLeftNavCompo}
                    handleLeftPane={this.handleLeftPane}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                  ></LeftNav>
                </div>
              </div>

              <div
                // className={
                //   this.state.showLeftPane
                //     ? !this.state.isMobile
                //       ? "cl_big"
                //       : "cl_yes"
                //     : this.state.isMobile
                //     ? "cl_yes_mob"
                //     : // : "cl_yes_mob"
                //       ""
                // }
                className={
                  this.state.showLeftPane &&
                    !this.state.isMobile &&
                    window.screen.width > 1200
                    ? "cl_big"
                    : this.state.showLeftPane && this.state.isMobile
                      ? "cl_yes_mob"
                      : this.state.showLeftPane &&
                        !this.state.isMobile &&
                        window.screen.width > 767
                        ? "cl_yes_tab"
                        : ""
                }
                style={{
                  height: this.state.height,
                  maxHeight: this.state.height,
                }}
              >
                {this.state.callDash ? (
                  <Dashboard
                    showSortCompo={(tab, url, name) => this.showSortCompo(tab, url, name)}
                    myDash={true}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                    showFormCompo={(nm, rid, ty) =>
                      this.showFormCompo(nm, rid, ty)
                    }
                    showListCompo={(nm, fil, tm) =>
                      this.showListCompo(nm, fil, tm)
                    }
                    showOtherCompo={(nm) => this.showOtherCompo(nm)}
                    showOwnerPrefComp={(nm) => this.showOwnerPrefComp(nm)}
                    showThemeCompo={(nm) => this.showThemeCompo(nm)}
                    showMultiCompo={(nm) => this.showMultiCompo(nm)}
                    showMultiPage={(nm) => this.showMultiPage(nm)}
                    showClientReg={(nm) => this.showClientReg(nm)}
                    showViewCompo={(nm) => this.showViewCompo(nm)}
                    showMultiTable={(nm) => this.showMultiTable(nm)}
                    showClientInfo={(nm) => this.showClientInfo(nm)}
                    sendLandingPref={(lanpref) => this.sendLandingPref(lanpref)}
                    showUiPageCompo={(name) => this.showUiPageCompo(name)}
                    showPropCompo={() => this.showPropCompo()}
                    showChecklistCompo={() => this.showChecklistCompo()}
                    showInventoryCompo={() => this.showInventoryCompo()}
                    showInitialSetupCompo={() => this.showInitialSetupCompo()}
                    showReportCompoNew={this.showReportCompoNew}
                    // nam, recordid, ty
                    showStatusCompo={this.showStatusCompo}
                    showTabularReport={this.showTabularReport}
                    showViewTabularReport={(nm, fil, tm) =>
                      this.showViewTabularReport(nm, fil, tm)
                    }
                    showVariableCompo={(fil) => this.showVariableCompo(fil)}
                    showMaterialCompo={this.showMaterialCompo}
                    showIncomeExpense={this.showIncomeExpense}
                    showWorkerInfo={this.showWorkerInfo}
                    showViewSalary={this.showViewSalary}
                  ></Dashboard>
                ) : null}
                {this.state.showSortedCompo ? (
                  <SortComponent
                    sortedName={this.state.sorted_name}
                    url={this.state.url}
                    showListCompo={(nm, fil, tm) =>
                      this.showListCompo(nm, fil, tm)
                    }
                    showFormCompo={(nm, rid, ty) =>
                      this.showFormCompo(nm, rid, ty)
                    }
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                    callhome={() => this.callhome()}
                    taskName={this.state.taskName}
                  ></SortComponent>
                ) : null}
                {this.state.showListCompo ? (
                  <ListComponent
                    unmountMe={this.handleListCompo}
                    listName={this.state.tabname}
                    timeline={this.state.timeline}
                    filter={this.state.filter}
                    showFormCompo={(nm, rid, ty) =>
                      this.showFormCompo(nm, rid, ty)
                    }
                    ty={this.state.formRecordType}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    contextMenu={this.state.contextMenu}
                    labelContext={this.state.labelContext}
                    showListCompo={(nm, fil, tm) =>
                      this.showListCompo(nm, fil, tm)
                    }
                    showViewCompo={this.showViewCompo}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></ListComponent>
                ) : null}
                {this.state.showReportCompo ? (
                  <ReportComponent
                    reportName={this.state.report_name}
                    unmountMe={this.handleReportCompo}
                    loca={this.state.loca}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></ReportComponent>
                ) : null}
                {this.state.showReportCompoNew ? (
                  <ReportComponentNew
                    reportName={this.state.report_name}
                    unmountMe={this.handleReportCompoNew}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></ReportComponentNew>
                ) : null}
                {this.state.showFormCompo ? (
                  <FormComponent
                    showListCompo={(nm, fil, tm) =>
                      this.showListCompo(nm, fil, tm)
                    }
                    unmountMe={this.handleFormCompo}
                    tabname={this.state.tabname}
                    rid={this.state.rid}
                    ty={this.state.formRecordType}
                    isMobile={this.state.isMobile}
                    showFormCompo={(nm, rid, ty) =>
                      this.showFormCompo(nm, rid, ty)
                    }
                    showClientInfoRec={(nm, rid) =>
                      this.showClientInfoRec(nm, rid)
                    }
                    i_d={this.state.i_d}
                    showRoleSelectionCompo={(id, rt) =>
                      this.showRoleSelectionCompo(id, rt)
                    }
                    showMainCompo={(userinfo) => this.showMainCompo(userinfo)}
                    showHtmlPage={(filter, record) =>
                      this.showHtmlPage(filter, record)
                    }
                    loca={this.state.loca}
                    contextMenu={this.state.contextMenu}
                    labelContext={this.state.labelContext}
                    showViewCompo={this.showViewCompo}
                    showStatusCompo={this.showStatusCompo}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                    showNotificationCompo={(cnt) =>
                      this.showNotificationCompo(cnt)
                    }

                  // showIncomeExpense={this.showIncomeExpense}
                  ></FormComponent>
                ) : null}
                {this.state.showMultiInsert ? (
                  <MultiInsert
                    unmountMe={this.handleMultiCompo}
                    tabName={this.state.tabname}
                    showListCompo={(nm, fil, tm) =>
                      this.showListCompo(nm, fil, tm)
                    }
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></MultiInsert>
                ) : null}
                {this.state.showMultiPage ? (
                  <Multipage
                    unmountMe={this.handleMultiPage}
                    tabname={this.state.tabname}
                    showListCompo={(nm, fil, tm) =>
                      this.showListCompo(nm, fil, tm)
                    }
                    loca={this.state.loca}
                  ></Multipage>
                ) : null}
                {this.state.showClientReg ? (
                  <ClientRegistration
                    unmountMe={this.handleClientReg}
                    tabName={this.state.tabname}
                    loca={this.state.loca}
                  ></ClientRegistration>
                ) : null}
                {this.state.showPropCompo ? (
                  <PropertiesComponent
                    loca={this.state.loca}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></PropertiesComponent>
                ) : null}
                {this.state.showOwnerPrefComp ? (
                  <OwnerPreference
                    unmountMe={this.handleOwnerPrefComp}
                    tabName={this.state.tabname}
                    loca={this.state.loca}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></OwnerPreference>
                ) : null}
                {this.state.showThemeCompo ? (
                  <ThemeDesignComponent
                    unmountMe={this.handleThemeCompo}
                    loca={this.state.loca}
                  // tabName={this.state.tabname}
                  ></ThemeDesignComponent>
                ) : null}
                {this.state.showViewCompo ? (
                  <FormViewComponent
                    unmountMe={this.handleViewCompo}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    showListCompo={(nm, fil, tm) =>
                      this.showListCompo(nm, fil, tm)
                    }
                    listname={this.state.tabname}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></FormViewComponent>
                ) : null}
                {this.state.showMultiTable ? (
                  <MultiTableRelation
                    unmountMe={this.handleMultiTable}
                    mt_name={this.state.mt_name}
                    showListCompo={(nm, fil, tm) =>
                      this.showListCompo(nm, fil, tm)
                    }
                    loca={this.state.loca}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></MultiTableRelation>
                ) : null}
                {this.state.showChecklistCompo ? (
                  <CheckListComponent
                    unmountMe={this.handleChecklistCompo}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                    loca={this.state.loca}
                  ></CheckListComponent>
                ) : null}
                {this.state.showInventoryCompo ? (
                  <InventoryComponent
                    unmountMe={this.handleInventoryCompo}
                    loca={this.state.loca}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></InventoryComponent>
                ) : null}
                {this.state.showInitialSetupCompo ? (
                  <InitialSetupComponent
                    unmountMe={this.handleInitialSetupCompo}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                  ></InitialSetupComponent>
                ) : null}
                {this.state.showClientInfo ? (
                  <ClientInfoCompo
                    filter={this.state.filter}
                    unmountMe={this.handleClientInfo}
                    loca={this.state.loca}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></ClientInfoCompo>
                ) : null}
                {this.state.showClientInfoRec ? (
                  <ClientInfoRecCompo
                    tabname={this.state.tabname}
                    rid={this.state.rid}
                    unmountMe={this.handleClientInfoRec}
                    loca={this.state.loca}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></ClientInfoRecCompo>
                ) : null}
                {this.state.showRoleSelectionCompo ? (
                  <RoleSelectionComponent
                    i_d={this.state.i_d}
                    rt={this.state.rt}
                    unmountMe={this.handleRoleSelectionCompo}
                    loca={this.state.loca}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></RoleSelectionComponent>
                ) : null}
                {this.state.showHtmlPage ? (
                  <HtmlPageComponent
                    // html={this.state.html}
                    // script={this.state.script}
                    record={this.state.record}
                    filter={this.state.filter}
                    unmountMe={this.handleHtmlPage}
                    loca={this.state.loca}
                    showClientInfo={(fil) => this.showClientInfo(fil)}
                  ></HtmlPageComponent>
                ) : null}
                {this.state.showUiPageCompo ? (
                  <UiPageComponent
                    name={this.state.name}
                    // showClientInfo={(fil) => this.showClientInfo(fil)}
                    showVariableCompo={(fil) => this.showVariableCompo(fil)}
                    unmountMe={this.handleUiPageCompo}
                    loca={this.state.loca}
                  ></UiPageComponent>
                ) : null}
                {this.state.showVariableCompo ? (
                  <VarBlankCompo
                    filter={this.state.filter}
                    unmountMe={this.handleVariableCompo}
                    loca={this.state.loca}
                    userInfo={this.state.userinfo}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></VarBlankCompo>
                ) : null}
                {this.state.showStatusCompo ? (
                  <LoomStatusComponent
                    unmountMe={this.handleStatusCompo}
                    showFormCompo={(nm, rid, ty) =>
                      this.showFormCompo(nm, rid, ty)
                    }
                    loca={this.state.loca}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></LoomStatusComponent>
                ) : null}
                {this.state.showTabularReport ? (
                  <TabularReportCompo
                    unmountMe={this.handleTabularReport}
                    loca={this.state.loca}
                    recordId={this.state.rid}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></TabularReportCompo>
                ) : null}
                {this.state.showViewTabularReport ? (
                  <ViewTabularReport
                    unmountMe={this.handleViewTabularReport}
                    loca={this.state.loca}
                    listName={this.state.tabname}
                    timeline={this.state.timeline}
                    filter={this.state.filter}
                    isMobile={this.state.isMobile}
                    showTabularReport={(id) => this.showTabularReport(id)}
                    showWorkerInfo={(id) => this.showWorkerInfo(id)}
                    showViewSalary={(id) => this.showViewSalary(id)}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></ViewTabularReport>
                ) : null}
                {this.state.showMaterialCompo ? (
                  <MaterialComponent
                    unmountMe={this.handleMaterialCompo}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></MaterialComponent>
                ) : null}
                {this.state.showIncomeExpense ? (
                  <IncomeExpense
                    unmountMe={this.handleIncomeExpense}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    showFormCompo={(nm, recordid, ty) =>
                      this.showFormCompo(nm, recordid, ty)
                    }
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></IncomeExpense>
                ) : null}
                {this.state.showWorkerInfo ? (
                  <WorkerInfoCompo
                    unmountMe={this.handleWorkerInfo}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    recordId={this.state.rid}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></WorkerInfoCompo>
                ) : null}
                {this.state.showViewSalary ? (
                  <SalaryCompo
                    unmountMe={this.handleViewSalary}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    recordId={this.state.rid}
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></SalaryCompo>
                ) : null}
                {this.state.showErrorCompo ? (
                  <ErrorPage
                    unmountMe={this.handleErrorCompo}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    location={this.state.location}
                  ></ErrorPage>
                ) : null}
                {this.state.showUserInfoCompo ? (
                  <UserInfo
                    unmountMe={this.handleUserInfoCompo}
                    loca={this.state.loca}
                    isMobile={this.state.isMobile}
                    showFormCompo={(nm, recordid, ty) =>
                      this.showFormCompo(nm, recordid, ty)
                    }
                    showErrorCompo={(error) => this.showErrorCompo(error)}
                  ></UserInfo>
                ) : null}
              </div>
            </div>
          </div>
        )}
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={{
            content: {
              width: "320px",
              height: "350px",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "11px",
              background: "#010154",
            },
          }}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          {/* <h2 style={{ color: "white", textAlign: "center" }}>UserProfile</h2> */}
          <div
            style={{
              fontSize: "75px",
              color: "white",
              textAlign: "center",
            }}
          >
            <i
              className="fa fa-user-circle-o"
              aria-hidden="true"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Profile"
            ></i>
            <p
              className="text-capitalize"
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
              }}
            >
              {this.state.userinfo.name}
            </p>
          </div>
          <div>
            <button
              className="btn btn-danger form-control"
              onClick={this.logout}
            >
              Logout
            </button>
            <button
              className="btn btn-primary form-control"
              onClick={this.closeModal}
            >
              Close
            </button>
          </div>
        </Modal>

        <Mod
          show={this.state.showNotificationCompo}
          onHide={this.handleNotificationCompo}
          size="xl"
        >
          <Mod.Header closeButton>
            <Mod.Title>Notification</Mod.Title>
          </Mod.Header>
          <Mod.Body>
            <UserNotificationCompo
              showNotificationCompo={(cnt) => this.showNotificationCompo(cnt)}
              showFormCompo={(nm, rid, ty) => this.showFormCompo(nm, rid, ty)}
              loca={this.state.loca}
              msg={this.state.msg}
              cnt={this.state.cnt}
            ></UserNotificationCompo>
          </Mod.Body>
          <Mod.Footer>
            <Button variant="secondary" onClick={this.handleNotificationCompo}>
              Close
            </Button>
          </Mod.Footer>
        </Mod>

        <Mod show={this.state.adminPanel} onHide={this.closeList} size="xl">
          <Mod.Header closeButton>
            <Mod.Title>Impersonation</Mod.Title>
          </Mod.Header>
          <Mod.Body>
            <ImpersonationCompo
              adminPanel={this.state.adminPanel}
              loca={this.state.loca}
              setImp={(rel) => this.setImp(rel)}
              user_rcd={this.state.setRecord}
              isMobile={this.state.isMobile}
            ></ImpersonationCompo>
          </Mod.Body>
          <Mod.Footer>
            <Button variant="secondary" onClick={this.closeList}>
              Close
            </Button>
          </Mod.Footer>
        </Mod>
      </div>
      //   </LoomWebContext.Provider>
      // </div>
    );
  }
}

export default MainComponent;
