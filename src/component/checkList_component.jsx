import React, { Component, Fragment } from "react";
import axios from "axios";
import "../css/checklist.css";
import "../css/formcompo.css";
import WorkInProgress from "./work_in_progress";
import WorkInProgressSmall from "./WorkInProgressSmall";

class CheckListComponent extends Component {
  state = {
    chk_record: [],
    event_record: [],
    event_record1: [],
    imp_record: [],
    // imp_record1: [],
    evt_choice: [],
    ier_button: [],
    // att_record: [],
    loading: false,
    stateLoading: false,
    evtLoading: false,
    chekLoading: false,
    page_error: false,
    error: "",
    page_message: false,
    message: "",
    columnId: 0,
    objName: "",
    objLabel: "",
    objIndex: "",
    objIndex_in: "",
    objType: "",
    showModelList: false,
    refrecord: {},
    loca: this.props.loca,
  };

/*   {"token":"","validation":"","error":"","authenticated":false,"passwordReset":false,"newPasswordSet":true,"usernameChanged":false,"username":"worker1","name":"","appCode":""}
 */
  constructor(props) {
    super(props);
    this.setRecord = this.setRecord.bind(this);
    this.formChangefn = this.formChangefn.bind(this);
    this.validationfn = this.validationfn.bind(this);
    this.clickRefrence = this.clickRefrence.bind(this);
    this.setRefrecord = this.setRefrecord.bind(this);
    this.callbtnImp = this.callbtnImp.bind(this);
    this.callEventbtn = this.callEventbtn.bind(this);
    this.callCheckListbtn = this.callCheckListbtn.bind(this);
    this.changeState = this.changeState.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.fieldverify = this.fieldverify.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(this.state.loca + "/loom/today/checklist", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          var chkrecord = resp.data;
          console.log(chkrecord);
          this.setRecord(chkrecord);
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  setRecord(chkrecord) {
    if (chkrecord !== "") {
      if ("Error" in chkrecord) {
        this.setState({
          loading: false,
          page_error: true,
          error: chkrecord.Error,
        });
      } else {
        var lst = [];
        for (
          var i = 0;
          i < chkrecord.checkList[2].importantRecords[0].imp_records.length;
          i++
        ) {
          chkrecord.checkList[2].importantRecords[0].imp_records[i].position =
            i;
          chkrecord.checkList[2].importantRecords[0].imp_records[i].ref = true;
          for (
            var j = 0;
            j <
            chkrecord.checkList[2].importantRecords[0].imp_records[i].records
              .length;
            j++
          ) {
            chkrecord.checkList[2].importantRecords[0].imp_records[i].records[
              j
            ].rec_chg = false;
          }
        }

        var imp_record = [];
        var ier_button = [];
        if (
          chkrecord.checkList[2].importantRecords.length > 0 &&
          JSON.stringify(chkrecord.checkList[2].importantRecords[0]) !== "{}"
        ) {
          imp_record = chkrecord.checkList[2].importantRecords[0].imp_records;
          ier_button = chkrecord.checkList[2].importantRecords[1].button;
        }
        this.setState({
          loading: false,
          chk_record: chkrecord.checkList[0].checkListRecords[0].records,
          chk_button: chkrecord.checkList[0].checkListRecords[1].button,
          event_record1: chkrecord.checkList[1].eventRecords[0],
          event_record: chkrecord.checkList[1].eventRecords[0].records,
          evt_choice: chkrecord.checkList[1].eventRecords[1].choice,
          evt_button: chkrecord.checkList[1].eventRecords[2].button,
          imp_record: imp_record,
          ier_button: ier_button,
          // imp_record1: chkrecord.checkList[2].importantRecords[0],
        });
      }
    }
  }

  formChangefn(vl, index, index_in, ob, type, id, vrf) {
    var frecord = this.state.imp_record;
    frecord[index].records[index_in].rec_chg = true;
    if (type === "reference") {
      if (ob === "loom_table_id" || ob === "loomtable_id") {
        this.callFieldList(ob);
      }
      if (vrf === false) {
        frecord[index].records[index_in].record[1] = false;
      }
      if (vl.length > 2) {
        if (vrf === true) {
          if (frecord[index].records[index_in].record[1].name === ob) {
            frecord[index].records[index_in].record[1].value.value = vl;
            frecord[index].records[index_in].record[1].value.id = id;
            frecord[index].records[index_in].record[1].clicked = true;
            var rfrcd2 = this.state.refrecord;
            rfrcd2.record = [];
            this.setState({ record: frecord, refrecord: rfrcd2 });
            this.validationfn(vl, index, index_in, ob, type, id);
          }
        } else {
          if (frecord[index].records[index_in].record[1].name === ob) {
            frecord[index].records[index_in].record[1].value.value = vl;
            frecord[index].records[index_in].record[1].value.id = id;
            this.setState({ record: frecord });
          }
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
                  rff = refrencercd.referenceRecordList[2].records;
                }
              }
              var rf = { index: index, record: rff };
              this.setState({ refrecord: rf });
            });
        }
      } else {
        if (frecord[index].records[index_in].record[1].name === ob) {
          frecord[index].records[index_in].record[1].value.value = vl;
          frecord[index].records[index_in].record[1].value.id = id;
          var rfrcd3 = this.state.refrecord;
          rfrcd3.record = [];
          this.setState({ record: frecord, refrecord: rfrcd3 });
        }
      }
    } else {
      if (frecord[index].records[index_in].record[1].name === ob) {
        frecord[index].records[index_in].record[1].value = vl;
        this.setState({ record: frecord });
      }
    }
  }

  validationfn(vl, index, index_in, ob, type, id) {
    var formrecord = this.state.imp_record;
    if (type === "reference") {
      if (vl !== "") {
        if (formrecord[index].records[index_in].clicked === true) {
          formrecord[index].records[index_in].verified = "verified";
        } else {
          var token = localStorage.getItem("token");
          var veri = '{"referenceRecord":[{"columnid":"' + id + '"},';
          veri += '{"tabvalue":"' + vl + '"}]}';
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
                if ("Error" in refrencercd) {
                  this.setState({
                    loading: false,
                    page_error: true,
                    error: refrencercd.Error,
                  });
                } else {
                  if (refrencercd.Result === "Unverified") {
                    formrecord[index].records[index_in].verified = "unverified";
                    this.setState({ record: formrecord });
                  } else {
                    formrecord[index].records[index_in].verified = "verified";
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
        formrecord[index].records[index_in].verified = "initial";
        this.setState({ record: formrecord });
      }
    } else {
      if (formrecord[index].records[index_in].name === ob) {
        if (vl !== "") {
          formrecord[index].records[index_in].verified = this.fieldverify(
            formrecord[index].records[index_in].type,
            vl
          );
        } else {
          formrecord[index].records[index_in].verified = "initial";
        }
      }
      this.setState({ record: formrecord });
    }
  }

  async callbtnImp(obj, index) {
    var imp_rcd = obj;
    var id = imp_rcd.id;
    var lt = imp_rcd.loomtable;
    var rec = imp_rcd.records;
    var new_rec = [];
    for (let i = 0; i < rec.length; i++) {
      if (rec[i].rec_chg === true) {
        new_rec.push(rec[i]);
      }
    }
    var rcd = {
      importantRecords: { id: id, loomtable: lt, records: new_rec },
    };
    var token = localStorage.getItem("token");
    this.setState({ stateLoading: true });
    axios
      .post(this.state.loca + "/loom/save/checklist/imporant/record", rcd, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        var record = resp.data;
        this.setRecord(record);

        this.setState({ stateLoading: false });
      });
  }

  async callEventbtn(obj) {
    var chc = this.state.evt_choice;
    var rcd = {
      eventRecords: { record: obj, choice: chc },
    };
    var token = localStorage.getItem("token");
    this.setState({ evtLoading: true });
    axios
      .post(this.state.loca + "/loom/save/checklist/event/record", rcd, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          var record = resp.data;
          this.setRecord(record);
          this.setState({ evtLoading: false });
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  async callCheckListbtn() {
    var array = [];
    for (var c = 0; c < this.state.chk_record.length; c++) {
      if ("button" in this.state.chk_record[c]) {
      } else {
        array.push(this.state.chk_record[c]);
      }
    }
    var chk = { checkListRecords: array };
    var token = localStorage.getItem("token");
    this.setState({ chekLoading: true });
    axios
      .post(this.state.loca + "/loom/save/checklist/record", chk, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          var record = resp.data;
          this.setState({ chekLoading: false });
          var msg = record.Message;
          if (msg !== "") {
            this.setState({ page_message: true, message: msg });
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  changeState(e, index) {
    var evt_rcd = this.state.event_record;
    evt_rcd[index].state = e.target.value;
    this.setState({ event_record: evt_rcd });
  }

  changeValue(e, index) {
    var chk_rcd = this.state.chk_record;
    chk_rcd[index].flag_set = e.target.checked.toString();
    this.setState({ chk_record: chk_rcd });
  }

  setOpen(i, rf) {
    const rcd = this.state.imp_record;
    rcd[i].ref = !rf;
    this.setState({ imp_record: rcd });
  }

  clickRefrence(e, id, name, type, index, index_in, label) {
    e.preventDefault();
    this.setState({
      columnId: id,
      objName: name,
      objType: type,
      objIndex: index,
      index_in: index_in,
      objLabel: label,
      showModelList: true,
    });
  }

  setRefrecord(vl, index, index_in, ob, type, id) {
    this.formChangefn(vl, index, index_in, ob, type, id, true);
  }

  fieldverify(type, vl) {
    if (type === "String") {
      return "verified";
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
    if (type === "filter") {
      if (/[a-zA-Z]/g.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
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
            {this.state.page_message === true && (
              <div className="alert alert-success form_alt" role="alert">
                {this.state.message}
              </div>
            )}
            <div>
              <div className="checklist_outerline">
                <strong>Checklist</strong>
                <table className="table table-striped table-sm">
                  {this.state.chekLoading === true ? (
                    <WorkInProgressSmall></WorkInProgressSmall>
                  ) : null}

                  <tbody className="checklist_position">
                    <tr>
                      <th width="25%">Id</th>
                      <th>Name</th>
                      <th>Flag Set</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                    {this.state.chk_record.length === 0 && (
                      <tr>
                        <td style={{ borderBottom: 0 }}>No record found</td>
                      </tr>
                    )}
                    {this.state.chk_record.map((obj, index) => (
                      <tr key={index}>
                        <td>{obj.id}</td>
                        <td>{obj.name}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={obj.flag_set === "true" ? true : false}
                            onChange={(e) => this.changeValue(e, index)}
                          ></input>
                        </td>
                        <td>
                          {this.state.chk_button.map((btn, btn_i) => (
                            <button
                              className="csm_btn csm_btn_pri col-md-5 sub-btn"
                              key={btn_i}
                              onClick={(e) => this.callCheckListbtn(obj)}
                            >
                              {btn.name}
                            </button>
                          ))}
                        </td>
                      </tr>
                    ))}

                    {/* <button
                      className="csm_btn csm_btn_pri col-md-2 sub-btn"
                      onClick={(e) => this.callCheckListbtn()}
                    >
                      {"save"}
                    </button>  */}
                  </tbody>
                </table>
              </div>
              <div className="checklist_outerline">
                <strong>Event</strong>
                <table className="table table-striped table-sm">
                  {this.state.evtLoading === true ? (
                    <WorkInProgressSmall></WorkInProgressSmall>
                  ) : null}
                  <tbody className="event_position">
                    <tr>
                      <th width="25%">Id</th>
                      {/* <th>Name</th> */}
                      <th>Event</th>
                      <th>State</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                    {this.state.event_record.length === 0 && (
                      <tr>
                        <td style={{ borderBottom: 0 }}>No record found</td>
                      </tr>
                    )}
                    {this.state.event_record.length > 0 &&
                      this.state.event_record.map((obj, index) => (
                        <tr key={index}>
                          <td className="val_pad val_under vlpointer">
                            {obj.id}
                          </td>
                          {/* <td>{obj.name}</td> */}
                          <td>{obj.event_id.value}</td>
                          <td>
                            <select
                              className="form-select evtinputlis"
                              aria-label="Default"
                              value={obj.state}
                              onChange={(e) => this.changeState(e, index)}
                            >
                              {this.state.evt_choice.map((obj2, index2) => (
                                <option key={index2} value={obj2.value}>
                                  {obj2.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          {/* Event save button */}
                          <td>
                            {this.state.evt_button.map((btn, btn_i) => (
                              <button
                                className="csm_btn csm_btn_pri col-md-5 sub-btn"
                                key={btn_i}
                                onClick={(e) => this.callEventbtn(obj)}
                              >
                                {btn.name}
                              </button>
                            ))}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="checklist_outerline">
                <div>
                  {this.state.stateLoading === true ? (
                    <WorkInProgressSmall></WorkInProgressSmall>
                  ) : null}
                </div>
                <div className="mb-3">
                  <strong>Important Records</strong>
                </div>
                <div>
                  {this.state.imp_record.length === 0 && (
                    <div>No record found</div>
                  )}
                  {this.state.imp_record.length > 0 &&
                    this.state.imp_record.map((obj, index) => (
                      <div>
                        <strong key={index}>
                          {obj.name.charAt(0).toUpperCase() + obj.name.slice(1)}
                        </strong>
                        <button
                          type="button"
                          className={
                            obj.ref
                              ? "imp_record_dropdown_btn"
                              : "imp_record_dropdown_btnp"
                          }
                          onClick={(pr) => this.setOpen(obj.position, obj.ref)}
                        >
                          {obj.ref ? "-" : "+"}
                        </button>
                        <div>
                          {obj.ref === true && (
                            <div>
                              <table className="table table-striped table-hover table-sm imp_rec">
                                <tbody
                                  className="important_record_position"
                                  style={{ textAlign: "ceneter" }}
                                >
                                  <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Value</th>
                                    {/* <th></th> */}
                                  </tr>
                                  {obj.records.length === 0 ? (
                                    <div>No record found</div>
                                  ) : (
                                    obj.records.map((obj_in, index_in) => (
                                      <tr key={index_in}>
                                        <td key={index_in}>{obj_in.id}</td>
                                        <td>{obj_in.name}</td>
                                        <td>{obj_in.date}</td>
                                        <td>
                                          {obj_in.record[1].type ===
                                          "String" ? (
                                            <div className="form-group objpdg ">
                                              <span>
                                                {obj_in.record[1].label}
                                              </span>
                                              <input
                                                type="text"
                                                value={obj_in.record[1].value}
                                                readOnly={
                                                  obj_in.record[1].uivalid
                                                    .read_only === "true"
                                                }
                                                maxLength={
                                                  obj_in.record[1].uivalid
                                                    .max_length
                                                }
                                                onChange={(e) =>
                                                  this.formChangefn(
                                                    e.target.value,
                                                    index,
                                                    index_in,
                                                    obj_in.record[1].name,
                                                    obj_in.record[1].type,
                                                    obj_in.record[1].id,
                                                    false
                                                  )
                                                }
                                                onMouseOut={(e) =>
                                                  this.validationfn(
                                                    e.target.value,
                                                    index,
                                                    index_in,
                                                    obj_in.record[1].name,
                                                    obj_in.record[1].type,
                                                    obj_in.record[1].id
                                                  )
                                                }
                                              ></input>
                                            </div>
                                          ) : null}
                                          {obj_in.record[1].type === "int" ? (
                                            <div className="form-group">
                                              <span>
                                                {obj_in.record[1].label}
                                              </span>
                                              <input
                                                type="text"
                                                value={obj_in.record[1].value}
                                                readOnly={
                                                  obj_in.record[1].uivalid
                                                    .read_only === "true"
                                                }
                                                maxLength={
                                                  obj_in.record[1].uivalid
                                                    .max_length
                                                }
                                                onChange={(e) =>
                                                  this.formChangefn(
                                                    e.target.value,
                                                    index,
                                                    index_in,
                                                    obj_in.record[1].name,
                                                    obj_in.record[1].type,
                                                    obj_in.record[1].id,
                                                    false
                                                  )
                                                }
                                                onMouseOut={(e) =>
                                                  this.validationfn(
                                                    e.target.value,
                                                    index,
                                                    index_in,
                                                    obj_in.record[1].name,
                                                    obj_in.record[1].type,
                                                    obj_in.record[1].id
                                                  )
                                                }
                                              ></input>
                                            </div>
                                          ) : null}
                                          {obj_in.record[1].type === "date" ? (
                                            <div className=" form-group">
                                              <span>
                                                {obj_in.record[1].label}
                                              </span>
                                              <input
                                                type="date"
                                                value={obj.record.value}
                                                readOnly={
                                                  obj_in.record[1].uivalid
                                                    .read_only === "true"
                                                }
                                                maxLength={
                                                  obj_in.record[1].uivalid
                                                    .max_length
                                                }
                                                onChange={(e) =>
                                                  this.formChangefn(
                                                    e.target.value,
                                                    index,
                                                    index_in,
                                                    obj_in.record[1].name,
                                                    obj_in.record[1].type,
                                                    obj_in.record[1].id,
                                                    false
                                                  )
                                                }
                                                onMouseOut={(e) =>
                                                  this.validationfn(
                                                    e.target.value,
                                                    index,
                                                    index_in,
                                                    obj_in.record[1].name,
                                                    obj_in.record[1].type,
                                                    obj_in.record[1].id
                                                  )
                                                }
                                              ></input>
                                            </div>
                                          ) : null}
                                          {obj_in.record[1].type ===
                                          "datetime" ? (
                                            <div className=" form-group">
                                              <span>
                                                {obj_in.record[1].label}
                                              </span>
                                              <input
                                                type="datetime-local"
                                                step="1"
                                                value={obj_in.record[1].value}
                                                readOnly={
                                                  obj_in.record[1].uivalid
                                                    .read_only === "true"
                                                }
                                                maxLength={
                                                  obj_in.record[1].uivalid
                                                    .max_length
                                                }
                                                onChange={(e) =>
                                                  this.formChangefn(
                                                    e.target.value,
                                                    index,
                                                    index_in,
                                                    obj_in.record[1].name,
                                                    obj_in.record[1].type,
                                                    obj_in.record[1].id,
                                                    false
                                                  )
                                                }
                                                onMouseOut={(e) =>
                                                  this.validationfn(
                                                    e.target.value,
                                                    index,
                                                    index_in,
                                                    obj_in.record[1].name,
                                                    obj_in.record[1].type,
                                                    obj_in.record[1].id
                                                  )
                                                }
                                              ></input>
                                            </div>
                                          ) : null}
                                          {obj_in.record[1].type ===
                                          "boolean" ? (
                                            <div className="form-check fmcheck">
                                              <input
                                                type="checkbox"
                                                className={
                                                  obj.verified === "unverified"
                                                    ? "checkpadd unverifi"
                                                    : "checkpadd"
                                                }
                                                checked={
                                                  obj_in.record[1].value ===
                                                  "true"
                                                    ? true
                                                    : false
                                                }
                                                onChange={(e) =>
                                                  this.formChangefn(
                                                    e.target.checked.toString(),
                                                    index,
                                                    index_in,
                                                    obj_in.record[1].name,
                                                    obj_in.record[1].type,
                                                    obj_in.record[1].id,
                                                    false
                                                  )
                                                }
                                                onMouseOut={(e) =>
                                                  this.validationfn(
                                                    e.target.value,
                                                    index,
                                                    index_in,
                                                    obj_in.record[1].name,
                                                    obj_in.record[1].type,
                                                    obj_in.record[1].id
                                                  )
                                                }
                                              ></input>
                                              <span>
                                                {obj_in.record[1].label}
                                              </span>
                                            </div>
                                          ) : null}
                                          {obj_in.record[1].type ===
                                          "choice" ? (
                                            <div className="form-group">
                                              {
                                                ("choice: ",
                                                console.log(
                                                  obj_in.record[1].choice
                                                ))
                                              }
                                              <div className="row">
                                                <div className="col-md-7">
                                                  <select
                                                    type="checkbox"
                                                    className="form-control form-select formpadd "
                                                    aria-label="Default select example"
                                                    value={
                                                      obj_in.record[1].value
                                                    }
                                                    onChange={(e) =>
                                                      this.formChangefn(
                                                        e.target.value,
                                                        index,
                                                        index_in,
                                                        obj_in.record[1].name,
                                                        obj_in.record[1].type,
                                                        obj_in.record[1].id,
                                                        false
                                                      )
                                                    }
                                                    onMouseOut={(e) =>
                                                      this.validationfn(
                                                        e.target.value,
                                                        index,
                                                        index_in,
                                                        obj_in.record[1].name,
                                                        obj_in.record[1].type,
                                                        obj_in.record[1].id
                                                      )
                                                    }
                                                  >
                                                    <option value="None">
                                                      None
                                                    </option>
                                                    {obj_in.record[1].choice.map(
                                                      (ch, chi) => (
                                                        <option
                                                          key={chi}
                                                          value={ch.name}
                                                        >
                                                          {ch.value}
                                                        </option>
                                                      )
                                                    )}
                                                  </select>
                                                </div>
                                                <div className="col-md-3">
                                                  <span>
                                                    {obj_in.record[1].label}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          ) : null}
                                          {obj_in.record[1].type ===
                                          "reference" ? (
                                            <div>
                                              <div className="form-group">
                                                <span>
                                                  {obj_in.record[1].label}
                                                </span>
                                                <div
                                                  style={{ display: "flex" }}
                                                >
                                                  <input
                                                    type="text"
                                                    value={
                                                      obj_in.record[1].value
                                                        .name
                                                    }
                                                    readOnly={
                                                      obj_in.record[1].uivalid
                                                        .read_only === "true"
                                                    }
                                                    onChange={(e) =>
                                                      this.formChangefn(
                                                        e.target.value,
                                                        index,
                                                        index_in,
                                                        obj_in.record[1].name,
                                                        obj_in.record[1].type,
                                                        obj_in.record[1].id,
                                                        false
                                                      )
                                                    }
                                                    onMouseOut={(e) => {
                                                      // validationfn(
                                                      //   e.target.value,
                                                      //   index,
                                                      //   index_in,
                                                      //   obj_in.record[1].name,
                                                      //   obj_in.record[1].type,
                                                      //   obj_in.record[1].id
                                                      // )
                                                    }}
                                                  ></input>
                                                  <div className="btnsrc vlpointer">
                                                    <i
                                                      className="fa fa-search"
                                                      onClick={(e) => {
                                                        this.clickRefrence(
                                                          e,
                                                          obj_in.record[1].id,
                                                          obj_in.record[1].name,
                                                          obj_in.record[1].type,
                                                          index,
                                                          index_in,
                                                          obj_in.record[1].label
                                                        );
                                                        //   setcolumn(
                                                        //   index,
                                                        //   index_in,
                                                        //   obj_in.record[1].name,
                                                        //   obj_in.record[1].type,
                                                        //   obj_in.record[1].id
                                                        // )
                                                      }}
                                                    ></i>
                                                  </div>
                                                </div>
                                              </div>
                                              {this.state.refrecord.index ===
                                                index &&
                                                this.state.refrecord.record
                                                  .length > 0 && (
                                                  <div
                                                    style={{
                                                      position: "absolute",
                                                    }}
                                                  >
                                                    {this.state.refrecord.record.map(
                                                      (obj_ref, or_i) => (
                                                        <div
                                                          className="refrcd"
                                                          onClick={(e) => {
                                                            this.setRefrecord(
                                                              obj_ref.value,
                                                              index,
                                                              index_in,
                                                              obj_in.record[1]
                                                                .name,
                                                              obj_in.record[1]
                                                                .type,
                                                              obj_ref.id
                                                            );
                                                          }}
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
                                        </td>
                                        <td></td>
                                      </tr>
                                    ))
                                  )}
                                  <div className="mt-1">
                                    {this.state.ier_button.map((btn, btn_i) => (
                                      <div>
                                        <button
                                          className="csm_btn csm_btn_pri col-md-5 sub-btn mx-1"
                                          key={btn_i}
                                          onClick={(e) =>
                                            this.callbtnImp(obj, index)
                                          }
                                        >
                                          {btn.name}
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CheckListComponent;
