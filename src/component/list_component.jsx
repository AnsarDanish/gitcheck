import React, { Component } from "react";
import "../css/listcompo.css";
import axios from "axios";
import WorkInProgress from "./work_in_progress";
import PreferenceComponent from "./preference_component";
import { Modal, Button } from "react-bootstrap";
import NewFilterCompo from "./NewFilterCompo";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "antd";
const { Option } = Select;

class ListComponent extends Component {
  state = {
    name: "",
    list: [],
    page_clicked: 0,
    page_count: 0,
    page_records: "",
    record_count: 0,
    showlist: false,
    showbtn: false,
    col_mn: [],
    column_depend: [],
    // value: "",
    showupdownbtn: false,
    int_fields: [],
    date_fields: [],
    email_fields: [],
    boln_fields: [],
    str_fields: [],
    ref_fields: [],
    booleanfld: [],
    tm_list: [],
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
    sortColumn: { name: "", sort: true },
    listName: this.props.listName,
    rty: this.props.ty,
    filter: this.props.filter,
    timeline: this.props.timeline,
    filter_unset: false,
    show: false,
    prefCall: [],
    button: [],
    mainrecord: {},
    tablabel: "",
    page_error: false,
    // error: "",
    columnid: "",
    cur_ref_name: "",
    cur_ref_type: "",
    cur_ref_index: 0,
    showmodel: false,
    noRecord: false,
    lst_record: [],
    loca: this.props.loca,
    srch: "",
    srch_column: "name",
    columnList: [],
    isMobile: this.props.isMobile,
    contextMenu: this.props.contextMenu,
    isDashboardinfo: this.props.isDashboardinfo,
    dashData: this.props.dashData,
    showContext: false,
    loading: true,
    tableName: "",
    modal: false,
    btnNamee: "",
    url: "",
    isClick: false,
  };

  _isMounted = false;

  constructor(props) {
    super(props);
    this.menuX = React.createRef();
    this.menuY = React.createRef();
    this.alreadyRun = React.createRef();
    this.filt1 = React.createRef();
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.setList = this.setList.bind(this);
    this.setList1 = this.setList1.bind(this);
    this.filtersubmit = this.filtersubmit.bind(this);
    this.filterClear = this.filterClear.bind(this);
    this.showupdownbtn = this.showupdownbtn.bind(this);
    this.setSort = this.setSort.bind(this);
    this.callform = this.callform.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
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
    this.setContext = this.setContext.bind(this);
    this.refresh = this.refresh.bind(this);
    this.menuFn = this.menuFn.bind(this);
    this.selectedRows = this.selectedRows.bind(this);
    this.selectedAllRows = this.selectedAllRows.bind(this);
    this.selectedAction = this.selectedAction.bind(this);
    this.setModal = this.setModal.bind(this);
    this.selectAction = this.selectAction.bind(this);
    // this.getScriptList = this.getScriptList.bind(this);
    // this.getScriptList = this.getScriptList.bind(this);
    this.getListRecord = this.getListRecord.bind(this);
    this.getSortAndFilter = this.getSortAndFilter.bind(this);
    this.storeSrot = this.storeSrot.bind(this);
    this.saveFilter = this.saveFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.state.filtarray.push(this.state.filt);
    this.myRef = React.createRef();
    console.log("props: ", this.props.listName, "state: ", this.state.listName);
  }

  componentDidMount() {
    console.log("dansfa");
    this._isMounted = true;
    document
      .getElementsByTagName("body")
      .item(0)
      .addEventListener("mousedown", () => {
        if (this._isMounted) {
          this.setState({ showContext: false });
        }
      });

    console.log("this.state.isDashboardinfo ", this.state.isDashboardinfo);
    if (this.state.isDashboardinfo) {
      this.setList1(this.state.dashData)
    } else
      this.getSortAndFilter(); //getSortAndFilter

    // let pg = localStorage.getItem("pageClicked");
    // let p = 1;
    // let srt = true;
    // let srtPage = "id";
    // var filterstate = "";
    // if (pg) {
    //   let pag = JSON.parse(pg);
    //   p = pag.page;
    //   filterstate = pag.filter;
    //   let sort = pag.sort;
    //   srt = sort.sort;
    //   if (sort.name !== "") {
    //     srtPage = sort.name;
    //   }
    //   this.setState({ filtarray: filterstate, sortColumn: sort });
    //   localStorage.removeItem("pageClicked");
    // }

    // // filterstate = this.state.filter;
    // var tm = this.state.filter.timeline;
    // var farray = [];
    // if (filterstate === "") {
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
    // }

    // this.setState({
    //   filter: filterstate,
    //   timeline: tm,
    // });
    // var tablere = '{"formRecordList":[';
    // tablere += '{"application":{"id":"","value":"loom"}}';
    // tablere +=
    //   ',{"table":{"id":"","value":"' +
    //   this.state.listName +
    //   '","label":"' +
    //   this.state.tablabel +
    //   '"}}';
    // tablere += ',{"records":[]}';
    // tablere +=
    //   ',{"page":{"record_count":"0","page_count":"1",' +
    //   '"page_clicked":"' +
    //   p +
    //   '","page_records":"0"}}';
    // tablere += ',{"sort":{"asc":"' + srt + '","column":"' + srtPage + '"}}';
    // tablere += ',{"filter":' + JSON.stringify(filterstate) + "}";
    // tablere += ',{"timeLine":"' + tm + '"}]}';
    // this.setList(tablere);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(nextProps) {
    if (
      nextProps.listName !== this.state.listName ||
      nextProps.filter !== this.state.filter
    ) {
      console.log("this.state.isDashboardinfo ", this.state.isDashboardinfo);
      if (this.state.isDashboardinfo) {
        this.setList1(this.state.dashData)
      } else
        this.getSortAndFilter();
      //   let pg = localStorage.getItem("pageClicked");
      //   let p = 1;
      //   let srt = true;
      //   let srtPage = "id";
      //   var filterstate = "";
      //   if (pg) {
      //     let pag = JSON.parse(pg);
      //     p = pag.page;
      //     filterstate = pag.filter;
      //     let sort = pag.sort;
      //     srt = sort.sort;
      //     if (sort.name !== "") {
      //       srtPage = sort.name;
      //     }
      //     this.setState({ filtarray: filterstate, sortColumn: sort });
      //     localStorage.removeItem("pageClicked");
      //   }

      //   var lstnam = this.state.listName;
      //   // filterstate = this.state.filter;
      //   var tm = this.state.filter.timeline;
      //   var farray = [];
      //   if (filterstate === "") {
      //     if (
      //       this.state.filter === "" ||
      //       this.state.filter === "undefined" ||
      //       this.state.filter === undefined ||
      //       this.state.filter === "null" ||
      //       this.state.filter === null
      //     ) {
      //       farray.push(this.state.filt);
      //       filterstate = farray;
      //     } else {
      //       farray = this.state.filter.filter;
      //       filterstate = farray;
      //     }
      //   }
      //   this.setState({ listName: lstnam, filter: filterstate, timeline: tm });
      //   var tablere = '{"formRecordList":[';
      //   tablere += '{"application":{"id":"","value":"loom"}}';
      //   tablere +=
      //     ',{"table":{"id":"","value":"' +
      //     lstnam +
      //     '","label":"' +
      //     this.state.tablabel +
      //     '"}}';
      //   tablere += ',{"records":[]}';
      //   tablere +=
      //     ',{"page":{"record_count":"0","page_count":"1",' +
      //     '"page_clicked":"' +
      //     p +
      //     '","page_records":"0"}}';
      //   tablere += ',{"sort":{"asc":"' + srt + '","column":"' + srtPage + '"}}';
      //   tablere += ',{"filter":' + JSON.stringify(filterstate) + "}";
      //   tablere += ',{"timeLine":"' + tm + '"}]}';
      //   this.setList(tablere);
    }
    const innerText = this.myRef.current;
    if (innerText) {
      if (!this.state.modal) {
        innerText.value = "none";
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.listName !== state.listName) {
      return {
        listName: props.listName,
        filter: props.filter,
        column_depend: [],
        isMobile: props.isMobile,
        tableName: props.listName,
      };
    } else if (props.listName === state.listName) {
      if (props.filter !== state.filter) {
        return {
          filter: props.filter,
          column_depend: [],
          isMobile: props.isMobile,
          tableName: props.listName,
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
    tablere += ',{"sort":{"asc":"true","column":"id","init":"true"}}';
    tablere += ',{"filter":' + JSON.stringify(this.state.filtarray) + "}";
    tablere += ',{"timeLine":"' + this.state.timeline + '"}]}';
    this.setList(tablere);
    // this.getSortAndFilter();
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
      ',{"table":{"id":"0","value":"' +
      this.props.listName +
      '","label":"' +
      this.state.tablabel +
      '"}}';
    pp += ',{"records":[]}';
    pp +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"' +
      (this.state.record_count % 50 == 0
        ? this.state.page_count - 1
        : this.state.page_count) +
      '","page_records":"0"}}';
    pp += this.setSort();
    pp += ',{"filter":' + JSON.stringify(this.state.filtarray) + "}";
    pp += ',{"timeLine":"' + this.state.timeline + '"}]}';

    this.setList(pp);
  }

  showupdownbtn(hd) {
    console.log("hd",hd);
    var sarray = this.state.sortColumn;
    console.log(sarray);
    let flt = JSON.parse(JSON.stringify(this.state.filtarray));
    // if (!this.alreadyRun.current) {
    //   flt.pop();
    //   let ff = {
    //     co: "",
    //     cl: "",
    //     mc: "",
    //     an: "",
    //     ct: "",
    //     af: "",
    //     rf: { id: "", value: "" },
    //     dc: { id: "", value: "" },
    //   };
    //   flt.push(ff);
    // }
    //{"sort":{"asc":"true","column":"","init":"false"}}
    var clmn = "";
    var srt = "";
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
        srt += '{"sort":{"asc":"true","column":"' + clmn + '","init":"false"}}';
        pp += "," + srt;
      } else {
        srt +=
          '{"sort":{"asc":"false","column":"' + clmn + '","init":"false"}}';
        pp += "," + srt;
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
        srt += '{"sort":{"asc":"true","column":"' + clmn + '","init":"false"}}';
        pp += "," + srt;
      } else {
        srt +=
          '{"sort":{"asc":"false","column":"' + clmn + '","init":"false"}}';
        pp += "," + srt;
      }
    }
    // this.setState({ sortColumn: sarray });
    pp += ',{"filter":' + JSON.stringify(flt) + "}";
    pp += ',{"timeLine":"' + this.state.timeline + '"}]}';
    this.storeSrot(srt, pp);
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
        pp += ',{"sort":{"asc":"true","column":"' + clmn + '","init":"false"}}';
      } else {
        pp +=
          ',{"sort":{"asc":"false","column":"' + clmn + '","init":"false"}}';
      }
      return pp;
    } else {
      pp +=
        ',{"sort":{"asc":"true","column":"' +
        this.state.list[0].heading[1].name +
        '","init":"false"}}';
    }
    return pp;
  }

  setList(tablere) {
    console.log(tablere);
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
          console.log(listrecord);
          this.setList1(listrecord);
        },
        (error) => {
          let err = { message: error.message, code: error.response.status };
          this.props.showErrorCompo({ state: { err: err } });
        }
      );
  }

  setList1(listrecord) {
    console.log(this.state.isDashboardinfo);
    console.log("abdullll", listrecord);
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
            for (
              var j = 0;
              j < listrecord.formRecordList[2].records[i].record.length;
              j++
            ) {
              // if (i === 0) {
              //   if (j === 0) {
              //   } else {
              //     hd.push({
              //       label:
              //         listrecord.formRecordList[2].records[i].record[j]
              //           .label,
              //       name: listrecord.formRecordList[2].records[i].record[j]
              //         .name,
              //     });
              //   }
              // }
              if (j === 0) {
                record_id =
                  listrecord.formRecordList[2].records[i].record[j].value;
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
            console.log(this.state.isDashboardinfo);
            if (this.state.isDashboardinfo === true) {
              console.log("feijf");
              va_ll.push({ colr: in_vl });
            } else {
              in_vl.splice(0, 0, { ref: false });
              va_ll.push({ colr: in_vl });
            }
          }
          console.log(in_vl);
          console.log(va_ll);

          for (
            var c = 0;
            c < listrecord.formRecordList[9].column.length;
            c++
          ) {
            if (
              listrecord.formRecordList[9].column[c].type === "String"
            ) {
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
          console.log(hd);
          if (this.state.isDashboardinfo === true) {
            console.log("isDashboard is false");
            columnarry.push({ heading: hd, rcd: va_ll });
          } else {
            hd.splice(0, 0, { ref: false });
            columnarry.push({ heading: hd, rcd: va_ll });
          }
          console.log(columnarry);
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
      let pg = {
        page: this.state.page_clicked,
        filter: this.state.filtarray,
        sort: this.state.sortColumn,
      };
      localStorage.setItem("pageClicked", JSON.stringify(pg));
      this.props.showFormCompo(tab, r_id, "record");
    } else if (nam === "second") {
    } else if (nam === "new") {
      this.props.showFormCompo(tab, 0, "new");
    }
  }

  selectedRows(checked, index) {
    this.state.list[0].rcd[index].colr[0].ref = checked;
    if (!checked) {
      this.state.list[0].heading[0].ref = false;
    }
    this.setState({ list: this.state.list });
  }

  setModal(mod) {
    this.setState({ modal: mod });
  }

  selectedAllRows(checked) {
    let rcd = this.state.list[0].rcd;
    if (checked) {
      this.state.list[0].heading[0].ref = true;
      for (let i = 0; i < rcd.length; i++) {
        this.state.list[0].rcd[i].colr[0].ref = true;
      }
      this.setState({ list: this.state.list });
    } else {
      this.state.list[0].heading[0].ref = false;
      for (let i = 0; i < rcd.length; i++) {
        this.state.list[0].rcd[i].colr[0].ref = false;
      }
      this.setState({ list: this.state.list });
    }
  }

  selectedAction(st) {
    let arr = st.split(",");
    let btnNamee = arr[0];
    let url = arr[1];

    if (this.state.list[0].rcd.length > 0) {
      if (url === "/loom/delete/record") {
        this.setState({ btnNamee: "Delete", modal: true, url: url });
      } else {
        let btnNamee = arr[0];
        this.setState({ btnNamee: btnNamee, modal: true, url: url });
        // this.selectAction(url ,btnNamee);
      }
    }
  }

  selectAction(url) {
    this.setState({ isClick: true });

    let rcd = this.state.list[0].rcd;
    let postBody = [];
    for (let i = 0; i < rcd.length; i++) {
      if (rcd[i].colr[0].ref) {
        // rcd[i].colr.splice(0,1)
        postBody.push(
          rcd[i].colr[1].r_id
          // table: rcd[i].colr[1].table
        );
        continue;
      }
    }
    var jso = {
      url: url,
      table: rcd[0].colr[1].table,
      record: postBody,
    };
    if (postBody.length > 0) {
      var token = localStorage.getItem("token");
      var userDetails = localStorage.getItem("userDetails");
      axios
        .post(this.state.loca + "/loom/selectedAction", jso, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        })
        .then(
          (resp) => {
            const record = resp.data;
            console.log(record);
            if ("Error" in record) {
              toast(record.Error, {
                position: "top-center",
                theme: "colored",
                type: "error",
                style: {
                  marginBottom: userDetails.OS !== "null" ? 12 : 0,
                },
              });
            } else {
              if ("message" in record) {
                toast(record.message, {
                  position: "top-center",
                  theme: "colored",
                  type: "success",
                  style: {
                    marginBottom: userDetails.OS !== "null" ? 12 : 0,
                  },
                });
              } else {
                toast(record, {
                  position: "top-center",
                  theme: "colored",
                  type: "success",
                  style: {
                    marginBottom: userDetails.OS !== "null" ? 12 : 0,
                  },
                });
              }
              this.refresh();
            }
          },
          (error) => {
            this.setState({ loading: false, modal: false, isClick: false });
            toast("Something went wrong", {
              position: "top-center",
              theme: "colored",
              type: "error",
            });
          }
        )
        .finally(() => {
          this.setState({ loading: false, modal: false, isClick: false });
        });
    } else {
      toast("Select any record", {
        position: "top-center",
        theme: "colored",
        type: "error",
      });
      this.setState({ loading: false, modal: false, isClick: false });
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
    fs += ',{"sort":{"asc":"true","column":"id","init":"true"}}';
    // console.log(this.state.filtarray);
    fs += ',{"filter":' + JSON.stringify(this.state.filtarray) + "}";
    fs += ',{"timeLine":"' + this.state.timeline + '"}]}';
    console.log(fs);
    let len = this.state.filtarray.length;
    if (this.state.filtarray[len - 1].co !== "") {
      console.log("1st cond");
      if (
        this.state.filtarray[len - 1].an !== "" ||
        this.state.filtarray[len - 1].rf.value !== "" ||
        this.state.filtarray[len - 1].dc.value !== ""
      ) {
        console.log("hjjhff");
        this.setList(fs);
      }
    } else {
      console.log("2nd cond");
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
        this.callform("new", this.state.listName, 0);
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
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // 	// this.props.unmountMe();
      // }
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
          let err = { message: error.message, code: error.response.status };
          this.props.showErrorCompo({ state: { err: err } });
        }
      );
    return ck;
  }

  calltimeline(timeline) {
    this.setState({
      timeline: timeline,
    });
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
      fs += ',{"sort":{"asc":"true","column":"id","init":"true"}}';
      fs += ',{"filter":' + JSON.stringify(filter) + "}";
      fs += ',{"timeLine":""}]}';
      this.setList(fs);
    }
  }

  searchColumn(e) {
    this.setState({ srch_column: e.target.value });
  }

  setContext(val, x, y) {
    if (val === 2) {
      this.menuX.current = x;
      this.menuY.current = y;
      this.setState({ showContext: true });
    } else {
      this.setState({ showContext: false });
    }
  }

  getListRecord(listName, srrt, flt) {
    this.setState({ listName: listName });
    let pg = localStorage.getItem("pageClicked");
    this.state.sortColumn.name = srrt.column;
    this.state.sortColumn.sort = srrt.asc === "true" ? true : false;
    let p = 1;
    let srt = srrt.asc;
    let srtPage = srrt.column;
    var filterstate = "";
    var filter = this.state.filter;
    var tm = "";
    if (filter !== "null" && filter !== null) {
      this.filt1.current = this.state.filter.filter;
      tm = this.state.filter.timeline;
    } else {
      this.filt1.current = flt.filter;
      tm = flt.timeline;
    }
    if (pg) {
      let pag = JSON.parse(pg);
      p = pag.page;
      filterstate = pag.filter;
      let sort = pag.sort;
      srt = sort.sort;
      if (sort.name !== "") {
        srtPage = sort.name;
      }
      this.setState({ filtarray: filterstate, sortColumn: sort });
      localStorage.removeItem("pageClicked");
    }

    var farray = [];
    if (filterstate === "") {
      if (
        this.filt1.current === "" ||
        this.filt1.current === "undefined" ||
        this.filt1.current === undefined ||
        this.filt1.current === "null" ||
        this.filt1.current === null
      ) {
        farray.push(this.state.filt);
        this.state.sortColumn.name = "";
        this.state.sortColumn.sort = true;
        filterstate = farray;
      } else {
        farray = this.filt1.current;
        filterstate = farray;
      }
    }

    this.setState({
      filter: filterstate,
      timeline: tm,
    });
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
      '"page_clicked":"' +
      p +
      '","page_records":"0"}}';
    tablere +=
      ',{"sort":{"asc":"' +
      srt +
      '","column":"' +
      srtPage +
      '","init":"true"}}';
    tablere += ',{"filter":' + JSON.stringify(filterstate) + "}";
    tablere += ',{"timeLine":"' + flt.timeLine + '"}]}';
    console.log(tablere);
    this.setList(tablere);
  }

  getSortAndFilter() {
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/get/sortfilter/" + this.state.listName, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          let rsp = resp.data;
          console.log("sort: ", rsp);
          this.getListRecord(
            this.state.listName,
            rsp.value[0].sort,
            rsp.value[1]
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  storeSrot(sort, pp) {
    var token = localStorage.getItem("token");
    let js = { tableName: this.state.listName, sort: sort };
    axios
      .post(this.state.loca + "/loom/set/sort", js, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(
        (rsp) => {
          let resp = rsp.data;
          this.setList(pp);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  saveFilter() {
    var token = localStorage.getItem("token");
    let ft = { filter: this.state.filtarray, timeLine: this.state.timeline };
    let js = { tableName: this.state.listName, filter: ft };


    if (this.state.timeline === "undefined" && this.state.filtarray[0].co === "") {
      toast.error("Select filter")
      return
    } else {
      axios
        .post(this.state.loca + "/loom/save/filter", js, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(
          (rsp) => {
            let resp = rsp.data;
            console.log(resp);
            toast.success("Saved filter")
          },
          (error) => {
            console.log(error);
          }
        );

    }

  }

  removeFilter() {
    var token = localStorage.getItem("token");
    let js = { tableName: this.state.listName };
    axios
      .post(this.state.loca + "/loom/remove/filter", js, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(
        (rsp) => {
          let resp = rsp.data;
          console.log("remove:", resp);
          this.getSortAndFilter();
          console.log(resp);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  refresh() {
    console.log("refer");
    this.getSortAndFilter();
  }

  back() {
    // navigate(-1);
  }

  menuFn(body) {
    // this.refresh();
    // this.back();
    // if (body !== "refresh()") {
    //   this.props.showViewCompo(this.state.listName);
    // }

    if (body === "back()") {
      this.back();
    } else if (body === "refresh()") {
      this.refresh();
    } else {
      this.props.showViewCompo(this.state.listName);
    }
  }

  render() {
    return (
      <div className="pagesetup">
        {this.state.loading === true ? (
          <WorkInProgress
            tableName={this.state.listName}
            type={this.state.rty}
          ></WorkInProgress>
        ) : (
          <div>
            {this.state.page_error === true && (
              <div className="alert alert-danger form_alt" role="alert">
                {this.state.error}
              </div>
            )}
            {this.state.isMobile ? (
              <div className="row bck bck-rel">
                <div className="col-lg mid">
                  <span className="obj_head ">{this.state.tablabel}</span>
                </div>
                <div className="col-lg filter-ic">
                  {this.state.showlist === false && !this.state.isDashboardinfo && (
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
                  {this.state.showlist === false && !this.state.isDashboardinfo && (
                    <input
                      className="srch-mob form-control"
                      type="search"
                      aria-label="Search"
                      value={this.state.srch}
                      aria-hidden="true"
                      onChange={(e) => this.changeSearch(e.target.value)}
                    ></input>
                  )}
                  {this.state.showlist === false && !this.state.isDashboardinfo && (
                    <input
                      className="csm_btn csm_btn_pri col-md-2 sub-btn"
                      type="button"
                      value="Search"
                      aria-hidden="true"
                      onClick={() => this.callSearchbtn()}
                    ></input>
                  )}
                </div>
                {!this.state.isDashboardinfo && (
                  <div className="col-lg martop10 disfl filter-ic">
                    <div style={{ width: "25%", fontSize: "20px" }}>
                      <i
                        className="fa fa-filter vlpointer pdtop5 mx-1"
                        aria-hidden="true"
                        onClick={this.filterItem}
                      ></i>
                      <i
                        className="fa fa-cog vlpointer cog_pd pdtop5"
                        aria-hidden="true"
                        onClick={this.handleShow}
                      ></i>
                    </div>
                    <div
                      className="text-end centre-flex"
                      style={{ width: "75%" }}
                    >
                      <span
                      //  style={{ marginRight: "0.5em" }}
                      >
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
                      {/* <span>
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
                )}
                <div className="col-lg martop10">

                  {!this.state.isDashboardinfo && this.state.button.map((obj, oo_i) => (
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
                  {console.log(this.state.filtarray)}
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
              <div
                className="row bck "
                onContextMenu={(e) => {
                  if (this.state.contextMenu[0].role === "1") {
                    e.preventDefault();
                  }
                  this.setContext(
                    e.button,
                    e.nativeEvent.pageX,
                    e.nativeEvent.pageY
                  );
                }}
              >
                {console.log("dashborad", !this.state.isDashboardinfo)}
                {!this.state.isDashboardinfo && (


                  <div>
                    {!this.state.isDashboardinfo && this.state.showContext && this.state.contextMenu[0].role === "1" && (
                      <ul
                        className="dropdown-menu"
                        style={{
                          display: "block",
                          top: this.menuY.current,
                          left: this.menuX.current,
                        }}
                      >
                        {!this.state.isDashboardinfo && this.state.contextMenu &&
                          this.state.contextMenu.map((obj, ind) => (
                            <li
                              key={ind}
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
                  </div>
                )}

                {!this.state.isDashboardinfo && (
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

                    {!this.state.isDashboardinfo && this.state.showlist === true && (
                      <input
                        className="csm_btn csm_btn_pri col-md-2 sub-btn abdulhaleem"
                        type="button"
                        value="Run"
                        aria-hidden="true"
                        onClick={this.filtersubmit}
                      ></input>
                    )}

                    {!this.state.isDashboardinfo && this.state.showlist === true && (
                      <input
                        className="csm_btn csm_btn_pri col-md-2 sub-btn"
                        type="button"
                        value="Clear"
                        aria-hidden="true"
                        onClick={this.filterClear}
                      ></input>
                    )}
                    {!this.state.isDashboardinfo && this.state.showlist === false && (
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

                    {!this.state.isDashboardinfo && this.state.showlist === false && (
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

                    {!this.state.isDashboardinfo && this.state.showlist === false && (
                      <input
                        className="csm_btn csm_btn_pri col-md-2 sub-btn"
                        type="button"
                        value="Search"
                        aria-hidden="true"
                        onClick={() => this.callSearchbtn()}
                      ></input>
                    )}
                  </div>
                )}
                <div className={
                  this.state.isDashboardinfo === true ?
                    "col-md-12 l-box-mar-pad" :
                    "col-md-2 mid mx-auto"
                }>
                  <span
                    className={
                      this.state.isDashboardinfo === true ?
                        "fw-bold text-center list-font-sz" :
                        "obj_head"
                    }
                  >
                    {this.state.tablabel}
                  </span>
                </div>
                {/* <div className="col-md-2 mid mx-auto vdasv">
                    <span className="obj_head text-center">{this.state.tablabel}</span>
                  </div> */}
                {!this.state.isDashboardinfo && (
                  <div className="col-md-5">
                    <div className="tpi">
                      <select
                        ref={this.myRef}
                        defaultValue="None"
                        style={{ width: 120 }}
                        onChange={(e) => {
                          e.target.value !== "none" &&
                            this.selectedAction(e.target.value);
                        }}
                      >
                        <option value="none">None</option>
                        {!this.state.isDashboardinfo && this.state.button.length > 0 &&
                          this.state.button.map((obj, oo_i) => (
                            obj.ui_type === "selectedAction" && (
                              <option key={oo_i} value={`${obj.value},${obj.webUrl}`}>
                                {obj.value}
                              </option>
                            )
                          ))}
                      </select>
                      {!this.state.isDashboardinfo && this.state.button.map(
                        (obj, oo_i) =>
                          obj.ui_type === "form_button" && (
                            <input
                              type="button"
                              className="csm_btn csm_btn_pri col-md-2 sub-btn"
                              key={oo_i}
                              onClick={(e) => this.callbtn(obj.name)}
                              value={obj.value}
                            ></input>
                          )
                      )}

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
                )}
              </div>
            )}
            {!this.state.isDashboardinfo && this.state.showlist === false && this.state.filString !== "" && (
              <div>{this.state.filString}</div>
            )}

            {!this.state.isDashboardinfo && this.state.showlist === true && (
              <div>
                <div className="d-flex mb-2">
                  <input
                    className=" btn btn-sm btn-primary m-0 py-1 ms-2 mt-2"
                    type="button"
                    value="Save Filter"
                    // disabled={rightReadOnly()}
                    onClick={this.saveFilter}
                  />

                  <input
                    className="btn btn-sm btn-primary m-0 py-1 ms-2 mt-2"
                    type="button"
                    value="Remove Filter"
                    // disabled={rightReadOnly()}
                    onClick={this.removeFilter}
                  />
                </div>
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
              </div>
            )}
            {this.state.list.length === 0 && <div>No Record Found</div>}
            {this.state.list.map((lstobj, lst_i) => (
              <div className="heading_top table_set over" key={lst_i}>
                <table className="table table-bordered table-striped table-hover p-1">
                  <thead>
                    <tr className="obj_name">
                      {lstobj.heading.map((obj, obj_i) => (
                        !this.state.isDashboardinfo ?
                          <th key={obj_i} className="vlpointer">
                            {obj_i === 0 ? (
                              <span>
                                <input
                                  type="checkbox"
                                  checked={obj.ref}
                                  onChange={(e) => {
                                    this.selectedAllRows(e.target.checked);
                                  }}
                                ></input>
                              </span>
                            ) : (
                              // !this.state.isDashboardinfo ?
                              <div onClick={(e) => this.showupdownbtn(obj.name)}>

                                {obj.label}
                                {this.state.sortColumn.name === obj.name &&
                                  this.state.sortColumn.sort === true && (
                                    <i className=" icpadding fa fa-arrow-up"></i>
                                  )}
                                {this.state.sortColumn.name === obj.name &&
                                  this.state.sortColumn.sort === false && (
                                    <i className=" icpadding fa fa-arrow-down"></i>
                                  )}
                              </div>
                            )}
                          </th>
                          :
                          <th key={obj_i} className="vlpointer">
                            {/* {console.log(obj_i)} */}
                            <div>
                              {obj.label}
                              {this.state.sortColumn.name === obj.name &&
                                this.state.sortColumn.sort === true && (
                                  <i className=" icpadding fa fa-arrow-up"></i>
                                )}
                              {this.state.sortColumn.name === obj.name &&
                                this.state.sortColumn.sort === false && (
                                  <i className=" icpadding fa fa-arrow-down"></i>
                                )}
                            </div>
                          </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="tbody" style={{ overflow: "auto" }}>
                    {lstobj.rcd.map((objj, objj_i) => (
                      <tr className="obj_value" key={objj_i}>
                        {objj.colr.map((objr, objr_i) => (
                          !this.state.isDashboardinfo ?
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
                              {/* && !this.state.isDashboardinfo */}
                              {objr_i === 0 ? (
                                <span>
                                  <input
                                    type="checkbox"
                                    checked={objr.ref}
                                    onChange={(e) => {
                                      this.selectedRows(e.target.checked, objj_i);
                                    }}
                                  ></input>
                                </span>
                              ) : (
                                <span>
                                  {" "}
                                  {objr.type === "filter" ||
                                    objr.type === "filter_ref" ||
                                    objr.name === "json"
                                    ? JSON.stringify(objr.value)
                                    : objr.type === "group_key_value"
                                      ? JSON.stringify(objr.value.properties)
                                      : objr.value}
                                </span>
                              )}
                            </td> : <td
                              key={objr_i}
                            // className={
                            //   objr.firstrecord === true
                            //     ? "val_pad val_under vlpointer"
                            //     : "val_pad"
                            // }
                            >
                              <span>
                                {" "}
                                {objr.type === "filter" ||
                                  objr.type === "filter_ref" ||
                                  objr.name === "json"
                                  ? JSON.stringify(objr.value)
                                  : objr.type === "group_key_value"
                                    ? JSON.stringify(objr.value.properties)
                                    : objr.value}
                              </span>
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
            <Modal
              show={this.state.modal}
              onHide={() => this.setModal(!this.state.modal)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm {this.state.btnNamee}</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.setModal(!this.state.modal)}
                  disabled={this.state.isClick}
                  style={{ backgroundColor: this.state.isClick ? "gray" : "" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => this.selectAction(this.state.url)}
                  disabled={this.state.isClick}
                  style={{ backgroundColor: this.state.isClick ? "gray" : "" }}
                >
                  {this.state.btnNamee}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
        <Modal
          dialogClassName="my-modal-personalized"
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

export default ListComponent;
