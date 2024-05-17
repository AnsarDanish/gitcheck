import React, { Component } from "react";
import axios from "axios";
import ApForm from "../ApForm";
// import ClientInfoCompo from "./clientInfoCompo";

class HtmlPageComponent extends Component {
  state = {
    script: "",
    html: "",
    filter: this.props.filter,
    loca: this.props.loca,
    record: this.props.record,
    showClientInfo: false,
    filt: {
      filter: [
        {
          co: "id",
          cl: "Id",
          mc: "=",
          an: "1",
          ct: "int",
          af: "",
          rf: { id: "", value: "" },
        },
      ],
    },
  };

  constructor(props) {
    super(props);
    this.innerhtml = this.innerhtml.bind(this);
    this.getBody = this.getBody.bind(this);
    this.setRecord = this.setRecord.bind(this);
    this.setClientValue = this.setClientValue.bind(this);
  }

  componentDidMount() {
    var filter = this.state.filter;
    var json = {
      formRecord: [{ table: { id: 92, value: "ui_page" } }, { filter: filter }],
    };

    var token = localStorage.getItem("token");
    axios
      .post(this.state.loca + "/loom/get/singlerecord/filter", json, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        var result = resp.data;
        console.log(result);
        var ht_ml = "";
        var script = "";
        let rcd = result.formRecord[2].record;
        for (var h = 0; h < rcd.length; h++) {
          if (rcd[h].type === "html") {
            ht_ml = rcd[h].value;
          }
          if (rcd[h].name === "script") {
            script = rcd[h].value;
          }
        }
        console.log(ht_ml, script);
        this.setState({
          script: script,
          html: ht_ml,
        });
        this.innerhtml();
      });
  }

  test() {
    // console.log("open Page");
  }

  innerhtml() {
    var scr = this.state.script;
    if (scr !== "null" && document.getElementById("button") !== null) {
      let p =
        'document.getElementById("button").onclick=function pi(){ ' +
        this.getBody(scr) +
        "};";
      // console.log(p);
      let ap_form = new ApForm(this.state.record, this.setRecord(""));
      // console.log(ap_form.openGrid(""));
      // console.log(this.state.ap_form.openGride());
      let f = new Function(["document", "ap_form"], p);
      let dd = f(document, ap_form); //this.setClientValue
      // console.log("abc " + dd);
    }
  }

  setRecord(val) {
    this.setState({ record: val });
  }

  getBody(string) {
    var pp = string.substring(string.indexOf("{") + 1, string.lastIndexOf("}"));
    return pp;
  }

  setClientValue() {
    this.setState({ showClientInfo: !this.state.showClientInfo });
  }

  render() {
    return (
      <div>
        {/* {this.state.showClientInfo === false && ( */}
        <div id="one" dangerouslySetInnerHTML={{ __html: this.state.html }} />
        {/* )}
        {this.state.showClientInfo === true && (
          <ClientInfoCompo
            filter={this.state.filt}
            loca={this.state.loca}
          ></ClientInfoCompo>
        )} */}
      </div>
    );
  }
}

export default HtmlPageComponent;
