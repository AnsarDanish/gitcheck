import React, { Component } from "react";
import axios from "axios";
import WorkInProgress from "./work_in_progress";
import "../css/formView.css";
import "../css/formcompo.css";

class FormViewComponent extends Component {
  state = {
    tab_mn: [{}],
    loading: false,
    tabname: false,
    typename: false,
    colState: false,
    viewData: [],
    tabState: false,
    col_mn: [],
    columnarray2: [""],
    prefarray: [],
    type: "",
    tablename: "",
    page_error: false,
    error: "",
    page_message: false,
    message: "",
    loca: this.props.loca,
    json: [],
    isColArr2Selected: false,
    isColArrSelected: false,
    flag: false,
    ind: 0,
    isMobile: this.props.isMobile,
    mncolor: false,
    listname: this.props.listname,
    isRefFieldSelected:false,
    allcol_mn:new Map(),
    refCols:new Map(),
    selectedRefTab:""
  };

  constructor(props) {
    super(props);
    this.formChangeTable = this.formChangeTable.bind(this);
    this.formChangeType = this.formChangeType.bind(this);
    this.setColumnbtn = this.setColumnbtn.bind(this);
    this.changeColumn = this.changeColumn.bind(this);
    this.submitColumnbtn = this.submitColumnbtn.bind(this);
    this.setColumn = this.setColumn.bind(this);
    this.shiftLeft = this.shiftLeft.bind(this);
    this.selected = this.selected.bind(this);
    this.setColumnOrder = this.setColumnOrder.bind(this);
    this.getFormViewRecord = this.getFormViewRecord.bind(this);
  }

  componentDidMount() {
    if (this.state.listname) {
      this.setState({ tabState: true })
      this.formChangeTable(this.state.listname)
      this.getFormViewRecord();
    } else {
      this.getFormViewRecord();
    }
  }

  getFormViewRecord() {
    var token = localStorage.getItem("token");
    this.setState({ loading: true, tabState: false });
    axios
      .get(this.state.loca + "/loom/get/tables", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        const formdata = resp.data;
        if (formdata !== "") {
          if ("Error" in formdata) {
            this.setState({
              loading: false,
              page_error: true,
              error: formdata.Error,
            });
          } else {
            this.setState({
              tab_mn: formdata.tableRecords,
              loading: false,
              tabState: true,
            });
          }
        }
      },
        (error) => {
          this.props.showErrorCompo();
          console.log(error);
        });
  }


   setCurrentRefCol_mn =( arr ,key)=>{
    let colm2=this.state.columnarray2;

    console.log(this.state.columnarray2);
    console.log(colm2);
    console.log(arr);
    console.log(key);
   for(let k=0;k<arr.length;k++){

    for(let i=0;i<colm2.length;i++){

       if(arr[k].key===colm2[i].key &&  arr[k].name===colm2[i].name){
          arr[k].check=true;
          break;
       }
    }
   }
  return arr;

  }
  async formChangeTable(val, dontFalse, key) {
    var token = localStorage.getItem("token");

    const newMap = new Map(this.state.allcol_mn);
    if (newMap.has(key)) {
    //  setCol_mn(newMap.get(key));
      this.setState({col_mn:newMap.get(key)})
      return;
    }
    console.log("dontFalse", dontFalse);
    if (!dontFalse)
      {
        this.setState({mncolor:false ,flag:false})
      }
      this.setState({
        isColArrSelected: false,
        isColArr2Selected: false,
      });

    if (val !== "" && val !== "none" && val !== this.state.tabname) {
      this.setState({
        col_mn: []
       
      });

      if (!dontFalse) {
        const newMap2 = new Map(this.state.allcol_mn);
        newMap2.clear()
        const newMap3 = new Map(this.state.refCols)
        newMap3.clear();

        this.setState({
          colState: false,
          tabname: val,
          col_mn: [],
          viewData: [],
          isColArrSelected: false,
          isColArr2Selected: false,
          flag: false,
          mncolor: false,
          page_error: false,
          error: "",
          page_message: false,
          message: "",
          allcol_mn:newMap2,
          refCols:newMap3
        });
    
      }
    
      axios
        .get(this.state.loca + "/loom/get/columnview/" + val, {
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
              });

              let arr = [...coldata.colView[0].columnRecords];
              if (!dontFalse) {

                for (let pp = 0; pp < arr.length; pp++) {
                  arr[pp].key = val;
                }
                newMap.set(val, arr);
              }
              else if (!newMap.has(key)) {
                for (let pp = 0; pp < arr.length; pp++) {
                  arr[pp].key = key;
                }
               arr= this.setCurrentRefCol_mn(arr ,key)
                newMap.set(key, arr);
                
              }

              console.log(newMap);

              this.setState({
                col_mn: coldata.colView[0].columnRecords,
                allcol_mn:newMap,
              });
              if (!dontFalse) {
                this.setState({
                  viewData: coldata.colView[1].viewRecords,
                });
              }

            }
          }
        },
          (error) => {
            this.props.showErrorCompo();
            console.log(error);
          });
    }
  }

   callReferenceCol = () => {

    console.log("fafd", this.state.selectedRefTab);
    this.setState({isRefFieldSelected:false})
    if (this.state.selectedRefTab) {

      let key2 = "";
      let st = "";
      const newMap = new Map(this.state.refCols);
      console.log("1", this.state.refCols, newMap.has(this.state.selectedRefTab.refTbName));
      //    if (!newMap.has(selectedRefTab.refTbName)) {

      if (newMap.size == 0) {
        const key1 = this.state.selectedRefTab.tabName;
        newMap.set(key1, { "one": this.state.selectedRefTab.tabLabel, "two": st + this.state.selectedRefTab.tabLabel + " fields",
         path: this.state.selectedRefTab.tabName ,tabPath:this.state.selectedRefTab.tabName });
      }
      console.log("size", newMap.size);
      /*        if (newMap.size == 1) {
               st += ". "
             } else
               if (newMap.size == 2) {
                 st += ". . "
               }
               else
               if (newMap.size == 3) {
                 st += ". . . "
               }
               else
               if (newMap.size == 4) {
                 st += ". . . ."
               } */

      let lastKey;
     // let path = "";
      st = "";
     
      for (let [kk ,value] of newMap) {
        lastKey = kk
        st += ". "
      
      }

      key2 = lastKey;
      let leb=this.state.selectedRefTab.label;
      leb=leb.substring(0,leb.length-3);
      key2 += leb;
     // newMap.set(key2, { "one": selectedRefTab.refTbLabel, "two": st + selectedRefTab.refTbLabel + " fields", path: selectedRefTab.refTbName });
      //}

      newMap.set(key2, { "one": leb, "two": st + leb + " fields",
       path: this.state.selectedRefTab.name ,tabPath:this.state.selectedRefTab.refTbName });
      console.log(key2);
      console.log(newMap);
      this.formChangeTable(this.state.selectedRefTab.refTbName, true, key2)
      this.setState({refCols:newMap})
    

    }
  }

  setColumn(prefArray ,cmm) {
    var col_mn = this.state.col_mn;
  
    // var clm2 = this.state.columnarray2;
    // clm  ---> col_mn
    // clm2  --> clm
    console.log(prefArray);
    console.log(cmm);
    var clm = [];
/*     if (col_mn[col_mn.length - 1].label === "--split-end--") {
      col_mn.splice(col_mn.length - 3, 3);
      clm = col_mn;
    } else {
      clm = col_mn;
    } */
    if (cmm)
      clm = cmm;

    var clm2 = [];
    var prf = prefArray;
    let sp = [],
      ssp = [],
      sep = [];

    // var prf = this.state.prefarray;
/*     for (var p = 0; p < prf.length; p++) {
      if (prf[p].name === "--split--") {
        sp.push({ index: p, co: prf[p].co });
      } else if (prf[p].name === "--split-start--") {
        ssp.push({ index: p, co: prf[p].co });
      } else if (prf[p].name === "--split-end--") {
        sep.push({ index: p, co: prf[p].co });
      }
    } */

/*     console.log(sp);
    console.log(ssp);
    console.log(sep); */

    for (var ii = 0; ii < clm.length; ii++) {
      clm[ii].check = false;
    }

    // for (var i = 0; i < col_mn.length; i++) {
    //   for (var p = 0; p < prf.length; p++) {
    //     if (col_mn[i].name === prf[p].name) {
    //       col_mn[i].check = true;
    //       clm2.push(col_mn[i].label);
    //     }
    //   }
    // }

    console.log(clm);
    console.log(col_mn);
    console.log(prf);
    //  
    //  var i = 0; i < col_mn.length; i++
    for (var f = 0; f < prf.length; f++) {
      for (var i = 0 ,cnt=0 ; i < col_mn.length; i++) {
        if (
          clm[i].name === prf[f].name &&
          (prf[f].name !== "--split-end--" &&
            prf[f].name !== "--split--" &&
            prf[f].name !== "--split-start--") && !prf[f].secondary
        ) {

          clm[i].check = true;
          var jj = {
            label: clm[i].label,
            name: clm[i].name,
            tabName: prf[f].tabName,
            key: prf[f].key,
            path: prf[f].path,
            type: prf[f].type,
            colId: prf[f].colId ,
            tabPath:prf[f].tabPath,
            co: prf[f].co,
          };
          clm2.push(jj);
          break;
        }  
        
        if (cnt === clm.length - 1) {
          if (prf[f].name === "--split--") {
            var jj = {
              label: prf[f].name,
              name: prf[f].name,
              co:prf[f].co,
            };
            clm2.push(jj);
            break;
          } else if (prf[f].name === "--split-start--") {
            var jj = {
              label:prf[f].name,
              name: prf[f].name,
              co: prf[f].co,
            };
            clm2.push(jj);
            break;
          } else if (prf[f].name === "--split-end--") {
            var jj = {
              label: prf[f].name,
              name: prf[f].name,
              co: prf[f].co,
            };
            clm2.push(jj);
            break;
          }
        }
       if(prf[f].secondary==="true"){
          let jj = {
            label: prf[f].label,
            name: prf[f].name,
            co: prf[f].co,
            tabName: prf[f].tabName,
            key: prf[f].key,
            path: prf[f].path,
            type: prf[f].type,
            colId: prf[f].colId ,
             secondary:prf[f].secondary,
             tabPath:prf[f].tabPath,
          }
          clm2.push(jj);
          break;
        }else{
          
        }


  cnt++;
      }
    }

    if (clm[clm.length - 1].label !== "--split-end--") {
      clm.push({
        label: "--split-start--",
        type: "ui",
        name: "--split-start--",
        check: false,
      });
      clm.push({
        label: "--split--",
        type: "ui",
        name: "--split--",
        check: false,
      });
      clm.push({
        label: "--split-end--",
        type: "ui",
        name: "--split-end--",
        check: false,
      });
    }
    console.log(clm2);
    clm2.sort((a, b) =>
      parseInt(a.co) > parseInt(b.co)
        ? 1
        : parseInt(a.co) < parseInt(b.co)
          ? -1
          : 0
    );
    this.setState({ col_mn: clm, columnarray2: clm2, flag: true });
  }

  async formChangeType(val) {
    this.setState({
      isColArrSelected: false,
      isColArr2Selected: false,
      page_error: false,
      error: "",
      page_message: false,
      message: "",
    });
    console.log(val);
    console.log("hello");
    if (val !== "" && val !== "none") {
      this.setState({ typename: val });
      if (this.state.tabname !== "" && this.state.tabname !== "none") {
        var token = localStorage.getItem("token");
        axios
          .get(
            this.state.loca +
            "/loom/get/view/" +
            this.state.tabname +
            "/" +
            val,
            {
              headers: {
                authorization: "Bearer " + token,
              },
            }
          )
          .then((resp) => {
            const data = resp.data;
            console.log(data);
            if (data !== "") {
              if ("Error" in data) {
                this.setState({
                  loading: false,
                  page_error: true,
                  error: data.Error,
                });
              } else {
                this.setState({
                  prefarray: data.formView[2].column,
                  json: data,
                });
                let clm = this.changeIntoOriginalColmn(this.state.tabname) 
                console.log(clm);//split hai
                if (clm) {
                  this.setColumn(data.formView[2].column, clm);
                } else
                  this.setColumn(data.formView[2].column);
              }
            }
           // this.setColumn(data.formView[2].column);
          },
            (error) => {
              this.props.showErrorCompo();
              console.log(error);
            });
      }
    }
  }

  changeColumn(e, index) {
    var col = this.state.col_mn;
    col[index].check = e.target.checked;
    this.setState({ col_mn: col });
  }



  setColumnbtn() {
    var colm = this.state.col_mn;
    var colm2 = this.state.columnarray2;
    colm2 = [];
    for (var i = 0; i < colm.length; i++) {
      if (colm[i].check === true) {
        colm2.push(colm[i].label);
      }
    }
    this.setState({ columnarray2: colm2 });
  }

  submitColumnbtn() {
    var json = this.state.json;
    var colm = this.changeIntoOriginalColmn(this.state.tabname);
    console.log(colm);
   // var colm = this.state.col_mn;
    var colm2 = this.state.columnarray2;
    var sub = [];
    console.log(colm2);
    for (var i = 0; i < colm2.length; i++) {
      for (var j = 0; j < colm.length; j++) {
        if (colm2[i].key===colm[j].key  && colm2[i].name === colm[j].name) {
          sub.push({ name: colm[j].name, tabName: colm[j].tabName??"", type: colm[j].type,colId:colm[j].colId??"",key:colm[j].key??"" });
          break;
        }
        if (colm2[i].secondary) 
          {
          sub.push({ name: colm2[i].name, tabName: colm2[i].tabName ,secondary: ""+colm2[i].secondary, path: colm2[i].path, type: colm2[i].type, 
           colId:colm2[i].colId ,key:colm2[i].key??"",label:colm2[i].label,tabPath:colm2[i].tabPath })
          break;
        }

      }
    }

    json.formView[2].column = sub;
    json.formView[1].table.value = this.state.tabname;
    console.log(json);
    if (this.state.typename === "new" || this.state.typename === "record") {

      var token = localStorage.getItem("token");
      axios
        .post(this.state.loca + "/loom/set/view/column/", json, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        })
        .then((resp) => {
          let rsp = resp.data;
          console.log("ddddd " + JSON.stringify(rsp));
          if (rsp !== "") {
            if ("Error" in rsp) {
              this.setState({
                loading: false,
                page_error: true,
                error: rsp.Error,
              });
            } else {
              this.setState({
                loading: false,
                page_message: true,
                message: rsp.Message,
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
  changeIntoOriginalColmn = (key) => {
    console.log(key);
    const oldALmmCOl_mn = new Map(this.state.allcol_mn)
    console.log(this.state.allcol_mn);
    let clm = this.state.allcol_mn.get(key)
    if (clm) {
     // setCol_mn((prevCol_mn) => [...clm]);
      this.setState({col_mn:clm})
      console.log(clm);
      console.log(this.state.col_mn);
      const newMap3 = new Map(this.state.refCols)
      newMap3.clear();
    //  setrefCols(newMap3)
    this.setState({refCols:newMap3})

      for (let [pp] of oldALmmCOl_mn) {
        console.log(pp, key);
        if (pp != key) {
          console.log("del");
          oldALmmCOl_mn.delete(pp)
        }

      }
    //  setAllcol_mn(oldALmmCOl_mn);
    this.setState({allcol_mn:oldALmmCOl_mn})
      console.log(clm);
      return clm;

    }

/*     setTimeout(function () {
      console.log("after6", this.state.col_mn);

    }, 6000) */
  }

   geToBackRefCol = (targetKey) => {

    console.log(targetKey);
    let found = false
    let clm=""
    console.log(this.state.refCols);
    for (const [key] of this.state.refCols) {
      if (found) {
        this.state.refCols.delete(key)
      }
      if (key === targetKey) {
        found = true;
        clm = this.state.allcol_mn.get(key)
      }

    }
    console.log(targetKey, this.state.refCols.get(targetKey));
    console.log(this.state.refCols);
    console.log(clm);

    console.log("setting");
    if (this.state.refCols.size == 1) {
      this.state.refCols.clear()
      if (clm[clm.length - 1].label !== "--split-end--") {

        clm.push({
          label: "--split-start--",
          type: "ui",
          name: "--split-start--",
          check: false,
        });
        clm.push({
          label: "--split--",
          type: "ui",
          name: "--split--",
          check: false,
        });
        clm.push({
          label: "--split-end--",
          type: "ui",
          name: "--split-end--",
          check: false,
        });
      }
      //setCol_mn([...clm]);
      this.setState({col_mn:clm})

    }
    else {
      this.setState({col_mn:clm ,isRefFieldSelected:false ,isColArrSelected:false ,isColArr2Selected:false})

    }
  }

  selected(index, clm) {
    this.setState({
      isColArrSelected: true,
      isColArr2Selected: false,
      isRefFieldSelected:false
    });

    var col_mn = this.state.col_mn;
    var columnarray2 = this.state.columnarray2;
    console.log(col_mn, clm);
    if (clm === "clm1") {

      if (col_mn[index]?.type === "reference") {
        console.log("true");
        console.log(col_mn[index], col_mn[index].refTbName);

        this.setState({isRefFieldSelected:true ,selectedRefTab:col_mn[index]})
      }
      for (let i = 0; i < col_mn.length; i++) {
        if (i === index) {
          document
            .getElementById("colm1")
            .children.item(i)
            .classList.add("selected-row");
        } else {
          document
            .getElementById("colm1")
            .children.item(i)
            .classList.remove("selected-row");
        }
      }
      for (let i = 0; i < columnarray2.length; i++) {
        document
          .getElementById("colm2")
          .children.item(i)
          .classList.remove("selected-row");
      }
    } else {
      this.setState({
        isColArrSelected: false,
        isColArr2Selected: true,
        ind: index,
      });
      console.log(index ,clm);
      for (let i = 0; i < columnarray2.length; i++) {
        if (i === index) {
          document
            .getElementById("colm2")
            .children.item(i)
            .classList.add("selected-row");
        } else {
          document
            .getElementById("colm2")
            .children.item(i)
            .classList.remove("selected-row");
        }
      }
      for (let i = 0; i < col_mn.length; i++) {
        document
          .getElementById("colm1")
          .children.item(i)
          .classList.remove("selected-row");
      }
    }
  }

  setColumnOrder(pm) {
    var clm = [];
    var col_odr = this.state.ind;
    var col_odr2 = 0;
    var columnarray2 = this.state.columnarray2;

    if (pm) {
      if (col_odr < columnarray2.length - 1) {
        col_odr2 = col_odr + 1;
        for (let i = 0; i < columnarray2.length; i++) {
          if (i !== col_odr2 && i !== col_odr) {
            clm.push(columnarray2[i]);
          } else if (i === col_odr2) {
            document
              .getElementById("colm2")
              .children.item(col_odr2)
              .classList.add("selected-row");
            let cjj = columnarray2[i];
            cjj.co = (col_odr + 1).toString();
            clm.push(cjj);
          } else if (i === col_odr) {
            document
              .getElementById("colm2")
              .children.item(col_odr)
              .classList.remove("selected-row");
            let cjj = columnarray2[i];
            cjj.co = (col_odr2 + 1).toString();
            clm.push(cjj);
          }
        }
        clm.sort((a, b) =>
          parseInt(a.co) > parseInt(b.co)
            ? 1
            : parseInt(a.co) < parseInt(b.co)
              ? -1
              : 0
        );
        this.setState({ columnarray2: clm, ind: col_odr2 });
      }
    } else {
      if (col_odr > 0) {
        col_odr2 = col_odr - 1;
        for (let i = 0; i < columnarray2.length; i++) {
          if (i !== col_odr2 && i !== col_odr) {
            clm.push(columnarray2[i]);
          } else if (i === col_odr2) {
            document
              .getElementById("colm2")
              .children.item(col_odr2)
              .classList.add("selected-row");
            let cjj = columnarray2[i];
            cjj.co = (col_odr + 1).toString();
            clm.push(cjj);
          } else if (i === col_odr) {
            document
              .getElementById("colm2")
              .children.item(col_odr)
              .classList.remove("selected-row");
            let cjj = columnarray2[i];
            cjj.co = (col_odr2 + 1).toString();
            clm.push(cjj);
          }
        }
        clm.sort((a, b) =>
          parseInt(a.co) > parseInt(b.co)
            ? 1
            : parseInt(a.co) < parseInt(b.co)
              ? -1
              : 0
        );
        this.setState({ columnarray2: clm, ind: col_odr2 });
      }
    }
  }

  shiftRight() {
    let clm = this.state.col_mn;
    let col_mn = this.state.col_mn;
    let clm2 = this.state.columnarray2;
    let lab = document.getElementsByClassName("selected-row").item(0);
    if (lab !== null) {
      lab = lab.innerText;
      for (let i = 0; i < col_mn.length; i++) {
        if (clm[i].label === lab) {
          if (clm[i].type !== "ui") {
            clm[i].check = true;
          }
          let n_co = clm2.length + 1;
          let st = "";
          let pt = "";
          let tbpth="";
          console.log(this.state.refCols);
          console.log(clm[i]);
          let ct = 0;
  
          for (const [key] of this.state.refCols) {
            if (ct == 0) {
              st = st + this.state.refCols.get(key).one
              pt = pt + this.state.refCols.get(key).path
              tbpth=tbpth+ this.state.refCols.get(key).tabPath
            } else {
              st = st + ".";
              st = st + this.state.refCols.get(key).one
              pt = pt + "."
              pt = pt + this.state.refCols.get(key).path
              tbpth=tbpth+".";
              tbpth=tbpth+ this.state.refCols.get(key).tabPath
            }
            ct++;
          }
          if (ct > 0) {
            st = st + ".";
            pt = pt + "."
          }
  
          console.log(st);
          console.log(pt);
          console.log(tbpth);
          let n = { label: st + lab, name: clm[i].name, co: n_co, tabName: clm[i].tabName, 
            key: clm[i].key, path: pt + clm[i].name, secondary: !(st === ""), 
            type: clm[i].type, colId: clm[i].colId ,tabPath:tbpth };
          clm2.push(n);
        }
      }
      this.setState({
        isColArrSelected: false,
        col_mn: clm,
        columnarray2: clm2,
      });

    } else {
      this.setState({ isColArrSelected: true, isColArr2Selected: true });
    }
  }
  shiftLeft() {
    let clm = this.state.col_mn;
    console.log(this.state.col_mn);
    let clm2 = this.state.columnarray2;
    let obj = {};
    let name="";
    let lab = document.getElementsByClassName("selected-row").item(0);
    console.log(lab);
    if (lab !== null) {
      lab = lab.innerText;
      console.log(this.state.ind);
      console.log(clm2);
      for (let i = 0; i < clm2.length; i++) {
        if (i== this.state.ind) {
          obj = clm2[i];
          name=clm2[i].name
          clm2.splice(i, 1); 
        }
      }
  /*     for (let i = 0; i < clm.length; i++) {
        if (clm[i].label === lab) {
          clm[i].check = false;
        }
      } */

      console.log(obj);
      console.log(name);
      console.log(this.state.allcol_mn);

      if (this.state.allcol_mn.has(obj.key)) {
        clm = this.state.allcol_mn.get(obj.key)
      }
      console.log(this.state.allcol_mn.has(obj.key));

      for (let i = 0; i < this.state.col_mn.length; i++) {
        if ( clm[i].key === obj.key && 
          clm[i].name === name &&
          !(
            clm[i].label === "--split--" ||
            clm[i].label === "--split-end--" ||
            clm[i].label === "--split-start--"
          )
        ) {
          console.log(name);
          clm[i].check = false;
        }
      }

      console.log("before", clm); 
      clm = this.state.col_mn;
      console.log("after", clm);

      this.setState({
        isColArrSelected: false,
        isColArr2Selected: true,
        col_mn: clm,
        columnarray2:clm2
      });
    } else {
      this.setState({ isColArrSelected: true, isColArr2Selected: true });
    }
  }

 

  render() {
    return (
      <div
        className="Card"
        style={
          this.state.isMobile
            ? { height: "93vh", overflow: "auto", flexGrow: 1 }
            : { height: "95vh", overflow: "auto", flexGrow: 1 }
        }
      >
        <div className="formViewBack">
          {this.state.loading === true ? (
            <WorkInProgress></WorkInProgress>
          ) : (
            <div>

              {this.state.isColArrSelected === true && this.state.isColArr2Selected === true && (
                <div
                  className="alertgp alert-warning"
                  style={{
                    fontSize: "initial",
                    color: "black",
                  }}
                >
                  {"Please Select Column"}
                </div>
              )}

              {this.state.page_error === true && (
                <div className="alertgp alert-danger"
                  style={{
                    fontSize: "initial",
                    color: "black",
                  }}>{this.state.error}</div>
              )}
              {this.state.page_message === true && (
                <div className="alertgp alert-success"
                  style={{
                    fontSize: "initial",
                    color: "black",
                  }}>{this.state.message}</div>
              )}
              {this.state.tabState === true && (
                <div className="row fr">
                  <div className="col-md-6 px-1">
                    <div className="text-start">
                      <span
                        className={
                          this.state.mncolor ? "fa fa-asterisk mndtryfalse" : "fa fa-asterisk mndtrytrue"
                        }
                      >
                      </span>
                      <span className="field_hd">Table</span>
                    </div>
                    <select
                      className="form-select pref_mar"
                      aria-label="Default"
                      onChange={(e) => this.formChangeTable(e.target.value)}
                      value={this.state.tabname}
                    >
                      <option value="none">None</option>
                      {this.state.tab_mn.map((obj, index) => (
                        <option key={index} value={obj.name}>
                          {obj.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 px-1">
                    <div className="text-start">
                      <span
                        className={
                          this.state.mncolor ? "fa fa-asterisk mndtryfalse" : "fa fa-asterisk mndtrytrue"
                        }
                      >
                      </span>
                      <span className="field_hd">View</span>
                    </div>
                    <select
                      id="one"
                      className="form-select pref_mar"
                      aria-label="Default"
                      onChange={(e) => this.formChangeType(e.target.value)}
                    >
                      <option value="none">None</option>
                      {this.state.viewData.map((obj_view, index) => (
                        <option key={index} value={obj_view.name}>
                          {obj_view.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
          {this.state.flag && (
            <div>
              <div className="row" style={{ marginTop: "2rem" }}>
                <div className="col-md-2"></div>
                <div className="col-md-8 my-4">
                  <div className="row">
                  {Array.from(this.state.refCols).map(([key, value]) => (
                  <div key={key}>
                    <div
                      /* className="col-md heading" */
                      onClick={() => {
                        this.geToBackRefCol(key);

                      }}
                    >
                      {value.two}
                    </div>
                  </div>


                ))}
                    <div id="colm1" className="col-md-4">
                    {console.log("col_mn", this.state.col_mn)}
                      {this.state.col_mn.length > 0 &&
                        this.state.col_mn.map((obj, obj_i) => (
                          <div key={obj_i}>
                            {!obj.check && (
                              <div className="row fr">
                                <div
                                  className="col-md heading_pref"
                                  onClick={() => {
                                    this.selected(obj_i, "clm1");
                                  }}
                                >
                                     <span   className={obj?.type==="reference" ? "greenLab" : "blackLab"}><b>{obj.label}</b></span>
                               
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                    <div className="up-down-dis col-md-2">
                    {this.state.isRefFieldSelected && (
                    <div className="cen"
                      onClick={() => {
                        this.callReferenceCol()
                      }}
                    >

                      <i class="fa-solid fa-code-branch"></i>
                    </div>

                  )}
                      <div className="cen">
                        <button
                          className="view_btn"
                          disabled={this.state.isColArr2Selected}
                          onClick={() => {
                            this.shiftRight();
                          }}
                        >
                          {">"}
                        </button>
                      </div>
                      <div className="cen">
                        <button
                          className="view_btn"
                          disabled={this.state.isColArrSelected}
                          onClick={() => {
                            this.shiftLeft();
                          }}
                        >
                          {"<"}
                        </button>
                      </div>
                    </div>
                    <div id="colm2" className="col-md-4">
                    {console.log("columnarray2" ,this.state.columnarray2)}
                      {this.state.columnarray2.map((obj, index) => (
                        <p
                          style={{ margin: 0 }}
                          key={index}
                          className="columnarray2 heading_pref"
                          onClick={() => {
                            this.selected(index, "clm2");
                          }}
                          value={obj.label}
                        >
                          <b>{obj.label}</b>
                        </p>
                      ))}
                    </div>
                    <div className="col-md-2 up-down-dis">
                      <div className="cen">
                        <button
                          className="up-down-view"
                          aria-hidden="true"
                          onClick={(e) => this.setColumnOrder(false)}
                        >
                          {">"}
                        </button>
                      </div>
                      <div className="cen">
                        <button
                          className="up-down-view"
                          aria-hidden="true"
                          onClick={(e) => this.setColumnOrder(true)}
                        >
                          {"<"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="cen">
                    <button
                      style={{
                        fontSize: "15px",
                        borderRadius: "3px",
                      }}
                      type="button"
                      className=" btnnn btn btn-primary"
                      onClick={() => this.submitColumnbtn()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default FormViewComponent;
