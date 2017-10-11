import React from 'react'
import { connect } from 'react-redux';
import {
  Container,
  View,
  NavBar,
} from 'amazeui-touch';

export class Page extends React.Component {

  componentWillMount () {
  }

  onClickBack(){
    this.props.history.goBack();
  }

   render() {
      const itemLeft = {
        title: '返回'
      };
      const dataLeft = {
        title: '车费详情',
        leftNav: [{...itemLeft, icon: 'left-nav'}],
        onAction: ()=>{
          this.onClickBack();
        },
      };
      const {orderinfo,realtimepricedetail} = this.props;
      return (<View>
           <NavBar {...dataLeft}/>
           <Container scrollable={true}>
          <div className="group no-magin-top margin-top-0">
            <div className="group-body">
              <div className="item-main padding-bottom">
              <h3 className="item-title">{realtimepricedetail.pricestringdetail}</h3>
              <div className="item-after">{realtimepricedetail.pricestringdebug}</div></div>
              <div className="item-main">
              <h3 className="item-title text-primary"></h3>
              <div className="item-after text-primary">{realtimepricedetail.price}</div></div>
              </div>
            <div className="line_bg"></div>
          </div>
          </Container>
         </View>);
       }
}

const mapStateToProps =  ({myorders}, props) =>{
    let triporderid = props.match.params.triporderid;
    let orderinfo =  myorders.triporders[triporderid];
    let realtimepricedetail = orderinfo.realtimepricedetail;
    return {realtimepricedetail,orderinfo};
};
export default connect(mapStateToProps)(Page);
