import React, { Component } from "react";
import axios from "axios";
import "../css/formcompo.css";
import WorkInProgress from "./work_in_progress";
import { Modal, Button } from "react-bootstrap";
import PreferenceComponent from "./preference_component";
import "../css/relationlist.css";
import NewFilterCompo from "./NewFilterCompo";

class RelationListComponent extends Component {
  state = {
    name: "",
    list: [],
    button: [],
    mainrecord: {},
    page_clicked: 0,
    page_count: 0,
    page_records: "",
    record_count: 0,
    showlist: false,
    showbtn: false,
    col_mn: [],
    column_depend: [],
    showupdownbtn: false,
    filtarray: [],

    filt: {
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
    filString: "",
    sortColumn: { name: "", sort: false },
    listName: this.props.listName,
    filter: this.props.filter,
    timeline: this.props.timeline,
    loading: false,
    filter_unset: false,
    show: false,
    prefCall: [],
    recordList: {},
    tablabel: "",
    page_error: "",
    error: "",
    i_d: this.props.i_d,
    noRecord: false,
    loca: this.props.loca,
    columnList: [],
    srch_column: "name",
    srch: "",
    isMobile: this.props.isMobile,
  };

  constructor(props) {
    super(props);
    this.alreadyRun = React.createRef();
    this.state.recordList = props.recordList;
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.setList = this.setList.bind(this);
    this.filtersubmit = this.filtersubmit.bind(this);
    this.filterClear = this.filterClear.bind(this);
    this.showupdownbtn = this.showupdownbtn.bind(this);
    this.setSort = this.setSort.bind(this);
    this.callform = this.callform.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.listRecord = this.listRecord.bind(this);
    this.searchColumn = this.searchColumn.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.callSearchbtn = this.callSearchbtn.bind(this);
    this.callfilter = this.callfilter.bind(this);
    this.calltimeline = this.calltimeline.bind(this);
    this.callbtn = this.callbtn.bind(this);
    this.handleCloseRefresh = this.handleCloseRefresh.bind(this);
    this.rightReadOnly = this.rightReadOnly.bind(this);
    this.leftReadOnly = this.leftReadOnly.bind(this);
    this.getChoiceRcd = this.getChoiceRcd.bind(this);

    this.state.filtarray.push(this.state.filt);
  }

  componentDidMount() {
    this.listRecord(this.state.recordList);
  }

  componentDidUpdate(nextProps) {
    if (
      nextProps.listName !== this.state.listName &&
      nextProps.recordList !== this.state.recordList
    ) {
      //   var filterstate = this.state.filter;
      //   var farray = [];
      //   if (
      //     this.state.filter === "" ||
      //     this.state.filter === "undefined" ||
      //     this.state.filter === undefined ||
      //     this.state.filter === "null" ||
      //     this.state.filter === null
      //   ) {
      //     farray.push(this.state.filt);
      //     filterstate = farray;
      //   } else {
      //     farray = this.state.filter.filter;
      //     filterstate = farray;
      //   }
      //   this.setState({ listName: nextProps.listName, filter: filterstate });

      //   var tablere = '{"formRecordList":[';
      //   tablere += '{"application":{"id":"","value":"loom"}}';
      //   tablere +=
      //     ',{"table":{"id":"","value":"' +
      //     nextProps.listName +
      //     '","label":"' +
      //     this.state.tablabel +
      //     '"}}';
      //   tablere += ',{"records":[]}';
      //   tablere +=
      //     ',{"page":{"record_count":"0","page_count":"1",' +
      //     '"page_clicked":"1","page_records":"0"}}';
      //   tablere += ',{"sort":{"asc":"true","column":"id"}}';
      //   tablere += ',{"filter":' + JSON.stringify(filterstate) + "}";
      //   tablere += ',{"timeLine":"' + this.state.timeline + '"}]}';

      //   this.setList(tablere);
      this.listRecord(this.state.recordList);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.listName !== state.listName &&
      props.recordList !== state.recordList
    ) {
      return {
        listName: props.listName,
        filter: props.filter,
        recordList: props.recordList,
        column_depend: [],
      };
    } else if (props.listName === state.listName) {
      if (props.filter !== state.filter) {
        return {
          filter: props.filter,
          column_depend: [],
        };
      }
    }
    return null;
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleCloseRefresh() {
    this.setState({ show: false });
    var tablere = '{"formRecordList":[';
    tablere += '{"application":{"id":"","value":"loom"}}';
    tablere +=
      ',{"table":{"id":"","value":"' +
      this.state.listName +
      '","label":"' +
      this.state.tablabel +
      '"}}';
    tablere += ',{"records":[]}';
    tablere +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';
    tablere += ',{"sort":{"asc":"true","column":"id"}}';
    tablere += ',{"filter":' + JSON.stringify(this.state.filtarray) + "}";
    tablere += ',{"timeLine":"' + this.state.timeline + '"}]}';
    this.setList(tablere);
  }

  leftReadOnly() {
    if (this.state.page_clicked === 1) {
      return true;
    } else {
      return false;
    }
  }

  rightReadOnly() {
    if (this.state.page_clicked === this.state.page_count) {
      return true;
    } else {
      return false;
    }
  }

  previousPage() {
    var pp = '{"formRecordList":[';
    pp += '{"application":{"id":"","value":"loom"}}';
    pp +=
      ',{"table":{"id":"","value":"' +
      this.state.listName +
      '","label":"' +
      this.state.tablabel +
      '"}}';
    pp += ',{"records":[]}';
    pp +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"' +
      (this.state.page_clicked - 1) +
      '","page_records":"0"}}';
    pp += this.setSort();
    pp += ',{"filter":' + JSON.stringify(this.state.filtarray) + "}";
    pp += ',{"timeLine":"' + this.state.timeline + '"}]}';

    this.setList(pp);
  }

  nextPage() {
    var pp = '{"formRecordList":[';
    pp += '{"application":{"id":"","value":"loom"}}';
    pp +=
      ',{"table":{"id":"","value":"' +
      this.state.listName +
      '","label":"' +
      this.state.tablabel +
      '"}}';
    pp += ',{"records":[]}';
    pp +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"' +
      (this.state.page_clicked + 1) +
      '","page_records":"0"}}';
    pp += this.setSort();
    pp += ',{"filter":' + JSON.stringify(this.state.filtarray) + "}";
    pp += ',{"timeLine":"' + this.state.timeline + '"}]}';

    this.setList(pp);
  }

  firstPage() {
    var pp = '{"formRecordList":[';
    pp += '{"application":{"id":"","value":"loom"}}';
    pp +=
      ',{"table":{"id":"","value":"' +
      this.state.listName +
      '","label":"' +
      this.state.tablabel +
      '"}}';
    pp += ',{"records":[]}';
    pp +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';
    pp += this.setSort();
    pp += ',{"filter":' + JSON.stringify(this.state.filtarray) + "}";
    pp += ',{"timeLine":"' + this.state.timeline + '"}]}';

    this.setList(pp);
  }

  lastPage() {
    var pp = '{"formRecordList":[';
    pp += '{"application":{"id":"","value":"loom"}}';
    pp +=
      ',{"table":{"id":"3","value":"' +
      this.props.listName +
      '","label":"' +
      this.state.tablabel +
      '"}}';
    pp += ',{"records":[]}';
    pp +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"' +
      this.state.page_count +
      '","page_records":"0"}}';
    pp += this.setSort();
    pp += ',{"filter":' + JSON.stringify(this.state.filtarray) + "}";
    pp += ',{"timeLine":"' + this.state.timeline + '"}]}';
    this.setList(pp);
  }

  showupdownbtn(hd) {
    var sarray = this.state.sortColumn;
    let flt = JSON.parse(JSON.stringify(this.state.filtarray));
    if (!this.alreadyRun.current) {
      flt.pop();
      let ff = {
        co: "",
        cl: "",
        mc: "",
        an: "",
        ct: "",
        af: "",
        rf: { id: "", value: "" },
        dc: { id: "", value: "" },
      };
      flt.push(ff);
    }
    var clmn = "";
    var pp = '{"formRecordList":[';
    pp += '{"application":{"id":"","value":"loom"}}';
    pp +=
      ',{"table":{"id":"","value":"' +
      this.state.listName +
      '","label":"' +
      this.state.tablabel +
      '"}}';
    pp += ',{"records":[]}';
    pp +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';

    if (sarray.name === hd) {
      sarray.sort = !sarray.sort;
      for (var l = 0; l < this.state.list.length; l++) {
        for (var ll = 0; ll < this.state.list[l].heading.length; ll++) {
          if (this.state.list[l].heading[ll].name === hd) {
            clmn = this.state.list[l].heading[ll].name;
            break;
          }
        }
      }

      if (sarray.sort === true) {
        pp += ',{"sort":{"asc":"true","column":"' + clmn + '","init":"false"}}';
      } else {
        pp +=
          ',{"sort":{"asc":"false","column":"' + clmn + '","init":"false"}}';
      }
    } else {
      sarray.name = hd;
      sarray.sort = true;
      for (var li = 0; li < this.state.list.length; li++) {
        for (var lll = 0; lll < this.state.list[li].heading.length; lll++) {
          if (this.state.list[li].heading[lll].name === hd) {
            clmn = this.state.list[li].heading[lll].name;
            break;
          }
        }
      }
      if (sarray.sort === true) {
        pp += ',{"sort":{"asc":"true","column":"' + clmn + '","init":"false"}}';
      } else {
        pp +=
          ',{"sort":{"asc":"false","column":"' + clmn + '","init":"false"}}';
      }
    }
    this.setState({ sortColumn: sarray });
    pp += ',{"filter":' + JSON.stringify(flt) + "}";
    pp += ',{"timeLine":"' + this.state.timeline + '"}]}';

    this.setList(pp);
  }

  setSort() {
    var clmn = "";
    var pp = "";
    var srt = this.state.sortColumn.name;
    if (srt !== "") {
      for (var l = 0; l < this.state.list.length; l++) {
        for (var ll = 0; ll < this.state.list[l].heading.length; ll++) {
          if (
            this.state.list[l].heading[ll].name === this.state.sortColumn.name
          ) {
            clmn = this.state.list[l].heading[ll].name;
            break;
          }
        }
      }
      if (this.state.sortColumn.sort === true) {
        pp += ',{"sort":{"asc":"true","column":"' + clmn + '"}}';
      } else {
        pp += ',{"sort":{"asc":"false","column":"' + clmn + '"}}';
      }
      return pp;
    } else {
      pp +=
        ',{"sort":{"asc":"true","column":"' +
        this.state.list[0].heading[0].name +
        '"}}';
    }
    return pp;
  }

  setList(tablere) {
    var token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .post(this.state.loca + "/loom/get/multiplerecord", tablere.toString(), {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          const listrecord = resp.data;
          if (listrecord !== "") {
            if ("Error" in listrecord) {
              this.setState({
                loading: false,
                page_error: true,
                error: listrecord.Error,
              });
            } else {
              this.listRecord(listrecord);
            }
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  listRecord(listrecord) {
    var columnarry = [];
    var hd = [];
    var va_ll = [];
    var col_list = [];
    if (listrecord !== "") {
      if ("Error" in listrecord) {
        this.setState({
          loading: false,
          page_error: true,
          error: listrecord.Error,
        });
      } else {
        var scnd = listrecord.formRecordList[2];
        if ("Error" in scnd) {
          if (scnd.Error === "No record found.") {
            this.setState({ list: [] });
          }
        } else {
          var page_clicked1 = parseInt(
            listrecord.formRecordList[3].page.page_clicked
          );
          var page_count1 = parseInt(
            listrecord.formRecordList[3].page.page_count
          );
          var page_records1 = listrecord.formRecordList[3].page.page_records;
          var record_count1 = parseInt(
            listrecord.formRecordList[3].page.record_count
          );
          var flt = listrecord.formRecordList[5];
          var fltarr = listrecord.formRecordList[5].filter;
          var tmln = listrecord.formRecordList[6].timeLine;
          var filterString = "";
          var leng = fltarr.length;
          for (var f = 0; f < fltarr.length; f++) {
            if (leng === 1 && fltarr[f].cl === "") {
              break;
            } else {
              if (f > 0) {
                filterString += fltarr[f].af + " ";
              }
              filterString += fltarr[f].cl + " ";
              filterString += fltarr[f].mc + " ";
              if (fltarr[f].ct === "reference") {
                filterString += fltarr[f].rf.value + " ";
              } else {
                filterString += fltarr[f].an + " ";
              }
            }
          }
          if (listrecord.formRecordList[2].records.length === 0) {
            this.setState({ noRecord: true });
          } else {
            this.setState({ noRecord: false });
          }
          for (
            var i = 0;
            i < listrecord.formRecordList[2].records.length;
            i++
          ) {
            var in_vl = [];
            var record_id;
            var ref_value;
            for (
              var j = 0;
              j < listrecord.formRecordList[2].records[i].record.length;
              j++
            ) {
              if (j === 0) {
                record_id =
                  listrecord.formRecordList[2].records[i].record[j].value;
                if (
                  listrecord.formRecordList[2].records[i].record[j].refDisplay
                    .type === "reference"
                ) {
                  ref_value =
                    listrecord.formRecordList[2].records[i].record[j].refDisplay
                      .value.value;
                } else {
                  ref_value =
                    listrecord.formRecordList[2].records[i].record[j].refDisplay
                      .value;
                }
              } else if (j === 1) {
                if (
                  listrecord.formRecordList[2].records[i].record[j].type ===
                  "reference"
                ) {
                  in_vl.push({
                    value:
                      listrecord.formRecordList[2].records[i].record[j].value
                        .value,
                    type: listrecord.formRecordList[2].records[i].record[j]
                      .type,
                    firstrecord: true,
                    table: listrecord.formRecordList[1].table.value,
                    r_id: record_id,
                    ref_value: ref_value,
                  });
                } else {
                  in_vl.push({
                    value:
                      listrecord.formRecordList[2].records[i].record[j].value,
                    type: listrecord.formRecordList[2].records[i].record[j]
                      .type,
                    firstrecord: true,
                    table: listrecord.formRecordList[1].table.value,
                    r_id: record_id,
                    ref_value: ref_value,
                  });
                }
              } else {
                if (
                  listrecord.formRecordList[2].records[i].record[j].type ===
                  "reference"
                ) {
                  in_vl.push({
                    value:
                      listrecord.formRecordList[2].records[i].record[j].value
                        .value,
                    type: listrecord.formRecordList[2].records[i].record[j]
                      .type,
                    firstrecord: false,
                    table: listrecord.formRecordList[1].table.value,
                    r_id: record_id,
                  });
                } else {
                  in_vl.push({
                    value:
                      listrecord.formRecordList[2].records[i].record[j].value,
                    type: listrecord.formRecordList[2].records[i].record[j]
                      .type,
                    firstrecord: false,
                    table: listrecord.formRecordList[1].table.value,
                    r_id: record_id,
                  });
                }
              }
            }
            va_ll.push({ colr: in_vl });
          }
          for (var c = 0; c < listrecord.formRecordList[9].column.length; c++) {
            if (listrecord.formRecordList[9].column[c].type === "String") {
              col_list.push({
                label: listrecord.formRecordList[9].column[c].label,
                name: listrecord.formRecordList[9].column[c].name,
                type: listrecord.formRecordList[9].column[c].type,
              });
            }
          }
          for (
            var p = 0;
            p < listrecord.formRecordList[10].preference.length;
            p++
          ) {
            hd.push({
              label: listrecord.formRecordList[10].preference[p].label,
              name: listrecord.formRecordList[10].preference[p].name,
            });
          }
          columnarry.push({ heading: hd, rcd: va_ll });
          var cla = JSON.parse(
            JSON.stringify(listrecord.formRecordList[9].column)
          );
          cla.unshift({ label: "None", name: "none" });
          this.setState({
            tablabel: listrecord.formRecordList[1].table.label,
            loading: false,
            list: columnarry,
            page_clicked: page_clicked1,
            page_count: page_count1,
            page_records: page_records1,
            record_count: record_count1,
            col_mn: cla,
            prefCall: listrecord.formRecordList[9].column,
            filter: flt,
            filtarray: fltarr,
            timeline: tmln,
            filString: filterString,
            button: listrecord.formRecordList[11].button,
            columnList: col_list,
          });
        }
      }
    }
  }

  callform(nam, tab, r_id) {
    if (nam === "first") {
      this.props.showFormCompo(tab, r_id, "record");
    } else if (nam === "second") {
    } else if (nam === "new") {
      this.props.showFormCompo(tab, 0, "new");
    }
  }

  dismiss() {
    this.props.unmountMe();
  }

  filterItem() {
    this.setState({ showlist: !this.state.showlist });
    this.setState({ showbtn: !this.state.showbtn });
  }

  filterClear() {
    var fltarray = [];
    fltarray.push(this.state.filt);
    this.setState({ filtarray: fltarray, noRecord: false });
    var tm = "";
    this.setState({ timeline: tm });
    var pp = '{"formRecordList":[';
    pp += '{"application":{"id":"","value":"loom"}}';
    pp +=
      ',{"table":{"id":"","value":"' +
      this.state.listName +
      '","label":"' +
      this.state.tablabel +
      '"}}';
    pp += ',{"records":[]}';
    pp +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';
    pp += this.setSort();
    pp += ',{"filter":' + JSON.stringify(fltarray) + "}";
    pp += ',{"timeLine":"' + tm + '"}]}';
    this.setList(pp);
  }

  filtersubmit() {
    this.alreadyRun.current = true;
    var fs = '{"formRecordList":[';
    fs += '{"application":{"id":"","value":"loom"}}';
    fs +=
      ',{"table":{"id":"","value":"' +
      this.state.listName +
      '","label":"' +
      this.state.tablabel +
      '"}}';
    fs += ',{"records":[]}';
    fs +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';
    fs += ',{"sort":{"asc":"true","column":"id"}}';
    fs += ',{"filter":' + JSON.stringify(this.state.filtarray) + "}";
    fs += ',{"timeLine":"' + this.state.timeline + '"}]}';
    let len = this.state.filtarray.length;
    if (this.state.filtarray[len - 1].co !== "") {
      if (
        this.state.filtarray[len - 1].an !== "" ||
        this.state.filtarray[len - 1].rf.value !== "" ||
        this.state.filtarray[len - 1].dc.value !== ""
      ) {
        this.setList(fs);
      }
    } else {
      this.setList(fs);
    }
  }

  callbtn(nam) {
    var btn = this.state.button;
    var mnrecord = this.state.mainrecord;

    var btntype = "";
    var calltype = "";
    var foundbtn = false;

    for (var ij = 0; ij < btn.length; ij++) {
      if (btn[ij].name === nam) {
        btntype = btn[ij].returnWebLocation;
        calltype = btn[ij].call_type;
        foundbtn = true;
        break;
      }
    }
    if (foundbtn === true && btntype !== "" && calltype !== "") {
      this.setState({
        page_error: false,
        error: "",
        loading: true,
        page_message: false,
        message: "",
      });
      if (calltype === "module") {
        this.props.showFormCompo(this.state.listName, 0, "new");
        // this.callform("new", this.state.listName, 0);
      } else if (calltype === "selection") {
        var returnType = btn[ij].recordReturnType;
        this.props.showRoleSelectionCompo(this.state.i_d, returnType);
      } else {
        mnrecord.formRecord[2].record = this.state.record;
        var token = localStorage.getItem("token");
        axios
          .post(this.state.loca + btn[ij].webUrl, mnrecord, {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            },
          })
          .then((resp) => {
            const rcd = resp.data;
            this.setState({ loading: false });
            var msg = rcd.formRecord[4].message;
            if (msg !== "") {
              this.setState({ page_message: true, message: msg });
            }
            if (btntype === "NextPage") {
              // var nextP = btn[ij].nextPage;
              var nextP = rcd.formRecord[3].button.nextPage;
              if (nextP === "List") {
                this.callNextPage();
              }
            }
          });
      }
    }
  }

  async callfilter(filtarray, in_index, col_id) {
    var rcd = this.state.list;
    if (col_id !== -1) {
      for (let i = 0; i < rcd.length; i++) {
        if (
          filtarray[in_index].ct === "choice" &&
          filtarray[in_index].ch.length === 0
        ) {
          await this.getChoiceRcd(col_id).then((res) => {
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
    });
  }

  async getChoiceRcd(col_id) {
    var token = localStorage.getItem("token");
    let ck = await axios
      .get(this.state.loca + "/loom/get/choice/" + col_id, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
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
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
    return ck;
  }

  calltimeline(timeline) {
    this.setState({
      timeline: timeline,
    });
  }

  searchColumn(e) {
    this.setState({ srch_column: e.target.value });
  }

  changeSearch(val) {
    if (val === "") {
      this.setState({ srch: "" });
      this.filterClear();
    } else {
      this.setState({ srch: val });
    }
  }

  callSearchbtn() {
    var fld = this.state.srch_column;
    var val = this.state.srch;
    var col = this.state.columnList;
    var type = "";
    var label = "";
    for (var c = 0; c < col.length; c++) {
      if (fld === col[c].name) {
        type = col[c].type;
        label = col[c].label;
      }
    }
    if (val.length > 2) {
      let filter = [
        {
          ct: type,
          af: "",
          mc: "contains",
          cl: label,
          co: fld,
          an: val,
          rf: { id: "", value: "" },
        },
      ];
      var fs = '{"formRecordList":[';
      fs += '{"application":{"id":"","value":"loom"}}';
      fs +=
        ',{"table":{"id":"","value":"' +
        this.state.listName +
        '","label":"' +
        this.state.tablabel +
        '"}}';
      fs += ',{"records":[]}';
      fs +=
        ',{"page":{"record_count":"0","page_count":"1",' +
        '"page_clicked":"1","page_records":"0"}}';
      fs += ',{"sort":{"asc":"true","column":"id"}}';
      fs += ',{"filter":' + JSON.stringify(filter) + "}";
      fs += ',{"timeLine":""}]}';
      this.setList(fs);
    }
  }

  render() {
    return (
      <div className="pagesetup">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div>
            {this.state.isMobile ? (
              <div className="row bck bck-rel">
                <div className="col-lg mid">
                  <span className="obj_head ">{this.state.tablabel}</span>
                </div>
                <div className="col-lg filter-ic">
                  {this.state.showlist === false && (
                    <select
                      className="form-select namelist-mob"
                      aria-label="Default"
                      value={this.state.srch_column}
                      onChange={(e) => this.searchColumn(e)}
                    >
                      {this.state.columnList.map((obj2, index) => (
                        <option key={index} value={obj2.name}>
                          {obj2.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {this.state.showlist === false && (
                    <input
                      className="srch-mob form-control"
                      type="search"
                      aria-label="Search"
                      value={this.state.srch}
                      aria-hidden="true"
                      onChange={(e) => this.changeSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          this.callSearchbtn();
                        }
                      }}
                    ></input>
                  )}
                  {this.state.showlist === false && (
                    <input
                      className="csm_btn csm_btn_pri col-md-2 sub-btn"
                      type="button"
                      value="Search"
                      aria-hidden="true"
                      onClick={() => this.callSearchbtn()}
                    ></input>
                  )}
                </div>
                <div className="col-lg martop10 disfl filter-ic">
                  <i
                    className="fa fa-filter vlpointer pdtop5"
                    aria-hidden="true"
                    onClick={this.filterItem}
                  ></i>
                  <i
                    className="fa fa-cog vlpointer cog_pd pdtop5"
                    aria-hidden="true"
                    onClick={this.handleShow}
                  ></i>
                  <div className="">
                    <span style={{ marginLeft: "0.5em" }}>
                      <input
                        className=" mybt"
                        type="button"
                        value="<<"
                        onClick={this.firstPage}
                        disabled={this.leftReadOnly()}
                      />
                      <input
                        className=" mybt"
                        type="button"
                        value="<"
                        onClick={this.previousPage}
                        disabled={this.leftReadOnly()}
                      />
                    </span>
                    <span>
                      <input
                        className="in-put"
                        type="text"
                        value={this.state.page_records}
                        readOnly={true}
                      ></input>
                    </span>
                    <span className="text-uppercase spfont"> of </span>
                    <span className="rcd_count spfont">
                      {this.state.record_count}
                    </span>
                    <span>
                      <input
                        className=" mybt"
                        type="button"
                        value=">"
                        onClick={this.nextPage}
                        disabled={this.rightReadOnly()}
                      />
                    </span>
                    <span>
                      <input
                        className=" mybt"
                        type="button"
                        value=">>"
                        disabled={this.rightReadOnly()}
                        onClick={this.lastPage}
                      />
                    </span>
                  </div>
                </div>
                <div className="col-lg martop10">
                  {this.state.button.map((obj, oo_i) => (
                    <input
                      type="button"
                      className="csm_btn csm_btn_pri col-md-2 sub-btn"
                      key={oo_i}
                      onClick={(e) => this.callbtn(obj.name)}
                      value={obj.value}
                    ></input>
                  ))}
                </div>

                <div className="col-lg martop10">
                  {this.state.showlist === true && (
                    <input
                      className="csm_btn csm_btn_pri col-md-2 sub-btn"
                      type="button"
                      value="Run"
                      aria-hidden="true"
                      onClick={this.filtersubmit}
                    ></input>
                  )}

                  {this.state.showlist === true && (
                    <input
                      className="csm_btn csm_btn_pri col-md-2 sub-btn"
                      type="button"
                      value="Clear"
                      aria-hidden="true"
                      onClick={this.filterClear}
                    ></input>
                  )}
                </div>
              </div>
            ) : (
              <div className="row bck bck-rel">
                <div className="col-md-5 filter-ic">
                  <i
                    className="fa fa-filter vlpointer"
                    aria-hidden="true"
                    onClick={this.filterItem}
                  ></i>
                  <i
                    className="fa fa-cog vlpointer cog_pd"
                    aria-hidden="true"
                    onClick={this.handleShow}
                  ></i>
                  {this.state.showlist === true && (
                    <input
                      className="csm_btn csm_btn_pri col-md-2 sub-btn"
                      type="button"
                      value="Run"
                      aria-hidden="true"
                      onClick={this.filtersubmit}
                    ></input>
                  )}

                  {this.state.showlist === true && (
                    <input
                      className="csm_btn csm_btn_pri col-md-2 sub-btn"
                      type="button"
                      value="Clear"
                      aria-hidden="true"
                      onClick={this.filterClear}
                    ></input>
                  )}
                  {this.state.showlist === false && (
                    <select
                      className="form-select namelist"
                      aria-label="Default"
                      value={this.state.srch_column}
                      onChange={(e) => this.searchColumn(e)}
                    >
                      {this.state.columnList.map((obj2, index) => (
                        <option key={index} value={obj2.name}>
                          {obj2.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {this.state.showlist === false && (
                    <input
                      className="srch form-control"
                      type="search"
                      aria-label="Search"
                      value={this.state.srch}
                      aria-hidden="true"
                      onChange={(e) => this.changeSearch(e.target.value)}
                    ></input>
                  )}
                  {this.state.showlist === false && (
                    <input
                      className="csm_btn csm_btn_pri col-md-2 sub-btn"
                      type="button"
                      value="Search"
                      aria-hidden="true"
                      onClick={() => this.callSearchbtn()}
                    ></input>
                  )}
                </div>
                <div className="col-md-2 mid">
                  <span className="obj_head ">{this.state.tablabel}</span>
                </div>
                <div className="col-md-5 ">
                  <div className="tpi">
                    {this.state.button.map((obj, oo_i) => (
                      <input
                        type="button"
                        className="csm_btn csm_btn_pri col-md-2 sub-btn"
                        key={oo_i}
                        onClick={(e) => this.callbtn(obj.name)}
                        value={obj.value}
                      ></input>
                    ))}
                    <span style={{ marginLeft: "0.5em" }}>
                      <input
                        className=" mybt"
                        type="button"
                        value="<<"
                        onClick={this.firstPage}
                        disabled={this.leftReadOnly()}
                      />
                      <input
                        className=" mybt"
                        type="button"
                        value="<"
                        onClick={this.previousPage}
                        disabled={this.leftReadOnly()}
                      />
                    </span>
                    <span>
                      <input
                        className="in-put"
                        type="text"
                        value={this.state.page_records}
                        readOnly={true}
                      ></input>
                    </span>
                    <span className="text-uppercase spfont"> of </span>
                    <span className="rcd_count spfont">
                      {this.state.record_count}
                    </span>
                    <span>
                      <input
                        className=" mybt"
                        type="button"
                        value=">"
                        onClick={this.nextPage}
                        disabled={this.rightReadOnly()}
                      />
                    </span>
                    <span>
                      <input
                        className=" mybt"
                        type="button"
                        value=">>"
                        disabled={this.rightReadOnly()}
                        onClick={this.lastPage}
                      />
                    </span>
                  </div>
                </div>
              </div>
            )}
            {this.state.showlist === false && this.state.filString !== "" && (
              <div className="clr">{this.state.filString}</div>
            )}
            {this.state.showlist === true && (
              <NewFilterCompo
                showlist={this.state.showlist}
                col_mn={this.state.col_mn}
                col_depend={this.state.column_depend}
                call_fil={(filtarray, in_index, col_id) =>
                  this.callfilter(filtarray, in_index, col_id)
                }
                filtarray={this.state.filtarray}
                timeline={this.state.timeline}
                call_tm={(timeline) => this.calltimeline(timeline)}
                loca={this.state.loca}
                isMobile={this.state.isMobile}
              ></NewFilterCompo>
            )}

            {this.state.list.length === 0 && <div>No Record Found</div>}
            {this.state.list.map((lstobj, lst_i) => (
              <div className="heading_top table_set over" key={lst_i}>
                <table
                  className="table table-bordered table-striped table-hover p-1"
                  style={{ marginBottom: "0px" }}
                >
                  <thead>
                    <tr className="obj_name">
                      {lstobj.heading.map((obj, obj_i) => (
                        <th
                          key={obj_i}
                          className="vlpointer"
                          onClick={(e) => this.showupdownbtn(obj.name)}
                        >
                          {obj.label}
                          {this.state.sortColumn.name === obj.name &&
                            this.state.sortColumn.sort === true && (
                              <i className=" icpadding fa fa-arrow-up"></i>
                            )}
                          {this.state.sortColumn.name === obj.name &&
                            this.state.sortColumn.sort === false && (
                              <i className=" icpadding fa fa-arrow-down"></i>
                            )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lstobj.rcd.map((objj, objj_i) => (
                      <tr className="obj_value" key={objj_i}>
                        {objj.colr.map((objr, objr_i) => (
                          <td
                            key={objr_i}
                            className={
                              objr.firstrecord === true
                                ? "val_pad val_under vlpointer"
                                : "val_pad"
                            }
                            onClick={
                              objr.firstrecord === true
                                ? (e) =>
                                    this.callform(
                                      "first",
                                      objr.table,
                                      objr.r_id
                                    )
                                : (e) => this.callform("second", "", "")
                            }
                          >
                            {objr.type === "filter" || objr.name === "json"
                              ? JSON.stringify(objr.value)
                              : objr.type === "group_key_value"
                              ? JSON.stringify(objr.value.properties)
                              : objr.value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            {this.state.noRecord === true && (
              <div className="norcd">No Record Found</div>
            )}
          </div>
        )}
        <Modal
          dialogClassName="my-modal"
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Personalized List Column</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PreferenceComponent
              pref="user"
              setRef={(val) => this.setRef(val)}
              columnarray={this.state.prefCall}
              tablename={this.state.listName}
              handleClose={() => this.handleCloseRefresh()}
              loca={this.state.loca}
            ></PreferenceComponent>
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

export default RelationListComponent;
