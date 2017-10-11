import React from 'react';
import { connect } from 'react-redux';
import "../../../public/newcss/caroverlay.css";
import StarRatingComponent from 'react-star-rating-component';

import {jsCallPhone} from '../../env/callphone.js';

let PageDriverHead =(props)=>{
  const {
    topicinfo,
    driverinfo:{
      Model,
      Brand,
      VehicleNo,
      PlateColor,
      DriverPhone,
      DriverName,
      starnum,
      avatarURL
    }
  } = props;

  return (
    <div className="userorderinfoPage ">
        <div className="kuaicheinfo orderinfohead">
            <div className="driver">
                <img src={avatarURL} className="avatar" alt=""/>
                <div className="info">
                    <div className='star'>
                        <span>{DriverName}</span>
                        <StarRatingComponent
                            name="star"
                            editing={false}
                            starCount={5}
                            value={starnum}
                            emptyStarColor="#CCCCCC"
                        />
                    </div>
                    <div>
                        {PlateColor}{Brand}{Model}.{VehicleNo}
                    </div>
                </div>
                <a
                    onClick={(e)=>{jsCallPhone(`${DriverPhone}`);}}
                    className="call">
                    <img src="newimg/20.png"  alt=""/>
                    联系TA
                </a>
            </div>
            <div className="topicinfo">
                <div><img src="newimg/37.png" width={27}  alt=""/>{topicinfo}</div>
            </div>
        </div>
    </div>
  );
};

export class Page extends React.Component {

    render(){
        const {
            curmappageorder,
            curmappagerequest,
        } = this.props;
        if(curmappageorder.hasOwnProperty('_id')){
            let requestobj = curmappagerequest;
            let driverinfo = curmappageorder.driverinfo || {
                DriverName:'无名司机',
                VehicleNo:'隐藏车牌',
                PlateColor:'',
                Brand:'',
                Model:'匿名车辆',
                starnum:5
            };


            let getrequestingcomponents =()=>{
                  return (
                    <div className="loadingdriver">
                        <ul>
                            <li>您好正在为您寻找司机，请等待....</li>
                        </ul>
                    </div>
                );
            };

            let getrequestoverwaitingpickup=()=>{
                return  (
                    <PageDriverHead topicinfo="司机即将到达，请提前到路边等待" driverinfo={driverinfo}/>
                );
            };

            let getrequestoverwaitinggetin=()=>{
                return  (
                    <PageDriverHead topicinfo="司机已到达，请尽快上车" driverinfo={driverinfo}/>
                );
            };
            let gettripping=()=>{
                return  (
                    <PageDriverHead topicinfo="行程开始，祝您一路好心情。" driverinfo={driverinfo}/>
                );
            };

            if(requestobj.requeststatus === '请求中'){
              return getrequestingcomponents();
            }
            if(requestobj.requeststatus === '已接单'){
              return getrequestoverwaitingpickup();
            }
            if(requestobj.requeststatus === '待上车'){
              return getrequestoverwaitinggetin();
            }
            if(requestobj.requeststatus === '行程中'){
              return gettripping();
            }
            if(requestobj.requeststatus === '行程完成'){
            }
        }
        return (<div>请稍后</div>);
    }

};

const mapStateToProps = ({carmap:{mapstage,curmappagerequest,curmappageorder,curlocation}}) => {
    return {mapstage,curmappagerequest,curmappageorder,curlocation};
}


export default connect(
    mapStateToProps,
)(Page);
