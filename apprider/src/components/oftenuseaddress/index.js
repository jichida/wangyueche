/*
    个人中心-常用地址
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/addresscommon.css';
import NavBar from '../tools/nav.js';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    } = WeUI;

import {
  getoftenuseaddress_request
} from '../../actions';
import _ from 'lodash';

class Page extends Component {
    componentWillMount () {
        this.props.dispatch(getoftenuseaddress_request());
    }
    onClickPage(name){
        this.props.history.push('/search/' + name);
    }

    onClickBack(){
        this.props.history.goBack();
    }

    render() {
        const  {homeaddressname,companyaddressname} = this.props;
        return (
            <div className="addresscommonPage AppPage">
                <NavBar back={true} title="常用地址" />
                <div className="list">
                    <Cells>
                        <Cell access onClick={this.onClickPage.bind(this,'home')}>
                            <CellHeader>
                                <img src="newimg/8.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                家
                            </CellBody>
                            <CellFooter>
                                {homeaddressname}
                            </CellFooter>
                        </Cell>
                        <Cell access onClick={this.onClickPage.bind(this,'company')}>
                            <CellHeader>
                                <img src="newimg/9.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                公司
                            </CellBody>
                            <CellFooter>
                                {companyaddressname}
                            </CellFooter>
                        </Cell>
                    </Cells>

                </div>
            </div>
        )
    }

}



const mapStateToProps = ({oftenuseaddress}) => {
    let homeaddressname = '';
    let companyaddressname ='';

    homeaddressname = _.get(oftenuseaddress,"home.name",'设置家的地址');
    companyaddressname = _.get(oftenuseaddress,"company.name",'设置公司地址');

    return {homeaddressname,companyaddressname};
}


export default connect(
    mapStateToProps,
)(Page);
