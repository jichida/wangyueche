import React from 'react';
import MapGaode from './mapcar.js';
import { connect } from 'react-redux';
import NavBar from "../tools/nav";
import CarOverlayInit from './caroverlayinit.js';
import CarOverlayOrder from './caroverlayorder.js';
import "../../../public/newcss/caroverlay.css";
import {
    carmap_resetmap_url,
    set_weui,
    changestartposition
    } from '../../actions';
import {
    canceltriprequestorder_request
    } from '../../actions';
import {setbackhandler,removebackhandler} from '../../env/android';

export class Page extends React.Component {
    componentWillMount () {
      let that = this;
      setbackhandler(()=>{
        let toast = {
            show : true,
            text : "打车过程中不能按返回键",
            type : "warning"
        }
        that.props.dispatch(set_weui({toast}));
      });
    }
    componentWillUnmount() {
      removebackhandler();
    }
    //取消叫车
    cancelcar =()=>{
        let canceltext = "您确定要取消叫车吗?";
        const {curmappageorder,daijiacancelprice} = this.props;
        if(curmappageorder.triptype === '代驾' &&  !!curmappageorder.driveruserid){
          canceltext = `您确定要取消叫车吗?取消需要支付${daijiacancelprice}`;
        }
        this.props.dispatch(set_weui({
            confirm : {
                show : true,
                title : "取消叫车",
                text : canceltext,
                buttonsCloseText : "取消",
                buttonsClickText : "确定",
                buttonsClose : ()=>{},
                buttonsClick : ()=>{this.cancelrequest()}
            },
        }))
    }

    cancelrequest =()=>{
        const {curmappageorder,curmappagerequest,curlocation,dispatch} = this.props;
        dispatch(canceltriprequestorder_request({
            triporderid:curmappageorder._id,
            triprequestid:curmappagerequest._id
        }));
    }

    shouldComponentUpdate(nextProps, nextState) {
      //不显示中间页面！
      const {triptype,mapstage,curmappagerequest,curmappageorder,dispatch} = nextProps;
      let needrender = true;
      let url='/';
      if(triptype === '出租车'){
        url='/index/chuzuche';
      }
      else if(triptype === '快车'){
        url='/index/kuaiche';
      }
      else if(triptype === '代驾'){
        url='/index/daijia';
      }
      if(mapstage === 'pageinit' || !curmappagerequest){
        needrender = false;
      }
      else {
          if(curmappagerequest.requeststatus === '行程完成' ||
            curmappagerequest.requeststatus === '已取消'){
              needrender = false;
              url = curmappagerequest.requeststatus === '行程完成' ?`/orderdetail/${curmappageorder._id}`:'/';
            }
      }
      if(!needrender){
        dispatch(carmap_resetmap_url({url}));
      }
      return needrender;
    }

    render() {
        const {mapstage,curmappagerequest} = this.props;
        if(!curmappagerequest.requeststatus){
            return <div>无请求</div>
        }
        let dataLefttitle = curmappagerequest.requeststatus;
        let rightnav = [];
        if(dataLefttitle !== '行程中'){
          rightnav = [
              {
                  type : 'action',
                  action : this.cancelcar.bind(this),
                  text : "取消叫车"
              },
          ];
        }

        if(mapstage === 'pageorder' && dataLefttitle === '行程完成'){
              return (
                        <div>行程完成,正在生成订单</div>
                    );
        }
        return (
            <div className="caroverlayPage AppPage">
                <NavBar
                    back={false}
                    title={dataLefttitle}
                    rightnav={rightnav}
                    />
                <div className="list">
                    <MapGaode ref='mapgaode' height={window.innerHeight-68} />
                    {mapstage === 'pageinit' && <CarOverlayInit />}
                    {mapstage === 'pageorder' && <CarOverlayOrder />}
                </div>
            </div>
        );
    }

}
//<NavBar {...dataLeft}/>
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


const mapStateToProps = ({
    carmap:
    {
      triptype,
      mapstage,
      curmappagerequest,
      curmappageorder,
      curlocation
    },
    app:{
      daijiacancelprice
    }
  }) => {
    return {triptype,mapstage,curmappagerequest,curmappageorder,curlocation,daijiacancelprice};
}


export default connect(
    mapStateToProps,
)(Page);
