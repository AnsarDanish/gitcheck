import React, { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/vertical-composed-chart-w6fni';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}




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
        bottom: 20,
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

{this.state.button.map((obj, ob_i) => (
  <button
    key={ob_i}
    onClick={() => {
      if (obj.webUrl === "/loom/delete/record" || obj.name === "reject") {
        this.setState({
          btnName: obj.name,
          btnValue: obj.value,
          modal: true,
        });
      } else {
        this.callbtn(obj.name);
      }
      this.setState({ btn_disable: true }); // Disabling the button after click
    }}
    disabled={this.state.btn_disable} // Using the state directly to disable the button
    className={
      "csm_btn csm_btn_pri col-md-2 sub-btn" +
      (this.state.btn_disable ? " disabled" : "") // Adding 'disabled' class if btn_disable is true
    }
    style={{ backgroundColor: this.state.btn_disable ? "gray" : "" }} // Making the button gray when disabled
  >
    {obj.value}
  </button>
))}