import axios from "axios";
import React, { Component } from "react";
import FormComponentMP from "./form_componentMP";
import MultiInsertMT from "./multiInsertMT";
import WorkInProgress from "./work_in_progress";

class MultiTableRelation extends Component {
  state = {
    name: "",
    first_record: {},
    multi_record: {},
    loading: false,
    state_mt: 0,
    // multiT_rcd: [],
    record: "",
    button: "",
    mainrecord: "",
    tabname: this.props.tabname,
    page_error: false,
    error: "",
    page_message: false,
    message: "",
    insertedRecord: [],
    tab_obj: [],
    tab_fill: [],
    errorlist: [],
    state_nxt: 0,
    child_table: "",
    loca: this.props.loca,
    isMobile: this.props.isMobile,
  };

  constructor(props) {
    super(props);
    this.state.name = props.mt_name;
    this.callbtn = this.callbtn.bind(this);
    this.callbtnMI = this.callbtnMI.bind(this);
    this.validationMI = this.validationMI.bind(this);
    this.fieldverify = this.fieldverify.bind(this);
    this.callNextPage = this.callNextPage.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(this.state.loca + "/loom/get/multipage/" + this.state.name, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        const mprecord = resp.data;
        console.log(mprecord);
        if (mprecord !== "") {
          if ("Error" in mprecord) {
            this.setState({
              loading: false,
              page_error: true,
              error: mprecord.Error,
            });
          } else {
            this.setState({
              loading: false,
              first_record: mprecord,
              state_mt: 1,
              record: mprecord.formRecord[2].record,
              mainrecord: mprecord,
              button: mprecord.formRecord[3].button,
            });
          }
        }
      },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        });
  }

  callbtn(nam) {
    var btn = this.state.button;
    var mnrecord = this.state.mainrecord;
    var rcd = this.state.record;
    var mandatory = [];
    var unverified = [];

    for (var i = 0; i < rcd.length; i++) {
      if (rcd[i].uivalid.visible === "true") {
        if (rcd[i].uivalid.mandatory === "true") {
          if (rcd[i].value === "") {
            mandatory.push(rcd[i].name);
          }
        }
        if (
          rcd[i].type === "String" ||
          rcd[i].type === "int" ||
          rcd[i].type === "email" ||
          rcd[i].type === "date"
        ) {
          var veri = this.fieldverify(rcd[i].type, rcd[i].value);
          if (veri === "unverified") {
            unverified.push(rcd[i].name);
          }
        }
      }
    }
    var btntype = "";
    var foundbtn = false;

    for (var ij = 0; ij < btn.length; ij++) {
      if (btn[ij].name === nam) {
        btntype = btn[ij].returnWebLocation;
        foundbtn = true;
        break;
      }
    }
    if (foundbtn === true && btntype !== "") {
      if (mandatory.length === 0 && unverified.length === 0) {
        this.setState({
          page_error: false,
          error: "",
          loading: true,
          page_message: false,
          message: "",
          state_nxt: 0,
        });
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
            console.log(rcd);
            if (rcd !== "") {
              if ("Error" in rcd) {
                this.setState({
                  loading: false,
                  page_error: true,
                  error: rcd.Error,
                });
              } else {
                var arr = this.state.insertedRecord;
                var tab_arr = this.state.tab_obj;
                // var fill_arr = this.state.tab_fill;
                arr.push(rcd.formRecordList[10].firstRecord);
                tab_arr.push(
                  rcd.formRecordList[10].firstRecord.formRecord[1].table
                );

                this.setState({
                  multi_record: rcd,
                  loading: false,
                  tab_obj: tab_arr,
                  child_table: rcd.formRecordList[1].table.value,
                  insertedRecord: arr,
                  state_mt: 2,
                  button: rcd.formRecordList[8].button,
                  mainrecord: rcd,
                  state_nxt: 1,
                });

                // if (btntype === "NextPage") {
                //   var nextP = rcd.formRecord[3].button.nextPage;
                //   if (nextP === "List") {
                //     this.callNextPage();
                //   }
                // }
              }
            }
          },
            (error) => {
              this.props.showErrorCompo();
              console.log(error);
            });
      } else {
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
    }
  }

  callbtnMI(nam, rec) {
    this.setState({ record: rec });
    var btn = this.state.button;
    var json = this.state.mainrecord;
    var mnrecord = this.state.mainrecord.formRecordList[2].records;
    var rcd = rec;
    var blankcount = 0;
    for (var i = 0; i < rcd.length; i++) {
      for (var k = 0; k < rcd[i].record.length; k++) {
        this.validationMI(
          rcd[i].record[k].value,
          i,
          k,
          rcd[i].record[k].name,
          rcd[i].record[k].type,
          rcd
        );
        if (rcd[i].record[k].value === "") {
          rcd[i].record[k].blank = true;
          blankcount++;
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
            // mnrecord.formRecord[2].record = this.state.record;
            axios
              .post(this.state.loca + btn[ij].webUrl, json, {
                headers: {
                  "Content-Type": "application/json",
                  authorization: "Bearer " + token,
                },
              })
              .then((resp) => {
                const refrencercd = resp.data;
                console.log(refrencercd);
                if (refrencercd !== "") {
                  if ("Error" in refrencercd) {
                    this.setState({
                      loading: false,
                      page_error: true,
                      error: refrencercd.Error,
                    });
                  } else if ("Message" in refrencercd) {
                    // this.setState({ loading: false });
                    var msg = refrencercd.Message;
                    if (msg !== "") {
                      this.setState({
                        page_message: true,
                        message: msg,
                        loading: false,
                      });
                      var rcd = this.state.insertedRecord;
                      var tab = rcd[0].formRecord[1].table.value;
                      this.props.showListCompo(tab, "", "");
                    }
                  } else {
                    var nxt_rcd = this.state.insertedRecord;
                    var tabname = this.state.tab_obj;
                    nxt_rcd.push(refrencercd.formRecordList[10].nextRecord);
                    tabname.push(
                      refrencercd.formRecordList[10].nextRecord
                        .formRecordList[1].table
                    );
                    this.setState({
                      multi_record: refrencercd,
                      loading: false,
                      child_table: refrencercd.formRecordList[1].table.value,
                      state_nxt: 1,
                      tab_obj: tabname,
                      state_mt:
                        refrencercd.formRecordList[9].multiPage.mtr
                          .relationOrder,
                      insertedRecord: nxt_rcd,
                      button: refrencercd.formRecordList[8].button,
                      mainrecord: refrencercd,
                    });
                  }
                }
              });
          } else {
          }
        }
      }
    }
  }

  validationMI(vl, index, i, ob, type, formrecord) {
    // var formrecord = this.state.record;
    if (type === "reference") {
      if (formrecord[index].record[i].noref === "false") {
        formrecord[index].record[i].verified = "verified";
      } else if (formrecord[index].record[i].noref === "true") {
        if (vl !== "") {
          if (formrecord[index].record[i].clicked === true) {
            formrecord[index].record[i].verified = "verified";
          } else {
            // var token = localStorage.getItem("token");
            // var veri = '{"referenceRecord":[{"columnid":"' + i + '"},';
            // veri += '{"tabvalue":"' + vl + '"}]}';
            // axios
            //   .post(
            //     this.state.loca + "/loom/reference/verify",
            //     veri.toString(),
            //     {
            //       headers: {
            //         "Content-Type": "application/json",
            //         authorization: "Bearer " + token,
            //       },
            //     }
            //   )
            //   .then((resp) => {
            //     const refrencercd = resp.data;
            //     if ("Error" in refrencercd) {
            //       this.setState({
            //         loading: false,
            //         page_error: true,
            //         error: refrencercd.Error,
            //       });
            //     } else {
            //       if (refrencercd.Result === "Unverified") {
            //         formrecord[index].record[i].verified = "unverified";
            //         this.setState({ record: formrecord });
            //       } else {
            //         formrecord[index].record[i].verified = "verified";
            //         var rfrcd = this.state.refrecord;
            //         rfrcd.record = [];
            //         this.setState({ record: formrecord, refrecord: rfrcd });
            //       }
            //       this.setState({ record: formrecord });
            //       return;
            //     }
            //   });
          }
        } else {
          formrecord[index].record[i].verified = "initial";
          this.setState({ record: formrecord });
        }
      }
    } else {
      var err = this.state.page_error;
      var nam = formrecord[index].record[i].name;
      var errorlist = this.state.errorlist;
      if (nam === ob) {
        var lab = formrecord[index].record[i].label;
        if (vl !== "") {
          var vari = this.fieldverify(formrecord[index].record[i].type, vl);
          if (vari === "verified" && errorlist.length === 0) {
            err = false;
          } else if (vari === "verified" && errorlist.length > 0) {
            if (errorlist.length === 1) {
              if (errorlist[0].name === nam) {
                if (errorlist[0].count.length === 1) {
                  if (
                    errorlist[0].count[0].index === index &&
                    errorlist[0].count[0].i === i
                  ) {
                    errorlist.pop();
                    err = false;
                  }
                } else if (errorlist[0].count.length > 1) {
                  for (var bb = 0; bb < errorlist[0].count.length; bb++) {
                    if (
                      errorlist[0].count[bb].index === index &&
                      errorlist[0].count[bb].i === i
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
                      errorlist[cc].count[0].index === index &&
                      errorlist[cc].count[0].i === i
                    ) {
                      errorlist.splice(cc, 1);
                      err = true;
                    }
                  } else if (errorlist[cc].count.length > 1) {
                    for (var cb = 0; cb < errorlist[cc].count.length; cb++) {
                      if (
                        errorlist[cc].count[cb].index === index &&
                        errorlist[cc].count[cb].i === i
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
                count: [{ index: index, i: i }],
              });
            }
            err = true;
          } else if (vari === "unverified" && errorlist.length > 0) {
            if (errorlist.length === 1) {
              if (errorlist[0].name === nam) {
                if (errorlist[0].count.length === 1) {
                  if (
                    errorlist[0].count[0].index === index &&
                    errorlist[0].count[0].i === i
                  ) {
                    err = true;
                  } else if (
                    errorlist[0].count[0].index !== index ||
                    errorlist[0].count[0].i !== i
                  ) {
                    errorlist[0].count.push({ index: index, i: i });
                    err = true;
                  }
                } else if (errorlist[0].count.length > 1) {
                  var incount = 0;
                  for (var ii = 0; ii < errorlist[0].count.length; ii++) {
                    if (
                      errorlist[0].count[ii].index === index &&
                      errorlist[0].count[ii].i === i
                    ) {
                      err = true;
                    } else if (
                      errorlist[0].count[ii].index !== index &&
                      errorlist[0].count[ii].i !== i
                    ) {
                      incount++;
                    }
                  }
                  if (incount === errorlist[0].count.length) {
                    errorlist[0].count.push({ index: index, i: i });
                    err = true;
                  }
                }
              } else {
                errorlist.push({
                  name: nam,
                  label: lab,
                  count: [{ index: index, i: i }],
                });
                err = true;
              }
            } else if (errorlist.length > 1) {
              var errcount = 0;
              for (var kk = 0; kk < errorlist.length; kk++) {
                if (errorlist[kk].name === nam) {
                  if (errorlist[kk].count.length === 1) {
                    if (
                      errorlist[kk].count[0].index === index &&
                      errorlist[kk].count[0].i === i
                    ) {
                      err = true;
                    } else if (
                      errorlist[kk].count[0].index !== index ||
                      errorlist[kk].count[0].i !== i
                    ) {
                      errorlist[kk].count.push({ index: index, i: i });
                      err = true;
                    }
                  } else if (errorlist[kk].count.length > 1) {
                    var incount2 = 0;
                    for (var iid = 0; iid < errorlist[kk].count.length; iid++) {
                      if (
                        errorlist[kk].count[iid].index === index &&
                        errorlist[kk].count[iid].i === i
                      ) {
                        err = true;
                      } else if (
                        errorlist[kk].count[iid].index !== index ||
                        errorlist[kk].count[iid].i !== i
                      ) {
                        incount2++;
                      }
                    }
                    if (incount2 === errorlist[kk].count.length) {
                      errorlist[kk].count.push({ index: index, i: i });
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
                  count: [{ index: index, i: i }],
                });
                err = true;
              }
            }
          }
          formrecord[index].record[i].verified = vari;
        } else {
          if (errorlist.length === 1) {
            if (errorlist[0].name === nam) {
              if (errorlist[0].count.length === 1) {
                if (
                  errorlist[0].count[0].index === index &&
                  errorlist[0].count[0].i === i
                ) {
                  errorlist.pop();
                  err = false;
                }
              } else if (errorlist[0].count.length > 1) {
                for (var bbd = 0; bbd < errorlist[0].count.length; bbd++) {
                  if (
                    errorlist[0].count[bbd].index === index &&
                    errorlist[0].count[bbd].i === i
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
                    errorlist[ccd].count[0].index === index &&
                    errorlist[ccd].count[0].i === i
                  ) {
                    errorlist.splice(ccd, 1);
                  }
                } else if (errorlist[ccd].count.length > 1) {
                  for (var cf = 0; cf < errorlist[ccd].count.length; cf++) {
                    if (
                      errorlist[ccd].count[cf].index === index &&
                      errorlist[ccd].count[cf].i === i
                    ) {
                      errorlist[ccd].count.splice(cf, 1);
                      err = true;
                    }
                  }
                }
              }
            }
          }
          formrecord[index].record[i].verified = "initial";
        }
      }

      this.setState({
        record: formrecord,
        page_error: err,
        errorlist: errorlist,
      });
    }
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
  }

  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div>
            {this.state.page_error === true && (
              <div
                className="alert alert-danger form_alt"
                role="alert"
              >
                {this.state.error}
              </div>
            )}
            {this.state.page_message === true && (
              <div
                className="alert alert-success form_alt"
                role="alert"
              >
                {this.state.message}
              </div>
            )}
            {this.state.state_mt === 1 && (
              <div>
                <FormComponentMP
                  first_record={this.state.first_record}
                  callbtn={(nam) => this.callbtn(nam)}
                  loca={this.state.loca}
                  isMobile={this.state.isMobile}
                ></FormComponentMP>
              </div>
            )}
            {this.state.state_mt > 1 && this.state.state_nxt === 1 && (
              <div>
                <MultiInsertMT
                  multi_record={this.state.multi_record}
                  callbtn={(nam, rec) => this.callbtnMI(nam, rec)}
                  tableObj={this.state.tab_obj}
                  insertedRecord={this.state.insertedRecord}
                  state_mt={this.state.state_mt}
                  child_table={this.state.child_table}
                  loca={this.state.loca}
                  isMobile={this.state.isMobile}

                // multiT_rcd={this.state.multiT_rcd}
                ></MultiInsertMT>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MultiTableRelation;
