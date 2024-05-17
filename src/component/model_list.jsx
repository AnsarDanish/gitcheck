import React, { Component } from "react";
import axios from "axios";
import "../css/listcompo.css";
import WorkInProgress from "./work_in_progress";
import NewFilterCompo from "./NewFilterCompo";
import PreferenceComponent from "./preference_component";
import { Modal, Button } from "react-bootstrap";

class ModelList extends Component {
  state = {
    name: "",
    list: [],
    button: [],
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
    filter: {
      filter: [
        {
          ct: "",
          af: "",
          mc: "",
          cl: "",
          co: "",
          an: "",
          rf: { id: "", value: "" },
          dc: { id: "", value: "", label: "" },
        },
      ],
    },
    timeline: "",
    sortColumn: { name: "", sort: false },
    columnid: "",
    tabId: "",
    loading: false,
    filter_unset: false,
    tablabel: "",
    page_error: false,
    error: "",
    noRecord: false,
    show: false,
    prefCall: [],
    loca: this.props.loca,
    srch: "",
    srch_column: "name",
    lst_record: [],
    colBoolean: this.props.colBoolean,
    tabname: "",
    columnList: [],
    ref_filt: [],
    isMobile: this.props.isMobile,
    isVar: this.props.isVar,
    tableName: "",
    other: this.props.otherLocation,
  };

  constructor(props) {
    super(props);
    this.alreadyRun = React.createRef();
    this.state.columnid = props.columnid;
    this.state.tabId = props.tabId;
    this.state.ref_filt = props.ref_filt;
    this.state.tabname = props.tabname;
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
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseRefresh = this.handleCloseRefresh.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.searchColumn = this.searchColumn.bind(this);
    this.setListRecord = this.setListRecord.bind(this);
    this.callSearchbtn = this.callSearchbtn.bind(this);
    this.callfilter = this.callfilter.bind(this);
    this.calltimeline = this.calltimeline.bind(this);
    this.callbtn = this.callbtn.bind(this);
    this.rightReadOnly = this.rightReadOnly.bind(this);
    this.leftReadOnly = this.leftReadOnly.bind(this);
    this.getChoiceRcd = this.getChoiceRcd.bind(this);
    this.callButton = this.callButton.bind(this);
    this.state.filtarray.push(this.state.filt);
  }

  componentDidMount() {
    console.log(this.state.filter);
    var filterstate = this.state.filter;
    var ref_filt = this.state.ref_filt;
    if (ref_filt !== undefined) {
      this.setState({ ref_filt: ref_filt });
    }
    var farray = [];
    if (
      this.state.filter === "" ||
      this.state.filter === "undefined" ||
      this.state.filter === undefined ||
      this.state.filter === "null" ||
      this.state.filter === null
    ) {
      farray.push(this.state.filt);
      filterstate = farray;
    } else {
      farray = this.state.filter.filter;
      filterstate = farray;
    }
    this.setState({ filter: filterstate });
    var tablere = '{"formRecordList":[';
    tablere += '{"application":{"id":"","value":"loom"}}';
    if (this.state.other === true) {
      tablere +=
        ',{"table":{"id":"","value":"' + this.state.tabname + '","label":""}}';
    } else {
      tablere +=
        ',{"table":{"id":"' +
        this.state.tabId +
        '","colId":"' +
        this.state.columnid +
        '","value":"' +
        this.state.tabname +
        '"}}';
    }
    tablere += ',{"records":[]}';
    tablere +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';
    tablere += ',{"sort":{"asc":"true","column":"id"}}';
    console.log(ref_filt);
    if (ref_filt !== undefined && ref_filt.length !== 0) {
      console.log("fea");
      tablere += ',{"filter":' + JSON.stringify(ref_filt) + "}";
    } else {
      console.log("fefewfaa");
      tablere += ',{"filter":' + JSON.stringify(filterstate) + "}";
    }
    tablere += ',{"timeLine":"' + this.state.timeline + '"}]}';
    console.log(tablere);
    this.setList(tablere);
  }

  componentDidUpdate(nextProps) {
    var filterstate = this.state.filter;
    var ref_filt = this.state.ref_filt;

    if (
      nextProps.columnid !== this.state.columnid ||
      nextProps.tabname !== this.state.tabname ||
      nextProps.tabId !== this.state.tabId ||
      nextProps.ref_filt !== this.state.ref_filt
    ) {
      var farray = [];
      if (
        this.state.filter === "" ||
        this.state.filter === "undefined" ||
        this.state.filter === undefined ||
        this.state.filter === "null" ||
        this.state.filter === null
      ) {
        farray.push(this.state.filt);
        filterstate = farray;
      } else {
        farray = this.state.filter.filter;
        filterstate = farray;
      }
      this.setState({
        columnid: nextProps.columnid,
        filter: filterstate,
        tabname: nextProps.tabname,
        ref_filt: nextProps.ref_filt,
      });

      var tablere = '{"formRecordList":[';
      tablere += '{"application":{"id":"","value":"loom"}}';
      tablere +=
        ',{"table":{"id":"' +
        nextProps.tabId +
        '","colId":"' +
        nextProps.columnid +
        '","value":"' +
        nextProps.tabname +
        '"}}';
      tablere += ',{"records":[]}';
      tablere +=
        ',{"page":{"record_count":"0","page_count":"1",' +
        '"page_clicked":"1","page_records":"0"}}';
      tablere += ',{"sort":{"asc":"true","column":"id"}}';
      if (ref_filt !== undefined && ref_filt.length !== 0) {
        tablere += ',{"filter":' + JSON.stringify(ref_filt) + "}";
      } else {
        tablere += ',{"filter":' + JSON.stringify(filterstate) + "}";
      }
      tablere += ',{"timeLine":"' + this.state.timeline + '"}]}';
      this.setList(tablere);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.tabname !== state.tabname) {
      return {
        tabname: props.tabname,
        ref_filt: props.ref_filt,
        column_depend: [],
      };
    } else if (props.tabname === state.tabname) {
      if (props.ref_filt !== state.ref_filt) {
        return {
          ref_filt: props.ref_filt,
          column_depend: [],
        };
      }
      if (props.isMobile !== state.isMobile) {
        return {
          isMobile: props.isMobile,
        };
      }
      return null;
    }
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
      ',{"table":{"id":"' +
      this.state.tabId +
      '","colId":"' +
      this.state.columnid +
      '","value":"' +
      this.state.tabname +
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
    pp += ',{"filter":' + JSON.stringify(this.state.filter.filter) + "}";
    pp += ',{"timeLine":"' + this.state.timeline + '"}]}';

    this.setList(pp);
  }

  nextPage() {
    var pp = '{"formRecordList":[';
    pp += '{"application":{"id":"","value":"loom"}}';
    pp +=
      ',{"table":{"id":"' +
      this.state.tabId +
      '","colId":"' +
      this.state.columnid +
      '","value":"' +
      this.state.tabname +
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
    pp += ',{"filter":' + JSON.stringify(this.state.filter.filter) + "}";
    pp += ',{"timeLine":"' + this.state.timeline + '"}]}';
    this.setList(pp);
  }

  firstPage() {
    var pp = '{"formRecordList":[';
    pp += '{"application":{"id":"","value":"loom"}}';
    pp +=
      ',{"table":{"id":"' +
      this.state.tabId +
      '","colId":"' +
      this.state.columnid +
      '","value":"' +
      this.state.tabname +
      '","label":"' +
      this.state.tablabel +
      '"}}';
    pp += ',{"records":[]}';
    pp +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';
    pp += this.setSort();
    pp += ',{"filter":' + JSON.stringify(this.state.filter.filter) + "}";
    pp += ',{"timeLine":"' + this.state.timeline + '"}]}';

    this.setList(pp);
  }

  lastPage() {
    var pp = '{"formRecordList":[';
    pp += '{"application":{"id":"","value":"loom"}}';
    pp +=
      ',{"table":{"id":"' +
      this.state.tabId +
      '","colId":"' +
      this.state.columnid +
      '","value":"' +
      this.state.tabname +
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
    pp += ',{"filter":' + JSON.stringify(this.state.filter.filter) + "}";
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
        dc: { id: "", value: "", label: "" },
      };
      flt.push(ff);
    }
    var clmn = "";
    var pp = '{"formRecordList":[';
    pp += '{"application":{"id":"","value":"loom"}}';
    pp +=
      ',{"table":{"id":"' +
      this.state.tabId +
      '","colId":"' +
      this.state.columnid +
      '","value":"' +
      this.state.tabname +
      '", "label":"' +
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
        pp += ',{"sort":{"asc":"true","column":"' + clmn + '"}}';
      } else {
        pp += ',{"sort":{"asc":"false","column":"' + clmn + '"}}';
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
        pp += ',{"sort":{"asc":"true","column":"' + clmn + '"}}';
      } else {
        pp += ',{"sort":{"asc":"false","column":"' + clmn + '"}}';
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
    if (this.state.colBoolean === true) {
      let url = "";
      if (this.state.isVar) {
        url = this.state.loca + "/loom/get/multiplerecord/ref";
      } else {
        if (this.state.other === true) {
          url = this.state.loca + "/loom/get/multiplerecord";
        } else {
          url = this.state.loca + "/loom/get/multiplerecord/col";
        }
      }
      axios
        .post(url, tablere.toString(), {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        })
        .then(
          (resp) => {
            const listrecord = resp.data;
            this.setListRecord(listrecord);
          },
          (error) => {
            this.props.showErrorCompo();
            console.log(error);
          }
        );
    } else if (this.state.colBoolean === false) {
      axios
        .post(
          this.state.loca + "/loom/get/multiplerecord",
          tablere.toString(),
          {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            },
          }
        )
        .then(
          (resp) => {
            const listrecord = resp.data;
            this.setListRecord(listrecord);
          },
          (error) => {
            this.props.showErrorCompo();
            console.log(error);
          }
        );
    }
  }

  setListRecord(listrecord) {
    var columnarry = [];
    var col_list = [];
    var hd = [];
    var va_ll = [];
    // var pagecount = {};
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
          // var filterString = "";
          // var leng = fltarr.length;
          // for (var f = 0; f < fltarr.length; f++) {
          //   if (leng === 1 && fltarr[f].cl === "") {
          //     break;
          //   } else {
          //     if (f > 0) {
          //       filterString += fltarr[f].af + " ";
          //     }
          //     filterString += fltarr[f].cl + " ";
          //     filterString += fltarr[f].mc + " ";
          //     if (fltarr[f].ct === "reference") {
          //       filterString += fltarr[f].rf.value + " ";
          //     } else {
          //       filterString += fltarr[f].an + " ";
          //     }
          //   }
          // }
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
              if (
                fltarr[f].ct === "reference" ||
                fltarr[f].ct === "multi_select"
              ) {
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
            tableName: listrecord.formRecordList[1].table.value,
            prefCall: listrecord.formRecordList[9].column,
            list: columnarry,
            page_clicked: page_clicked1,
            page_count: page_count1,
            page_records: page_records1,
            record_count: record_count1,
            col_mn: cla,
            filter: flt,
            filtarray: fltarr,
            timeline: tmln,
            filString: filterString,
            columnList: col_list,
          });
        }
      }
    }
    this.setState({ loading: false });
  }

  callform(nam, r_id, refDisplay) {
    if (nam === "first") {
      this.props.setRef(refDisplay, r_id);
    } else if (nam === "second") {
    }
  }

  callButton(nam, tab, r_id) {
    this.props.showFormCompo(tab, 0, "new");
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
    if (this.state.other === true) {
      pp +=
        ',{"table":{"id":"","value":"' + this.state.tabname + '","label":""}}';
    } else {
      pp +=
        ',{"table":{"id":"' +
        this.state.tabId +
        '","colId":"' +
        this.state.columnid +
        '","value":""}}';
    }
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
    if (this.state.other === true) {
      fs +=
        ',{"table":{"id":"","value":"' + this.state.tabname + '","label":""}}';
    } else {
      fs +=
        ',{"table":{"id":"' +
        this.state.tabId +
        '","colId":"' +
        this.state.columnid +
        '","value":""}}';
    }
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

    // } else {
    // 	this.setState({ filt: fil });
    // }
  }

  async callfilter(filtarray, in_index, col_id) {
    var rcd = this.state.list;
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
      ',{"table":{"id":"' +
      this.state.tabId +
      '","colId":"' +
      this.state.columnid +
      '","value":""}}';
    tablere += ',{"records":[]}';
    tablere +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';
    tablere += ',{"sort":{"asc":"true","column":"id"}}';
    tablere += ',{"filter":' + JSON.stringify(this.state.filtarray) + "}";
    tablere += ',{"timeLine":"' + this.state.timeline + '"}]}';
    this.setList(tablere);
  }

  callbtn(nam) {
    var btn = this.state.button;
    var mnrecord = this.state.mainrecord;
    var btntype = "";
    var calltype = "";
    var foundbtn = false;

    for (var ij = 0; ij < btn.length; ij++) {
      if (btn[ij].name === nam) {
        btntype = btn[ij].buttonWebType;
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
        this.callButton("new", this.state.tableName, 0);
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
            if (rcd !== "") {
              if ("Error" in rcd) {
                this.setState({
                  loading: false,
                  page_error: true,
                  error: rcd.Error,
                });
              } else {
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
              }
            }
          });
      }
      // } else {
      // 	this.setState({
      // 		page_error: true,
      // 		error: error_String,
      // 	});
      // 	document.body.scrollTop = 0;
      // 	document.documentElement.scrollTop = 0;
      // 	// this.props.unmountMe();
      // }
    }
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
      if (this.state.other === true) {
        fs +=
          ',{"table":{"id":"","value":"' +
          this.state.tabname +
          '","label":""}}';
      } else {
        fs +=
          ',{"table":{"id":"' +
          this.state.tabId +
          '","colId":"' +
          this.state.columnid +
          '","value":""}}';
      }
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

  searchColumn(e) {
    this.setState({ srch_column: e.target.value });
  }

  render() {
    return (
      <div className="pagesetup">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div>
            {this.state.page_error === true && (
              <div className="alert alert-danger form_alt" role="alert">
                {this.state.error}
              </div>
            )}
            {console.log(this.state.isMobile)}
            {this.state.isMobile ? (
              <div className="row bck bck-rel">
                <div className="col-lg mid pb-2">
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
                <div className="col-lg martop10 disfl filter-ic2">
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
                    <span className="form-control in-put">
                      {this.state.page_records}
                    </span>

                    {/*     <span>
                      <input
                        className="in-put"
                        type="text"
                        value={this.state.page_records}
                        readOnly={true}
                      ></input>
                    </span> */}
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
              <div className="row bck ">
                <div className=" col-lg-6 col-md-6 ps-md-1 filter-ic">
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
                      // className="insrtbtn2 btn btn-primary btn-sm"
                      type="button"
                      value="Search"
                      aria-hidden="true"
                      onClick={() => this.callSearchbtn()}
                    ></input>
                  )}
                </div>

                <div className=" col-lg-2 col-md-2 text-center">
                  <span className="obj_head ">{this.state.tablabel}</span>
                </div>
                <div className="col-lg-4 col-md-4">
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
                    </span>
                    <span>
                      <input
                        className=" mybt"
                        type="button"
                        value="<"
                        onClick={this.previousPage}
                        disabled={this.leftReadOnly()}
                      />
                    </span>
                    <span className="form-control in-put">
                      {this.state.page_records}
                    </span>

                    {/*   <span>
                      <input
                        className="form-control in-put"
                        type="text"
                        value={this.state.page_records}
                        readOnly={true}
                      ></input>
                    </span> */}
                    <span className="text-uppercase spfont"> of </span>
                    <span className="rcd_count spfont feaffeafawfe">
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
              <div>{this.state.filString}</div>
            )}
            {this.state.showlist === true && (
              <div>
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
                  tabId={this.state.tabId}
                  loca={this.state.loca}
                  isMobile={this.state.isMobile}
                ></NewFilterCompo>
              </div>
            )}

            {/* {this.state.list.length === 0 && <div className="norcd">No Record Found</div>} */}
            {this.state.list.map((lstobj, l_i) => (
              <div
                className="heading_top table_set over"
                key={l_i}
                style={{ height: "590px" }}
              >
                <table
                  className="table table-bordered table-striped table-hover p-1"
                  style={{ overflow: "auto" }}
                >
                  <thead className="sticky-top top-0">
                    <tr className="obj_name">
                      {lstobj.heading.map((obj, o_i) => (
                        <th
                          className="vlpointer"
                          onClick={(e) => this.showupdownbtn(obj.name)}
                          key={o_i}
                        >
                          {obj.label}
                          {this.state.sortColumn.name === obj.name &&
                            this.state.sortColumn.sort === true && (
                              <i className=" icpadding fa fa-arrow-up fjeeio"></i>
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
                    {lstobj.rcd.map((objj, ob_i) => (
                      <tr className="obj_value" key={ob_i}>
                        {objj.colr.map((objr, or_i) => (
                          <td
                            key={or_i}
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
                                    objr.r_id,
                                    objr.ref_value
                                  )
                                : (e) => this.callform("second", "")
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
                {this.state.noRecord === true && (
                  <div className="norcd">No Record Found</div>
                )}
              </div>
            ))}
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
              tablename={this.state.tableName}
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

export default ModelList;
