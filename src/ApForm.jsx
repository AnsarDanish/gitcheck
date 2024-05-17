import React, { Component } from "react";
import ClientInfoCompo from "./component/clientInfoCompo";

export class ApForm extends Component {
  _isMounted = false;
  state = {
    record: [],
    sr: null,
    showClientInfo: false,
    filter: {
      filter: [
        {
          co: "",
          cl: "",
          mc: "",
          an: "",
          ct: "",
          af: "",
          rf: { id: "", value: "" },
        },
      ],
    },
    loca: "http://localhost:8082",
  };

  constructor(record, setRecord) {
      console.log(record);
    super(record);
    this.state.record = record;
    this.state.sr = setRecord;
    this.getFieldValue = this.getFieldValue.bind(this);
    this.getMultiFieldValue = this.getMultiFieldValue.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.setMultiFieldValue = this.setMultiFieldValue.bind(this);
    this.setMandatory = this.setMandatory.bind(this);
    this.isMandatory = this.isMandatory.bind(this);
    this.setVisible = this.setVisible.bind(this);
    this.setReadOnly = this.setReadOnly.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.addOption = this.addOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
    this.removeAllOption = this.removeAllOption.bind(this);
    // this.openGride = this.openGride.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getFieldValue(name) {
    const frecord = this.state.record;
    console.log(frecord);
    console.log(name);
    for (let i = 0; i < frecord.length; i++) {
      if (frecord[i].name === name) {
        return frecord[i].value;
      }
    }
  }

  getMultiFieldValue(name, index) {
    const frecord = this.state.record[index].record;
    for (let i = 0; i < frecord.length; i++) {
      if (frecord[i].name === name) {
        console.log(frecord[i].value);
        return frecord[i].value;
      }
    }
  }

  setFieldValue(name, value, id) {
    const frecord = this.state.record;
    for (let i = 0; i < frecord.length; i++) {
      if (
        name === "id" ||
        name === "created" ||
        name === "created_by" ||
        name === "updated" ||
        name === "updated_by"
      ) {
        break;
      }
      if (frecord[i].type === "reference") {
        if (frecord[i].name === name) {
          frecord[i].value.value = value;
          if (!id) {
            frecord[i].value.id = "0";
          } else {
            frecord[i].value.id = id;
          }
          if (this._isMounted) {
            this.setState({ sr: frecord });
          }
        }
      } else {
        if (frecord[i].name === name) {
          frecord[i].value = value;
          if (this._isMounted) {
            this.setState({ sr: frecord });
          }
        }
      }
    }
  }

  setMultiFieldValue(name, value, index, id) {
    const frecord = this.state.record[index].record;
    for (let i = 0; i < frecord.length; i++) {
      if (
        name === "id" ||
        name === "created" ||
        name === "created_by" ||
        name === "updated" ||
        name === "updated_by"
      ) {
        break;
      }
      if (frecord[i].type === "reference") {
        if (frecord[i].name === name) {
          frecord[i].value.value = value;
          if (!id) {
            frecord[i].value.id = "0";
          } else {
            frecord[i].value.id = id;
          }
          frecord[i].value.id = id;
          if (this._isMounted) {
            this.setState({ sr: frecord });
          }
        }
      } else {
        if (frecord[i].name === name) {
          frecord[i].value = value;
          if (this._isMounted) {
            this.setState({ sr: frecord });
          }
        }
      }
    }
  }

  setMandatory(name, value) {
    const frecord = this.state.record;
    for (let i = 0; i < frecord.length; i++) {
      if (
        name === "id" ||
        name === "created" ||
        name === "created_by" ||
        name === "updated" ||
        name === "updated_by"
      ) {
        break;
      }
      if (frecord[i].name === name) {
        frecord[i].uivalid.mandatory = value;
        if (this._isMounted) {
          this.setState({ sr: frecord });
        }
      }
    }
  }

  isMandatory(name) {
    const frecord = this.state.record;
    for (let i = 0; i < frecord.length; i++) {
      if (
        name === "id" ||
        name === "created" ||
        name === "created_by" ||
        name === "updated" ||
        name === "updated_by"
      ) {
        break;
      }
      if (frecord[i].name === name) {
        let val = frecord[i].uivalid.mandatory;
        if (val === "true") {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  setVisible(name, value) {
    const frecord = this.state.record;
    for (let i = 0; i < frecord.length; i++) {
      if (
        name === "id" ||
        name === "created" ||
        name === "created_by" ||
        name === "updated" ||
        name === "updated_by"
      ) {
        break;
      }
      if (frecord[i].name === name) {
        frecord[i].uivalid.visible = value;
        if (this._isMounted) {
          this.setState({ sr: frecord });
        }
      }
    }
  }

  setReadOnly(name, value) {
    const frecord = this.state.record;
    for (let i = 0; i < frecord.length; i++) {
      if (
        name === "id" ||
        name === "created" ||
        name === "created_by" ||
        name === "updated" ||
        name === "updated_by"
      ) {
        break;
      }
      if (frecord[i].name === name) {
        frecord[i].uivalid.read_only = value;
        if (this._isMounted) {
          this.setState({ record: frecord });
        }
      }
    }
  }

  setFilter(value, field, op) {
    const frecord = this.state.record;
    let filt = "";
    for (let i = 0; i < frecord.length; i++) {
      if (frecord[i].name === field) {
        let type = frecord[i].type;
        filt =
          '{"co": "' +
          field +
          '", "cl": "", "mc": "' +
          op +
          '","an": "' +
          value +
          '","ct": "' +
          type +
          '","af": ""}';
        break;
      }
    }
    return JSON.parse(filt);
  }

  addOption(value, label, name) {
    const frecord = this.state.record;
    for (let i = 0; i < frecord.length; i++) {
      if (
        name === "id" ||
        name === "created" ||
        name === "created_by" ||
        name === "updated" ||
        name === "updated_by"
      ) {
        break;
      }
      if (frecord[i].name === name && frecord[i].type === "choice") {
        frecord[i].choice.push({ value: value, label: label });
        break;
      }
    }
  }

  removeOption(label, name) {
    const frecord = this.state.record;
    for (let i = 0; i < frecord.length; i++) {
      if (
        name === "id" ||
        name === "created" ||
        name === "created_by" ||
        name === "updated" ||
        name === "updated_by"
      ) {
        break;
      }
      if (frecord[i].name === name && frecord[i].type === "choice") {
        for (let j = 0; j < frecord[i].choice.length; j++) {
          if (frecord[i].choice[j].label === label) {
            frecord[i].choice.splice(j, 1);
            break;
          }
        }
        break;
      }
    }
  }

  removeAllOption(name) {
    const frecord = this.state.record;
    for (let i = 0; i < frecord.length; i++) {
      if (
        // name === "uni_id" ||
        name === "id" ||
        name === "created" ||
        name === "created_by" ||
        name === "updated" ||
        name === "updated_by"
      ) {
        break;
      }
      if (frecord[i].name === name && frecord[i].type === "choice") {
        frecord[i].choice = [];
        break;
      }
    }
  }

  openGrid(val) {
    let filter = {
      filter: [
        {
          co: "id",
          cl: "Id",
          mc: "=",
          an: val,
          ct: "int",
          af: "",
          rf: { id: "", value: "" },
        },
      ],
    };
    // this.setState({ showClientInfo: true, filter: filter });
    return filter;
  }

  render() {
    return (
      <div>
        {this.state.showClientInfo === true && (
          <ClientInfoCompo
            filter={this.state.filter}
            loca={this.state.loca}
          ></ClientInfoCompo>
        )}
      </div>
    );
  }
}

export default ApForm;
