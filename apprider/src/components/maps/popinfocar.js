import React from 'react';

import '../../../public/css/popinfocar.css';
let Popinfocar = ({positiondiv,totaldistancetxt,totaldurationtxt,realtimepricedetail=null})=> {
  let pricedetail = realtimepricedetail || {price:0};
  return (
  <div className="mapCoverInfo" style={{left:positiondiv[0]+'px',top:positiondiv[1]+'px'}}>
    <div className="infoCont">
      <div className="info">
        <p>距离终点<span>{totaldistancetxt}</span></p>
        <p>预计行驶<span>{totaldurationtxt}</span></p>
      </div>
      <div className="price">
        <span>{pricedetail.price}元 </span>
      </div>
    </div>
    <div className="point"></div>
  </div>);
}

export default Popinfocar;
