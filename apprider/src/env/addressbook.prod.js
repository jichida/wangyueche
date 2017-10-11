import * as Common from './xview/Common';
import * as MakePy from './xview/MakePy';

const initSZM =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
let softDatas =(datas)=>{
  let resultDatas=[];
  //初始化数据格式
  let zm=initSZM;
  let zmAry=zm.split("");
  for(let i=0;i<zmAry.length;i++){
    let firstLetter=zmAry[i];
    resultDatas.push({key:firstLetter,datas:[]});
  }

  //按照字母顺序排序
  for(let i=0;i<datas.length;i++){
    let curData=datas[i];
    try{
      let szm=MakePy.makePy(curData.name);
      curData['letter']=szm[0];//先将字母保存起来
      let firstLetter=curData.letter.substring(0,1);
      let aryIndex=initSZM.indexOf(firstLetter);
      resultDatas[aryIndex].datas.push(curData);
    }catch(e){
      //如果报错就是莫名首字母，放到最后一个数组里面
      resultDatas[resultDatas.length-1].datas.push(curData);
    }
  }
  return resultDatas;
}


export const getcontactlist = (funcb)=>{
    try{
        Common.getPhoneBook((json)=>{
          if(typeof json=='string'){
            json=JSON.parse(json);
          }
          if(json.directories.length>0){
            let datas=softDatas(json.directories);
            funcb(datas);
          }else{
            funcb([]);
          }
        });
      }catch(e){
        funcb([]);
  }
}
