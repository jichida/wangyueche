import React from 'react';

import '../../../public/newcss/nav.css';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

export class Page extends React.Component {

    pageBack=()=>{
        this.props.history.goBack();
    };

    pagePush=(name)=>{
        this.props.history.push(name);
    }

    //展示红点数字
    showRedNumber =(number)=>{
        if(number>0){
            return (
                <span className="number">{number}</span>
            )
        }else{
            return "";
        }
    }

    //用户自定义按钮
    getuserbtn =(nav,index)=>{
        let action = null;
        if(nav.hasOwnProperty("action")){
            action = nav.action;
        }
        if(nav.type=='push'){
            action = this.pagePush.bind(this,nav.url);
        }
        return (
            <span className="nli" onClick={action} key={index}>
                {
                    !!nav.icon?(
                        <span className="iconBtn" onClick={()=>{action(nav.url)}}>
                            <img src={nav.icon} style={{width:nav.width,height:nav.height}}/>
                        </span>
                    ):""
                }
                {
                    !!nav.text?(<span>{nav.text}</span>):""
                }
                {
                    nav.hasOwnProperty('number')?this.showRedNumber(nav.number):""
                }
            </span>
        )
    }


    render() {
        const props = this.props;
        //是否有返回按钮 back＝true
        let back = props.hasOwnProperty('back')?props.back:false;
        //是否有分享到按钮 share＝true
        let share = props.hasOwnProperty('share')?props.share:false;
        //判断是否有用户自定义左侧按钮
        let haveUserLeftNav = props.hasOwnProperty('leftnav')?true:false;
        //判断是否有用户自定义右侧按钮
        let haveUserRightNav = props.hasOwnProperty('rightnav')?true:false;
        //自定义左侧按钮
        /*
            leftnav = [
                {
                    icon : 'img/shopping/11.png',
                    text : '',
                    type : 'push',//push, action,
                    url : '/shoppingcart',
                    width : "10px",
                    height: "10px",
                    number : 0,
                },
            ]
        */
        let leftnav = [];
        if(haveUserLeftNav){
            leftnav = props.leftnav;
        }
        //自定义右侧按钮
         /*
            rightnav = [
                {
                    icon : 'img/shopping/11.png',
                    text : '',
                    type : 'push',//push, action,
                    url : '/shoppingcart'
                },
            ]
        */
        let rightnav = [];
        if(haveUserRightNav){
            rightnav = props.rightnav;
        }

        return (
            <div className="newNavHeadContent" id="newNavHeadContent">
                <span className="leftlnk">
                {
                    back?(<span className="back" onClick={()=>{this.pageBack()}} />):''
                }
                {
                    _.map(leftnav, (nav, index)=>{
                        return this.getuserbtn(nav,index);
                    })
                }
                </span>
                <span className="title">
                    {this.props.title}
                </span>
                <span className="rightlnk">
                {
                    share?(<span className="share"></span>):''
                }
                {
                    _.map(rightnav, (nav, index)=>{
                        return this.getuserbtn(nav,index);
                    })
                }
                </span>
            </div>
        );

    }
}
Page = withRouter(Page);
export default Page;
