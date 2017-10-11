import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
//审核页面
import Approval from './register/approval';

 function requireAuthentication(Component) {

    let AuthenticatedComponent = (props)=>{
      let loginroute = '';
      const {loginsuccess} = props;
      if(!loginsuccess){
        let redirectAfterLogin = props.location.pathname;
        loginroute = '/login?next=' + redirectAfterLogin;
      }

      if(loginsuccess){
        return (
          <Component {...props}/>
        )
      }else{
        return (
          <Redirect to={loginroute}/>
        )
      }
    };

    const mapStateToProps =  ({userlogin:{loginsuccess}}) =>{
      return {loginsuccess};
    };

    return connect(mapStateToProps)(AuthenticatedComponent);

}
export {requireAuthentication};

export function requireApproval(Component) {
  let ApprovalComponent = (props)=>{
    let loginroute = '';
    const {loginsuccess,approvalstatus} = props;
    if(!loginsuccess){
      let redirectAfterLogin = props.location.pathname;
      loginroute = '/login?next=' + redirectAfterLogin;
    }

    if(loginsuccess){//未递交/待审核/审核中/已审核/已拒绝
      if(approvalstatus=== '未递交'){
        return (<Redirect to={'/register1'}/>);
      }
      else if(approvalstatus === '已审核'){
        return (<Component {...props}/>);
      }
      else{//待审批/审批中/已拒绝/ 复用同一个页面
        return (<Approval {...props}/>);
      }
    }
    else{
      return (<Redirect to={loginroute}/>);
    }
  };

  const mapStateToProps =  ({userlogin:{loginsuccess,approvalstatus}}) =>{
    return {loginsuccess,approvalstatus};
  };

  return connect(mapStateToProps)(ApprovalComponent);

}
