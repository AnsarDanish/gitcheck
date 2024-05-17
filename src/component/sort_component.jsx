import React, { Component } from "react";
import axios from "axios";
import "../css/sortcompo.css";
import WorkInProgress from "./work_in_progress";

class SortComponent extends Component {
  state = {
    list: [],
    listt: [],
    name: "",
    tableName: "",
    showList: true,
    loading: false,
    sortedName: this.props.sortedName,
    taskName:this.props.taskName,
    url: this.props.url,
    page_error: false,
    error: "",
    loca: this.props.loca,
    isMobile: this.props.isMobile,
  };

  constructor(props) {
    super(props);
    this.callform = this.callform.bind(this);
    this.callList = this.callList.bind(this);
    this.backButton = this.backButton.bind(this);
  }

  componentDidMount() {
    console.log("taskName" ,this.state.taskName);
    var token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(this.state.loca + "/loom/sorted/" + this.state.sortedName, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          const list = resp.data;
          console.log(list);
          if (list !== "") {
            if ("Error" in list) {
              this.setState({
                loading: false,
                page_error: true,
                error: list.Error,
              });
            } else {
              var columnarry1 = [];

              for (var ii = 0; ii < list.sortedrecord.value.length; ii++) {

                if(list.sortedrecord.value[ii].name!==this.state.taskName)
                   continue
                var hd = [];
                var va_l = [];
                var tab = list.sortedrecord.value[ii].loomtable.value;
                for (
                  var jj = 0;
                  jj < list.sortedrecord.value[ii].records.length;
                  jj++
                ) {
                  var in_vl = [];
                  var record_id;
                  for (
                    var kk = 0;
                    kk < list.sortedrecord.value[ii].records[jj].record.length;
                    kk++
                  ) {
                    if (jj === 0) {
                      if (kk === 0) {
                      } else {
                        hd.push({
                          label:
                            list.sortedrecord.value[ii].records[jj].record[kk]
                              .label,
                          name: list.sortedrecord.value[ii].records[jj].record[
                            kk
                          ].name,
                        });
                      }
                    }
                    if (kk === 0) {
                      record_id =
                        list.sortedrecord.value[ii].records[jj].record[kk]
                          .value;
                    } else if (kk === 1) {
                      if (
                        list.sortedrecord.value[ii].records[jj].record[kk]
                          .type === "reference"
                      ) {
                        in_vl.push({
                          value:
                            list.sortedrecord.value[ii].records[jj].record[kk]
                              .value.value,
                          type: list.sortedrecord.value[ii].records[jj].record[
                            kk
                          ].type,
                          firstrecord: true,
                          table: tab,
                          r_id: record_id,
                        });
                      } else {
                        in_vl.push({
                          value:
                            list.sortedrecord.value[ii].records[jj].record[kk]
                              .value,
                          type: list.sortedrecord.value[ii].records[jj].record[
                            kk
                          ].type,
                          firstrecord: true,
                          table: tab,
                          r_id: record_id,
                        });
                      }
                    } else {
                      if (
                        list.sortedrecord.value[ii].records[jj].record[kk]
                          .type === "reference"
                      ) {
                        in_vl.push({
                          value:
                            list.sortedrecord.value[ii].records[jj].record[kk]
                              .value.value,
                          type: list.sortedrecord.value[ii].records[jj].record[
                            kk
                          ].type,
                          firstrecord: false,
                          table: tab,
                          r_id: record_id,
                        });
                      } else {
                        in_vl.push({
                          value:
                            list.sortedrecord.value[ii].records[jj].record[kk]
                              .value,
                          type: list.sortedrecord.value[ii].records[jj].record[
                            kk
                          ].type,
                          firstrecord: false,
                          table: tab,
                          r_id: record_id,
                        });
                      }
                    }
                  }
                  va_l.push({ colr: in_vl });
                }
                var filter = "";
                if (
                  list.sortedrecord.value[ii].list_filter !== "null" &&
                  list.sortedrecord.value[ii].list_filter !== ""
                ) {
                  filter = list.sortedrecord.value[ii].list_filter;
                }
                var timeline = "";
                if (
                  list.sortedrecord.value[ii].timeLine !== "null" &&
                  list.sortedrecord.value[ii].timeLine !== ""
                ) {
                  timeline = list.sortedrecord.value[ii].timeLine;
                }
                columnarry1.push({
                  heading: hd,
                  rcd: va_l,
                  name: list.sortedrecord.value[ii].name,
                  blank: list.sortedrecord.value[ii].blank,
                  tableName: list.sortedrecord.value[ii].loomtable.value,
                  filter: filter,
                  timeline: timeline,
                });
              }
              this.setState({
                loading: false,
                listt: columnarry1,
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

  static getDerivedStateFromProps(props, state) {
    if (props.isMobile !== state.isMobile) {
      return {
        isMobile: props.isMobile,
      };
    }
    return null;
  }

  dismiss() {
    this.props.unmountMe();
  }

  callform(nam, tab, r_id) {
    if (nam === "first") {
      this.props.showFormCompo(tab, r_id, "record");
    } else if (nam === "second") {
    }
  }

  callList(name, fil, tm) {
    this.props.showListCompo(name, fil, tm);
  }

  backButton() {
    this.props.callhome();
  }

  render() {
    return (
      <div className=" pagesetup">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div>
            <span>
              <i
                className=" backic fa fa-arrow-left mrg-left"
                aria-hidden="true"
                onClick={this.backButton}
              ></i>
            </span>
            {this.state.listt.length === 0 && <div>No Record Found</div>}
            {this.state.listt.map((lstobj, ls_i) => (
              <div className="ovly up_tab" key={ls_i}>
                <div className="cen obj-name">{lstobj.name}</div>
                <div className="heading_top table_set over">
                  <table className="table table-bordered table-striped table-hover p-1">
                    <thead>
                      <tr className="obj_name">
                        {lstobj.heading.map((obj, oj_i) => (
                          <th className="" key={oj_i}>
                            {obj.label}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {lstobj.blank === "true" && (
                      <tbody>
                        <tr className="obj_value">
                          <td colSpan={lstobj.heading.length}>No Record</td>
                        </tr>
                      </tbody>
                    )}
                    {lstobj.blank === "false" && (
                      <tbody>
                        {lstobj.rcd.map((objj, bj_i) => (
                          <tr className="obj_value" key={bj_i}>
                            {objj.colr.map((objr, br_i) => (
                              <td
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
                                key={br_i}
                              >
                                {objr.value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                  {lstobj.blank === "false" && lstobj.rcd.length > 15 && (
                    <button
                      type="button"
                      className=" loadbtn btn btn-warning"
                      onClick={(e) =>
                        this.callList(
                          lstobj.tableName,
                          lstobj.filter,
                          lstobj.timeline
                        )
                      }
                    >
                      Load more
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default SortComponent;
