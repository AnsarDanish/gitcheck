import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import ModelList from "./model_list";
import "../css/formcompo.css";
import axios from "axios";

class MultiInsertMT extends Component {
  state = {
    name: "",
    first_record: {},
    record: [], //this.props.multiT_rcd,
    button: [],
    heading: [],
    errorlist: [],
    refrecord: {},
    multi_record: {},
    page_message: false,
    page_error: false,
    fieldblank: false,
    loading: false,
    mainrecord: "",
    error: "",
    message: "",
    columnid: "",
    cur_ref_name: "",
    cur_ref_type: "",
    cur_ref_index: 0,
    cur_ref_ri: 0,
    tabname: "",
    tabId: "",
    table_obj: [],
    insertedRecord: [],
    state_mt: 2,
    rcd_ary: [],
    show: false,
    json: {},
    child_table: "",
    relationType: "",
    mtRelationList: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    ],
    selectNumber: 1,
    choice_record: [],
    loca: this.props.loca,
    isMobile: this.props.isMobile,
  };

  constructor(props) {
    super(props);
    this.callbtn = this.callbtn.bind(this);
    this.callNextPage = this.callNextPage.bind(this);
    this.setcolumn = this.setcolumn.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.copyAll = this.copyAll.bind(this);
    this.copyparent = this.copyparent.bind(this);
    this.formChangefn = this.formChangefn.bind(this);
    this.validation = this.validation.bind(this);
    this.setRef = this.setRef.bind(this);
    this.setRefrecord = this.setRefrecord.bind(this);
    this.selectNumberOfRecords = this.selectNumberOfRecords.bind(this);
    this.setMI = this.setMI.bind(this);
    this.fieldverify = this.fieldverify.bind(this);

    this.state.tabname = props.multi_record.formRecordList[1].table.label;
    this.state.multi_record = props.multi_record;
    this.state.table_obj = props.tableObj;
    this.state.state_mt = props.state_mt;
    this.state.insertedRecord = props.insertedRecord;
    this.state.child_table = props.child_table;
    // this.state.record = props.multiT_rcd;
  }

  componentDidMount() {
    const mltrecord = this.state.multi_record;
    this.setMI(mltrecord);
  }

  componentDidUpdate(props) {
    var tabn = this.state.multi_record.formRecordList[1].table.label;
    if (tabn !== this.state.tabname && tabn !== "") {
      const mltrecord = this.state.multi_record;
      this.setState({ selectNumber: 1 });
      this.setMI(mltrecord);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.multi_record.formRecordList[1].table.value !==
      state.multi_record.formRecordList[1].table.value
    ) {
      return {
        table_obj: props.tableObj,
        multi_record: props.multi_record,
      };
    }
    return null;
  }

  setMI(mltrecord) {
    if (mltrecord !== "") {
      if ("Error" in mltrecord) {
        this.setState({
          loading: false,
          page_error: true,
          error: mltrecord.Error,
        });
      } else {
        var rcd_ary = this.state.rcd_ary;
        var hd = [];
        var gg = [];
        var chc_rcd = [];
        var cont = 0;
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
                .multiInsertColumn === "true" ||
              mltrecord.formRecordList[2].records[ii].record[ij]
                .displayColumn === "true"
            ) {
              if (
                mltrecord.formRecordList[2].records[ii].record[ij].type ===
                "reference"
              ) {
                var count = 0;
                for (var p = 0; p < this.state.table_obj.length; p++) {
                  if (
                    this.state.table_obj[p].value ===
                    mltrecord.formRecordList[2].records[ii].record[ij].refTable
                      .value
                  ) {
                    count++;
                    var cnt = 0;
                    for (var t = 0; t < this.state.rcd_ary.length; t++) {
                      if (
                        this.state.rcd_ary[t].tableName ===
                        this.state.table_obj[p].value
                      ) {
                        cnt++;
                      }
                    }
                    if (cnt === 0) {
                      for (
                        var i = 0;
                        i < this.state.insertedRecord.length;
                        i++
                      ) {
                        var inst = null;
                        if ("formRecordList" in this.state.insertedRecord[i]) {
                          inst = this.state.insertedRecord[i].formRecordList;
                          if (inst !== null) {
                            if (
                              inst[1].table.value ===
                              this.state.table_obj[p].value
                            ) {
                              var mrcd = inst[2].records;
                              var dis_rcd = [];
                              for (var mi = 0; mi < mrcd.length; mi++) {
                                var frl_id = "";
                                var frl_name = "";
                                var m_rcd = mrcd[mi].record;
                                for (var fr = 0; fr < m_rcd.length; fr++) {
                                  if (m_rcd[fr].name === "id") {
                                    frl_id = m_rcd[fr].value;
                                  }
                                  if (m_rcd[fr].displayColumn === "true") {
                                    frl_name = m_rcd[fr].value;
                                  }
                                }
                              }
                              dis_rcd.push(
                                '{"id":"' +
                                  frl_id +
                                  '","value":"' +
                                  frl_name +
                                  '"}'
                              );
                              var frl_tab = JSON.parse(
                                '{"tableName":"' +
                                  this.state.table_obj[p].value +
                                  '","record":[' +
                                  dis_rcd +
                                  "]}"
                              );
                              rcd_ary.push(frl_tab);
                            }
                          }
                        } else if (
                          "formRecord" in this.state.insertedRecord[i]
                        ) {
                          inst = this.state.insertedRecord[i].formRecord;
                          if (inst !== null) {
                            if (
                              inst[1].table.value ===
                              this.state.table_obj[p].value
                            ) {
                              var rcd = inst[2].record;
                              var dis = [];
                              if (rcd.length > 0) {
                                var id = "";
                                var name = "";
                                for (var r = 0; r < rcd.length; r++) {
                                  if (rcd[r].name === "id") {
                                    id = rcd[r].value;
                                  }
                                  if (rcd[r].displayColumn === "true") {
                                    name = rcd[r].value;
                                  }
                                }
                                dis.push('{"id":"","value":"None"}');
                                dis.push(
                                  '{"id":"' + id + '","value":"' + name + '"}'
                                );
                                var tab_tab = JSON.parse(
                                  '{"tableName":"' +
                                    this.state.table_obj[p].value +
                                    '","record":[' +
                                    dis +
                                    "]}"
                                );
                                rcd_ary.push(tab_tab);
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              if (count > 0) {
                mltrecord.formRecordList[2].records[ii].record[ij].noref =
                  "false";
              } else {
                mltrecord.formRecordList[2].records[ii].record[ij].noref =
                  "true";
              }
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
              .multiInsertColumn === "true" ||
            mltrecord.formRecordList[2].records[0].record[j].displayColumn ===
              "true"
          ) {
            hd.push(mltrecord.formRecordList[2].records[0].record[j].label);
            if (
              mltrecord.formRecordList[2].records[0].record[j].type === "choice"
            ) {
              chc_rcd.push({
                position: cont,
                choice: mltrecord.formRecordList[2].records[0].record[j].choice,
              });
            }
            cont++;
          }
        }
        var bttt = mltrecord.formRecordList[8].button;
        this.setState({
          tablabel: mltrecord.formRecordList[1].table.label,
          tabname: mltrecord.formRecordList[1].table.label,
          tabId: mltrecord.formRecordList[1].table.id,
          loading: false,
          record: gg,
          choice_record: chc_rcd,
          button: bttt,
          json: mltrecord,
          heading: hd,
          rcd_ary: rcd_ary,
          relationType: mltrecord.formRecordList[9].multiPage.mtr.type,
        });
      }
    }
  }

  callbtn(nam) {
    this.props.callbtn(nam, this.state.record);
  }

  callNextPage() {
    this.props.showListCompo(this.state.tabname);
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
      if (
        /^(?:(?:(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec))(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:(?:0?2|(?:Feb))(\/|-|\.)(?:29)\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
          vl
        )
      ) {
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
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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

  setcolumn(index, r_i, name, type, col) {
    this.setState({
      columnid: col,
      cur_ref_name: name,
      cur_ref_type: type,
      cur_ref_index: index,
      cur_ref_ri: r_i,
      showmodel: true,
    });
    this.handleShow();
  }

  copyparent(index, ii) {
    let fmecord = this.state.record;
    var vall = fmecord[index - 1].record[ii].value;
    if (vall !== "") {
      fmecord[index].record[ii].value = vall;
    }
    this.setState({
      record: fmecord,
    });
  }

  copyAll(ij) {
    let frecord = this.state.record;
    var val = "";
    var mandatory = [];
    var unverified = [];
    if (
      frecord[0].record[ij].type === "String" ||
      frecord[0].record[ij].type === "int" ||
      frecord[0].record[ij].type === "datetime" ||
      frecord[0].record[ij].type === "boolean" ||
      frecord[0].record[ij].type === "date"
    ) {
      if (frecord[0].record[ij].value === "") {
        mandatory.push(frecord[0].record[ij].name);
      }
      var veri = this.fieldverify(
        frecord[0].record[ij].type,
        frecord[0].record[ij].value
      );
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
        }
      }
    } else if (frecord[0].record[ij].type === "reference") {
      if (frecord[0].record[ij].noref === "true") {
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
          }
        }
      } else if (frecord[0].record[ij].noref === "false") {
        var id = "";
        var refval = "";

        for (var f = 0; f < frecord.length; f++) {
          if (f === 0) {
            id = frecord[f].record[ij].value.id;
            refval = frecord[f].record[ij].value.value;
          }
          if (refval !== "") {
            if (f > 0) {
              frecord[f].record[ij].value.value = refval;
              frecord[f].record[ij].value.id = id;
            }
          }
        }
      }
    } else if (frecord[0].record[ij].type === "choice") {
      for (var c = 0; c < frecord.length; c++) {
        if (c === 0) {
          val = frecord[c].record[ij].value;
        }
        if (val !== "") {
          if (c > 0) {
            frecord[c].record[ij].value = val;
          }
        }
      }
    }
    // }
    this.setState({
      record: frecord,
    });
  }

  formChangefn(vl, row_ind, col_ind, rcd_id, ob, type, vrf, tabname, ref_id) {
    var frecord = this.state.record;
    if (type === "reference") {
      if (frecord[row_ind].record[col_ind].noref === "false") {
        // frecord[row_ind].record[id].value = vl;
        for (var f = 0; f < this.state.rcd_ary.length; f++) {
          if (this.state.rcd_ary[f].tableName === tabname) {
            for (var r = 0; r < this.state.rcd_ary[f].record.length; r++) {
              if (this.state.rcd_ary[f].record[r].id === vl) {
                frecord[row_ind].record[col_ind].value.value =
                  this.state.rcd_ary[f].record[r].value;
                frecord[row_ind].record[col_ind].value.id =
                  // ref_id;
                  this.state.rcd_ary[f].record[r].id;
              }
            }
          }
        }
        this.setState({ record: frecord });
      } else if (frecord[row_ind].record[col_ind].noref === "true") {
        if (vrf === false) {
          frecord[row_ind].record[col_ind].clicked = false;
        }
        if (vl.length > 2) {
          if (vrf === true) {
            if (frecord[row_ind].record[col_ind].name === ob) {
              frecord[row_ind].record[col_ind].value.value = vl;
              frecord[row_ind].record[col_ind].value.id = ref_id;
              frecord[row_ind].record[col_ind].clicked = true;
              var rfrcd = this.state.refrecord;
              rfrcd.record = [];
              this.setState({ record: frecord, refrecord: rfrcd });
              this.validation(vl, row_ind, col_ind, rcd_id, ob, type);
            }
          } else {
            if (frecord[row_ind].record[col_ind].name === ob) {
              frecord[row_ind].record[col_ind].value.value = vl;
              frecord[row_ind].record[col_ind].value.id = ref_id;
              this.setState({ record: frecord });
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
                    rff = refrencercd.referenceRecordList[2].records;
                  }
                }
                var rf = { index: row_ind, record: rff };
                this.setState({ refrecord: rf });
              });
          }
        } else {
          if (frecord[row_ind].record[col_ind].name === ob) {
            frecord[row_ind].record[col_ind].value.value = vl;
            var refrcd = this.state.refrecord;
            refrcd.record = [];
            this.setState({ record: frecord, refrecord: refrcd });
          }
        }
      }
    } else {
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
  }

  validation(vl, row_ind, col_ind, id, ob, type) {
    var formrecord = this.state.record;
    if (type === "reference") {
      if (formrecord[row_ind].record[col_ind].noref === "false") {
        formrecord[row_ind].record[col_ind].verified = "verified";
      } else if (formrecord[row_ind].record[col_ind].noref === "true") {
        if (vl !== "") {
          if (formrecord[row_ind].record[col_ind].clicked === true) {
            formrecord[row_ind].record[col_ind].verified = "verified";
          } else {
            var token = localStorage.getItem("token");
            var veri = '{"referenceRecord":[{"columnid":"' + id + '"},';
            veri += '{"tabvalue":"' + vl + '"}]}';
            axios
              .post(
                this.state.loca + "/lom/reference/verify",
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
                    if (refrencercd.Result === "Unverified") {
                      formrecord[row_ind].record[col_ind].verified =
                        "unverified";
                      this.setState({ record: formrecord });
                    } else {
                      formrecord[row_ind].record[col_ind].verified = "verified";
                      var rfrcd = this.state.refrecord;
                      rfrcd.record = [];
                      this.setState({ record: formrecord, refrecord: rfrcd });
                    }

                    this.setState({ record: formrecord });
                    return;
                  }
                }
              });
          }
        } else {
          formrecord[row_ind].record[col_ind].verified = "initial";
          this.setState({ record: formrecord });
        }
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
    this.formChangefn(vl, row_ind, col_ind, id, ob, type, true, "", ref_id);
  }

  selectNumberOfRecords(val) {
    var multi_rcd = this.state.multi_record;
    // var slect_num = this.state.selectNumber;
    var rrr = multi_rcd.formRecordList[2].records[0];
    multi_rcd.formRecordList[2].records = [];
    for (var m = 0; m < val; m++) {
      multi_rcd.formRecordList[2].records.push(JSON.parse(JSON.stringify(rrr)));
    }
    this.setState({ selectNumber: val });
    this.setMI(multi_rcd);
  }

  render() {
    return (
      <div>
         {console.log("this.state.record" ,this.state.record)}
        <div className="row">
          <div className="col-md-5"></div>
          <div className="col-md-2">
            <div className="tab_head ">{this.state.tablabel}</div>
          </div>
        </div>
        {this.state.record.length === 0 && <div>Don't have response...</div>}
        {this.state.page_error === true ? (
          <div
            className="alert alert-danger form_alt"
            role="alert"
          >
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
          <div
            className="alert alert-success form_alt"
            role="alert"
          >
            {this.state.message}
          </div>
        )}
        {this.state.fieldblank === true ? (
          <div
            className="alert alert-danger form_alt"
            role="alert"
          >
            Please fill fields mark in red
          </div>
        ) : null}
        {/* {this.state.relationType === "user" && ( */}
          <div>
            <div className="row">
              <div className="col-md-2">Select Number Of Records :</div>
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
        {/* )} */}
        <table className=" obj_tab table table-bordered table-striped table-hover">
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
           
            {this.state.record.map((obj, row_ind) => (
              <tr key={row_ind}>
                {obj.record.map((rcd, col_ind) => (
                  <td key={col_ind}>
                    <span className="lom_flx">
                      {obj.verified === "unverified" && (
                        <span
                          className="alert alert-danger form_alt"
                          role="alert"
                        >
                          Please verify field!
                        </span>
                      )}
                      {rcd.type === "String" ? (
                        <input
                          type="text"
                          className={
                            rcd.verified === "unverified" || rcd.blank === true
                              ? "lom_form_control formpadd unverifi"
                              : "lom_form_control "
                          }
                          // className="lom_form_control formpadd"
                          value={rcd.value}
                          onChange={(e) =>
                            this.formChangefn(
                              e.target.value,
                              row_ind,
                              col_ind,
                              rcd.id,
                              rcd.name,
                              rcd.type,
                              false,
                              ""
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
                            rcd.verified === "unverified" || rcd.blank === true
                              ? "lom_form_control formpadd unverifi"
                              : "lom_form_control "
                          }
                          // className="lom_form_control formpadd"
                          value={rcd.value}
                          onChange={(e) =>
                            this.formChangefn(
                              e.target.value,
                              row_ind,
                              col_ind,
                              rcd.id,
                              rcd.name,
                              rcd.type,
                              false,
                              ""
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
                          type="date"
                          className={
                            rcd.verified === "unverified" || rcd.blank === true
                              ? "lom_form_control formpadd unverifi"
                              : "lom_form_control "
                          }
                          // className="lom_form_control formpadd"
                          value={rcd.value}
                          onChange={(e) =>
                            this.formChangefn(
                              e.target.value,
                              row_ind,
                              col_ind,
                              rcd.id,
                              rcd.name,
                              rcd.type,
                              false,
                              ""
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
                            rcd.verified === "unverified" || rcd.blank === true
                              ? "checkpadd unverifi"
                              : "checkpadd "
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
                              false,
                              ""
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
                        <div>
                          {rcd.noref === "false" && (
                            <div>
                              {this.state.rcd_ary.map((reftab, indx) => (
                                <div key={indx}>
                                  {reftab.tableName === rcd.refTable.value ? (
                                    <div>
                                      <select
                                        className="form-select"
                                        value={rcd.value.id}
                                        // selected={rcd.value.id}
                                        onChange={(e) =>
                                          this.formChangefn(
                                            e.target.value,
                                            row_ind,
                                            col_ind,
                                            rcd.id,
                                            rcd.name,
                                            rcd.type,
                                            false,
                                            reftab.tableName
                                          )
                                        }
                                      >
                                        {reftab.record.map(
                                          (obj_t, index_tab) => (
                                            <option
                                              key={index_tab}
                                              value={obj_t.id}
                                            >
                                              {obj_t.value}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          )}
                          {rcd.noref === "true" && (
                            <div>
                              <div className="lom_flx">
                                <input
                                  type="text"
                                  className={
                                    rcd.verified === "unverified" ||
                                    rcd.blank === true
                                      ? "lom_form_control formpadd unverifi"
                                      : "lom_form_control"
                                  }
                                  // className="lom_form_control formpadd"
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
                                      ""
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
                                <div className="btnsrc vlpointer">
                                  <i
                                    className="fa fa-search"
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
                              </div>
                              {this.state.refrecord.index === row_ind &&
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
                            </div>
                          )}
                        </div>
                      ) : null}
                      {rcd.type === "choice" ? (
                        <div>
                          {this.state.choice_record.map((ch, chi) => (
                            <div>
                              {ch.position === col_ind && (
                                <select
                                  className="form-control form-select formpadd "
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
                            onClick={() => this.copyparent(row_ind, col_ind)}
                          >
                            cp
                          </button>
                        )}
                      </span>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
            <span>
              {this.state.button.map((btobj, bt_i) => (
                <span key={bt_i}>
                  {btobj.returnMobLocation === "NextActivity" ? (
                    <button
                      key={btobj.name}
                      className="btn btn-primary"
                      onClick={() => this.callbtn(btobj.name)}
                    >
                      {btobj.value}
                    </button>
                  ) : null}
                </span>
              ))}
            </span>
          </tbody>
        </table>
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

export default MultiInsertMT;
