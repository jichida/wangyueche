import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import EditTable from './material-ui-table-edit.js';
import { Fields } from 'redux-form';
import Divider from 'material-ui/Divider';
import _ from 'lodash';

class Page extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <Paper zDepth={2}>
            <Divider />
            <EditTable
                onChange={this.props.onChange.bind(this)}
                rows={this.props.rows}
                headerColumns={this.props.headers}
              />
            </Paper>
        );
    }
}

// {"source":"carpoolprice","resource":"buscarpool","record":{"pinchetype":"专线","startcity":"天长","endcity":"常州","starttime":"09:00","seatnumber":32,"status":"待出发","takennumber":20,
//"carpoolprice":{"天长总站":{"常州客运站":250},"滁州客运站":{"常州客运站":245}},"__v":0,
// "endstations":["武进客运站","花园街客运站"],
// "startstations":["天长总站","滁州客运站"],"id":"5888e52875c9151d1458951d"},"basePath":"/buscarpool"}
const mapStateToProps = (state, props) => {
  let rows = [];
  const {starttime} = props.starttime.input.value;
  let carpooltime = _.get(props.carpoolstationtime,'input.value', {});

  if(typeof(carpooltime) === 'string'){
    carpooltime = {};
  }


  let startstations = props.startstations.input.value;
  let endstations = props.endstations.input.value;
  for(let i = 0;i < startstations.length ;i++){
    if(!carpooltime[startstations[i]]){
      carpooltime[startstations[i]]  = starttime;
    }
    rows.push(
      {columns: [
      {value: startstations[i]},
      {value: carpooltime[startstations[i]] },
      ]}
    );
  }
  for(let j = 0; j < endstations.length ; j++){
    if(!carpooltime[endstations[j]]){
      carpooltime[endstations[j]]  = starttime;
    }
    rows.push(
      {columns: [
      {value: endstations[j]},
      {value: carpooltime[endstations[j]]} ,
      ]}
    );
  }

  // let rows = [
  //   {columns: [
  //   {value: '天长'},
  //   {value: '常州'},
  //   {value: 50},
  //   ]},
  //   {columns: [
  //   {value: '无锡'},
  //   {value: '南京'},
  //   {value: 40},
  //   ]},
  // ];
  let headers = [
     {value: '出发站点', type: 'ReadOnly', width: 200},
     {value: '预计到达时间', type: 'TextField', width: 200},
  ];
  let page = {
    rows:rows,
    headers:headers
  };
  return Object.assign({},state,page);
}

//{"source":"carpoolprice","resource":"buscarpool","record":{"pinchetype":"专线","startcity":"天长","endcity":"常州","starttime":"09:00","seatnumber":32,"status":"待出发","takennumber":20,"carpoolprice":{"天长总站":{"常州客运站":250,"武进客运站":0,"花园街客运站":0},"滁州客运站":{"常州客运站":245,"武进客运站":0,"花园街客运站":0},"丽水客运站":{"武进客运站":0,"花园街客运站":0}},"__v":0,"endstations":["武进客运站","花园街客运站"],"startstations":["天长总站","滁州客运站","丽水客运站"],"id":"5888e52875c9151d1458951d"},"basePath":"/buscarpool"}
//row:{"columns":[{"value":"天长总站","selected":true,"rowId":0,"id":0,"width":200},{"value":"武进客运站","selected":true,"rowId":0,"id":1,"width":200},{"value":"50","selected":true,"rowId":0,"id":2,"width":200}],"id":0,"selected":true}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onChange:(row)=>{
      let stationname = row.columns[0].value;
      let starttime = row.columns[1].value;

      //dispatch({ type:type ,data:v});

      //<------------清理------------------------
      let carpoolstationtimenew = {};
      let carpoolstationtime = _.get(props.carpoolstationtime,'input.value', {});

      if(typeof(carpoolstationtime) === 'string'){
        carpoolstationtimenew = {};
      }

      let startstations = props.startstations.input.value;
      let endstations = props.endstations.input.value;
      for(let i = 0;i < startstations.length ;i++){
        if(!carpoolstationtimenew[startstations[i]]){
          carpoolstationtimenew[startstations[i]]  = starttime;
        }
        carpoolstationtimenew[startstations[i]]  = carpoolstationtime[startstations[i]] ;
      }
      for(let j = 0; j < endstations.length ; j++){
        if(!carpoolstationtimenew[endstations[j]]){
          carpoolstationtimenew[endstations[j]]  = starttime;
        }
        carpoolstationtimenew[endstations[j]]  = carpoolstationtime[endstations[j]] ;
      }


      carpoolstationtimenew[stationname] = starttime;

      props.carpoolstationtime.input.onChange(carpoolstationtimenew);
    },
  };
}


Page = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);

export  default  function(props) {
  let {source,label} = props;
  return(
    <span>
      <Fields names={[ 'carpoolstationtime', 'startstations', 'endstations','starttime']} component={Page} label={label}/>
    </span>
)
}
