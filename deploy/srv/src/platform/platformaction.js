let PubSub = require('pubsub-js');
let util = require('./util');

let postaction = (actionname,collectionname,doc)=>{
  let retdoc = doc;
  // if(actionname === 'save' || actionname === 'findByIdAndUpdate'){
  //   if(collectionname === 'baseinfocompany'){
  //     //转换doc
  //   }
  //
  // }

  PubSub.publish('platformmessage_upload',{
    action:actionname,//'findByIdAndUpdate',
    collectionname:collectionname,//'baseinfocompany',
    doc:retdoc
  });
}

exports.postaction = postaction;
