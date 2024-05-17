import React, { Component } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Label,
  LabelList,
  Rectangle,
  DefaultTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import "../css/reportcomponew.css";
import WorkInProgress from "./work_in_progress";

const bar_colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
  "#8884d8",
];
const pie_colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

class ReportComponentNew extends Component {
  state = {
    initialReport: true,
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
    reportdata: [],
    reportlist: [],
    reporttype: "",
  };

  constructor(props) {
    super(props);
    this.callReport = this.callReport.bind(this);
    // this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this);
  }

  componentDidMount() {
    console.log("inn");
    console.log(this.state.reportPName);
    var bl = false;
    if (
      this.state.reportPName !== "null" &&
      this.state.reportPName !== "" &&
      this.state.reportPName !== undefined
    ) {
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
      .then(
        (res) => {
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
        }
      );
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
        reportdata: [],
        reporttype: "",
        reportname: "",
        timeline: "",
        x_axis: "",
        y_axis: "",
      });
    } else if (nam === "Report") {
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
        .then(
          (res) => {
            const report = res.data;
            console.log(report);
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
                  var newReportData = [];
                  for (
                    var i = 0;
                    i < report.reportRecord[2].record.length;
                    i++
                  ) {
                    newReportData.push({
                      name: report.reportRecord[2].record[i].name,
                      value: parseInt(report.reportRecord[2].record[i].value),
                    });
                  }
                  tml = report.reportRecord[3].reportInformation.timeLine;
                  this.setState({
                    reportdata: newReportData,
                    reporttype: report.reportRecord[3].reportInformation.chart,
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
          }
        );
    }
  }

  // renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }){
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //   return (
  //     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
  //       {`${(percent * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // };

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
        <div className="">
          <select
            className=" form-control form-select"
            // selct_opt dropdwn
            value={this.state.reportname}
            onChange={(e) => this.callReport(e.target.value)}
            style={{
              marginTop: "6px",
              marginLeft: "6px",
              marginBottom: "40px",
              lineHeight: "1.3",
              width: "23%",
            }}
          >
            <option value="None">Select Report</option>
            {console.log(reportlist)}
            {reportlist}
          </select>
        </div>

        {this.state.loading === true ? <WorkInProgress></WorkInProgress> : null}
        {this.state.loading === false &&
          this.state.initialReport === false &&
          this.state.reportlist.length > 0 ? (
          <span>
            {this.state.reporttype === "line" && (
              <ResponsiveContainer
                width="85%"
                height="85%"
                className="container"
              >
                <p className="text-center h1">
                  <strong>Rechart Example</strong>
                </p>
                <LineChart
                  width={600}
                  height={400}
                  data={this.state.reportdata}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  syncId="anyId"
                >
                  <CartesianGrid
                    stroke="#ccc"
                    strokeDasharray="5 5"
                    fill="#DDDFE2"
                  />
                  <XAxis
                    dataKey="name"
                    height={60}
                    tick={<CustomizedAxisTick />}
                  >
                    <Label
                      value={this.state.x_axis}
                      offset={39}
                      position="insideTop"
                      scale="point"
                    />
                  </XAxis>
                  <YAxis>
                    <Label
                      value={this.state.y_axis}
                      angle={-90}
                      position="insideLeft"
                    />
                  </YAxis>
                  <Legend
                    verticalAlign="top"
                    // iconType="square"
                    height={36}
                    wrapperStyle={{ top: 5 }}
                    payload={this.state.reportlist.map((item, index) => ({
                      id: item.name,
                      type: "rect",
                      value: `${item.name}`,
                      // color: colors[index % colors.length]
                      color: "#8884d8",
                    }))}
                  />
                  <Tooltip
                    // wrapperStyle={{ width: 200, backgroundColor: "red" }}
                    content={
                      <CustomTooltip
                        reportname={this.state.reportname}
                        reportlist={this.state.reportlist}
                      />
                    }
                  />
                  {/* <Line type="monotone" dataKey="react" stroke="#003153" strokeWidth={2} />
              <Line type="monotone" dataKey="angular" stroke="#8884d8" strokeWidth={2} /> */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={2}
                    label={<CustomizedLabel />}
                    activeDot={{ r: 8 }}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                </LineChart>
                {/* <p className="text-center h4">
                  <strong>LoomWeb Report</strong>
                </p> */}
              </ResponsiveContainer>
            )}

            {this.state.reporttype === "bar" && (
              <ResponsiveContainer
                width="85%"
                height="85%"
                className="container mrgrepo"
              >
                <BarChart
                  width={150}
                  height={40}
                  data={this.state.reportdata}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={150}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    fill="#f0f0f0"
                    fillOpacity={0.7}
                  />
                  <XAxis
                    dataKey="name"
                    height={60}
                    tick={<CustomizedAxisTick />}
                  >
                    <Label
                      value={this.state.x_axis}
                      offset={39}
                      position="insideTop"
                      scale="point"
                    />
                  </XAxis>
                  <YAxis>
                    <Label
                      value={this.state.y_axis}
                      angle={-90}
                      position="insideLeft"
                    />
                  </YAxis>
                  <Legend
                    verticalAlign="top"
                    iconType="square"
                    wrapperStyle={{ top: 5 }}
                    payload={this.state.reportlist.map((item, index) => ({
                      id: item.name,
                      type: "rect",
                      value: `${item.name}`,
                      // color: colors[index % colors.length]
                      color: "#8884d8",
                    }))}
                  />
                  <Tooltip
                    // wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                    content={
                      <CustomTooltip
                        reportname={this.state.reportname}
                        reportlist={this.state.reportlist}
                      />
                    }
                  />
                  <Bar
                    dataKey="value"
                    fill="#8884d8"
                    label={{ position: "top" }}
                    activeBar={<Rectangle fill="gold" stroke="blue" />}
                    isAnimationActive={true}
                    animationDuration={600}
                    animationEasing="ease-in-out"
                  >
                    {this.state.reportdata.map((entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}

            {this.state.reporttype === "pie" && (
              <ResponsiveContainer
                width="50%"
                height="50%"
                className="container"
              >
                <PieChart width={600} height={600} className="mrgrepopie">
                  {/* <Legend verticalAlign="top" /> */}
                  <Pie
                    data={this.state.reportdata}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={5}
                    // label={this.renderCustomizedLabel}
                    label
                    fill="#8884d8"
                  >
                    {this.state.reportdata.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pie_colors[index % pie_colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    // wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                    // content={
                    //   <CustomTooltip
                    //     reportname={this.state.reportname}
                    //     reportlist={this.state.reportlist}
                    //     reporttype={this.state.reporttype}
                    //   />
                    // }
                    payload={this.state.reportlist.map((entry, index) => ({
                      color: pie_colors[index % pie_colors.length],
                    }))}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}

            {this.state.reporttype === "horizontalBar" && (
              <ResponsiveContainer
                width="85%"
                height="85%"
                className="container mrgrepo"
              >
                <BarChart
                  layout="vertical"
                  width={150}
                  height={40}
                  data={this.state.reportdata}
                // barSize={300}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}

                  <XAxis type="number" height={60}>
                    <Label
                      value={this.state.y_axis}
                      offset={39}
                      position="insideTop"
                    />
                  </XAxis>
                  <YAxis dataKey="name" type="category" >
                    <Label
                      value={this.state.x_axis}
                      angle={-90}
                      position="insideLeft"
                    />
                  </YAxis>
                  <Tooltip
                    content={
                      <CustomTooltip
                        reportname={this.state.reportname}
                        reportlist={this.state.reportlist}
                      />
                    }
                  />
                  <Legend
                    verticalAlign="top"
                    wrapperStyle={{ top: 5 }}
                    payload={this.state.reportlist.map((item, index) => ({
                      id: item.name,
                      type: "rect",
                      value: `${item.name}`,
                      // color: bar_colors[index % bar_colors.length]
                      color: "#8884d8",
                    }))}
                  />
                  {/* <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
                  <Bar
                    dataKey="value"
                    activeBar={<Rectangle fill="gold" stroke="blue" />}
                    // barSize={20}
                    fill="#8884d8"
                    isAnimationActive={true}
                    animationDuration={600}
                    animationEasing="ease-in-out"
                  >
                    {this.state.reportdata.map((entry, index) => (
                      <Cell key={`cell-${index}`}
                      // fill={pie_colors[index % pie_colors.length]}
                      />
                    ))}
                    <LabelList position="right" />
                  </Bar>
                  {/* <Line dataKey="uv" stroke="#ff7300" /> */}
                </BarChart>
              </ResponsiveContainer>
            )}
          </span>
        ) : null}
      </div>
    );
  }
}

const CustomTooltip = ({
  active,
  payload,
  label,
  reportname,
  reportlist,
  reporttype,
}) => {
  if (active && payload && payload.length) {
    const legendItem = reportlist.find((item) => item.name === payload[0].name);
    return (
      <div className="custom-tooltip">
        {/* if ({reporttype !== "pie"}) {
        } */}
        {reporttype !== "pie" && <p className="label">{`${label}`}</p>}
        <p className="valuee">{`${reportname} : ${payload[0].value}`}</p>
        {legendItem && (
          <div className="legend-item">
            {/* <Rectangle fill="#8884d8" width={10} height={10} /> */}
            <span
              className="legend-icon"
              style={{ backgroundColor: "legendItem.color" }}
            />
            <span className="legend-label">{legendItem.name}</span>
          </div>
        )}
      </div>
    );
  }

  return null;
};

class CustomizedLabel extends Component {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={11} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends Component {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

export default ReportComponentNew;