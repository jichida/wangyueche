import React from 'react';
import {
  Group,
  List,
} from 'amazeui-touch';

const Payway = ({cursel='alipay',onChange}) => {
    let paywaysz = [
        {
            name:'alipay',
            title:'支付宝',
            imgco:<img width="32" src="images/zfbicon.png" alt='zfb'/>
        },
        {
            name:'weixin',
            title:'微信支付',
            imgco:<img width="32" src="images/wxicon.png"  alt='wx'/>
        },
        {
            name:'yinlian',
            title:'银联支付',
            imgco:<img width="32" src="images/ylicon.png"  alt='gyl'/>
        }
    ];

    const imgcheckon = <img width="22" src="images/c_checkbox_on2.png"  alt='c_checkbox_on2'/>;
    let listitems = [];
    paywaysz.forEach((item)=>{
        if(item.name === cursel){
                listitems.push(<List.Item key={item.name} media={item.imgco}  title={item.title} after={imgcheckon}  onClick={()=>{
                onChange(item.name);
            }}/>);
        }
        else{
            listitems.push(<List.Item key={item.name} media={item.imgco}  title={item.title} onClick={()=>{
                onChange(item.name);
            }}/>);
        }
    });
    return (
        <Group header="请选择支付方式" noPadded className="margin-top-0">
            <List>
                {listitems}
            </List>
        </Group>
    );
}



export default Payway;
