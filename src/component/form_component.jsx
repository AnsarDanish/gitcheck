import React, { Component } from "react";
import axios from "axios";
import { Modal, Button, Tab, Nav, Col, Row } from "react-bootstrap";
import "../css/formcompo.css";
import "../css/relationlist.css";
import "../css/listcompo.css";
import ModelList from "./model_list";
import WorkInProgress from "./work_in_progress";
import WorkInProgressSmall from "./WorkInProgressSmall";
import RelationListComponent from "./relationlist_component";
import ApForm from "../ApForm";
import ApUser from "../ApUser";
import FormInnerComponent from "./FormInner_Component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPVerify from "./otpVerify";
import SwitchModal from "./SwitchModal";

class FormComponent extends React.Component {
  state = {
    record: [],
    button: [],
    refrecord: {},
    name: "",
    value: new Date(),
    mainrecord: {},
    page_error: false,
    error: "",
    showmodel: false,
    showlist: true,
    columnid: "",
    cur_ref_name: "",
    cur_ref_type: "",
    cur_ref_index: 0,
    tabname: this.props.tabname,
    rid: this.props.rid,
    rty: this.props.ty,
    old_rid: 0,
    old_tabname: this.props.tabname,
    i_d: 0,
    rvalue: "",
    page_message: false,
    message: "",
    show: false,
    tabrelation: {},
    relation_loading: false,
    tabrel: false,
    tablabel: "",
    col_mn: [],
    column_depend: [],
    column_other: [],
    int_fields: [],
    date_fields: [],
    email_fields: [],
    boln_fields: [],
    str_fields: [],
    ref_fields: [],
    booleanfld: [],
    tm_list: [],
    tabList: [],
    listName: this.props.listName,
    filtarray: [],
    mainFilt: {
      co: "",
      cl: "",
      mc: "",
      an: "",
      ct: "",
      af: "",
      rf: { id: "", value: "" },
      dc: { id: "", value: "", label: "" },
      ch: [],
    },
    filt: JSON.parse(
      JSON.stringify({
        co: "",
        cl: "",
        mc: "",
        an: "",
        ct: "",
        af: "",
        rf: { id: "", value: "" },
        dc: { id: "", value: "", label: "" },
        ch: [],
      })
    ),
    filString: "",
    sortColumn: { name: "", sort: false },
    filter: "",
    timeline: "",
    filter_unset: false,
    ap_form: {},
    ap_user: {},
    uiscript: [],
    editor: null,
    loca: this.props.loca,
    fldType: "",
    userTable: "",
    tabId: "",
    record_rq: [],
    ref_filter: [],
    colState: false,
    isMobile: this.props.isMobile,
    choice_mn: [],
    reScript: [],
    rcdView: [],
    mscList: [],
    btn_disable: false,
    modal: false,
    showContextMenu: false,
    showContext: false,
    contextMenu: this.props.contextMenu,
    loading: true,
    btnName: "",
    btnValue: "",
    tablename: "",
    validation_error: false,
    validation: "",
    ob: "",
    form_back: false,
    column_ref: [],
    filtRefArray: [],
    keyValueJson: { properties: [] },
    groupkeyValue: {
      properties: [
        {
          name: "",
          choice: [{ value: "" }],
        },
      ],
    },
    infoRcdView: [],
    infoRcdDetail: [],
    showModalInfo: false,
    buttonName: {},
    activity: [],
    downRcdView: [],
    isRecent: false,
    isDashboardInfo: this.props.isDashboardInfo,
    dashboardData: this.props.dashboardData,
    secondaryStartIndex:0,
    secondarycallsCols:new Map()
  };

  _isMounted = false;

  constructor(props) {
    super(props);
    this.menuX = React.createRef();
    this.menuY = React.createRef();
    this.closeRef = React.createRef();
    this.tablename = React.createRef();
    this.isRec = React.createRef()
    this.formChangefn = this.formChangefn.bind(this);
    this.onCh = this.onCh.bind(this);
    this.callbtn = this.callbtn.bind(this);
    this.validationfn = this.validationfn.bind(this);
    this.setRefrecord = this.setRefrecord.bind(this);
    this.setcolumn = this.setcolumn.bind(this);
    this.closemodal = this.closemodal.bind(this);
    this.setRef = this.setRef.bind(this);
    this.callNextPage = this.callNextPage.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleShowOTPVerify = this.handleShowOTPVerify.bind(this);
    this.handleCloseOTPVerify = this.handleCloseOTPVerify.bind(this);
    this.relationVerify = this.relationVerify.bind(this);
    this.fieldverify = this.fieldverify.bind(this);
    this.callfilter = this.callfilter.bind(this);
    this.calltimeline = this.calltimeline.bind(this);
    this.setRecord = this.setRecord.bind(this);
    this.callTableColumn = this.callTableColumn.bind(this);
    this.callColumnByColId = this.callColumnByColId.bind(this);
    this.checkRefrecord = this.checkRefrecord.bind(this);
    this.getFieldValue = this.getFieldValue.bind(this);
    this.getChoiceRcd = this.getChoiceRcd.bind(this);
    this.getScriptList = this.getScriptList.bind(this);
    this.getFormDetails = this.getFormDetails.bind(this);
    this.setMSC = this.setMSC.bind(this);
    this.menuFn = this.menuFn.bind(this);
    this.setContext = this.setContext.bind(this);
    this.setContextMenu = this.setContextMenu.bind(this);
    this.refresh = this.refresh.bind(this);
    this.setRecordView = this.setRecordView.bind(this);
    this.back = this.back.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
    this.getSingleInfo = this.getSingleInfo.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.openRecord = this.openRecord.bind(this);
    this.showRecent = this.showRecent.bind(this);
    // this.state = { matches: window.matchMedia("(min-width: 768px)").matches };
  }

  componentWillUnmount() {
    // Clean up event listener
    // setTimeout(()=>{
    // ;},5000);
    // localStorage.setItem("abc", JSON.stringify(this.state.backMethod));
    localStorage.setItem("abc", "danish");
    // if(this.state.backMethod.size>1)
    // localStorage.setItem("abc", "danish sada");
  }

  componentDidMount() {
    this._isMounted = true;
    // const handler = e => this.setState({ matches: e.matches });
    // window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
    document
      .getElementsByTagName("body")
      .item(0)
      .addEventListener("mousedown", () => {
        if (this._isMounted) {
          console.log(this._isMounted, "mount");
          this.setState({ showContextMenu: false, showContext: false });
        }
        console.log(this.state.showContextMenu, "contextmenu");
      });

    var token = localStorage.getItem("token");
    this.setState({ loading: false, relation_loading: false, buttonName: "" });
    if (this.state.isDashboardInfo) {
      console.log(this.state.dashboardData);
      this.calledfromDidMount(this.state.dashboardData);
    } else {
      if (this.state.rty === "new") {
        axios
          .get(
            this.state.loca +
            "/loom/get/single/blankrecord/" +
            this.state.tabname,
            {
              headers: {
                authorization: "Bearer " + token,
              },
            }
          )
          .then(
            (resp) => {
              const blkrecord = resp.data;
              console.log(blkrecord);
              if (blkrecord !== "") {
                if ("Error" in blkrecord) {
                  this.setState({
                    loading: false,
                    page_error: true,
                    error: blkrecord.Error,
                  });
                } else {
                  let rcd = [];
                  let userDetails = localStorage.getItem("userDetails");
                  var status = localStorage.getItem("status");
                  let st = JSON.parse(status);
                  let script = blkrecord.formRecord[4].uiscript;
                  rcd = blkrecord.formRecord[2].record;
                  if (script !== null) {
                    for (let i = 0; i < script.length; i++) {
                      let func = script[i].script;
                      let type = script[i].type;
                      if (type === "onload") {
                        this.onLoad(
                          func,
                          new ApUser(userDetails, this.setRecord("")),
                          new ApForm(rcd, this.setRecord(""))
                        );
                      }
                    }
                  }
                  let count = 0;
                  var fldtype = "";
                  let StartIndex=0;
                  let mapObj=new Map();
                  console.log(rcd);
                  for (let i = 0; i < rcd.length; i++) {
                    if (st != null) {
                      if (blkrecord.formRecord[1].table.value === st.tableName) {
                        if (rcd[i].name === "workshop_id") {
                          if (rcd[i].type === "reference") {
                            rcd[i].value.id = st.workshop_id;
                            rcd[i].value.value = st.workshop_name;
                          }
                        }
                        if (rcd[i].name === "loom_id") {
                          if (rcd[i].type === "reference") {
                            rcd[i].value.id = st.loom_id;
                            rcd[i].value.value = st.loom_name;
                          }
                        }
                        this.setState({ form_back: true });
                      }
                    }
                    if (rcd[i].type === "other_table_filter") {
                      fldtype = rcd[i].otherFilterColumn;
                      if (fldtype === "null" || fldtype === undefined) {
                        var fl = [];
                        fl.push(JSON.parse(JSON.stringify(this.state.mainFilt)));
                        this.setState({
                          filtarray: fl,
                          timeline: this.state.timeline,
                        });
                      } else {
                        this.setState({
                          filtarray: rcd[i].value.filter,
                          timeline: rcd[i].value.timeline,
                          fldType: fldtype,
                        });
                      }
                    }
                    if (rcd[i].type === "filter") {
                      if (rcd[i].value === "" || rcd[i].value === "null") {
                        var fll = this.state.filtarray;
                        fll = [];
                        fll.push(JSON.parse(JSON.stringify(this.state.mainFilt)));
                        this.setState({
                          filtarray: fll,
                          timeline: this.state.timeline,
                        });
                      } else {
                        this.setState({
                          filtarray: rcd[i].value.filter,
                          timeline: rcd[i].value.timeline,
                        });
                        count++;
                      }
                    }
                    if (rcd[i].type === "filter_ref") {
                      if (rcd[i].value === "" || rcd[i].value === "null") {
                        var fll = this.state.filtRefArray;
                        fll = [];
                        fll.push(JSON.parse(JSON.stringify(this.state.mainFilt)));
                        this.setState({
                          filtRefArray: fll,
                          timeline: this.state.timeline,
                        });
                      } else {
                        this.setState({
                          filtRefArray: rcd[i].value.filter,
                          timeline: rcd[i].value.timeline,
                        });
                        count++;
                      }
                    }
                    if (rcd[i].type === "filter_script") {
                      if (rcd[i].value === "" || rcd[i].value === "null") {
                        var fll = this.state.filtarray;
                        fll = [];
                        fll.push(JSON.parse(JSON.stringify(this.state.mainFilt)));
                        this.setState({
                          filtarray: fll,
                          timeline: this.state.timeline,
                        });
                      } else {
                        this.setState({
                          filtarray: rcd[i].value.filter,
                          timeline: rcd[i].value.timeline,
                        });
                        count++;
                      }
                    }
                    if (rcd[i].type === "key_value") {
                      rcd[i].value = this.state.keyValueJson;
                    }
                    if (rcd[i].type === "group_key_value") {
                      rcd[i].value = this.state.groupkeyValue;
                      // this.setState({ groupkeyValue: rcd[i].value });
                    }
                    if (rcd[i].type === "multi_select") {
                      // rcd[i].value = [];
                      let parsVal = rcd[i].value.record;
                      this.setState({ mscList: parsVal });
                      count++;
                    }
                    if (
                      rcd[i].name === "loom_table_id" ||
                      rcd[i].name === "loomtable_id"
                    ) {
                      this.callTableColumn(rcd[i].value.value, false);
                      count++;
                    }

                    if (rcd[i].name === "reference_id") {
                      this.callTableColumn(rcd[i].value.value, false, true);
                      count++;
                    }
                    // if (count === 4) {
                    //   break;
                    // }
                    if (rcd[i].type === "reference") {
                      if (rcd[i]?.recentSearch?.length > 0) {
                        rcd[i].showRecent = false;
                      }
                    }

                    if(rcd[i]?.secondary==="true" && StartIndex==0){
                  
                      //setSecondaryStartIndex(i);
                      this.setState({secondaryStartIndex:i})
                      StartIndex++; 
                    }
                    if(rcd[i]?.secondary==="true"){
    
                     let fv = rcd[i]?.formView
                     console.log( "fv",fv);
                    let col = fv.path.split(".")[1];
                    if(mapObj.get(col)){
                      mapObj.get(col).push(fv);   
                    }else{
                      let vl=[];
                    vl.push(fv)
                    mapObj.set(col ,vl)
                    }
                 }


                 }
                  console.log("mapObj" ,mapObj);
                  this.setState({secondarycallsCols:mapObj})


                  for (let r = 0; r < rcd.length; r++) {
                    if (fldtype === rcd[r].name) {
                      this.callTableColumn(rcd[r].value.value, true);
                    }
                  }

                  for (let i = 0; i < rcd.length; i++) {
                    rcd[i].index = i;
                  }

                  rcd.sort((a, b) =>
                    parseInt(a.formView.pn) > parseInt(b.formView.pn)
                      ? 1
                      : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                        ? -1
                        : 0
                  );
                  let rd = [];
                  let rdd = [];
                  let left_rd = [];
                  let left_check = false;
                  let downRcd = [];
                  for (let i = 0; i < rcd.length; i++) {
                    if (rcd[i].formView.position === "left") {
                             // rcd[i].index = i;
                  // if (rcd[i].uivalid.visible=== "true") {
                  rd.push(rcd[i]);
                  // }
                  if (
                    i + 1 < rcd.length &&
                    rcd[i + 1].formView.position === "full"
                  ) {
                    rdd.push({
                      split: "true",
                      rcd: rd,
                      formView: {
                        co: rd[0].formView.co,
                        pn: rd[0].formView.pn,
                      },
                    });
                    left_rd = [];
                    left_check = true;
                    rd = [];
                  }
                    } else if (rcd[i].formView.position === "right") {
                      rd.push(rcd[i]);
                      console.log(
                        JSON.stringify(rcd[i + 1]) +
                        " rccddd : " +
                        JSON.stringify(rd)
                      );
                      if (
                        i === rcd.length - 1 ||
                        rcd[i + 1].formView.position === "full"
                      ) {
                        console.log("split check");
                        rdd.push({
                          split: "true",
                          rcd: rd,
                          formView: {
                            co: rd[0].formView.co,
                            pn: rd[0].formView.pn,
                          },
                        });
                        rd = [];
                        left_check = false;
                        left_rd = [];
                      }
                    } else {
                      if (left_check) {
                        console.log(rcd[i].uivalid.visible);
                        rcd[i].split = "false";
                        rdd.push(rcd[i]);
                      } else {
                        console.log(rcd[i]);
                        rcd[i].split = "false";
                        rdd.push(rcd[i]);
                      }
                    }
                  }
                  console.log(rdd, rd, left_rd);
              console.log(rdd);
              for (let i = 0; i < rdd.length; i++) {
                if (rdd[i].split === "true") {
                  rdd[i].rcd.sort((a, b) =>
                    parseInt(a.formView.pn) > parseInt(b.formView.pn)
                      ? 1
                      : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                        ? -1
                        : 0
                  );
                }
              }
              rdd.sort((a, b) =>
                parseInt(a.formView.pn) > parseInt(b.formView.pn)
                  ? 1
                  : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                    ? -1
                    : 0
              );
                  // let btn = blkrecord.formRecord[3].button;
                  // if (blkrecord.formRecord[1].table.value === "local_user") {
                  //   for (var i = 0; i < btn.length; i++) {
                  //     if (btn[i].name === "insert") {
                  //       this.setState({ buttonName: btn[i].name });
                  //     }
                  //   }
                  // }

                  rcd.sort((a, b) =>
                    parseInt(a.index) > parseInt(b.index)
                      ? 1
                      : parseInt(a.index) < parseInt(b.index)
                        ? -1
                        : 0
                  );
                  this.setState({
                    // loading: false,
                    tablabel: blkrecord.formRecord[1].table.label,
                    tabId: blkrecord.formRecord[1].table.id,
                    copyRcd: rcd,
                    record: rcd,
                    rcdView: rdd,
                    button: blkrecord.formRecord[3].button,
                    mainrecord: blkrecord,
                    ap_form: new ApForm(rcd, this.setRecord("")),
                    ap_user: new ApUser(userDetails, this.setRecord("")),
                    uiscript: script,
                    // downRcdView: downRcd,
                  });
                  this.checkRefrecord();
                }
              }
            },
            (error) => {
              let err = { message: error.message, code: error.response.status };
              this.props.showErrorCompo({ state: { err: err } });
            }
          );
      } else if (this.state.rty === "record") {
        axios
          .get(
            this.state.loca +
            "/loom/get/singlerecord/" +
            this.state.tabname +
            "/" +
            this.state.rid,
            {
              headers: {
                authorization: "Bearer " + token,
              },
            }
          )
          .then(
            
            (resp) => {
              const relrecord = resp.data;
              console.log(relrecord);
              this.calledfromDidMount(relrecord)

            },
            (error) => {
              ;
              let err = { message: error.message, code: error.response.status };
              this.props.showErrorCompo({ state: { err: err } });
            }
          );
      }
    }
  }

  calledfromDidMount = (relrecord) => {
    console.log(relrecord);
    if (relrecord !== "") {
      if ("Error" in relrecord) {
        this.setState({
          loading: false,
          page_error: true,
          error: relrecord.Error,
        });
      } else {
        var mmm = relrecord.formRecord[2].record;
        if (this.state.isDashboardInfo) {
          // if the data is coming from dashboardInfo i do not want to show other things.
          relrecord.formRecord[3].button = []
        }
        var rvalue = "";
        for (var i = 0; i < mmm.length; i++) {
          mmm[i].clicked = false;
          if (mmm[i].displayColumn === "true") {
            rvalue = mmm[i].value;
          }
          if (mmm[i].type === "password") {
            mmm[i].value = "";
          }
          if (mmm[i].value !== "") {
            mmm[i].verified = "verified";
          } else {
            mmm[i].verified = "initial";
          }
        }
        let count = 0;
        var fldtype = "";
        // let call_check = true;
        for (let i = 0; i < mmm.length; i++) {
          if (mmm[i].type === "other_table_filter") {
            fldtype = mmm[i].otherFilterColumn;
            if (
              fldtype === "null" ||
              fldtype === undefined ||
              fldtype === ""
            ) {
              var flt = this.state.filtarray;
              flt = [];
              flt.push(this.state.filt);
              this.setState({
                filtarray: flt,
                timeline: this.state.timeline,
              });
            } else {
              if (mmm[i].value === "null") {
                var fl_t = [];
                fl_t.push(this.state.filt);
                this.setState({
                  filtarray: fl_t,
                  timeline: this.state.timeline,
                });
              } else {
                this.setState({
                  filtarray: mmm[i].value.filter,
                  timeline: mmm[i].value.timeline,
                  fldType: fldtype,
                });
              }
            }
          }
          if (mmm[i].type === "filter") {
            if (mmm[i].value === "null" || mmm[i].value === "") {
              var flt_ary = this.state.filtarray;
              flt_ary = [];
              flt_ary.push(this.state.filt);
              this.setState({
                filtarray: flt_ary,
                timeline: this.state.timeline,
              });
            } else {
              this.setState({
                filtarray: mmm[i].value.filter,
                timeline: mmm[i].value.timeline,
              });
              count++;
            }
          }
          if (mmm[i].type === "filter_ref") {
            if (mmm[i].value === "null" || mmm[i].value === "") {
              var flt_arr = this.state.filtRefArray;
              var flt_arr = [];
              flt_arr.push(this.state.filt);
              this.setState({
                filtRefArray: flt_arr,
                timeline: this.state.timeline,
              });
            } else {
              this.setState({
                filtRefArray: mmm[i].value.filter,
                timeline: mmm[i].value.timeline,
              });
              count++;
            }
          }
          if (mmm[i].type === "multi_select") {
            if (
              mmm[i].value !== null ||
              mmm[i].value !== "" ||
              mmm[i].value !== "null" ||
              mmm[i].value !== undefined
            ) {
              let parsVal = mmm[i].value.record;
              this.setState({ mscList: parsVal });
              count++;
            } else {
              // mmm[i].value = [];
              let parsVal = mmm[i].value.record;
              this.setState({ mscList: parsVal });
              count++;
            }
          }
          if (
            mmm[i].name === "loom_table_id" ||
            mmm[i].name === "loomtable_id"
          ) {
            if (
              mmm[i].value.value !== null ||
              mmm[i].value.value !== ""
            ) {
              // call_check = false;
              this.callTableColumn(mmm[i].value.value, false);
              count++;
            }
          }
          // if (count === 4) {
          //   break;
          // }

          if (mmm[i].name === "reference_id") {
            if (
              mmm[i].value.value !== null ||
              mmm[i].value.value !== ""
            ) {
              this.callTableColumn(mmm[i].value.value, false, true);
              count++;
            }
          }

          if (mmm[i].name === "loom_column_id") {
            if (
              mmm[i].value.value !== null ||
              mmm[i].value.value !== ""
            ) {
              this.callColumnByColId(mmm[i].value.id);
            }
          }
        }

        let StartIndex=0;
        let mapObj=new Map();
        for (let r = 0; r < mmm.length; r++) {
          if (fldtype === mmm[r].name) {
            this.callTableColumn(mmm[r].value.value, true);
          }
          if (this.state.isDashboardInfo) {
            mmm[r].uivalid.read_only = "true";
          }
          if(mmm[i]?.secondary==="true" && StartIndex==0){
                  
            //setSecondaryStartIndex(i);
            this.setState({secondaryStartIndex:i})
            StartIndex++; 
          }
          if(mmm[i]?.secondary==="true"){

           let fv = mmm[i]?.formView
           console.log( "fv",fv);
          let col = fv.path.split(".")[1];
          if(mapObj.get(col)){
            mapObj.get(col).push(fv);   
          }else{
            let vl=[];
          vl.push(fv)
          mapObj.set(col ,vl)
          }
       }
       /* 
          let StartIndex=0;
        let mapObj=new Map();
          console.log("mapObj" ,mapObj);
        this.setState({secondarycallsCols:mapObj})
        */
        }

        console.log("mapObj" ,mapObj);
        this.setState({secondarycallsCols:mapObj})

        let rcd = [];
        let userDetails = localStorage.getItem("userDetails");
        let script = relrecord.formRecord[4].uiscript;
        rcd = relrecord.formRecord[2].record;
        if (this.uiscript) {
          this.uiscript.current = script;
        }

        if (script !== null) {
          for (let i = 0; i < script.length; i++) {
            let func = script[i].script;
            let type = script[i].type;
            if (type === "onload") {
              this.onLoad(
                func,
                new ApUser(userDetails, this.setRecord("")),
                new ApForm(rcd, this.setRecord(""))
              );
            }
          }
        }

        for (let i = 0; i < rcd.length; i++) {
          rcd[i].index = i;
        }

    
        rcd.sort((a, b) =>
          parseInt(a.formView.pn) > parseInt(b.formView.pn)
            ? 1
            : parseInt(a.formView.pn) < parseInt(b.formView.pn)
              ? -1
              : 0
        );
        let rd = [];
        let rdd = [];
        let left_rd = [];
        let left_check = false;
        let downRcd = [];
        console.log(JSON.stringify(rcd));
        for (let i = 0; i < rcd.length; i++) {
          if (rcd[i].type === "activity") {
            downRcd.push(rcd[i]);
          }
          if (rcd[i].formView.position === "left") {
            rd.push(rcd[i]);
            if (
              i + 1 < rcd.length &&
              rcd[i + 1].formView.position === "full"
            ) {
              left_check = true;
            }
          } else if (rcd[i].formView.position === "right") {
            rd.push(rcd[i]);
            if (
              i === rcd.length - 1 ||
              rcd[i + 1].formView.position === "full"
            ) {
              rdd.push({
                split: "true",
                rcd: rd,
                formView: { co: rd[0].formView.co },
              });
              for (let j = 0; j < left_rd.length; j++) {
                rdd.push(left_rd[j]);
              }
              rd = [];
              left_check = false;
              left_rd = [];
            }
          } else {
            if (left_check) {
              rcd[i].split = "false";
              left_rd.push(rcd[i]);
            } else {
              rcd[i].split = "false";
              rdd.push(rcd[i]);
            }
          }
        }

        console.log(rdd, rd, left_rd);
        for (let i = 0; i < rdd.length; i++) {
          if (rdd[i].split === "true") {
            rdd[i].rcd.sort((a, b) =>
              parseInt(a.formView.pn) > parseInt(b.formView.pn)
                ? 1
                : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                  ? -1
                  : 0
            );
          }
        }
        rdd.sort((a, b) =>
          parseInt(a.formView.pn) > parseInt(b.formView.pn)
            ? 1
            : parseInt(a.formView.pn) < parseInt(b.formView.pn)
              ? -1
              : 0
        );
        console.log("rdd1",rdd);
      //  console.log("mmmm" + JSON.stringify(mmm));
        // rcd.sort((a,b)=>parseInt(a.beforeIndex)>parseInt(b.beforeIndex)?1:parseInt(a.beforeIndex)<parseInt(b.beforeIndex)?-1:0)
        rcd.sort((a, b) =>
          parseInt(a.index) > parseInt(b.index)
            ? 1
            : parseInt(a.index) < parseInt(b.index)
              ? -1
              : 0
        );
        this.setState({
          mainrecord: relrecord,
          copyRcd: rcd,
          record: rcd, //mmm
          rcdView: rdd,
          // loading: false,
          tablabel: relrecord.formRecord[1].table.label,
          tabId: relrecord.formRecord[1].table.id,
          button: relrecord.formRecord[3].button,
          i_d: relrecord.formRecord[2].record[0].value,
          rvalue: rvalue,
          ap_form: new ApForm(rcd, this.setRecord("")),
          ap_user: new ApUser(userDetails, this.setRecord("")),
          uiscript: script,
          downRcdView: downRcd,
          activity: relrecord.formRecord[6].activity,
        });
        console.log(rdd);
        // if (call_check) {
        this.relationVerify(rvalue);
        // } else {
        //   this.checkRefrecord();
        // }
      }
    }

  }

  showRecent(obj, ind, val) {

    if (obj && obj.recentSearch && obj.recentSearch.length > 0) {
      obj.showRecent = val;
    }

    for (let i = 0; i < this.state.rcdView.length; i++) {
      if (this.state.rcdView[i].split === "true") {
        for (let k = 0; k < this.state.rcdView[i].rcd.length; k++) {
          if (obj && this.state.rcdView[i].rcd[k].id != obj.id) {
            this.state.rcdView[i].rcd[k].showRecent = false;
          }
        }

      } else {

        if (obj && this.state.rcdView[i].id != obj.id) {
          this.state.rcdView[i].showRecent = false;
        }

      }

    }
    this.setState({ rcdView: this.state.rcdView })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(props) {
    if (this.state.old_tabname !== this.state.tabname) {
      localStorage.removeItem("pageClicked");
      var token = localStorage.getItem("token");
      this.setState({
        loading: false,
        relation_loading: false,
        listName: props.tabname,
        old_tabname: props.tabname,
        record: [],
        rcdView: [],
        buttonName: "",
      });
      if (this.state.isDashboardInfo) {
        this.calledfromDidMount(this.state.dashboardData);
      } else {
        if (this.state.rty === "new") {
          axios
            .get(
              this.state.loca +
              "/loom/get/single/blankrecord/" +
              this.state.tabname,
              {
                headers: {
                  authorization: "Bearer " + token,
                },
              }
            )
            .then(
              (resp) => {
                const blkrecord = resp.data;
                console.log(blkrecord);
                if ("Error" in blkrecord) {
                  this.setState({
                    loading: false,
                    page_error: true,
                    error: blkrecord.Error,
                  });
                } else {
                  let rcd = [];
                  let userDetails = localStorage.getItem("userDetails");
                  let script = blkrecord.formRecord[4].uiscript;
                  rcd = blkrecord.formRecord[2].record;
                  if (script !== null) {
                    for (let i = 0; i < script.length; i++) {
                      let func = script[i].script;
                      let type = script[i].type;
                      if (type === "onload") {
                        this.onLoad(
                          func,
                          new ApUser(userDetails, this.setRecord("")),
                          new ApForm(rcd, this.setRecord(""))
                        );
                      }
                    }
                  }
                  let count = 0;
                  var fldtype = "";
                  let StartIndex=0;
                  let mapObj=new Map();
                  for (let i = 0; i < rcd.length; i++) {
                    if (rcd[i].type === "other_table_filter") {
                      fldtype = rcd[i].otherFilterColumn;
                      if (fldtype === "null" || fldtype === undefined) {
                        var fltt = [];
                        fltt.push(
                          JSON.parse(JSON.stringify(this.state.mainFilt))
                        );
                        this.setState({
                          filtarray: fltt,
                          timeline: this.state.timeline,
                        });
                      } else {
                        this.setState({
                          filtarray: rcd[i].value.filter,
                          timeline: rcd[i].value.timeline,
                          fldType: fldtype,
                        });
                      }
                    }
                    if (rcd[i].type === "filter") {
                      if (rcd[i].value === "" || rcd[i].value === "null") {
                        var fltt_ar = this.state.filtarray;
                        fltt_ar = [];
                        fltt_ar.push(
                          JSON.parse(JSON.stringify(this.state.mainFilt))
                        );
                        this.setState({
                          filtarray: fltt_ar,
                          timeline: this.state.timeline,
                        });
                      } else {
                        this.setState({
                          filtarray: rcd[i].value.filter,
                          timeline: rcd[i].value.timeline,
                        });
                        count++;
                      }
                    }
                    if (rcd[i].type === "filter_ref") {
                      if (rcd[i].value === "" || rcd[i].value === "null") {
                        var fltt_ar = this.state.filtRefArray;
                        fltt_ar = [];
                        fltt_ar.push(
                          JSON.parse(JSON.stringify(this.state.mainFilt))
                        );
                        this.setState({
                          filtRefArray: fltt_ar,
                          timeline: this.state.timeline,
                        });
                      } else {
                        this.setState({
                          filtRefArray: rcd[i].value.filter,
                          timeline: rcd[i].value.timeline,
                        });
                        count++;
                      }
                    }
                    if (rcd[i].type === "key_value") {
                      rcd[i].value = this.state.keyValueJson;
                    }
                    if (rcd[i].type === "group_key_value") {
                      rcd[i].value = this.state.groupkeyValue;
                      // this.setState({ groupkeyValue: rcd[i].value });
                    }
                    if (rcd[i].type === "multi_select") {
                      // rcd[i].value = [];
                      this.setState({ mscList: rcd[i].value.record });
                      count++;
                    }
                    if (
                      rcd[i].name === "loom_table_id" ||
                      rcd[i].name === "loomtable_id"
                    ) {
                      this.callTableColumn(rcd[i].value.value);
                      count++;
                    }

                    if (rcd[i].name === "reference_id") {
                      this.callTableColumn(rcd[i].value.value, false, true);
                      count++;
                    }
                    // if (count === 2) {
                    //   break;
                    // }
                    
                    if(rcd[i]?.secondary==="true" && StartIndex==0){
                  
                      //setSecondaryStartIndex(i);
                      this.setState({secondaryStartIndex:i})
                      StartIndex++; 
                    }
                    if(rcd[i]?.secondary==="true"){
    
                     let fv = rcd[i]?.formView
                     console.log( "fv",fv);
                    let col = fv.path.split(".")[1];
                    if(mapObj.get(col)){
                      mapObj.get(col).push(fv);   
                    }else{
                      let vl=[];
                    vl.push(fv)
                    mapObj.set(col ,vl)
                    }
                 }


               //   }
                  
                  }
                  console.log("mapObj" ,mapObj);
                  this.setState({secondarycallsCols:mapObj})

                  for (let r = 0; r < rcd.length; r++) {
                    if (fldtype === rcd[r].name) {
                      this.callTableColumn(rcd[r].value.value, true);
                    }
                  }

                  for (let i = 0; i < rcd.length; i++) {
                    rcd[i].index = i;
                  }
                  rcd.sort((a, b) =>
                    parseInt(a.formView.pn) > parseInt(b.formView.pn)
                      ? 1
                      : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                        ? -1
                        : 0
                  );
                  let rd = [];
                  let rdd = [];
                  let left_rd = [];
                  let left_check = false;
                  let downRcd = [];
                  for (let i = 0; i < rcd.length; i++) {
                    if (rcd[i].formView.position === "left") {
                             // rcd[i].index = i;
                  // if (rcd[i].uivalid.visible=== "true") {
                  rd.push(rcd[i]);
                  // }
                  if (
                    i + 1 < rcd.length &&
                    rcd[i + 1].formView.position === "full"
                  ) {
                    rdd.push({
                      split: "true",
                      rcd: rd,
                      formView: {
                        co: rd[0].formView.co,
                        pn: rd[0].formView.pn,
                      },
                    });
                    left_rd = [];
                    left_check = true;
                    rd = [];
                  }
                    } else if (rcd[i].formView.position === "right") {
                      rd.push(rcd[i]);
                      console.log(
                        JSON.stringify(rcd[i + 1]) +
                        " rccddd : " +
                        JSON.stringify(rd)
                      );
                      if (
                        i === rcd.length - 1 ||
                        rcd[i + 1].formView.position === "full"
                      ) {
                        console.log("split check");
                        rdd.push({
                          split: "true",
                          rcd: rd,
                          formView: {
                            co: rd[0].formView.co,
                            pn: rd[0].formView.pn,
                          },
                        });
                        rd = [];
                        left_check = false;
                        left_rd = [];
                      }
                    } else {
                      if (left_check) {
                        console.log(rcd[i].uivalid.visible);
                        rcd[i].split = "false";
                        rdd.push(rcd[i]);
                      } else {
                        console.log(rcd[i]);
                        rcd[i].split = "false";
                        rdd.push(rcd[i]);
                      }
                    }
                  }
                  console.log(rdd, rd, left_rd);
              console.log(rdd);
              for (let i = 0; i < rdd.length; i++) {
                if (rdd[i].split === "true") {
                  rdd[i].rcd.sort((a, b) =>
                    parseInt(a.formView.pn) > parseInt(b.formView.pn)
                      ? 1
                      : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                        ? -1
                        : 0
                  );
                }
              }
              rdd.sort((a, b) =>
                parseInt(a.formView.pn) > parseInt(b.formView.pn)
                  ? 1
                  : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                    ? -1
                    : 0
              );
                  // let btn = blkrecord.formRecord[3].button;
                  // if (blkrecord.formRecord[1].table.value === "local_user") {
                  //   for (var i = 0; i < btn.length; i++) {
                  //     if (btn[i].name === "insert") {
                  //       this.setState({ buttonName: btn[i].name });
                  //     }
                  //   }
                  // }

                  rcd.sort((a, b) =>
                    parseInt(a.index) > parseInt(b.index)
                      ? 1
                      : parseInt(a.index) < parseInt(b.index)
                        ? -1
                        : 0
                  );
                  this.setState({
                    rty: props.ty,
                    // loading: false,
                    tablabel: blkrecord.formRecord[1].table.label,
                    tabId: blkrecord.formRecord[1].table.id,
                    copyRcd: rcd,
                    record: rcd,
                    rcdView: rdd,
                    button: blkrecord.formRecord[3].button,
                    tabrel: false,
                    page_error: false,
                    error: "",
                    page_message: false,
                    message: "",
                    mainrecord: blkrecord,
                    ap_form: new ApForm(rcd, this.setRecord("")),
                    ap_user: new ApUser(userDetails, this.setRecord("")),
                    uiscript: script,
                    downRcdView: downRcd,
                  });
                  this.checkRefrecord();
                }
              },
              (error) => {
                let err = { message: error.message, code: error.response.status };
                this.props.showErrorCompo({ state: { err: err } });
              }
            );
        } else if (this.state.rty === "record") {
          axios
            .get(
              this.state.loca +
              "/loom/get/singlerecord/" +
              this.state.tabname +
              "/" +
              this.state.rid,
              {
                headers: {
                  authorization: "Bearer " + token,
                },
              }
            )
            .then(
              (resp) => {
                const record = resp.data;
                if (record !== "") {
                  if ("Error" in record) {
                    this.setState({
                      loading: false,
                      page_error: true,
                      error: record.Error,
                    });
                  } else {
                    var mmm = record.formRecord[2].record;
                    var rvalue = "";
                    // let call_check = true;
                    for (var i = 0; i < mmm.length; i++) {
                      mmm[i].clicked = false;
                      if (mmm[i].displayColumn === "true") {
                        rvalue = mmm[i].value;
                      }
                      if (mmm[i].type === "password") {
                        mmm[i].value = "";
                      }
                      if (mmm[i].value !== "") {
                        mmm[i].verified = "verified";
                      } else {
                        mmm[i].verified = "initial";
                      }
                    }
                    let count = 0;
                    var fldtype = "";
                    let StartIndex=0;
                    let mapObj=new Map();
                    for (let i = 0; i < mmm.length; i++) {
                      if (mmm[i].type === "other_table_filter") {
                        fldtype = mmm[i].otherFilterColumn;
                        if (fldtype === "null" || fldtype === undefined) {
                          var fltar = this.state.filtarray;
                          fltar = [];
                          fltar.push(this.state.filt);
                          this.setState({
                            filtarray: fltar,
                            timeline: this.state.timeline,
                          });
                        } else {
                          this.setState({
                            filtarray: mmm[i].value.filter,
                            timeline: mmm[i].value.timeline,
                            fldType: fldtype,
                          });
                        }
                      }
                      if (mmm[i].type === "filter") {
                        if (mmm[i].value === "null" || mmm[i].value === "") {
                          var flt_ary = this.state.filtarray;
                          flt_ary = [];
                          flt_ary.push(this.state.filt);
                          this.setState({
                            filtarray: flt_ary,
                            timeline: this.state.timeline,
                          });
                        } else {
                          this.setState({
                            filtarray: mmm[i].value.filter,
                            timeline: mmm[i].value.timeline,
                          });
                          count++;
                        }
                      }
                      if (mmm[i].type === "filter_ref") {
                        if (mmm[i].value === "null" || mmm[i].value === "") {
                          var flt_ary = this.state.filtRefArray;
                          flt_ary = [];
                          flt_ary.push(this.state.filt);
                          this.setState({
                            filtRefArray: flt_ary,
                            timeline: this.state.timeline,
                          });
                        } else {
                          this.setState({
                            filtRefArray: mmm[i].value.filter,
                            timeline: mmm[i].value.timeline,
                          });
                          count++;
                        }
                      }
                      if (mmm[i].type === "multi_select") {
                        if (
                          mmm[i].value !== null ||
                          mmm[i].value !== "" ||
                          mmm[i].value !== "null" ||
                          mmm[i].value !== undefined
                        ) {
                          let parsVal = mmm[i].value.record;
                          this.setState({ mscList: parsVal });
                          count++;
                        } else {
                          // mmm[i].value = [];
                          let parsVal = mmm[i].value.record;
                          this.setState({ mscList: parsVal });
                          count++;
                        }
                      }
                      if (
                        mmm[i].name === "loom_table_id" ||
                        mmm[i].name === "loomtable_id"
                      ) {
                        if (
                          mmm[i].value.value !== null ||
                          mmm[i].value.value !== ""
                        ) {
                          // call_check = false;
                          this.callTableColumn(mmm[i].value.value);
                          count++;
                        }
                      }
                      // if (count === 4) {
                      //   break;
                      // }
                      if (mmm[i].name === "reference_id") {
                        if (
                          mmm[i].value.value !== null ||
                          mmm[i].value.value !== ""
                        ) {
                          this.callTableColumn(mmm[i].value.value, false, true);
                          count++;
                        }
                      }

                      if (mmm[i].name === "loom_column_id") {
                        if (
                          mmm[i].value.value !== null ||
                          mmm[i].value.value !== ""
                        ) {
                          this.callColumnByColId(mmm[i].value.id);
                        }
                      }
                      if(mmm[i]?.secondary==="true" && StartIndex==0){
                  
                        //setSecondaryStartIndex(i);
                        this.setState({secondaryStartIndex:i})
                        StartIndex++; 
                      }
                      if(mmm[i]?.secondary==="true"){
            
                       let fv = mmm[i]?.formView
                       console.log( "fv",fv);
                      let col = fv.path.split(".")[1];
                      if(mapObj.get(col)){
                        mapObj.get(col).push(fv);   
                      }else{
                        let vl=[];
                      vl.push(fv)
                      mapObj.set(col ,vl)
                      }
                   }
               
                    }
                    console.log("mapObj" ,mapObj);
                    this.setState({secondarycallsCols:mapObj})
                    for (let r = 0; r < mmm.length; r++) {
                      if (fldtype === mmm[r].name) {
                        this.callTableColumn(mmm[r].value.value, true);
                      }
                    }
                    let rcd = [];
                    let userDetails = localStorage.getItem("userDetails");
                    let script = record.formRecord[4].uiscript;
                    rcd = record.formRecord[2].record;
                    if (script !== null) {
                      for (let i = 0; i < script.length; i++) {
                        let func = script[i].script;
                        let type = script[i].type;
                        if (type === "onload") {
                          this.onLoad(
                            func,
                            new ApUser(userDetails, this.setRecord("")),
                            new ApForm(rcd, this.setRecord(""))
                          );
                        }
                      }
                    }

                    for (let i = 0; i < rcd.length; i++) {
                      rcd[i].index = i;
                    }

                    rcd.sort((a, b) =>
                      parseInt(a.formView.pn) > parseInt(b.formView.pn)
                        ? 1
                        : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                          ? -1
                          : 0
                    );
                    let rd = [];
                    let rdd = [];
                    let left_rd = [];
                    let left_check = false;
                    let downRcd = [];
                    console.log(JSON.stringify(rcd));
                    for (let i = 0; i < rcd.length; i++) {
                      if (rcd[i].type === "activity") {
                        downRcd.push(rcd[i]);
                      }
                      if (rcd[i].formView.position === "left") {
                        rd.push(rcd[i]);
                        if (
                          i + 1 < rcd.length &&
                          rcd[i + 1].formView.position === "full"
                        ) {
                          left_check = true;
                        }
                      } else if (rcd[i].formView.position === "right") {
                        rd.push(rcd[i]);
                        if (
                          i === rcd.length - 1 ||
                          rcd[i + 1].formView.position === "full"
                        ) {
                          rdd.push({
                            split: "true",
                            rcd: rd,
                            formView: { co: rd[0].formView.co },
                          });
                          for (let j = 0; j < left_rd.length; j++) {
                            rdd.push(left_rd[j]);
                          }
                          rd = [];
                          left_check = false;
                          left_rd = [];
                        }
                      } else {
                        if (left_check) {
                          rcd[i].split = "false";
                          left_rd.push(rcd[i]);
                        } else {
                          rcd[i].split = "false";
                          rdd.push(rcd[i]);
                        }
                      }
                    }
            
                    console.log(rdd, rd, left_rd);
                    for (let i = 0; i < rdd.length; i++) {
                      if (rdd[i].split === "true") {
                        rdd[i].rcd.sort((a, b) =>
                          parseInt(a.formView.pn) > parseInt(b.formView.pn)
                            ? 1
                            : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                              ? -1
                              : 0
                        );
                      }
                    }
                    rdd.sort((a, b) =>
                      parseInt(a.formView.pn) > parseInt(b.formView.pn)
                        ? 1
                        : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                          ? -1
                          : 0
                    );
                    console.log("rdd1",rdd);
                  //  console.log("mmmm" + JSON.stringify(mmm));
                    // rcd.sort((a,b)=>parseInt(a.beforeIndex)>parseInt(b.beforeIndex)?1:parseInt(a.beforeIndex)<parseInt(b.beforeIndex)?-1:0)
                    rcd.sort((a, b) =>
                      parseInt(a.index) > parseInt(b.index)
                        ? 1
                        : parseInt(a.index) < parseInt(b.index)
                          ? -1
                          : 0
                    );
                    this.setState({
                      rty: props.ty,
                      mainrecord: record,
                      record: rcd,
                      copyRcd: rcd,
                      rcdView: rdd,
                      // loading: false,
                      tablabel: record.formRecord[1].table.label,
                      tabId: record.formRecord[1].table.id,
                      button: record.formRecord[3].button,
                      i_d: record.formRecord[2].record[0].value,
                      activity: record.formRecord[6].activity,
                      rvalue: rvalue,
                      uiscript: script,
                      tabrel: false,
                      tabrelation: {},
                      downRcdView: downRcd,
                    });
                    // if (call_check) {
                    this.relationVerify(rvalue);
                    // } else {
                    //   this.checkRefrecord();
                    // }
                  }
                }
              },
              (error) => {
                let err = { message: error.message, code: error.response.status };
                this.props.showErrorCompo({ state: { err: err } });
              }
            );
        }
      }
    } else if (
      props.tabname === this.state.tabname &&
      this.state.old_rid !== this.state.rid
    ) {
      var token = localStorage.getItem("token");
      this.setState({
        loading: false,
        relation_loading: false,
        listName: props.tabname,
        // rid: props.rid,
        old_rid: this.state.rid,
        record: [],
        rcdView: [],
        button: [],
      });
      if (this.state.isDashboardInfo) {
        this.calledfromDidMount(this.state.dashboardData);
      } else {
        if (this.state.rty === "new") {
          axios
            .get(
              this.state.loca +
              "/loom/get/single/blankrecord/" +
              this.state.tabname,
              {
                headers: {
                  authorization: "Bearer " + token,
                },
              }
            )
            .then(
              (resp) => {
                const blkrecord = resp.data;
                if ("Error" in blkrecord) {
                  this.setState({
                    loading: false,
                    page_error: true,
                    error: blkrecord.Error,
                  });
                } else {
                  let rcd = [];
                  let userDetails = localStorage.getItem("userDetails");
                  let script = blkrecord.formRecord[4].uiscript;
                  rcd = blkrecord.formRecord[2].record;
                  if (script !== null) {
                    for (let i = 0; i < script.length; i++) {
                      let func = script[i].script;
                      let type = script[i].type;
                      if (type === "onload") {
                        this.onLoad(
                          func,
                          new ApUser(userDetails, this.setRecord("")),
                          new ApForm(rcd, this.setRecord(""))
                        );
                      }
                    }
                  }
                  let count = 0;
                  var fldtype = "";
                  let StartIndex=0;
                  let mapObj=new Map();
                  for (let i = 0; i < rcd.length; i++) {
                    if (rcd[i].type === "other_table_filter") {
                      fldtype = rcd[i].otherFilterColumn;
                      if (fldtype === "null" || fldtype === undefined) {
                        var fltt = [];
                        fltt.push(
                          JSON.parse(JSON.stringify(this.state.mainFilt))
                        );
                        this.setState({
                          filtarray: fltt,
                          timeline: this.state.timeline,
                        });
                      } else {
                        this.setState({
                          filtarray: rcd[i].value.filter,
                          timeline: rcd[i].value.timeline,
                          fldType: fldtype,
                        });
                      }
                    }
                    if (rcd[i].type === "filter") {
                      if (rcd[i].value === "" || rcd[i].value === "null") {
                        var fltt_ar = this.state.filtarray;
                        fltt_ar = [];
                        fltt_ar.push(
                          JSON.parse(JSON.stringify(this.state.mainFilt))
                        );
                        this.setState({
                          filtarray: fltt_ar,
                          timeline: this.state.timeline,
                        });
                      } else {
                        this.setState({
                          filtarray: rcd[i].value.filter,
                          timeline: rcd[i].value.timeline,
                        });
                        count++;
                      }
                    }
                    if (rcd[i].type === "filter_ref") {
                      if (rcd[i].value === "" || rcd[i].value === "null") {
                        var fltt_ar = this.state.filtRefArray;
                        fltt_ar = [];
                        fltt_ar.push(
                          JSON.parse(JSON.stringify(this.state.mainFilt))
                        );
                        this.setState({
                          filtRefArray: fltt_ar,
                          timeline: this.state.timeline,
                        });
                      } else {
                        this.setState({
                          filtRefArray: rcd[i].value.filter,
                          timeline: rcd[i].value.timeline,
                        });
                        count++;
                      }
                    }
                    if (rcd[i].type === "key_value") {
                      rcd[i].value = this.state.keyValueJson;
                    }
                    if (rcd[i].type === "group_key_value") {
                      rcd[i].value = this.state.groupkeyValue;
                      // this.setState({ groupkeyValue: rcd[i].value });
                    }
                    if (rcd[i].type === "multi_select") {
                      // rcd[i].value = [];
                      this.setState({ mscList: rcd[i].value.record });
                      count++;
                    }
                    if (
                      rcd[i].name === "loom_table_id" ||
                      rcd[i].name === "loomtable_id"
                    ) {
                      this.callTableColumn(rcd[i].value.value);
                      count++;
                    }

                    if (rcd[i].name === "reference_id") {
                      this.callTableColumn(rcd[i].value.value, false, true);
                      count++;
                    }
                    // if (count === 2) {
                    //   break;
                    // }
                    if(rcd[i]?.secondary==="true" && StartIndex==0){
                  
                      //setSecondaryStartIndex(i);
                      this.setState({secondaryStartIndex:i})
                      StartIndex++; 
                    }
                    if(rcd[i]?.secondary==="true"){
    
                     let fv = rcd[i]?.formView
                     console.log( "fv",fv);
                    let col = fv.path.split(".")[1];
                    if(mapObj.get(col)){
                      mapObj.get(col).push(fv);   
                    }else{
                      let vl=[];
                    vl.push(fv)
                    mapObj.set(col ,vl)
                    }
                 }
                  }

                  console.log("mapObj" ,mapObj);
                  this.setState({secondarycallsCols:mapObj})
                  for (let r = 0; r < rcd.length; r++) {
                    if (fldtype === rcd[r].name) {
                      this.callTableColumn(rcd[r].value.value, true);
                    }
                  }

                  for (let i = 0; i < rcd.length; i++) {
                    rcd[i].index = i;
                  }
                  rcd.sort((a, b) =>
                    parseInt(a.formView.pn) > parseInt(b.formView.pn)
                      ? 1
                      : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                        ? -1
                        : 0
                  );
                  let rd = [];
                  let rdd = [];
                  let left_rd = [];
                  let left_check = false;
                  let downRcd = [];
                  for (let i = 0; i < rcd.length; i++) {
                    if (rcd[i].formView.position === "left") {
                             // rcd[i].index = i;
                  // if (rcd[i].uivalid.visible=== "true") {
                  rd.push(rcd[i]);
                  // }
                  if (
                    i + 1 < rcd.length &&
                    rcd[i + 1].formView.position === "full"
                  ) {
                    rdd.push({
                      split: "true",
                      rcd: rd,
                      formView: {
                        co: rd[0].formView.co,
                        pn: rd[0].formView.pn,
                      },
                    });
                    left_rd = [];
                    left_check = true;
                    rd = [];
                  }
                    } else if (rcd[i].formView.position === "right") {
                      rd.push(rcd[i]);
                      console.log(
                        JSON.stringify(rcd[i + 1]) +
                        " rccddd : " +
                        JSON.stringify(rd)
                      );
                      if (
                        i === rcd.length - 1 ||
                        rcd[i + 1].formView.position === "full"
                      ) {
                        console.log("split check");
                        rdd.push({
                          split: "true",
                          rcd: rd,
                          formView: {
                            co: rd[0].formView.co,
                            pn: rd[0].formView.pn,
                          },
                        });
                        rd = [];
                        left_check = false;
                        left_rd = [];
                      }
                    } else {
                      if (left_check) {
                        console.log(rcd[i].uivalid.visible);
                        rcd[i].split = "false";
                        rdd.push(rcd[i]);
                      } else {
                        console.log(rcd[i]);
                        rcd[i].split = "false";
                        rdd.push(rcd[i]);
                      }
                    }
                  }
                  console.log(rdd, rd, left_rd);
              console.log(rdd);
              for (let i = 0; i < rdd.length; i++) {
                if (rdd[i].split === "true") {
                  rdd[i].rcd.sort((a, b) =>
                    parseInt(a.formView.pn) > parseInt(b.formView.pn)
                      ? 1
                      : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                        ? -1
                        : 0
                  );
                }
              }
              rdd.sort((a, b) =>
                parseInt(a.formView.pn) > parseInt(b.formView.pn)
                  ? 1
                  : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                    ? -1
                    : 0
              );
                  // let btn = blkrecord.formRecord[3].button;
                  // if (blkrecord.formRecord[1].table.value === "local_user") {
                  //   for (var i = 0; i < btn.length; i++) {
                  //     if (btn[i].name === "insert") {
                  //       this.setState({ buttonName: btn[i].name });
                  //     }
                  //   }
                  // }

                  rcd.sort((a, b) =>
                    parseInt(a.index) > parseInt(b.index)
                      ? 1
                      : parseInt(a.index) < parseInt(b.index)
                        ? -1
                        : 0
                  );
                  this.setState({
                    rty: props.ty,
                    // loading: false,
                    tablabel: blkrecord.formRecord[1].table.label,
                    tabId: blkrecord.formRecord[1].table.id,
                    copyRcd: rcd,
                    record: rcd,
                    rcdView: rdd,
                    button: blkrecord.formRecord[3].button,
                    tabrel: false,
                    page_error: false,
                    error: "",
                    page_message: false,
                    message: "",
                    mainrecord: blkrecord,
                    ap_form: new ApForm(rcd, this.setRecord("")),
                    ap_user: new ApUser(userDetails, this.setRecord("")),
                    uiscript: script,
                    downRcdView: downRcd,
                  });
                  this.checkRefrecord();
                }
              },
              (error) => {
                let err = { message: error.message, code: error.response.status };
                this.props.showErrorCompo({ state: { err: err } });
              }
            );
        } else if (this.state.rty === "record") {
          axios
            .get(
              this.state.loca +
              "/loom/get/singlerecord/" +
              this.state.tabname +
              "/" +
              this.state.rid,
              {
                headers: {
                  authorization: "Bearer " + token,
                },
              }
            )
            .then(
              (resp) => {
                const record = resp.data;
                if (record !== "") {
                  if ("Error" in record) {
                    this.setState({
                      loading: false,
                      page_error: true,
                      error: record.Error,
                    });
                  } else {
                    var mmm = record.formRecord[2].record;
                    var rvalue = "";
                    // let call_check = true;
                    for (var i = 0; i < mmm.length; i++) {
                      mmm[i].clicked = false;
                      if (mmm[i].displayColumn === "true") {
                        rvalue = mmm[i].value;
                      }
                      if (mmm[i].type === "password") {
                        mmm[i].value = "";
                      }
                      if (mmm[i].value !== "") {
                        mmm[i].verified = "verified";
                      } else {
                        mmm[i].verified = "initial";
                      }
                    }
                    let count = 0;
                    var fldtype = "";
                    let StartIndex=0;
                    let mapObj=new Map();
                    for (let i = 0; i < mmm.length; i++) {
                      if (mmm[i].type === "other_table_filter") {
                        fldtype = mmm[i].otherFilterColumn;
                        if (fldtype === "null" || fldtype === undefined) {
                          var fltar = this.state.filtarray;
                          fltar = [];
                          fltar.push(this.state.filt);
                          this.setState({
                            filtarray: fltar,
                            timeline: this.state.timeline,
                          });
                        } else {
                          this.setState({
                            filtarray: mmm[i].value.filter,
                            timeline: mmm[i].value.timeline,
                            fldType: fldtype,
                          });
                        }
                      }
                      if (mmm[i].type === "filter") {
                        if (mmm[i].value === "null" || mmm[i].value === "") {
                          var flt_ary = this.state.filtarray;
                          flt_ary = [];
                          flt_ary.push(this.state.filt);
                          this.setState({
                            filtarray: flt_ary,
                            timeline: this.state.timeline,
                          });
                        } else {
                          this.setState({
                            filtarray: mmm[i].value.filter,
                            timeline: mmm[i].value.timeline,
                          });
                          count++;
                        }
                      }
                      if (mmm[i].type === "filter_ref") {
                        if (mmm[i].value === "null" || mmm[i].value === "") {
                          var flt_ary = this.state.filtRefArray;
                          flt_ary = [];
                          flt_ary.push(this.state.filt);
                          this.setState({
                            filtRefArray: flt_ary,
                            timeline: this.state.timeline,
                          });
                        } else {
                          this.setState({
                            filtRefArray: mmm[i].value.filter,
                            timeline: mmm[i].value.timeline,
                          });
                          count++;
                        }
                      }
                      if (mmm[i].type === "multi_select") {
                        if (
                          mmm[i].value !== null ||
                          mmm[i].value !== "" ||
                          mmm[i].value !== "null" ||
                          mmm[i].value !== undefined
                        ) {
                          let parsVal = mmm[i].value.record;
                          this.setState({ mscList: parsVal });
                          count++;
                        } else {
                          // mmm[i].value = [];
                          let parsVal = mmm[i].value.record;
                          this.setState({ mscList: parsVal });
                          count++;
                        }
                      }
                      if (
                        mmm[i].name === "loom_table_id" ||
                        mmm[i].name === "loomtable_id"
                      ) {
                        if (
                          mmm[i].value.value !== null ||
                          mmm[i].value.value !== ""
                        ) {
                          // call_check = false;
                          this.callTableColumn(mmm[i].value.value);
                          count++;
                        }
                      }

                      if (mmm[i].name === "reference_id") {
                        if (
                          mmm[i].value.value !== null ||
                          mmm[i].value.value !== ""
                        ) {
                          this.callTableColumn(mmm[i].value.value, false, true);
                          count++;
                        }
                      }
                      // if (count === 4) {
                      //   break;
                      // }

                      if (mmm[i].name === "loom_column_id") {
                        if (
                          mmm[i].value.value !== null ||
                          mmm[i].value.value !== ""
                        ) {
                          this.callColumnByColId(mmm[i].value.id);
                        }
                      }
                      if(mmm[i]?.secondary==="true" && StartIndex==0){
                  
                        //setSecondaryStartIndex(i);
                        this.setState({secondaryStartIndex:i})
                        StartIndex++; 
                      }
                      if(mmm[i]?.secondary==="true"){
            
                       let fv = mmm[i]?.formView
                       console.log( "fv",fv);
                      let col = fv.path.split(".")[1];
                      if(mapObj.get(col)){
                        mapObj.get(col).push(fv);   
                      }else{
                        let vl=[];
                      vl.push(fv)
                      mapObj.set(col ,vl)
                      }
                   }
               
                    }
                    console.log("mapObj" ,mapObj);
                    this.setState({secondarycallsCols:mapObj})
                    for (let r = 0; r < mmm.length; r++) {
                      if (fldtype === mmm[r].name) {
                        this.callTableColumn(mmm[r].value.value, true);
                      }
                    }
                    let rcd = [];
                    let userDetails = localStorage.getItem("userDetails");
                    let script = record.formRecord[4].uiscript;
                    rcd = record.formRecord[2].record;
                    if (script !== null) {
                      for (let i = 0; i < script.length; i++) {
                        let func = script[i].script;
                        let type = script[i].type;
                        if (type === "onload") {
                          this.onLoad(
                            func,
                            new ApUser(userDetails, this.setRecord("")),
                            new ApForm(rcd, this.setRecord(""))
                          );
                        }
                      }
                    }

                    for (let i = 0; i < rcd.length; i++) {
                      rcd[i].index = i;
                    }

                    rcd.sort((a, b) =>
                      parseInt(a.formView.pn) > parseInt(b.formView.pn)
                        ? 1
                        : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                          ? -1
                          : 0
                    );
                    let rd = [];
                    let rdd = [];
                    let left_rd = [];
                    let left_check = false;
                    let downRcd = [];
                    console.log(JSON.stringify(rcd));
                    for (let i = 0; i < rcd.length; i++) {
                      if (rcd[i].type === "activity") {
                        downRcd.push(rcd[i]);
                      }
                      if (rcd[i].formView.position === "left") {
                        rd.push(rcd[i]);
                        if (
                          i + 1 < rcd.length &&
                          rcd[i + 1].formView.position === "full"
                        ) {
                          left_check = true;
                        }
                      } else if (rcd[i].formView.position === "right") {
                        rd.push(rcd[i]);
                        if (
                          i === rcd.length - 1 ||
                          rcd[i + 1].formView.position === "full"
                        ) {
                          rdd.push({
                            split: "true",
                            rcd: rd,
                            formView: { co: rd[0].formView.co },
                          });
                          for (let j = 0; j < left_rd.length; j++) {
                            rdd.push(left_rd[j]);
                          }
                          rd = [];
                          left_check = false;
                          left_rd = [];
                        }
                      } else {
                        if (left_check) {
                          rcd[i].split = "false";
                          left_rd.push(rcd[i]);
                        } else {
                          rcd[i].split = "false";
                          rdd.push(rcd[i]);
                        }
                      }
                    }
            
                    console.log(rdd, rd, left_rd);
                    for (let i = 0; i < rdd.length; i++) {
                      if (rdd[i].split === "true") {
                        rdd[i].rcd.sort((a, b) =>
                          parseInt(a.formView.pn) > parseInt(b.formView.pn)
                            ? 1
                            : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                              ? -1
                              : 0
                        );
                      }
                    }
                    rdd.sort((a, b) =>
                      parseInt(a.formView.pn) > parseInt(b.formView.pn)
                        ? 1
                        : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                          ? -1
                          : 0
                    );
                    console.log("rdd1",rdd);
                  //  console.log("mmmm" + JSON.stringify(mmm));
                    // rcd.sort((a,b)=>parseInt(a.beforeIndex)>parseInt(b.beforeIndex)?1:parseInt(a.beforeIndex)<parseInt(b.beforeIndex)?-1:0)
                    rcd.sort((a, b) =>
                      parseInt(a.index) > parseInt(b.index)
                        ? 1
                        : parseInt(a.index) < parseInt(b.index)
                          ? -1
                          : 0
                    );
                    this.setState({
                      rty: props.ty,
                      mainrecord: record,
                      copyRcd: rcd,
                      record: rcd,
                      rcdView: rdd,
                      // loading: false,
                      tablabel: record.formRecord[1].table.label,
                      tabId: record.formRecord[1].table.id,
                      button: record.formRecord[3].button,
                      i_d: record.formRecord[2].record[0].value,
                      rvalue: rvalue,
                      uiscript: script,
                      activity: record.formRecord[6].activity,
                      downRcdView: downRcd,
                    });
                    // if (call_check) {
                    this.relationVerify(rvalue);
                    // } else {
                    //   this.checkRefrecord();
                    // }
                  }
                }
              },
              (error) => {
                let err = { message: error.message, code: error.response.status };
                this.props.showErrorCompo({ state: { err: err } });
              }
            );
        }
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.ty === "new") {
      if (props.tabname !== state.tabname) {
        var flt = state.filtarray;
        flt = [];
        flt.push({
          co: "",
          cl: "",
          mc: "",
          an: "",
          ct: "",
          af: "",
          rf: { id: "", value: "" },
          dc: { id: "", value: "", label: "" },
        });
        return {
          tabname: props.tabname,
          rid: 0,
          old_rid: 0,
          rty: props.ty,
          col_mn: [],
          isMobile: props.isMobile,
          filtarray: flt,
        };
      } else if (props.tabname === state.tabname && props.rid === state.rid) {
        var fl = state.filtarray;
        fl = [];
        fl.push(state.filt);
        return {
          rid: 0,
          rty: props.ty,
          filtarray: fl,
          col_mn: [],
          isMobile: props.isMobile,
          tabname: props.tabname,
        };
      } else if (props.tabname === state.tabname && props.rid !== state.rid) {
        var fl = state.filtarray;
        fl = [];
        fl.push(state.filt);
        return {
          rid: 0,
          rty: props.ty,
          filtarray: fl,
          isMobile: props.isMobile,
          tabname: props.tabname,
          old_tabname: props.tabname,
        };
      }
    } else if (props.ty === "record") {
      if (props.tabname !== state.tabname) {
        return {
          tabname: props.tabname,
          rid: props.rid,
          old_rid: props.rid,
          rty: props.ty,
          col_mn: [],
          isMobile: props.isMobile,
        };
      } else if (props.tabname === state.tabname) {
        return {
          tabname: props.tabname,
          old_tabname: props.tabname,
          rid: props.rid,
          old_rid: props.rid,
          rty: props.ty,
          isMobile: props.isMobile,
        };
      } else if (props.rid !== state.rid) {
        return {
          rid: props.rid,
          rty: props.ty,
          col_mn: [],
          isMobile: props.isMobile,
        };
      }
    }
    return null;
  }

  setRecord(value) {
    this.setState({ record: value });
    return "record";
  }

  setContextMenu(val, x, y) {
    if (val === 2) {
      this.menuX.current = x;
      this.menuY.current = y;
      this.setState({ showContextMenu: true });
    } else {
      this.setState({ showContextMenu: false });
    }
  }

  setContext(val, x, y) {
    console.log(val, x, y);
    if (val === 2) {
      this.menuX.current = x;
      this.menuY.current = y;
      this.setState({ showContext: true });
    } else {
      this.setState({ showContext: false });
    }
  }

  onChange(func, val) {
    console.log(func, val);
    let fn = new Function(["ap_user", "ap_form", "val"], func);
    fn(this.state.ap_user, this.state.ap_form, val);
  }

  onCellEdit(func, val) {
    let fn = new Function(["ap_user", "ap_form", "val"], func);
    fn(this.state.ap_user, this.state.ap_form, val);
  }

  onSubmit(func) {
    let fn = new Function(["ap_user", "ap_form"], func);
    fn(this.state.ap_user, this.state.ap_form);
  }

  onLoad(func, user, form) {

    let fn = new Function(["ap_user", "ap_form"], func);
    fn(user, form);
  }

  onReference(func) {
    let fn = new Function(["ap_user", "ap_form"], func);
    let result = fn(this.state.ap_user, this.state.ap_form);
    if (result !== undefined) {
      this.state.filt(result);
    }
  }

  async relationVerify(rvalue) {
    var token = localStorage.getItem("token");
    this.setState({ relation_loading: true });
    var json = {
      relation: [
        {
          tabname: this.state.tabname,
          recordid: this.state.rid,
          value: rvalue,
        },
      ],
    };
    console.log(json);
    if (this.state.rid && this.state.tabname) {
      await axios
        .post(this.state.loca + "/loom/get/relation", json, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        })
        .then(
          (resp) => {
            const rvrecord = resp.data;
            if (rvrecord !== "") {
              if ("Error" in rvrecord) {
                this.setState({
                  relation_loading: false,
                  page_error: true,
                  error: rvrecord.Error,
                });
              } else {
                this.setState({
                  tabrelation: rvrecord,
                  relation_loading: false,
                  tabrel: true,
                });
                this.checkRefrecord();
              }
            }
          },
          (error) => {
            this.props.showErrorCompo();
          }
        );

    }
    else {
      this.setState({
        relation_loading: false,
      });
    }

  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShowOTPVerify() {
    this.setState({ showVerifyOtp: true });
  }

  handleCloseOTPVerify() {
    this.setState({ showVerifyOtp: false });
  }

  verifyOTP(val) {
    this.setState({ setOTP: val });
  }

  validationfn(vl, index, ob, type, id) {
    var formrecord = this.state.record;
    if (type === "reference") {
      if (vl !== "") {
        if (formrecord[index].clicked === true) {
          formrecord[index].verified = "verified";
        } else {
          var token = localStorage.getItem("token");
          var veri = '{"referenceRecord":[{"columnid":"' + id + '"},';
          veri += '{"tabvalue":' + JSON.stringify(vl) + "}]}";
          axios
            .post(this.state.loca + "/loom/reference/verify", veri.toString(), {
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
              },
            })
            .then(
              (resp) => {
                const refrencercd = resp.data;
                if (refrencercd !== "") {
                  if (refrencercd.Result === "Unverified") {
                    formrecord[index].verified = "unverified";
                    this.setState({ record: formrecord });
                  } else {
                    formrecord[index].verified = "verified";
                    var rfrcd = this.state.refrecord;
                    rfrcd.record = [];
                    this.setState({ record: formrecord, refrecord: [] });
                  }
                  this.setState({ record: formrecord });
                  return;
                }
              },
              (error) => {
                let err = {
                  message: error.message,
                  code: error.response.status,
                };
                this.props.showErrorCompo({ state: { err: err } });
              }
            );
        }
      } else {
        formrecord[index].verified = "initial";
        this.setState({ record: formrecord });
      }
    } else {
      if (vl !== "") {
        var minLength = formrecord[index].uivalid.min_length;
        if (minLength !== 0 && vl.length < minLength) {
          this.setState({ verify_error: "Please verify your character!" });
          formrecord[index].verified = "unverified";
        } else {
          if (formrecord[index].name === ob) {
            if (vl !== "") {
              formrecord[index].verified = this.fieldverify(
                formrecord[index].type,
                vl
              );
            } else {
              formrecord[index].verified = "initial";
            }
          }
        }
      }
      this.setState({ record: formrecord });
    }
  }

  callNextPage() {
    console.log("formTab: ", this.state.tabname);
    if (this.state.tabname === "client_new") {
      var fill = {
        filter: [
          {
            co: "state",
            cl: "State",
            mc: "=",
            an: "new",
            ct: "String",
            af: "",
            rf: { id: "", value: "" },
          },
        ],
      };
      this.props.showListCompo(this.state.tabname, fill, "");
    } else if (this.state.form_back === true) {
      this.props.showStatusCompo();
    } else {
      var fill = {
        filter: [
          {
            co: "",
            cl: "",
            mc: "",
            an: "",
            ct: "",
            af: "",
            rf: { id: "", value: "" },
            dc: { id: "", value: "", label: "" },
            ch: [],
          },
        ],
      };
      console.log("inn");
      this.props.showListCompo(this.state.tabname, fill, "");
    }
  }

  // callUserInfo() {
  //   this.props.showMainCompo(this.state.lu_obj);
  // }

  setRecordView(tabname, id) {
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/get/singlerecord/" + tabname + "/" + id, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        const relrecord = resp.data;
        console.log(relrecord);
        if (relrecord !== "") {
          if ("Error" in relrecord) {
            this.setState({
              loading: false,
              page_error: true,
              error: relrecord.Error,
            });
          } else {
            var mmm = relrecord.formRecord[2].record;
            var rvalue = "";
            for (var i = 0; i < mmm.length; i++) {
              mmm[i].clicked = false;
              if (mmm[i].displayColumn === "true") {
                rvalue = mmm[i].value;
              }
              if (mmm[i].type === "password") {
                mmm[i].value = "";
              }
              if (mmm[i].value !== "") {
                mmm[i].verified = "verified";
              } else {
                mmm[i].verified = "initial";
              }
            }
            let count = 0;
            var fldtype = "";
            let StartIndex=0;
            let mapObj=new Map();
            // let call_check = true;
            for (let i = 0; i < mmm.length; i++) {
              if (mmm[i].type === "other_table_filter") {
                fldtype = mmm[i].otherFilterColumn;
                if (
                  fldtype === "null" ||
                  fldtype === undefined ||
                  fldtype === ""
                ) {
                  var flt = this.state.filtarray;
                  flt = [];
                  flt.push(this.state.filt);
                  this.setState({
                    filtarray: flt,
                    timeline: this.state.timeline,
                  });
                } else {
                  if (mmm[i].value === "null") {
                    var fl_t = [];
                    fl_t.push(this.state.filt);
                    this.setState({
                      filtarray: fl_t,
                      timeline: this.state.timeline,
                    });
                  } else {
                    this.setState({
                      filtarray: mmm[i].value.filter,
                      timeline: mmm[i].value.timeline,
                      fldType: fldtype,
                    });
                  }
                }
              }
              if (mmm[i].type === "filter") {
                if (mmm[i].value === "null" || mmm[i].value === "") {
                  var flt_ary = this.state.filtarray;
                  flt_ary = [];
                  flt_ary.push(this.state.filt);
                  this.setState({
                    filtarray: flt_ary,
                    timeline: this.state.timeline,
                  });
                } else {
                  this.setState({
                    filtarray: mmm[i].value.filter,
                    timeline: mmm[i].value.timeline,
                  });
                  count++;
                }
              }
              if (mmm[i].type === "filter_ref") {
                if (mmm[i].value === "null" || mmm[i].value === "") {
                  var flt_arr = this.state.filtRefArray;
                  var flt_arr = [];
                  flt_arr.push(this.state.filt);
                  this.setState({
                    filtRefArray: flt_arr,
                    timeline: this.state.timeline,
                  });
                } else {
                  this.setState({
                    filtRefArray: mmm[i].value.filter,
                    timeline: mmm[i].value.timeline,
                  });
                  count++;
                }
              }
              if (mmm[i].type === "multi_select") {
                if (
                  mmm[i].value !== null ||
                  mmm[i].value !== "" ||
                  mmm[i].value !== "null" ||
                  mmm[i].value !== undefined
                ) {
                  let parsVal = mmm[i].value.record;
                  this.setState({ mscList: parsVal });
                  count++;
                }
              }
              if (
                mmm[i].name === "loom_table_id" ||
                mmm[i].name === "loomtable_id"
              ) {
                if (mmm[i].value.value !== null || mmm[i].value.value !== "") {
                  // call_check = false;
                  this.callTableColumn(mmm[i].value.value, false);
                  count++;
                }
              }
              // if (count === 4) {
              //   break;
              // }
              if (mmm[i].name === "reference_id") {
                if (mmm[i].value.value !== null || mmm[i].value.value !== "") {
                  this.callTableColumn(mmm[i].value.value, false, true);
                  count++;
                }
              }
              this.callTableColumn(mmm[i].value.value, false, true);
              count++;

              if (mmm[i].name === "loom_column_id") {
                if (mmm[i].value.value !== null || mmm[i].value.value !== "") {
                  this.callColumnByColId(mmm[i].value.id);
                }
              }
              if(mmm[i]?.secondary==="true" && StartIndex==0){
                  
                //setSecondaryStartIndex(i);
                this.setState({secondaryStartIndex:i})
                StartIndex++; 
              }
              if(mmm[i]?.secondary==="true"){
    
               let fv = mmm[i]?.formView
               console.log( "fv",fv);
              let col = fv.path.split(".")[1];
              if(mapObj.get(col)){
                mapObj.get(col).push(fv);   
              }else{
                let vl=[];
              vl.push(fv)
              mapObj.set(col ,vl)
              }
           }
      
            }
            console.log("mapObj" ,mapObj);
            this.setState({secondarycallsCols:mapObj})
            for (let r = 0; r < mmm.length; r++) {
              if (fldtype === mmm[r].name) {
                this.callTableColumn(mmm[r].value.value, true);
              }
            }
            let rcd = [];
            let userDetails = localStorage.getItem("userDetails");
            let script = relrecord.formRecord[4].uiscript;
            rcd = relrecord.formRecord[2].record;
            if (script !== null) {
              for (let i = 0; i < script.length; i++) {
                let func = script[i].script;
                let type = script[i].type;
                if (type === "onload") {
                  this.onLoad(
                    func,
                    new ApUser(userDetails, this.setRecord("")),
                    new ApForm(rcd, this.setRecord(""))
                  );
                }
              }
            }

            for (let i = 0; i < rcd.length; i++) {
              rcd[i].index = i;
            }

            rcd.sort((a, b) =>
              parseInt(a.formView.pn) > parseInt(b.formView.pn)
                ? 1
                : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                  ? -1
                  : 0
            );
            let rd = [];
            let rdd = [];
            let left_rd = [];
            let left_check = false;
            let downRcd = [];
            console.log(JSON.stringify(rcd));
            for (let i = 0; i < rcd.length; i++) {
              if (rcd[i].type === "activity") {
                downRcd.push(rcd[i]);
              }
              if (rcd[i].formView.position === "left") {
                rd.push(rcd[i]);
                if (
                  i + 1 < rcd.length &&
                  rcd[i + 1].formView.position === "full"
                ) {
                  left_check = true;
                }
              } else if (rcd[i].formView.position === "right") {
                rd.push(rcd[i]);
                if (
                  i === rcd.length - 1 ||
                  rcd[i + 1].formView.position === "full"
                ) {
                  rdd.push({
                    split: "true",
                    rcd: rd,
                    formView: { co: rd[0].formView.co },
                  });
                  for (let j = 0; j < left_rd.length; j++) {
                    rdd.push(left_rd[j]);
                  }
                  rd = [];
                  left_check = false;
                  left_rd = [];
                }
              } else {
                if (left_check) {
                  rcd[i].split = "false";
                  left_rd.push(rcd[i]);
                } else {
                  rcd[i].split = "false";
                  rdd.push(rcd[i]);
                }
              }
            }
    
            console.log(rdd, rd, left_rd);
            for (let i = 0; i < rdd.length; i++) {
              if (rdd[i].split === "true") {
                rdd[i].rcd.sort((a, b) =>
                  parseInt(a.formView.pn) > parseInt(b.formView.pn)
                    ? 1
                    : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                      ? -1
                      : 0
                );
              }
            }
            rdd.sort((a, b) =>
              parseInt(a.formView.pn) > parseInt(b.formView.pn)
                ? 1
                : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                  ? -1
                  : 0
            );
            console.log("rdd1",rdd);
          //  console.log("mmmm" + JSON.stringify(mmm));
            // rcd.sort((a,b)=>parseInt(a.beforeIndex)>parseInt(b.beforeIndex)?1:parseInt(a.beforeIndex)<parseInt(b.beforeIndex)?-1:0)
            rcd.sort((a, b) =>
              parseInt(a.index) > parseInt(b.index)
                ? 1
                : parseInt(a.index) < parseInt(b.index)
                  ? -1
                  : 0
            );
            this.setState({
              mainrecord: relrecord,
              record: rcd,
              rcdView: rdd,
              tablabel: relrecord.formRecord[1].table.label,
              tabId: relrecord.formRecord[1].table.id,
              button: relrecord.formRecord[3].button,
              i_d: relrecord.formRecord[2].record[0].value,
              rvalue: rvalue,
              ap_form: new ApForm(rcd, this.setRecord("")),
              ap_user: new ApUser(userDetails, this.setRecord("")),
              uiscript: script,
            });
            this.relationVerify(rvalue);
          }
        }
      });
  }

  callbtn(nam) {
    // let waitt = false;
    this.setState({ btn_disable: true });
    var uiScript = this.state.uiscript;
    for (let i = 0; i < uiScript.length; i++) {
      let func = uiScript[i].script;
      let type = uiScript[i].type;
      if (type === "onsubmit") {
        this.onSubmit(func);
      }
    }
    var btn = this.state.button;
    var mnrecord = this.state.mainrecord;
    var rcd = this.state.record;
    var mandatory = [];
    var unverified = [];

    for (let i = 0; i < rcd.length; i++) {
      // if (rcd[i].type === "multi_select") {
      //   rcd[i].value = JSON.stringify({ record: rcd[i].value });
      // }
      if (rcd[i].type === "filter" || rcd[i].type === "filter_script") {
        rcd[i].value = {
          filter: this.state.filtarray,
          timeline: this.state.timeline,
        };
      }
      if (rcd[i].type === "filter_ref") {
        rcd[i].value = {
          filter: this.state.filtRefArray,
          timeline: this.state.timeline,
        };
      }
    }
    for (var i = 0; i < rcd.length; i++) {
      if (rcd[i].uivalid.visible === "true" && rcd[i].type !== "boolean") {
        if (rcd[i].uivalid.mandatory === "true") {
          // if (rcd[i].type === "reference") {
          //   if (rcd[i].value.value === "") {
          //     mandatory.push(rcd[i].label.name);
          //   }
          // } else {
          //   if (rcd[i].value === "") {
          //     mandatory.push(rcd[i].label.name);
          //   }
          // }
          if (rcd[i].value === "") {
            mandatory.push(rcd[i].label.name);
          } else if (rcd[i].type === "reference" && rcd[i].value.value === "") {
            mandatory.push(rcd[i].label.name);
          } else if (
            typeof rcd[i].value === "string" &&
            rcd[i].value.trim() === ""
          ) {
            mandatory.push(rcd[i].label.name);
          }
        }

        if (
          rcd[i].type === "String" ||
          rcd[i].type === "int" ||
          rcd[i].type === "email" ||
          rcd[i].type === "date" ||
          rcd[i].type === "reference"
        ) {
          var veri = this.fieldverify(rcd[i].type, rcd[i].value);
          var msnd = rcd[i].uivalid.mandatory;
          if (veri === "unverified" && msnd === "true") {
            unverified.push(rcd[i].label.name);
          }
          if (rcd[i].type === "reference") {
            if (rcd[i].verified === "unverified") {
              unverified.push(rcd[i].label.name);
            }
          }
          if (rcd[i].type === "key_value") {
            // waitt = true;
            rcd[i].value = this.state.keyValueJson;
          }
        }
      }
    }

    var btntype = "";
    var btnRtype = "";
    var foundbtn = false;


    for (var ij = 0; ij < btn.length; ij++) {
      if (btn[ij].name === nam) {
        btntype = btn[ij].returnWebLocation;
        btnRtype = btn[ij].recordReturnType;
        foundbtn = true;
        break;
      }
    }
    if (foundbtn === true && btntype !== "") {
      this.setState({
        page_error: false,
        error: "",
        page_message: false,
        message: "",
      });
      setTimeout(() => {

        if (mandatory.length === 0 && unverified.length === 0) {
          mnrecord.formRecord[2].record = rcd;
          if (btn[ij].call_type === "html") {
            // var ht_ml = "";
            // var script = "";
            var value = "";
            for (var h = 0; h < rcd.length; h++) {
              // if (rcd[h].type === "html") {
              //   ht_ml = rcd[h].value;
              // }
              // if (rcd[h].name === "script") {
              //   script = rcd[h].value;
              // }
              if (rcd[h].name === "name") {
                value = rcd[h].value;
              }
            }
            // this.props.showHtmlPage(ht_ml, script);
            this.props.showHtmlPage(
              {
                filter: [
                  {
                    co: "name",
                    cl: "Name",
                    mc: "=",
                    an: value,
                    ct: "String",
                    af: "",
                    rf: { id: "", value: "" },
                  },
                ],
              },
              this.state.record
            );
          } else if (btnRtype === "Grid") {
            this.props.showClientInfoRec(this.state.tabname, this.state.rid);
          } else {
            var token = localStorage.getItem("token");
            if (btn[ij].call_type === "approve") {
              this.setState({ loading: true });
              var jso = {
                button: nam,
                recordId: this.state.rid,
                table: this.state.tabname,
                type: "manual",
                script: "",
              };
              axios
                .post(this.state.loca + btn[ij].webUrl, jso, {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + token,
                  },
                })
                .then((resp) => {

                  const rcd = resp.data;
                  console.log(rcd);
                  if (rcd !== "") {
                    if ("Error" in rcd) {
                      this.setState({
                        loading: false,
                        page_error: true,
                        error: rcd.Error,
                      });
                    } else {
                      this.setState({ loading: false });
                      var msg = rcd.message;
                      if (btntype === "NextPage") {
                        var nextP = btn[ij].nextPage;
                        if (nextP === "List") {
                          this.setState({ modal: false });
                          this.callNextPage();
                        }
                      } else if (btntype === "SamePage") {
                        this.setState({ modal: false });
                      }
                      if (msg !== null) {
                        toast(msg, {
                          position: "top-center",
                          theme: "colored",
                          type: "success",
                        });
                      }
                    }
                  }
                });
            } else if (btn[ij].call_type === "verify") {
              axios
                .post(this.state.loca + btn[ij].webUrl, mnrecord, {
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
                      this.setState({ loading: false });
                      var msg = rcd.result;
                      if (msg !== "") {
                        if (msg === "User not found") {
                          this.setState({ buttonName: "" });
                        }
                        if (nam.toLowerCase() === "verify") {
                          toast(msg, {
                            position: "top-center",
                            theme: "colored",
                            type: "success",
                          });
                        }
                      }
                    }
                  }
                })
                .finally(() => {
                  this.setState({ btn_disable: false });
                });
            } else if (btn[ij].call_type === "resetClient") {
              axios
                .post(this.state.loca + btn[ij].webUrl, mnrecord, {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + token,
                  },
                })
                .then((resp) => {
                  const rcd = resp.data;
                  console.log(rcd);
                  if (rcd !== "") {
                    if ("Error" in rcd) {
                      toast(rcd.Error, {
                        position: "top-center",
                        theme: "colored",
                        type: "error",
                      });
                    } else {
                      if ("message" in rcd) {
                        toast(rcd.message, {
                          position: "top-center",
                          theme: "colored",
                          type: "success",
                        })
                      }


                      this.setState({ loading: false });
                      var msg = rcd.result;
                      if (msg !== "") {
                        // if (msg === "User not found") {
                        //   this.setState({buttonName: ""});
                        // }
                        if (nam.toLowerCase() === "resetclient") {
                          toast(msg, {
                            position: "top-center",
                            theme: "colored",
                            type: "success",
                          });
                        }
                      }
                    }
                  }
                })
                .finally(() => {
                  this.setState({ btn_disable: false });
                });
            } else if (btn[ij].call_type === "move") {
              axios
                .post(this.state.loca + btn[ij].webUrl, mnrecord, {
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
                      this.setState({ loading: false });
                      var msg = rcd.message;
                      if (msg !== "") {
                        if (nam.toLowerCase() === "move") {
                          toast(msg, {
                            position: "top-center",
                            theme: "colored",
                            type: "success",
                          });
                        }
                      }
                    }
                  }
                })
                .finally(() => {
                  this.setState({ btn_disable: false });
                });
            } else if (btn[ij].call_type === "run_scrip") {
              var json =
                '{"rcd_Button":[' +
                JSON.stringify(btn[ij]) +
                "," +
                JSON.stringify(mnrecord) +
                "]}";
              axios
                .post(this.state.loca + btn[ij].webUrl, json, {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + token,
                  },
                })
                .then((resp) => {
                  const rcd = resp.data;
                  if (rcd !== "") {
                    if ("Error" in rcd) {
                      this.setState({
                        loading: false,
                        page_error: true,
                        error: rcd.Error,
                      });
                    } else {
                      let rced = rcd.formRecord[2].record;
                      let val = "";
                      for (let i = 0; i < rced.length; i++) {
                        if (rced[i].name === "id") {
                          val = rced[i].value;
                        }
                      }
                      this.setRecordView(rcd.formRecord[1].table.value, val);
                      this.setState({ loading: false });
                      var msg = rcd.formRecord[5].message;
                      if (msg !== "") {
                        this.setState({ page_message: true, message: msg });
                      }
                      if (btntype === "NextPage") {
                        var nextP = btn[ij].nextPage;
                        if (nextP === "List") {
                          this.callNextPage();
                        }
                      }
                    }
                  }
                })
                .finally(() => {
                  // setIsClick(false);
                  this.setState({ btn_disable: false });
                });
            }  else if (btn[ij].call_type === "runScriptServer") {

              console.log("runScriptServer" ,nam);
              axios
                .post(this.state.loca + "/loom/serverrule/" + nam, mnrecord, {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + token,
                  },
                })
                .then((resp) => {
                  const rcd = resp.data;
                  if (rcd !== "") {
                    if ("Error" in rcd) {
                      this.setState({
                        loading: false,
                        page_error: true,
                        error: rcd.Error,
                      });
                    } else {
                      let rced = rcd.formRecord[2].record;
                      let val = "";
                      for (let i = 0; i < rced.length; i++) {
                        if (rced[i].name === "id") {
                          val = rced[i].value;
                        }
                      }
                      this.setRecordView(rcd.formRecord[1].table.value, val);
                      this.setState({ loading: false });
                      var msg = rcd.formRecord[5].Message;
                      if (msg !== "") {
                        this.setState({ page_message: true, message: msg });
                      }
                      if (btntype === "NextPage") {
                        var nextP = btn[ij].nextPage;
                        if (nextP === "List") {
                          this.callNextPage();
                        }
                      }
                    }
                  }
                })
                .finally(() => {
                  // setIsClick(false);
                  this.setState({ btn_disable: false });
                });
            }else {

              console.log("xcgbvsdfgb", this.state.loca + btn[ij].webUrl);
              axios
                .post(this.state.loca + btn[ij].webUrl, mnrecord, {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + token,
                  },
                })
                .then(
                  (resp) => {
                    const rcd = resp.data;
                    console.log(rcd);
                    if (rcd !== "" && rcd !== null) {
                      if ("Error" in rcd) {
                        toast(rcd.Error, {
                          position: "top-center",
                          theme: "colored",
                          type: "error",
                        });
                      } else {
                        console.log(rcd);
                        this.setState({ loading: false });
                        let val = "";
                        if (rcd.formRecord) {
                          let rced = rcd.formRecord[2].record;

                          for (let i = 0; i < rced.length; i++) {
                            if (rced[i].name === "id") {
                              val = rced[i].value;
                            }
                          }
                        }
                        if (rcd.formRecord && btntype === "NextPage") {
                          var nextP = btn[ij].nextPage;
                          if (nextP === "List") {
                            localStorage.removeItem("pageClicked");
                            this.setState({ modal: false });
                            this.callNextPage();
                          }
                        } else if (rcd.formRecord && btntype === "SamePage") {
                          this.setRecordView(rcd.formRecord[1].table.value, val);
                        }
                        if (nam.toLowerCase() === "insert") {
                          toast("Insert Successfully", {
                            position: "bottom-center",
                            theme: "colored",
                            type: "success",
                          });
                        } else if (nam.toLowerCase() === "update") {
                          this.setState({ modal: false });
                          toast("Updated Successfully", {
                            position: "top-center",
                            theme: "colored",
                            type: "success",
                            // style: {
                            //   marginBottom: userDetails.OS !== "null" ? 12 : 0,
                            // },
                          });
                        } else if (nam.toLowerCase() === "delete") {
                          this.setState({ modal: false });
                          toast("Deleted Successfully", {
                            position: "top-center",
                            theme: "colored",
                            type: "success",
                            // style: {
                            //   marginBottom: userDetails.OS !== "null" ? 12 : 0,
                            // },
                          });
                        } else if ("message" in rcd) {
                          toast(rcd.message, {
                            position: "top-center",
                            theme: "colored",
                            type: "success",
                          });
                        }
                        else {
                          toast("Successfull", {
                            position: "top-center",
                            theme: "colored",
                            type: "success",
                          });
                        }
                      }
                    } else {
                      toast("Unexpected Error", {
                        position: "top-center",
                        theme: "colored",
                        type: "error",
                      });
                    }
                  },
                  (error) => {
                    toast("Something went wrong", {
                      position: "top-center",
                      theme: "colored",
                      type: "error",
                    });
                  }
                )
                .finally(() => {
                  // setIsClick(false);
                  this.setState({ btn_disable: false });
                });
            }
          }
        } else {
          // var token = localStorage.getItem("token");
          // if (btn[ij].call_type === "approve") {
          //   this.setState({ loading: true });
          //   var jso = {
          //     button: nam,
          //     recordId: this.state.rid,
          //     table: this.state.tabname,
          //     type: "manual",
          //     script: "",
          //   };
          //   axios
          //     .post(this.state.loca + btn[ij].webUrl, jso, {
          //       headers: {
          //         "Content-Type": "application/json",
          //         authorization: "Bearer " + token,
          //       },
          //     })
          //     .then((resp) => {
          //       const rcd = resp.data;
          //       if (rcd !== "") {
          //         if ("Error" in rcd) {
          //           this.setState({
          //             loading: false,
          //             page_error: true,
          //             error: rcd.Error,
          //           });
          //         } else {
          //           this.setState({ loading: false });
          //           var msg = rcd.message;
          //           if (msg !== "") {
          //             this.setState({
          //               page_message: true,
          //               message: msg,
          //               btn_disable: true,
          //             });
          //           }

          //            if (btntype === "NextPage") {
          //             var nextP = btn[ij].nextPage;
          //             if (nextP === "List") {
          //               this.setState({ modal: false });
          //               this.callNextPage();
          //             }
          //           }
          //         }
          //       }
          //     });
          // } else if (btn[ij].call_type === "run_scrip") {
          //   var json =
          //     '{"rcd_Button":[' +
          //     JSON.stringify(btn[ij]) +
          //     "," +
          //     JSON.stringify(mnrecord) +
          //     "]}";
          //   axios
          //     .post(this.state.loca + btn[ij].webUrl, json, {
          //       headers: {
          //         "Content-Type": "application/json",
          //         authorization: "Bearer " + token,
          //       },
          //     })
          //     .then((resp) => {
          //       const rcd = resp.data;
          //       if (rcd !== "") {
          //         if ("Error" in rcd) {
          //           this.setState({
          //             loading: false,
          //             page_error: true,
          //             error: rcd.Error,
          //           });
          //         } else {
          //           let rced = rcd.formRecord[2].record;
          //           let val = "";
          //           for (let i = 0; i < rced.length; i++) {
          //             if (rced[i].name === "id") {
          //               val = rced[i].value;
          //             }
          //           }
          //           this.setRecordView(rcd.formRecord[1].table.value, val);
          //           this.setState({ loading: false });
          //           var msg = rcd.formRecord[5].message;
          //           if (msg !== "") {
          //             this.setState({ page_message: true, message: msg });
          //           }
          //           if (btntype === "NextPage") {
          //             var nextP = btn[ij].nextPage;
          //             if (nextP === "List") {
          //               this.callNextPage();
          //             }
          //           }
          //         }
          //       }
          //     });
          // } else {
          //   axios
          //     .post(this.state.loca + btn[ij].webUrl, mnrecord, {
          //       headers: {
          //         "Content-Type": "application/json",
          //         authorization: "Bearer " + token,
          //       },
          //     })
          //     .then((resp) => {
          //       const rcd = resp.data;
          //       if (rcd !== "") {
          //         if ("Error" in rcd) {
          //           this.setState({
          //             loading: false,
          //             page_error: true,
          //             error: rcd.Error,
          //           });
          //         } else {
          //           this.setState({ loading: false });
          //           var msg = rcd.formRecord[5].message;
          //           if (msg !== "") {
          //             this.setState({
          //               page_message: true,
          //               message: msg,
          //               page_error: false,
          //               error: "",
          //               btn_disable: false,
          //             });
          //           }
          //           if (btntype === "NextPage") {
          //             var nextP = btn[ij].nextPage;
          //             if (nextP === "List") {
          //               localStorage.removeItem("pageClicked");
          //               this.setState({ modal: false });
          //               this.callNextPage();
          //             }
          //           }
          //         }
          //       }
          //     });
          this.setState({ btn_disable: false });
          var error_String = "";
          if (mandatory.length > 0) {
            error_String += " Check mandatory fields not set: " + mandatory;
          }
          if (unverified.length > 0) {
            error_String += " Fields unverified:" + unverified;
          }
          this.setState({
            loading: false,
            page_error: true,
            error: error_String,
          });
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
      }, 1000);
    }
  }

  onCh(val) {
    this.setState({ value: val });
  }

  async callTableColumn(val, ot, ref, parentTab) {
    var token = localStorage.getItem("token");
    if (val !== "" && val !== "none") {
      if (ref === false) {
        this.setState({ colState: false, tabname: val, col_mn: [{}] });
      }
      axios
        .get(this.state.loca + "/loom/get/column/" + val + "/" + parentTab, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then(
          (resp) => {
            const coldata = resp.data;
            console.log(coldata);
            if (coldata !== "") {
              if ("Error" in coldata) {
                this.setState({
                  loading: false,
                  page_error: true,
                  error: coldata.Error,
                });
              } else {
                var col_array = [];
                col_array.push({ id: "", name: "none", label: "None" });
                for (var c = 0; c < coldata.columnRecords.length; c++) {
                  col_array.push(coldata.columnRecords[c]);
                }
                var choicearry = [];
                for (var z = 0; z < coldata.columnRecords.length; z++) {
                  choicearry.push({
                    id: coldata.columnRecords[z].id,
                    name: coldata.columnRecords[z].name,
                    label: coldata.columnRecords[z].label,
                    value: coldata.columnRecords[z].name,
                    choice_order: z * 100 + "",
                    loom_column_id: "",
                  });
                }
                if (ot === true) {
                  this.setState({
                    colState: true,
                    column_other: col_array,
                    choice_mn: choicearry,
                  });
                } else {
                  if (ref === true) {
                    this.setState({
                      colState: true,
                      column_ref: col_array,
                      choice_mn: choicearry,
                    });
                  } else {
                    this.setState({
                      colState: true,
                      col_mn: col_array,
                      choice_mn: choicearry,
                    });
                  }
                }
              }
            }
          },
          (error) => {
            let err = {
              message: error.message,
              code: error.response.status,
            };
            this.props.showErrorCompo({ state: { err: err } });
          }
        );
    } else {
      this.setState({ col_mn: [{}] });
    }
  }

  async callColumnByColId(id) {
    var token = localStorage.getItem("token");
    if (id !== "0" && id !== "none") {
      this.setState({ column_depend: [{}] });
      axios
        .get(this.state.loca + "/loom/get/columnrecords/" + id, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then(
          (resp) => {
            const coldata = resp.data;
            if (coldata !== "") {
              if ("Error" in coldata) {
                this.setState({
                  loading: false,
                  page_error: true,
                  error: coldata.Error,
                });
              } else {
                var col_array = [];
                col_array.push({ id: "", name: "none", label: "None" });
                for (var c = 0; c < coldata.columnRecords.length; c++) {
                  col_array.push(coldata.columnRecords[c]);
                }
                var choicearry = [];
                for (var z = 0; z < coldata.columnRecords.length; z++) {
                  choicearry.push({
                    id: coldata.columnRecords[z].id,
                    name: coldata.columnRecords[z].name,
                    label: coldata.columnRecords[z].label,
                    value: coldata.columnRecords[z].name,
                    choice_order: z * 100 + "",
                    loom_column_id: "",
                  });
                }
                this.setState({
                  column_depend: col_array,
                  choice_mn: choicearry,
                });
              }
            }
          },
          (error) => {
            let err = {
              message: error.message,
              code: error.response.status,
            };
            this.props.showErrorCompo({ state: { err: err } });
          }
        );
    }
  }

  async checkRefrecord() {
    var token = localStorage.getItem("token");
    axios
      .get(
        this.state.loca + "/loom/get/reference/qualifier/" + this.state.tabname,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then(
        (resp) => {
          const rq_data = resp.data;
          if (rq_data !== "") {
            this.setState({ record_rq: rq_data });
            if (this.uiscript) {
              let script = this.uiscript.current;

            }
          }
        },
        (error) => {
          let err = {
            message: error.message,
            code: error.response.status,
          };
          this.props.showErrorCompo({ state: { err: err } });
        }
      );
  }
   getSecondaryFields =(index , ob , type ,id , vl)=>{
    
    console.log(index , ob , type ,id,vl);
    console.log(this.state.secondarycallsCols.get(ob));
    let arr=this.state.secondarycallsCols.get(ob);

    let pt="";
    if(this.state.secondarycallsCols.get(ob)){
      
      var frecord = this.state.record; 
    for(let p=0;p<arr.length;p++){
      if(p>0)
        pt+=",";
      pt+=JSON.stringify((arr[p]))
    }
    console.log(arr ,pt);
     // let st=`{tabName:"${vl} , id:"${id} , columns:${pt}}`
     let st={tabname:vl ,id:id , columns:arr}

      console.log("kk ",JSON.stringify(st));
      var token = localStorage.getItem("token");
      axios.post(this.state.loca+"/loom/get/secondary/record" ,st,{
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })      .then((resp)=>{
       
        console.log( resp.data);
        let data=resp.data
       let colsRecord=data.colsRecord

       console.log("secondaryStartIndex",this.state.secondaryStartIndex);
       for(let k=0;k<colsRecord.length;k++){

        for( let start=this.state.secondaryStartIndex;start < frecord.length;start++){
 
            if(frecord[start].formView.path===colsRecord[k].path){
               
              console.log("how many time");
              frecord[start].value =colsRecord[k].value
               if(frecord[start].type==="reference"){

                frecord[start].rcd_info="true"
               }
            }
        }
        
       }
     //  setRecord([...frecord]);
     this.setState({ record: frecord});
    console.log(frecord);
      })
      .catch((err)=>{
        console.log(err);

      })
    }
   


  }

  formChangefn(
    vl,
    index,
    ob,
    type,
    id,
    vrf,
    readonly,
    outerIndex,
    innerIndex,
    nme,
    obj,
    rcd_info,
  ) {
    this.setState({
      page_message: false,
      message: "",
      validation_error: false,
      validation: "",
      page_error: false,
      error: "",
    });
    console.log("formChange");
    var frecord = this.state.record;
    if (type === "reference") {
      if (ob === "form_group_id") {
        if (vl.properties) {
          this.state.keyValueJson.properties = [];
          let len = vl.properties.length;
          for (let i = 0; i < len; i++) {
            this.state.keyValueJson.properties.push({
              name: "",
              value: "",
            });
          }
          this.setState({ keyValueJson: this.state.keyValueJson });
        }
        for (let i = 0; i < frecord.length; i++) {
          if (frecord[i].name === "properties") {
            frecord[i].value = vl;
            break;
          }
        }
        this.setState({ record: frecord });
      }

      if (this.state.tabname === "reference_filter") {
        if (ob === "loom_column_id") {
          this.callColumnByColId(id);
        }
        if (ob === "loom_table_id") {
          this.callTableColumn(vl, false, false, this.state.tabname);
        }
      } else if (ob === "loom_table_id" || ob === "loomtable_id") {
        this.callTableColumn(vl, false, false, this.state.tabname);
      } else if (ob === "reference_id") {
        this.callTableColumn(vl, false, true, this.state.tabname);
      } else if (ob === this.state.fldType) {
        this.callTableColumn(vl, true, false, this.state.tabname);
      } else {
        if (this.state.tabname === "report") {
          this.callColumnByColId(id);
        }
      }
      if (vrf === false) {
        frecord[index].clicked = false;
      }
      if (vl !== "") {
        if (vl.length > 1) {
          if (obj)
            obj.showRecent = false
          if (vrf === true) {
            if (frecord[index].name === ob) {
              frecord[index].value.value = vl;
              frecord[index].value.id = id;
              frecord[index].clicked = true;
              frecord[index].verified = "verified";
              frecord[index].rcd_info = "true";
              var rfrcd2 = this.state.refrecord;
              rfrcd2.record = [];

              // calling secondary filed relted to current reference fie;d
            // index ob type
            this.getSecondaryFields(index , ob ,type ,id, frecord[index]?.refTable?.value)



              this.setState({ record: frecord, refrecord: rfrcd2 });
              // this.validationfn(vl, index, ob, type, id);

  
            }
          } else {
            // this.setState({frecord[index].rcd_info : false});
            if (frecord[index].name === ob) {
              frecord[index].value.value = vl;
              frecord[index].value.id = id;
              frecord[index].rcd_info = "false";
              // frecord[index].verified = "unverified";
              this.setState({ record: frecord });
            }
            var veri = '{"referenceRecord":[{"columnid":"' + id + '"},';
            veri += '{"tabvalue":"' + vl + '"}]}';
            var token = localStorage.getItem("token");
            var rff = [];
            axios
              .post(
                this.state.loca + "/loom/reference/record",
                veri.toString(),
                {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + token,
                  },
                }
              )
              .then(
                (resp) => {
                  const refrencercd = resp.data;
                  console.log("formchange: ", refrencercd);
                  if (refrencercd !== "") {
                    if ("Error" in refrencercd) {
                      this.setState({
                        loading: false,
                        page_error: true,
                        error: refrencercd.Error,
                      });
                    } else {
                      var ref_rcd =
                        refrencercd.referenceRecordList[2].records.length;
                      if (ref_rcd >= 5) {
                        ref_rcd = 5;
                      }
                      for (var i = 0; i < ref_rcd; i++) {
                        rff.push(refrencercd.referenceRecordList[2].records[i]);
                      }
                    }
                  }
                  var rf = { index: index, record: rff };

                  if (refrencercd.referenceRecordList[2].records.length > 0) {
                    frecord[index].verified = "";
                  } else {
                    frecord[index].verified = "unverified";
                  }
                  frecord[index].value.value = vl;
                  frecord[index].value.id = id;
                  this.setState({ refrecord: rf, record: frecord });
                },
                (error) => {
                  let err = {
                    message: error.message,
                    code: error.response.status,
                  };
                  this.props.showErrorCompo({ state: { err: err } });
                }
              );
          }
        } else {
          if (obj.recentSearch !== undefined && obj.recentSearch !== null) {
            if (obj.recentSearch.length >= 1)
              obj.showRecent = true
          }
          if (frecord[index].name === ob) {
            frecord[index].value.value = vl;
            frecord[index].value.id = id;
            frecord[index].verified = "";
            var rfrcd3 = this.state.refrecord;
            rfrcd3.record = [];
            this.setState({ record: frecord, refrecord: rfrcd3 });
          }
        }
      } else {
        if (frecord[index].name === ob) {
          frecord[index].value.value = vl;
          frecord[index].value.id = id;
          frecord[index].verified = "";
          var rfrcd3 = this.state.refrecord;
          rfrcd3.record = [];
          this.setState({ record: frecord, refrecord: rfrcd3 });
        }
      }
    } else if (type === "choice") {
      if (readonly === "false") {
        frecord[index].value = vl;
        this.setState({ record: frecord });
      }

      this.showRecent(obj, true)

    } else {
      frecord[index].verified = "initial";
      if (frecord[index].name === ob) {
        if (frecord[index].type === "String") {
          if (frecord[index].validation === "number") {
            if (/^[0-9]*$/.test(vl)) {
              frecord[index].value = vl;
              this.setState({
                record: frecord,
                validation_error: false,
                validation: "",
              });
            } else {
              document.getElementById("myPopup");
              this.setState({
                validation_error: true,
                validation: "Only Accept Number",
                ob: ob,
              });
            }
          } else if (frecord[index].validation === "character") {
            if (/^[a-zA-Z\s]*$/.test(vl)) {
              frecord[index].value = vl;
              this.setState({
                record: frecord,
                validation_error: false,
                validation: "",
              });
            } else {
              document.getElementById("myPopup");
              this.setState({
                validation_error: true,
                validation: "Invalid Input",
                ob: ob,
              });
            }
          } else if (frecord[index].validation === "withoutSpecialCharacter") {
            if (/^[_A-z0-9\s]*((-|\s)*[_A-z0-9])*$/.test(vl)) {
              frecord[index].value = vl;
              this.setState({ record: frecord });
            }
          } else if (frecord[index].validation === "withSpecialCharacter") {
            // if (/^[ A-Za-z0-9_@.:,/#*&+-]*$/.test(vl)) {
            if (/^(?!.*[@.:,/*#&+-]{2,})[A-Za-z0-9_@.:,/*#&+' -]*$/.test(vl)) {
              frecord[index].value = vl;
              this.setState({ record: frecord });
            }
          } else if (frecord[index].validation === "zipCode") {
            if (/^[0-9]{5}(?:-[0-9]{4})?$/.test(vl)) {
              frecord[index].value = vl;
              this.setState({ record: frecord });
            }
          } else if (frecord[index].validation === "decimal") {
            if (/^\d*\.?\d*$/.test(vl)) {
              frecord[index].value = vl;
              this.setState({ record: frecord });
            }
          } else if (frecord[index].validation === "ipAddress") {
            if (/((([0-9a-fA-F]){1,4})\\:){7}([0-9a-fA-F]){1,4}$/.test(vl)) {
              frecord[index].value = vl;
              this.setState({ record: frecord });
              //Ipv4 = (([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])
              //Ipv6 = ((([0-9a-fA-F]){1,4})\\:){7}([0-9a-fA-F]){1,4}
            }
          } else {
            // if (/^[a-zA-Z0-9_\s]*$/.test(vl)) {
            frecord[index].value = vl;
            this.setState({ record: frecord });
            // }
          }
        } else if (frecord[index].type === "key_value") {
          const updatedProperties = [this.state.keyValueJson.properties];
          updatedProperties[outerIndex] = {
            name: nme,
            value: vl,
          };
          this.setState({ keyValueJson: { properties: updatedProperties } });
        } else if (frecord[index].type === "group_key_value") {
          if (nme === "name") {
            frecord[index].value.properties[outerIndex][nme] = vl;
          }
          if (nme === "choice" && innerIndex !== null) {
            frecord[index].value.properties[outerIndex][nme][innerIndex].value =
              vl;
          }
          this.setState({ record: frecord });
        } else {
          frecord[index].value = vl;
          this.setState({ record: frecord });
        }
      }

    }

    /*     setTimeout(()=>{
    
          console.log(this.state.record);
        },2000) */
    this.showRecent(obj, true)


    var uiScript = this.state.uiscript;
    for (let i = 0; i < uiScript.length; i++) {
      let field = uiScript[i].field.name;
      let func = uiScript[i].script;
      let ui_type = uiScript[i].type;
      //script
      if (type === "choice") {
        if (field === ob && ui_type === "onchange") {
          this.onChange(func, vl);
        }
      } else {
        if (field === ob && ui_type === "onchange") {
          this.onChange(func, vl);
        }
        if (field === ob && ui_type === "oncelledit") {
          this.onCellEdit(func, vl);
        }
      }
    }
  }

  setRefrecord(vl, index, ob, type, id, via, obj) {
    console.log("innnnnn");
    var uiScript = this.state.uiscript;
    for (let i = 0; i < uiScript.length; i++) {
      let field = uiScript[i].field.name;
      let func = uiScript[i].script;
      let type = uiScript[i].type;
      //script
      if (field === ob && type === "onreference") {
        this.onReference(func);
      }
    }
    if (via === "recentSearch") {
      obj.showRecent = false;
      this.setState({ rcdView: this.state.rcdView })
    }
    this.formChangefn(vl, index, ob, type, id, true, undefined, undefined, "", "", obj);
  }

  setcolumn(index, name, type, col, readonly) {
    console.log("setCol");
    if (readonly === "false") {
      var rf = this.state.record_rq.referenceQualifier;
      console.log(rf);
      var ref_filt = this.state.ref_filter;
      ref_filt = [];
      for (var r = 0; r < rf.length; r++) {
        if (rf[r].loomColumn.id === col) {
          var filt = rf[r].filter.filter;
          for (var f = 0; f < filt.length; f++) {
            if (
              filt[f].mc === "is dependent" ||
              filt[f].ct === "depend_table"
            ) {
              var addFilt = "";
              if (f > 0) {
                addFilt = filt[f].af
              }
              var co_name = filt[f].dc.value;
              var co_label = filt[f].dc.label;
              let ab = this.getFieldValue(filt[f].rf.id);
              var filt1 = JSON.parse(JSON.stringify(this.state.mainFilt));
              filt1.af = addFilt
              filt1.co = co_name;
              filt1.cl = co_label;
              filt1.ct = type;
              filt1.mc = "=";
              filt1.rf.id = ab.id;
              filt1.rf.value = ab.value;

              ref_filt.push(filt1);
            }
          }
        }
        console.log(ref_filt);
        if (rf[r].loomColumn.id === col && "filter" in rf[r]) {
          var filtt = rf[r].filter.filter;
          for (var d = 0; d < filtt.length; d++) {
            if (filtt[d].ct === "depend_table") {
              var col_name = filtt[d].dc.value;
              var co_label = filt[f].dc.label;
              let ab = this.getFieldValue(filtt[d].rf.id);
              filtt = this.state.filt;
              filtt.co = col_name;
              filtt.co = co_label;
              filtt.ct = type;
              filtt.mc = "=";
              filtt.rf.id = ab.id;
              filtt.rf.value = ab.value;
              ref_filt.push(filtt);
            }
          }
        }
      }
      if (ref_filt.length === 0) {
        ref_filt.push(JSON.parse(JSON.stringify(this.state.mainFilt)));
      }
      this.setState({
        ref_filter: ref_filt,
        columnid: col,
        cur_ref_name: name,
        cur_ref_type: type,
        cur_ref_index: index,
        showmodel: true,
      });
      this.handleShow();
    }
  }

  getSingleInfo(e, obj, id) {
    // var token = localStorage.getItem("token");
    // this.setState({ loading: true, relation_loading: false });
    console.log("abc1", typeof this.state.record, this.state.record);
    console.log(obj);
    e.preventDefault();
    let infoRecord = {};
    if (obj.type === "depend_table") {
      infoRecord.tabName = "loom_column";
      infoRecord.tabId = obj.value.id;
    } else {
      infoRecord.tabName = obj.refTable.value;
      infoRecord.tabid = obj.value.id;
    }
    this.closeRef.current = true;
    if (infoRecord.tabid != "0") {
      var token = localStorage.getItem("token");
      axios
        .get(
          this.state.loca +
          "/loom/get/singlerecord/" +
          infoRecord.tabName +
          "/" +
          infoRecord.tabid,
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then(
          (resp) => {

            const relrecord = resp.data;
            console.log(relrecord);
            infoRecord.tabLabel = relrecord.formRecord[1].table.label;
            this.setState({ infoRcdDetail: infoRecord });
            if (relrecord !== "") {
              if ("Error" in relrecord) {
                this.setState({
                  loading: false,
                  page_error: true,
                  error: relrecord.Error,
                });
              } else {
                var mmm = relrecord.formRecord[2].record;
                var rvalue = "";
                for (var i = 0; i < mmm.length; i++) {
                  mmm[i].clicked = false;
                  if (mmm[i].displayColumn === "true") {
                    rvalue = mmm[i].value;
                  }
                  if (mmm[i].type === "password") {
                    mmm[i].value = "";
                  }
                  if (mmm[i].value !== "") {
                    mmm[i].verified = "verified";
                  } else {
                    mmm[i].verified = "initial";
                  }
                }
                let count = 0;
                var fldtype = "";
                let StartIndex=0;
                let mapObj=new Map();
                // let call_check = true;
                for (let i = 0; i < mmm.length; i++) {
                  if (mmm[i].type === "other_table_filter") {
                    fldtype = mmm[i].otherFilterColumn;
                    if (
                      fldtype === "null" ||
                      fldtype === undefined ||
                      fldtype === ""
                    ) {
                      var flt = this.state.filtarray;
                      flt = [];
                      flt.push(this.state.filt);
                      this.setState({
                        filtarray: flt,
                        timeline: this.state.timeline,
                      });
                    } else {
                      if (mmm[i].value === "null") {
                        var fl_t = [];
                        fl_t.push(this.state.filt);
                        this.setState({
                          filtarray: fl_t,
                          timeline: this.state.timeline,
                        });
                      } else {
                        this.setState({
                          filtarray: mmm[i].value.filter,
                          timeline: mmm[i].value.timeline,
                          fldType: fldtype,
                        });
                      }
                    }
                  }
                  if (mmm[i].type === "filter") {
                    if (mmm[i].value === "null") {
                      var flt_arr = [];
                      flt_arr.push(this.state.filt);
                      this.setState({
                        filtarray: flt_arr,
                        timeline: this.state.timeline,
                      });
                    } else {
                      this.setState({
                        filtarray: mmm[i].value.filter,
                        timeline: mmm[i].value.timeline,
                      });
                      count++;
                    }
                  }
                  if (mmm[i].type === "multi_select") {
                    if (
                      mmm[i].value !== null ||
                      mmm[i].value !== "" ||
                      mmm[i].value !== "null" ||
                      mmm[i].value !== undefined
                    ) {
                      let parsVal = mmm[i].value;
                      this.setState({ mscList: parsVal });
                      count++;
                    }
                  }
                  if (
                    mmm[i].name === "loom_table_id" ||
                    mmm[i].name === "loomtable_id"
                  ) {
                    if (
                      mmm[i].value.value !== null ||
                      mmm[i].value.value !== ""
                    ) {
                      // call_check = false;
                      this.callTableColumn(mmm[i].value.value, false);
                      count++;
                    }
                  }
                  // if (count === 4) {
                  //   break;
                  // }

                  if (mmm[i].name === "loom_column_id") {
                    if (
                      mmm[i].value.value !== null ||
                      mmm[i].value.value !== ""
                    ) {
                      this.callColumnByColId(mmm[i].value.id);
                    }
                  }

                  if(mmm[i]?.secondary==="true" && StartIndex==0){
                  
                    //setSecondaryStartIndex(i);
                    this.setState({secondaryStartIndex:i})
                    StartIndex++; 
                  }
                  if(mmm[i]?.secondary==="true"){
        
                   let fv = mmm[i]?.formView
                   console.log( "fv",fv);
                  let col = fv.path.split(".")[1];
                  if(mapObj.get(col)){
                    mapObj.get(col).push(fv);   
                  }else{
                    let vl=[];
                  vl.push(fv)
                  mapObj.set(col ,vl)
                  }
               }
            
                }
                console.log("mapObj" ,mapObj);
                this.setState({secondarycallsCols:mapObj})
                for (let r = 0; r < mmm.length; r++) {
                  if (fldtype === mmm[r].name) {
                    this.callTableColumn(mmm[r].value.value, true);
                  }
                }
                let rcd = [];
                let userDetails = localStorage.getItem("userDetails");
                let script = relrecord.formRecord[4].uiscript;
                rcd = relrecord.formRecord[2].record;
                if (script !== null) {
                  for (let i = 0; i < script.length; i++) {
                    let func = script[i].script;
                    let type = script[i].type;
                    if (type === "onload") {
                      this.onLoad(
                        func,
                        new ApUser(userDetails, this.setRecord(this.state.record)),
                        new ApForm(rcd, this.setRecord(this.state.record))
                      );
                    }
                  }
                }

                for (let i = 0; i < rcd.length; i++) {
                  rcd[i].index = i;
                }
                rcd.sort((a, b) =>
                  parseInt(a.formView.pn) > parseInt(b.formView.pn)
                    ? 1
                    : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                      ? -1
                      : 0
                );
                let rd = [];
                let rdd = [];
                let left_rd = [];
                let left_check = false;
                let downRcd = [];
                console.log(JSON.stringify(rcd));
                for (let i = 0; i < rcd.length; i++) {
                  if (rcd[i].type === "activity") {
                    downRcd.push(rcd[i]);
                  }
                  if (rcd[i].formView.position === "left") {
                    rd.push(rcd[i]);
                    if (
                      i + 1 < rcd.length &&
                      rcd[i + 1].formView.position === "full"
                    ) {
                      left_check = true;
                    }
                  } else if (rcd[i].formView.position === "right") {
                    rd.push(rcd[i]);
                    if (
                      i === rcd.length - 1 ||
                      rcd[i + 1].formView.position === "full"
                    ) {
                      rdd.push({
                        split: "true",
                        rcd: rd,
                        formView: { co: rd[0].formView.co },
                      });
                      for (let j = 0; j < left_rd.length; j++) {
                        rdd.push(left_rd[j]);
                      }
                      rd = [];
                      left_check = false;
                      left_rd = [];
                    }
                  } else {
                    if (left_check) {
                      rcd[i].split = "false";
                      left_rd.push(rcd[i]);
                    } else {
                      rcd[i].split = "false";
                      rdd.push(rcd[i]);
                    }
                  }
                }
        
                console.log(rdd, rd, left_rd);
                for (let i = 0; i < rdd.length; i++) {
                  if (rdd[i].split === "true") {
                    rdd[i].rcd.sort((a, b) =>
                      parseInt(a.formView.pn) > parseInt(b.formView.pn)
                        ? 1
                        : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                          ? -1
                          : 0
                    );
                  }
                }
                rdd.sort((a, b) =>
                  parseInt(a.formView.pn) > parseInt(b.formView.pn)
                    ? 1
                    : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                      ? -1
                      : 0
                );
                console.log("rdd1",rdd);
              //  console.log("mmmm" + JSON.stringify(mmm));
                // rcd.sort((a,b)=>parseInt(a.beforeIndex)>parseInt(b.beforeIndex)?1:parseInt(a.beforeIndex)<parseInt(b.beforeIndex)?-1:0)
                rcd.sort((a, b) =>
                  parseInt(a.index) > parseInt(b.index)
                    ? 1
                    : parseInt(a.index) < parseInt(b.index)
                      ? -1
                      : 0
                );
                this.setState({
                  infoRcdView: rdd,
                  showModalInfo: true,
                });

                console.log("abc", typeof this.state.record, this.state.record);
              }
            }
          },
          (error) => {
            let err = { message: error.message, code: error.response.status };
            this.props.showErrorCompo({ state: { err: err } });
          }
        );
    }
  }

  handleCancel() {
    this.setState({ showModalInfo: false });
  }

  openRecord() {
    this.props.showFormCompo(
      this.state.infoRcdDetail.tabName,
      this.state.infoRcdDetail.tabid,
      "record"
    );
    this.setState({ showModalInfo: false });
  }

  getFieldValue(col_id) {
    var rcd = this.state.record;
    if (rcd !== "null" && rcd !== "") {
      for (var r = 0; r < rcd.length; r++) {
        if (rcd[r].id === col_id) {
          return rcd[r].value;
        }
      }
    }
  }

  closemodal() {
    this.setState({ showmodel: false });
  }

  setRef(val, r_id) {
    this.setRefrecord(
      val,
      this.state.cur_ref_index,
      this.state.cur_ref_name,
      this.state.cur_ref_type,
      r_id
    );
    this.handleClose();
  }

  async callfilter(filtarray, index, in_index, col_id) {
    var rcd = this.state.record;
    if (col_id !== -1) {
      for (let i = 0; i < rcd.length; i++) {
        if (
          filtarray[in_index].ct === "choice" &&
          filtarray[in_index].ch.length === 0
        ) {
          let chc = await this.getChoiceRcd(col_id).then((res) => {
            if (res.length > 0) {
              filtarray[in_index].ch = res;
              filtarray[in_index].an = res[0].name;
            } else {
              filtarray[in_index].ch = [];
            }
          });
        }
      }
    }
    this.setState({
      filtarray: filtarray,
      record: rcd,
    });
  }

  calltimeline(timeline) {
    this.setState({
      timeline: timeline,
    });
  }

  callScript(script, index) {
    var rcd = this.state.record;
    rcd[index].value.script = script;
    this.setState({ record: rcd });
  }

  setMSC(val, index, name, type, id) {
    this.formChangefn(val, index, name, type, id, true);
  }

  async getChoiceRcd(col_id) {
    var token = localStorage.getItem("token");
    let ck = await axios
      .get(this.state.loca + "/loom/get/choice/" + col_id, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        let res = resp.data;
        if ("Error" in res) {
          this.setState({
            loading: false,
            page_error: true,
            error: res.Error,
          });
        } else {
          let chk = res.choiceRecords;
          chk.unshift({ name: "none", value: "None" });
          return chk;
        }
      });
    return ck;
  }

  fieldverify(type, vl) {
    // this.setState({ page_error: false, error: "", page_message: false, message: "" });
    if (type === "String") {
      return "verified";
    }
    if (type === "email") {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "int") {
      if (/^[0-9]*$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "date") {
      if (/^[+-]?\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "time") {
      if (/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "reference") {
      if (/[a-zA-Z]/g.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "filter") {
      if (/[a-zA-Z]/g.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }

    if (type === "aadhar_number") {
      if (/\d{12}/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
  }

  getScriptList() {
    this.getFormDetails();
  }

  getFormDetails() {
    var token = localStorage.getItem("token");
    this.setState({ loading: true, relation_loading: false });
    if (this.state.rty === "new") {
      axios
        .get(
          this.state.loca +
          "/loom/get/single/blankrecord/" +
          this.state.tabname,
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then((resp) => {
          const blkrecord = resp.data;
          console.log(blkrecord);
          if (blkrecord !== "") {
            if ("Error" in blkrecord) {
              this.setState({
                loading: false,
                page_error: true,
                error: blkrecord.Error,
              });
            } else {
              let rcd = [];
              let userDetails = localStorage.getItem("userDetails");
              var status = localStorage.getItem("status");
              let st = JSON.parse(status);
              let script = blkrecord.formRecord[4].uiscript;
              rcd = blkrecord.formRecord[2].record;
              if (script !== null) {
                for (let i = 0; i < script.length; i++) {
                  let func = script[i].script;
                  let type = script[i].type;
                  if (type === "onload") {
                    this.onLoad(
                      func,
                      new ApUser(userDetails, this.setRecord("")),
                      new ApForm(rcd, this.setRecord(""))
                    );
                  }
                }
              }
              let count = 0;
              var fldtype = "";
              let StartIndex=0;
              let mapObj=new Map();
              for (let i = 0; i < rcd.length; i++) {
                if (st != null) {
                  if (blkrecord.formRecord[1].table.value === st.tableName) {
                    if (rcd[i].name === "workshop_id") {
                      if (rcd[i].type === "reference") {
                        rcd[i].value.id = st.workshop_id;
                        rcd[i].value.value = st.workshop_name;
                      }
                    }
                    if (rcd[i].name === "loom_id") {
                      if (rcd[i].type === "reference") {
                        rcd[i].value.id = st.loom_id;
                        rcd[i].value.value = st.loom_name;
                      }
                    }
                    this.setState({ form_back: true });
                  }
                }
                if (rcd[i].type === "other_table_filter") {
                  fldtype = rcd[i].otherFilterColumn;
                  if (fldtype === "null" || fldtype === undefined) {
                    var fl = [];
                    fl.push(JSON.parse(JSON.stringify(this.state.mainFilt)));
                    this.setState({
                      filtarray: fl,
                      timeline: this.state.timeline,
                    });
                  } else {
                    this.setState({
                      filtarray: rcd[i].value.filter,
                      timeline: rcd[i].value.timeline,
                      fldType: fldtype,
                    });
                  }
                }
                if (rcd[i].type === "filter") {
                  if (rcd[i].value === "" || rcd[i].value === "null") {
                    var fll = this.state.filtarray;
                    fll = [];
                    fll.push(JSON.parse(JSON.stringify(this.state.mainFilt)));
                    this.setState({
                      filtarray: fll,
                      timeline: this.state.timeline,
                    });
                  } else {
                    this.setState({
                      filtarray: rcd[i].value.filter,
                      timeline: rcd[i].value.timeline,
                    });
                    count++;
                  }
                }
                if (rcd[i].type === "filter_script") {
                  if (rcd[i].value === "" || rcd[i].value === "null") {
                    var fll = this.state.filtarray;
                    fll = [];
                    fll.push(JSON.parse(JSON.stringify(this.state.mainFilt)));
                    this.setState({
                      filtarray: fll,
                      timeline: this.state.timeline,
                    });
                  } else {
                    this.setState({
                      filtarray: rcd[i].value.filter,
                      timeline: rcd[i].value.timeline,
                    });
                    count++;
                  }
                }
                if (rcd[i].type === "multi_select") {
                  rcd[i].value = [];
                  let parsVal = rcd[i].value;
                  this.setState({ mscList: parsVal });
                  count++;
                }
                if (
                  rcd[i].name === "loom_table_id" ||
                  rcd[i].name === "loomtable_id"
                ) {
                  this.callTableColumn(rcd[i].value.value, false);
                  count++;
                }
                // if (count === 4) {
                //   break;
                // }
                if(rcd[i]?.secondary==="true" && StartIndex==0){
                  
                  //setSecondaryStartIndex(i);
                  this.setState({secondaryStartIndex:i})
                  StartIndex++; 
                }
                if(rcd[i]?.secondary==="true"){

                 let fv = rcd[i]?.formView
                 console.log( "fv",fv);
                let col = fv.path.split(".")[1];
                if(mapObj.get(col)){
                  mapObj.get(col).push(fv);   
                }else{
                  let vl=[];
                vl.push(fv)
                mapObj.set(col ,vl)
                }
            
             }
              }

              console.log("mapObj" ,mapObj);
              this.setState({secondarycallsCols:mapObj})
              for (let r = 0; r < rcd.length; r++) {
                if (fldtype === rcd[r].name) {
                  this.callTableColumn(rcd[r].value.value, true);
                }
              }

              for (let i = 0; i < rcd.length; i++) {
                rcd[i].index = i;
              }

              rcd.sort((a, b) =>
                parseInt(a.formView.pn) > parseInt(b.formView.pn)
                  ? 1
                  : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                    ? -1
                    : 0
              );
              let rd = [];
              let rdd = [];
              let left_rd = [];
              let left_check = false;
              let downRcd = [];
              for (let i = 0; i < rcd.length; i++) {
                if (rcd[i].formView.position === "left") {
                         // rcd[i].index = i;
              // if (rcd[i].uivalid.visible=== "true") {
              rd.push(rcd[i]);
              // }
              if (
                i + 1 < rcd.length &&
                rcd[i + 1].formView.position === "full"
              ) {
                rdd.push({
                  split: "true",
                  rcd: rd,
                  formView: {
                    co: rd[0].formView.co,
                    pn: rd[0].formView.pn,
                  },
                });
                left_rd = [];
                left_check = true;
                rd = [];
              }
                } else if (rcd[i].formView.position === "right") {
                  rd.push(rcd[i]);
                  console.log(
                    JSON.stringify(rcd[i + 1]) +
                    " rccddd : " +
                    JSON.stringify(rd)
                  );
                  if (
                    i === rcd.length - 1 ||
                    rcd[i + 1].formView.position === "full"
                  ) {
                    console.log("split check");
                    rdd.push({
                      split: "true",
                      rcd: rd,
                      formView: {
                        co: rd[0].formView.co,
                        pn: rd[0].formView.pn,
                      },
                    });
                    rd = [];
                    left_check = false;
                    left_rd = [];
                  }
                } else {
                  if (left_check) {
                    console.log(rcd[i].uivalid.visible);
                    rcd[i].split = "false";
                    rdd.push(rcd[i]);
                  } else {
                    console.log(rcd[i]);
                    rcd[i].split = "false";
                    rdd.push(rcd[i]);
                  }
                }
              }
              console.log(rdd, rd, left_rd);
          console.log(rdd);
          for (let i = 0; i < rdd.length; i++) {
            if (rdd[i].split === "true") {
              rdd[i].rcd.sort((a, b) =>
                parseInt(a.formView.pn) > parseInt(b.formView.pn)
                  ? 1
                  : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                    ? -1
                    : 0
              );
            }
          }
          rdd.sort((a, b) =>
            parseInt(a.formView.pn) > parseInt(b.formView.pn)
              ? 1
              : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                ? -1
                : 0
          );
              // let btn = blkrecord.formRecord[3].button;
              // if (blkrecord.formRecord[1].table.value === "local_user") {
              //   for (var i = 0; i < btn.length; i++) {
              //     if (btn[i].name === "insert") {
              //       this.setState({ buttonName: btn[i].name });
              //     }
              //   }
              // }

              rcd.sort((a, b) =>
                parseInt(a.index) > parseInt(b.index)
                  ? 1
                  : parseInt(a.index) < parseInt(b.index)
                    ? -1
                    : 0
              );
              this.setState({
                tablabel: blkrecord.formRecord[1].table.label,
                tabId: blkrecord.formRecord[1].table.id,
                record: rcd,
                rcdView: rdd,
                button: blkrecord.formRecord[3].button,
                mainrecord: blkrecord,
                ap_form: new ApForm(rcd, this.setRecord("")),
                ap_user: new ApUser(userDetails, this.setRecord("")),
                uiscript: script,
                loading: false,
              });
              this.checkRefrecord();
            }
          }
        });
    } else if (this.state.rty === "record") {
      this.setState({ loading: true, relation_loading: false });
      axios
        .get(
          this.state.loca +
          "/loom/get/singlerecord/" +
          this.state.tabname +
          "/" +
          this.state.rid,
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then((resp) => {
          const relrecord = resp.data;
          if (relrecord !== "") {
            if ("Error" in relrecord) {
              this.setState({
                loading: false,
                page_error: true,
                error: relrecord.Error,
              });
            } else {
              var mmm = relrecord.formRecord[2].record;
              var rvalue = "";
              for (var i = 0; i < mmm.length; i++) {
                mmm[i].clicked = false;
                if (mmm[i].displayColumn === "true") {
                  rvalue = mmm[i].value;
                }
                if (mmm[i].type === "password") {
                  mmm[i].value = "";
                }
                if (mmm[i].value !== "") {
                  mmm[i].verified = "verified";
                } else {
                  mmm[i].verified = "initial";
                }
              }
              let count = 0;
              var fldtype = "";
              let StartIndex=0;
              let mapObj=new Map();
              // let call_check = true;
              for (let i = 0; i < mmm.length; i++) {
                if (mmm[i].type === "other_table_filter") {
                  fldtype = mmm[i].otherFilterColumn;
                  if (
                    fldtype === "null" ||
                    fldtype === undefined ||
                    fldtype === ""
                  ) {
                    var flt = this.state.filtarray;
                    flt = [];
                    flt.push(this.state.filt);
                    this.setState({
                      filtarray: flt,
                      timeline: this.state.timeline,
                    });
                  } else {
                    if (mmm[i].value === "null") {
                      var fl_t = [];
                      fl_t.push(this.state.filt);
                      this.setState({
                        filtarray: fl_t,
                        timeline: this.state.timeline,
                      });
                    } else {
                      this.setState({
                        filtarray: mmm[i].value.filter,
                        timeline: mmm[i].value.timeline,
                        fldType: fldtype,
                      });
                    }
                  }
                }
                if (mmm[i].type === "filter") {
                  if (mmm[i].value === "null") {
                    var flt_arr = [];
                    flt_arr.push(this.state.filt);
                    this.setState({
                      filtarray: flt_arr,
                      timeline: this.state.timeline,
                    });
                  } else {
                    this.setState({
                      filtarray: mmm[i].value.filter,
                      timeline: mmm[i].value.timeline,
                    });
                    count++;
                  }
                }
                if (mmm[i].type === "multi_select") {
                  if (
                    mmm[i].value !== null ||
                    mmm[i].value !== "" ||
                    mmm[i].value !== "null" ||
                    mmm[i].value !== undefined
                  ) {
                    let parsVal = mmm[i].value;
                    this.setState({ mscList: parsVal });
                    count++;
                  }
                }
                if (
                  mmm[i].name === "loom_table_id" ||
                  mmm[i].name === "loomtable_id"
                ) {
                  if (
                    mmm[i].value.value !== null ||
                    mmm[i].value.value !== ""
                  ) {
                    // call_check = false;
                    this.callTableColumn(mmm[i].value.value, false);
                    count++;
                  }
                }
                // if (count === 4) {
                //   break;
                // }

                if (mmm[i].name === "loom_column_id") {
                  if (
                    mmm[i].value.value !== null ||
                    mmm[i].value.value !== ""
                  ) {
                    this.callColumnByColId(mmm[i].value.id);
                  }
                }

                if(mmm[i]?.secondary==="true" && StartIndex==0){
                  
                  //setSecondaryStartIndex(i);
                  this.setState({secondaryStartIndex:i})
                  StartIndex++; 
                }
                if(mmm[i]?.secondary==="true"){
      
                 let fv = mmm[i]?.formView
                 console.log( "fv",fv);
                let col = fv.path.split(".")[1];
                if(mapObj.get(col)){
                  mapObj.get(col).push(fv);   
                }else{
                  let vl=[];
                vl.push(fv)
                mapObj.set(col ,vl)
                }
             }
         
              }
              console.log("mapObj" ,mapObj);
              this.setState({secondarycallsCols:mapObj})
              for (let r = 0; r < mmm.length; r++) {
                if (fldtype === mmm[r].name) {
                  this.callTableColumn(mmm[r].value.value, true);
                }
              }
              let rcd = [];
              let userDetails = localStorage.getItem("userDetails");
              let script = relrecord.formRecord[4].uiscript;
              rcd = relrecord.formRecord[2].record;
              if (this.uiscript) {
                this.uiscript.current = script;
              }

              if (script !== null) {
                for (let i = 0; i < script.length; i++) {
                  let func = script[i].script;
                  let type = script[i].type;
                  if (type === "onload") {
                    this.onLoad(
                      func,
                      new ApUser(userDetails, this.setRecord("")),
                      new ApForm(rcd, this.setRecord(""))
                    );
                  }
                }
              }

              for (let i = 0; i < rcd.length; i++) {
                rcd[i].index = i;
              }

              rcd.sort((a, b) =>
                parseInt(a.formView.pn) > parseInt(b.formView.pn)
                  ? 1
                  : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                    ? -1
                    : 0
              );
              let rd = [];
              let rdd = [];
              let left_rd = [];
              let left_check = false;
              let downRcd = [];
              console.log(JSON.stringify(rcd));
              for (let i = 0; i < rcd.length; i++) {
                if (rcd[i].type === "activity") {
                  downRcd.push(rcd[i]);
                }
                if (rcd[i].formView.position === "left") {
                  rd.push(rcd[i]);
                  if (
                    i + 1 < rcd.length &&
                    rcd[i + 1].formView.position === "full"
                  ) {
                    left_check = true;
                  }
                } else if (rcd[i].formView.position === "right") {
                  rd.push(rcd[i]);
                  if (
                    i === rcd.length - 1 ||
                    rcd[i + 1].formView.position === "full"
                  ) {
                    rdd.push({
                      split: "true",
                      rcd: rd,
                      formView: { co: rd[0].formView.co },
                    });
                    for (let j = 0; j < left_rd.length; j++) {
                      rdd.push(left_rd[j]);
                    }
                    rd = [];
                    left_check = false;
                    left_rd = [];
                  }
                } else {
                  if (left_check) {
                    rcd[i].split = "false";
                    left_rd.push(rcd[i]);
                  } else {
                    rcd[i].split = "false";
                    rdd.push(rcd[i]);
                  }
                }
              }
      
              console.log(rdd, rd, left_rd);
              for (let i = 0; i < rdd.length; i++) {
                if (rdd[i].split === "true") {
                  rdd[i].rcd.sort((a, b) =>
                    parseInt(a.formView.pn) > parseInt(b.formView.pn)
                      ? 1
                      : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                        ? -1
                        : 0
                  );
                }
              }
              rdd.sort((a, b) =>
                parseInt(a.formView.pn) > parseInt(b.formView.pn)
                  ? 1
                  : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                    ? -1
                    : 0
              );
              console.log("rdd1",rdd);
            //  console.log("mmmm" + JSON.stringify(mmm));
              // rcd.sort((a,b)=>parseInt(a.beforeIndex)>parseInt(b.beforeIndex)?1:parseInt(a.beforeIndex)<parseInt(b.beforeIndex)?-1:0)
              rcd.sort((a, b) =>
                parseInt(a.index) > parseInt(b.index)
                  ? 1
                  : parseInt(a.index) < parseInt(b.index)
                    ? -1
                    : 0
              );
              this.setState({
                mainrecord: relrecord,
                record: rcd, //mmm
                rcdView: rdd,
                loading: false,
                tablabel: relrecord.formRecord[1].table.label,
                tabId: relrecord.formRecord[1].table.id,
                button: relrecord.formRecord[3].button,
                i_d: relrecord.formRecord[2].record[0].value,
                rvalue: rvalue,
                ap_form: new ApForm(rcd, this.setRecord("")),
                ap_user: new ApUser(userDetails, this.setRecord("")),
                uiscript: script,
              });
              // if (call_check) {
              this.relationVerify(rvalue);
              // } else {
              //   this.checkRefrecord();
              // }
            }
          }
        });
    }
  }

  getRecordForm(r_id, tabname) {
    var token = localStorage.getItem("token");
    this.setState({ loading: true, relation_loading: false });
    axios
      .get(this.state.loca + "/loom/get/singlerecord/" + tabname + "/" + r_id, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        const relrecord = resp.data;
        if (relrecord !== "") {
          if ("Error" in relrecord) {
            this.setState({
              loading: false,
              page_error: true,
              error: relrecord.Error,
            });
          } else {
            var mmm = relrecord.formRecord[2].record;
            var rvalue = "";
            for (var i = 0; i < mmm.length; i++) {
              mmm[i].clicked = false;
              if (mmm[i].displayColumn === "true") {
                rvalue = mmm[i].value;
              }
              if (mmm[i].type === "password") {
                mmm[i].value = "";
              }
              if (mmm[i].value !== "") {
                mmm[i].verified = "verified";
              } else {
                mmm[i].verified = "initial";
              }
            }
            let count = 0;
            var fldtype = "";
            let StartIndex=0;
            let mapObj=new Map();
            // let call_check = true;
            for (let i = 0; i < mmm.length; i++) {
              if (mmm[i].type === "other_table_filter") {
                fldtype = mmm[i].otherFilterColumn;
                if (
                  fldtype === "null" ||
                  fldtype === undefined ||
                  fldtype === ""
                ) {
                  var flt = this.state.filtarray;
                  flt = [];
                  flt.push(this.state.filt);
                  this.setState({
                    filtarray: flt,
                    timeline: this.state.timeline,
                  });
                } else {
                  if (mmm[i].value === "null") {
                    var fl_t = [];
                    fl_t.push(this.state.filt);
                    this.setState({
                      filtarray: fl_t,
                      timeline: this.state.timeline,
                    });
                  } else {
                    this.setState({
                      filtarray: mmm[i].value.filter,
                      timeline: mmm[i].value.timeline,
                      fldType: fldtype,
                    });
                  }
                }
              }
              if (mmm[i].type === "filter") {
                if (mmm[i].value === "null") {
                  var flt_arr = [];
                  flt_arr.push(this.state.filt);
                  this.setState({
                    filtarray: flt_arr,
                    timeline: this.state.timeline,
                  });
                } else {
                  this.setState({
                    filtarray: mmm[i].value.filter,
                    timeline: mmm[i].value.timeline,
                  });
                  count++;
                }
              }
              if (mmm[i].type === "multi_select") {
                if (
                  mmm[i].value !== null ||
                  mmm[i].value !== "" ||
                  mmm[i].value !== "null" ||
                  mmm[i].value !== undefined
                ) {
                  let parsVal = mmm[i].value;
                  this.setState({ mscList: parsVal });
                  count++;
                }
              }
              if (
                mmm[i].name === "loom_table_id" ||
                mmm[i].name === "loomtable_id"
              ) {
                if (mmm[i].value.value !== null || mmm[i].value.value !== "") {
                  // call_check = false;
                  this.callTableColumn(mmm[i].value.value, false);
                  count++;
                }
              }
              // if (count === 4) {
              //   break;
              // }

              if (mmm[i].name === "loom_column_id") {
                if (mmm[i].value.value !== null || mmm[i].value.value !== "") {
                  this.callColumnByColId(mmm[i].value.id);
                }
              }
              
              if(mmm[i]?.secondary==="true" && StartIndex==0){
                  
                //setSecondaryStartIndex(i);
                this.setState({secondaryStartIndex:i})
                StartIndex++; 
              }
              if(mmm[i]?.secondary==="true"){
    
               let fv = mmm[i]?.formView
               console.log( "fv",fv);
              let col = fv.path.split(".")[1];
              if(mapObj.get(col)){
                mapObj.get(col).push(fv);   
              }else{
                let vl=[];
              vl.push(fv)
              mapObj.set(col ,vl)
              }
           }
  
            }
            console.log("mapObj" ,mapObj);
            this.setState({secondarycallsCols:mapObj})
            for (let r = 0; r < mmm.length; r++) {
              if (fldtype === mmm[r].name) {
                this.callTableColumn(mmm[r].value.value, true);
              }
            }
            let rcd = [];
            let userDetails = localStorage.getItem("userDetails");
            let script = relrecord.formRecord[4].uiscript;
            rcd = relrecord.formRecord[2].record;
            if (script !== null) {
              for (let i = 0; i < script.length; i++) {
                let func = script[i].script;
                let type = script[i].type;
                if (type === "onload") {
                  this.onLoad(
                    func,
                    new ApUser(userDetails, this.setRecord("")),
                    new ApForm(rcd, this.setRecord(""))
                  );
                }
              }
            }

            for (let i = 0; i < rcd.length; i++) {
              rcd[i].index = i;
            }
            rcd.sort((a, b) =>
              parseInt(a.formView.pn) > parseInt(b.formView.pn)
                ? 1
                : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                  ? -1
                  : 0
            );
            let rd = [];
            let rdd = [];
            let left_rd = [];
            let left_check = false;
            let downRcd = [];
            console.log(JSON.stringify(rcd));
            for (let i = 0; i < rcd.length; i++) {
              if (rcd[i].type === "activity") {
                downRcd.push(rcd[i]);
              }
              if (rcd[i].formView.position === "left") {
                rd.push(rcd[i]);
                if (
                  i + 1 < rcd.length &&
                  rcd[i + 1].formView.position === "full"
                ) {
                  left_check = true;
                }
              } else if (rcd[i].formView.position === "right") {
                rd.push(rcd[i]);
                if (
                  i === rcd.length - 1 ||
                  rcd[i + 1].formView.position === "full"
                ) {
                  rdd.push({
                    split: "true",
                    rcd: rd,
                    formView: { co: rd[0].formView.co },
                  });
                  for (let j = 0; j < left_rd.length; j++) {
                    rdd.push(left_rd[j]);
                  }
                  rd = [];
                  left_check = false;
                  left_rd = [];
                }
              } else {
                if (left_check) {
                  rcd[i].split = "false";
                  left_rd.push(rcd[i]);
                } else {
                  rcd[i].split = "false";
                  rdd.push(rcd[i]);
                }
              }
            }
    
            console.log(rdd, rd, left_rd);
            for (let i = 0; i < rdd.length; i++) {
              if (rdd[i].split === "true") {
                rdd[i].rcd.sort((a, b) =>
                  parseInt(a.formView.pn) > parseInt(b.formView.pn)
                    ? 1
                    : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                      ? -1
                      : 0
                );
              }
            }
            rdd.sort((a, b) =>
              parseInt(a.formView.pn) > parseInt(b.formView.pn)
                ? 1
                : parseInt(a.formView.pn) < parseInt(b.formView.pn)
                  ? -1
                  : 0
            );
            console.log("rdd1",rdd);
          //  console.log("mmmm" + JSON.stringify(mmm));
            // rcd.sort((a,b)=>parseInt(a.beforeIndex)>parseInt(b.beforeIndex)?1:parseInt(a.beforeIndex)<parseInt(b.beforeIndex)?-1:0)
            rcd.sort((a, b) =>
              parseInt(a.index) > parseInt(b.index)
                ? 1
                : parseInt(a.index) < parseInt(b.index)
                  ? -1
                  : 0
            );
            this.setState({
              mainrecord: relrecord,
              record: rcd, //mmm
              rcdView: rdd,
              loading: false,
              tablabel: relrecord.formRecord[1].table.label,
              tabId: relrecord.formRecord[1].table.id,
              button: relrecord.formRecord[3].button,
              i_d: relrecord.formRecord[2].record[0].value,
              rvalue: rvalue,
              ap_form: new ApForm(rcd, this.setRecord("")),
              ap_user: new ApUser(userDetails, this.setRecord("")),
              uiscript: script,
            });
            // if (call_check) {
            this.relationVerify(rvalue);
            // } else {
            //   this.checkRefrecord();
            // }
          }
        }
      });
  }

  refresh() {
    this.setState({ page_error: false, error: "", page_message: false, message: "" });
    this.getFormDetails();
    // this.setState({ loading: true });
  }

  back() {
    // history.goBack();
    window.history.back();
  }

  copy() {
    localStorage.setItem("rcdJson", JSON.stringify(this.state.copyRcd));
    localStorage.setItem("tableName", this.state.tablename);
    let rcdJson = localStorage.getItem("rcdJson");
  }

  paste() {
    this.setState({ loading: true });
    let rcdJson = localStorage.getItem("rcdJson");
    let tab = localStorage.getItem("tableName");
    let tabId = "";
    let tabVal = "";
    let rdJson = JSON.parse(rcdJson);
    let obj = "";
    if (tab === this.state.tablename) {
      var rcd = this.state.rcdView[0].rcd;
      for (let i = 0; i < rdJson.length; i++) {
        for (let j = 0; j < rcd.length; j++) {
          if (rcd[j].name === rdJson[i].name) {
            rcd[j].value = rdJson[i].value;
            if (rdJson[i].name === "loom_table_id") {
              tabId = rcd[j].value.id;
              tabVal = rcd[j].value.value;
              if (tabId > 0) {
                this.callTableColumn(tabVal, false);
                // callFieldList(tabId);
              }
            }
            // if (rdJson[i].type === "multi_select") {

            //   setMultiSv(rdJson[i].value);
            //   setAdd(true);
            // }
            for (let k = 0; k < this.state.uiscript.length; k++) {
              let field = this.state.uiscript[k].field.name;
              let func = this.state.uiscript[k].script;
              let type = this.state.uiscript[k].type;
              if (field === rdJson[i].name && type === "onchange") {
                this.onChange(func, rdJson[i].value, obj);
              }
            }
          }
        }
      }
    }
    setTimeout(() => {
      this.setState({ loading: false });
    }, 200);
  }

  menuFn(body) {
    if (body === "back()") {
      this.back();
    } else if (body === "refresh()") {
      this.refresh();
    } else if (body === "copy()") {
      this.copy();
    } else if (body === "paste()") {
      this.paste();
    } else {
      this.props.showViewCompo(this.state.tabname);
    }
  }

  handleGoBack() {
    // window.history.back(); // Go back using the browser's history API
    this.props.history.goBack();
  }

  render() {
    // const { ToastContainer } = this.props;
    return (
      <>
        <div className="pagesetup">
          {this.state.loading === true ? (
            <WorkInProgress
              tableName={this.state.tabname}
              type={this.state.rty}
            ></WorkInProgress>
          ) : (
            <div>
              <div
                className=" form-group "
                onContextMenu={(e) => {
                  if (this.state.contextMenu[0].role === "1") {
                    e.preventDefault();
                    this.setContext(
                      e.button,
                      e.nativeEvent.pageX,
                      e.nativeEvent.pageY
                    );
                  }
                }}
              >
                <Modal
                  show={
                    (this.state.modal && this.state.btnName === "delete") ||
                    (this.state.modal && this.state.btnName === "reject")
                  }
                  onHide={() => this.setState({ modal: false })}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm {this.state.btnValue}</Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => this.setState({ modal: false })}
                      disabled={this.state.btn_disable}
                      style={{
                        background: this.state.btn_disable ? "gray" : "",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.callbtn(this.state.btnName)}
                      disabled={this.state.btn_disable}
                      style={{
                        background: this.state.btn_disable ? "gray" : "",
                      }}
                    >
                      {this.state.btnValue}
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* Other content of your component */}


                {this.state.showContextMenu && (
                  <ul
                    className="dropdown-menu"
                    style={{
                      display: "block",
                      top: this.menuY.current,
                      left: this.menuX.current,
                    }}
                  >
                    {this.state.labelContext &&
                      this.state.labelContext.length > 0 &&
                      this.state.labelContext.map((obj, index) => (
                        <li
                          key={index}
                          onMouseDown={() => {
                            this.menuFn(obj.script);
                          }}
                        >
                          <a className="dropdown-item" href="#">
                            {obj.Label}
                          </a>
                        </li>
                      ))}
                  </ul>
                )}
                {/* {console.log(this.state.contextMenu[0].role)} */}
                {this.state.showContext && this.state.contextMenu[0].role === "1" ? (
                  <ul
                    className="dropdown-menu"
                    style={{
                      display: "block",
                      top: this.menuY.current,
                      left: this.menuX.current,
                    }}
                  >
                    {this.state.contextMenu &&
                      this.state.contextMenu.map((obj, index) => (
                        <li
                          key={index} // Add a key to the list items if you have a unique identifier
                          onMouseDown={() => {
                            // Assuming menuFn is a function passed as a prop
                            this.menuFn(obj.script);
                          }}
                        >
                          <a className="dropdown-item" href="#">
                            {obj.Label}
                          </a>
                        </li>
                      ))}
                  </ul>
                ) : ""}

                <div
                  className="btndiv"
                  style={{ padding: "10px 0px" }}

                >
                  {/* || this.state.rty === "new" && this.state.form_back === true  */}
                  <div className="row">
                    {!this.state.isDashboardInfo && (
                      <>
                        <div
                          style={{ paddingTop: "8px" }}
                          className="col-md-1 d-flex align-items-center justify-content-center m-pad"
                        >
                          {this.state.rty === "record" ? (
                            <span>
                              <i
                                className=" backic fa fa-arrow-left bck_btt_mrg"
                                aria-hidden="true"
                                onClick={this.callNextPage}
                              ></i>
                            </span>
                          ) : null}
                          {/* {this.state.rty === "new" ? (
                        //  && this.state.form_back === true 
                        <span>
                          <i
                            className=" backic fa fa-arrow-left bck_btt_mrg"
                            aria-hidden="true"
                            onClick={this.handleGoBack}
                          ></i>
                        </span>
                      ) : null} */}
                          {/* {this.state.rty === "new" &&
                    this.state.form_back === true ? (
                      <span>
                        <i
                          className=" backic fa fa-arrow-left bck_btt_mrg"
                          aria-hidden="true"
                          onClick={this.callNextPage}
                        ></i>
                      </span>
                    ) : null} */}
                        </div>
                        <div className="col-md-3"></div>
                      </>
                    )}
                    <div
                      className={
                        this.state.isDashboardInfo === true ?
                          "col-md-12 box-mar-pad"
                          :
                          "col-md-3"
                      }
                    // style={{ paddingTop: "11px" }}
                    >
                      <div
                        className={
                          this.state.isDashboardInfo === true ?
                            "mb-2 text-center fw-bold font-sz" :
                            "tab_head"
                        }
                      >
                        {this.state.tablabel}
                      </div>
                    </div>
                    {!this.state.isDashboardInfo && (
                      <div className="col-md-5 m-view">
                        <div className="btndivin">
                          {this.state.button.map((obj, oo_i) => (
                            <button
                              key={oo_i}
                              onClick={() => {
                                if (obj.webUrl === "/loom/delete/record") {
                                  this.setState({
                                    btnName: obj.name,
                                    btnValue: obj.value,
                                    modal: true,
                                  });
                                } else if (obj.name === "reject") {
                                  this.setState({
                                    btnName: obj.name,
                                    btnValue: obj.value,
                                    modal: true,
                                  });
                                } else {
                                  this.callbtn(obj.name);
                                }
                              }}
                              // onClick={(e) => this.callbtn(obj.name)}
                              disabled={this.state.btn_disable === true}
                              // className={
                              //   this.state.btn_disable === true
                              //     ? "csm_btn csm_btn_pri col-md-2 sub-btn disabled"
                              //     : "csm_btn csm_btn_pri col-md-2 sub-btn"
                              // }
                              className={
                                this.state.btn_disable === true
                                  ? "csm_btn csm_btn_pri col-md-2 sub-btn disabled"
                                  : "csm_btn csm_btn_pri col-md-2 sub-btn"
                              }
                              style={{
                                backgroundColor: this.state.btn_disable
                                  ? "gray"
                                  : "",
                              }}
                            >
                              {obj.value}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className=" maincompo ">
                {this.state.page_error === true && (
                  <div
                    className="alert alert-danger"
                    //  form_alt
                    role="alert"
                    style={{
                      padding: "0.2rem 0.2rem",
                      marginBottom: "0px",
                    }}
                  >
                    {this.state.error}
                  </div>
                )}

                {this.state.page_message === true && (
                  <div className="alert alert-success form_alt" role="alert">
                    {this.state.message}
                  </div>
                )}

                {this.state.record.length === 0 && (
                  <div>Dont have response...</div>
                )}

                {this.state.record.length > 0 && (
                  <div style={{ textAlign: "start" }}>
                    <div>

                      {this.state.rcdView.map((obj, index) => (
                        <div key={index}>
                          {obj.split === "false" && (
                            <span key={index}>

                              <FormInnerComponent
                                obj={obj}
                                m_rid={this.state.m_rid}
                                index={obj.index}
                                record={this.state.record}
                                tabname={this.state.tabname}
                                validationfn={this.validationfn}
                                formChangefn={this.formChangefn}
                                setRefrecord={this.setRefrecord}
                                setcolumn={this.setcolumn}
                                calltimeline={this.calltimeline}
                                callfilter={this.callfilter}
                                callScript={this.callScript}
                                setMSC={this.setMSC}
                                refrecord={this.state.refrecord}
                                choice_mn={this.state.choice_mn}
                                showlist={this.state.showlist}
                                col_mn={this.state.col_mn}
                                col_depend={this.state.column_depend}
                                filtarray={this.state.filtarray}
                                timeline={this.state.timeline}
                                loca={this.state.loca}
                                tabId={this.state.tabId}
                                isMobile={this.state.isMobile}
                                column_other={this.state.column_other}
                                reScript={this.state.reScript}
                                editor={this.state.editor}
                                mscList={this.state.mscList}
                                setContextMenu={this.setContextMenu}
                                getSingleInfo={this.getSingleInfo}
                                validation={this.state.validation}
                                validation_error={this.state.validation_error}
                                verify_error={this.state.verify_error}
                                ob={this.state.ob}
                                setref_filter={this.state.filtRefArray}
                                col_mn_ref={this.state.column_ref}
                                keyValueJson={this.state.keyValueJson}
                                groupkeyValue={this.state.groupkeyValue}
                                isRecent={this.state.isRecent}
                                showRecent={this.showRecent}

                              ></FormInnerComponent>
                            </span>
                          )}
                          {obj.split === "true" && (
                            <div className={this.state.isMobile ? "" : "row"}>

                              <div className="col">
                                {obj.rcd.map((obj_i, ind_i) => (
                                  <div key={ind_i}>
                                    {obj_i.formView.position === "left" && (
                                      <span>
                                        <FormInnerComponent
                                          obj={obj_i}
                                          m_rid={this.state.m_rid}
                                          index={obj_i.index}
                                          record={this.state.record}
                                          tabname={this.state.tabname}
                                          validationfn={this.validationfn}
                                          formChangefn={this.formChangefn}
                                          setRefrecord={this.setRefrecord}
                                          setcolumn={this.setcolumn}
                                          calltimeline={this.calltimeline}
                                          callfilter={this.callfilter}
                                          callScript={this.callScript}
                                          setMSC={this.setMSC}
                                          refrecord={this.state.refrecord}
                                          choice_mn={this.state.choice_mn}
                                          showlist={this.state.showlist}
                                          col_mn={this.state.col_mn}
                                          col_depend={this.state.column_depend}
                                          filtarray={this.state.filtarray}
                                          timeline={this.state.timeline}
                                          loca={this.state.loca}
                                          tabId={this.state.tabId}
                                          isMobile={this.state.isMobile}
                                          column_other={this.state.column_other}
                                          reScript={this.state.reScript}
                                          editor={this.state.editor}
                                          mscList={this.state.mscList}
                                          setContextMenu={this.setContextMenu}
                                          getSingleInfo={this.getSingleInfo}
                                          validation={this.state.validation}
                                          validation_error={
                                            this.state.validation_error
                                          }
                                          verify_error={this.state.verify_error}
                                          ob={this.state.ob}
                                          setref_filter={
                                            this.state.filtRefArray
                                          }
                                          col_mn_ref={this.state.column_ref}
                                          keyValueJson={this.state.keyValueJson}
                                          groupkeyValue={
                                            this.state.groupkeyValue
                                          }
                                          isRecent={this.state.isRecent}
                                          showRecent={this.showRecent}
                                          isRec={this.isRec}
                                        ></FormInnerComponent>
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className="col">
                                {obj.rcd.map((obj_i, ind_i) => (
                                  <div key={ind_i}>
                                    {obj_i.formView.position === "right" && (
                                      <span key={ind_i}>
                                        <FormInnerComponent
                                          obj={obj_i}
                                          m_rid={this.state.m_rid}
                                          index={obj_i.index}
                                          record={this.state.record}
                                          tabname={this.state.tabname}
                                          validationfn={this.validationfn}
                                          formChangefn={this.formChangefn}
                                          setRefrecord={this.setRefrecord}
                                          setcolumn={this.setcolumn}
                                          calltimeline={this.calltimeline}
                                          callfilter={this.callfilter}
                                          callScript={this.callScript}
                                          setMSC={this.setMSC}
                                          refrecord={this.state.refrecord}
                                          choice_mn={this.state.choice_mn}
                                          showlist={this.state.showlist}
                                          col_mn={this.state.col_mn}
                                          col_depend={this.state.column_depend}
                                          filtarray={this.state.filtarray}
                                          timeline={this.state.timeline}
                                          loca={this.state.loca}
                                          tabId={this.state.tabId}
                                          isMobile={this.state.isMobile}
                                          column_other={this.state.column_other}
                                          reScript={this.state.reScript}
                                          editor={this.state.editor}
                                          mscList={this.state.mscList}
                                          setContextMenu={this.setContextMenu}
                                          getSingleInfo={this.getSingleInfo}
                                          validation={this.state.validation}
                                          validation_error={
                                            this.state.validation_error
                                          }
                                          verify_error={this.state.verify_error}
                                          ob={this.state.ob}
                                          setref_filter={
                                            this.state.filtRefArray
                                          }
                                          col_mn_ref={this.state.column_ref}
                                          keyValueJson={this.state.keyValueJson}
                                          groupkeyValue={
                                            this.state.groupkeyValue
                                          }
                                          isRecent={this.state.isRecent}
                                          showRecent={this.showRecent}
                                          isRec={this.isRec}
                                        ></FormInnerComponent>
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className=" form-group " style={{ marginTop: "7px" }}>
                  {/* margin-top: 13px; */}
                  {this.state.button.map((obj, oo_i) => (
                    <button
                      key={oo_i}
                      onClick={() => {
                        if (obj.webUrl === "/loom/delete/record") {
                          this.setState({
                            btnName: obj.name,
                            btnValue: obj.value,
                            modal: true,
                          });
                        } else if (obj.name === "reject") {
                          this.setState({
                            btnName: obj.name,
                            btnValue: obj.value,
                            modal: true,
                          });
                        } else {
                          this.callbtn(obj.name);
                        }
                      }}
                      // onClick={(e) => this.callbtn(obj.name)}
                      disabled={this.state.btn_disable === true}
                      className={
                        this.state.btn_disable === true
                          ? "csm_btn csm_btn_pri col-md-2 sub-btn disabled"
                          : "csm_btn csm_btn_pri col-md-2 sub-btn"
                      }
                      style={{
                        backgroundColor: this.state.btn_disable ? "gray" : "",
                      }}
                    >
                      {obj.value}
                    </button>
                  ))}
                </div>

                {this.state.downRcdView.map((obj, index) => (
                  <div key={index}>
                    {obj.uivalid.visible === "true" && (
                      <div>
                        {this.state.activity.map((obj, ind) => (
                          <div key={ind}>
                            <div
                              class="card mt-2"
                              /* style="width: 18rem;" */ style={{
                                width: "60rem",
                                marginLeft: "200px",
                              }}
                            >
                              <div className="card-body ">
                                <div class="d-flex justify-content-between">
                                  <div className="d-flex ">
                                    <i
                                      className="fa fa-user-circle-o me-2"
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Profile"
                                      aria-hidden="false"
                                    ></i>

                                    <b>
                                      <h6>{obj.noteBy}</h6>
                                    </b>
                                  </div>
                                  <div className="d-flex ">
                                    <h6 className="me-4">{obj.columnName}</h6>
                                    <h6>{obj.update}</h6>
                                  </div>
                                </div>
                                <div style={{ textAlign: "start" }}>
                                  <h7>{obj.content}</h7>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div>
                  {this.state.relation_loading === true ? (
                    <WorkInProgressSmall></WorkInProgressSmall>
                  ) : (
                    <div>
                      {this.state.tabrel === true &&
                        this.state.tabrelation !== undefined &&
                        this.state.rty === "record" && (
                          <div>
                            {this.state.tabrelation.relation.length > 0 ? (
                              <div className="form_tab">
                                <Tab.Container
                                  id="left-tabs-example"
                                  defaultActiveKey={
                                    this.state.tabrelation.relation[0]
                                      .formRecordList[1].table.label
                                  }
                                >
                                  <Nav
                                    variant="pills"
                                    className="flex-column ownNav"
                                  >
                                    {/* <Row className="rw">
                                      {this.state.tabrelation.relation.map(
                                        (nama, tab_ia) => (
                                          <Col
                                            md={2}
                                            key={tab_ia}
                                            className="nopad"
                                          >
                                            {this.state.isMobile ? (
                                              <Nav.Item className="cur">
                                                <Nav.Link
                                                  eventKey={
                                                    nama.formRecordList[1].table
                                                      .label
                                                  }
                                                >
                                                  {
                                                    nama.formRecordList[1].table
                                                      .label
                                                  }
                                                </Nav.Link>
                                              </Nav.Item>
                                            ) : (
                                              <Nav.Item className="cur">
                                                <Nav.Link
                                                  eventKey={
                                                    nama.formRecordList[1].table
                                                      .label
                                                  }
                                                >
                                                  {
                                                    nama.formRecordList[1].table
                                                      .label
                                                  }
                                                </Nav.Link>
                                              </Nav.Item>
                                            )}
                                          </Col>
                                        )
                                      )}
                                    </Row> */}
                                    <div className="rel_flex rw">
                                      {this.state.tabrelation.relation.map(
                                        (nama, tab_ia) => (
                                          <div
                                            md={2}
                                            key={tab_ia}
                                            className="nopad"
                                          >
                                            {this.state.isMobile ? (
                                              <Nav.Item className="cur">
                                                <Nav.Link
                                                  eventKey={
                                                    nama.formRecordList[1].table
                                                      .label
                                                  }
                                                >
                                                  {nama.formRecordList[3].page
                                                    .record_count !== "0"
                                                    ? nama.formRecordList[1]
                                                      .table.label +
                                                    " (" +
                                                    nama.formRecordList[3]
                                                      .page.record_count +
                                                    ")"
                                                    : nama.formRecordList[1]
                                                      .table.label}
                                                </Nav.Link>
                                              </Nav.Item>
                                            ) : (
                                              <Nav.Item className="cur">
                                                <Nav.Link
                                                  eventKey={
                                                    nama.formRecordList[1].table
                                                      .label
                                                  }
                                                >
                                                  {nama.formRecordList[3].page
                                                    .record_count !== "0"
                                                    ? nama.formRecordList[1]
                                                      .table.label +
                                                    " (" +
                                                    nama.formRecordList[3]
                                                      .page.record_count +
                                                    ")"
                                                    : nama.formRecordList[1]
                                                      .table.label}
                                                </Nav.Link>
                                              </Nav.Item>
                                            )}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Nav>
                                  <Tab.Content>
                                    {this.state.tabrelation.relation.map(
                                      (nam, tab_i) => (
                                        <Tab.Pane
                                          key={tab_i}
                                          eventKey={
                                            nam.formRecordList[1].table.label
                                          }
                                        >
                                          <RelationListComponent
                                            listName={
                                              nam.formRecordList[1].table.value
                                            }
                                            isMobile={this.state.isMobile}
                                            recordList={nam}
                                            showFormCompo={(nm, rid, ty) =>
                                              this.props.showFormCompo(
                                                nm,
                                                rid,
                                                ty
                                              )
                                            }
                                            showRoleSelectionCompo={(id, rt) =>
                                              this.props.showRoleSelectionCompo(
                                                id,
                                                rt
                                              )
                                            }
                                            i_d={this.state.i_d}
                                            loca={this.state.loca}
                                          ></RelationListComponent>
                                        </Tab.Pane>
                                      )
                                    )}
                                  </Tab.Content>
                                </Tab.Container>
                              </div>
                            ) : null}
                          </div>
                        )}
                    </div>
                  )}
                </div>
                <Modal
                  dialogClassName="my-modal"
                  show={this.state.show}
                  onHide={this.handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="mod-ht">

                    <ModelList
                      setRef={(val, r_id) => this.setRef(val, r_id)}
                      columnid={this.state.columnid}
                      tabId={this.state.tabId}
                      loca={this.state.loca}
                      colBoolean={true}
                      ref_filt={this.state.ref_filter}
                      isMobile={this.state.isMobile}
                    >
                    </ModelList>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

                {this.state.showModalInfo === true && (
                  <SwitchModal
                    getSingleInfo={this.getSingleInfo}
                    handleCancel={this.handleCancel}
                    openRecord={this.openRecord}
                    rcdView={this.state.infoRcdView}
                    closeRef={this.closeRef}
                    infoRcdDetail={this.state.infoRcdDetail}
                    showModalInfo={this.state.showModalInfo}
                    validationfn={this.validationfn}
                    formChangefn={this.formChangefn}
                    setRefrecord={this.setRefrecord}
                    setcolumn={this.setcolumn}
                    calltimeline={this.calltimeline}
                    callfilter={this.callfilter}
                    callScript={this.callScript}
                    setMSC={this.setMSC}
                    showFormCompo={(nm, rid, ty) =>
                      this.props.showFormCompo(nm, rid, ty)
                    }
                    refrecord={this.state.refrecord}
                    choice_mn={this.state.choice_mn}
                    showlist={this.state.showlist}
                    col_mn={this.state.col_mn}
                    col_depend={this.state.column_depend}
                    filtarray={this.state.filtarray}
                    timeline={this.state.timeline}
                    loca={this.state.loca}
                    tabId={this.state.tabId}
                    isMobile={this.state.isMobile}
                    column_other={this.state.column_other}
                    reScript={this.state.reScript}
                    editor={this.state.editor}
                    mscList={this.state.mscList}
                    setContextMenu={this.setContextMenu}
                    validation={this.state.validation}
                    validation_error={this.state.validation_error}
                    verify_error={this.state.verify_error}
                    ob={this.state.ob}
                    setref_filter={this.state.filtRefArray}
                    col_mn_ref={this.state.column_ref}
                    keyValueJson={this.state.keyValueJson}
                    groupkeyValue={this.state.groupkeyValue}
                  ></SwitchModal>
                )}

                <Modal
                  dialogClassName="my-modal"
                  show={this.state.showVerifyOtp}
                  onHide={this.handleCloseOTPVerify}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>OTP Verification</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <OTPVerify
                      otp={(val) => this.verifyOTP(val)}
                      record={this.state.mainrecord}
                      verified={this.state.verified}
                      loca={this.state.loca}
                    ></OTPVerify>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default FormComponent;
