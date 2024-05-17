import axios from "axios";
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import ModelList from "./model_list";
import "../css/multi_insert.css";
import "../css/formcompo.css";
import WorkInProgress from "./work_in_progress";
import ApForm from "../ApForm";
import ApUser from "../ApUser";

class MultiInsert extends Component {
  state = {
    record: [],
    recordd: [],
    button: [],
    heading: [],
    refrecord: {},
    json: {},
    tabname: this.props.tabName,
    tabname_new: "",
    tabId: "",
    page_error: false,
    page_message: false,
    fieldblank: false,
    loading: false,
    errorlist: [],
    tablabel: "",
    columnid: "",
    cur_ref_name: "",
    cur_ref_type: "",
    cur_ref_index: 0,
    cur_ref_ri: "",
    error: "",
    message: "",
    show: false,
    choice_record: [],
    loca: this.props.loca,
    mtRelationList: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
    selectNumber: 1,
    record_rq: [],
    ref_filter: [],
    filtarray: [],
    filt: {
      co: "",
      cl: "",
      mc: "",
      an: "",
      ct: "",
      af: "",
      rf: { id: "", value: "" },
      dc: { id: "", value: "" },
    },
    mainFilt: {
      co: "",
      cl: "",
      mc: "",
      an: "",
      ct: "",
      af: "",
      rf: { id: "", value: "" },
      dc: { id: "", value: "" },
      ch: [],
    },
    isMobile: this.props.isMobile,
    btn_disable: false,
    initialBlnak:""
  };

  constructor(props) {
    super(props);
    this.setMI = this.setMI.bind(this);
    this.formChangefn = this.formChangefn.bind(this);
    this.callbtn = this.callbtn.bind(this);
    this.copyAll = this.copyAll.bind(this);
    this.copyparent = this.copyparent.bind(this);
    this.validation = this.validation.bind(this);
    this.setRefrecord = this.setRefrecord.bind(this);
    this.setcolumn = this.setcolumn.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.fieldverify = this.fieldverify.bind(this);
    this.setRef = this.setRef.bind(this);
    this.checkRefrecord = this.checkRefrecord.bind(this);
    this.getFieldValue = this.getFieldValue.bind(this);
    this.selectNumberOfRecords = this.selectNumberOfRecords.bind(this);
    this.setRecord = this.setRecord.bind(this);
    this.initialFunc = this.initialFunc.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.scriptFunc = this.scriptFunc.bind(this);
    this.state.tabname = props.tabName;
  }

  componentDidMount() {
    this.initialFunc();
  }

  componentDidUpdate(props) {
    if (this.state.tabname !== props.tabName) {
      this.setState({ loading: true, tabname: props.tabName });
      this.setState({
        page_error: false,
        error: "",
        page_message: false,
        message: "",
        selectNumber: 1,
        btn_disable: false,
      });
      this.initialFunc();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.tabName !== state.tabname) {
      return {
        tabname: props.tabName,
      };
    }
    return null;
  }

  initialFunc() {
    var token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(
        this.state.loca +
        "/loom/get/multiple/blankrecord/" +
        this.state.tabname,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then(
        (res) => {
          const mltrecord = res.data;
          console.log(mltrecord);
          this.setMI(mltrecord ,"fromComponentDid");
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  async checkRefrecord() {
    var token = localStorage.getItem("token");
    await axios
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
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  setMI(mltrecord , tt) {
    if (mltrecord !== "") {
      if ("Error" in mltrecord) {
        this.setState({
          loading: false,
          page_error: true,
          error: mltrecord.Error,
        });
      } else {
        let rcd = [];
        let userDetails = localStorage.getItem("userDetails");
        let script = mltrecord.formRecordList[9].uiscript;
        rcd = mltrecord.formRecordList[2].records;
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

        var hd = [];
        var gg = [];
        var chc_rcd = [];
        var cnt = 0;
        // var mmm = mltrecord.formRecordList[2].records;
        for (
          var ii = 0;
          ii < mltrecord.formRecordList[2].records.length;
          ii++
        ) {
          var gw = [];
          for (
            var ij = 0;
            ij < mltrecord.formRecordList[2].records[ii].record.length;
            ij++
          ) {
            if (
              mltrecord.formRecordList[2].records[ii].record[ij]
                .multiInsertColumn === "true"
              //    ||
              // mltrecord.formRecordList[2].records[0].record[ij]
              //   .displayColumn === "true"
            ) {
              mltrecord.formRecordList[2].records[ii].record[ij].verified =
                "initial";
              mltrecord.formRecordList[2].records[ii].record[ij].blank = false;
              gw.push(mltrecord.formRecordList[2].records[ii].record[ij]);
            }
          }
          gg.push({ record: gw });
        }
        for (
          var j = 0;
          j < mltrecord.formRecordList[2].records[0].record.length;
          j++
        ) {
          if (
            mltrecord.formRecordList[2].records[0].record[j]
              .multiInsertColumn === "true"
            //    ||
            // mltrecord.formRecordList[2].records[0].record[j].displayColumn ===
            //   "true"
          ) {
            hd.push(mltrecord.formRecordList[2].records[0].record[j].label);
            if (
              mltrecord.formRecordList[2].records[0].record[j].type === "choice"
            ) {
              chc_rcd.push({
                position: cnt,
                choice: mltrecord.formRecordList[2].records[0].record[j].choice,
              });
            }
            cnt++;
          }
        }
        var bttt = mltrecord.formRecordList[8].button;

      //  console.log("json1" ,JSON.stringify(mltrecord.formRecordList[2].records[0]));
        console.log( "ab",mltrecord);
      
        this.setState({
          tablabel: mltrecord.formRecordList[1].table.label,
          tabname_new: this.state.tabname,
          tabId: mltrecord.formRecordList[1].table.id,
          loading: false,
          record: gg,
          choice_record: chc_rcd,
          button: bttt,
          json: mltrecord,
          heading: hd,
          page_error: false,
          ap_form: new ApForm(rcd, this.setRecord("")),
          ap_user: new ApUser(userDetails, this.setRecord("")),
          uiscript: script,
        });

        if(tt==="fromComponentDid"){
          let st =JSON.stringify(mltrecord.formRecordList[2].records[0]);
          this.setState({
            initialBlnak:JSON.parse(st)
          });

        }
      
      }
    }
    this.checkRefrecord();
  }

  selectNumberOfRecords(val) {
    // var multi_rcd = this.state.json;
    // var rrr = multi_rcd.formRecordList[2].records[0];
    // multi_rcd.formRecordList[2].records = [];
    // for (var m = 0; m < val; m++) {
    //   multi_rcd.formRecordList[2].records.push(JSON.parse(JSON.stringify(rrr)));
    // }
    // this.setState({ selectNumber: val });
    // this.setMI(multi_rcd);
    var multi_rcd = this.state.json;
   let pt=this.state.json.formRecordList[2].records.length
    console.log(pt ,val);
    let rrr
    for (var m = 0; m < val; m++) {
      if(m < pt) {
      }else{
        console.log(this.state.initialBlnak);
        rrr = this.state.initialBlnak; 
        multi_rcd.formRecordList[2].records.push(JSON.parse(JSON.stringify(rrr)));
      }
    }
    this.setState({ selectNumber: val });
    this.setMI(multi_rcd);
  }

  setRecord(value) {
    this.setState({ recordd: value });
    return "record";
  }

  onChange(func, val, row_ind) {
    let fn = new Function(["ap_user", "ap_form", "val", "index"], func);
    fn(this.state.ap_user, this.state.ap_form, val, row_ind);
  }

  onCellEdit(func, val, row_ind) {
    let fn = new Function(["ap_user", "ap_form", "val", "index"], func);
    fn(this.state.ap_user, this.state.ap_form, val, row_ind);
  }

  onSubmit(func) {
    let fn = new Function(["ap_user", "ap_form"], func);
    fn(this.state.ap_user, this.state.ap_form);
  }

  onLoad(func, user, form) {
    let fn = new Function(["ap_user", "ap_form"], func);
    fn(user, form);
  }

  onReference(func, row_ind) {
    let fn = new Function(["ap_user", "ap_form", "index"], func);
    let result = fn(this.state.ap_user, this.state.ap_form, row_ind);
    if (result !== undefined) {
      this.state.filt(result);
    }
  }

  formChangefn(vl, row_ind, col_ind, rcd_id, ob, type, vrf, ref_id) {
    this.setState({
      page_error: false,
      error: "",
      page_message: false,
      message: "",
    });
    var frecord = this.state.record;
    if (type === "reference") {
      if (vrf === false) {
        frecord[row_ind].record[col_ind].clicked = false;
      }
      if (vl !== "") {
        if (vl.length > 2) {
          if (vrf === true) {
            if (frecord[row_ind].record[col_ind].name === ob) {
              frecord[row_ind].record[col_ind].value.value = vl;
              frecord[row_ind].record[col_ind].value.id = ref_id;
              frecord[row_ind].record[col_ind].clicked = true;
              frecord[row_ind].record[col_ind].clicked = "verified";
              var rfrcd = this.state.refrecord;
              rfrcd.record = [];
              this.setState({ record: frecord, refrecord: rfrcd, fieldblank: false });
              // this.validation(vl, row_ind, col_ind, rcd_id, ob, type);
            }
          } else {
            if (frecord[row_ind].record[col_ind].name === ob) {
              frecord[row_ind].record[col_ind].value.value = vl;
              frecord[row_ind].record[col_ind].value.id = ref_id;
              // frecord[row_ind].record[col_ind].clicked = "unverified";
              this.setState({ record: frecord, fieldblank: false });
            }
            var veri = '{"referenceRecord":[{"columnid":"' + rcd_id + '"},';
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
              .then((resp) => {
                const refrencercd = resp.data;
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
                var rf = { index: row_ind, record: rff, columnIndex: col_ind };
                if (refrencercd.referenceRecordList[2].records.length > 0) {
                  frecord[row_ind].record[col_ind].verified = "";
                } else {
                  frecord[row_ind].record[col_ind].verified = "unverified";
                }
                frecord[row_ind].record[col_ind].value.value = vl;
                frecord[row_ind].record[col_ind].value.id = ref_id;
                this.setState({ refrecord: rf, record: frecord, fieldblank: false });
              });
          }
        } else {
          if (frecord[row_ind].record[col_ind].name === ob) {
            frecord[row_ind].record[col_ind].value.value = vl;
            frecord[row_ind].record[col_ind].value.id = ref_id;
            frecord[row_ind].record[col_ind].verified = "";
            var refrcd = this.state.refrecord;
            refrcd.record = [];
            this.setState({
              record: frecord,
              refrecord: refrcd,
              fieldblank: false,
            });
          }
        }
      } else {
        if (frecord[row_ind].record[col_ind].name === ob) {
          frecord[row_ind].record[col_ind].value.value = vl;
          frecord[row_ind].record[col_ind].value.id = ref_id;
          frecord[row_ind].record[col_ind].verified = "";
          var refrcd = this.state.refrecord;
          refrcd.record = [];
          this.setState({
            record: frecord,
            refrecord: refrcd,
            fieldblank: false,
          });
        }
      }
    } else {
      this.setState({
        page_error: false,
        error: "",
        page_message: false,
        message: "",
        fieldblank: false,
      });
      if (frecord[row_ind].record[col_ind].name === ob) {
        frecord[row_ind].record[col_ind].value = vl;
        if (this.state.fieldblank === true) {
          for (var i = 0; i < frecord.length; i++) {
            for (var ii = 0; ii < frecord[i].record.length; ii++) {
              frecord[i].record[ii].blank = false;
            }
          }
        }
      }
      this.setState({ record: frecord, fieldblank: false });
    }
    this.scriptFunc(ob, type, vl, row_ind);
  }

  validation(vl, row_ind, col_ind, id, ob, type) {
    var formrecord = this.state.record;
    if (type === "reference") {
      if (vl !== "") {
        if (formrecord[row_ind].record[col_ind].clicked === true) {
          formrecord[row_ind].record[col_ind].verified = "verified";
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
            .then((resp) => {
              const refrencercd = resp.data;
              if (refrencercd !== "") {
                // if ("Error" in refrencercd) {
                //   this.setState({
                //     loading: false,
                //     page_error: true,
                //     error: refrencercd.Error,
                //   });
                // } else {
                if (refrencercd.Result === "Unverified") {
                  formrecord[row_ind].record[col_ind].verified = "unverified";
                  this.setState({ record: formrecord });
                } else {
                  formrecord[row_ind].record[col_ind].verified = "verified";
                  var rfrcd = this.state.refrecord;
                  rfrcd.record = [];
                  this.setState({
                    record: formrecord,
                    refrecord: rfrcd,
                    page_error: false,
                  });
                }
                this.setState({ record: formrecord, page_error: false });
                return;
                // }
              }
            });
        }
      } else {
        formrecord[row_ind].record[col_ind].verified = "initial";
        this.setState({ record: formrecord });
      }
    } else {
      var err = this.state.page_error;
      var nam = formrecord[row_ind].record[col_ind].name;
      var errorlist = this.state.errorlist;
      if (nam === ob) {
        var lab = formrecord[row_ind].record[col_ind].label;
        if (vl !== "") {
          var vari = this.fieldverify(
            formrecord[row_ind].record[col_ind].type,
            vl
          );
          if (vari === "verified" && errorlist.length === 0) {
            err = false;
          } else if (vari === "verified" && errorlist.length > 0) {
            if (errorlist.length === 1) {
              if (errorlist[0].name === nam) {
                if (errorlist[0].count.length === 1) {
                  if (
                    errorlist[0].count[0].index === row_ind &&
                    errorlist[0].count[0].i === col_ind
                  ) {
                    errorlist.pop();
                    err = false;
                  }
                } else if (errorlist[0].count.length > 1) {
                  for (var bb = 0; bb < errorlist[0].count.length; bb++) {
                    if (
                      errorlist[0].count[bb].index === row_ind &&
                      errorlist[0].count[bb].i === col_ind
                    ) {
                      errorlist[0].count.splice(bb, 1);
                      err = true;
                    }
                  }
                }
              }
            } else if (errorlist.length > 1) {
              for (var cc = 0; cc < errorlist.length; cc++) {
                if (errorlist[cc].name === nam) {
                  if (errorlist[cc].count.length === 1) {
                    if (
                      errorlist[cc].count[0].index === row_ind &&
                      errorlist[cc].count[0].i === col_ind
                    ) {
                      errorlist.splice(cc, 1);
                      err = true;
                    }
                  } else if (errorlist[cc].count.length > 1) {
                    for (var cb = 0; cb < errorlist[cc].count.length; cb++) {
                      if (
                        errorlist[cc].count[cb].index === row_ind &&
                        errorlist[cc].count[cb].i === col_ind
                      ) {
                        errorlist[cc].count.splice(cb, 1);
                        err = true;
                      }
                    }
                  }
                }
              }
            }
          } else if (vari === "unverified" && errorlist.length === 0) {
            if (!errorlist.includes(nam)) {
              errorlist.push({
                name: nam,
                label: lab,
                count: [{ index: row_ind, i: col_ind }],
              });
            }
            err = true;
          } else if (vari === "unverified" && errorlist.length > 0) {
            if (errorlist.length === 1) {
              if (errorlist[0].name === nam) {
                if (errorlist[0].count.length === 1) {
                  if (
                    errorlist[0].count[0].index === row_ind &&
                    errorlist[0].count[0].i === col_ind
                  ) {
                    err = true;
                  } else if (
                    errorlist[0].count[0].index !== row_ind ||
                    errorlist[0].count[0].i !== col_ind
                  ) {
                    errorlist[0].count.push({ index: row_ind, i: col_ind });
                    err = true;
                  }
                } else if (errorlist[0].count.length > 1) {
                  var incount = 0;
                  for (var ii = 0; ii < errorlist[0].count.length; ii++) {
                    if (
                      errorlist[0].count[ii].index === row_ind &&
                      errorlist[0].count[ii].i === col_ind
                    ) {
                      err = true;
                    } else if (
                      errorlist[0].count[ii].index !== row_ind &&
                      errorlist[0].count[ii].i !== col_ind
                    ) {
                      incount++;
                    }
                  }
                  if (incount === errorlist[0].count.length) {
                    errorlist[0].count.push({ index: row_ind, i: col_ind });
                    err = true;
                  }
                }
              } else {
                errorlist.push({
                  name: nam,
                  label: lab,
                  count: [{ index: row_ind, i: col_ind }],
                });
                err = true;
              }
            } else if (errorlist.length > 1) {
              var errcount = 0;
              for (var kk = 0; kk < errorlist.length; kk++) {
                if (errorlist[kk].name === nam) {
                  if (errorlist[kk].count.length === 1) {
                    if (
                      errorlist[kk].count[0].index === row_ind &&
                      errorlist[kk].count[0].i === col_ind
                    ) {
                      err = true;
                    } else if (
                      errorlist[kk].count[0].index !== row_ind ||
                      errorlist[kk].count[0].i !== col_ind
                    ) {
                      errorlist[kk].count.push({ index: row_ind, i: col_ind });
                      err = true;
                    }
                  } else if (errorlist[kk].count.length > 1) {
                    var incount2 = 0;
                    for (var iid = 0; iid < errorlist[kk].count.length; iid++) {
                      if (
                        errorlist[kk].count[iid].index === row_ind &&
                        errorlist[kk].count[iid].i === col_ind
                      ) {
                        err = true;
                      } else if (
                        errorlist[kk].count[iid].index !== row_ind ||
                        errorlist[kk].count[iid].i !== col_ind
                      ) {
                        incount2++;
                      }
                    }
                    if (incount2 === errorlist[kk].count.length) {
                      errorlist[kk].count.push({ index: row_ind, i: col_ind });
                      err = true;
                    }
                  }
                } else if (errorlist[kk].name !== nam) {
                  errcount++;
                }
              }
              if (errcount === errorlist.length) {
                errorlist.push({
                  name: nam,
                  label: lab,
                  count: [{ index: row_ind, i: col_ind }],
                });
                err = true;
              }
            }
          }
          formrecord[row_ind].record[col_ind].verified = vari;
        } else {
          if (errorlist.length === 1) {
            if (errorlist[0].name === nam) {
              if (errorlist[0].count.length === 1) {
                if (
                  errorlist[0].count[0].index === row_ind &&
                  errorlist[0].count[0].i === col_ind
                ) {
                  errorlist.pop();
                  err = false;
                }
              } else if (errorlist[0].count.length > 1) {
                for (var bbd = 0; bbd < errorlist[0].count.length; bbd++) {
                  if (
                    errorlist[0].count[bbd].index === row_ind &&
                    errorlist[0].count[bbd].i === col_ind
                  ) {
                    errorlist[0].count.splice(bbd, 1);
                    err = true;
                  }
                }
              }
            }
          } else if (errorlist.length > 1) {
            for (var ccd = 0; ccd < errorlist.length; ccd++) {
              if (errorlist[ccd].name === nam) {
                if (errorlist[ccd].count.length === 1) {
                  if (
                    errorlist[ccd].count[0].index === row_ind &&
                    errorlist[ccd].count[0].i === col_ind
                  ) {
                    errorlist.splice(ccd, 1);
                  }
                } else if (errorlist[ccd].count.length > 1) {
                  for (var cf = 0; cf < errorlist[ccd].count.length; cf++) {
                    if (
                      errorlist[ccd].count[cf].index === row_ind &&
                      errorlist[ccd].count[cf].i === col_ind
                    ) {
                      errorlist[ccd].count.splice(cf, 1);
                      err = true;
                    }
                  }
                }
              }
            }
          }
          formrecord[row_ind].record[col_ind].verified = "initial";
        }
      }
      this.setState({
        record: formrecord,
        page_error: err,
        errorlist: errorlist,
      });
    }
  }

  setRefrecord(vl, row_ind, col_ind, ob, type, id, ref_id) {
    var uiScript = this.state.uiscript;
    for (let i = 0; i < uiScript.length; i++) {
      let field = uiScript[i].field.name;
      let func = uiScript[i].script;
      let type = uiScript[i].type;
      //script
      if (field === ob && type === "onreference") {
        this.onReference(func, row_ind);
      }
    }
    this.formChangefn(vl, row_ind, col_ind, id, ob, type, true, ref_id);
  }

  setcolumn(index, r_i, name, type, col) {
    var rf = this.state.record_rq.referenceQualifier;
    var ref_filt = this.state.ref_filter;
    ref_filt = [];
    for (var r = 0; r < rf.length; r++) {
      if (rf[r].loomColumn.id === col) {
        var filt = rf[r].filter.filter;
        for (var f = 0; f < filt.length; f++) {
          if (filt[f].mc === "is dependent") {
            var col_name = filt[f].dc.value;
            var co_label = filt[f].dc.label;
            let ab = this.getFieldValue(filt[f].rf.id, index);
            filt = JSON.parse(JSON.stringify(this.state.mainFilt));
            filt.co = col_name;
            filt.cl = co_label;
            filt.ct = type;
            filt.mc = "=";
            filt.rf.id = ab.id;
            filt.rf.value = ab.value;
            ref_filt.push(filt);
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
      cur_ref_ri: r_i,
      showmodel: true,
    });
    this.handleShow();
  }

  getFieldValue(col_id, index) {
    var rcd = this.state.record;
    if (rcd !== "null" && rcd !== "") {
      for (var r = 0; r < rcd.length; r++) {
        if (index === r) {
          var record = rcd[r].record;
          for (var i = 0; i < record.length; i++) {
            if (record[i].id === col_id) {
              return record[i].value;
            }
          }
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

  fieldverify(type, vl) {
    if (type === "String") {
      // if (/[a-zA-Z]/g.test(vl)) {
      return "verified";
      // } else {
      //   return "unverified";
      // }
    }
    if (type === "email") {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "int") {
      if (/^[0-9]*[0-9][0-9]*$/.test(vl)) {
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
    if (type === "reference") {
      if (/[a-zA-Z]/g.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "choice") {
      if (/[a-zA-Z]/g.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
  }

  callbtn(nam) {
    // var uiScript = this.state.uiscript;
    // for (let i = 0; i < uiScript.length; i++) {
    //   let func = uiScript[i].script;
    //   let type = uiScript[i].type;
    //   if (type === "onsubmit") {
    //     this.onSubmit(func);
    //   }
    // }

    var btn = this.state.button;
    var json = this.state.json;
    var mnrecord = this.state.json.formRecordList[2].records;
    var rcd = this.state.record;
    var blankcount = 0;
    for (var i = 0; i < rcd.length; i++) {
      for (var k = 0; k < rcd[i].record.length; k++) {
        this.validation(
          rcd[i].record[k].value,
          i,
          k,
          rcd[i].record[k].id,
          rcd[i].record[k].name,
          rcd[i].record[k].type
        );
        if (rcd[i].record[k].type !== "reference") {
          if (rcd[i].record[k].value === "") {
            rcd[i].record[k].blank = true;
            blankcount++;
          }
        } else {
          if (rcd[i].record[k].value.value === "") {
            rcd[i].record[k].blank = true;
            blankcount++;
          } else if (rcd[i].record[k].value.value !== "") {
            if (rcd[i].record[k].verified === "unverified") {
              rcd[i].record[k].blank = true;
              blankcount++;
            }
          }
        }
      }
    }

    if (blankcount === 0) {
      if (this.state.errorlist.length === 0) {
        for (var kk = 0; kk < mnrecord.length; kk++) {
          for (var r = 0; r < mnrecord[kk].record.length; r++) {
            for (var m = 0; m < rcd[kk].record.length; m++) {
              if (mnrecord[kk].record[r].name === rcd[kk].record[m].name) {
                mnrecord[kk].record[r].value = rcd[kk].record[m].value;
              }
            }
          }
        }
        json.formRecordList[2].records = mnrecord;
      }
    } else {
      this.setState({ record: rcd, fieldblank: true });
    }

    if (blankcount === 0) {
      for (var ij = 0; ij < btn.length; ij++) {
        if (btn[ij].name === nam) {
          var btntype = btn[ij].returnWebLocation;
          var token = localStorage.getItem("token");
          if (btntype === "NextPage") {
            axios
              .post(this.state.loca + btn[ij].webUrl, json, {
                headers: {
                  "Content-Type": "application/json",
                  authorization: "Bearer " + token,
                },
              })
              .then(
                (resp) => {
                  const refrencercd = resp.data;
                  if (refrencercd !== "") {
                    if ("Error" in refrencercd) {
                      this.setState({
                        loading: false,
                        page_error: true,
                        error: refrencercd.Error,
                      });
                    } else {
                      this.setState({ loading: false });
                      var msg = refrencercd.Result;
                      if (msg !== "") {
                        this.setState({
                          page_message: true,
                          message: msg,
                          page_error: false,
                          btn_disable: true,
                        });
                      }
                    }
                  }
                },
                (error) => {
                  this.props.showErrorCompo();
                  console.log(error);
                }
              );
          } else {
          }
        }
      }
    }
  }

  copyAll(ij) {
    let frecord = this.state.record;
    var val = "";
    var mandatory = [];
    var unverified = [];
    let type = frecord[0].record[ij].type;
    let name = frecord[0].record[ij].name;
    if (
      type === "String" ||
      type === "int" ||
      type === "datetime" ||
      type === "boolean" ||
      type === "date"
    ) {
      if (frecord[0].record[ij].value === "") {
        mandatory.push(frecord[0].record[ij].name);
      }
      var veri = this.fieldverify(type, frecord[0].record[ij].value);
      if (veri === "unverified") {
        unverified.push(frecord[0].record[ij].name);
      }
      for (var i = 0; i < frecord.length; i++) {
        if (i === 0) {
          val = frecord[i].record[ij].value;
        }
        if (val !== "") {
          if (i > 0) {
            frecord[i].record[ij].value = val;
          }
          this.scriptFunc(name, type, frecord[i].record[ij].value, i);
        }
      }
    } else if (type === "reference") {
      for (var t = 0; t < frecord.length; t++) {
        if (t === 0) {
          val = frecord[t].record[ij].value.value;
          var ref_id = frecord[t].record[ij].value.id;
        }
        if (val !== "") {
          if (t > 0) {
            frecord[t].record[ij].value.value = val;
            frecord[t].record[ij].value.id = ref_id;
          }
          this.scriptFunc(name, type, frecord[t].record[ij].value.value, t);
        }
      }
    } else if (type === "choice") {
      for (var c = 0; c < frecord.length; c++) {
        if (c === 0) {
          val = frecord[c].record[ij].value;
        }
        if (val !== "") {
          if (c > 0) {
            frecord[c].record[ij].value = val;
          }
          this.scriptFunc(name, type, frecord[c].record[ij].value, c);
        }
      }
    }
    this.setState({
      record: frecord,
    });
  }

  copyparent(index, ii) {
    let fmecord = this.state.record;
    var vall = fmecord[index - 1].record[ii].value;
    let type = fmecord[index].record[ii].type;
    let name = fmecord[index].record[ii].name;
    if (vall !== "") {
      if (type === "reference") {
        var vall = fmecord[index - 1].record[ii].value.value;
        var val_id = fmecord[index - 1].record[ii].value.id;
        fmecord[index].record[ii].value.value = vall;
        fmecord[index].record[ii].value.id = val_id;
      } else {
        var vall = fmecord[index - 1].record[ii].value;
        fmecord[index].record[ii].value = vall;
      }
    }
    this.scriptFunc(name, type, fmecord[index].record[ii].value, index);

    this.setState({
      record: fmecord,
    });
  }

  scriptFunc(ob, type, val, index) {
    var uiScript = this.state.uiscript;
    for (let i = 0; i < uiScript.length; i++) {
      let field = uiScript[i].field.name;
      let func = uiScript[i].script;
      let ui_type = uiScript[i].type;
      //script
      if (type === "choice") {
        if (field === ob && ui_type === "onchange") {
          this.onChange(func, val, index);
        }
      } else {
        if (field === ob && ui_type === "onchange") {
          this.onChange(func, val, index);
        }
        if (field === ob && ui_type === "oncelledit") {
          this.onCellEdit(func, val, index);
        }
      }
    }
  }

  setRef(val, ref_id) {
    this.setRefrecord(
      val,
      this.state.cur_ref_index,
      this.state.cur_ref_ri,
      this.state.cur_ref_name,
      this.state.cur_ref_type,
      this.state.columnid,
      ref_id
    );
    this.handleClose();
  }

  refreshPage() {
    this.setState({
      page_error: false,
      error: "",
      page_message: false,
      message: "",
      selectNumber: 1,
      btn_disable: false,
    });
    this.initialFunc();
  }

  render() {
    return (
      <div className="pagesetup">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div>
            <div className="row btndiv" style={{ padding : "8px 0px" }}>
              <div className="col-md-1">
                <span>
                  <i
                    className="fa fa-refresh"
                    aria-hidden="true"
                    title="Refresh"
                    onClick={this.refreshPage}
                  ></i>
                </span>
              </div>
              <div className="col-md-3"></div>
              <div className="col-md-3">
                <div className="tab_head ">{this.state.tablabel}</div>
              </div>
            </div>
            {this.state.record.length === 0 && (
              <div>Don't have response...</div>
            )}
            {this.state.page_error === true ? (
              <div className="alert alert-danger form_alt" role="alert">
                {this.state.error}
                Please check these fields:
                {this.state.errorlist.map((er, ii) => (
                  <span key={ii}>
                    {ii > 0 ? ", " : ""}
                    {er.label}
                  </span>
                ))}
              </div>
            ) : null}
            {this.state.page_message === true && (
              <div className="alert alert-success form_alt" role="alert">
                {this.state.message}
              </div>
            )}
            {this.state.fieldblank === true ? (
              <div className="alert alert-danger form_alt" role="alert">
                Please fill fields mark in red
              </div>
            ) : null}
            <div>
              <div className="row">
                <div className="col-md-4 select_num">
                  Select Number Of Records :
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select evtinputlis"
                    aria-label="Default"
                    value={this.state.selectNumber}
                    onChange={(e) => this.selectNumberOfRecords(e.target.value)}
                  >
                    {this.state.mtRelationList.map((obj, index) => (
                      <option key={index} value={obj}>
                        {obj}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {this.state.isMobile ? (
              <div style={{ overflowX: "scroll" }}>
              <table className=" obj_tab table table-bordered table-striped table-hover multi-table-div">
                <thead className="objthead">
                  <tr>
                    {this.state.heading.map((objj, st_i) => (
                      <th className="objname" key={st_i}>
                        <div className="">
                          <span>{objj}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

              <tbody>
                {console.log( "this.state.record",this.state.record)}
                {this.state.record.map((obj, row_ind) => (
                  <tr key={row_ind}>
                    {obj.record.map((rcd, col_ind) => (
                      <td key={col_ind}>
                        <div className="lom_flx">
                          {rcd.type === "String" ? (
                            <input
                              type="text"
                              className={
                                rcd.verified === "unverified" ||
                                  rcd.blank === true
                                  ? "lom_form_control formpadd unverifi"
                                  : "lom_form_control "
                              }
                              value={rcd.value}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          {rcd.type === "int" ? (
                            <input
                              type="text"
                              className={
                                rcd.verified === "unverified" ||
                                  rcd.blank === true
                                  ? "lom_form_control formpadd unverifi"
                                  : "lom_form_control "
                              }
                              value={rcd.value}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          {rcd.type === "datetime" ? (
                            <input
                              type="datetime-local"
                              step="1"
                              className={
                                rcd.verified === "unverified" ||
                                  rcd.blank === true
                                  ? "lom_form_control formpadd unverifi"
                                  : "lom_form_control "
                              }
                              value={rcd.value}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          {rcd.type === "boolean" ? (
                            <input
                              type="checkbox"
                              className={
                                rcd.verified === "unverified" ||
                                  rcd.blank === true
                                  ? "checkpadd unverifi"
                                  : "checkpadd"
                              }
                              checked={rcd.value === "true" ? true : false}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.checked.toString(),
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          {rcd.type === "reference" ? (
                            <>
                              <input
                                type="text"
                                className={
                                  rcd.verified === "unverified" ||
                                    rcd.blank === true
                                    ? "lom_form_control_reference formpadd unverifi"
                                    : "lom_form_control_reference"
                                }
                                value={rcd.value.value}
                                onChange={(e) =>
                                  this.formChangefn(
                                    e.target.value,
                                    row_ind,
                                    col_ind,
                                    rcd.id,
                                    rcd.name,
                                    rcd.type,
                                    false,
                                    rcd.value.id
                                  )
                                }
                                onBlur={(e) =>
                                  setTimeout(() => {
                                    if (rcd.verified !== "verified") {
                                      this.validation(
                                        rcd.value,
                                        // e.target.value,
                                        row_ind,
                                        col_ind,
                                        rcd.id,
                                        rcd.name,
                                        rcd.type
                                      );
                                    }
                                  }, 500)
                                }
                              ></input>
                                <div className="">
                                <i
                                  className="btnsrc btnsrc-ref vlpointer fa fa-search"
                                  aria-hidden="true"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                  onClick={(e) =>
                                    this.setcolumn(
                                      row_ind,
                                      col_ind,
                                      rcd.name,
                                      rcd.type,
                                      rcd.id
                                    )
                                  }
                                ></i>
                                </div>
                              {this.state.refrecord.index === row_ind &&
                                this.state.refrecord.columnIndex === col_ind &&
                                this.state.refrecord.record.length > 0 && (
                                  <div>
                                    {this.state.refrecord.record.map(
                                      (obj_ref, or_f) => (
                                        <div
                                          className="ref_multircd"
                                          onClick={(e) =>
                                            this.setRefrecord(
                                              obj_ref.value,
                                              row_ind,
                                              col_ind,
                                              rcd.name,
                                              rcd.type,
                                              rcd.id,
                                              obj_ref.id
                                            )
                                          }
                                          key={or_f}
                                        >
                                          {obj_ref.value}
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                            </>
                          ) : null}
                          {rcd.type === "choice" ? (
                            <div>
                              {this.state.choice_record.map((ch, chi) => (
                                <div>
                                  {ch.position === col_ind && (
                                    <select
                                      className="form-control form-select formpadd wdth"
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        this.formChangefn(
                                          e.target.value,
                                          row_ind,
                                          col_ind,
                                          rcd.id,
                                          rcd.name,
                                          rcd.type,
                                          false
                                        )
                                      }
                                      value={rcd.value}
                                      onBlur={(e) =>
                                        this.validation(
                                          e.target.value,
                                          row_ind,
                                          col_ind,
                                          rcd.id,
                                          rcd.name,
                                          rcd.type
                                        )
                                      }
                                    >
                                      <option value="None">None</option>
                                      {ch.choice.map((ch_c, chi_c) => (
                                        <option key={chi_c} value={ch_c.name}>
                                          {ch_c.value}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : null}
                          {rcd.type === "date" ? (
                            <input
                              type="date"
                              className={
                                rcd.verified === "unverified"
                                  ? "lom_form_control formpadd unverifi"
                                  : "lom_form_control "
                              }
                              value={rcd.value}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          {rcd.type === "time" ? (
                            <input
                              type="time"
                              className={
                                rcd.verified === "unverified"
                                  ? "lom_form_control formpadd unverifi"
                                  : "lom_form_control "
                              }
                              value={rcd.value}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          <span className="lom_div_margin">
                            {row_ind === 0 && (
                              <button
                                className="lom_button"
                                onClick={() => this.copyAll(col_ind)}
                              >
                                ca
                              </button>
                            )}
                            {row_ind > 0 && (
                              <button
                                className="lom_button"
                                onClick={() =>
                                  this.copyparent(row_ind, col_ind)
                                }
                              >
                                cp
                              </button>
                            )}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}

                
                </tbody>
              </table>
                <span>
                    {this.state.button.map((btobj, bt_i) => (
                      <span key={bt_i}>
                        {btobj.returnMobLocation === "NextActivity" ? (
                          <button
                            key={btobj.name}
                            // className="btn btn-primary"
                            disabled={this.state.btn_disable === true}
                            className={
                              this.state.btn_disable === true
                                ? "csm_btn csm_btn_pri col-md-2 sub-btn disabled"
                                : " csm_btn csm_btn_pri col-md-2 sub-btn"
                            }
                            style={{ marginTop: "8px" }}
                            onClick={() => this.callbtn(btobj.name)}
                          >
                          {btobj.value}
                          </button>
                        ) : null}
                      </span>
                    ))}
                  </span>
            </div>
               ) : (
                <div>
              <table className=" obj_tab table table-bordered table-striped table-hover multi-table-div">
                <thead className="objthead">
                  <tr>
                    {this.state.heading.map((objj, st_i) => (
                      <th className="objname" key={st_i}>
                        <div className="">
                          <span>{objj}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

              <tbody>
              {console.log( "this.state.record",this.state.record)}
                {this.state.record.map((obj, row_ind) => (
                  <tr key={row_ind}>
                    {obj.record.map((rcd, col_ind) => (
                      <td key={col_ind}>
                        <div className="lom_flx">
                          {rcd.type === "String" ? (
                            <input
                              type="text"
                              className={
                                rcd.verified === "unverified" ||
                                  rcd.blank === true
                                  ? "lom_form_control formpadd unverifi"
                                  : "lom_form_control "
                              }
                              value={rcd.value}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          {rcd.type === "int" ? (
                            <input
                              type="text"
                              className={
                                rcd.verified === "unverified" ||
                                  rcd.blank === true
                                  ? "lom_form_control formpadd unverifi"
                                  : "lom_form_control "
                              }
                              value={rcd.value}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          {rcd.type === "datetime" ? (
                            <input
                              type="datetime-local"
                              step="1"
                              className={
                                rcd.verified === "unverified" ||
                                  rcd.blank === true
                                  ? "lom_form_control formpadd unverifi"
                                  : "lom_form_control "
                              }
                              value={rcd.value}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          {rcd.type === "boolean" ? (
                            <input
                              type="checkbox"
                              className={
                                rcd.verified === "unverified" ||
                                  rcd.blank === true
                                  ? "checkpadd unverifi"
                                  : "checkpadd"
                              }
                              checked={rcd.value === "true" ? true : false}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.checked.toString(),
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          {rcd.type === "reference" ? (
                            <>
                              <input
                                type="text"
                                className={
                                  rcd.verified === "unverified" ||
                                    rcd.blank === true
                                    ? "lom_form_control_reference formpadd unverifi"
                                    : "lom_form_control_reference"
                                }
                                value={rcd.value.value}
                                onChange={(e) =>
                                  this.formChangefn(
                                    e.target.value,
                                    row_ind,
                                    col_ind,
                                    rcd.id,
                                    rcd.name,
                                    rcd.type,
                                    false,
                                    rcd.value.id
                                  )
                                }
                                onBlur={(e) =>
                                  setTimeout(() => {
                                    if (rcd.verified !== "verified") {
                                      this.validation(
                                        rcd.value,
                                        // e.target.value,
                                        row_ind,
                                        col_ind,
                                        rcd.id,
                                        rcd.name,
                                        rcd.type
                                      );
                                    }
                                  }, 500)
                                }
                              ></input>
                                <div className="">
                                <i
                                  className="btnsrc btnsrc-ref vlpointer fa fa-search"
                                  aria-hidden="true"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                  onClick={(e) =>
                                    this.setcolumn(
                                      row_ind,
                                      col_ind,
                                      rcd.name,
                                      rcd.type,
                                      rcd.id
                                    )
                                  }
                                ></i>
                                </div>
                              {this.state.refrecord.index === row_ind &&
                                this.state.refrecord.columnIndex === col_ind &&
                                this.state.refrecord.record.length > 0 && (
                                  <div>
                                    {this.state.refrecord.record.map(
                                      (obj_ref, or_i) => (
                                        <div
                                          className="ref_multircd"
                                          onClick={(e) =>
                                            this.setRefrecord(
                                              obj_ref.value,
                                              row_ind,
                                              col_ind,
                                              rcd.name,
                                              rcd.type,
                                              rcd.id,
                                              obj_ref.id
                                            )
                                          }
                                          key={or_i}
                                        >
                                          {obj_ref.value}
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                            </>
                          ) : null}
                          {rcd.type === "choice" ? (
                            <div>
                              {this.state.choice_record.map((ch, chi) => (
                                <div key={chi}>
                                  {ch.position === col_ind && (
                                    <select
                                      className="form-control form-select formpadd wdth"
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        this.formChangefn(
                                          e.target.value,
                                          row_ind,
                                          col_ind,
                                          rcd.id,
                                          rcd.name,
                                          rcd.type,
                                          false
                                        )
                                      }
                                      value={rcd.value}
                                      onBlur={(e) =>
                                        this.validation(
                                          e.target.value,
                                          row_ind,
                                          col_ind,
                                          rcd.id,
                                          rcd.name,
                                          rcd.type
                                        )
                                      }
                                    >
                                      <option value="None">None</option>
                                      {ch.choice.map((ch_c, chi_c) => (
                                        <option key={chi_c} value={ch_c.name}>
                                          {ch_c.value}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : null}
                          {rcd.type === "date" ? (
                            <input
                              type="date"
                              className={
                                rcd.verified === "unverified"
                                  ? "lom_form_control formpadd unverifi"
                                  : "lom_form_control "
                              }
                              value={rcd.value}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          {rcd.type === "time" ? (
                            <input
                              type="time"
                              className={
                                rcd.verified === "unverified"
                                  ? "lom_form_control formpadd unverifi"
                                  : "lom_form_control "
                              }
                              value={rcd.value}
                              onChange={(e) =>
                                this.formChangefn(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type,
                                  false
                                )
                              }
                              onBlur={(e) =>
                                this.validation(
                                  e.target.value,
                                  row_ind,
                                  col_ind,
                                  rcd.id,
                                  rcd.name,
                                  rcd.type
                                )
                              }
                            ></input>
                          ) : null}
                          <span className="lom_div_margin">
                            {row_ind === 0 && (
                              <button
                                className="lom_button"
                                onClick={() => this.copyAll(col_ind)}
                              >
                                ca
                              </button>
                            )}
                            {row_ind > 0 && (
                              <button
                                className="lom_button"
                                onClick={() =>
                                  this.copyparent(row_ind, col_ind)
                                }
                              >
                                cp
                              </button>
                            )}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}

           
                </tbody>
              </table>

              <span>
                    {this.state.button.map((btobj, bt_i) => (
                      <span key={bt_i}>
                        {btobj.returnMobLocation === "NextActivity" ? (
                          <button
                            key={btobj.name}
                            // className="btn btn-primary"
                            disabled={this.state.btn_disable === true}
                            className={
                              this.state.btn_disable === true
                                ? "csm_btn csm_btn_pri col-md-2 sub-btn disabled"
                                : " csm_btn csm_btn_pri col-md-2 sub-btn"
                            }
                            style={{ marginTop: "8px" }}
                            onClick={() => this.callbtn(btobj.name)}
                          >
                          {btobj.value}
                          </button>
                        ) : null}
                      </span>
                    ))}
                  </span>
            </div>
               )}
            
            {/* <div className="centre-flex">
              <span>
                {this.state.button.map((btobj, bt_i) => (
                  <span key={bt_i}>
                    {btobj.returnMobLocation === "NextActivity" ? (
                      <button
                        key={btobj.name}
                        // className="btn btn-primary"
                        disabled={this.state.btn_disable === true}
                        className={
                          this.state.btn_disable === true
                            ? "csm_btn csm_btn_pri col-md-2 sub-btn disabled"
                            : " csm_btn csm_btn_pri col-md-2 sub-btn"
                        }
                        style={{ marginTop: "8px" }}
                        onClick={() => this.callbtn(btobj.name)}
                      >
                        {btobj.value}
                      </button>
                    ) : null}
                  </span>
                ))}
              </span>
            </div> */}

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
                  setRef={(val, ref_id) => this.setRef(val, ref_id)}
                  columnid={this.state.columnid}
                  loca={this.state.loca}
                  colBoolean={true}
                  tabId={this.state.tabId}
                  ref_filt={this.state.ref_filter}
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
        )}
      </div>
    );
  }
}

export default MultiInsert;
