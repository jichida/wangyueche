import React from 'react';
import { connect } from 'react-redux';

import {
  carmapshow_createmap,
  carmapshow_destorymap
} from '../../actions';

export class Page extends React.Component {
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
    return (
      <div style={{
        width: '100%',
        height: `${this.props.height}px`,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative'
      }}>
        <div  id="gaodemap"  style={{
                  width: '100%',
                  height: '100%',
                  position:'absolute',
                  left:"0",
                  top: '0',
                  zIndex:1
                }} />
      </div>
    );
  }
}

export default connect()(Page);
