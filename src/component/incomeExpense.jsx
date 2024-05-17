import React, { Component } from "react";
import axios from "axios";
import "../css/listcompo.css";
import NewFilterCompo from "./NewFilterCompo";

class IncomeExpense extends Component {
  state = {
    loca: this.props.loca,
    loading: false,
    page_error: false,
    eror: "",
    page_message: false,
    message: "",
    record: [],
    income: {},
    expense: {},
    totalIncome: "",
    totalExpense: "",
    showlist: false,
    showFillIncome: false,
    showFillExpense: false,
    showbtn: false,
    filtarray: [],
    filtarrayIncome: [],
    filtarrayExp: [],
    timeline: "",
    incomeTimeLine: "",
    expenseTimeLine: "",
    col_mn: [
      { label: "None", name: "none" },
      {
        id: "101",
        label: "Date",
        name: "created",
        type: "datetime",
        userTable: "false",
      },
    ],
    col_mn_inc: [],
    col_mn_exp: [],
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
    filtIcome: {
      co: "",
      cl: "",
      mc: "",
      an: "",
      ct: "",
      af: "",
      rf: { id: "", value: "" },
      dc: { id: "", value: "", label: "" },
      ch: [],
      fi: "",
    },
    filtExp: {
      co: "",
      cl: "",
      mc: "",
      an: "",
      ct: "",
      af: "",
      rf: { id: "", value: "" },
      dc: { id: "", value: "", label: "" },
      ch: [],
      fe: "",
    },
    column_depend: [],
  };

  constructor(props) {
    super(props);
    this.setOpen = this.setOpen.bind(this);
    this.callform = this.callform.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.callfilter = this.callfilter.bind(this);
    this.calltimeline = this.calltimeline.bind(this);
    this.filtersubmit = this.filtersubmit.bind(this);
    this.callIncomeExp = this.callIncomeExp.bind(this);
    this.filterItemIncome = this.filterItemIncome.bind(this);
    this.filterItemExpense = this.filterItemExpense.bind(this);
 
    this.state.filtarray.push(JSON.parse(JSON.stringify(this.state.filt)));
    this.state.filtarrayIncome.push(JSON.parse(JSON.stringify(this.state.filtIcome)));
   
    this.state.filtarrayExp.push(JSON.parse(JSON.stringify(this.state.filtExp)));
  }
  async callfilter(filtarray, in_index, col_id, filtType) {
    console.log("callfilter");
    if (filtType === "income") filtarray = this.state.filtarrayIncome;
    else if (filtType === "expense") filtarray = this.state.filtarrayExp;
    else if (filtType === "main") filtarray = this.state.filtarray;
    if (col_id !== -1) {
      if (
        filtarray[in_index]?.ct === "choice" &&
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
    if (filtType === "income")
      this.setState({
        filtarrayIncome: filtarray,
      });
    else if (filtType === "expense")
      this.setState({
        filtarrayExp: filtarray,
      });
    else if (filtType === "main")
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
  componentDidMount() {
    var token = localStorage.getItem("token");
    var fs = '{"formRecordList":[';
    fs += '{"application":{"id":"","value":"loom"}}';
    fs +=
      ',{"table":{"id":"","value":"' +
      "operation_income" +
      '","label":"' +
      "Operation Income" +
      '"}}';
    fs += ',{"records":[]}';
    fs +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';
    fs += ',{"sort":{"asc":"true","column":"id"}}';
    fs += ',{"filter":' + JSON.stringify(this.state.filtarray) + "}";
    fs += ',{"timeLine":"' + this.state.timeline + '"}]}';
    console.log("fs", fs);

    axios
      .post(this.state.loca + "/loom/get/income/expense/record", fs, {
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then(
        (resp) => {
          let res = resp.data;
          console.log("records: ", res);
          if (res !== "") {
            if ("Error" in res) {
              this.setState({
                loading: false,
                page_error: true,
                error: res.Error,
              });
            } else {
              for (var k = 0; k < res.record[0].expense.length; k++) {
                res.record[0].expense[k].ref = true;
              }
              for (var i = 0; i < res.record[1].income.length; i++) {
                res.record[1].income[i].ref = true;
              }
              this.setState({
                record: res,
                expense: res.record[0].expense,
                income: res.record[1].income,
                totalExpense: res.record[0].totalExpense,
                totalIncome: res.record[1].totalIncome,
              });
            }
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  setOpen(i, rf, type) {
    if (type === "income") {
      const rcd = this.state.income;
      rcd[i].ref = !rf;
      this.setState({ income: rcd });
    } else if (type === "expense") {
      const rcd = this.state.expense;
      rcd[i].ref = !rf;
      this.setState({ expense: rcd });
    }
  }

  filterClear(filtType) {
    
    let filter=[];
    let timeline="";
    if (filtType === "income") {
      console.log(this.state.filtIcome);
      filter.push(this.state.filtIcome)
      console.log(filter);
      this.setState({filtarrayIncome : filter, noRecord: false });
      this.setState({ incomeTimeLine: timeline });
  
    } else if (filtType === "expense") {
      this.setState({filtarrayExp : filter, noRecord: false });
      this.setState({ expenseTimeLine: timeline });
    } else if (filtType === "main") {
      this.setState({filtarray : filter, noRecord: false });
      this.setState({ timeline: timeline });
    }

    var fs = '{"formRecordList":[';
    fs += '{"application":{"id":"","value":"loom"}}';
    fs +=
      ',{"table":{"id":"","value":"' +
      "operation_income" +
      '","label":"' +
      "Operation Income" +
      '"}}';
    fs += ',{"records":[]}';
    fs +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';
    fs += ',{"sort":{"asc":"true","column":"id"}}';
    fs += ',{"filter":' + JSON.stringify(filter) + "}";
    fs += ',{"timeLine":"' + timeline + '"}]}';
  //  let len = filter.length;
   
    this.callIncomeExp(fs, filtType);
  }

  filtersubmit(filtType) {
    console.log("filtersubmit");
    /*    this.alreadyRun.current = true; */

    let filter;
    let timeline;
    if (filtType === "income") {
      filter = this.state.filtarrayIncome;
      timeline = this.state.incomeTimeLine;
    } else if (filtType === "expense") {
      filter = this.state.filtarrayExp;
      timeline = this.state.expenseTimeLine;
    } else if (filtType === "main") {
      console.log(this.state.filtarray);
      filter = this.state.filtarray;
      timeline = this.state.timeline;
    }

    var fs = '{"formRecordList":[';
    fs += '{"application":{"id":"","value":"loom"}}';
    fs +=
      ',{"table":{"id":"","value":"' +
      "operation_income" +
      '","label":"' +
      "Operation Income" +
      '"}}';
    fs += ',{"records":[]}';
    fs +=
      ',{"page":{"record_count":"0","page_count":"1",' +
      '"page_clicked":"1","page_records":"0"}}';
    fs += ',{"sort":{"asc":"true","column":"id"}}';
    fs += ',{"filter":' + JSON.stringify(filter) + "}";
    fs += ',{"timeLine":"' + timeline + '"}]}';
    let len = filter.length;
    console.log(filter, filtType);
    console.log(filter[len - 1].co);
    if (filter[len - 1].co !== "") {
      if (
        filter[len - 1].an !== "" ||
        filter[len - 1].rf.value !== "" ||
        filter[len - 1].dc.value !== ""
      ) {
        this.callIncomeExp(fs, filtType);
      }
    } else {
      this.callIncomeExp(fs, filtType);
    }
  }

  callIncomeExp(fs, filtType) {
    let url = "";
    if (filtType === "income") url = "/loom/get/income/record";
    else if (filtType === "expense") url = "/loom/get/expense/record";
    else if (filtType === "main") url = "/loom/get/income/expense/record";
    var token = localStorage.getItem("token");
    console.log(fs , filtType);
    if (url !== "") {
      axios
        .post(this.state.loca + url, fs, {
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then(
          (resp) => {
            let res = resp.data;
            console.log("records: ", res);
            if (res !== "") {
              if ("Error" in res) {
                this.setState({
                  loading: false,
                  page_error: true,
                  error: res.Error,
                });
              } else {
                if (filtType === "income") {
                  for (var i = 0; i < res.record[0].income.length; i++) {
                    res.record[0].income[i].ref = true;
                  }
                  this.setState({
                    record: res,
                    income: res.record[0].income,
                    totalIncome: res.record[0].totalIncome,
                  });
                } else if (filtType === "expense") {
                  for (var k = 0; k < res.record[0].expense.length; k++) {
                    res.record[0].expense[k].ref = true;
                  }
                  this.setState({
                    record: res,
                    expense: res.record[0].expense,
                    totalExpense: res.record[0].totalExpense,
                  });
                } else if (filtType === "main") {
                  for (var k = 0; k < res.record[0].expense.length; k++) {
                    res.record[0].expense[k].ref = true;
                  }
                  for (var i = 0; i < res.record[1].income.length; i++) {
                    res.record[1].income[i].ref = true;
                  }
                  this.setState({
                    record: res,
                    expense: res.record[0].expense,
                    income: res.record[1].income,
                    totalExpense: res.record[0].totalExpense,
                    totalIncome: res.record[1].totalIncome,
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
    }
  }

  callform(tab, r_id) {
    this.props.showFormCompo(tab, r_id, "record");
  }
  filterItem() {
    this.setState({ showlist: !this.state.showlist });
    this.setState({ showbtn: !this.state.showbtn });
  }
  filterItemIncome() {
    console.log("filterItemIncome");
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/get/allcloumns/" + "operation_income", {
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then(
        (resp) => {
          let res = resp.data;
        
          res.columnRecords.unshift({id:"0" ,label:"None" ,name:"none" , userTable:"false"})
          console.log("records: ", res);
          this.setState({ col_mn_inc: res.columnRecords });
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
    this.setState({ showFillIncome: !this.state.showFillIncome });
    this.setState({ showbtn: !this.state.showbtn });
  }
  filterItemExpense() {
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/get/allcloumns/" + "operation_cost", {
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then(
        (resp) => {
          let res = resp.data;
          res.columnRecords.unshift({id:"0" ,label:"None" ,name:"none" , userTable:"false"})
          console.log("records: ", res);
          this.setState({ col_mn_exp: res.columnRecords });
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
    this.setState({ showFillExpense: !this.state.showFillExpense });
    this.setState({ showbtn: !this.state.showbtn });
  }
  calltimeline(timeline, filType) {
    if (filType === "main") {
      this.setState({
        timeline: timeline,
      });
    } else if (filType === "income") {
      this.setState({
        incomeTimeLine: timeline,
      });
    } else if (filType === "expense") {
      this.setState({
        expenseTimeLine: timeline,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="pt-2">
          <div className="justify-content-between" >
        {/*     <div style={{ marginLeft: "8px" }}>
              <i
                className="fa fa-filter vlpointer"
                aria-hidden="true"
                onClick={this.filterItem}
              ></i>
              {this.state.showlist === true && (
                <input
                  className="csm_btn csm_btn_pri col-md-2 sub-btn"
                  type="button"
                  value="Run"
                  aria-hidden="true"
                  onClick={() => {
                    this.filtersubmit("main");
                  }}
                ></input>
              )}
              {this.state.showlist === true && (
                <input
                  className="csm_btn csm_btn_pri col-md-2 sub-btn"
                  type="button"
                  value="Clear"
                  aria-hidden="true"
                   onClick={()=>{
                    this.filterClear("main")
                   }}
                ></input>
              )}
            </div> */}
            <div
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              {"View Income Expense"}
            </div>
           
          </div>

          {this.state.showlist === true && (
            <div>
              <NewFilterCompo
                showlist={this.state.showlist}
                col_mn={this.state.col_mn}
                col_depend={this.state.column_depend}
                call_fil={(filtarray, in_index, col_id) =>
                  this.callfilter(filtarray, in_index, col_id, "main")
                }
                filtarray={this.state.filtarray}
                timeline={this.state.timeline}
                call_tm={(timeline) => this.calltimeline(timeline, "main")}
                loca={this.state.loca}
                /*   isMobile={this.state.isMobile} */
              ></NewFilterCompo>
            </div>
          )}
        </div>

        <div className="table_set over" style={{ textAlign: "center" }}>
          <table className="table table-bordered table-striped  p-1">
            <thead>
              <tr className="obj_name">
                <th>
                  <div className="d-flex justify-content-between">
                    <div>
                      <i
                        className="fa fa-filter vlpointer"
                        aria-hidden="true"
                        onClick={this.filterItemIncome}
                      ></i>
                      {this.state.showFillIncome === true && (
                        <input
                          className="csm_btn csm_btn_pri col-md-2 sub-btn"
                          type="button"
                          value="Run"
                          aria-hidden="true"
                          onClick={() => {
                            this.filtersubmit("income");
                          }}
                        ></input>
                      )}
                      {this.state.showFillIncome === true && (
                        <input
                          className="csm_btn csm_btn_pri col-md-2 sub-btn"
                          type="button"
                          value="Clear"
                          aria-hidden="true"
                          onClick={()=>{
                            this.filterClear("income")
                           }}
                        ></input>
                      )}
                    </div>
                    Income
                    <div></div>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between">
                    <div>
                      <i
                        className="fa fa-filter vlpointer"
                        aria-hidden="true"
                        onClick={this.filterItemExpense}
                      ></i>
                      {this.state.showFillExpense === true && (
                        <input
                          className="csm_btn csm_btn_pri col-md-2 sub-btn"
                          type="button"
                          value="Run"
                          aria-hidden="true"
                          onClick={() => {
                            this.filtersubmit("expense");
                          }}
                        ></input>
                      )}
                      {this.state.showFillExpense === true && (
                        <input
                          className="csm_btn csm_btn_pri col-md-2 sub-btn"
                          type="button"
                          value="Clear"
                          aria-hidden="true"
                          onClick={()=>{
                            this.filterClear("expense")
                           }}
                        ></input>
                      )}
                    </div>
                    Expense
                    <div></div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {this.state.showFillIncome === true && (
                    <div>
                      {console.log(this.state.filtarrayIncome)}
                      <NewFilterCompo
                        showlist={this.state.showFillIncome}
                        col_mn={this.state.col_mn_inc}
                        col_depend={this.state.column_depend}
                        call_fil={(filtarray, in_index, col_id) =>
                          this.callfilter(filtarray, in_index, col_id, "income")
                        }
                        filtarray={this.state.filtarrayIncome}
                        timeline={this.state.incomeTimeLine}
                        call_tm={(timeline) =>
                          this.calltimeline(timeline, "income")
                        }
                        loca={this.state.loca}
                        /*   isMobile={this.state.isMobile} */
                      ></NewFilterCompo>
                    </div>
                  )}
                </td>
                <td>
                  {this.state.showFillExpense === true && (
                    <div>
                      <NewFilterCompo
                        showlist={this.state.showFillExpense}
                        col_mn={this.state.col_mn_exp}
                        col_depend={this.state.column_depend}
                        call_fil={(filtarray, in_index, col_id) =>
                          this.callfilter(
                            filtarray,
                            in_index,
                            col_id,
                            "expense"
                          )
                        }
                        filtarray={this.state.filtarrayExp}
                        timeline={this.state.expenseTimeLine}
                        call_tm={(timeline) =>
                          this.calltimeline(timeline, "expense")
                        }
                        loca={this.state.loca}
                        /*   isMobile={this.state.isMobile} */
                      ></NewFilterCompo>
                    </div>
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  {this.state.income.length > 0 &&
                    this.state.income.map((obj, index) => (
                      <div   key={index} >
                        <div className="row">
                          <div className="col-md-1">
                            <button
                              type="button"
                              className={
                                obj.ref
                                  ? "imp_record_dropdown_btn"
                                  : "imp_record_dropdown_btnp"
                              }
                              onClick={(pr) =>
                                this.setOpen(index, obj.ref, "income")
                              }
                            >
                              {obj.ref ? "-" : "+"}
                            </button>
                          </div>
                          <div className="col-md-11">
                            <strong key={index}>
                              {obj.type.charAt(0).toUpperCase() +
                                obj.type.slice(1)}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {obj.ref === true && (
                            <div>
                              <table>
                                <tbody>
                                  <tr>
                                    <th width="27%">Id</th>
                                    <th width="27%">Date</th>
                                    <th width="27%">State</th>
                                    <th width="27%">Income</th>
                                    <th></th>
                                  </tr>
                                  {obj.income.map((obj_in, index_in) => (
                                    <tr key={index_in}>
                                      <td
                                        className="val_pad val_under vlpointer"
                                        onClick={(e) =>
                                          this.callform(
                                            "operation_income",
                                            obj_in.id
                                          )
                                        }
                                      >
                                        {obj_in.id}
                                      </td>
                                      <td>{obj_in.date}</td>
                                      <td>{obj_in.state}</td>
                                      <td>{obj_in.income}</td>
                                    </tr>
                                  ))}
                                  <tr>
                                    <td className="val_pad val_under vlpointer">
                                      {}
                                    </td>
                                    <td>{}</td>
                                    <td style={{ fontWeight: "bold" }}>
                                      {obj.type.charAt(0).toUpperCase() +
                                        obj.type.slice(1) +
                                        " Total"}
                                    </td>
                                    <td style={{ fontWeight: "bold" }}>
                                      {obj.totalIncome}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  {/*     <div className="row" style={{ fontWeight: "bold" }}>
                                    <div className="col-md-3">{"Total Income"}</div>
                                    <div className="col-md-8"></div>
                                    <div className="col-md-1" style={{ marginLeft: "-64px" }}>{this.state.totalIncome}</div>
                                </div> */}
                </td>
                <td>
                  {this.state.expense.length > 0 &&
                    this.state.expense.map((obj, index_ex) => (
                      <div>
                        <div className="row">
                          <div className="col-md-1">
                            <button
                              type="button"
                              className={
                                obj.ref
                                  ? "imp_record_dropdown_btn"
                                  : "imp_record_dropdown_btnp"
                              }
                              onClick={(pr) =>
                                this.setOpen(index_ex, obj.ref, "expense")
                              }
                            >
                              {obj.ref ? "-" : "+"}
                            </button>
                          </div>
                          <div className="col-md-10">
                            <strong key={index_ex}>
                              {obj.type.charAt(0).toUpperCase() +
                                obj.type.slice(1)}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {obj.ref === true && (
                            <div>
                              <table>
                                <tbody>
                                  <tr>
                                    <th width="27%">Id</th>
                                    <th width="27%">Date</th>
                                    <th width="27%">State</th>
                                    <th width="27%">Cost</th>
                                    <th></th>
                                  </tr>
                                  {obj.cost.map((obj_in, index_in) => (
                                    <tr key={index_in}>
                                      <td
                                        className="val_pad val_under vlpointer"
                                        onClick={(e) =>
                                          this.callform(
                                            "operation_cost",
                                            obj_in.id
                                          )
                                        }
                                      >
                                        {obj_in.id}
                                      </td>
                                      <td>{obj_in.date}</td>
                                      <td>{obj_in.state}</td>
                                      <td>{obj_in.cost}</td>
                                    </tr>
                                  ))}
                                  <tr>
                                    <td className="val_pad val_under vlpointer">
                                      {}
                                    </td>
                                    <td>{}</td>
                                    <td style={{ fontWeight: "bold" }}>
                                      {obj.type.charAt(0).toUpperCase() +
                                        obj.type.slice(1) +
                                        " Total"}
                                    </td>
                                    <td style={{ fontWeight: "bold" }}>
                                      {obj.totalCost}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  {/*   <div className="row" style={{ fontWeight: "bold" }}>
                                    <div className="col-md-3">{"Total Expense"}</div>
                                    <div className="col-md-8"></div>
                                    <div className="col-md-1" style={{ marginLeft: "-52px" }}>{this.state.totalExpense}</div>
                                </div> */}
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              fontWeight: "bold",
              marginLeft: "auto",
              marginRight: "auto",
              width: "300px",
            }}
          >
            <table
              className="table table-bordered table-striped p-1"
              style={{ border: "1px solid black" }}
            >
          <tbody>
          <tr>
                <td width="50%">{"Total Income"}</td>
                <td width="50%">{this.state.totalIncome}</td>
              </tr>
              <tr>
                <td width="50%">{"Total Expense"}</td>
                <td width="50%">{this.state.totalExpense}</td>
              </tr>
              {this.state.totalIncome - this.state.totalExpense >= 0 && (
                <tr>
                  <td width="50%">{"Total Profit"}</td>
                  <td width="50%">
                    {this.state.totalIncome - this.state.totalExpense}
                  </td>
                </tr>
              )}
              {this.state.totalIncome - this.state.totalExpense < 0 && (
                <tr>
                  <td width="50%">{"Total Loss"}</td>
                  <td width="50%">
                    {this.state.totalIncome - this.state.totalExpense}
                  </td>
                </tr>
              )}
          </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default IncomeExpense;
