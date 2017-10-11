import React from 'react';
import { connect } from 'react-redux';
import {
  carmap_resetmap_url,
  set_weui,
  updaterequeststatus,
  canceltriprequestorder_request
} from '../../actions';

import '../../../public/newcss/outcar.css';
//import CaroverlayLxck from './embmapstep1lxck';
import CaroverlayQjck from './embmapstep2qjck';
import CaroverlayJdck from './embmapstep3jdck';
import CaroverlayKsxc from './embmapstep4ksxc';
import {setbackhandler,removebackhandler} from '../../env/android';

export class Page extends React.Component {

  componentWillMount () {
    let that = this;
    setbackhandler(()=>{
      let toast = {
          show : true,
          text : "打车过程中不能按返回键",
          type : "warning"
      }
      that.props.dispatch(set_weui({toast}));
    });
  }
  componentWillUnmount() {
    removebackhandler();
  }

  shouldComponentUpdate(nextProps, nextState) {
    //不显示中间页面！
    const {mapstage,curmappagerequest,curmappageorder,dispatch} = nextProps;
    let needrender = true;
    let url='/outcar';
    if(!!curmappagerequest.requeststatus){
      if(curmappagerequest.requeststatus === '行程完成' ||
        curmappagerequest.requeststatus === '已取消'){
          needrender = false;
          url = curmappagerequest.requeststatus === '行程完成' ?`/orderdetail/${curmappageorder._id}`:'/outcar';
        }
    }
    else{
      needrender = false;
    }

    if(!needrender){
      dispatch(carmap_resetmap_url({url}));
    }
    return needrender;
  }

  onClickNext(btnname){
    console.log(`点击按钮:${btnname}`);
    const {curmappagerequest,curmappageorder,dispatch}= this.props;
    const stagenext = {
      '已接单':'待上车',
      '待上车':'行程中',
      '行程中':'行程完成',
    };
    if(!!stagenext[curmappagerequest.requeststatus]){
      dispatch(updaterequeststatus({
          triprequestid:curmappagerequest._id,
          triporderid:curmappageorder._id,
          requeststatus: stagenext[curmappagerequest.requeststatus]
      }));
    }
  }

   cancelrequest =()=>{
     const {curmappagerequest,curmappageorder,dispatch}= this.props;
     let cancelr = ()=>{
         dispatch(canceltriprequestorder_request({
          triporderid:curmappageorder._id,
          triprequestid:curmappagerequest._id
        }));
     }
     let confirm = {
       show : true,
       title : "取消订单",
       text : "你确定需要取消吗?",
       buttonsCloseText : "取消",
       buttonsClickText : "确定",
       buttonsClose : ()=>{console.log('click close');},
       buttonsClick : ()=>{cancelr();}
     };
     this.props.dispatch(set_weui({confirm}));

  }
  render() {
      const {curmappagerequest:currentrequest,curmappageorder:currentorder,
        curlocation,driveroute,} = this.props;

      let CaroverlayCo;
      if(currentrequest.requeststatus !== "已取消" && currentrequest.requeststatus){
        //被reset了！！
        if(currentrequest.requeststatus === '已接单'){
            CaroverlayCo =
                <CaroverlayQjck
                    currentrequest={currentrequest}
                    currentorder={currentorder}
                    driveroute={driveroute}
                    onClickCancel={this.cancelrequest}
                    onClickNext={this.onClickNext.bind(this,'接到乘客')}
                    curlocation={curlocation}
                />
        }
        else if(currentrequest.requeststatus === '待上车'){
            CaroverlayCo =
                <CaroverlayJdck
                    currentrequest={currentrequest}
                    currentorder={currentorder}
                    driveroute={driveroute}
                    onClickCancel={this.cancelrequest}
                    onClickNext={this.onClickNext.bind(this,'开始行程')}
                    curlocation={curlocation}
                />
        }
        else if(currentrequest.requeststatus === '行程中'){
            CaroverlayCo =
                <CaroverlayKsxc
                    currentrequest={currentrequest}
                    currentorder={currentorder}
                    driveroute={driveroute}
                    onClickNext={this.onClickNext.bind(this,'到达目的地')}
                    curlocation={curlocation}
                />
        }
        else if(currentrequest.requeststatus === '行程完成'){
            CaroverlayCo=<div>行程完成,正在拉取订单,请稍后...</div>
        }
      }
        return (
            <div className="outcarPage AppPage">
                {CaroverlayCo}
            </div>
        );
    }

}


const mapStateToProps = (state) => {
  const {driveroute,operate:{curlocation},carmap:{curmappagerequest,curmappageorder}} = state;
  let newstate = {
    driveroute,
    curmappagerequest,
    curmappageorder,
    curlocation
  }
  return newstate;
}


export default connect(
mapStateToProps,
)(Page);
