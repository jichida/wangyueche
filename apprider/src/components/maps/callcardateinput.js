import React from 'react';

import 'iosselect/src/iosSelect.css';
import IosSelect from 'iosselect';
import moment from 'moment';
/*
value:当前日期
onChange:

今天／明天／后天(x月x日)
24小时／0点／1点.../23点
每10分钟，0/10/20/30/40/50
*/
const weekdays =['周日','周一','周二','周三','周四','周五','周六'];

let Callcardateinput = (props)=> {
  let cursel = props.value;
  if (typeof cursel === 'string') {
    cursel = new Date(Date.parse(cursel));
  }
  let today = moment().add(2, 'm');//设置2分钟后
  if(cursel < today){
    //重置
    let startminute = today.minute();//当前几点,向10取整
    startminute = Math.ceil(startminute/10)*10;
    cursel.minute(startminute);
  }
  const dataDay = (callback)=>{
    let tommorowday = moment().add(1, 'days');
    let next2day= moment().add(2, 'days');
    const data = [{
      id:today.format("YYYY-MM-DD"),
      value:'今天',
      parentId:'0'
    },{
      id:tommorowday.format("YYYY-MM-DD"),
      value:'明天',
      parentId:'0'
    },{
      id:next2day.format("YYYY-MM-DD"),
      value:next2day.format("MM月DD日") + weekdays[next2day.weekday()],
      parentId:'0'
    }];
    callback(data);
  };
  const dataHour = (day,callback)=>{
    let data = [];
    //let selday = moment(day,"YYYY-MM-DD");
    let starthour = 0;
    if(today.format("YYYY-MM-DD") === day){
      //选择的是今天
      starthour = today.hour();//当前几点
    }

    for(let i=starthour;i<24;i++){
        data.push({
          id:i<10?('0'+i):(i+''),
          value:i+'点',
          parentId:day
        });
    }
    callback(data);
  };

  const dataMinute= (day,hour,callback)=>{
    let data = [];
    let startminute = 0;
    if(today.format("YYYY-MM-DD HH") === (day+' '+hour)){
      //选择的是今天
      startminute = today.minute();//当前几点,向10取整
      startminute = Math.ceil(startminute/10)*10;
    }

    for(let i=startminute;i<60;i+=10){
        data.push({
          id:i<10?('0'+i):(i+''),
          value:i<10?('0'+i+'分'):(i+'分'),
          parentId:hour
        });
    }
    callback(data);
  };

  let setOption=(e)=>{
           new IosSelect(3,
              [dataDay, dataHour, dataMinute],
              {
                title: '预约时间选择',
                itemHeight: 35,
                relation: [1, 1, 0, 0],
                oneLevelId: cursel.format("YYYY-MM-DD"),
                twoLevelId: cursel.format("HH"),
                threeLevelId: cursel.format("mm"),
                callback: (selectOneObj, selectTwoObj, selectThreeObj)=> {
                  console.log("获取到时间:"+JSON.stringify(selectOneObj));
                  console.log("获取到时间:"+JSON.stringify(selectTwoObj));
                  console.log("获取到时间:"+JSON.stringify(selectThreeObj));

                      let seltimestring = `${selectOneObj.id} ${selectTwoObj.id}:${selectThreeObj.id}`;

                      console.log(`获取到时间:${seltimestring}`);

                      let selday = moment(seltimestring,"YYYY-MM-DD HH:mm");
                      props.onChange(selday);
                  }
              });
      };
  return (<span onClick={setOption}>
    {moment(cursel).format("MM月DD日 HH时mm分")}
    </span>);
}

export default Callcardateinput;
