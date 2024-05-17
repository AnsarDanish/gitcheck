import React, { Component } from "react";
import "../css/dashbd.css";
import axios from "axios";
import WorkInProgress from "./work_in_progress";
class Dashboard extends Component {
  state = {
    // dash: JSON.parse(
    // 	'{"dash":[{"response":{"dashboards":[{"name":"Attendance","tableName":"Attendance","value":[{"name":"Present","label":"Attendance","value":"0"},{"name":"Absent","label":"Attendance","value":"0"},{"name":"Unset","label":"Attendance","value":"0"}],"url":"/loom/sorted/Attendance"},{"name":"Clothworkdetail","tableName":"Clothworkdetail","value":[{"name":"Today","label":"Cloth Work Detail","value":"0"},{"name":"Yesterday","label":"Cloth Work Detail","value":"0"},{"name":"Last 14 Days","label":"Cloth Work Detail","value":"0"},{"name":"Last 30 Days","label":"Cloth Work Detail","value":"0"}],"url":"/loom/sorted/Clothworkdetail"},{"name":"Loomstatus","tableName":"Loomstatus","value":[{"name":"Loom Status On","label":"Loom Status","value":"0"},{"name":"Loom Status Off","label":"Loom Status","value":"4"}],"url":"/loom/sorted/Loomstatus"},{"name":"Beam_InOut","tableName":"Beam_InOut","value":[{"name":"Today","label":"Beam In Out","value":"0"},{"name":"Yesterday","label":"Beam In Out","value":"0"},{"name":"Last 7 Days","label":"Beam In Out","value":"0"},{"name":"Last 30 Days","label":"Beam In Out","value":"0"}],"url":"/loom/sorted/Beam_InOut"}]}},{"token":""}]}'
    // ),
    // dash: {},
    dashboard: [],
    showdash: true,
    loading: false,
    page_error: false,
    error: "",
    loca: this.props.loca,
    db_link: [],
    isMobile: this.props.isMobile,
    // u_name: "",
  };

  constructor(props) {
    super(props);
    this.checkDashboard = this.checkDashboard.bind(this);
    this.callSorted = this.callSorted.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/dashboardimpl/record", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then(
        (res) => {
          const dashboard = res.data;
          console.log(dashboard);
          if (dashboard !== "") {
            if ("Error" in dashboard.dashboardRecords[0]) {
              // dashboard.dashboards[0]
              this.setState({
                loading: false,
                page_error: true,
                error: dashboard.dashboardRecords[0].Error,
                showdash: false,
              });
              console.log(this.state.error);
            } else {
              this.setState({
                loading: false,
                page_error: false,
                error: "",
                // dashboard: dashboard.dashboardRecords[0].dashboards,
                // db_link: dashboard.dashboardRecords[1].dashboardLink,
                dashboard: dashboard.dashboardRecords[0].dashboardRecords,
                db_link: dashboard.dashboardRecords[1].dashboardLink,
                showdash: true,
              });
            }
          }
        },
        (error) => {
          let err = { message: error.message, code: error.response.status };
          this.props.showErrorCompo({ state: { err: err } });
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

  checkDashboard() {
    this.setState({ showdash: true });
  }

  callSorted(tab, url ,name) {
    console.log(tab ,url ,name);
    this.props.showSortCompo(tab, url ,name);
  }

  callRecord(type, table, filter) {
    console.log(type , table);
    if (type === "new") {
      this.props.showFormCompo(table, 0, type);
    } else if (type === "list") {
      this.props.showListCompo(table, "", "");
    } else if (type === "multiinsert") {
      this.props.showMultiCompo(table);
    } else if (type === "inventory") {
      this.props.showInventoryCompo(table, "", "");
    } else if (type === "material") {
      this.props.showMaterialCompo();
    } else if (type === "checklist") {
      this.props.showChecklistCompo();
    }
  }

  render() {
    return (
      <div>
        {this.state.page_error === true && (
          <div className="alertgp alert-danger" style={{ color: "black" }}>
            {this.state.error}
          </div>
        )}
        <div className="pagesetup">
          {this.state.loading === true ? (
            <WorkInProgress></WorkInProgress>
          ) : (
            <div>
              {this.state.isMobile ? (
                <div className="db_tt" style={{ overflowX: "auto" }}>
                  {this.state.db_link.length > 0 && (
                    <div className="db_li">
                      {this.state.db_link.map((objj, db) => (
                        <div key={db}
                          style={{ backgroundColor: objj.color }}
                          className="db_link_mob"
                          onClick={() =>
                            this.callRecord(
                              objj.type,
                              objj.loomTable
                            )
                          }>
                          <span className="db_sp">{objj.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="db_tt" style={{ overflowX: "auto" }}>
                  {this.state.db_link.length > 0 && (
                    <div className="db_li">
                      {this.state.db_link.map((objj, db) => (
                        <div key={db}
                          style={{ backgroundColor: objj.color }}
                          className="db_link"
                          onClick={() =>
                            this.callRecord(
                              objj.type,
                              objj.loomTable,
                              objj.filter
                            )
                          }>
                          <span className="db_sp">{objj.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {this.state.dashboard.length === 0 &&
                this.state.showdash === true && (
                  <div
                    className="spinner-border justify-content-center"
                    role="status"
                    style={{ margin: "2px", marginLeft: "500px" }}
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              {this.state.dashboard.map((obj, oj) => (
                <div key={oj}>
                  <div className="row_top">
                    <div className="col_top">{obj.label}</div>
                  </div>

                  <div className="row_mid justify-content-center container-main">
                    {obj.value.map((in_obj, i_i) => (

                      <div
                        // className="card_mid cur w-25"
                        className={window.screen.width > 770 ? "card_mid cur w-25" : "card_mid cur"}
                        onClick={() =>
                          this.callSorted(obj.tableName, obj.url ,in_obj.name)
                        }
                        key={i_i}
                      >
                        <div className="in_head">
                          <span>{in_obj.name}</span>
                        </div>
                        <div>
                          <span>{in_obj.value}</span>
                        </div>
                      </div>

                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
