import * as xview from './xview/Common';
import {jpushlistenInMessage,jpushpostNotification} from '../actions';

export const cancelJPushAlisa=()=>{
    try{
        console.log(`注销设置别名`);
        xview.cancelJPushAlisa();
    }
    catch(e){
      alert(`注销设置别名(cancelJPushAlisa)${JSON.stringify(e)}`);
    }

}

export const setJPushAlias = (name)=> {
    //设置jpush名字
    console.log(`设置别名${name}`);
    try{
         xview.jiGuangTuiSong(name);
     }
     catch(e){
       alert(`设置别名失败(setJPushAlias)
       ${JSON.stringify(e)}
       ${name}`);
     }
}

export const postNotifyFromJPush = (dispatch)=>{
    //未点击推送消息
    window.listenInMessage=(jsonstr)=>{
        let jsonobj = jsonstr;
        try{
            if(typeof jsonobj === 'string'){
                jsonobj = JSON.parse(jsonobj);
            }
            dispatch(jpushlistenInMessage(jsonobj));
        }
        catch(e){
          alert(`推送消息失败(postNotifyFromJPush)
          ${jsonstr}
          ${JSON.stringify(e)}`);
        }
        //alert(`listenInMessage==>\n${jsonstr}`);

    }
    //点击了推送消息
    window.postNotification=(jsonstr)=>{
        let jsonobj = jsonstr;
        try{
            if(typeof jsonobj === 'string'){
                jsonobj = JSON.parse(jsonobj);
            }
            dispatch(jpushpostNotification(jsonobj));
        }
        catch(e){
          alert(`推送消息失败(postNotification)
          ${jsonstr}
          ${JSON.stringify(e)}`);
        }
        //alert(`postNotification==>\n${jsonstr}`);

    }
}
