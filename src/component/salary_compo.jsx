import React, { Component } from "react";
import axios from "axios";

class SalaryCompo extends Component {

    state = {
        loca: this.props.loca,
        r_id: this.props.recordId,
        loading: false,
        page_error: false,
        error: "",
        page_message: false,
        message: "",
        record: [],
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        this.setState({ loading: true });
        axios
            .get(this.state.loca + "/loom/get/salary/record/" + this.state.r_id, {
                headers: { authorization: "Bearer " + token },
            })
            .then((resp) => {
                let res = resp.data;
                console.log("resss:", res);
                if (res !== "") {
                    if ("Error" in res) {
                        this.setState({
                            loading: false,
                            page_error: true,
                            error: res.Error,
                        });
                    } else {
                        this.setState({
                            loading: false,
                            record: res.salaryRecord,
                        });
                    }
                }
            });
    }

    componentDidUpdate(props){

    }

    render() {
        return (
            <div>
                <div style={{ fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>{"Salary Info"}</div>
                {console.log("rec:", this.state.record)}
                {this.state.record.map((obj, index) => (
                    <div className="checklist_outerline" key={index}>
                            <div><strong>{obj.salary.user}</strong></div>
                        {obj.salary.sal_array.length === 0 && (
                            <div>No record found</div>
                        )}
                        
                        <table className="table table-striped table-sm">
                            <tbody className="important_record_position">
                                <tr>
                                    <th width="27%">Type</th>
                                    <th width="27%">Meter</th>
                                    <th width="27%">Rate</th>
                                    <th width="27%">Total</th>
                                    <th></th>
                                </tr>
                                {obj.salary.sal_array.map((obj_in, index_in) => (
                                    <tr key={index_in}>
                                        <td>{obj_in.type}</td>
                                        <td>{obj_in.meter}</td>
                                        <td>{obj_in.rate}</td>
                                        <td>{obj_in.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-md-9"></div>
                        <div className="col-md-3" style={{paddingLeft:"4.5em"}}><strong>{obj.salary.salary}</strong></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default SalaryCompo;