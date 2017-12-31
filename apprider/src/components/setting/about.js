import React from 'react'
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import {getabouthtml_request} from '../../actions';
import NavBar from '../tools/nav.js';
import _ from 'lodash';

export class Page extends React.Component {
    componentWillMount () {
        this.props.dispatch(getabouthtml_request({
            keyname:this.props.match.params.keyname
        }));
    }
    onClickBack =()=>{
        this.props.history.goBack();
    }
    render() {
        let title = _.get(this.props[this.props.match.params.keyname],'title','');
        let desc = _.get(this.props[this.props.match.params.keyname],'desc','');
        return (
            <div className="settingPage AppPage">
                <NavBar back={true} title={title} />
                <div className="list">
                    {renderHTML(desc)}
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({about}) => {
  return about;
}
export default connect(mapStateToProps)(Page);
