import { connect } from 'react-redux';
import React from 'react';
import '../../newcss/message.css';
import NavBar from '../tools/nav.js';
import moment from 'moment';
import _ from 'lodash';

import {
  getnotifymessage_request,
  getnotifymessage_result,
  getnotifymessageone_result
} from '../../actions';

import {callthen} from '../../sagas/sagacallback';


import InfinitePage from '../controls/listview';
let usecachemsg = false;
const NotifymessageItem = (props) => {
    const {notifymessage,onClickMsgDetail} = props;
    const createdatestring = moment(notifymessage.created_at).format("YYYY-MM-DD");
    return (
        <div className="li"  onClick={onClickMsgDetail}>
            <div className="time">{createdatestring}</div>
            <div className="cont">
                <div className="tit">{notifymessage.messagetitle}</div>
                <div className="text">{notifymessage.messageconent}</div>
            </div>
        </div>
    );
}


export class Page extends React.Component {

    updateContent = (msg)=> {
        return  (
          <NotifymessageItem
              key={msg._id}
              notifymessage={msg}
              onClickMsgDetail={this.onClickMsgDetail.bind(this,msg)}
              />
        );
    }
    componentDidMount(){
      usecachemsg = false;
    }

    onClickMsgDetail(item){
        usecachemsg = true;
        this.props.dispatch( getnotifymessageone_result(item) );
        this.props.history.push(`/mymessagedetail/${item._id}`);
    }

    render() {
        return (
          <div className="messagePage AppPage">
               <NavBar back={true} title="消息" />
               <div className="list">
                    <InfinitePage
                        usecache={usecachemsg}
                        listtypeid='msg'
                        pagenumber={30}
                        updateContent={this.updateContent}
                        queryfun={(payload)=>{
                          return callthen(getnotifymessage_request,getnotifymessage_result,payload);
                        }}
                        listheight={window.innerHeight-68}
                        query={{}}
                        sort={{created_at: -1}}
                    />
                </div>
            </div>
        )
    }
}

export default connect()(Page);
