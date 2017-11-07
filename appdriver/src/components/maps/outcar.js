/*
    出车
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/outcar.css';
import NavBar from '../tools/nav.js';
import { connect } from 'react-redux';
// import {getdistance} from '../../util/geo';

const {
    Cells,
    Cell,
    CellBody,
    CellFooter
    } = WeUI;
import MapGaode from './mapcar.js';
import _ from 'lodash';
import {
  carmap_resetmap,
  selrequest,
  ui_outcarselregistertype,
  ui_outcarexpand,
  set_weui,
  startoperate,
  stopoperate
  } from '../../actions';

class Page extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentWillMount () {
    this.props.dispatch(carmap_resetmap());
    const {approvalstatus,loginsuccess} = this.props;
    this.props.dispatch(startoperate({approvalstatus,loginsuccess}));
  }
  onClickReturn(){
    const {approvalstatus,loginsuccess} = this.props;
    this.props.dispatch(stopoperate({approvalstatus,loginsuccess}));
    this.props.history.goBack();
  }

  onClickTitle(regtype){
    this.props.dispatch(ui_outcarselregistertype(regtype));
  }
  onClickReq(reqobj){
    this.props.dispatch(selrequest(reqobj));
    this.props.history.push(`/selrequest/${reqobj._id}`);
  }
  showlist=(outcarexpand)=>{
      if(this.props.requestlist.length===0){
          this.props.dispatch(set_weui({
            toast: {
              show : true,
              text : "暂无订单数据",
              type : "warning"
            },
          }))
      }else{
        this.props.dispatch(ui_outcarexpand(outcarexpand));
      }
  }
  render() {
        const {
          uiregistertype,
          requestlist,
          outcarexpand,
          registertypeoptions,
        } = this.props;

        let titleco = [];
        _.map(registertypeoptions,(registertype,index)=>{
          if(uiregistertype === registertype){
            titleco.push(<span key={index} className="sel">{registertype}</span>);
          }
          else{
            titleco.push(<span key={index} onClick={this.onClickTitle.bind(this,registertype)}>{registertype}</span>);
          }
        });

        return (
            <div className="outcarPage AppPage">
                <NavBar back={false} title="中南出行" />
                <div className="headNav">
                    {titleco}
                </div>
                <div className="mapcontent">
                    <MapGaode ref='mapgaode' height={window.innerHeight-116} />
                    <div className="outcarControl">
                        <div
                          className={outcarexpand?"list show":"list"}
                          >

                            <Cells>
                               {
                                  _.map(requestlist,(reqobj,index)=>{
                                      let triptypename = reqobj.isrealtime?'实时':'预约';
                                      return (
                                          <Cell key={index} access onClick={this.onClickReq.bind(this,reqobj)}>
                                              <CellBody>
                                                  <div className="tt">
                                                      <span className="i">{triptypename}</span>
                                                      <span>{reqobj.showtimestring}</span>
                                                  </div>
                                                  <div className="li a">{reqobj.srcaddress.addressname}</div>
                                                  <div className="li b">{reqobj.dstaddress.addressname}</div>
                                              </CellBody>
                                              <CellFooter />
                                          </Cell>
                                      )
                                  })
                              }
                            </Cells>
                        </div>
                        <div className="bbtn">
                            <span onClick={this.onClickReturn.bind(this)}>收车</span>
                            <span onClick={()=>{this.showlist(!outcarexpand)}}>
                              {outcarexpand?"隐藏订单":"展开订单"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({appui:{outcarexpand,pageregistertype:uiregistertype},operate,userlogin}) => {
  let nearbyrequestslist = operate.nearbyrequests.list;
  let requests = operate.nearbyrequests.requests;
  let curlocation = operate.curlocation;
  let userregistertype = userlogin.registertype;
  const {approvalstatus,loginsuccess} = userlogin;
  let registertypeoptions =[];
  if(userregistertype === '快车'){
    registertypeoptions= ['快车','代驾'];
  }
  else if(userregistertype === '出租车'){
    registertypeoptions= ['出租车','代驾'];
  }
  else if(userregistertype === '代驾'){
    registertypeoptions= ['代驾'];
  }
  if(registertypeoptions.indexOf(uiregistertype) === -1){
    uiregistertype = registertypeoptions[0];
  }

  let requestlist = [];
  _.map(nearbyrequestslist,(requestid)=>{
    let reqobj = requests[requestid];
    if(reqobj.triptype === uiregistertype){
      requestlist.push(reqobj);
    }
  });
  return {
    outcarexpand,
    uiregistertype,
    requestlist,
    registertypeoptions,
    curlocation,
    approvalstatus,
    loginsuccess
  };
}

export default connect(
  mapStateToProps,
)(Page);
