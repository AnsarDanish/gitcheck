import axios from "axios";
import React, { Component } from "react";
import { Table } from "reactstrap";
import "../css/formcompo.css";
import "../css/clientInfo.css";

class ClientInfoCompo extends Component {
  state = {
    record: { id: "", records: { row: [] } },
    headings: [],
    pageError: false,
    error: "",
    filter: this.props.filter,
    loca: this.props.loca,
    title: "",
    longDescription: "",
  };

  constructor(props) {
    super(props);
    this.formChangefn = this.formChangefn.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
    this.submitfn = this.submitfn.bind(this);
  }

  componentDidMount() {
    this.getInitialData();
  }

  getInitialData() {
    let id = "";
    var filter = this.state.filter.filter;
    if (filter[0].co === "id") {
      id = filter[0].an;
    }
    var token = localStorage.getItem("token");
    axios
      .get(this.state.loca + "/loom/get/userform/" + id, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          let result = resp.data;
          let frecord = this.state.record;
          frecord.id = id;
          for (let i = 0; i < result.no_of_rows; i++) {
            frecord.records.row.push({ cols: [] });
          }
          for (let i = 0; i < result.no_of_rows; i++) {
            for (let j = 0; j < result.no_of_columns; j++) {
              frecord.records.row[i].cols.push({
                name: result.headings[j],
                value: "",
              });
            }
          }
          this.setState({
            longDescription: result.longDescription,
            headings: result.headings,
            title: result.title,
            record: frecord,
          });
        },
        (error) => {
          let err = { message: error.message, code: error.response.status };
          this.props.showErrorCompo({ state: { err: err } });
        }
      );
  }

  formChangefn(val, ob, row_ind, col_ind) {
    this.setState({
      pageError: false,
      error: "",
    });
    let frecord = this.state.record;
    if (frecord.records.row[row_ind].cols[col_ind].name === ob) {
      frecord.records.row[row_ind].cols[col_ind].value = val;
    }
    this.setState({ record: frecord });
  }

  submitfn() {
    this.setState({
      pageError: false,
      error: "",
    });
    var token = localStorage.getItem("token");
    axios
      .post(this.state.loca + "/loom/set/userform", this.state.record, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          let result = resp.data;
          if ("Error" in result) {
            this.setState({
              loading: false,
              page_error: true,
              error: result.Error,
            });
          } else {
          }
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div>
        {this.state.pageError && (
          <div className="alert alert-danger mt-3" style={{ color: "black" }}>
            {" "}
            {this.state.error}
          </div>
        )}
        <div className="row btndiv">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="tab_head">{this.state.title}</div>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="desc_style">{this.state.longDescription}</div>
        <div style={{overflowX:"scroll"}}>
          <Table className="Table-div"> 
            <thead className="objname_clt field_hd">
              <tr>
                {this.state.headings.map((obj, index) => (
                  <th key={index}>{obj}</th>
                ))}
              </tr>
            </thead>
            <tbody contentEditable suppressContentEditableWarning>
              {this.state.record.records.row.length > 0 &&
                this.state.record.records.row.map((obj, row_ind) => (
                  <tr key={row_ind} style={{ height: 20 }}>
                    {obj.cols.map((obj_in, col_ind) => (
                      <td
                        key={col_ind}
                        onChange={(e) => {
                          this.formChangefn(
                            e.target.value,
                            obj_in.name,
                            row_ind,
                            col_ind
                          );
                        }}
                      >
                        <input
                          style={{ textAlign: "center" }}
                          className="form_wdt"
                          value={obj_in.value}
                          onChange={(e) => {
                            this.formChangefn(
                              e.target.value,
                              obj_in.name,
                              row_ind,
                              col_ind
                            );
                          }}
                        ></input>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            this.submitfn();
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default ClientInfoCompo;
