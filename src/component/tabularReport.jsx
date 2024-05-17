import React, { Component } from "react";
import axios from "axios";
import "../css/tabularReport.css"
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import WorkInProgress from "./work_in_progress";
import html2canvas from "html2canvas";

class TabularReportCompo extends Component {
    state = {
        loca: this.props.loca,
        id: this.props.recordId,
        reportlist: {},
        recordColumn: [],
        singleColumn: [],
        page_error: false,
        error: "",
        page_message: false,
        message: "",
        nm_list: [],
    }

    constructor(props) {
        super(props);
        this.downloadImage = this.downloadImage.bind(this);
    }

    componentDidMount() {
        let recordId = this.state.id;
        if (recordId !== "" || recordId !== "none" || recordId !== undefined) {
            var token = localStorage.getItem("token");
            axios
                .get(this.state.loca + "/loom/get/tabular/report/" + recordId, {
                    headers: {
                        authorization: "Bearer " + token,
                    },
                })
                .then((res) => {
                    const rcd = res.data;
                    console.log("response: ", rcd);
                    if (rcd !== "") {
                        if ("Error" in rcd) {
                            this.setState({
                                loading: false,
                                page_error: true,
                                error: rcd.Error,
                            });
                        } else {
                            var nm_list = [];
                            for (var i = 0; i < rcd.tabularRecord[0].recordColumn[0].record.length; i++) {
                                nm_list.push(rcd.tabularRecord[0].recordColumn[0].record[i].name);
                            }

                            this.setState({
                                reportlist: rcd,
                                recordColumn: rcd.tabularRecord[0].recordColumn,
                                singleColumn: rcd.tabularRecord[1].singleColumn,
                                nm_list: nm_list,
                            });
                        }
                    }
                },
                    (error) => {
                        this.props.showErrorCompo();
                        console.log(error);
                    });
        }
    }

    async downloadImage() {
        const dataUrl = await htmlToImage.toJpeg(this.state.reportlist.current, {
            backgroundColor: "white",
            quality: 0.95,
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
        });
        const pdf = new jsPDF();
        pdf.addImage(dataUrl, "JPEG", 0, 0);
        pdf.save(".pdf");

        // const pdf = new jsPDF("portrait", "pt", "a4"); 
        // const data = await html2canvas(document.querySelector("#pdf"));
        // const img = data.toDataURL(this.state.reportlist.current);  
        // const imgProperties = pdf.getImageProperties("JPEG");
        // const pdfWidth = pdf.internal.pageSize.getWidth();
        // const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        // pdf.addImage(img, "JPEG", 0, 0, pdfWidth, pdfHeight);
        // pdf.save("report.pdf");
    }

    //     async downloadImage() {
    //         // Set the desired page dimensions (adjust as needed)
    //         const pageWidth = 210; // A4 width in mm
    //         const pageHeight = 290; // A4 height in mm

    //         // Set the margins (adjust as needed)
    //         const margin = 10;

    //         // Set the image quality (adjust as needed)
    //         // const quality = 3.0;

    //         // Initialize jsPDF
    //         const pdf = new jsPDF({
    //             unit: "mm",
    //             format: "a4",
    //         });
    //         const dataUrl = await htmlToImage.toJpeg(this.state.reportlist.current, {
    //             backgroundColor: "white",
    //             quality: 0.95,
    //         });
    //         // Create a Blob from the data URL
    //         const blob = await (await fetch(dataUrl)).blob();

    //         pdf.addImage(
    //             await URL.createObjectURL(blob),
    //             "JPEG",
    //             margin,
    //             margin,
    //             pageWidth - margin * 1,
    //             pageHeight - margin * 1
    //         );

    //         // Save the PDF
    //         pdf.save("invoice.pdf");
    //     // pdf.addImage(dataUrl, "JPEG", 0, 0);
    //     // pdf.save("invoice.pdf");
    // };

    render() {
        return (
            <div className="pagesetup">
                {this.state.loading === true ? (
                    <WorkInProgress></WorkInProgress>
                ) : (
                    <div>
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3 heading">
                                <label>Tabular Report</label>
                            </div>
                            <div className="col-md-5 bttn">
                                <button
                                    className="csm_btn csm_btn_pri col-md-2 sub-btn"
                                    onClick={() => {
                                        this.downloadImage();
                                    }}
                                >
                                    Download
                                </button>
                            </div>
                        </div>

                        <div ref={this.state.reportlist}>
                            <div className="container">
                                <div className="rpt_border rddd">
                                    {this.state.singleColumn.length !== 0 && (
                                        <table>
                                            <thead>
                                                {this.state.singleColumn.map((obj, index) => (
                                                    <tr key={index}>
                                                        <td className="tdddd">{obj.name}</td>
                                                        <td className="tddd1">{obj.value}</td>
                                                    </tr>
                                                ))}
                                            </thead>
                                        </table>
                                    )}
                                    <div className="rpt_border">
                                        {this.state.recordColumn.length !== 0 && (
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        {this.state.nm_list.map((obj, index) => (
                                                            <th key={index}>{obj}</th>
                                                        ))}
                                                    </tr>
                                                    {this.state.recordColumn.map((obj, index) => (
                                                        <tr key={index}>
                                                            {obj.record.map((obj_in, index_in) => (
                                                                <td key={index_in}>{obj_in.value}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}


export default TabularReportCompo; 