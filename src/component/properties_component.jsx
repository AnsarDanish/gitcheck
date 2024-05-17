import React, { Component } from "react";
import axios from "axios";
import WorkInProgress from "./work_in_progress";
import "../css/other.css";
import { toast } from "react-toastify";

class PropertiesComponent extends Component {
  state = {
    record: [],
    button: [],
    uivalid: [],
    choice: [],
    loading: false,
    page_error: false,
    error: "",
    page_message: false,
    message: "",
    mainrecord: {},
    loca: this.props.loca,
  };

  constructor(props) {
    super(props);
    this.callbtn = this.callbtn.bind(this);
    this.formChangefn = this.formChangefn.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    this.setState({ loading: true });

    axios
      .get(this.state.loca + "/loom/get/clientproperties/records", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        const sysrecord = resp.data;
        if (sysrecord !== "") {
          if ("Error" in sysrecord) {
          } else {
            console.log(sysrecord);
            this.setState({
              loading: false,
              record: sysrecord.propertiesRecord[0].records,
              uivalid: sysrecord.propertiesRecord[1].uivalid,
              choice: sysrecord.propertiesRecord[2].choice,
              button: sysrecord.propertiesRecord[3].button,
              mainrecord: sysrecord,
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
    // var rcd = this.state.record;
    var btntype = "";
    var foundbtn = false;
    for (var ij = 0; ij < btn.length; ij++) {
      if (btn[ij].name === nam) {
        btntype = btn[ij].buttonWebType;
        foundbtn = true;
        break;
      }
    }
    if (foundbtn === true && btntype !== "") {
      // if (mandatory.length === 0 && unverified.length === 0) {
      this.setState({
        page_error: false,
        error: "",
        loading: true,
        page_message: false,
        message: "",
      });

      mnrecord.propertiesRecord[0].records = this.state.record;
      var token = localStorage.getItem("token");
      if (btn[ij].call_type === "run_scrip") {
        var json =
          '{"rcd_Button":[' +
          JSON.stringify(btn[ij]) +
          "," +
          JSON.stringify(mnrecord) +
          "]}";
        axios
          .post(this.state.loca + btn[ij].webUrl, json, {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            },
          })
          .then((resp) => {
            const rcd = resp.data;
            this.setState({ loading: false });
            var msg = rcd.propertiesRecord[4].message;
            if (msg !== null) {
              toast(msg, {
                position: "top-center",
                theme: "colored",
                type: "success",
              });
            }
            // if (msg !== "") {
            //   this.setState({ page_message: true, message: msg });
            // }
            if (btntype === "NextPage") {
              var nextP = rcd.propertiesRecord[3].button.nextPage;
              if (nextP === "List") {
                this.callNextPage();
              }
            }
          });
      } else {
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
            var msg = rcd.propertiesRecord[4].message;
            if (msg !== null) {
              toast(msg, {
                position: "top-center",
                theme: "colored",
                type: "success",
              });
            }
            // if (msg !== "") {
            //   this.setState({ page_message: true, message: msg });
            // }
            if (btntype === "NextPage") {
              var nextP = rcd.propertiesRecord[3].button.nextPage;
              if (nextP === "List") {
                this.callNextPage();
              }
            }
          });
      }
      // } else {
      // 	var error_String = "";
      // 	if (mandatory.length > 0) {
      // 		error_String += " Check mandatory fields not set: " + mandatory;
      // 	}
      // 	if (unverified.length > 0) {
      // 		error_String += " Fields unverified:" + unverified;
      // 	}
      // 	this.setState({
      // 		page_error: true,
      // 		error: error_String,
      // 	});
      // 	document.body.scrollTop = 0;
      // 	document.documentElement.scrollTop = 0;
      // }
    }
  }

  formChangefn(vl, index, obj_i, ob) {
    var frecord = this.state.record;

    if (frecord[index].record[obj_i].name === ob) {
      frecord[index].record[obj_i].value = vl;
      this.setState({ record: frecord });
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
            {this.state.record.length === 0 && <div>No Record Found</div>}
            {this.state.record.map((obj, index) => (
              <div className="" key={index}>
                {obj.record.map((obji, obj_i) => (
                  <div className="" key={obj_i}>
                    {obji.type === "String" ? (
                      <div className="">
                        {obji.name === "name" && (
                          <div className="lab">{obji.value}</div>
                        )}
                        {obji.name === "value" && (
                          // <div>
                          // 	{this.state.uivalid[obj_i]}
                          <input
                            type="text"
                            className="labval"
                            value={obji.value}
                            readOnly={
                              this.state.uivalid[obj_i].read_only === "true"
                            }
                            maxLength={this.state.uivalid[obj_i].max_length}
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                obj_i,
                                obji.name
                              )
                            }
                          ></input>
                          // </div>
                        )}
                      </div>
                    ) : null}
                    {obji.type === "int" ? (
                      <div className="">
                        {obji.name === "name" && <span>{obji.value}</span>}
                        {obji.name === "value" && (
                          <input
                            type="text"
                            value={obji.value}
                            readOnly={
                              this.state.uivalid[obj_i].read_only === "true"
                            }
                            maxLength={this.state.uivalid[obj_i].max_length}
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                obj_i,
                                obji.name
                              )
                            }
                          ></input>
                        )}
                      </div>
                    ) : null}
                    {obji.type === "date" ? (
                      <div className="">
                        {obji.name === "name" && <span>{obji.value}</span>}
                        {obji.name === "value" && (
                          <input
                            type="date"
                            value={obji.value}
                            readOnly={
                              this.state.uivalid[obj_i].read_only === "true"
                            }
                            maxLength={this.state.uivalid[obj_i].max_length}
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                obj_i,
                                obji.name
                              )
                            }
                          ></input>
                        )}
                        {obji.name === "name" && <span>{obji.value}</span>}
                        {obji.name === "value" && (
                          <input
                            type="time"
                            value={obji.value}
                            readOnly={
                              this.state.uivalid[obj_i].read_only === "true"
                            }
                            maxLength={this.state.uivalid[obj_i].max_length}
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                obj_i,
                                obji.name
                              )
                            }
                          ></input>
                        )}
                      </div>
                    ) : null}
                    {obji.type === "boolean" ? (
                      <div className="">
                        {obji.name === "name" && <span>{obji.value}</span>}
                        {obji.name === "value" && (
                          <input
                            type="checkbox"
                            value={obji.value === "true" ? true : false}
                            readOnly={
                              this.state.uivalid[obj_i].read_only === "true"
                            }
                            maxLength={this.state.uivalid[obj_i].max_length}
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                obj_i,
                                obji.name
                              )
                            }
                          ></input>
                        )}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
            <div className=" form-group ">
              {this.state.button.map((objb, ob_i) => (
                <button
                  style={{ lineHeight: "1em" }}
                  className=" insrtbtn btn btn-primary mar10"
                  key={ob_i}
                  onClick={(e) => this.callbtn(objb.name)}
                >
                  {objb.value}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PropertiesComponent;
