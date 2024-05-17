import React, { Component } from "react";
import axios from "axios";

class WorkerInfoCompo extends Component {
  state = {
    loca: this.props.loca,
    id: this.props.recordId,
    laoding: false,
    page_error: false,
    error: "",
    page_message: false,
    message: "",
    advanceMoney: [],
    workshopLoom: [],
    compliantRequest: [],
    clothDetail: []
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(this.state.loca + "/loom/get/worker/info/" + this.state.id, {
        headers: { authorization: "Bearer " + token },
      })
      .then((resp) => {
        let res = resp.data;
        console.log("workerInfo: ", res);
        if (res !== "") {
          if ("Error" in res) {
            this.setState({
              loading: false,
              page_error: true,
              error: res.Error,
            });
          } else {
            this.setState({
              advanceMoney: res.workerInfo[0].advanceMoney,
              workshopLoom: res.workerInfo[1].workshopLoom,
              compliantRequest: res.workerInfo[2].compliantRequest,
              clothDetail: res.workerInfo[3].clothDetail,
              loading: false
            });
          }
        }
      },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        });
  }

  render() {
    return (
      <div>
        <div style={{ fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>{"View Worker Info"}</div>
        <div>
          <div className="checklist_outerline">
            <div><strong>Advance Money</strong></div>
            {this.state.advanceMoney.length === 0 && (
              <div>No record found</div>
            )}
            <table className="table table-striped table-sm">
              <tbody className="important_record_position">
                <tr>
                  <th width="27%">Requested Amount</th>
                  <th width="27%">Approved Amount</th>
                  <th width="27%">Remaining Amount</th>
                  <th width="27%">Requested Date</th>
                  <th width="27%">State</th>
                  <th></th>
                </tr>
                {this.state.advanceMoney.map((obj_in, index_in) => (
                  <tr key={index_in}>
                    <td>{obj_in.requested_amount}</td>
                    <td>{obj_in.approved_amount}</td>
                    <td>{obj_in.remaining_amount}</td>
                    <td>{obj_in.requested_date}</td>
                    <td>{obj_in.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="checklist_outerline">
            <div><strong>Meter Produce</strong></div>
            {this.state.clothDetail.length === 0 && (
              <div>No record found</div>
            )}
            <table className="table table-striped table-sm">
              <tbody className="important_record_position">
                <tr>
                  <th width="27%">last 30Days Record</th>
                  <th width="27%">last 14Days Record</th>
                  <th></th>
                </tr>

                {this.state.clothDetail.length !== 0 && (
                  <tr>
                    <td>{this.state.clothDetail[0].last30DaysRecord.total_meter}</td>
                    <td>{this.state.clothDetail[1].last14DaysRecord.total_meter}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="checklist_outerline">
            <div><strong>Compliant Request</strong></div>
            {this.state.compliantRequest.length === 0 && (
              <div>No record found</div>
            )}
            <table className="table table-striped table-sm">
              <tbody className="important_record_position">
                <tr>
                  <th width="27%">Id</th>
                  <th width="27%">Problem Issue</th>
                  <th width="27%">Staff Type</th>
                  <th></th>
                </tr>

                {this.state.compliantRequest.map((obj_in, index_in) => (
                  <tr key={index_in}>
                    <td>{obj_in.id}</td>
                    <td>{obj_in.problem_issue}</td>
                    <td>{obj_in.staff_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="checklist_outerline">
            <div><strong>Workshop Loom</strong></div>
            {this.state.workshopLoom.length === 0 && (
              <div>No record found</div>
            )}
            <table className="table table-striped table-sm">
              <tbody className="important_record_position">
                <tr>
                  <th width="27%">Workshop Id</th>
                  <th width="27%">Workshop Name</th>
                  <th width="27%">Loom Id</th>
                  <th width="27%">Loom Name</th>
                  <th></th>
                </tr>

                {this.state.workshopLoom.map((obj_in, index_in) => (
                  <tr key={index_in}>
                    <td>{obj_in.Workshop_id}</td>
                    <td>{obj_in.workshop_name}</td>
                    <td>{obj_in.loom_id}</td>
                    <td>{obj_in.loom_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkerInfoCompo;
