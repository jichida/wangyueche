import React from 'react';

import NavBar from '../tools/nav.js';
import MapGaode from './mapcar.js';
import PageRiderHead from './pageriderheader';

export default class Page extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentWillMount () {
    }
    onClickNext(btnname){
        this.props.onClickNext(btnname);
    }
    render() {
        const {driveroute:routeshow,currentrequest:curreqobj,currentorder,onClickCancel} = this.props;
        //urreqobj.requeststatus
        return (
            <div className="outcarPage AppPage">
                <NavBar
                    back={false}
                    title="接乘客"
                    rightnav={[{
                        text:"取消订单",
                        type:"action",
                        action:onClickCancel
                    }]}
                />
                <PageRiderHead currentorder={currentorder}/>
                <div className="mapcontent list">
                    <MapGaode ref='mapgaode'  curreqobj={curreqobj} height={window.innerHeight-68}  />
                </div>
                <div className="submitBtn">
                    <h3 className="item-title text-warning">{routeshow.instruction}<div className="gray">{routeshow.leftdistancetxt} {routeshow.leftduringtxt}</div></h3>
                    <button onClick={this.onClickNext.bind(this,'')} className="btn Primary"><span>到达叫车位置</span></button>
                </div>
            </div>
        );
    }
}
