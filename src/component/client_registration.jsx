// import { Button } from "bootstrap";
import React, { Component } from "react";
import axios from "axios";
import "../css/clientregistration.css";
import WorkInProgress from "./work_in_progress";
import SubClient from "./subclient";
import { Tab, Nav, Col, Row } from "react-bootstrap"; //Modal, Button,

class ClientRegistration extends Component {
  state = {
    record: [],
    rcd: [],
    address: [],
    button: [],
    name: "",
    jobj: {},
    percentage: 100,
    tabname: this.props.tabname,
    rid: this.props.rid,
    rty: this.props.ty,
    loca: this.props.loca,
    value: new Date(),
    // mainrecord: {},
    page_error: false,
    loading: false,
    error: "",
    workshop: [],
    worker: [],
    loom: [],
    multiworkshop: [],
    multiworkshop_rcd: [],
    page1: true,
    page2: false,
    page3: false,
    page4: false,
    tab: 0,
    

    jobj4: {
      formRecord: [
        {
          application: {
            id: "",
            value: "loom",
          },
        },
        {
          table: {
            id: "69",
            value: "ClientRegistration",
          },
        },
        {
          record: [
            {
              id: "841",
              name: "worker_loom_mapping",
              label: "Worker Loom Mapping",
              value: "",
              type: "int",
              dependent: "false",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },

              depend: {
                id: "",
                name: "",
              },
              dependvalues: [],
            },
          ],
        },
        {
          button: [
            {
              name: "Next4",
              value: "next4",
              activity: "List",
              // activityApiUrl: "/loom/initial/setup/record2",
              buttonTypeActivity: "NextActivity",
              buttonWebType: "NextPage",
              // webUrl: "/loom/initial/setup/record",
              apiType: "Post",
              nextPage: "List",
            },
          ],
        },
      ],
    },

    jobj3: {
      formRecord: [
        {
          application: {
            id: "",
            value: "loom",
          },
        },
        {
          table: {
            id: "69",
            value: "ClientRegistration",
          },
        },
        {
          record: [
            {
              id: "840",
              name: "number_of_worker",
              label: "Number_Of_Worker",
              value: "",
              type: "int",
              dependent: "false",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },

              depend: {
                id: "840",
                name: "Number_Of_Worker",
              },
              dependvalues: [],
            },
            {
              id: "839",
              name: "worker",
              label: "Worker",
              value: "",
              type: "Choice",
              dependent: "true",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              choice: [],
              depend: {
                id: "840",
                name: "number_of_worker",
              },
              dependvalues: [],
            },
            {
              id: "8440",
              name: "shift",
              label: "Shift",
              value: "",
              type: "Choice",
              dependent: "true",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              choice: [
                {
                  id: "",
                  name: "Day",
                  value: "day",
                },
                {
                  id: "",
                  name: "Night",
                  value: "night",
                },
              ],
              depend: {
                id: "840",
                name: "number_of_worker",
              },
              dependvalues: [],
            },

            {
              id: "841",
              name: "number_of_loom",
              label: "Number of Loom",
              value: "",
              type: "Choice",
              dependent: "true",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              choice: [
                {
                  id: "",
                  name: "1",
                  value: "1",
                },
                {
                  id: "",
                  name: "2",
                  value: "2",
                },
                {
                  id: "",
                  name: "3",
                  value: "3",
                },
                {
                  id: "",
                  name: "4",
                  value: "4",
                },
                {
                  id: "",
                  name: "5",
                  value: "5",
                },
                {
                  id: "",
                  name: "6",
                  value: "6",
                },
                {
                  id: "",
                  name: "7",
                  value: "7",
                },
                {
                  id: "",
                  name: "8",
                  value: "8",
                },
                {
                  id: "",
                  name: "9",
                  value: "9",
                },
                {
                  id: "",
                  name: "10",
                  value: "10",
                },
                {
                  id: "",
                  name: "11",
                  value: "11",
                },
                {
                  id: "",
                  name: "12",
                  value: "12",
                },
              ],
              depend: {
                id: "840",
                name: "number_of_worker",
              },
              dependvalues: [],
            },
          ],
        },
        {
          button: [
            {
              name: "Next3",
              value: "next3",
              activity: "List",
              activityApiUrl: "/loom/initial/setup/record3",
              buttonTypeActivity: "NextActivity",
              buttonWebType: "NextPage",
              webUrl: "/loom/initial/setup/record3",
              apiType: "Post",
              nextPage: "List",
            },
          ],
        },
      ],
    },

    jobj2: {
      formRecord: [
        {
          application: {
            id: "",
            value: "loom",
          },
        },
        {
          table: {
            id: "69",
            value: "ClientRegistration",
          },
        },
        {
          record: [
            {
              id: "839",
              name: "no_of_worker",
              label: "No_of_Worker",
              value: "",
              type: "int",
              dependent: "false",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              depend: {
                id: "839",
                name: "no_of_worker",
              },
              dependvalues: [],
            },
            {
              id: "840",
              name: "worker_name",
              label: "Worker Name",
              value: "",
              type: "String",
              dependent: "true",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              depend: {
                id: "839",
                name: "no_of_worker",
              },
              dependvalues: [],
            },

            {
              id: "841",
              name: "worker_id",
              label: "Id (Addhar/Pan)",
              value: "",
              type: "int",
              dependent: "true",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              depend: {
                id: "839",
                name: "no_of_worker",
              },
              dependvalues: [],
            },
            {
              id: "842",
              name: "mobilenumber",
              label: "MobileNumber",
              value: "",
              type: "int",
              dependent: "true",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              depend: {
                id: "839",
                name: "no_of_worker",
              },
              dependvalues: [],
            },
            {
              id: "830",
              name: "WorkShop",
              label: "Work Shop",
              value: "",
              type: "Choice",
              dependent: "true",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              choice: [],
              depend: {
                id: "839",
                name: "no_of_worker",
              },
              dependvalues: [],
            },
          ],
        },
        {
          button: [
            {
              name: "Next2",
              value: "next2",
              activity: "List",
              activityApiUrl: "/loom/initial/setup/record2",
              buttonTypeActivity: "NextActivity",
              buttonWebType: "NextPage",
              webUrl: "/loom/initial/setup/record2",
              apiType: "Post",
              nextPage: "List",
            },
          ],
        },
      ],
    },

    jobj1: {
      formRecord: [
        {
          application: {
            id: "",
            value: "loom",
          },
        },
        {
          table: {
            id: "69",
            value: "ClientRegistration",
          },
        },
        {
          record: [
            {
              id: "827",
              name: "id",
              label: "Id",
              value: "",
              type: "int",
              dependent: "false",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "100",
                read_only: "false",
                visible: "false",
              },
              depend: {
                id: "",
                name: "",
              },
              dependvalues: [],
            },
            {
              id: "828",
              name: "name",
              label: "Name",
              value: "",
              type: "String",
              dependent: "false",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              depend: {
                id: "",
                name: "",
              },
              dependvalues: [],
            },
            {
              id: "829",
              name: "active",
              label: "Active",
              value: "false",
              type: "boolean",
              dependent: "false",
              multivalue: "false",
              uivalid: {
                mandatory: "false",
                max_length: "5",
                read_only: "false",
                visible: "false",
              },
              depend: {
                id: "",
                name: "",
              },
              dependvalues: [],
            },
            {
              id: "832",
              name: "created",
              label: "Created",
              value: "",
              type: "datetime",
              dependent: "false",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "30",
                read_only: "false",
                visible: "false",
              },
              depend: {
                id: "",
                name: "",
              },
              dependvalues: [],
            },
            {
              id: "833",
              name: "created_by",
              label: "Created By",
              value: "",
              type: "String",
              dependent: "false",
              multivalue: "false",
              uivalid: {
                mandatory: "false",
                max_length: "100",
                read_only: "false",
                visible: "false",
              },
              depend: {
                id: "",
                name: "",
              },
              dependvalues: [],
            },
            {
              id: "834",
              name: "updated",
              label: "Updated",
              value: "",
              type: "datetime",
              dependent: "false",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "30",
                read_only: "false",
                visible: "false",
              },
              depend: {
                id: "",
                name: "",
              },
              dependvalues: [],
            },
            {
              id: "835",
              name: "updated_by",
              label: "Updated By",
              value: "",
              type: "String",
              dependent: "false",
              multivalue: "false",
              uivalid: {
                mandatory: "false",
                max_length: "100",
                read_only: "false",
                visible: "false",
              },
              depend: {
                id: "",
                name: "",
              },
              dependvalues: [],
            },
            {
              id: "836",
              name: "no_of_workshop",
              label: "Number Of Workshop",
              value: "",
              type: "int",
              dependent: "false",
              multivalue: "false",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              verified: "initial",
            },
            {
              id: "837",
              name: "workshopAddress",
              label: "Workshop Address",
              value: "",
              type: "String",
              dependent: "true",
              multivalue: "true",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              depend: {
                id: "836",
                name: "no_of_workshop",
              },
              dependvalues: [],
            },
            {
              id: "838",
              name: "no_of_loom",
              label: "Number Of Loom",
              value: "",
              type: "int",
              dependent: "true",
              multivalue: "true",
              uivalid: {
                mandatory: "true",
                max_length: "10",
                read_only: "false",
                visible: "true",
              },
              depend: {
                id: "836",
                name: "no_of_workshop",
              },
              dependvalues: [],
            },
          ],
        },
        {
          button: [
            {
              name: "Next",
              value: "next1",
              activity: "List",
              activityApiUrl: "/loom/initial/setup/record",
              buttonTypeActivity: "NextActivity",
              buttonWebType: "NextPage",
              webUrl: "/loom/initial/setup/record",
              apiType: "Post",
              nextPage: "List",
            },
          ],
        },
      ],
    },
  };

  constructor(props) {
    super(props);
    this.formChangefn = this.formChangefn.bind(this);
    this.onCh = this.onCh.bind(this);
    this.callbtn = this.callbtn.bind(this);
    this.validationfn = this.validationfn.bind(this);
    this.copyparent = this.copyparent.bind(this);
    this.setform = this.setform.bind(this);
    this.show_tab = this.show_tab.bind(this);
    this.formChange_rcd = this.formChange_rcd.bind(this);
    this.validation = this.validation.bind(this);
  }

  componentDidMount() {
    this.setform(this.state.jobj1, "", "");
  }

  setform(jobj, rtn, btn) {
    var rcd = [];
    for (var i = 0; i < jobj.formRecord[2].record.length; i++) {
      jobj.formRecord[2].record[i].verified = "initial";
      rcd[i] = {
        column: [JSON.parse(JSON.stringify(jobj.formRecord[2].record[i]))],
      };
    }

    if (btn === "next1") {
      var val = rtn.Workshop;
      var lom = rtn.Loom;
      var charr = [];
      for (var j = 0; j < val.length; j++) {
        charr.push({
          id: val[j].id,
          name: val[j].name,
          value: val[j].name,
        });
      }
      jobj.formRecord[2].record[4].choice = charr;
      rcd[4].column[0].choice = charr;

      // var loom = [];
      // for (var jj = 0; jj < lom.length; jj++) {
      //   loom.push({
      //     id: lom[jj].id,
      //     name: lom[jj].name,
      //     value: lom[jj].name,
      //   });
      // }

      // jobj.formRecord[2].record[4].choice = charr;
      this.setState({
        loading: false,
        jobj: jobj,
        rcd: rcd,
        workshop: val,
        loom: lom,
        record: jobj.formRecord[2].record,
        button: jobj.formRecord[3].button,
        page1: false,
        page2: true,
        page3: false,
        page4: false,
      });
    } else if (btn === "next2") {
      var charr2 = [];
      var val2 = rtn.Worker;
      for (var jj2 = 0; jj2 < val2.length; jj2++) {
        charr2.push({
          id: val2[jj2].id,
          name: val2[jj2].name,
          value: val2[jj2].name,
        });
      }
      jobj.formRecord[2].record[1].choice = charr2;
      rcd[1].column[0].choice = charr2;
      var multiworkshop = this.state.multiworkshop;
      var multiworkshop_rcd = this.state.multiworkshop_rcd;
      for (var t = 0; t < this.state.workshop.length; t++) {
        multiworkshop.push(JSON.parse(JSON.stringify(jobj)));
        multiworkshop_rcd.push(JSON.parse(JSON.stringify(rcd)));
      }

      this.setState({
        loading: false,
        jobj: jobj,
        rcd: rcd,
        worker: val,
        record: jobj.formRecord[2].record,
        button: jobj.formRecord[3].button,
        page1: false,
        page2: false,
        page3: true,
        page4: false,
        multiworkshop_rcd: multiworkshop_rcd,
        multiworkshop: multiworkshop,
      });
    } else if (btn === "next3") {
      this.setState({
        loading: false,
        jobj: jobj,
        rcd: rcd,
        record: jobj.formRecord[2].record,
        button: jobj.formRecord[3].button,
        page1: false,
        page2: false,
        page3: false,
        page4: true,
      });
    } else {
      this.setState({
        loading: false,
        jobj: jobj,
        rcd: rcd,
        record: jobj.formRecord[2].record,
        button: jobj.formRecord[3].button,
        page1: true,
        page2: false,
        page3: false,
        page4: false,
      });
    }
  }

  fieldverify(type, vl) {
    if (type === "String") {
      // if (/[a-zA-Z]/g.test(vl)) {
      return "verified";
      // } else {
      //   return "unverified";
      // }
    }
    if (type === "int") {
      if (/^[0-9]*[0-9][0-9]*$/.test(vl)) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "boolean") {
      if (
        /^(\d\d) - (\?\?|10|0\d):(\?\?|[0-5]\d):(\?\?|[0-5]\d) - (.*)/.test(vl)
      ) {
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
    if (type === "time") {
      if (
        /^(0(?:[1-9]|$)|1(?:[0-2]|$))(?:(:)(?:([0-5])(?:([0-9])(?:(\s)([ap]m?)?)?)?)?)?$/.test(
          vl
        )
      ) {
        return "verified";
      } else {
        return "unverified";
      }
    }
    if (type === "email") {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(vl)) {
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

  validationfn(vl, index, ob, e, ind) {
    var fomecord = this.state.rcd;
    if (fomecord[index].column[ind].name === ob) {
      if (vl !== "") {
        fomecord[index].column[ind].verified = this.fieldverify(
          fomecord[index].column[ind].type,
          vl,
          ind
        );
      } else {
        fomecord[index].column[ind].verified = "initial";
      }
    }

    this.setState({ rcd: fomecord });
  }

  validation(vl, index, ob, e, ind, rcdindex) {
    var fomecord = this.state.multiworkshop_rcd;
    if (fomecord[rcdindex][index].column[ind].name === ob) {
      if (vl !== "") {
        fomecord[rcdindex][index].column[ind].verified = this.fieldverify(
          fomecord[rcdindex][index].column[ind].type,
          vl,
          ind
        );
      } else {
        fomecord[rcdindex][index].column[ind].verified = "initial";
      }
    }

    this.setState({ rcd: fomecord });
  }

  callbtn(nam) {
    var btn = this.state.button;
    var record = this.state.record;
    var rcd = this.state.rcd;
    var jobj = this.state.jobj;
    var mandatory = [];
    var unverified = [];
    for (var i = 0; i < rcd.length; i++) {
      var arr = [];
      var vll = "";
      for (var j = 0; j < rcd[i].column.length; j++) {
        if (rcd[i].column[j].uivalid.visible === "true") {
          if (rcd[i].column[j].uivalid.mandatory === "true") {
            if (rcd[i].column[j].value === "") {
              mandatory.push(rcd[i].column[j].name);
            }
          }

          if (
            rcd[i].column[j].type === "int" ||
            rcd[i].column[j].type === "String" ||
            rcd[i].column[j].type === "email" ||
            rcd[i].column[j].type === "Date"
          ) {
            var veri = this.fieldverify(
              rcd[i].column[j].type,
              rcd[i].column[j].value
            );
            if (veri === "unverified") {
              unverified.push(rcd[i].column[j].name);
            }
          }

          if (rcd[i].column[j].dependent === "true") {
            arr.push(rcd[i].column[j].value);
          } else {
            vll = rcd[i].column[j].value;
          }
        }
      }
      if (record[i].dependent === "true") {
        record[i].dependvalues = arr;
      } else {
        record[i].value = vll;
      }
    }

    jobj.formRecord[2].record = record;
    for (var ij = 0; ij < btn.length; ij++) {
      if (btn[ij].name === nam) {
        var btntype = btn[ij].buttonWebType;
        var token = localStorage.getItem("token");
        if (btntype === "NextPage") {
          if (mandatory.length === 0 && unverified.length === 0) {
            if (nam === "next1") {
              this.setState({ loading: true, jobj1: jobj });
            } else if (nam === "next2") {
              this.setState({ loading: true, jobj2: jobj });
            } else if (nam === "next3") {
              this.setState({ loading: true, jobj3: jobj });
            }
            axios
              .post(this.state.loca + btn[ij].webUrl, jobj, {
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
                    if (nam === "next1") {
                      this.setform(this.state.jobj2, rcd, "next1");
                    } else if (nam === "next2") {
                      this.setform(this.state.jobj3, rcd, "next2");
                    } else if (nam === "next3") {
                      this.setform(this.state.jobj4, rcd, "next3");
                    }
                  }
                }
              });
          }
        }
      }
    }
  }

  copyparent(index, ind) {
    var frcd = this.state.rcd;
    var vall = frcd[index].column[ind - 1].value;
    if (vall !== "") {
      frcd[index].column[ind].value = vall;
    }
    this.setState({
      rcd: frcd,
    });
  }

  onCh(val) {
    this.setState({ value: val });
  }

  formChangefn(vl, index, ob, ind) {
    var frcd = this.state.rcd;
    var frecord = this.state.record;
    if (frcd[index].column[ind].name === ob) {
      frcd[index].column[ind].value = vl;
    }
    for (var ii = 0; ii < frecord.length; ii++) {
      if (frecord[ii].dependent === "true") {
        if (frecord[ii].depend.id === frcd[index].column[ind].id) {
          frcd[ii].column = [];
          frcd[ii].column.push(JSON.parse(JSON.stringify(frecord[ii])));
          for (var ij = 1; ij < vl; ij++) {
            let fff = JSON.parse(JSON.stringify(frecord[ii]));
            frcd[ii].column.push(fff);
          }
          // for (var ik = 0; ik < frecord.length; ik++) {
          // 	if (frecord[ik].dependent === "true") {
          // 		if (frecord[ik].depend.id === frecord[ii].id) {
          // 			frcd[ik].column = [];
          // 			frcd[ik].column.push(frecord[ik]);
          // 			for (var im = 1; im < vl; im++) {
          // 				let kkk = JSON.parse(JSON.stringify(frecord[ik]));
          // 				frcd[ik].column.push(kkk);
          // 			}
          // 		}
          // 	}
          // }
        }
      }
    }
    // if (frecord[index].column[ind].dependent === "true") {
    // 	if (ob.dependent === "true") {
    // 		if (ob.multivalue === "true") {
    // 		}
    // 	}
    // }
    this.setState({ rcd: frcd });
  }

  formChange_rcd(vl, index, ob, ind, rcdindex) {
    var frcd = this.state.multiworkshop_rcd;
    if (frcd[rcdindex][index].column[ind].name === ob) {
      frcd[rcdindex][index].column[ind].value = vl;
    }
    for (var ii = 0; ii < frcd[rcdindex].length; ii++) {
      if (frcd[rcdindex][ii].column[0].dependent === "true") {
        if (
          frcd[rcdindex][ii].column[0].depend.id ===
          frcd[rcdindex][index].column[ind].id
        ) {
          var clm = frcd[rcdindex][ii].column[0];
          frcd[rcdindex][ii].column = [];
          frcd[rcdindex][ii].column.push(clm);
          for (var ij = 1; ij < vl; ij++) {
            let fff = JSON.parse(JSON.stringify(clm));
            frcd[rcdindex][ii].column.push(fff);
          }
        }
      }
    }
    this.setState({ rcd: frcd });
  }

  callbtn_rcd(nam) {
    var btn = this.state.button;
    var record = this.state.record;
    var rcd = this.state.multiworkshop_rcd;
    var jobj = this.state.jobj;
    var mandatory = [];
    var unverified = [];
    for (var i = 0; i < rcd.length; i++) {
      for (var k = 0; k < rcd[i].length; k++) {
        var arr = [];
        var vll = "";
        for (var j = 0; j < rcd[i][k].column.length; j++) {
          if (rcd[i][k].column[j].uivalid.visible === "true") {
            if (rcd[i][k].column[j].uivalid.mandatory === "true") {
              if (rcd[i][k].column[j].value === "") {
                mandatory.push(rcd[i][k].column[j].name);
              }
            }

            if (
              rcd[i][k].column[j].type === "int" ||
              rcd[i][k].column[j].type === "String" ||
              rcd[i][k].column[j].type === "email" ||
              rcd[i][k].column[j].type === "Date"
            ) {
              var veri = this.fieldverify(
                rcd[i][k].column[j].type,
                rcd[i][k].column[j].value
              );
              if (veri === "unverified") {
                unverified.push(rcd[i][k].column[j].name);
              }
            }

            if (rcd[i][k].column[j].dependent === "true") {
              arr.push(rcd[i][k].column[j].value);
            } else {
              vll = rcd[i][k].column[j].value;
            }
          }
        }
      }

      if (record[i].dependent === "true") {
        record[i].dependvalues = arr;
      } else {
        record[i].value = vll;
      }
    }

    jobj.formRecord[2].record = record;
    for (var ij = 0; ij < btn.length; ij++) {
      if (btn[ij].value === nam) {
        var btntype = btn[ij].buttonWebType;
        var token = localStorage.getItem("token");
        if (btntype === "NextPage") {
          if (mandatory.length === 0 && unverified.length === 0) {
            if (nam === "next1") {
              this.setState({ loading: true, jobj1: jobj });
            } else if (nam === "next2") {
              this.setState({ loading: true, jobj2: jobj });
            } else if (nam === "next3") {
              this.setState({ loading: true, jobj3: jobj });
            }
            axios
              .post(this.state.loca + btn[ij].webUrl, jobj, {
                headers: {
                  "Content-Type": "application/json",
                  authorization: "Bearer " + token,
                },
              })
              .then((resp) => {
                const rcd = resp.data;
                if (nam === "next1") {
                  this.setform(this.state.jobj2, rcd, "next1");
                } else if (nam === "next2") {
                  this.setform(this.state.jobj3, rcd, "next2");
                } else if (nam === "next3") {
                  this.setform(this.state.jobj4, rcd, "next3");
                }
              });
          }
        }
      }
    }
  }

  show_tab(tab) {
    this.setState({ tab: tab });
  }

  render() {
    return (
      <div className=" form-control pagesetup">
        <div className=" maincompo ">
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
              {this.state.page3 === true ? (
                <div className="">
                  <div className="tab-content">
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey={this.state.workshop[0].name}
                    >
                      <Nav variant="pills" className="flex-column">
                        <Row className="rw">
                          {this.state.workshop.map((nama, tab_ia) => (
                            <Col md={1} key={tab_ia} className="nopad">
                              <Nav.Item className="cur">
                                <Nav.Link eventKey={nama.name}>
                                  {nama.name}
                                </Nav.Link>
                              </Nav.Item>
                            </Col>
                          ))}
                        </Row>
                      </Nav>

                      <Tab.Content>
                        {this.state.workshop.map((nam, tab_i) => (
                          <Tab.Pane key={tab_i} eventKey={nam.name}>
                            <SubClient
                              handler={this.setform}
                              page_error={this.state.page_error}
                              error={this.state.error}
                              record={
                                this.state.multiworkshop[tab_i].formRecord[2]
                                  .record
                              }
                              // record={this.state.record}
                              rcd={this.state.multiworkshop_rcd[tab_i]}
                              // rcd={this.state.rcd}
                              button={this.state.button}
                              validationfn={(vl, index, ob, e, ind) =>
                                this.validation(vl, index, ob, e, ind, tab_i)
                              }
                              formChangefn={(vl, index, ob, ind) =>
                                this.formChange_rcd(vl, index, ob, ind, tab_i)
                              }
                              callbtn={(nam) => this.callbtn_rcd(nam)}
                              copyparent={(index, ind) =>
                                this.copyparent(index, ind)
                              }
                            ></SubClient>
                          </Tab.Pane>
                        ))}
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                  {/* <ul className="nav nav-tabs">
										{this.state.workshop.map((nam, tab_i) => (
											<button
												className="tabmodify"
												onClick={() => this.show_tab(tab_i)}
												key={tab_i}
											>
												{nam.name}
											</button>
										))}
									</ul>
									<div className="tab-content">
										{this.state.workshop.map((nam, ta_i) => (
											<div key={ta_i}>
												{this.state.tab === ta_i && (
													<div>
														<SubClient
															handler={this.setform}
															page_error={this.state.page_error}
															error={this.state.error}
															record={
																this.state.multiworkshop[ta_i].formRecord[2]
																	.record
															}
															// record={this.state.record}
															rcd={this.state.multiworkshop_rcd[ta_i]}
															// rcd={this.state.rcd}
															button={this.state.button}
															validationfn={(vl, index, ob, e, ind) =>
																this.validation(vl, index, ob, e, ind, ta_i)
															}
															formChangefn={(vl, index, ob, ind) =>
																this.formChange_rcd(vl, index, ob, ind, ta_i)
															}
															callbtn={(nam) => this.callbtn(nam)}
															copyparent={(index, ind) =>
																this.copyparent(index, ind)
															}
														></SubClient>
													</div>
												)}
											</div>
										))}
									</div> */}
                </div>
              ) : null}
              {this.state.page4 === true ? (
                <div className="">
                  <ul className="nav nav-tabs">
                    {this.state.worker.map((nam, tab_i) => (
                      <button
                        className="tabmodify"
                        onClick={() => this.show_tab(tab_i)}
                        key={tab_i}
                      >
                        {nam.name}
                      </button>
                    ))}
                  </ul>
                  <div className="">
                    {this.state.worker.map((nam, ta_i) => (
                      <div key={ta_i}>
                        {this.state.tab === ta_i && (
                          <div>
                            <SubClient
                              handler={this.setform}
                              page_error={this.state.page_error}
                              error={this.state.error}
                              record={this.state.record}
                              rcd={this.state.rcd}
                              button={this.state.button}
                              validationfn={(vl, index, ob, e, ind) =>
                                this.validationfn(vl, index, ob, e, ind)
                              }
                              formChangefn={(vl, index, ob, ind) =>
                                this.formChange_rcd(vl, index, ob, ind)
                              }
                              callbtn={(nam) => this.callbtn(nam)}
                              copyparent={(index, ind) =>
                                this.copyparent(index, ind)
                              }
                            ></SubClient>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {this.state.page1 === true || this.state.page2 === true ? (
                <div>
                  <SubClient
                    handler={this.setform}
                    page_error={this.state.page_error}
                    error={this.state.error}
                    record={this.state.record}
                    rcd={this.state.rcd}
                    button={this.state.button}
                    validationfn={(vl, index, ob, e, ind) =>
                      this.validationfn(vl, index, ob, e, ind)
                    }
                    formChangefn={(vl, index, ob, ind) =>
                      this.formChangefn(vl, index, ob, ind)
                    }
                    callbtn={(nam) => this.callbtn(nam)}
                    copyparent={(index, ind) => this.copyparent(index, ind)}
                  ></SubClient>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ClientRegistration;
