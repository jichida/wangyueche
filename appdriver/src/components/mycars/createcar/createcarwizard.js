import React, { Component } from 'react'
import { connect } from 'react-redux';

import '../../../../public/newcss/register.css';
import CreatecarPage1 from './createcar1.js';
import CreatecarPage2 from './createcar2.js';


import {
  ui_createcarwizard,
  carcreate_request,
  } from '../../../actions';

class CreateCarWizardForm extends Component {
  // constructor(props) {
  //   super(props)
  // }

  nextPage = ()=> {
    this.props.dispatch(ui_createcarwizard({
      curpage:this.props.curpage+1
    }));
  }

  previousPage = ()=> {
    this.props.dispatch(ui_createcarwizard({
      curpage:this.props.curpage-1
    }));
  }


  onSubmit =(values)=>{
    //const { registertype } = this.props;
    console.log(`FINALL===========>values:${JSON.stringify(values)}`);
    // alert(`注册类型:${registertype},数据:${JSON.stringify(values)}`);
    // const {idcard,bankname,avatar,bankaccount,CarmanPhotoldURL,PhotoldURL,...Platform_baseInfoDriver} = values;
    // let data = {
    //   registertype,
    //   idcard,
    //   bankname,
    //   bankaccount,
    //   CarmanPhotoldURL,
    //   PhotoldURL,
    //   profile:{
    //     avatar
    //   },
    //   Platform_baseInfoDriver
    // };
    const {
      OwnerName,
      VehicleNo,
      Seats,
      CheckState,
      Certificate,
      LicensePhotoldURL,
      CarrunPhotoldURL,
      PhotoandCarmanURL
    } = values;

    let data = {
      CarrunPhotoldURL,
      PhotoandCarmanURL,
      Platform_baseInfoVehicle:{
        OwnerName,
        VehicleNo,
        Seats,
        CheckState,
        Certificate,
        LicensePhotoldURL,

      }
    };
    this.props.dispatch(carcreate_request({data}));
  };


  render() {
    const { curpage } = this.props;
    if(curpage === 1){
      return (<CreatecarPage1 previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
    }

    return (<CreatecarPage2  previousPage={this.previousPage}  onSubmit={this.onSubmit}/>);
  }
}

const mapStateToProps = ({createcarwizard}) => {
    return {...createcarwizard};
}
CreateCarWizardForm = connect(mapStateToProps)(CreateCarWizardForm);
export default CreateCarWizardForm;
