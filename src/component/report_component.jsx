import React, { Component } from "react";
import axios from "axios";
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../css/reportcompo.css";
import WorkInProgress from "./work_in_progress";

Chart.register(...registerables);

class ReportComponent extends Component {
  state = {
    initialReport: true,
    reportdata: {
      labels: [],
      datasets: [
        {
          label: "Rainfall",
          backgroundColor: ["blue"],
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 1,
          data: [],
        },
      ],
    },
    reportlist: [],
    reporttype: "",
    reportname: "",
    altColor: true,
    loading: false,
    page_error: false,
    error: "",
    loca: this.props.loca,
    reportPName: this.props.reportName,
    bl_report: false,
    isMobile: this.props.isMobile,
    timeline: "",
    x_axis: "",
    y_axis: "",
  };

  constructor(props) {
    super(props);
    this.callReport = this.callReport.bind(this);
  }

  componentDidMount() {
    console.log("inn");
    console.log(this.state.reportPName);
    var bl = false;
    if (this.state.reportPName !== "null" && this.state.reportPName !== "" && this.state.reportPName !== undefined) {
      this.setState({ bl_report: true });
      bl = true;
    }
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/get/report/name", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const rcd = res.data;
        console.log(rcd);
        if (rcd !== "") {
          if ("Error" in rcd) {
            this.setState({
              loading: false,
              page_error: true,
              error: rcd.Error,
            });
          } else {
            this.setState({
              reportlist: rcd.reportNameList[2].records,
            });
          }
        }
      },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        });
    if (bl === true) {
      console.log(this.state.reportPName);
      this.callReport(this.state.reportPName);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isMobile !== state.isMobile) {
      return {
        isMobile: props.isMobile,
      };
    }
    return null;
  }

  callReport(nam) {
    console.log(nam);
    if (nam === "None") {
      // If "None" option is selected, set loading to false and reset other states
      this.setState({
        initialReport: true,
        loading: false,
        reportdata: {
          labels: [],
          datasets: [
            {
              label: "Rainfall",
              backgroundColor: ["blue"],
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
              data: [],
            },
          ],
        },
        reporttype: "",
        reportname: "",
        timeline: "",
        x_axis: "",
        y_axis: "",
      });
    }else if (nam === "Report") {
      this.setState({ initialReport: true, reportname: nam });
    } else {
      this.setState({ loading: true, initialReport: false });
      var token = localStorage.getItem("token");
      axios
        .get(this.state.loca + "/loom/get/report/" + nam, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          const report = res.data;
          console.log(report);
          const rdata = this.state.reportdata;
          console.log(rdata);
          var reportty = this.state.reporttype;
          var altColor = this.state.altColor;
          console.log(altColor);
          var tml = "";
          if (report !== "") {
            if ("Error" in report) {
              this.setState({
                loading: false,
                page_error: true,
                error: report.Error,
              });
            } else {
              if ("reportRecord" in report) {
                rdata.datasets[0].data = [];
                rdata.labels = [];
                rdata.datasets[0].label = nam;
                for (var i = 0; i < report.reportRecord[2].record.length; i++) {
                  rdata.labels.push(report.reportRecord[2].record[i].name);
                  rdata.datasets[0].data.push(
                    parseInt(report.reportRecord[2].record[i].value)
                  );
                  if (altColor === true) {
                    rdata.datasets[0].backgroundColor.push("red");
                    altColor = !this.state.altColor;
                  } else {
                    rdata.datasets[0].backgroundColor.push("indigo");
                    altColor = !this.state.altColor;
                  }
                }
                reportty = report.reportRecord[3].reportInformation.chart;
                tml = report.reportRecord[3].reportInformation.timeLine;
                this.setState({
                  reportdata: rdata,
                  reporttype: reportty,
                  x_axis: report.reportRecord[4].axis.x_axis,
                  y_axis: report.reportRecord[4].axis.y_axis,
                  timeline: tml,
                  reportname: nam,
                  loading: false,
                  initialReport: false,
                  altColor: altColor,
                });
              }
            }
          }
        },
          (error) => {
            this.props.showErrorCompo();
            console.log(error);
          });
    }
  }

  // callReport(nam) {
  //   // this.setState({ loading: true, initialReport: false });
  //     var token = localStorage.getItem("token");
  //     axios
  //       .get(this.state.loca + "/loom/get/report/" + nam, {
  //         headers: {
  //           authorization: "Bearer " + token,
  //         },
  //       })
  //       .then((res) => {
  //         const report = res.data;
  //         console.log(report);
  //       })
  // }

  render() {
    let reportlist =
      this.state.reportlist.length > 0 &&
      this.state.reportlist.map((item, i) => {
        return (
          <option key={i} value={item.name}>
            {item.name}
          </option>
        );
      }, this);
    return (
      <div className="pagesetup">
        {console.log(this.state.reportname)}
        <select
          className="selct_opt"
          value={this.state.reportname}
          onChange={(e) => this.callReport(e.target.value)}
        >
          <option value="None">None</option>
          {console.log(reportlist)}
          {reportlist}
        </select>
        {this.state.initialReport === true ? (
          <div>Please select a Report</div>
        ) : null}
        {this.state.loading === true ? <WorkInProgress></WorkInProgress> : null}
        {this.state.loading === false && this.state.initialReport === false ? (
          <div>
            {console.log("reportttt: ", this.state.reportdata)}
            <div className="text-center" style={{
              // marginLeft: "32em",
              fontSize: "20px",
              // fontFamily: "'Bebas Neue', sans-serif"
            }}>{"(" + this.state.timeline + " Report)"}</div>
            <div className="row">
              <div className="col-md-1" style={{ textAlign: "center", paddingTop: "10em" }}>
                <span>{"(" + this.state.y_axis + ")"}</span>
              </div>
              <div className="col-md-11">
                {this.state.reporttype === "bar" && (
                  <div>
                    <Bar
                      data={this.state.reportdata}
                      options={{
                        title: {
                          display: true,
                          text: this.state.reportname,
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: "right",
                        },
                      }}
                    />
                    <span style={{
                      marginLeft: "32em",
                      fontSize: "20px",
                    }}>{"(" + this.state.x_axis + ")"}</span>
                  </div>
                )}

                {this.state.reporttype === "pie" && (
                  <div className="pieheight">
                    <Pie
                      data={this.state.reportdata}
                      options={{
                        title: {
                          display: true,
                          text: this.state.reportname,
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: "right",
                        },
                      }}
                    />
                    <span style={{
                      marginLeft: "32em",
                      fontSize: "20px",
                    }}>{"(" + this.state.x_axis + ")"}</span>
                  </div>
                )}

                {this.state.reporttype === "line" && (
                  <div className="pieheight">
                    <Line
                      data={this.state.reportdata}
                      options={{
                        title: {
                          display: true,

                          text: this.state.reportname,
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: "right",
                        },
                      }}
                    />
                    <span style={{
                      marginLeft: "32em",
                      fontSize: "20px",
                    }}>{"(" + this.state.x_axis + ")"}</span>
                  </div>
                )}

                {this.state.reporttype === "horizontalBar" && (
                  <div className="pieheight">
                    <Bar
                      data={this.state.reportdata}
                      options={{
                        title: {
                          display: true,

                          text: this.state.reportname,
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: "right",
                        },
                      }}
                    />
                    <span style={{
                      marginLeft: "32em",
                      fontSize: "20px",
                    }}>{"(" + this.state.x_axis + ")"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ReportComponent;
