/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import * as xview from './xview/Common';

let locationsz =[0,0];

export const getcurrentlocationfn = (fncallback)=> {

        try{
            xview.geographyLocationCallbackMethod((data)=>{
                //alert(JSON.stringify(data));
                if(typeof data=='string'){
                  data=JSON.parse(data);
                }
                if(!!data.longitude){
                  data.longitude = parseFloat(data.longitude);
                }
                if(!!data.latitude){
                  data.latitude = parseFloat(data.latitude);
                }
                locationsz = [data.longitude,data.latitude];
                fncallback(locationsz);
            })
        }catch(e){
          window.alert(`获取地理位置失败(getcurrentlocationfn)
          ${JSON.stringify(e)}`);
            fncallback(locationsz);
        }

}
