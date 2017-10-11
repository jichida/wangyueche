import React from 'react';
import { connect } from 'react-redux';
import _ from "lodash";
import UserCenter from './usercenter.js';
import Lvyoudaba from '../tourbus/selbusform.js';
//import Lvyoudaba from '../tourbus/index.js';

import Pinche from '../carpool/index.js';
import CarOverlayEmbedded from '../maps/caroverlaymbedded';
var Sidebar = require('react-sidebar').default;
import NavBar from '../tools/nav.js';
import {
    ui_setsidebaropen,
    ui_setindexmapvisiable,
    carmap_settriptype,
    set_weui
    } from '../../actions';
import '../../../public/newcss/appriderhome.css';
import {setbackhandler,removebackhandler,exitAndroidApp} from '../../env/android';


export class AppIndex extends React.Component {
    componentWillMount() {
      let that = this;
      setbackhandler(()=>{
        console.log('click android back');
        let confirm = {
          show : true,
          title : "你确定需要退出吗",
          text : "",
          buttonsCloseText : "取消",
          buttonsClickText : "确定",
          buttonsClose : ()=>{console.log('click close');},
          buttonsClick : ()=>{exitAndroidApp();}
        };
        that.props.dispatch(set_weui({confirm}));

      });

      let currentkeyname = this.props.match.params.keyname;
      if(currentkeyname==='chuzuche' || currentkeyname==='kuaiche' || currentkeyname==='daijia'){
          this.props.dispatch(ui_setindexmapvisiable(true));

          if(currentkeyname === 'chuzuche'){
              this.props.dispatch(carmap_settriptype('出租车'));
          }
          else if(currentkeyname === 'kuaiche'){
              this.props.dispatch(carmap_settriptype('快车'));
          }
          else if(currentkeyname === 'daijia'){
              this.props.dispatch(carmap_settriptype('代驾'));
          }
      }
      else{
          this.props.dispatch(ui_setindexmapvisiable(false));
      }

    }

    componentWillUnmount() {
      removebackhandler();
      this.props.dispatch(ui_setindexmapvisiable(false));
    }
    renderOC =()=> {
        return (<UserCenter />);
    }
    onSetSidebarOpen(open){
        this.props.dispatch(ui_setsidebaropen(open));
    }
    onClickMessageCenter(){
      this.props.history.push('/messagecenter');
    }
    onClickPage(page){
        this.props.history.replace('/index/'+page);

        //代驾余额不足//mywallet
        const {balance,daijialeastbalance} = this.props;
        if(page === 'daijia' && balance < daijialeastbalance){
            let confirm = {
                show : true,
                title : "余额不足",
                text : `您好，您的帐户余额${balance}不足${daijialeastbalance}元，需要充值，才能使用代驾`,
                buttonsCloseText : "暂不充值",
                buttonsClickText : "去充值",
                buttonsClick : ()=>{this.onClickPagePush("/mywallet")}
            }
            this.props.dispatch(set_weui({confirm}));
        }
    }
    onClickPagePush(page){
        this.props.history.push(page);
    }

    componentWillReceiveProps (nextprop) {
        if(nextprop.match.params.keyname !== this.props.match.params.keyname){
            const {match} = nextprop;
            let currentkeyname = match.params.keyname;
            if(currentkeyname==='chuzuche' || currentkeyname==='kuaiche' || currentkeyname==='daijia'){
                this.props.dispatch(ui_setindexmapvisiable(true));
                if(currentkeyname === 'chuzuche'){
                    this.props.dispatch(carmap_settriptype('出租车'));
                }
                else if(currentkeyname === 'kuaiche'){
                    this.props.dispatch(carmap_settriptype('快车'));
                }
                else if(currentkeyname === 'daijia'){
                    this.props.dispatch(carmap_settriptype('代驾'));
                }
            }
            else{
                this.props.dispatch(ui_setindexmapvisiable(false));
            }
        }
    }

    render() {
        //console.log("thisprops:" + JSON.stringify(this.props));
        const {issidedbaropen,match,daijialeastbalance} = this.props;
        let pathnamelist = [
            {
                keyname:'chuzuche',
                title:'出租车',
                Co:<CarOverlayEmbedded {...this.props}/>
            },
            {
                keyname:'kuaiche',
                title:'快车',
                Co:<CarOverlayEmbedded {...this.props}/>
            },
            {
                keyname:'pinche',
                title:'拼车',
                Co:<Pinche {...this.props}/>
            },
            {
                keyname:'lvyoudaba',
                title:'旅游大巴',
                Co:<Lvyoudaba {...this.props}/>
            },
            {
                keyname:'daijia',
                title:'代驾',
                Co:<CarOverlayEmbedded {...this.props}/>
            }
        ];

        let Co = null;
        let currentkeyname = match.params.keyname;
        if(!currentkeyname || currentkeyname===''){
            currentkeyname = pathnamelist[0].keyname;
            Co = pathnamelist[0].Co;
        }

        let navlinkco = [];
          pathnamelist.forEach((cur)=>{
            if(cur.keyname === currentkeyname){
                  Co = cur.Co;
            }
            navlinkco.push(' ');
        });
        return (
            <div className="appriderhomePage AppPage">
                <Sidebar
                    sidebar={this.renderOC()}
                    sidebarClassName="homesidebar"
                    contentClassName="homesidebarcontent"
                    open={issidedbaropen}
                    docked={false}
                    touch={false}
                    onSetOpen={this.onSetSidebarOpen.bind(this)}
                    shadow={false}
                    >
                    <div className="view">
                        <NavBar
                            back={false}
                            leftnav={[
                                {
                                    icon : 'newimg/35.png',
                                    icontype : "img",
                                    type : 'action',
                                    action : this.onSetSidebarOpen.bind(this,true),
                                    width : "24px",
                                    height: "24px",
                                },
                            ]}
                            rightnav={[
                                {
                                    icon : 'newimg/36.png',
                                    icontype : "img",
                                    type : 'action',
                                    action:this.onClickMessageCenter.bind(this),
                                    width : "24px",
                                    height: "24px",
                                },
                            ]}
                            title="网约车"
                            />

                        <div
                            className="nav"
                            >
                            {
                                _.map(pathnamelist, (cur, index)=>{
                                    return (
                                        <div
                                            onClick={this.onClickPage.bind(this,cur.keyname)}
                                            key={cur.keyname}
                                            className={cur.keyname === currentkeyname?"hover":""}
                                            >
                                            {cur.title}
                                        </div>
                                    )
                                })
                            }
                            {currentkeyname==="daijia"?(
                                <div className="daijiayueTip color_warning">
                                    <span>呼叫代驾，账户余额必须满{daijialeastbalance}元</span>
                                    <span className="btnn" onClick={()=>{this.onClickPagePush("/mywallet")}}>查看余额</span>
                                </div>
                            ):""}
                        </div>



                        <div className="list">
                            {Co}
                        </div>
                    </div>
                </Sidebar>
            </div>
        );
    }
}

const mapStateToProps = ({appui:{home},app:{daijialeastbalance},userlogin:{balance}}) => {
  return {...home,balance,daijialeastbalance};
}
AppIndex = connect(mapStateToProps)(AppIndex);
export default AppIndex;
