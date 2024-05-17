import React, { Component } from "react";
import axios from "axios";
import WorkInProgress from "./work_in_progress";

class ThemeDesignComponent extends Component {
  state = {
    thm_dsg: [{}],
    loading: false,
    colState: false,
    col_mn: {},
    css: {},
    color: [{}],
    font: [{}],
    fontSize: [{}],
    page_error: false,
    error: "",
    loca: this.props.loca,
  };

  constructor(props) {
    super(props);
    this.formChangefn = this.formChangefn.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(this.state.loca + "/loom/get/user/theme", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        const themedata = resp.data;
        console.log(themedata);
        if (themedata !== "") {
          if ("Error" in themedata) {
            this.setState({
              loading: false,
              page_error: true,
              error: themedata.Error,
            });
          } else {
            this.setState({
              thm_dsg: themedata.mainTheme[0].theme,
              loading: false,
            });
          }
        }
      });
  }

  formChangefn(val) {
    if (val !== "" && val !== "none") {
      var token = localStorage.getItem("token");
      this.setState({ colState: false });

      axios
        .get(this.state.loca + "/loom/get/themeinfo/" + val, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((resp) => {
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
                col_mn: coldata,
                css: coldata,
                color: coldata.css.css[0].color,
                font: coldata.css.css[0].font,
                fontSize: coldata.css.css[0].fontSize,
              });
            }
          }
        });
    }
  }

  render() {
    return (
      <div className="">
        {this.state.loading === true ? (
          <WorkInProgress></WorkInProgress>
        ) : (
          <div>
            <select
              className="form-select prefinputlis"
              aria-label="Default"
              onChange={(e) => this.formChangefn(e.target.value)}
            >
              <option value="none">None</option>
              {this.state.thm_dsg.map((obj, index) => (
                <option key={index} value={obj.name}>
                  {obj.label}
                </option>
              ))}
            </select>
            <div className="row">
              <div className="col-md-4">
                {this.state.color.map((col, obj_c) => (
                  <div key={obj_c}>
                    {col.name}
                    <input
                      className="inpt_type"
                      type="text"
                      placeholder="color"
                    ></input>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                {this.state.font.map((fnt, obj_f) => (
                  <div key={obj_f}>
                    {fnt.name}
                    <input
                      className="inpt_type"
                      type="text"
                      placeholder="font"
                    ></input>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                {this.state.fontSize.map((fns, obj_fs) => (
                  <div key={obj_fs}>
                    {fns.name}
                    <input
                      className="inpt_type"
                      type="text"
                      placeholder="fontSize"
                    ></input>
                  </div>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <button className=" btnnn btn btn-primary" type="button">
                  Set
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default ThemeDesignComponent;
