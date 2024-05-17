import axios from "axios";
import React, { Component } from "react";
import "../css/Error.css"

class ErrorPage extends Component {

    state = {
        loading: true,
        error: "",
        loca: this.props.loca,
        location: this.props.location,
    }

    constructor(props) {
        super(props);
        this.callServer = this.callServer.bind(this);
    }

    componentDidMount() {
        let er;
        let location = this.state.location.state;
        this.props.handleLeftPane();
        if (location) {
            console.log(JSON.stringify(location));
            if (location.err.code) {
                this.setState({error: location.err});
                er = location.err
            } else {
                let r = {
                    message: location.err.stack.toString(),
                    code: "600",
                };
                er = r
                this.setState({ error: r });
            }
        } else {
            er = { message: "unknown error", code: "408" };
            this.setState({ error: er });
        }
        this.callServer(er);
    }

    callServer(er) {
        var token = localStorage.getItem("token");
        axios
            .post(this.state.loca + "/error", er, {
                headers: { Authorization: "Bearer " + token },
            })
            .then(
                (res) => {
                    console.log(res.data);
                    this.setState({loading: false});
                },
                (er) => {
                    console.log(er);
                    this.setState({loading: false});
                }
            );
    };

    render() {
        return (
            <div className="m-0 p-0 container-fluid text-center">
                <span className="err-background"></span>
                <span className="err-header"></span>
                <h1>Error <span className="err-animtion">⚠️</span></h1>
                {!this.state.loading ? <p className="fs-4">{this.state.error.message}</p> : <h1>Loading...</h1>}
                <button
                    className="btn btn-warning"
                    onClick={() => {
                        window.location.reload(true);
                    }}
                >
                    Go Back
                </button>
            </div>
        )
    }
}

export default ErrorPage;