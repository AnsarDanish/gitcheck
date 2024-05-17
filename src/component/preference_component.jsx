import React, { Component } from "react";
import axios from "axios";
import "../css/userPref.css";
import { toast } from "react-toastify";

class PreferenceComponent extends Component {
    state = {
        tablename: "",
        columnarray: [{}],
        columnarray2: [],
        prefarray: [],
        json: {},
        pref: "",
        loca: this.props.loca,
        col_val: [{}],
        isColArrSelected: false,
        isColArr2Selected: false,
        ind: 0,
    };

    constructor(props) {
        super(props);
        this.state.pref = props.pref;
        this.state.columnarray = props.columnarray;
        this.state.tablename = props.tablename;
        this.setColumnbtn = this.setColumnbtn.bind(this);
        this.submitColumnbtn = this.submitColumnbtn.bind(this);
        this.setColumn = this.setColumn.bind(this);
        this.changeColumn = this.changeColumn.bind(this);
        this.setColumnOrder = this.setColumnOrder.bind(this);
        this.shiftLeft = this.shiftLeft.bind(this);
        this.shiftRight = this.shiftRight.bind(this);
        this.selected = this.selected.bind(this);
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        axios
            .get(
                this.state.loca +
                "/loom/get/pref/" +
                this.state.pref +
                "/" +
                this.state.tablename,
                {
                    headers: {
                        authorization: "Bearer " + token,
                    },
                }
            )
            .then((resp) => {
                var sysrecord = resp.data;
                console.log(sysrecord);
                if (sysrecord !== "") {
                    if ("Error" in sysrecord) {
                    } else {
                        if (this.state.pref === "user") {
                            this.setState({
                                prefarray: sysrecord.userPreference[2].column,
                                json: sysrecord,
                            });
                        } else if (this.state.pref === "owner") {
                            this.setState({
                                prefarray: sysrecord.ownerPreference[2].column,
                                json: sysrecord,
                            });
                        }
                        this.setColumn();
                    }
                }
            },
                (error) => {
                    this.props.showErrorCompo();
                });
    }

    componentDidUpdate(props) { }

    // setColumn() {
    //     var clm = this.state.columnarray;
    //     var clm2 = this.state.columnarray2;
    //     var prf = this.state.prefarray;
    //     for (var ii = 0; ii < clm.length; ii++) {
    //         clm[ii].check = false;
    //     }
    //     for (var i = 0; i < clm.length; i++) {
    //         for (var p = 0; p < prf.length; p++) {
    //             if (clm[i].name === prf[p].name) {
    //                 clm[i].check = true;
    //                 var jj = {
    //                     label: clm[i].label,
    //                     co: prf[p].co,
    //                 };
    //                 clm2.push(jj);
    //             }
    //         }
    //     }
    //     // let c = [];
    //     // if (clm[clm.length-1].label!=="split-end") {
    //     //     clm.push({label:"split-start",type:"ui",check:"false"})
    //     //     clm.push({label:"split",type:"ui",check:"false"})
    //     //     clm.push({label:"split-end",type:"ui",check:"false"})
    //     // }

    //     let clm22 = clm2.sort((a, b) => (a.co > b.co ? 1 : -1));
    //     this.setState({ columnarray: clm, columnarray2: clm2 });
    // };

    setColumn() {
        var clm = this.state.columnarray;
        var clm2 = this.state.columnarray2;
        var prf = this.state.prefarray;
        for (var ii = 0; ii < clm.length; ii++) {
            clm[ii].check = false;
        }
        // var pref = prf[0];
        for (var i = 0; i < clm.length; i++) {
        for (var p = 0; p < prf.length; p++) {
                if (clm[i].name === prf[p].name) {
                    clm[i].check = true;
                    var jj = {
                        label: clm[i].label,
                        name: clm[i].name,
                        co: prf[p].co,
                    };
                    clm2.push(jj);
                }
            }
        }
        clm2.sort((a, b) => (a.co > b.co ? 1 : -1));
        this.setState({ columnarray: clm, columnarray2: clm2 });
    }

    changeColumn(e, index) {
        var col = this.state.columnarray;
        col[index].check = e;
        this.setState({ columnarray: col });
    };

    setColumnbtn() {
        var colm = this.state.columnarray;
        var colm2 = this.state.columnarray2;
        for (var i = 0; i < colm.length; i++) {
            var dd = false;
            var ind = 0;
            var ee = false;
            for (var c = 0; c < colm2.length; c++) {
                if (colm[i].check === true) {
                    if (colm[i].label === colm2[c].label) {
                        dd = true;
                    }
                } else if (colm[i].check === false) {
                    if (colm[i].label === colm2[c].label) {
                        ee = true;
                        ind = c;
                    }
                }
            }
            if (dd === false && colm[i].check === true) {
                var ln = colm2.length;
                ln = ln + 1;
                colm2.push({ label: colm[i].label, co: "" + ln });
            }
            if (ee === true && colm[i].check === false) {
                colm2.splice(ind, 1);
            }
        }
        this.setState({ columnarray2: colm2 });
    };

    submitColumnbtn() {
        var token = localStorage.getItem("token");
        var colm = this.state.columnarray;
        var colm2 = this.state.columnarray2;
        var json = this.state.json;
        var sub = [];
        for (var i = 0; i < colm2.length; i++) {
            for (var j = 0; j < colm.length; j++) {
                if (colm2[i].label === colm[j].label) {
                    sub.push({ name: colm[j].name, co: colm2[i].co });
                }
            }
        }

        if (this.state.pref === "user") {
            json.userPreference[2].column = sub;
            json.userPreference[1].table.value = this.state.tablename;
            axios
                .post(this.state.loca + "/loom/set/user/preference/", this.state.json, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + token,
                    },
                })
                .then((resp) => {
                    var sysrecord = resp.data;
                    this.props.handleClose();
                });
        } else if (this.state.pref === "owner") {
            json.ownerPreference[2].column = sub;
            json.ownerPreference[1].table.value = this.state.tablename;
            axios
                .post(this.state.loca + "/loom/set/owner/preference/", this.state.json, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + token,
                    },
                })
                .then((resp) => {
                    var sysRecord = resp.data;
                    toast(sysRecord.Message, {
                        position: "top-center",
                        theme: "colored",
                        type: "success",
                      });
                    console.log("owner : ", sysRecord);
                    // this.props.handleClose();
                });
        }
    };

    selected(index, clm) {
        if (clm === "clm1") {
            this.setState({ isColArrSelected: true, isColArr2Selected: false })
            for (let i = 0; i < this.state.columnarray.length; i++) {
                if (i === index) {
                    document
                        .getElementById("clm1")
                        .children.item(i)
                        .classList.add("selected-row");
                } else {
                    document
                        .getElementById("clm1")
                        .children.item(i)
                        .classList.remove("selected-row");
                }
            }
            for (let i = 0; i < this.state.columnarray2.length; i++) {
                document
                    .getElementById("clm2")
                    .children.item(i)
                    .classList.remove("selected-row");
            }
        } else {
            this.setState({ isColArrSelected: false, isColArr2Selected: true, ind: index })

            for (let i = 0; i < this.state.columnarray2.length; i++) {
                if (i === index) {
                    document
                        .getElementById("clm2")
                        .children.item(i)
                        .classList.add("selected-row");
                } else {
                    document
                        .getElementById("clm2")
                        .children.item(i)
                        .classList.remove("selected-row");
                }
            }
            for (let i = 0; i < this.state.columnarray.length; i++) {
                document
                    .getElementById("clm1")
                    .children.item(i)
                    .classList.remove("selected-row");
            }
        }
    };

    setColumnOrder(pm) {
        var clm = [];
        var col_odr = this.state.ind;
        var col_odr2 = 0;

        if (pm) {
            if (col_odr < this.state.columnarray2.length - 1) {
                col_odr2 = col_odr + 1;
                for (let i = 0; i < this.state.columnarray2.length; i++) {
                    if (i !== col_odr2 && i !== col_odr) {
                        clm.push(this.state.columnarray2[i]);
                    } else if (i === col_odr2) {
                        document
                            .getElementById("clm2")
                            .children.item(col_odr2)
                            .classList.add("selected-row");
                        let cjj = this.state.columnarray2[i];
                        cjj.co = (col_odr + 1).toString();
                        clm.push(cjj);
                    } else if (i === col_odr) {
                        document
                            .getElementById("clm2")
                            .children.item(col_odr)
                            .classList.remove("selected-row");
                        let cjj = this.state.columnarray2[i];
                        cjj.co = (col_odr2 + 1).toString();
                        clm.push(cjj);
                    }
                }
                clm.sort((a, b) => (a.co > b.co ? 1 : a.co < b.co ? -1 : 0));
                this.setState({ columnarray2: clm, ind: col_odr2 });
            }
        } else {
            if (col_odr > 0) {
                col_odr2 = col_odr - 1;
                for (let i = 0; i < this.state.columnarray2.length; i++) {
                    if (i !== col_odr2 && i !== col_odr) {
                        clm.push(this.state.columnarray2[i]);
                    } else if (i === col_odr2) {
                        document
                            .getElementById("clm2")
                            .children.item(col_odr2)
                            .classList.add("selected-row");
                        let cjj = this.state.columnarray2[i];
                        cjj.co = (col_odr + 1).toString();
                        clm.push(cjj);
                    } else if (i === col_odr) {
                        document
                            .getElementById("clm2")
                            .children.item(col_odr)
                            .classList.remove("selected-row");
                        let cjj = this.state.columnarray2[i];
                        cjj.co = (col_odr2 + 1).toString();
                        clm.push(cjj);
                    }
                }
                clm.sort((a, b) => (a.co > b.co ? 1 : a.co < b.co ? -1 : 0));
                this.setState({ columnarray2: clm, ind: col_odr2 });
            }
        }
    };

    shiftRight() {
        let clm = this.state.columnarray;
        let clm2 = this.state.columnarray2;
        let lab = document.getElementsByClassName("selected-row").item(0);
        if (lab !== null) {
            lab = lab.innerText;
            for (let i = 0; i < this.state.columnarray.length; i++) {
                if (clm[i].label === lab) {
                    if (clm[i].type !== "ui") {
                        clm[i].check = true;
                    }
                    let n_co = clm2.length + 1;
                    let n = { label: lab, co: n_co };
                    clm2.push(n);
                }
            }
            this.setState({ isColArrSelected: false, columnarray: clm, columnarray2: clm2 });
        } else {
            this.setState({ isColArrSelected: true, isColArr2Selected: true });
        }

    };

    shiftLeft() {
        let clm = this.state.columnarray;
        let clm2 = this.state.columnarray2;
        let lab = document.getElementsByClassName("selected-row").item(0).innerText;
        for (let i = 0; i < this.state.columnarray2.length; i++) {
            if (clm2[i].label === lab) {
                clm2.splice(i, 1);
            }
        }
        for (let i = 0; i < this.state.columnarray.length; i++) {
            if (clm[i].label === lab) {
                clm[i].check = false;
            }
        }
        this.setState({ isColArr2Selected: false, columnarray: clm, columnarray2: clm2 });
    };

    render() {
        return (
            <div>
                {this.state.isColArrSelected === true && this.state.isColArr2Selected === true && (
                    <div
                        className="alert alert-warning"
                        role="alert"
                        style={{
                            padding: "0.2rem 0.2rem",
                            marginBottom: "10px",
                        }}
                    >
                        {"Please Select Column"}
                    </div>
                )}
                <div style={{ flexGrow: 1 }}>
                    <div className="row fr justify-content-center">
                        <div id="clm1" className="col-md-4 box-pref">
                            {this.state.columnarray.length > 0 &&
                                this.state.columnarray.map((obj, obj_i) => (
                                    <div key={obj_i}>
                                        {!obj.check && (
                                            <div className="row fr">
                                                <p
                                                    style={{ margin: 0, fontWeight: "bold", textAlign: "center" }}
                                                    className="columnarray2"
                                                    onClick={() => {
                                                        this.selected(obj_i, "clm1");
                                                    }}
                                                >
                                                    {obj.label}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                        {!(this.state.isMobile) ? (
                            <div className="up-down">
                                <div>
                                    <button
                                        disabled={this.state.isColArr2Selected}
                                        className="ryt-left-btn"
                                        aria-hidden= "true"
                                        onClick={() => {
                                            this.shiftRight();
                                        }}
                                    >
                                        {">"}
                                    </button>
                                </div>
                                <div>
                                    <button
                                        disabled={this.state.isColArrSelected}
                                        className="ryt-left-btn"
                                        aria-hidden = "true"
                                        onClick={() => {
                                            this.shiftLeft();
                                        }}
                                    >
                                        {"<"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="up_down d-flex justify-content-center">
                                <button
                                    disabled={this.state.isColArrSelected}
                                    className="up-down-view-pref"
                                    aria-hidden="true"
                                    onClick={(e) => this.shiftLeft()}
                                >
                                    {">"}
                                </button>
                                <button
                                    disabled={this.state.isColArr2Selected}
                                    className="up-down-view-pref"
                                    aria-hidden="true"
                                    onClick={(e) => this.shiftRight()}
                                >
                                    {"<"}
                                </button>
                            </div>
                        )}
                        <div id="clm2" className="col-md-4 box-pref">
                        {console.log(this.state.columnarray2)}
                            {this.state.columnarray2.map((obj, index) => (
                                <p
                                    style={{ margin: 0 }}
                                    key={index}
                                    className="columnarray2"
                                    onClick={() => {
                                        this.selected(index, "clm2");
                                    }}
                                    value={obj.label}
                                >
                                    {obj.label}
                                </p>
                            ))}
                        </div>
                        <div className="col-md-2 up_down_btn_pre">
                            <div className="btn-group-vertical" /*style={{ maxWidth: '60px' }}*/>
                                <button
                                    className="up-down-view-pref"
                                    aria-hidden="true"
                                    onClick={(e) => this.setColumnOrder(false)}
                                >
                                    {">"}
                                </button>

                                <button
                                    className="up-down-view-pref"
                                    aria-hidden="true"
                                    onClick={(e) => this.setColumnOrder(true)}
                                >
                                    {"<"}
                                </button>
                            </div>
                            <span className="" style={{ margin: 'auto 22px' }}>
                                <button
                                    type="button"
                                    // className="btnnn btn btn-primary submit_butn_of_setting"
                                    className="btnnn-sm btn btn-primary btn-sm"
                                    onClick={() => this.submitColumnbtn()}
                                >
                                    Submit
                                </button>
                            </span>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PreferenceComponent;
