import React from 'react';
import '../../../public/css/popinfocar.css';
let Popinfocar = (props)=> {
  return (
        <div
            className="mapCoverInfo"
            style={{
                left:props.positiondiv[0]+'px',
                top:props.positiondiv[1]+'px',
                minWidth : "116px"
            }}
            >
        <div className="infoCont">
                <div>
                <span>在这里上车</span>
            </div>
        </div>
        <div className="point"></div>
        </div>
    );
}
export default Popinfocar;
