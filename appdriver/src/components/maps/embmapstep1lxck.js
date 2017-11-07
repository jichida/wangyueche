import React from 'react';
import MapGaode from './mapcar.js';
import {getdistance} from '../../util/geo.js';


export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
  }
  render() {
      const {currentrequest:curreqobj,curlocation,onClickNext,onClickCancel} = this.props;

      if(curreqobj.requeststatus === '已取消'){
        return (<div>已取消</div>);
      }
      console.log("curreqobj==>"  + JSON.stringify(curreqobj));
      return (
           <div>
          <div style={{height:"200px",overflow:"hidden"}}><MapGaode ref='mapgaode'  curreqobj={curreqobj} height={window.innerHeight-68} /></div>
          <div className="list margin-0 xjl_bottom">
          <div className="item">
                    <div>{curreqobj.showtimestring}</div>
                    <div className="item-after"><span className="icon icon-jl fize18"></span>
                      距离乘客:{getdistance([curlocation.lng,curlocation.lat],[curreqobj.srcaddress.location.lng,curreqobj.srcaddress.location.lat])}
                    </div>
                  </div>
            <div className="item item-linked item-content"> <a>
              <div className="item-media"><img width="50" src="images/user.jpg" className="radius50" alt='img'/></div>
              <div className="item-main">
                <div className="cfd_icon">{curreqobj.srcaddress.addressname}</div>
                <div className="zd_icon">{curreqobj.dstaddress.addressname}</div>
              </div>
              <img src="images/dh.png" alt="img" style={{width:"40px"}}/></a> </div>
              <button onClick={onClickNext} amStyle="primary" block className="btn Primary">去接乘客</button>
              <button onClick={onClickCancel} amStyle="primary" block className="btn Primary">取消</button>
          </div>
    </div>
  );
}


}
