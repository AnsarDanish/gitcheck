import React, { Component } from "react";

class SubClient extends Component {
  state = {
    record: [],
    rcd: [],
    button: [],
    name: "",
    value: new Date(),
    page_error: false,
    error: "",
  };

  constructor(props) {
    super(props);
    this.formChangefn = this.formChangefn.bind(this);
    this.callbtn = this.callbtn.bind(this);
    this.validationfn = this.validationfn.bind(this);
    this.copyparent = this.copyparent.bind(this);
  }

  componentDidMount() {
    this.setState({
      page_error: this.props.page_error,
      error: this.props.error,
      record: this.props.record,
      rcd: this.props.rcd,
      button: this.props.button,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.page_error !== prevState.page_error ||
      nextProps.error !== prevState.error ||
      nextProps.record !== prevState.record ||
      nextProps.rcd !== prevState.rcd ||
      nextProps.button !== prevState.button
    ) {
      return {
        page_error: nextProps.page_error,
        error: nextProps.error,
        record: nextProps.record,
        rcd: nextProps.rcd,
        button: nextProps.button,
      };
    } else return null;
  }

  copyparent(index, ind) {
    this.props.copyparent(index, ind);
  }

  formChangefn(vl, index, ob, ind) {
    this.props.formChangefn(vl, index, ob, ind);
  }

  validationfn(vl, index, ob, e, ind) {
    this.props.validationfn(vl, index, ob, e, ind);
  }

  callbtn(nam) {
    this.props.callbtn(nam);
  }

  render() {
    return (
      <div>
        {this.state.page_error === true && (
          <div
            className="alert alert-danger form_alt"
            role="alert"
          >
            {this.state.error}
          </div>
        )}

        {/* {this.state.record.length === 0 && (
					<div className="spinner-border" role="status">
						<span className="sr-only">No Record Found</span>
					</div>
				)} */}

        {this.state.rcd.map((obj, index) => (
          <span key={index}>
            {obj.column.map((objcl, ind) => (
              <span key={ind}>
                {objcl.uivalid.visible === "true" && (
                  <div className="inppd" key={objcl.name}>
                    {objcl.type === "String" ? (
                      <div className="form-group objpdg ">
                        {ind === 0 ? (
                          <div>
                            {objcl.uivalid.mandatory === "true" &&
                              objcl.value !== "" && (
                                <i
                                  className="fa fa-asterisk mndtryfalse"
                                  aria-hidden="true"
                                ></i>
                              )}

                            {objcl.uivalid.mandatory === "true" &&
                              objcl.value === "" && (
                                <i
                                  className="fa fa-asterisk mndtrytrue"
                                  aria-hidden="true"
                                ></i>
                              )}
                            <span>{objcl.label}</span>
                            {objcl.verified === "unverified" && (
                              <div
                                className="alert alert-danger form_alt"
                                role="alert"
                              >
                                Please verify your charecter..!
                              </div>
                            )}
                          </div>
                        ) : null}
                        <div className="inputflx">
                          {ind > 0 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}
                          {ind === 0 && obj.column.length > 1 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}
                          <input
                            type="text"
                            className="form-control formpadd"
                            value={objcl.value}
                            readOnly={objcl.uivalid.read_only === "true"}
                            maxLength={objcl.uivalid.max_length}
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                objcl.name,
                                ind
                              )
                            }
                            onMouseOut={(e) =>
                              this.validationfn(
                                e.target.value,
                                index,
                                objcl.name,
                                objcl.ob,
                                ind
                              )
                            }
                          ></input>
                          <div>
                            {ind > 0 ? (
                              <input
                                className="copybtn btn-primary"
                                type="button"
                                value="copy"
                                onClick={() => this.copyparent(index, ind)}
                              ></input>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {objcl.type === "int" ? (
                      <div className="form-group">
                        {ind === 0 ? (
                          <div>
                            {objcl.uivalid.mandatory === "true" &&
                              objcl.value !== "" && (
                                <i
                                  className="fa fa-asterisk mndtryfalse"
                                  aria-hidden="true"
                                ></i>
                              )}

                            {objcl.uivalid.mandatory === "true" &&
                              objcl.value === "" && (
                                <i
                                  className="fa fa-asterisk mndtrytrue"
                                  aria-hidden="true"
                                ></i>
                              )}
                            <span>{objcl.label}</span>
                            {objcl.verified === "unverified" && (
                              <div
                                className="alert alert-danger form_alt"
                                role="alert"
                              >
                                Please verify your integer number!
                              </div>
                            )}
                          </div>
                        ) : null}
                        <div className="inputflx">
                          {ind > 0 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}
                          {ind === 0 && obj.column.length > 1 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}
                          <input
                            type="text"
                            className={
                              objcl.verified === "unverified"
                                ? "form-control formpadd_danger"
                                : "form-control formpadd"
                            }
                            value={objcl.value}
                            readOnly={objcl.uivalid.read_only === "true"}
                            maxLength={objcl.uivalid.max_length}
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                objcl.name,
                                ind
                              )
                            }
                            onMouseOut={(e) =>
                              this.validationfn(
                                e.target.value,
                                index,
                                objcl.name,
                                objcl.ob,
                                ind
                              )
                            }
                          ></input>
                          <div>
                            {ind > 0 ? (
                              <input
                                className="copybtn btn-primary"
                                type="button"
                                value="copy"
                                onClick={() => this.copyparent(index, ind)}
                              ></input>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {objcl.type === "date" ? (
                      <div className=" form-group">
                        {objcl.verified === "unverified" && (
                          <div
                            className="alert alert-danger form_alt"
                            role="alert"
                          >
                            please verify your date!
                          </div>
                        )}
                        {ind === 0 ? (
                          <div>
                            {objcl.uivalid.mandatory === "true" &&
                              objcl.value !== "" && (
                                <i
                                  className="fa fa-asterisk mndtryfalse"
                                  aria-hidden="true"
                                ></i>
                              )}

                            {objcl.uivalid.mandatory === "true" &&
                              objcl.value === "" && (
                                <i
                                  className="fa fa-asterisk mndtrytrue"
                                  aria-hidden="true"
                                ></i>
                              )}
                            <span>{objcl.label}</span>
                          </div>
                        ) : null}
                        <div className="inputflx">
                          {ind > 0 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}
                          {ind === 0 && obj.column.length > 1 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}
                          <input
                            type="date"
                            className="objmargin"
                            value={objcl.value}
                            readOnly={obj.uivalid.read_only === "true"}
                            maxLength={objcl.uivalid.max_length}
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                objcl.name,
                                ind
                              )
                            }
                            onMouseOut={(e) =>
                              this.validationfn(
                                e.target.value,
                                index,
                                objcl.name,
                                objcl.ob,
                                ind
                              )
                            }
                          ></input>
                          <input
                            type="time"
                            className="objpadd"
                            value={objcl.value}
                            readOnly={objcl.uivalid.read_only === "true"}
                            maxLength={objcl.uivalid.max_length}
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                objcl.name,
                                ind
                              )
                            }
                            onMouseOut={(e) =>
                              this.validationfn(
                                e.target.value,
                                index,
                                objcl.name,
                                ind,
                                objcl.ob
                              )
                            }
                          ></input>
                        </div>
                      </div>
                    ) : null}
                    {objcl.type === "boolean" ? (
                      <div className="form-check fmcheck">
                        {ind === 0 ? (
                          <div>
                            {objcl.uivalid.mandatory === "true" &&
                              objcl.value === "true" && (
                                <i
                                  className="fa fa-asterisk mndtryfalse"
                                  aria-hidden="true"
                                ></i>
                              )}

                            {objcl.uivalid.mandatory === "true" &&
                              objcl.value === "false" && (
                                <i
                                  className="fa fa-asterisk mndtrytrue"
                                  aria-hidden="true"
                                ></i>
                              )}
                            <span>{objcl.label}</span>
                          </div>
                        ) : null}
                        <div className="inputflx">
                          {ind > 0 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}
                          {ind === 0 && obj.column.length > 1 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}
                          <input
                            type="checkbox"
                            className="checkpadd"
                            value={objcl.value === "true" ? true : false}
                            readOnly={objcl.uivalid.read_only === "true"}
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                objcl.name,
                                ind
                              )
                            }
                            onMouseOut={(e) =>
                              this.validationfn(
                                e.target.value,
                                index,
                                objcl.name,
                                objcl.ob,
                                ind
                              )
                            }
                          ></input>
                        </div>
                      </div>
                    ) : null}
                    {objcl.type === "Choice" ? (
                      <div className="form-group  ">
                        {ind === 0 ? (
                          <div>
                            {objcl.uivalid.mandatory === "true" &&
                              objcl.value !== "None" &&
                              objcl.value !== "" && (
                                <i
                                  className="fa fa-asterisk mndtryfalse"
                                  aria-hidden="true"
                                ></i>
                              )}

                            {objcl.uivalid.mandatory === "true" &&
                              (objcl.value === "None" ||
                                objcl.value === "") && (
                                <i
                                  className="fa fa-asterisk mndtrytrue"
                                  aria-hidden="true"
                                ></i>
                              )}

                            <span>{objcl.label}</span>
                            {objcl.verified === "unverified" && (
                              <div
                                className="alert alert-danger form_alt"
                                role="alert"
                              >
                                Please verify your charecter..!
                              </div>
                            )}
                          </div>
                        ) : null}
                        <div className="inputflx">
                          {ind > 0 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}
                          {ind === 0 && obj.column.length > 1 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}

                          <select
                            className="form-control form-select formpadd "
                            aria-label="Default select example"
                            onMouseOut={(e) =>
                              this.validationfn(
                                e.target.value,
                                index,
                                objcl.name,
                                objcl.ob,
                                ind
                              )
                            }
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                objcl.name,
                                ind
                              )
                            }
                            maxLength={objcl.uivalid.max_length}
                            readOnly={objcl.uivalid.read_only === "true"}
                          >
                            <option value="None">None</option>
                            {objcl.choice.map((ch, chi) => (
                              <option value={ch.name} key={chi}>
                                {ch.value}
                              </option>
                            ))}
                          </select>

                          <div>
                            {ind > 0 ? (
                              <input
                                className="copybtn btn-primary"
                                type="button"
                                value="copy"
                                onClick={() => this.copyparent(index, ind)}
                              ></input>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {objcl.type === "reference" ? (
                      <div className="form-group">
                        {ind === 0 ? (
                          <div>
                            {objcl.uivalid.mandatory === "true" &&
                              objcl.value !== "" && (
                                <i
                                  className="fa fa-asterisk mndtryfalse"
                                  aria-hidden="true"
                                ></i>
                              )}

                            {objcl.uivalid.mandatory === "true" &&
                              objcl.value === "" && (
                                <i
                                  className="fa fa-asterisk mndtrytrue"
                                  aria-hidden="true"
                                ></i>
                              )}
                            <span>{objcl.label}</span>
                          </div>
                        ) : null}
                        <div className="inputflx">
                          {ind > 0 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}
                          {ind === 0 && obj.column.length > 1 ? (
                            <span className="inputpd">{ind + 1}</span>
                          ) : null}
                          <input
                            type="text"
                            className="form-control formpadd"
                            value={objcl.value.value}
                            readOnly={objcl.uivalid.read_only === "true"}
                            onChange={(e) =>
                              this.formChangefn(
                                e.target.value,
                                index,
                                objcl.name,
                                ind
                              )
                            }
                            onMouseOut={(e) =>
                              this.validationfn(
                                e.target.value,
                                index,
                                objcl.name,
                                objcl.ob,
                                ind
                              )
                            }
                          ></input>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </span>
            ))}
          </span>
        ))}

        <div className=" form-group ">
          {this.state.button.map((objcl) => (
            <button
              className=" insrtbtn btn btn-primary "
              key={objcl.name}
              onClick={() => this.callbtn(objcl.name)}
            >
              {objcl.value}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default SubClient;
