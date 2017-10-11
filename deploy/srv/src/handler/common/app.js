let DBModels = require('../../db/models.js');
let winston = require('../../log/log.js');
const city = require('../../util/city.js');

exports.getsystemconfig = (socket,actiondata,ctx)=>{
    let order = actiondata;
    let dbModel = DBModels.SystemConfigModel;
    dbModel.findOne({},(err,systemconfig)=>{
        if(!err && !!systemconfig){
            let payload = {};
            if(ctx.usertype === 'rider'){
                payload = {
                    commenttagsfordriver:systemconfig.commenttagsfordriver,
                    maxshowtags:systemconfig.maxshowtags,
                    servicephonenumber:systemconfig.servicephonenumber,
                    hotcity:city.gethotcitys(systemconfig.hotcity),
                    pinchecitylist:systemconfig.pinchecitylist,
                    daijialeastbalance:systemconfig.daijialeastbalance,
                    daijiacancelprice:systemconfig.daijiacancelprice,
                };
            }
            else if(ctx.usertype === 'driver'){
                payload = {
                    commenttagsforrider:systemconfig.commenttagsforrider,
                    maxshowtags:systemconfig.maxshowtags,
                    servicephonenumber:systemconfig.servicephonenumber
                };
            }

            socket.emit('getsystemconfig_result',payload);
        }
        else{
            socket.emit('common_err',{errmsg:`请联系管理员设置后台系统设置信息！`,type:'getsystemconfig'});
            winston.getlog().error(`请联系管理员设置后台系统设置信息！`);
        }

    });
}
