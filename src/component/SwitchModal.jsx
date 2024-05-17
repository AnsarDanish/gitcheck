import React, { Component } from 'react'
import Draggable from "react-draggable";
import { Modal, Button, Image } from "antd";
import "../css/formcompo.css";
import "../css/switchModal.css"
import FormInnerComponent from './FormInner_Component';


export class SwitchModal extends Component {

  state = {
    rcdView: this.props.rcdView,
    infoRcdDetail: this.props.infoRcdDetail,
    showModalInfo: this.props.showModalInfo,
    validationfn: this.props.validationfn,
    formChangefn: this.props.formChangefn,
    refrecord: this.props.refrecord,
    setcolumn: this.props.setcolumn,
    openRecord: this.props.openRecord,
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
    filtRefArray: this.props.filtRefArray,
    column_ref: this.props.column_ref,
    closeRef: this.props.closeRef,
    handleCancel: this.props.handleCancel,
    visible: true,
    disabled: true,
    bounds: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    },
    rcdViewTemp: [],
    
  };

  constructor(props) {
    super(props);
    this.draggleRef = React.createRef();
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onStart = this.onStart.bind(this);
  }

  componentDidMount() {
    const { showModalInfo, rcdView } = this.props;
    if (showModalInfo === true) {
      let rcdView2 = rcdView.slice();
      for (let i = 0; i < rcdView2.length; i++) {
        if (rcdView2[i].split === "true") {
          for (let k = 0; k < rcdView2[i].rcd.length; k++) {
            rcdView2[i].rcd[k].uivalid.read_only = "true";
            rcdView2[i].rcd[k].rcd_info = "false";
          }
        } else if (rcdView2[i].split === "false") {
          rcdView2[i].uivalid.read_only = "true";
          rcdView2[i].rcd_info = "false";
        }
      }
      this.setState({ rcdViewTemp: rcdView2 });
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.showModelInfo !== this.props.showModelInfo) {
  //     if (this.props.showModelInfo === true) {
  //       let rcdView2 = this.props.rcdView.slice();
  //       for (let i = 0; i < rcdView2.length; i++) {
  //         if (rcdView2[i].split === "true") {
  //           for (let k = 0; k < rcdView2[i].rcd.length; k++) {
  //             rcdView2[i].rcd[k].uivalid.read_only = "true";
  //             rcdView2[i].rcd[k].rcd_info = "false";
  //           }
  //         } else if (rcdView2[i].split === "false") {
  //           rcdView2[i].uivalid.read_only = "true";
  //           rcdView2[i].rcd_info = "false";
  //         }
  //       }
  //       this.setState({ rcdViewTemp: rcdView2 });
  //     }
  //   }
  // }

  showModal() {
    this.setState({ visible: true });
  };

  handleOk() {
    this.setState({ visible: false });
  };

  onStart(event, uiData) {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = this.draggleRef?.current?.getBoundingClientRect();
    this.setState({
      bounds: {
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      },
    });
  }

  render() {
    return (
      <Modal
        mask={false}
        maskClosable={true}
        keyboard={false}
        wrapClassName="aaa"
        width={600}
        height={400}
        style={{
          position: "fixed",
          left: (document.body.clientWidth - 500) / 2,
          top: 12
        }}
        title={
          <div style={{ display: "flex", width: "100%", height: "36px", justifyContent: "space-between" }}>
            <div
              style={{
                width: "90%",

                cursor: "move",
              }}
              onMouseOver={() => {
                if (this.state.disabled) {
                  this.setState({ disabled: false })
                }
              }}
              onMouseOut={() => {
                this.setState({ disabled: true })
              }}
            >
              <div className="flex justify-between items-end">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>{this.state.infoRcdDetail.tabLabel}</h3>
                  <div style={{ display: "flex" }}>
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      style={{ width: "150px" }}
                      onClick={(e) => this.state.openRecord()}
                      disabled={this.state.rcdViewTemp.length===0 ? true : false}
                    >
                      Open Record
                    </button>

                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "10%",
              }}
              onClick={this.state.handleCancel}
            >
              <i className="fas fa-window-close" style={{ paddingLeft: "30px", fontSize: "30px" }} ></i>
            </div>
          </div>
        }
        open={this.state.showModalInfo}
        onOk={this.handleOk}
        onCancel={this.state.handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={this.state.disabled}
            bounds={this.state.bounds}
            onStart={(event, uiData) => this.onStart(event, uiData)}
          >
            {/* <div aa="2" ref={(node) => (this.draggleRef = node)}> */}
            <div aa="2" ref={this.draggleRef}>
              {modal}
            </div>
          </Draggable>
        )}
        footer={null}
        closeIcon={null}
      >

{console.log( "abc" ,this.state.rcdViewTemp)}

        
        <div className="maincompo" style={{ overflowY: "auto", overflowX: "hidden", height: "380px" }}>
          {this.state.rcdViewTemp.length===0 && (<h1 style={{color:"black"}}>No Record Found</h1>)
          }
          {this.state.rcdViewTemp.map((obj, index) => (
            <div key={index}>
              {obj.split === "false" && (
                <span key={index} >
                  <FormInnerComponent
                    obj={obj}
                    m_rid={this.state.m_rid}
                    index={obj.index}
                    validationfn={this.state.validationfn}
                    formChangefn={this.state.formChangefn}
                    setRefrecord={this.state.setRefrecord}
                    setcolumn={this.state.setcolumn}
                    calltimeline={this.calltimeline}
                    callfilter={this.callfilter}
                    callScript={this.callScript}
                    setMSC={this.setMSC}
                    refrecord={this.state.refrecord}
                    choice_mn={this.state.choice_mn}
                    showlist={this.state.showlist}
                    col_mn={this.state.col_mn}
                    col_depend={this.state.column_depend}
                    filtarray={this.state.filtarray}
                    timeline={this.state.timeline}
                    loca={this.state.loca}
                    tabId={this.state.tabId}
                    isMobile={this.state.isMobile}
                    column_other={this.state.column_other}
                    reScript={this.state.reScript}
                    editor={this.state.editor}
                    mscList={this.state.mscList}
                    setContextMenu={this.setContextMenu}
                    getSingleInfo={this.getSingleInfo}
                    validation={this.state.validation}
                    validation_error={this.state.validation_error}
                    verify_error={this.state.verify_error}
                    ob={this.state.ob}
                    setref_filter={this.state.filtRefArray}
                    col_mn_ref={this.state.column_ref}
                    keyValueJson={this.state.keyValueJson}
                    groupkeyValue={this.state.groupkeyValue}
                  ></FormInnerComponent>
                </span>
              )}

              {obj.split === "true" && (
                <div className={this.state.isMobile ? "" : "row"}>
                  <div className="col-md-6">
                    {obj.rcd.map((obj_i, ind_i) => (
                      <div key={ind_i}>
                        {obj_i.formView.position === "left" && (
                          <span>
                            <FormInnerComponent
                              obj={obj_i}
                              m_rid={this.state.m_rid}
                              index={obj_i.index}
                              validationfn={this.state.validationfn}
                              formChangefn={this.state.formChangefn}
                              setRefrecord={this.state.setRefrecord}
                              setcolumn={this.state.setcolumn}
                              calltimeline={this.calltimeline}
                              callfilter={this.callfilter}
                              callScript={this.callScript}
                              setMSC={this.setMSC}
                              refrecord={this.state.refrecord}
                              choice_mn={this.state.choice_mn}
                              showlist={this.state.showlist}
                              col_mn={this.state.col_mn}
                              col_depend={this.state.column_depend}
                              filtarray={this.state.filtarray}
                              timeline={this.state.timeline}
                              loca={this.state.loca}
                              tabId={this.state.tabId}
                              isMobile={this.state.isMobile}
                              column_other={this.state.column_other}
                              reScript={this.state.reScript}
                              editor={this.state.editor}
                              mscList={this.state.mscList}
                              setContextMenu={this.setContextMenu}
                              getSingleInfo={this.getSingleInfo}
                              validation={this.state.validation}
                              validation_error={
                                this.state.validation_error
                              }
                              verify_error={this.state.verify_error}
                              ob={this.state.ob}
                              setref_filter={
                                this.state.filtRefArray
                              }
                              col_mn_ref={this.state.column_ref}
                              keyValueJson={this.state.keyValueJson}
                              groupkeyValue={
                                this.state.groupkeyValue
                              }
                            ></FormInnerComponent>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="col-md-6">
                    {obj.rcd.map((obj_i, ind_i) => (
                      <div key={ind_i}>
                        {obj_i.formView.position === "right" && (
                          <span key={ind_i}>
                            <FormInnerComponent
                              obj={obj_i}
                              m_rid={this.state.m_rid}
                              index={obj_i.index}
                              validationfn={this.state.validationfn}
                              formChangefn={this.state.formChangefn}
                              setRefrecord={this.state.setRefrecord}
                              setcolumn={this.state.setcolumn}
                              calltimeline={this.calltimeline}
                              callfilter={this.callfilter}
                              callScript={this.callScript}
                              setMSC={this.setMSC}
                              refrecord={this.state.refrecord}
                              choice_mn={this.state.choice_mn}
                              showlist={this.state.showlist}
                              col_mn={this.state.col_mn}
                              col_depend={this.state.column_depend}
                              filtarray={this.state.filtarray}
                              timeline={this.state.timeline}
                              loca={this.state.loca}
                              tabId={this.state.tabId}
                              isMobile={this.state.isMobile}
                              column_other={this.state.column_other}
                              reScript={this.state.reScript}
                              editor={this.state.editor}
                              mscList={this.state.mscList}
                              setContextMenu={this.setContextMenu}
                              getSingleInfo={this.getSingleInfo}
                              validation={this.state.validation}
                              validation_error={
                                this.state.validation_error
                              }
                              verify_error={this.state.verify_error}
                              ob={this.state.ob}
                              setref_filter={
                                this.state.filtRefArray
                              }
                              col_mn_ref={this.state.column_ref}
                              keyValueJson={this.state.keyValueJson}
                              groupkeyValue={
                                this.state.groupkeyValue
                              }
                            ></FormInnerComponent>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    )
  }
}

export default SwitchModal