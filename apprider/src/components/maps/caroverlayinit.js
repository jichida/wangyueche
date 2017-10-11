import React from 'react';
import { connect } from 'react-redux';
import Callcardateinput from './callcardateinput';
// import renderHTML from 'react-render-html';
import moment from 'moment';
import {
  ui_setcarmap,
  carmap_resetmap,
  set_weui
} from '../../actions';

import {pushrequesttodrivers_request,starttriprequestorder_request} from '../../actions';
import './caroverlayinit.css';
import { withRouter } from 'react-router-dom';

//初始化代驾余额

class Page extends React.Component {

    render(){
      const {
        dispatch,
        history,
        location,
        loginsuccess,
        srcaddress,
        dstaddress,
        totaldistance,
        totalduration,
        driverlist,
        triptype,
        ispagenow,
        ridedatesel,
        resultpricerequest
      } = this.props;
      let onClickNow=(isnow)=>{
          dispatch(ui_setcarmap({ispagenow:isnow}));
      }
      let onClickSelDstAddress=()=>{
          history.push('/search/dstaddress');
      }
      let onClickSelSrcAddress=()=>{
          history.push('/search/srcaddress');
      };
      let onOK=()=>{
          if(!loginsuccess){
              //未登录，到登录页面
              let redirectAfterLogin = location.pathname;
              let loginroute = '/login?next=' + redirectAfterLogin;
              window.setTimeout(()=>{
                  history.push(loginroute);
              },0);
              return;
          }
          //代驾，并且余额不足
          //代驾余额不足//mywallet
          const {balance,daijialeastbalance} = this.props;
          if(triptype === '代驾' && balance < daijialeastbalance){
              let confirm = {
                  show : true,
                  title : "余额不足",
                  text : `您好，您的帐户余额${balance}不足${daijialeastbalance}元，需要充值，才能使用代驾`,
                  buttonsCloseText : "暂不充值",
                  buttonsClickText : "去充值",
                  buttonsClick : ()=>{history.push("/mywallet")}
              }
              this.props.dispatch(set_weui({confirm}));
              return;
          }

          let param = {
              triprequest:{
                  srcaddress:srcaddress,
                  dstaddress:dstaddress,
                  triptype:triptype,
                  isrealtime:ispagenow,
              },
              order:{
                  totaldistance:totaldistance,
                  totalduration:totalduration,
                  resultpricedetail:resultpricerequest
              }
          };

          if(!ispagenow){//预约时间
              param.triprequest.dated_at = ridedatesel;
          }

          dispatch(starttriprequestorder_request(param));
      }

      let handleSelect=(time)=> {
          dispatch(ui_setcarmap({
              ridedatesel:time
          }));
      }

      let onCancel=()=>{
          dispatch(carmap_resetmap({}));
      }

      //尚未叫车!
      let isgetsrc = false;
      let isgetdst = false;

      let srcname ='正在获取当前上车点...';
      let dstname = '请选择你要去的地方';

      if(!!srcaddress.addressname){
          srcname = srcaddress.addressname;
          isgetsrc = true;
      }

      if(!!dstaddress.addressname){
          dstname = dstaddress.addressname;
          isgetdst = true;
      }

      let isgetaddress = isgetdst&&isgetsrc;

      return (
          <div className="caroverlayinitPage">
              {
                  //这里是注释
                  !isgetaddress?(
                      <ul className="listnav">
                          <li
                              key='now'
                              className={ispagenow?"hover":""}
                              onClick={()=>{onClickNow(!ispagenow)}}
                              >
                              现在
                          </li>
                          <li
                              key='date'
                              className={ispagenow?"":"hover"}
                              onClick={()=>{onClickNow(!ispagenow)}}
                              >
                              预约
                          </li>
                      </ul>
                  ):""
              }
              <div className="listcontent">
                  {
                      //这里是注释
                      !ispagenow&&!isgetaddress?(
                          <div className="setordertime">
                              <div>
                                  <img src="newimg/33.png"  alt=""/>
                                  <span>预约时间:</span>
                              </div>
                              <Callcardateinput
                                  value={moment(ridedatesel)}
                                  onChange={handleSelect}
                              />
                          </div>

                      ):""
                  }
                  {
                      //这里是注释
                      !isgetaddress?(
                          <div className="addresslist">
                              <li onClick={onClickSelSrcAddress} className="cfd_icon"><span>{srcname}</span></li>
                              <li onClick={onClickSelDstAddress} className="color_warning"><span>{dstname}</span></li>
                          </div>
                      ):""
                  }
                  {
                      //这里是注释
                      isgetaddress?(
                          <div className="isGetaddress">
                              <span className="showprice">
                                总路程{resultpricerequest.totalkm}公里,
                                预计{resultpricerequest.totalduringminute}分钟,
                                {`预估费用${resultpricerequest.totalprice}元`}
                              </span>
                              <div className="btnlist">
                                <a className="btn Primary" onClick={onOK}>叫车</a>
                                <a className="btn Default" onClick={onCancel}>取消</a>
                              </div>
                          </div>
                      ):""
                  }
              </div>
          </div>
      );
    }
};

const mapStateToProps = (state) => {
  const {
    carmap:{
      srcaddress,
      dstaddress,
      totaldistance,
      totalduration,
      resultpricerequest,
      driverlist,
      triptype,
    },
    appui:{
      carmap:
      {
        ispagenow,
        ridedatesel
      }
    },
    app:{
      daijialeastbalance
    },
    userlogin:{
      balance,
      loginsuccess
    }
  } = state;

  let statenew = {
    loginsuccess,

    srcaddress,
    dstaddress,
    totaldistance,
    totalduration,
    resultpricerequest,
    driverlist,
    triptype,

    ispagenow,
    ridedatesel,

    daijialeastbalance,
    balance
  };
  return statenew;
}

Page = withRouter(Page);
export default connect(
    mapStateToProps,
)(Page);
