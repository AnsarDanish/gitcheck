import React, { Component, Fragment } from "react";
import "../css/inventory.css";
import axios from "axios";
import WorkInProgress from "./work_in_progress";
import { Empty } from 'antd';
import WorkInProgressSmall from "./WorkInProgressSmall";

class InventoryComponent extends Component {
  state = {
    loca: this.props.loca,
    loading: false,
    page_error: false,
    inv_rec: [],
    stateLoading: false,
    workshops: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    // this.setState({ loading: true });
    axios
      .get(this.state.loca + "/loom/get/inventory", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          const invrecord = resp.data;
          console.log(invrecord);

          console.log(invrecord.inventory);
          var workshops = [];
         if(invrecord.inventory){
          var inven = invrecord.inventory[0];
          console.log(inven);
          
          for (var t = 0; t < inven.workshops.length; t++) {
            workshops.push({ name: inven.workshops[t].name });
          }
         }
          if (invrecord !== "") {
            if ("Error" in invrecord) {
              this.setState({
                loading: false,
                page_error: true,
                error: invrecord.Error,
              });
            } else {
              this.setState({
                inv_rec: invrecord.inventory,
                loading: false,
                workshops: workshops,
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

  render() {
    return (
      <div className="pagesetup">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div className="inventory_outerline">
            <div>
              {this.state.stateLoading === true ? (
                <WorkInProgressSmall></WorkInProgressSmall>
              ) : null}
            </div>
            <div className="mb-2 text-center fw-bolder fs-5">
              Inventory Records
            </div>
            <div>
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr style={{textAlign:"center"}}>
                    <th scope="col" width="25%">
                      Item
                    </th>
                    <th scope="col">Quantity</th>
                    {this.state.workshops.map((obj, ind) => (
                      <th scope="col" key={ind}>{obj.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                  {!this.state.inv_rec&& (
                     <tr>
                     <td className="h6">No record found</td>
                   </tr>
                  )}
                  {this.state.inv_rec && this.state.inv_rec.length > 0 &&
                    this.state.inv_rec.map((obj, index) => (
                      <tr key={index}>
                        <td>{obj.name}</td>
                        <td>{obj.value}</td>
                        {obj.workshops.map((obji, indexi) => (
                          <td key={indexi}>{obji.value}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default InventoryComponent;
