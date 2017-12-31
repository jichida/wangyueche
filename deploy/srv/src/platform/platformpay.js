let PubSub = require('pubsub-js');

const notifyplatform_orderpaied = (order)=>{
  //通知平台插入
  PubSub.publish('Platformmsgs', {
      action:'Insert',
      type:'Platform_operatePay',
      payload:{triporder:order}
  });

}

exports.notifyplatform_orderpaied = notifyplatform_orderpaied;
