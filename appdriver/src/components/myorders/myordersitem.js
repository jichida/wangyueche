/**
 * Created by wangxiaoqing on 2017/3/21.
 */
import React from 'react';
import moment from 'moment';
import WeUI from 'react-weui';
const {
    Cell,
    CellBody,
    CellFooter
    } = WeUI;


let OrderItem =(props)=> {
    let {orderinfo,onClickSelCurOrder} = props;
    if(!orderinfo){
        return (<div>无订单项</div>);
    }
    console.log("orderitem:" + JSON.stringify((orderinfo)));
    if (typeof orderinfo.created_at === 'string') {
      orderinfo.created_at = new Date(Date.parse(orderinfo.created_at));
    }

    let createtimestring =moment(orderinfo.created_at).format("MM月DD日 HH时mm分");

    let srcaddressname = '';
    let dstaddressname = '';
    try{
      srcaddressname = orderinfo.srcaddress.addressname;
      dstaddressname = orderinfo.dstaddress.addressname;
    }
    catch(e){

    }

    const getheadtipc = (orderinfo)=>{
        const { triptype,isrealtime } = orderinfo;
        if(triptype==="旅游大巴" || triptype==="拼车"){
            return <span style={{width:"15px",display:"inline-block"}}></span>;
        }else{
            if(isrealtime){
                return (<span className="i j">实时</span>);
            }else{
                return (<span className="i">预约</span>);
            }
        }
    }

    //let triptypename = orderinfo.isrealtime?'实时':'预约';
    return (
      <Cell access  onClick={()=>{onClickSelCurOrder(orderinfo);}}>
          <CellBody>
              <div className="tt">
                  <div className="ttinfo">
                      {getheadtipc(orderinfo)}
                      <span className="time">{createtimestring}</span>
                      <span className="type">{orderinfo.triptype}</span>
                  </div>
                  <span className="status color_warning">{orderinfo.orderstatus}</span>
              </div>
              <div className="li a">{srcaddressname}</div>
              <div className="li b">{dstaddressname}</div>
          </CellBody>
          <CellFooter />
      </Cell>
    );
}

export default OrderItem;
