/*
    个人中心-选择支付方式
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/addresscommon.css';
const {
    FormCell,
    Form,
    CellBody,
    CellFooter,
    CellHeader,
    CellsTitle,
    Radio
    } = WeUI;
import _ from 'lodash';

class Page extends Component {

    clickSelPay(paytype) {
      const {input} = this.props;
      input.onChange(paytype);
    }

    render() {
        let paytypeuisz = {
          'weixin':{
            imgurl:'newimg/14.png',
            name:'微信'
          },
          'alipay':{
            imgurl:'newimg/15.png',
            name:'支付宝'
          },
          'leftbalance':{
            imgurl:'newimg/22.png',
            name:'余额支付'
          }
        }

        const {paytypelist,input} = this.props;
        console.log(`this.props=====> {${JSON.stringify(input)}}`);
        return (
            <div className="userrechargePage">
                <CellsTitle>请选择交易方式:</CellsTitle>
                <Form radio>
                    {
                      _.map(paytypelist,(paytype)=>{
                        let paytypeui = paytypeuisz[paytype];
                        return (
                          <FormCell radio key={paytype}>
                              <CellHeader>
                                  <img src={paytypeui.imgurl} alt=""/>
                              </CellHeader>
                              <CellBody>{paytypeui.name}</CellBody>
                              <CellFooter>
                                  {paytype === input.value?<Radio name="radio1" value="1" defaultChecked/>:
                                    <Radio name="radio1" value="1"  onClick={this.clickSelPay.bind(this,paytype)}/>}
                              </CellFooter>
                          </FormCell>
                        )

                      })
                    }
                </Form>
            </div>
        )
    }

}
export default Page;
