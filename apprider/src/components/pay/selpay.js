/*
    个人中心-选择支付方式
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/selpay.css';
import NavBar from '../tools/nav.js';

const {
    FormCell,
    Form,
    CellBody,
    CellFooter,
    CellHeader,
    CellsTitle,
    Radio
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="selpayPage">
                <CellsTitle>请选择交易方式:</CellsTitle>
                <Form radio>
                    <FormCell radio>
                        <CellHeader>
                            <img src="newimg/p14.png" alt="" />
                        </CellHeader>
                        <CellBody>微信</CellBody>
                        <CellFooter>
                            <Radio name="radio1" value="1" defaultChecked/>
                        </CellFooter>
                    </FormCell>
                    <FormCell radio>
                        <CellHeader>
                            <img src="newimg/p15.png" alt="" />
                        </CellHeader>
                        <CellBody>支付宝</CellBody>
                        <CellFooter>
                            <Radio name="radio1" value="2"/>
                        </CellFooter>
                    </FormCell>
                    <FormCell radio>
                        <CellHeader>
                            <img src="newimg/p22.png" alt="" />
                        </CellHeader>
                        <CellBody>余额支付</CellBody>
                        <CellFooter>
                            <Radio name="radio1" value="2"/>
                        </CellFooter>
                    </FormCell>
                </Form>
            </div>
        )
    }

}
export default Page;
