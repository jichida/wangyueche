import React from 'react';
import MapGaode from './mapcar.js';
import NavBar from '../tools/nav.js';

export default class Page extends React.Component {

    render() {
        const {currentrequest:curreqobj,currentorder,onClickNext} = this.props;
        const {resultpricedetail} = curreqobj;
        if(curreqobj.requeststatus === '已取消'){
            return (<div>已取消</div>);
        }
        console.log("curreqobj==>"  + JSON.stringify(curreqobj));
        return (
            <div className="outcarPage AppPage startTrip">
                <NavBar
                    back={false}
                    title="开始行程"
                />
                <div className="orderinfohead">
                    <div className="address">
                        <div className="a"><img src="newimg/37.png" alt=""/>行程开始，祝您一路好心情</div>
                        <div className="color_warning">全程大约{resultpricedetail.totalkm}公里 耗时{resultpricedetail.totalduringminute}分钟</div>
                    </div>
                </div>
                <div className="mapcontent list">
                    <MapGaode ref='mapgaode' curreqobj={curreqobj} currentorder={currentorder} height={window.innerHeight-68}  />
                </div>
                <div className="submitBtn">
                    <button onClick={onClickNext} className="btn Primary"><span>到目的地</span></button>
                </div>
            </div>
        );
    }
}
