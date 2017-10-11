/*
    个人中心-订单详情-头部-//出租车－快车－代驾
*/
import React, { Component } from 'react';
import '../../../public/newcss/userorderinfo.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { getorderdetail_request } from '../../actions';

class Page extends Component{

        // this.props.dispatch(getorderdetail_request({
        //     query:{
        //       _id:orderinfo._id,
        //       triptype:orderinfo.triptype
        //     }
        //   }));
    componentWillMount(){
        const {orderinfo} = this.props;
        if(orderinfo.triptype === '拼车'){
          if(typeof orderinfo.buscarpoolid === 'string'){
            this.props.dispatch(getorderdetail_request({
                query:{
                    _id:orderinfo._id,
                    triptype:orderinfo.triptype
                }
            }));
          }
        }
    }

    render(){
        const {orderinfo} = this.props;
        const {
          startcity,
          endcity,
          startstation,
          endstation,
          startdate,
          buscarpoolid
        } = orderinfo;
        let getbuscarpoolobj = false;
        if(!!buscarpoolid){
          if(typeof buscarpoolid !== 'string'){
            getbuscarpoolobj = true;
          }
        }

        return (
                <div className="pinche">
                    <div className="time">{moment(startdate).format('YYYY-MM-DD')}</div>
                    <div className="city">
                        <span className="start">{startcity}({startstation})</span>
                        <span className="line"></span>
                        <span className="end">{endcity}({endstation})</span>
                    </div>
                    {
                      getbuscarpoolobj &&
                      <div className="time2">{buscarpoolid.starttime}
                      <span>{buscarpoolid.groupnumber}人成团</span>
                      <span>{buscarpoolid.seatnumbertotal}人参与</span>
                      </div>

                    }
                </div>
        )
    }
}
export default connect()(Page);
