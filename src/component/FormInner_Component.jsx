import "../css/formcompo.css";
import NewFilterCompo from "./NewFilterCompo";
import React from "react";
import { Input } from "reactstrap";
import JoditEditor from "jodit-react";
import MultipleSelectCompo from "./multipleSelectCompo";
import { UncontrolledTooltip } from "reactstrap";

class FormInnerComponent extends React.Component {
  state = {
    obj: this.props.obj,
    m_rid: this.props.m_rid,
    index: this.props.index,
    record: this.props.record,
    tabname: this.props.tabname,
    setm_rid: this.props.setm_rid,
    validationfn: this.props.validationfn,
    formChangefn: this.props.formChangefn,
    refrecord: this.props.refrecord,
    setcolumn: this.props.setcolumn,
    calltimeline: this.props.calltimeline,
    callfilter: this.props.callfilter,
    callScript: this.props.callScript,
    setRefrecord: this.props.setRefrecord,
    choice_mn: this.props.choice_mn,
    showlist: this.props.showlist,
    col_mn: this.props.col_mn,
    column_depend: this.props.col_depend,
    filtarray: this.props.filtarray,
    timeline: this.props.timeline,
    loca: this.props.loca,
    tabId: this.props.tabId,
    isMobile: this.props.isMobile,
    column_other: this.props.column_other,
    reScript: this.props.reScript,
    editor: this.props.editor,
    mscList: this.props.mscList,
    setMSC: this.props.setMSC,
    setContextMenu: this.props.setContextMenu,
    ob: this.props.ob,
    validation_error: this.props.validation_error,
    validation: this.props.validation,
    verify_error: this.props.verify_error,
    setref_filter: this.props.setref_filter,
    col_mn_ref: this.props.col_mn_ref,
    keyValueJson: this.props.keyValueJson,
    groupkeyValue: this.props.groupkeyValue,
    getSingleInfo: this.props.getSingleInfo,
    showRecent: this.props.showRecent,

  };

  constructor(props) {
    super(props);
    this.handleAddParentInput = this.handleAddParentInput.bind(this);
    this.handleAddChildInput = this.handleAddChildInput.bind(this);
    this.handleRemoveParentInput = this.handleRemoveParentInput.bind(this);
    this.handleRemoveChildInput = this.handleRemoveChildInput.bind(this);
  }

  componentDidMount() {
    let obj = this.state.obj;
    if (obj.type === "group_key_value") {
      this.setState({ groupkeyValue: obj.value });
    }
    return obj;
  }

  componentDidUpdate(props) {
    if (
      props.col_mn !== this.state.col_mn ||
      props.col_depend !== this.state.column_depend ||
      props.col_mn_ref !== this.state.col_mn_ref ||
      props.refrecord !== this.state.refrecord ||
      props.choice_mn !== this.state.choice_mn ||
      props.verify_error !== this.state.verify_error
    ) {
      this.setState({
        col_mn: props.col_mn,
        refrecord: props.refrecord,
        col_mn_ref: props.col_mn_ref,
        column_depend: props.col_depend,
        choice_mn: props.choice_mn,
        verify_error: props.verify_error,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.col_mn !== state.col_mn) {
      return {
        col_mn: props.col_mn,
      };
    }
    if (props.verify_error !== state.verify_error) {
      return {
        verify_error: props.verify_error,
      };
    }
    if (
      props.validation !== state.validation ||
      props.validation_error !== state.validation_error ||
      props.ob !== state.ob
    ) {
      return {
        validation: props.validation,
        validation_error: props.validation_error,
        ob: props.ob,
      };
    }
    return null;
  }

  handleAddParentInput() {
    let t = {
      name: "",
      choice: [{ value: "" }],
    };
    let properties = this.state.groupkeyValue.properties;
    properties.push(t);
    this.setState({ groupkeyValue: properties });
  }

  handleAddChildInput(parentIndex) {
    let t = { value: "" };
    let childProps = this.state.groupkeyValue.properties[parentIndex].choice;
    childProps.push(t);
    this.state.groupkeyValue.properties[parentIndex].choice = childProps;
    this.setState({
      groupkeyValue: { properties: this.state.groupkeyValue.properties },
    });
  }

  handleRemoveParentInput(parentIndex) {
    let array = this.state.groupkeyValue.properties;
    if (parentIndex !== -1) {
      array.splice(parentIndex, 1);
    }
    let prp = {};
    prp.properties = array;
    this.setState({ groupkeyValue: prp });
  }

  handleRemoveChildInput(parentIndex, childindex) {
    let array = this.state.groupkeyValue.properties[parentIndex].choice;
    if (childindex !== -1) {
      array.splice(childindex, 1);
    }
    this.state.groupkeyValue.properties[parentIndex].choice = array;
    this.setState({
      groupkeyValue: { properties: this.state.groupkeyValue.properties },
    });
  }

  render() {
    return (
      <div>

        {this.state.obj.columnAccess === "true" &&
          this.state.obj.uivalid.visible === "true" && (
            <div className="  inppd " key={this.state.obj.name}>
              {this.state.obj.type === "script" || this.state.obj.type === "note" ? (
                <div className="form-group objpdg ">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    className="field_hd"
                  // onContextMenu={(e) => {
                  //   e.preventDefault();
                  //   this.state.setContextMenu(
                  //     e.button,
                  //     e.nativeEvent.pageX,
                  //     e.nativeEvent.pageY,
                  //   )
                  // }}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.verified === "unverified" && (
                    <div
                      className="alert alert-danger form_alt"
                      role="alert"
                    // style={{
                    //   padding: "0.2rem 0.2rem",
                    //   marginBottom: "0px",
                    // }}
                    >
                      Please verify your character!
                    </div>
                  )}
                  <textarea
                    type="text"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "form-control formpadd_danger unverifi"
                        : "form-control formpadd areaheight"
                    }
                    spellCheck={false}
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                      )
                    }
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></textarea>
                </div>
              ) : null}
              {this.state.obj.type === "String" ? (
                <div className="form-group objpdg "  >
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.uivalid.group_mandatory === "false" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.uivalid.group_mandatory === "true" &&
                    this.state.obj.value === "" && (

                      <div>
                        <i
                          className="fa fa-asterisk mndtrygptrue"
                          aria-hidden="true"
                        ></i>
                      </div>
                    )}

                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  {this.state.obj.label.showHelper === "true" && (
                    <div className="alert alert-warning">
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: 14,
                          fontWeight: "bold",
                          margin: "0rem",
                          color: "black",
                        }}
                      >
                        {this.state.obj.label.helper}
                      </pre>
                    </div>
                  )}
                  {this.state.ob === this.state.obj.name &&
                    this.state.validation_error === true &&
                    this.state.validation !== "" && (
                      <span className="popup_txt_form popuptext" id="myPopup">
                        {this.state.validation}
                      </span>
                    )}
                  <Input
                    type="text"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "form-control formpadd_danger unverifi"
                        : "form-control formpadd "
                    }
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only,
                        undefined, undefined, undefined, this.state.obj
                      )
                    }
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></Input>
                </div>
              ) : null}
              {this.state.obj.type === "int" ? (
                <div className="form-group"
                /*  style={{ width: "100%"}} */
                >

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.uivalid.group_mandatory === "false" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.uivalid.group_mandatory === "true" &&
                    this.state.obj.value === "" && (


                      <i
                        className="fa fa-asterisk mndtrygptrue"
                        aria-hidden="true"
                      ></i>

                    )}

                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  {this.state.obj.label.name}

                  {this.state.obj.verified === "unverified" && (
                    <div className="alert alert-danger form_alt" role="alert">
                      Please verify your integer number!
                    </div>
                  )}
                  <input
                    type="text"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "form-control formpadd_danger unverifi"
                        : "form-control formpadd "
                    }
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only
                        ,
                        undefined, undefined, undefined, this.state.obj
                      )
                    }
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></input>
                </div>
              ) : null}
              {this.state.obj.type === "aadhar_number" ? (
                <div className="form-group">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  {this.state.obj.verified === "unverified" && (
                    <div className="alert alert-danger form_alt" role="alert">
                      Please verify your aadhar number!
                    </div>
                  )}
                  <input
                    type="text"
                    datatype="aadhar_number"
                    placeholder="0000-0000-0000"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "form-control formpadd_danger unverifi"
                        : "form-control formpadd "
                    }
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                      )
                    }
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></input>
                </div>
              ) : null}
              {this.state.obj.type === "date" ? (
                <div className=" form-group">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  {this.state.obj.verified === "unverified" && (
                    <div className="alert alert-danger form_alt" role="alert">
                      please verify your date!
                    </div>
                  )}
                  <input
                    type="date"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "objpadd_tm unverifi"
                        : "objpadd_tm"
                      // this.state.obj.verified === "unverified"
                      //   ? "lom_form_control formpadd unverifi"
                      //   : "lom_form_control "
                    }
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                      )
                    }
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></input>
                </div>
              ) : null}
              {this.state.obj.type === "time" ? (
                <div className=" form-group">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  {this.state.obj.verified === "unverified" && (
                    <div className="alert alert-danger form_alt" role="alert">
                      please verify your date!
                    </div>
                  )}
                  <input
                    type="time"
                    step="1"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "objpadd_tm unverifi"
                        : "objpadd_tm"
                    }
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                      )
                    }
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></input>
                </div>
              ) : null}
              {this.state.obj.type === "datetime" ? (
                <div className=" form-group">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  {this.state.obj.verified === "unverified" && (
                    <div className="alert alert-danger form_alt" role="alert">
                      please verify your date!
                    </div>
                  )}
                  <input
                    type="datetime-local"
                    step="1"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "objpadd_tm unverifi"
                        : "objpadd_tm"
                    }
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                      )
                    }
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></input>
                </div>
              ) : null}
              {this.state.obj.type === "email" ? (
                <div className="form-group">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  {this.state.obj.verified === "unverified" && (
                    <div className="alert alert-danger form_alt" role="alert">
                      Please verify your email!
                    </div>
                  )}
                  <input
                    type="text"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "form-control formpadd_danger unverifi"
                        : "form-control formpadd "
                    }
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                      )
                    }
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></input>
                </div>
              ) : null}
              {this.state.obj.type === "boolean" ? (
                <div className="form-check fmcheck">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "true" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "false" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  <input
                    type="checkbox"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "checkpadd unverifi"
                        : "checkpadd"
                    }
                    // value={this.state.obj.value === "true" ? true : false}
                    checked={this.state.obj.value === "true" ? true : false}
                    disabled={this.state.obj.uivalid.read_only === "true"}
                    onChange={(e) => {
                      this.state.formChangefn(
                        e.target.checked.toString(),
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                      );
                    }}
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></input>

                </div>
              ) : null}
              {this.state.obj.type === "password" ? (
                <div className="form-group">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  {this.state.obj.verified === "unverified" && (
                    <div className="alert alert-danger form_alt" role="alert">
                      Please verify your email!
                    </div>
                  )}
                  <input
                    type="password"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "form-control formpadd_danger unverifi"
                        : "form-control formpadd "
                    }
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                      )
                    }
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></input>
                </div>
              ) : null}
              {this.state.obj.type === "choice" &&
                this.state.obj.name !== "filter" ? (
                <div className="form-group ">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "None" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    (this.state.obj.value === "None" ||
                      this.state.obj.value === "") && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  <select
                    className="form-control form-select formpadd "
                    aria-label="Default select example"
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only,
                        undefined, undefined, undefined, this.state.obj
                      )
                    }
                  >
                    <option value="None">{this.state.obj.value==""?"None":this.state.obj.value}</option>
                    {this.state.obj.choice && this.state.obj.choice
                      .slice()
                      .sort((a, b) => a.value - b.value)
                      .map((ch, chi) => (
                        <option key={chi} value={ch.name}>
                          {ch.value}
                        </option>
                      ))}
                  </select>
                </div>
              ) : null}
              {this.state.obj.type === "reference" ? (
                <div>
                  <div className="form-group">
                    {this.state.obj.uivalid.mandatory === "true" &&
                      this.state.obj.value.value !== "" && (
                        <i
                          className="fa fa-asterisk mndtryfalse"
                          aria-hidden="true"
                        ></i>
                      )}
                    {this.state.obj.uivalid.mandatory === "true" &&
                      this.state.obj.uivalid.group_mandatory === "false" &&
                      this.state.obj.value.value === "" && (
                        <i
                          className="fa fa-asterisk mndtrytrue"
                          aria-hidden="true"
                        ></i>
                      )}

                    {this.state.obj.uivalid.mandatory === "true" &&
                      this.state.obj.uivalid.group_mandatory === "true" &&
                      this.state.obj.value.value === "" && (
                        <i
                          className="fa fa-asterisk mndtrygptrue"
                          aria-hidden="true"
                        ></i>
                      )}
                    <span
                      id={"tiptar" + this.state.obj.index}
                      className="field_hd"
                      onContextMenu={(e) => {
                        e.preventDefault();
                        this.state.m_rid.current = this.state.obj.id;
                        this.state.setContextMenu(
                          e.button,
                          e.nativeEvent.pageX,
                          e.nativeEvent.pageY
                        );
                      }}
                    // data-bs-custom-class="tooltip"
                    // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                    >
                      {this.state.obj.label.name}
                    </span>
                    {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                    {this.state.obj.verified === "unverified" && (
                      <div className="alert alert-danger form_alt" role="alert">
                        record not found!
                      </div>
                    )}
                    <div style={{ display: "flex" }}>
                      <input
                        type="text"
                        className={
                          this.state.obj.verified === "unverified"
                            ? "form-control formpadd formbor unverifi"
                            : "form-control formpadd formbor"
                        }
                        maxLength={this.state.obj.uivalid.max_length}
                        value={this.state.obj.value.value}
                        readOnly={this.state.obj.uivalid.read_only === "true"}
                        disabled={
                          this.state.obj.uivalid.read_only === "true"
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          this.state.formChangefn(
                            e.target.value,
                            this.state.index,
                            this.state.obj.name,
                            this.state.obj.type,
                            this.state.obj.id,
                            false,
                            this.state.obj.uivalid.read_only,
                            undefined,
                            undefined,
                            undefined,
                            this.state.obj,
                            this.state.obj.rcd_info
                          )
                        }
                        onBlur={(e) =>
                          setTimeout(() => {
                            if (this.state.obj.verified !== "verified") {
                              this.state.validationfn(
                                this.state.obj.value,
                                // e.target.value,
                                this.state.index,
                                this.state.obj.name,
                                this.state.obj.type,
                                this.state.obj.id
                              );
                            }
                          }, 500)
                        }
                        onClick={() => {
                          //this.showRecent()
                          this.state.showRecent(this.state.obj, this.state.index, true)
                        }}

                      ></input>
                      {/* <div className="">
                        <i
                          className="btnsrc vlpointer fa fa-search"
                          aria-hidden="true"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={(e) =>
                            this.state.setcolumn(
                              this.state.index,
                              this.state.obj.name,
                              this.state.obj.type,
                              this.state.obj.id,
                              this.state.obj.uivalid.read_only
                            )
                          }
                        ></i>
                      </div> */}
                      <div
                        className="btnsrc vlpointer "
                        onClick={(e) =>
                          this.state.setcolumn(
                            this.state.index,
                            this.state.obj.name,
                            this.state.obj.type,
                            this.state.obj.id,
                            this.state.obj.uivalid.read_only
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

                      {/* {this.state.obj.rcd_info === "true" && (
                        <div className="">
                          <i
                            className="btnsrc vlpointer fa-solid fa-circle-info"
                            aria-hidden="true"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={(e) => {
                              this.state.getSingleInfo(
                                e, this.state.obj,
                                this.state.obj.id,
                                this.state.obj.name,
                                this.state.obj.type,
                                this.state.obj.index,
                                this.state.obj.label.name,
                                this.state.obj.uivalid.read_only,
                                // this.state.obj.depend_column
                              );
                            }}
                          ></i>
                        </div>
                      )} */}
                      {this.state.obj.value.value && this.state.obj?.rcd_info === "true" && (
                        <div
                          className="btnsrc vlpointer"
                          onClick={(e) => {
                            this.state.getSingleInfo(
                              e, this.state.obj,
                              this.state.obj.id,
                              this.state.obj.name,
                              this.state.obj.type,
                              this.state.obj.index,
                              this.state.obj.label.name,
                              this.state.obj.uivalid.read_only,
                              // this.state.obj.depend_column
                            );
                          }}
                        >
                          <i
                            className="fa-solid fa-circle-info"
                            aria-hidden="true"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          ></i>
                        </div>
                      )}
                    </div>
                  </div>
                  {this.state.refrecord.index === this.state.index &&
                    this.state.refrecord.record.length > 0 && (
                      <div className="sf_container">
                        {this.state.refrecord.record.map((obj_ref, or_i) => (
                          <div
                            className="refrcd"
                            onClick={(e) =>
                              this.state.setRefrecord(
                                obj_ref.value,
                                this.state.index,
                                this.state.obj.name,
                                this.state.obj.type,
                                obj_ref.id, "",
                                this.state.obj
                              )
                            }
                            key={or_i}
                          >
                            {obj_ref.value}
                          </div>
                        ))}
                      </div>
                    )}


                  {(this.state.obj.showRecent === true) && (
                    <div className="sf_container">
                      {this.state.obj.recentSearch.map((obj_ref, or_i) => (
                        <div
                          className="refrcd"
                          onClick={(e) =>
                            this.state.setRefrecord(
                              obj_ref.value,
                              this.state.obj.index,
                              this.state.obj.name,
                              this.state.obj.type,
                              obj_ref.id,
                              "recentSearch",
                              this.state.obj
                            )
                          }
                          key={or_i}
                        >
                          {obj_ref.value}
                        </div>
                      ))}
                    </div>

                  )}


                </div>
              ) : null}
              {this.state.obj.type === "long_description" ? (
                <div>
                  <div className="form-group">
                    {this.state.obj.uivalid.mandatory === "true" &&
                      this.state.obj.value.value !== "" && (
                        <i
                          className="fa fa-asterisk mndtryfalse"
                          aria-hidden="true"
                        ></i>
                      )}
                    {this.state.obj.uivalid.mandatory === "true" &&
                      this.state.obj.value.value === "" && (
                        <i
                          className="fa fa-asterisk mndtrytrue"
                          aria-hidden="true"
                        ></i>
                      )}
                    <span
                      id={"tiptar" + this.state.obj.index}
                      className="field_hd"
                      onContextMenu={(e) => {
                        e.preventDefault();
                        this.state.m_rid.current = this.state.obj.id;
                        this.state.setContextMenu(
                          e.button,
                          e.nativeEvent.pageX,
                          e.nativeEvent.pageY
                        );
                      }}
                    // data-bs-custom-class="tooltip"
                    // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                    >
                      {this.state.obj.label.name}
                    </span>
                    {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                    {this.state.obj.verified === "unverified" && (
                      <div className="alert alert-danger form_alt" role="alert">
                        record not found!
                      </div>
                    )}
                    <div style={{ display: "flex" }}>
                      <input
                        type="text"
                        className={
                          this.state.obj.verified === "unverified"
                            ? "form-control formpadd formbor unverifi"
                            : "form-control formpadd formbor"
                        }
                        value={this.state.obj.value.value}
                        readOnly={this.state.obj.uivalid.read_only === "true"}
                        maxLength={this.state.obj.uivalid.max_length}
                        onChange={(e) =>
                          this.state.formChangefn(
                            e.target.value,
                            this.state.index,
                            this.state.obj.name,
                            this.state.obj.type,
                            this.state.obj.id,
                            false,
                            this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                          )
                        }
                        onClick={(e) =>
                          this.state.validationfn(
                            e.target.value,
                            this.state.index,
                            this.state.obj.name,
                            this.state.obj.type,
                            this.state.obj.id
                          )
                        }
                      ></input>
                      <div className="btnsrc vlpointer">
                        <i
                          className="fa fa-search"
                          aria-hidden="true"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={(e) =>
                            this.state.setcolumn(
                              this.state.index,
                              this.state.obj.name,
                              this.state.obj.type,
                              this.state.obj.id
                            )
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                  {this.state.refrecord.this.state.index === this.state.index &&
                    this.state.refrecord.record.length > 0 && (
                      <div>
                        {this.state.refrecord.record.map((obj_ref, or_i) => (
                          <div
                            className="refrcd"
                            onClick={(e) =>
                              this.state.setRefrecord(
                                obj_ref.value,
                                this.state.index,
                                this.state.obj.name,
                                this.state.obj.type,
                                obj_ref.id
                              )
                            }
                            key={or_i}
                          >
                            {obj_ref.value}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ) : null}
              {this.state.obj.type === "filter" ? (
                <div className="form-group objpdg ">
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  <div className="filt_bdr">
                    <NewFilterCompo
                      showlist={this.state.showlist}
                      col_mn={this.state.col_mn}
                      col_depend={this.state.column_depend}
                      call_fil={(filtarray, in_index, col_id) =>
                        this.state.callfilter(
                          filtarray,
                          this.state.index,
                          in_index,
                          col_id
                        )
                      }
                      filtarray={this.state.filtarray}
                      timeline={this.state.timeline}
                      call_tm={(timeline) => this.state.calltimeline(timeline)}
                      loca={this.state.loca}
                      tabId={this.state.tabId}
                      isMobile={this.state.isMobile}
                    ></NewFilterCompo>
                  </div>
                </div>
              ) : null}
              {this.state.obj.type === "filter_ref" ? (
                <div className="form-group objpdg ">
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  <div>
                    <NewFilterCompo
                      showlist={this.state.showlist}
                      col_mn={this.state.col_mn_ref}
                      col_depend={this.state.column_depend}
                      call_fil={(filtarray, in_index, col_id) =>
                        this.state.callfilter(
                          filtarray,
                          this.state.index,
                          in_index,
                          col_id
                        )
                      }
                      // setFiltArray={this.state.setref_filter}
                      filtarray={this.state.setref_filter}
                      timeline={this.state.timeline}
                      call_tm={(timeline) => this.state.calltimeline(timeline)}
                      loca={this.state.loca}
                      tabId={this.state.tabId}
                      isMobile={this.state.isMobile}
                    ></NewFilterCompo>
                  </div>
                </div>
              ) : null}
              {this.state.obj.type === "other_table_filter" ? (
                <div className="form-group objpdg ">
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  <div>
                    <NewFilterCompo
                      showlist={this.state.showlist}
                      col_mn={this.state.column_other}
                      col_depend={this.state.column_depend}
                      call_fil={(filtarray, in_index, col_id) =>
                        this.state.callfilter(
                          filtarray,
                          this.state.index,
                          in_index,
                          col_id
                        )
                      }
                      filtarray={this.state.filtarray}
                      timeline={this.state.timeline}
                      call_tm={(timeline) => this.state.calltimeline(timeline)}
                      loca={this.state.loca}
                      tabId={this.state.tabId}
                      isMobile={this.state.isMobile}
                    ></NewFilterCompo>
                  </div>
                </div>
              ) : null}
              {this.state.obj.type === "filter_script" ? (
                <div className="form-group objpdg ">
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  <div>
                    <NewFilterCompo
                      showlist={this.state.showlist}
                      col_mn={this.state.col_mn}
                      col_depend={this.state.column_depend}
                      call_fil={(filtarray, in_index, col_id) =>
                        this.state.callfilter(
                          filtarray,
                          this.state.index,
                          in_index,
                          col_id
                        )
                      }
                      filtarray={this.state.obj.value.filter}
                      // timeline={this.state.timeline}
                      // setTimeLine={(timeline) =>
                      //   this.state.calltimeline(timeline)
                      // }
                      setScript={(script) =>
                        this.state.callScript(
                          script,
                          this.state.obj.this.state.index
                        )
                      }
                      isScript={true}
                      script={this.state.reScript}
                      selectedScript={this.state.obj.value.script}
                      loca={this.state.loca}
                    ></NewFilterCompo>
                  </div>
                </div>
              ) : null}
              {this.state.obj.type === "JSONObject" ? (
                <div className="form-group objpdg ">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  {this.state.obj.verified === "unverified" && (
                    <div className="alert alert-danger form_alt" role="alert">
                      Please verify your charecter not except number!
                    </div>
                  )}
                  <textarea
                    type="text"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "form-control formpadd_danger unverifi"
                        : "form-control formpadd areaheight"
                    }
                    value={JSON.stringify(this.state.obj.value)}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only,
                        undefined, undefined, undefined, this.state.obj
                      )
                    }
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></textarea>
                </div>
              ) : null}
              {this.state.obj.type === "html" ? (
                <div className="form-group objpdg ">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  {this.state.obj.verified === "unverified" && (
                    <div className="alert alert-danger form_alt" role="alert">
                      Please verify your charecter not except number!
                    </div>
                  )}
                  <div style={{ background: "#ffffff", color: "#000" }}>
                    <JoditEditor
                      ref={this.state.editor}
                      value={this.state.obj.value}
                      onChange={(content) =>
                        this.state.formChangefn(
                          content,
                          this.state.index,
                          this.state.obj.name,
                          this.state.obj.type,
                          this.state.obj.id,
                          false,
                          this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                        )
                      }
                    />
                  </div>
                </div>
              ) : null}
              {this.state.obj.type === "multi_line_text" ? (
                <div className="form-group objpdg ">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value === "" && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  {this.state.obj.verified === "unverified" && (
                    <div className="alert alert-danger form_alt" role="alert">
                      Please verify your charecter not except number!
                    </div>
                  )}
                  <textarea
                    type="text"
                    className={
                      this.state.obj.verified === "unverified"
                        ? "form-control formpadd_danger unverifi"
                        : "form-control formpadd areaheight"
                    }
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) =>
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                      )
                    }
                    onBlur={(e) =>
                      this.state.validationfn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id
                      )
                    }
                  ></textarea>
                </div>
              ) : null}
              {this.state.obj.type === "lookup" ? (
                <div className="form-group">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "None" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    (this.state.obj.value === "None" ||
                      this.state.obj.value === "") && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  <select
                    className="form-control form-select formpadd "
                    aria-label="Default select example"
                    value={this.state.obj.value}
                    onChange={(e) => {
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                      );
                    }}
                    maxLength={this.state.obj.uivalid.max_length}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                  >
                    <option value="None">None</option>
                    {this.state.obj.lookup.map((ch, chi) => (
                      <option key={chi} value={ch.name}>
                        {ch.value}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              {this.state.obj.type === "depend_table" ? (
                <div className="form-group ">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value !== "None" &&
                    this.state.obj.value !== "" && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    (this.state.obj.value === "None" ||
                      this.state.obj.value === "") && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  <select
                    className="form-control form-select formpadd "
                    aria-label="Default select example"
                    value={this.state.obj.value}
                    readOnly={this.state.obj.uivalid.read_only === "true"}
                    maxLength={this.state.obj.uivalid.max_length}
                    onChange={(e) => {
                      // this.state.onSelection(e.target.value);
                      this.state.formChangefn(
                        e.target.value,
                        this.state.index,
                        this.state.obj.name,
                        this.state.obj.type,
                        this.state.obj.id,
                        false,
                        this.state.obj.uivalid.read_only, undefined, undefined, undefined, this.state.obj
                      );
                    }}
                  >
                    <option value="None">None</option>
                    {this.state.choice_mn.map((ch, chi) => (
                      <option key={chi} value={ch.name}>
                        {ch.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              {this.state.obj.type === "multi_select" ? (
                <div className="form-group ">
                  {/* {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value.record.length !== 0 &&
                    (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    (this.state.obj.value.record.length === 0) && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )} */}
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value.record.length !== 0 && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.uivalid.group_mandatory === "false" &&
                    this.state.obj.value.record.length === 0 && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}

                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.uivalid.group_mandatory === "true" &&
                    this.state.obj.value.record.length === 0 && (
                      <i
                        className="fa fa-asterisk mndtrygptrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}
                  <div>
                    <MultipleSelectCompo
                      record={this.state.record}
                      list={this.state.obj.value}
                      id={this.state.obj.id}
                      ind={this.state.obj.index}
                      loca={this.state.loca}
                      type={this.state.obj.type}
                      tabname={this.state.tabname}
                      setMSC={(val) => {
                        this.state.setMSC(
                          val,
                          this.state.obj.index,
                          this.state.obj.name,
                          this.state.obj.type,
                          this.state.obj.id
                        );
                      }}
                    />
                  </div>
                </div>
              ) : null}
              {this.state.obj.type === "group_key_value" ? (
                <div className="form-group objpdg">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    !this.state.obj.value.properties
                      .map((obj) => [
                        obj.name,
                        ...obj.choice.map((choice) => choice.value),
                      ])
                      .flat()
                      .some((value) => value === "") && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.obj.value.properties
                      .map((obj) => [
                        obj.name,
                        ...obj.choice.map((choice) => choice.value),
                      ])
                      .flat()
                      .some((value) => value === "") && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}
                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}

                  {this.state.obj.verified === "unverified" && (
                    <div
                      className="alert alert-danger"
                      role="alert"
                      style={{
                        padding: "0.2rem 0.2rem",
                        marginBottom: "0px",
                      }}
                    >
                      Please verify your character not accept number!
                    </div>
                  )}

                  {/* Your existing code */}
                  <div style={{ padding: "2px 15px", color: "black" }}>
                    {this.state.obj.value.properties.map(
                      (parent, parentIndex) => (
                        <div key={parentIndex} className="d-flex flex-column">
                          <label className="me-2">Name:</label>
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              name="child"
                              className="form-control formpadd me-2 my-1"
                              value={parent.name}
                              readOnly={
                                this.state.obj.uivalid.read_only === "true"
                              }
                              maxLength={this.state.obj.uivalid.max_length}
                              onChange={(e) =>
                                this.state.formChangefn(
                                  e.target.value,
                                  this.state.index,
                                  this.state.obj.name,
                                  this.state.obj.type,
                                  this.state.obj.id,
                                  false,
                                  this.state.obj.uivalid.read_only,
                                  parentIndex,
                                  null,
                                  "name", this.state.obj
                                )
                              }
                              onBlur={(e) =>
                                this.state.validationfn(
                                  e.target.value,
                                  this.state.obj.index,
                                  this.state.obj.name,
                                  this.state.obj.type,
                                  this.state.obj.id
                                )
                              }
                            />

                            {parentIndex === 0 ? (
                              <i
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  marginTop: "9px",
                                }}
                                className="fa fa-solid fa-plus"
                                aria-hidden="true"
                                onClick={() => this.handleAddParentInput()}
                              ></i>
                            ) : (
                              <i
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  marginTop: "9px",
                                }}
                                className="fa fa-solid fa-minus"
                                aria-hidden="true"
                                onClick={() =>
                                  this.handleRemoveParentInput(parentIndex)
                                }
                              ></i>
                            )}
                          </div>
                          <div className="d-flex flex-column">
                            <label>Choices:</label>
                            {parent.choice.map((child, childIndex) => (
                              <div className="d-flex">
                                <div className="d-flex">
                                  <input
                                    type="text"
                                    name="child"
                                    className="form-control formpadd me-2 my-1"
                                    value={child.value}
                                    readOnly={
                                      this.state.obj.uivalid.read_only ===
                                      "true"
                                    }
                                    maxLength={
                                      this.state.obj.uivalid.max_length
                                    }
                                    onChange={(e) =>
                                      this.state.formChangefn(
                                        e.target.value,
                                        this.state.index,
                                        this.state.obj.name,
                                        this.state.obj.type,
                                        this.state.obj.id,
                                        false,
                                        this.state.obj.uivalid.read_only,
                                        parentIndex,
                                        childIndex,
                                        "choice", this.state.obj
                                      )
                                    }
                                    onBlur={(e) =>
                                      this.state.validationfn(
                                        e.target.value,
                                        this.state.obj.index,
                                        this.state.obj.name,
                                        this.state.obj.type,
                                        this.state.obj.id
                                      )
                                    }
                                  />
                                  {childIndex === 0 ? (
                                    <i
                                      style={{
                                        fontSize: "20px",
                                        cursor: "pointer",
                                        marginTop: "9px",
                                      }}
                                      className="fa fa-solid fa-plus"
                                      aria-hidden="true"
                                      onClick={() =>
                                        this.handleAddChildInput(parentIndex)
                                      }
                                    ></i>
                                  ) : (
                                    <i
                                      style={{
                                        fontSize: "20px",
                                        cursor: "pointer",
                                        marginTop: "9px",
                                      }}
                                      className="fa fa-solid fa-minus"
                                      aria-hidden="true"
                                      onClick={() =>
                                        this.handleRemoveChildInput(
                                          parentIndex,
                                          childIndex
                                        )
                                      }
                                    ></i>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : null}
              {this.state.obj.type === "key_value" &&
                this.state.obj.value.properties.length > 0 ? (
                <div className="form-group objpdg">
                  {this.state.obj.uivalid.mandatory === "true" &&
                    !this.state.keyValueJson.properties.some((obj) =>
                      Object.values(obj).includes("")
                    ) && (
                      <i
                        className="fa fa-asterisk mndtryfalse"
                        aria-hidden="true"
                      ></i>
                    )}
                  {this.state.obj.uivalid.mandatory === "true" &&
                    this.state.keyValueJson.properties.some((obj) =>
                      Object.values(obj).includes("")
                    ) && (
                      <i
                        className="fa fa-asterisk mndtrytrue"
                        aria-hidden="true"
                      ></i>
                    )}

                  <span
                    id={"tiptar" + this.state.obj.index}
                    className="field_hd"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      this.state.m_rid.current = this.state.obj.id;
                      this.state.setContextMenu(
                        e.button,
                        e.nativeEvent.pageX,
                        e.nativeEvent.pageY
                      );
                    }}
                  // data-bs-custom-class="tooltip"
                  // data-bs-toggle="tooltip" data-bs-placement="left" title={"First letter should be lowercase \n no special character will be accepted except _ "}
                  >
                    {this.state.obj.label.name}
                  </span>
                  {this.state.obj.label.showTooltip === "true" && (
                    <UncontrolledTooltip
                      arrowClassName="tip  "
                      className="tip "
                      innerClassName="tip text-dark text-nowrap"
                      target={"tiptar" + this.state.obj.index}
                      placement="right"
                      style={{
                        whiteSpace: "normal", 
                        maxWidth: "calc(100vw - 20px)", 
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "sans-serif",
                          textAlign: "start",
                          margin: "0rem",
                          fontSize: "small", 
                          whiteSpace: "pre-wrap", 
                        }}
                      >
                        <b>{this.state.obj.label.tooltip}</b>
                      </pre>
                    </UncontrolledTooltip>
                  )}

                  {this.state.obj.verified === "unverified" && (
                    <div
                      className="alert alert-danger"
                      role="alert"
                      style={{
                        padding: "0.2rem 0.2rem",
                        marginBottom: "0px",
                      }}
                    >
                      Please verify your character not accept number!
                    </div>
                  )}

                  <div style={{ padding: "2px 15px" }}>
                    {this.state.obj.value.properties.map((data, index) => (
                      <div key={index} className="d-flex flex-column">
                        <div className="d-flex flex-column">
                          <div className="field_hd text-capitalize">
                            {data.name}:
                          </div>
                          <div className="d-flex">
                            {data.choice &&
                              data.choice.map((d, ind) => (
                                <div
                                  className="form-control my-2 ms-1 "
                                  style={{ width: "auto", fontSize: "18px" }}
                                >
                                  <label key={d.value}>
                                    <input
                                      className="me-2"
                                      type="checkbox"
                                      checked={
                                        this.state.keyValueJson.properties[
                                        index
                                        ] &&
                                        this.state.keyValueJson.properties[
                                          index
                                        ].value === d.value
                                      }
                                      value={d.value}
                                      readOnly={
                                        this.state.obj.uivalid.read_only ===
                                        "true"
                                      }
                                      maxLength={
                                        this.state.obj.uivalid.max_length
                                      }
                                      onChange={(e) =>
                                        this.state.formChangefn(
                                          e.target.value,
                                          this.state.index,
                                          this.state.obj.name,
                                          this.state.obj.type,
                                          this.state.obj.id,
                                          false,
                                          this.state.obj.uivalid.read_only,
                                          index,
                                          ind,
                                          data.name, this.state.obj
                                        )
                                      }
                                      onBlur={(e) =>
                                        this.state.validationfn(
                                          e.target.value,
                                          this.state.obj.index,
                                          this.state.obj.name,
                                          this.state.obj.type,
                                          this.state.obj.id
                                        )
                                      }
                                    />
                                    {d.value}
                                  </label>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {this.state.obj.type === "label" ? (
                <div>
                  <span className="field_hd">{this.state.obj.label.name}</span>
                </div>
              ) : null}
            </div>
          )}
      </div>
    );
  }
}

export default FormInnerComponent;
