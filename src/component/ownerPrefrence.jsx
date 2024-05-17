import React, { Component } from "react";
import PreferenceComponent from "./preference_component";
import "../css/ownerPreference.css";
import axios from "axios";
import WorkInProgress from "./work_in_progress";

class OwnerPreference extends Component {
  state = {
    col_mn: [{}],
    tab_mn: [{}],
    listName: "",
    tabState: false,
    colState: false,
    loading: false,
    page_error: false,
    error: "",
    loca: this.props.loca,
  };

  constructor(props) {
    super(props);
    this.formChangefn = this.formChangefn.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(this.state.loca + "/loom/get/tables", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          const prefdata = resp.data;
          console.log(prefdata);
          if (prefdata !== "") {
            if ("Error" in prefdata) {
              this.setState({
                loading: false,
                page_error: true,
                error: prefdata.Error,
              });
            } else {
              this.setState({
                tabState: true,
                tab_mn: prefdata.tableRecords,
                loading: false,
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

  formChangefn(val) {
    if (val !== "" && val !== "none") {
      var token = localStorage.getItem("token");
      this.setState({ colState: false, listName: val, col_mn: [{}] });
      axios
        .get(this.state.loca + "/loom/get/column/" + val + "/" + "null", {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then(
          (resp) => {
            const coldata = resp.data;
            console.log(coldata);
            if (coldata !== "") {
              if ("Error" in coldata) {
                this.setState({
                  loading: false,
                  page_error: true,
                  error: coldata.Error,
                });
              } else {
                this.setState({
                  colState: true,
                  col_mn: coldata.columnRecords,
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
  }

  handleClose() {}

  render() {
    return (
      <div className="">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div>
            {this.state.tabState === true && (
              <div>
                <select
                  className="form-select prefinputlis"
                  aria-label="Default"
                  onChange={(e) => this.formChangefn(e.target.value)}
                >
                  <option value="none">None</option>
                  {this.state.tab_mn.map((obj, index) => (
                    <option key={index} value={obj.name}>
                      {obj.label}
                    </option>
                  ))}
                </select>
                {this.state.colState === true &&
                  this.state.col_mn.length > 0 && (
                    <div>
                      <PreferenceComponent
                        pref="owner"
                        columnarray={this.state.col_mn}
                        tablename={this.state.listName}
                        handleClose={() => this.handleClose()}
                        loca={this.state.loca}
                      ></PreferenceComponent>
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default OwnerPreference;
