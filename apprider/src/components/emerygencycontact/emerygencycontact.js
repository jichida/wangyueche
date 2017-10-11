/*
    个人中心-紧急联系人列表
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/urgentlist.css';
import NavBar from '../tools/nav.js';
import _ from "lodash";
import {
  getemerygencycontact_request,
  deleteemerygencycontact_request
} from '../../actions';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellsTitle
    } = WeUI;
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';

class Page extends Component {

    componentWillMount () {
        this.props.dispatch(getemerygencycontact_request());
    }
    onClickBack(){
        this.props.history.goBack();
    }
    onClickDelete(item){
        this.props.dispatch(deleteemerygencycontact_request({_id:item._id}));
    };
    onClickAdd(){
        this.props.history.push('/seladdressbook');
    }
    render() {
        const {myconcatlist} = this.props;
        const maxlimited = 5;
        return (
            <div className="urgentlistPage AppPage">
                <NavBar back={true} title="紧急联系人" />
                <div className="head">
                    为了保证您的行程安全<br/>
                    紧急联系人将用于紧急救助功能
                </div>
                <div className="list">
                    <Cells className="tixianlnk">
                        {
                            _.map(myconcatlist, (concat,index)=>{
                                return (
                                        <Swipeout  key={index} autoClose={true}
                                                  right={[
                                                    {
                                                        text: '删除',
                                                        onPress:this.onClickDelete.bind(this,concat),
                                                        style: { backgroundColor: 'red', color: 'white', fontSize:"16px" }
                                                    }
                                                ]}
                                            onOpen={() => console.log('open')}
                                            onClose={() => console.log('close')}
                                        >
                                        <Cell>
                                        <CellBody>
                                            {concat.name}
                                        </CellBody>
                                        <CellFooter>
                                            {concat.tel}
                                        </CellFooter>
                                        </Cell>
                                        </Swipeout>

                                )
                            })
                        }

                        {
                          (myconcatlist.length < maxlimited) &&
                            (<Cell
                                onClick={()=>{this.onClickAdd()}}
                                access>
                                <CellBody>
                                    添加紧急联系人
                                </CellBody>
                                <CellFooter />
                            </Cell>)
                        }
                    </Cells>
                    <CellsTitle>最多添加{maxlimited}位联系人</CellsTitle>
                </div>
            </div>
        )
    }
}
const data = ({emerygencycontact:{myconcatlist}}) => {
    return {myconcatlist};
}
export default connect(data)(Page);
