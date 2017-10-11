/**
 * Created by wangxiaoqing on 2017/3/21.
 */
import React from 'react';
import moment from 'moment';
export default function OrderItem(props) {
    let orderinfo = props.orderinfo;
    if(!orderinfo){
        return (<div>无订单项</div>);
    }
    console.log("orderitem:" + JSON.stringify((orderinfo)));
    if (typeof orderinfo.created_at === 'string') {
      orderinfo.created_at = new Date(Date.parse(orderinfo.created_at));
    }

    let createtimestring =moment(orderinfo.created_at).format("MM月DD日 HH时mm分");
    if(orderinfo.triptype === '拼车'){
        return (
            <div className="card" onClick={()=>{props.onClickSelCurOrder(orderinfo);}}>
                <div className="card-header">
                    <h2 className="card-title">{createtimestring}<span className="dd_xl margin-8">
                    {orderinfo.triptype}</span></h2>
                    <div className="item-after text-primary">{orderinfo.paystatus}</div>
                </div>
                <div className="card-body">
                    <div className="item borderless padding-0">
                        <div>
                            <p className="zd_icon">{orderinfo.orderdetail}</p>
                        </div>
                        <span className="icon icon-right-nav item-icon"></span>
                    </div>
                </div>

            </div>

        );
    }
    else if(orderinfo.triptype === '旅游大巴'){
        return (
            <div className="card" onClick={()=>{props.onClickSelCurOrder(orderinfo);}}>
                <div className="card-header">
                    <h2 className="card-title">{createtimestring}<span className="dd_xl margin-8">
                    {orderinfo.triptype}</span></h2>
                    <div className="item-after text-primary">{orderinfo.paystatus}</div>
                </div>
                <div className="card-body">
                    <div className="item borderless padding-0">
                        <div>
                            <p className="zd_icon item-icon">{orderinfo.orderdetail}</p>
                        </div>
                        <span className="icon icon-right-nav item-icon"></span>
                    </div>
                </div>
            </div>

        );
    }
    let srcaddressname = '';
    let dstaddressname = '';
    try{
      srcaddressname = orderinfo.srcaddress.addressname;
      dstaddressname = orderinfo.dstaddress.addressname;
    }
    catch(e){
      
    }


    return (
        <div className="card" onClick={()=>{props.onClickSelCurOrder(orderinfo);}}>
            <div className="card-header">
                <h2 className="card-title">{createtimestring}<span className="dd_xl margin-8">
                  {orderinfo.triptype}</span></h2>
                <div className="item-after text-primary">{orderinfo.paystatus}</div>
            </div>
            <div className="card-body">
                <div className="item borderless padding-0">
                    <div>
                        <p className="cfd_icon">{srcaddressname}</p>
                        <p className="zd_icon">{dstaddressname}</p>
                    </div>
                    <span className="icon icon-right-nav item-icon"></span>
                </div>
            </div>
        </div>

    );
}
