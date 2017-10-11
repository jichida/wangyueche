import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
//审核页面
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
