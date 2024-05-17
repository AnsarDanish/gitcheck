import axios from "axios";
import React from "react";
import "../css/MultipleSelectComp.css";
import { Modal, Button } from "react-bootstrap";
import ModelList from "./model_list";

class MultipleSelectCompo extends React.Component {

    state = {
        refRcd: [],
        record_rq: [],
        ref_filter: [],
        record: this.props.record,
        value: "",
        show: false,
        selectedList: this.props.list.record,
        tabname: this.props.tabname,
        id: this.props.id,
        setMSC: this.props.setMSC,
        loca: this.props.loca,
        ind: this.props.ind,
        type: this.props.type,
        columnid: "",
        cur_ref_index: 0,
        showmodel: false,
        show_model_list: false,
        mainFilt: {
            co: "",
            cl: "",
            mc: "",
            an: "",
            ct: "",
            af: "",
            rf: { id: "", value: "" },
            dc: { id: "", value: "", label: "" },
            ch: [],
        },
    }

    constructor(props) {
        super(props);
        this.callMsc = this.callMsc.bind(this);
        this.changeFn = this.changeFn.bind(this);
        this.addFn = this.addFn.bind(this);
        this.removeFn = this.removeFn.bind(this);
        this.removeAllFn = this.removeAllFn.bind(this);
        this.selectStd = this.selectStd.bind(this);
        this.setcolumn = this.setcolumn.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.checkRefrecord = this.checkRefrecord.bind(this);
    }

    componentDidMount() {
        let ind = this.state.ind;
        let selectedlist = this.state.selectedList;
        let std = document.getElementById("std" + ind);
        if (std &&
            !document.getElementById("std" + ind) && std.children.length > 0) {
            let fn = function (e) {
                if (std &&
                    !document.getElementById("std" + ind).contains(e.target) && std.children.length > 0
                ) {
                    for (let i = 0; i < selectedlist.length; i++) {
                        std.children.item(i).classList.remove("selected-p");
                    }
                }
            }
            window.addEventListener("click", fn);
        } else {
            let r = { record: this.state.selectedList }
            this.state.setMSC(r);
        }

        this.checkRefrecord();
    }

    componentDidUpdate(prevProps, prevState) {
        let ind = this.state.ind;
        // if (props.list.record !== this.state.selectedList) {
        if (prevProps.list.record !== this.props.list.record) {
            let selectedlist = this.state.selectedList.record;
            let std = document.getElementById("std" + ind);
            if (std &&
                !document.getElementById("std" + ind) && std.children.length > 0) {
                let fn = function (e) {
                    if (std &&
                        !document.getElementById("std" + ind).contains(e.target) && std.children.length > 0
                    ) {
                        for (let i = 0; i < selectedlist.length; i++) {
                            std.children.item(i).classList.remove("selected-p");
                        }
                    }
                }
                window.addEventListener("click", fn);
                let r = { record: this.state.selectedList }
                this.state.setMSC(r);
            }
            // else{
            //     this.state.setMSC(r);
            // }
            // let r= {record : this.state.selectedList}
            // this.state.setMSC(r);
        }
        if (prevState.selectedList !== this.state.selectedList) {
            this.checkRefrecord();
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.list !== state.selectedList || props.id !== state.id) {
            // return {
            //     selectedList: props.list,
            // };
        }
        return null;
    }

    async callMsc(val, mod_list, r_id = "0") {
        console.log("lllllllll: ", val, this.state.id);
        console.log("innnnnnnnnnnn");
        var veri = '{"referenceRecord":[{"columnid":"' + this.state.id + '"},';
        // var veri = '{"referenceRecord":[{"columnid":"' + this.state.id + '"},';
        veri += '{"tabvalue":"' + val + '" ,"colId":"' + r_id + '"}]}';
        var token = localStorage.getItem("token");
        await axios.post(this.state.loca + "/loom/reference/record", veri.toString(), {
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
        })
            .then(
                (resp) => {
                    const refrencercd = resp.data;
                    console.log("reference: ", refrencercd);
                    if ("Error" in refrencercd) {
                    } else {
                        var rff = [];
                        rff = {
                            record: refrencercd.referenceRecordList[2].records,
                        };

                        if (rff.record.length > 0) {
                            if (mod_list === true) {
                                this.setState({ refRcd: rff.record, show: false });
                                this.setVal(val, false);
                            } else {
                                this.setState({ refRcd: rff.record, show: true });
                            }
                        } else {
                            this.setState({ show: false });
                        }
                    }
                },
                (error) => {
                    this.props.showErrorCompo();
                }
            );

    };

    changeFn(val) {
        this.setState({ value: val })

        if (val !== "") {
            this.callMsc(val, false);
        } else {
            this.setState({ show: false });
        }
    };

    addFn() {
        let arr = this.state.selectedList;
        console.log("arrrrr: ", arr);
        console.log("refRcd: ", this.state.refRcd);
        console.log("value ", this.state.value);
        let absent = true;
        for (let i = 0; i < this.state.refRcd.length; i++) {
            if (this.state.refRcd[i].value === this.state.value) {
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j].id === this.state.refRcd[i].id) {
                        absent = false;
                        break;
                    }
                }
                if (absent) {
                    arr.push(this.state.refRcd[i]);
                    break;
                }
            }
        }
        console.log("addFn: ", arr);
        this.setState({ selectedList: arr, value: "" });
    };

    removeFn() {
        let ind = this.state.ind;
        let arr = this.state.selectedList;
        let reqItem = document.getElementById("std" + ind).children;
        for (let j = 0, i = 0; i < reqItem.length; i++) {
            if (reqItem.item(i).classList.contains("selected-p")) {
                arr.splice(i - j, 1);
                j++;
            }
            reqItem.item(i).classList.remove("selected-p");
        }
        this.setState({ selectedList: arr });
    };

    removeAllFn() {
        let arr = []
        this.setState({ selectedList: arr });
    };

    selectStd(index, type) {
        let ind = this.state.ind;
        let selected = this.state.selectedList;
        if (type === "single") {
            for (let i = 0; i < selected.length; i++) {
                if (i === index) {
                    document
                        .getElementById("std" + ind)
                        .children.item(i)
                        .classList.add("selected-p");
                } else {
                    document
                        .getElementById("std" + ind)
                        .children.item(i)
                        .classList.remove("selected-p");
                }
            }
        } else {
            for (let i = 0; i < selected.length; i++) {
                if (i === index) {
                    let reqItem = document.getElementById("std" + ind).children.item(i);
                    let present = reqItem.classList.contains("selected-p");
                    if (!present) {
                        reqItem.classList.add("selected-p");
                    } else {
                        reqItem.classList.remove("selected-p");
                    }
                }
            }
        }
    };

    setVal(val, bl) {
        this.setState({ value: val, show: bl });
    }

    setcolumn(index, col, type) {
        var rf = this.state.record_rq.referenceQualifier;
        var ref_filt = this.state.ref_filter;
        ref_filt = [];
        for (var r = 0; r < rf.length; r++) {
            if (rf[r].loomColumn.id === col) {
                var filt = rf[r].filter.filter;
                for (var f = 0; f < filt.length; f++) {
                    if (
                        filt[f].mc === "is dependent" ||
                        filt[f].ct === "depend_table"
                    ) {
                        var addFilt = "";
                        if (f > 0) {
                            addFilt = filt[f].af
                        }
                        var co_name = filt[f].dc.value;
                        var co_label = filt[f].dc.label;
                        let ab = this.getFieldValue(filt[f].rf.id);
                        var filt1 = JSON.parse(JSON.stringify(this.state.mainFilt));
                        filt1.af = addFilt
                        filt1.co = co_name;
                        filt1.cl = co_label;
                        filt1.ct = "reference";
                        filt1.mc = "=";
                        filt1.rf.id = ab.id;
                        filt1.rf.value = ab.value;

                        ref_filt.push(filt1);
                    }
                }
            }
            if (rf[r].loomColumn.id === col && "filter" in rf[r]) {
                var filtt = rf[r].filter.filter;
                for (var d = 0; d < filtt.length; d++) {
                    if (filtt[d].ct === "depend_table") {
                        var col_name = filtt[d].dc.value;
                        var co_label = filt[f].dc.label;
                        let ab = this.getFieldValue(filtt[d].rf.id);
                        filtt = this.state.filt;
                        filtt.co = col_name;
                        filtt.co = co_label;
                        filtt.ct = type;
                        filtt.mc = "=";
                        filtt.rf.id = ab.id;
                        filtt.rf.value = ab.value;
                        ref_filt.push(filtt);
                    }
                }
            }
        }
        if (ref_filt.length === 0) {
            ref_filt.push(JSON.parse(JSON.stringify(this.state.mainFilt)));
        }
        this.setState({
            columnid: col,
            //   cur_ref_name: name,
            //   cur_ref_type: type,
            cur_ref_index: index,
            showmodel: true,
            ref_filter: ref_filt,
        });
        this.handleShow();
    }

    getFieldValue(col_id) {
        var rcd = this.state.record;
        if (rcd !== "null" && rcd !== "") {
            for (var r = 0; r < rcd.length; r++) {
                if (rcd[r].id === col_id) {
                    return rcd[r].value;
                }
            }
        }
    }

    async checkRefrecord() {

        console.log( "tabName",this.state.tabname);
        var token = localStorage.getItem("token");
        axios
            .get(
                this.state.loca + "/loom/get/reference/qualifier/" + this.state.tabname,
                {
                    headers: {
                        authorization: "Bearer " + token,
                    },
                }
            )
            .then(
                (resp) => {
                    const rq_data = resp.data;
                    if (rq_data !== "") {
                        this.setState({ record_rq: rq_data });
                    }
                },
                (error) => {
                    let err = {
                        message: error.message,
                        code: error.response.status,
                    };
                    this.props.showErrorCompo({ state: { err: err } });
                }
            );
    }

    handleShow() {
        this.setState({ show_model_list: true });
    }

    handleClose() {
        this.setState({ show_model_list: false });
    }

    setRef(val, r_id) {
        console.log(val, r_id);
        this.callMsc(
            val,
            true,
            r_id
        );
        this.handleClose();
    }

    render() {
        return (
            <div>
                {/* <div className="col-md-3"> */}
                <div
                    id={"std" + this.state.ind}
                    className="card form-control formpadd formbor ms-std-container"
                    disabled
                >
                    {this.state.selectedList.length > 0 &&
                        this.state.selectedList.map((item, index) => (
                            <h5
                                key={index}
                                className="m-1"
                                onClick={(e) => {
                                    if (e.ctrlKey) {
                                        this.selectStd(index, "multiple");
                                    } else {
                                        this.selectStd(index, "single");
                                    }
                                }}
                            >
                                {item.value}
                            </h5>
                        ))}
                </div>
                <div style={{ display: "flex" }}>
                    <input
                        type="text"
                        className={
                            "form-control formpadd formbor"
                        }
                        value={this.state.value}
                        onChange={(e) => {
                            this.changeFn(e.target.value);
                        }}
                    ></input>
                    <div
                        className="btnsrc vlpointer"
                        onClick={(e) =>
                            this.setcolumn(
                                this.state.ind,
                                this.state.id,
                                this.state.type,
                            )
                        }
                    >
                        <i
                            className="fa fa-search"
                            aria-hidden="true"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                        ></i>
                    </div>
                </div>

                {this.state.refRcd.length > 0 && this.state.show && (
                    <div className="std-sf_container">
                        {this.state.refRcd.map((obj_ref, or_i) => (
                            <div
                                key={or_i}
                                className="refrcd"
                                onClick={(e) => {
                                    this.setVal(obj_ref.value, false);
                                }}
                            >
                                {obj_ref.value}
                            </div>
                        ))}
                    </div>
                )}
                {/* </div> */}
                <div style={{ flexDirection: "row py-1" }}>
                    <button
                        className="btn btn-sm btn-success m-1 ms-0"
                        onClick={(e) => {
                            this.addFn();
                        }}
                    >
                        Add
                    </button>
                    <button
                        className="btn btn-sm btn-secondary m-1"
                        onClick={(e) => {
                            this.removeFn();
                        }}
                    >
                        Remove
                    </button>
                    <button
                        className="btn btn-sm btn-dark m-1"
                        onClick={() => {
                            this.removeAllFn();
                        }}
                    >
                        Remove All
                    </button>
                </div>
                <Modal
                    dialogClassName="my-modal"
                    show={this.state.show_model_list}
                    onHide={this.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModelList
                            setRef={(val, r_id) => this.setRef(val, r_id)}
                            columnid={this.state.columnid}
                            tabId={this.state.tabId}
                            loca={this.state.loca}
                            colBoolean={true}
                            isMobile={this.state.isMobile}
                            tabname={this.state.tabname}
                            ref_filt={this.state.ref_filter}
                        ></ModelList>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default MultipleSelectCompo;