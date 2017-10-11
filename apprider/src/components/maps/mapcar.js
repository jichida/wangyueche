import React from 'react';
import { connect } from 'react-redux';

import {
  carmapshow_createmap,
  carmapshow_destorymap,
} from '../../actions';

import "../../../public/newcss/mapcontainer.css";

class Page extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
    componentWillMount () {
      console.log('地图---->componentWillMount---------');
    }
    componentWillUnmount(){
      console.log('地图---->componentWillUnmount---------');
      this.props.dispatch(carmapshow_destorymap());
    }
    componentDidMount () {
      console.log('地图---->componentDidMount---------');
      this.props.dispatch(carmapshow_createmap());
   }

    render() {
        const height = this.props.height;
        console.log('地图---->render---------height:'+height);
        return (
            <div className="mapcontainer">
                <div id="gaodemap" style={{height:`${height}px`}}/>
            </div>
        );
    }
}


export default connect()(Page);
