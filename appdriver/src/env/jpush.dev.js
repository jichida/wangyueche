import {jpushlistenInMessage,jpushpostNotification} from '../actions';


export const cancelJPushAlisa=()=>{
  console.log(`取消设置别名cancelJPushAlisa`);
}

export const setJPushAlias = (name)=> {
    //设置jpush名字
    console.log(`设置别名${name}`);
}

export const postNotifyFromJPush = (dispatch)=>{
    document.onkeydown=function(event){
       var e = event || window.event ;
       //alert(e.keyCode);
       if(e && e.keyCode==='['){ // 按 1,模拟发送（未点击推送消息）
           //要做的事情
           let jsonobj = {
                "_j_business" : 1,
                "_j_msgid" : 9007199333820836,
                "_j_uid" : 9531568921,
                aps :{
                    alert : "这是一条系统消息Thu Apr 13 2017",
                    badge : 1,
                    sound : 'default',
                },
                _id: "58ef0fe8ca2f4004d94da838"
            };
            let jsonstring = JSON.stringify(jsonobj);
            window.listenInMessage(jsonstring);
        }
        if(e && e.keyCode===']'){ // 按 2，模拟发送（点击了推送消息）
             //要做的事情
             let jsonobj = {
                  "_j_business" : 1,
                  "_j_msgid" : 9007199333820836,
                  "_j_uid" : 9531568921,
                  aps :{
                      alert : "这是一条系统消息Thu Apr 13 2017",
                      badge : 1,
                      sound : 'default',
                  },
                  _id: "58ef0fe8ca2f4004d94da838"
              };
              let jsonstring = JSON.stringify(jsonobj);
              window.postNotification(jsonstring);
        }
        if(e && e.keyCode==='='){ // 按 3，模拟发送手机安卓键
            //要做的事情
            window.webBack();
       }
    }
    //未点击推送消息
    window.listenInMessage=(jsonstr)=>{
        let jsonobj = jsonstr;
        try{
            if(typeof jsonobj === 'string'){
                jsonobj = JSON.parse(jsonobj);
            }
        }
        catch(e){

        }
        dispatch(jpushlistenInMessage(jsonobj));
    }
    //点击了推送消息
    window.postNotification=(jsonstr)=>{
        let jsonobj = jsonstr;
        try{
            if(typeof jsonobj === 'string'){
                jsonobj = JSON.parse(jsonobj);
            }
        }
        catch(e){

        }
        dispatch(jpushpostNotification(jsonobj));
    }
}
