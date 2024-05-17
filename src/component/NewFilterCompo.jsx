import React, { Component } from "react";
import "../css/filtercompo.css";
import { Modal, Button } from "react-bootstrap";
import ModelList from "./model_list";
import axios from "axios";
import "../css/multi_insert.css";

class NewFilterCompo extends Component {
  state = {
    tm_list: [],
    filtarray: [],
    col_mn: [],
    int_fields: [],
    date_fields: [],
    email_fields: [],
    boln_fields: [],
    choice_fields: [],
    dtm_fields: [],
    str_fields: [],
    ref_fields: [],
    refUT_fields: [],
    booleanfld: [],
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
    showlist: false,
    filter_unset: false,
    filString: "",
    timeline: this.props.timeline,
    filter: this.props.filter,
    loca: this.props.loca,
    tabId: this.props.tabId,
    testcount: 0,
    cur_ref_name: "",
    cur_ref_type: "",
    cur_ref_index: 0,
    showmodel: true,
    columnid: "",
    userTable: "",
    col_index: 0,
    refrecord: {},
    col_depend: [],
    ref_filter: [],
    isMobile: this.props.isMobile,
    setScript: this.props.setScript,
    isScript: this.props.isScript,
    script: this.props.script,
    selectedScript: this.props.selectedScript,
    setFiltArray: this.props.setFiltArray,
  };

  constructor(props) {
    super(props);
    this.state.col_depend = props.col_depend;
    this.state.col_mn = props.col_mn;
    this.setTimeLine = this.setTimeLine.bind(this);
    this.changecolumn = this.changecolumn.bind(this);
    this.changemiddle = this.changemiddle.bind(this);
    this.changelast = this.changelast.bind(this);
    this.changelastref = this.changelastref.bind(this);
    this.addbtn = this.addbtn.bind(this);
    this.orbtn = this.orbtn.bind(this);
    this.cancelfilt = this.cancelfilt.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.filterset = this.filterset.bind(this);
    this.setRef = this.setRef.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.setcolumn = this.setcolumn.bind(this);
    this.formChangefn = this.formChangefn.bind(this);
    this.setRefrecord = this.setRefrecord.bind(this);
    this.changeDependentColumn = this.changeDependentColumn.bind(this);
    this.changeDependentRefColumn = this.changeDependentRefColumn.bind(this);
    this.setScript = this.setScript.bind(this);

    this.state.str_fields.push("");
    this.state.str_fields.push("is");
    this.state.str_fields.push("is not");
    this.state.str_fields.push("contains");
    this.state.str_fields.push("starts with");
    this.state.str_fields.push("ends with");
    this.state.int_fields.push("");
    this.state.int_fields.push(">");
    this.state.int_fields.push("=");
    this.state.int_fields.push("<");
    this.state.email_fields.push("");
    this.state.email_fields.push("is");
    this.state.email_fields.push("is not");
    this.state.email_fields.push("starts with");
    this.state.email_fields.push("contains");
    this.state.email_fields.push("ends with");
    this.state.boln_fields.push("");
    this.state.boln_fields.push("=");
    this.state.boln_fields.push("!=");
    this.state.date_fields.push("");
    this.state.date_fields.push(">");
    this.state.date_fields.push("=");
    this.state.date_fields.push("<");
    this.state.dtm_fields.push("");
    this.state.dtm_fields.push(">");
    this.state.dtm_fields.push("=");
    this.state.dtm_fields.push("<");
    this.state.choice_fields.push("");
    this.state.choice_fields.push("is");
    this.state.choice_fields.push("is not");
    this.state.choice_fields.push("starts with");
    this.state.choice_fields.push("contains");
    this.state.choice_fields.push("ends with");
    this.state.booleanfld.push("");
    this.state.booleanfld.push("true");
    this.state.booleanfld.push("false");
    this.state.ref_fields.push("");
    this.state.ref_fields.push("=");
    this.state.refUT_fields.push("");
    this.state.refUT_fields.push("=");
    this.state.refUT_fields.push("is me");
    this.state.refUT_fields.push("is dependent");
    if (!this.state.isScript) {
      this.state.tm_list.push({ name: "", label: "None" });
      this.state.tm_list.push({ name: "current24", label: "Current 24" });
      this.state.tm_list.push({ name: "previous24", label: "Previous 24" });
      this.state.tm_list.push({ name: "week", label: "Week" });
      this.state.tm_list.push({ name: "last14days", label: "Last 14 Days" });
      this.state.tm_list.push({ name: "last30", label: "Last 30" });
      this.state.tm_list.push({ name: "thismonth", label: "This Month" });
      this.state.tm_list.push({ name: "last6month", label: "Last 6 Month" });
      this.state.tm_list.push({ name: "last1year", label: "Last 1 Year" });
    }
    console.log(this.state.filt);
    this.state.filtarray.push(this.state.filt);
    this.state.ref_filter.push(this.state.filt);

    this.myRef = React.createRef();
  }


  componentDidMount() {
    var filt = this.state.filtarray;
    var col = this.state.col_mn;
    var ut = "";
    for (var f = 0; f < filt.length; f++) {
      if (filt[f].co !== "") {
        if (filt[f].ct === "reference" && filt[f].rf.value !== "") {
          for (var c = 0; c < col.length; c++) {
            if (filt[f].co === col[c].name) {
              ut = col[c].userTable;
            }
          }
        } else if (filt[f].ct === "multi_select" && filt[f].rf.value !== "") {
          for (var c = 0; c < col.length; c++) {
            if (filt[f].co === col[c].name) {
              ut = col[c].userTable;
            }
          }
        } else if (filt[f].ct === "reference" && filt[f].mc === "is me") {
          for (var c = 0; c < col.length; c++) {
            if (filt[f].co === col[c].name) {
              ut = col[c].userTable;
            }
          }
        }
      }
    }
    if (filt[0].cl !== "" && filt[0].cl !== "") {
      for (let i = 0; i < col.length; i++) {
        if (col[i].label === filt[0].cl) {
          this.setState({ columnid: col[i].id });
          break;
        }
      }
    }
    this.setState({ userTable: ut });
  }

  componentDidUpdate(props) {
    console.log(this.state.filtarray);
    if (props.col_mn !== this.state.col_mn) {
      this.setState({ col_mn: props.col_mn });
      var filt = this.state.filtarray;
      var col = this.state.col_mn;
      var ut = "";
      for (var f = 0; f < filt.length; f++) {
        if (filt[f].co !== "") {
          if (filt[f].ct === "reference" && filt[f].rf.value !== "") {
            for (var c = 0; c < col.length; c++) {
              if (filt[f].co === col[c].name) {
                ut = col[c].userTable;
              }
            }
          } else if (filt[f].ct === "multi_select" && filt[f].rf.value !== "") {
            for (var c = 0; c < col.length; c++) {
              if (filt[f].co === col[c].name) {
                ut = col[c].userTable;
              }
            }
          } else if (filt[f].ct === "reference" && filt[f].mc === "is me") {
            for (var c = 0; c < col.length; c++) {
              if (filt[f].co === col[c].name) {
                ut = col[c].userTable;
              }
            }
          }
        }
      }

      if (filt[0].cl !== "" && filt[0].cl !== null) {
        for (let i = 0; i < col.length; i++) {
          if (col[i].label === filt[0].cl) {
            this.setState({ columnid: col[i].id });
            break;
          }
        }
      }
      this.setState({ userTable: ut });
    }
  }

  static getDerivedStateFromProps(props, state) {
    var p_col = props?.col_mn?.length;
    var s_col = state?.col_mn?.length;
    var p_col_dep = props?.col_depend?.length;
    var s_col_dep = state?.col_depend?.length;

    if (props.showlist !== state.showlist) {
      var col = false;
      var col_dep = false;
      if (p_col !== s_col || p_col_dep !== s_col_dep) {
        col = true;
      } else if (s_col === 0) {
        col = true;
      } else if (s_col_dep === 0) {
        col_dep = true;
      }
      if (col) {
        return {
          showlist: props.showlist,
          col_mn: props.col_mn,
          filtarray: props.filtarray,
          col_depend: props.col_depend,
          isMobile: props.isMobile,
        };
      }
      if (col_dep) {
        return {
          showlist: props.showlist,
          filtarray: props.filtarray,
          col_depend: props.col_depend,
          isMobile: props.isMobile,
        };
      }
    } else {
      var upd = false;
      var upd_dep = false;
      if (p_col !== s_col || p_col_dep !== s_col_dep) {
        upd = true;
      } else if (s_col === 0) {
        upd = true;
      } else if (s_col_dep === 0) {
        upd_dep = true;
      }
      if (upd) {
        return {
          col_mn: props.col_mn,
          col_depend: props.col_depend,
          isMobile: props.isMobile,
        };
      }
      if (upd_dep) {
        return {
          col_depend: props.col_depend,
          isMobile: props.isMobile,
        };
      }
    }
    return null;
  }

  setScript(e) {
    this.setState({ setScript: e.target.value });
  }

  setTimeLine(e) {
    this.props.call_tm(e.target.value);
    this.setState({ timeline: e.target.value });
  }

  changecolumn(e, index) {
    const vl = e.target.value;
    var farray = this.state.filtarray;
    var col_id = "";
    var ut = "";
    for (var i = 0; i < this.state.col_mn.length; i++) {
      if (this.state.col_mn[i].name === vl) {
        farray[index].ct = this.state.col_mn[i].type;
        farray[index].cl = this.state.col_mn[i].label;
        farray[index].co = this.state.col_mn[i].name.toString();
        farray[index].mc = "";
        farray[index].an = "";
        farray[index].ch = [];
        ut = this.state.col_mn[i].userTable;
        col_id = this.state.col_mn[i].id;
        break;
      }
    }
    this.props.call_fil(farray, index, col_id);
    this.setState({ filtarray: farray, columnid: col_id, userTable: ut });
    // this.setState({ setFiltArray: farray });
  }

  changeDependentColumn(e, index) {
    var farray = this.state.filtarray;
    var col_id = "";
    for (var i = 0; i < this.state.col_mn.length; i++) {
      if (this.state.col_mn[i].name === e.target.value) {
        col_id = this.state.col_mn[i].id;
        break;
      }
    }
    if (e.target.value !== undefined) {
      farray[index].rf = { id: col_id, value: e.target.value.toString() };
    }
    this.setState({ filtarray: farray });
  }

  changeDependentRefColumn(e, index) {
    var farray = this.state.filtarray;
    var col_id = "";
    var col_lb = "";
    for (var i = 0; i < this.state.col_depend.length; i++) {
      if (this.state.col_depend[i].name === e.target.value) {
        col_id = this.state.col_depend[i].id;
        col_lb = this.state.col_depend[i].label;
        break;
      }
    }
    if (e.target.value !== undefined) {
      farray[index].dc = { id: col_id, value: e.target.value.toString(), label: col_lb };
    }
    this.setState({ filtarray: farray });
  }

  changemiddle(e, index) {
    var farray = this.state.filtarray;
    if (e.target.value !== undefined) {
      farray[index].mc = e.target.value.toString();
    }
    this.props.call_fil(farray, index, -1);
    this.setState({ filtarray: farray });
  }

  changelast(e, index, type) {
    var farray = this.state.filtarray;
    if (e.target.value !== undefined) {
      if (type === "int" && /^[0-9]*$/.test(e.target.value)) {
        farray[index].an = e.target.value.toString();
      } else if (type !== "int") {
        farray[index].an = e.target.value.toString();
      }
    }
    this.props.call_fil(farray, index, -1);
    this.setState({ filtarray: farray });
  }

  changelastref(e, index) {
    var farray = this.state.filtarray;
    var vl = farray[index].co;
    var col_id = "";
    for (var i = 0; i < this.state.col_mn.length; i++) {
      if (this.state.col_mn[i].name === vl) {
        col_id = this.state.col_mn[i].id;
        break;
      }
    }
    if (e.target.value !== undefined) {
      if (e.target.value.length > 2) {
        this.formChangefn(e.target.value, index, col_id, false);
      }
      farray[index].rf = { id: "", value: e.target.value.toString() };
    }
    this.setState({ filtarray: farray });
  }

  cancelfilt(i) {
    this.state.filtarray.splice(i, 1);
    if (this.state.filtarray.length === 0) {
      this.state.filtarray.push({
        co: "",
        cl: "",
        mc: "",
        an: "",
        af: "",
        rf: { id: "", value: "" },
        dc: { id: "", value: "", label: "" },
        ch: [],
      });
    }
    this.setState({ filtarray: this.state.filtarray });
  }

  // addbtn() {
  //   if (this.filterset()) {
  //     this.state.filtarray.push({
  //       co: "",
  //       cl: "",
  //       mc: "",
  //       an: "",
  //       ct: "",
  //       af: "AND",
  //       rf: { id: "", value: "" },
  //       dc: { id: "", value: "", label: "" },
  //       ch: [],
  //     });
  //     this.setState({ filtarray: this.state.filtarray, filter_unset: false });
  //   } else {
  //     this.setState({ filter_unset: true });
  //   }
  // }

  addbtn(ind) {
    // farray = this.state.filtarray
    if (this.filterset()) {
      this.state.filtarray.push({
        co: "",
        cl: "",
        mc: "",
        an: "",
        ct: "",
        af: "AND",
        rf: { id: "", value: "" },
        dc: { id: "", value: "", label: "" },
        ch: [],
      });
      this.props.call_fil(this.state.filtarray, ind, -1);
      this.setState({ filter_unset: false });
    } else {
      this.setState({ filter_unset: true });
    }
  }

  // orbtn() {
  //   if (this.filterset()) {
  //     this.state.filtarray.push({
  //       co: "",
  //       cl: "",
  //       mc: "",
  //       an: "",
  //       af: "OR",
  //       rf: { id: "", value: "" },
  //       dc: { id: "", value: "", label: "" },
  //       ch: [],
  //     });
  //     this.setState({ filtarray: this.state.filtarray, filter_unset: false });
  //   } else {
  //     this.setState({ filter_unset: true });
  //   }
  // }

  orbtn(ind) {
    if (this.filterset()) {
      this.state.filtarray.push({
        co: "",
        cl: "",
        mc: "",
        an: "",
        af: "OR",
        rf: { id: "", value: "" },
        dc: { id: "", value: "", label: "" },
        ch: [],
      });
      this.props.call_fil(this.state.filtarray, ind, -1);
      this.setState({ filter_unset: false });
    } else {
      this.setState({ filter_unset: true });  
    }
  }

  filterset() {
    for (var i = 0; i < this.state.filtarray.length; i++) {
      if (this.state.filtarray[i].ct === "") {
        return false;
      } else {
        if (
          this.state.filtarray[i].ct === "String" ||
          this.state.filtarray[i].ct === "int" ||
          this.state.filtarray[i].ct === "choice" ||
          this.state.filtarray[i].ct === "boolean" ||
          this.state.filtarray[i].ct === "date" ||
          this.state.filtarray[i].ct === "datetime" ||
          this.state.filtarray[i].ct === "filter" ||
          this.state.filtarray[i].ct === "json" ||
          this.state.filtarray[i].ct === "html" ||
          this.state.filtarray[i].ct === "email"
        ) {
          if (this.state.filtarray[i].an === "") {
            return false;
          }
        } else if (
          this.state.filtarray[i].ct === "reference" ||
          this.state.filtarray[i].ct === "depend_table"
        ) {
          if (this.state.filtarray[i].rf.value === "") {
            return false;
          }
        }
      }
    }
    return true
  }

  // filterset() {
  //   for (var i = 0; i < this.state.filtarray.length; i++) {
  //     if (this.state.filtarray[i].mc === "is me") {
  //       return true;
  //     } else {
  //       if (
  //         this.state.filtarray[i].ct === "String" ||
  //         this.state.filtarray[i].ct === "choice" ||
  //         this.state.filtarray[i].ct === "email"
  //       ) {
  //         return true;
  //       } else if (
  //         this.state.filtarray[i].ct === "int" ||
  //         this.state.filtarray[i].ct === "boolean"
  //       ) {
  //         if (this.state.filtarray[i].an === "") {
  //           return false;
  //         }
  //       } else if (this.state.filtarray[i].ct === "reference") {
  //         if (this.state.filtarray[i].rf.id === "") {
  //           return false;
  //         }
  //       }
  //     }
  //   }
  //   return true;
  // }

  setRef(val, r_id) {
    var farray = this.state.filtarray;
    var col_index = this.state.col_index;
    farray[col_index].rf = { id: r_id, value: val };
    this.setState({ filtarray: farray });
    this.handleClose();
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  setcolumn(index, e) {
    this.setState({
      showmodel: true,
      col_index: index,
    });
    this.handleShow();
  }

  async formChangefn(vl, index, id, vrf) {
    if (vl.length > 2) {
      if (vrf === true) {
        var farray = this.state.filtarray;
        farray[index].rf.value = vl;
        farray[index].rf.id = id;
        var rfrcd2 = this.state.refrecord;
        rfrcd2.record = [];
        this.setState({ filtarray: farray, refrecord: rfrcd2 });
      } else {
        var veri = '{"referenceRecord":[{"columnid":"' + id + '"},';
        veri += '{"tabvalue":"' + vl + '"}]}';
        var token = localStorage.getItem("token");
        var rff = [];
        axios
          .post(this.state.loca + "/loom/reference/record", veri.toString(), {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            },
          })
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
                var ref_rcd = refrencercd.referenceRecordList[2].records.length;
                if (ref_rcd >= 5) {
                  ref_rcd = 5;
                }
                for (var i = 0; i < ref_rcd; i++) {
                  rff.push(refrencercd.referenceRecordList[2].records[i]);
                }
              }
            }
            var rf = { index: index, record: rff };
            this.setState({ refrecord: rf });
          },
            (error) => {
              this.props.showErrorCompo();
              console.log(error);
            });
      }
    } else {
      var farray = this.state.filtarray;
      farray[index].rf.value = vl;
      farray[index].rf.id = id;
      this.setState({ refrecord: {} });
    }
  }

  setRefrecord(vl, index, id) {
    this.formChangefn(vl, index, id, true);
  }

  render() {
    let strlist =
      this.state.str_fields.length > 0 &&
      this.state.str_fields.map((item, st_i) => {
        return (
          <option key={st_i} value={item.value}>
            {item}
          </option>
        );
      }, this);
    let intlist =
      this.state.int_fields.length > 0 &&
      this.state.int_fields.map((item, i_i) => {
        return (
          <option key={i_i} value={item.value}>
            {item}
          </option>
        );
      }, this);
    let bolnlist =
      this.state.boln_fields.length > 0 &&
      this.state.boln_fields.map((item, b_i) => {
        return (
          <option key={b_i} value={item.value}>
            {item}
          </option>
        );
      }, this);

    let reflist =
      this.state.ref_fields.length > 0 &&
      this.state.ref_fields.map((item, ref_i) => {
        return (
          <option key={ref_i} value={item.value}>
            {item}
          </option>
        );
      }, this);

    let reflist_UT =
      this.state.refUT_fields.length > 0 &&
      this.state.refUT_fields.map((item, ref_i) => {
        return (
          <option key={ref_i} value={item.value}>
            {item}
          </option>
        );
      }, this);

    let datelist =
      this.state.date_fields.length > 0 &&
      this.state.date_fields.map((item, dt_i) => {
        return (
          <option key={dt_i} value={item.value}>
            {item}
          </option>
        );
      }, this);

    let emailist =
      this.state.email_fields.length > 0 &&
      this.state.email_fields.map((item, eml_i) => {
        return (
          <option key={eml_i} value={item.value}>
            {item}
          </option>
        );
      }, this);

    let choicelist =
      this.state.choice_fields.length > 0 &&
      this.state.choice_fields.map((item, eml_i) => {
        return (
          <option key={eml_i} value={item.value}>
            {item}
          </option>
        );
      }, this);

    let dtmlist =
      this.state.dtm_fields.length > 0 &&
      this.state.dtm_fields.map((item, eml_i) => {
        return (
          <option key={eml_i} value={item.value}>
            {item}
          </option>
        );
      }, this);

    let booleanfd =
      this.state.booleanfld.length > 0 &&
      this.state.booleanfld.map((item, bf_i) => {
        return (
          <option key={bf_i} value={item.value}>
            {item}
          </option>
        );
      }, this);

    return (
      <div className="fil_txt clr">
        {this.state.showlist === false && this.state.filString !== "" && (
          <div>{this.state.filString}</div>
        )}
        {this.state.showlist === true && (
          <div className={this.state.isMobile ? "scrl" : ""}>
            {this.state.isScript ? (
              <div className="row ">
                <div className="col-md-2 mb-2">Script :</div>
                <div className="col-md-2 mb-2">
                  <select
                    className="inpt_typefil inpu_rad"
                    type="text"
                    onChange={(e) => this.setScript(e)}
                    value={this.state.setScript}
                  >
                    <option value={""}>None</option>
                    {this.state.script.map((tm, tm_o) => (
                      <option value={tm.name} key={tm_o}>
                        {tm.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="disfl" style={{marginTop:"3px"}}>
                <div className="pdrt10 pdlf10 pdtp5">Time Line :</div>
                <div className="fntSz15">
                  <select
                    className="inpt_typefil inpu_rad"
                    type="text"
                    onChange={(e) => this.setTimeLine(e)}
                    value={this.state.timeline}
                  >
                    {this.state.tm_list.map((tm, tm_o) => (
                      <option value={tm.name} key={tm_o}>
                        {tm.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {this.state.filter_unset && (
              <div className="alert alert-danger"
                style={{ color: "black", marginTop: "2px" }}>
                {" "}
                Please set previous filter before adding a new filter
              </div>
            )}
            {this.state.filtarray.length > 0 && this.state.filtarray.map((abc, index) => (
              <div key={index}>
                {this.state.isMobile ? (
                  <div className="disfl martop " key={index}>
                    {abc.af === "AND" && this.state.filtarray.length > 1 && (
                      <div className="pdrt10">
                        <span className="addandcancel"> And </span>
                      </div>
                    )}
                    {abc.af === "OR" && this.state.filtarray.length > 1 && (
                      <div className="pdrt10">
                        <span className="addandcancel"> OR </span>
                      </div>
                    )}
                    <div className="pdrt10">
                      <select
                        className=" selct_optfil "
                        onChange={(e) => this.changecolumn(e, index)}
                        value={abc.co}
                      >
                        {this.state.col_mn.map((clm, cl_o) => (
                          <option value={clm.name} key={cl_o}>
                            {clm.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="pdrt10">
                      <div>
                        <select
                          className=" selct_optfil"
                          onChange={(e) => this.changemiddle(e, index)}
                          value={abc.mc}
                        >
                          {abc.ct === "String" ? strlist : null},
                          {abc.ct === "int" ? intlist : null},
                          {abc.ct === "boolean" ? bolnlist : null},
                          {abc.ct === "reference" &&
                            this.state.userTable === "false"
                            ? reflist
                            : null},
                          {abc.ct === "reference" &&
                            this.state.userTable === "true"
                            ? reflist_UT
                            : null},
                             {abc.ct === "multi_select" &&
                            this.state.userTable === "true"
                            ? reflist_UT
                            : null},
                          {abc.ct === "date" ? datelist : null},
                          {abc.ct === "datetime" ? dtmlist : null},
                          {abc.ct === "email" ? emailist : null},
                          {abc.ct === "choice" ? choicelist : null},
                        </select>
                      </div>
                    </div>
                    <div className="pdrt10">
                      <div>
                        {abc.ct === "String" ? (
                          <input
                            className="inpt_typefil inpu_rad"
                            type="text"
                            placeholder="value"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          ></input>
                        ) : null}
                        {abc.ct === "int" ? (
                          <input
                            className="inpt_typefil inpu_rad"
                            type="text"
                            placeholder="value"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          ></input>
                        ) : null}
                        {abc.ct === "date" ? (
                          <input
                            className="inpt_typefil inpu_rad"
                            type="date"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          ></input>
                        ) : null}
                        {abc.ct === "boolean" ? (
                          <select
                            className="inpt_typefil inpu_rad"
                            type="text"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          >
                            {abc.ct === "boolean" ? booleanfd : null},
                          </select>
                        ) : null}
                        {abc.ct === "email" ? (
                          <input
                            className="inpt_typefil inpu_rad"
                            type="text"
                            placeholder="value"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          ></input>
                        ) : null}
                        {abc.ct === "choice" ? (
                          <select
                            className="selct_optfil"
                            // type="text"
                            // placeholder="type"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          >
                            {abc.ch.length > 0 &&
                              abc.ch.map((ch, ind) => (
                                <option key={ind} value={ch.name}>
                                  {ch.name}
                                </option>
                              ))}
                          </select>
                        ) : null}
                        {abc.ct === "datetime" ? (
                          <input
                            className="inpt_typefil"
                            type="datetime-local"
                            step="1"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          ></input>
                        ) : null}
                        {abc.ct === "reference" && abc.mc === "is dependent" || abc.ct === "multi_select" && abc.mc === "is dependent" ? (
                          <div>
                            <div style={{ display: "flex" }}>
                              <select
                                className="selct_optfil"
                                onChange={(e) =>
                                  this.changeDependentColumn(e, index)
                                }
                                value={abc.rf.value}
                              >
                                {this.state.col_mn.map((clm, cl_o) => (
                                  <option value={clm.name} key={cl_o}>
                                    {clm.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ) : null}
                        {abc.ct === "reference" &&
                          abc.mc !== "is me" &&
                          abc.mc !== "is dependent" ? (
                          <div>
                            <div style={{ display: "flex" }}>
                              <input
                                className="inpt_typefil_ref"
                                type="text"
                                placeholder="value"
                                value={abc.rf.value}
                                onChange={(e) => this.changelastref(e, index)}
                              ></input>
                              <div className="">
                                <i
                                  className="btnsrc_fil vlpointer fa fa-search"
                                  onClick={(e) => this.setcolumn(index, abc.id)}
                                ></i>
                              </div>
                            </div>
                            {this.state.refrecord.index === index &&
                              this.state.refrecord.record.length > 0 && (
                                <div className="ref_multircd">
                                  {this.state.refrecord.record.map(
                                    (obj_ref, or_i) => (
                                      <div
                                        onClick={(e) =>
                                          this.setRefrecord(
                                            obj_ref.value,
                                            index,
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
                        ) : null}
                      </div>
                    </div>

                    <div className="selct_optfil" style={{ display: "flex" }}>
                      {abc.ct === "reference" && abc.mc === "is dependent" || abc.ct === "multi_select" && abc.mc === "is dependent" ? (
                        <div>
                          <div style={{ display: "flex" }}>
                            <span>Dependent on:</span>
                            <div style={{ paddingLeft: "5px" }}>
                              <select
                                className="selct_optfil"
                                onChange={(e) =>
                                  this.changeDependentRefColumn(e, index)
                                }
                                value={abc.dc.value}
                              >
                                {this.state.col_depend.map((clm, cl_o) => (
                                  <option value={clm.name} key={cl_o}>
                                    {clm.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="pdrt10"></div>
                    <div className="inpt_typefil" style={{ display: "flex" }}>
                      <div className="cancelbtn">
                        <i
                          className="fa fa-times"
                          aria-hidden="true"
                          onClick={(e) => this.cancelfilt(index)}
                        ></i>
                      </div>
                      <div
                        className="padbtnnn"
                        style={{ display: "flex", height: "fit-content" }}
                      >
                        <button
                          type="button"
                          className=" csm_btn csm_btn_pri col-md-1 sub-btn"
                          onClick={() => this.addbtn(index)}
                        >
                          AND
                        </button>
                        <button
                          type="button"
                          className="csm_btn csm_btn_pri col-md-1 sub-btn"
                          onClick={() => this.orbtn(index)}
                        >
                          OR
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="disfl martop " key={index} style={{ marginBottom: "5px" }}>
                    {abc.af === "AND" && this.state.filtarray.length > 1 && (
                      <div className="pdrt10 ">
                        <span className="addandcancel"> And </span>
                      </div>
                    )}
                    {abc.af === "OR" && this.state.filtarray.length > 1 && (
                      <div className="pdrt10 ">
                        <span className="addandcancel"> OR </span>
                      </div>
                    )}
                    <div className="pdlf10 pdrt10 ">
                      <select
                        className=" selct_optfil "
                        onChange={(e) => this.changecolumn(e, index)}
                        value={abc.co}
                      >
                        {this.state.col_mn.map((clm, cl_o) => (
                          <option value={clm.name} key={cl_o}>
                            {clm.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className=" pdrt10">
                      <div>
                        <select
                          className=" mid_optfil"
                          onChange={(e) => this.changemiddle(e, index)}
                          value={abc.mc}
                        >
                          {abc.ct === "String" ? strlist : null},
                          {abc.ct === "int" ? intlist : null},
                          {abc.ct === "boolean" ? bolnlist : null},
                          {abc.ct === "reference" &&
                            this.state.userTable === "false"
                            ? reflist
                            : null}
                          {abc.ct === "reference" &&
                            this.state.userTable === "true"
                            ? reflist_UT
                            : null}
                             {abc.ct === "multi_select" &&
                            this.state.userTable === "true"
                            ? reflist_UT
                            : null}
                          ,{abc.ct === "date" ? datelist : null},
                          {abc.ct === "datetime" ? dtmlist : null},
                          {abc.ct === "email" ? emailist : null},
                          {abc.ct === "choice" ? choicelist : null},
                        </select>
                      </div>
                    </div>
                    <div className="pdrt10">
                      <div>
                        {abc.ct === "String" ? (
                          <input
                            className="inpt_typefil inpu_rad"
                            type="text"
                            placeholder="value"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          ></input>
                        ) : null}
                        {abc.ct === "int" ? (
                          <input
                            className="inpt_typefil inpu_rad"
                            type="text"
                            placeholder="value"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          ></input>
                        ) : null}
                        {abc.ct === "date" ? (
                          <input
                            className="inpt_typefil inpu_rad"
                            type="date"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          ></input>
                        ) : null}
                        {abc.ct === "boolean" ? (
                          <select
                            className="inpt_typefil inpu_rad"
                            type="text"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          >
                            {abc.ct === "boolean" ? booleanfd : null},
                          </select>
                        ) : null}
                        {abc.ct === "email" ? (
                          <input
                            className="inpt_typefil inpu_rad"
                            type="text"
                            placeholder="type"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          ></input>
                        ) : null}
                        {abc.ct === "choice" ? (
                          <select
                            className="inpt_typefil inpu_rad"
                            // type="text"
                            // placeholder="type"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          >
                            {abc.ch.length > 0 &&
                              abc.ch.map((ch, ind) => (
                                <option key={ind} value={ch.name}>
                                  {ch.value}
                                </option>
                              ))}
                          </select>
                        ) : null}
                        {abc.ct === "datetime" ? (
                          <input
                            className="inpt_typefil"
                            type="datetime-local"
                            step="1"
                            value={abc.an}
                            onChange={(e) => this.changelast(e, index, abc.ct)}
                          ></input>
                        ) : null}
                        {abc.ct === "reference" && abc.mc === "is dependent" || abc.ct === "multi_select" && abc.mc === "is dependent" ? (
                          <div>
                            <div style={{ display: "flex" }}>
                              <select
                                className="selct_optfil"
                                onChange={(e) =>
                                  this.changeDependentColumn(e, index)
                                }
                                value={abc.rf.value}
                              >
                                {this.state.col_mn.map((clm, cl_o) => (
                                  <option value={clm.name} key={cl_o}>
                                    {clm.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ) : null}
                        {abc.ct === "reference" &&
                          abc.mc !== "is me" &&
                          abc.mc !== "is dependent" ? (
                          <div>
                            <div style={{ display: "flex" }}>
                              <input
                                className="inpt_typefil_ref"
                                type="text"
                                placeholder="value"
                                value={abc.rf.value}
                                onChange={(e) => this.changelastref(e, index)}
                              ></input>
                              <div className="">
                                <i
                                  className="btnsrc_fil vlpointer fa fa-search"
                                  onClick={(e) => this.setcolumn(index, abc.id)}
                                ></i>
                              </div>
                            </div>
                            {this.state.refrecord.index === index &&
                              this.state.refrecord.record.length > 0 && (
                                <div className="ref_multircd">
                                  {console.log(this.state.refrecord.record)}
                                  {this.state.refrecord.record.map(
                                    (obj_ref, or_i) => (
                                      <div
                                        onClick={(e) =>
                                          this.setRefrecord(
                                            obj_ref.value,
                                            index,
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
                        ) : null}
                      </div>
                    </div>

                    <div className="pdrt10" style={{ display: "flex" }}>
                      {abc.ct === "reference" && abc.mc === "is dependent" ||  abc.ct === "multi_select" && abc.mc === "is dependent"? (
                        <div>
                          <div style={{ display: "flex" }}>
                            <span>Dependent on:</span>
                            <div style={{ paddingLeft: "5px" }}>
                              <select
                                className="selct_optfil"
                                onChange={(e) =>
                                  this.changeDependentRefColumn(e, index)
                                }
                                value={abc.dc.value}
                              >
                                {this.state.col_depend.map((clm, cl_o) => (
                                  <option value={clm.name} key={cl_o}>
                                    {clm.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className=" pdrt10 "></div>

                    <div className="pdrt10" style={{ display: "flex" }}>
                      {/* <div className="col-md-2 "> */}
                      <div
                        className="padbtnnn"
                        style={{ display: "flex", height: "fit-content" }}
                      >
                        <div className="cancelbtn">
                          <i
                            className="fa fa-times"
                            aria-hidden="true"
                            onClick={(e) => this.cancelfilt(index)}
                            style={{ marginRight: "5px" }}
                          ></i>
                        </div>
                        <button
                          type="button"
                          // className=" csm_btn csm_btn_pri col-md-1 sub-btn"
                          className="btnnn-sm btn btn-primary btn-sm"
                          onClick={() => this.addbtn(index)}
                        >
                          AND
                        </button>
                        <button
                          type="button"
                          // className="csm_btn csm_btn_pri col-md-1 sub-btn"
                          className="btnnn-sm btn btn-primary btn-sm"
                          onClick={() => this.orbtn(index)}
                        >
                          OR
                        </button>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
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
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModelList
              setRef={(val, r_id) => this.setRef(val, r_id)}
              columnid={this.state.columnid}
              tabId={this.state.tabId}
              loca={this.state.loca}
              colBoolean={true}
              ref_filt={this.state.ref_filter}
              isMobile={this.state.isMobile}
              isVar={false}
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

export default NewFilterCompo;
