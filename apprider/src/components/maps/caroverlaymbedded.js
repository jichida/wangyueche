/**
 * Created by wangxiaoqing on 2017/3/14.
 */
import React from 'react';
import MapGaode from './mapcar.js';
import { connect } from 'react-redux';
import CarOverlayInit from './caroverlayinit.js';

export class Page extends React.Component {
    render() {
        return (
            <div className="mapgaodePage">
                <MapGaode ref='mapgaode' height={window.innerHeight-114}/>
                {this.props.mapstage === 'pageinit'?(
                    <CarOverlayInit />
                ):""}
            </div>
        );
    }
}
/*
 分4个页面：
 1.mapcarpage,公用
 {
 mapstage:'pageinit'/'pageorder'
 zoomlevel,
 startaddress,
 endaddress,
 curlocation,
 pastpathlatlngs,//走过的路线
 leftpathlatlngs//剩余的路线
 }
 2.mappageinit:{
 ispagenow,
 ridedateopen
 ridedatesel
 totaldistance
 }
 3.mappagerequest：
 {
 reqobj
 }
 4.curmappageorder
 {
 orderobj
 }
 */

const mapStateToProps = ({carmap:{mapstage}}) => {
    return {mapstage};
}
export default connect(
    mapStateToProps,
)(Page);
