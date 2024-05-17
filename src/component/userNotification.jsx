import axios from "axios";
import React, { Component } from "react";
import { ListGroupItem } from "react-bootstrap";
import "../css/userNotification.css";

class UserNotification extends Component {
  state = {
    msg: this.props.msg,
    cnt: this.props.cnt,
    loading: false,
    loca: this.props.loca,
    records: [],
  };

  constructor(props) {
    super(props);
    this.goToRecord = this.goToRecord.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    this.setState({ loading: true, cnt: 0 });
    this.props.showNotificationCompo(this.state.cnt);
    let jo = { messages: this.state.msg };
    console.log(jo);
    axios
      .post(this.state.loca + "/loom/set/seen", jo, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then(
        (resp) => {
          let result = resp.data;
          console.log(result);
          this.setState({
            loading: false,
            // msg: result.notification.message,
            // cnt: result.notification.count,
          });
        },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        }
      );
  }

  goToRecord(record, tabname) {
    if (tabname !== null && record !== null) {
      this.props.showFormCompo(tabname, record, "record")
    }
  };

  render() {
    return (
      <div style={{ flexGrow: 1 }} className="usernoti_outerline">
        {console.log(this.state.msg)}
        {this.state.msg.length > 0 &&
          this.state.msg.map((obj, index) => (
            <ListGroupItem
              action
              key={index}
              onClick={(e) => this.goToRecord(obj.record, obj.loomtable)}
              className="message-item"
              style={{ cursor: "pointer", transition: "color 0.1s" }}
            >
              {obj.message}
            </ListGroupItem>
          ))}
      </div>
    );
  }
}

export default UserNotification;
