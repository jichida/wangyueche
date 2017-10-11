let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
const config = require('../config.js');
const _  = require('lodash');
const jwt = require('jsonwebtoken');
const moment  = require('moment');
let dbs = require('../db/index.js');
let middlewareauth = require('./middlewareauth.js');
const platformaction = require('./action.js');
const preaction = platformaction.preaction;
const postaction = platformaction.postaction;

let startmodule = (app)=>{

const GET_LIST = 'GET_LIST';
const GET_ONE = 'GET_ONE';
const GET_MANY = 'GET_MANY';
const GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

// let defaultmiddlewareauth = (req,res,next)=>{
//   next();
// };
app.post('/adminapi/adminauth',(req,res)=>{
  let actiondata =   req.body;
  console.log("actiondata=>" + JSON.stringify(actiondata));
  let userModel = mongoose.model('UserAdmin', DBModels.UserAdminSchema);
  let passwordhashed = actiondata.password;
  userModel.findOneAndUpdate({username:actiondata.username,password:passwordhashed},{updated_at:new Date()},
  {new: true},(err,userEntity)=>{
    console.log("userEntity err:" + JSON.stringify(err));
    console.log("userEntity:" + JSON.stringify(userEntity));
    if(!err && userEntity){
      //logined
      let token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) +config.loginuserexptime,
            _id:userEntity._id,
            usertype:'admin',
          },config.secretkey, {});
      res.status(200).json({
        loginsuccess:true,
        token:token
      });
      // socket.emit('action', {type:'loginpage_setobj', data:{
      //     submitting:false,
      //     loginsuccess:true,
      //     token:token
      // }});
      // socket.emit('action', {type:'apppage_setobj', data:{
      //     showpop:true,
      //     popmessage:'登录成功'
      // }});
    }
    else{
      res.status(200).json({
        loginsuccess:false,
      });
      // socket.emit('action',{type:'loginpage_submitting',data:false});
      // socket.emit('action', {type:'apppage_setobj', data:{
      //   showpop:true,
      //   popmessage:'登录失败'
      // }});
    }
  });//end userModel.findOneAndUpdate
});

for(let keyname in dbs){
    let schmodel = dbs[keyname];
    let urlname = '/adminapi' + schmodel.urlname;
    app.post(urlname,middlewareauth,(req,res)=>{
      let queryparam = req.body;
      console.log("queryparam=>" + JSON.stringify(queryparam));

      let query = {};
      let sort = {};
      let options = {};
      if(queryparam.params.hasOwnProperty('sort')){
        sort[queryparam.params.sort.field] = queryparam.params.sort.order==="DESC"?-1:1;
        options.sort = sort;
      }
      if(queryparam.params.hasOwnProperty('pagination')){
        options['page'] = queryparam.params.pagination.page;
        if (typeof options['page'] === 'string') {
          options['page'] = parseInt(options['page']);
        }
        options['limit'] = queryparam.params.pagination.perPage;
        if (typeof options['limit'] === 'string') {
          options['limit'] = parseInt(options['limit']);
        }
      }
      if(queryparam.params.hasOwnProperty('filter')){
        let querypre = queryparam.params.filter;
        query = {};
        _.map(querypre,(value,key)=>{
          let keysz = key.split('_');
          if(keysz.length === 2){
            if(keysz[1]=== 'q'){
              query[keysz[0]] = new RegExp(value);
            }
          }
          else{
            query[key] = value;
          }
        });

      }
      console.log("query=>" + JSON.stringify(query));
      console.log("options=>" + JSON.stringify(options));
      let actionname = '';
      let preupdateddata = {};
      if(queryparam.type === GET_LIST){
        preupdateddata = {query, options};
        actionname = 'paginate';
      }
      else if(queryparam.type === GET_ONE){
        preupdateddata = {query:{_id:mongoose.Types.ObjectId(queryparam.params.id)}};
        actionname = 'findById';
      }
      else if(queryparam.type === GET_MANY){
        let ids = queryparam.params.ids;
        _.remove(ids,(item)=>{
          return item === 'undefined';
        });
        preupdateddata = {query:{ _id: { "$in" : ids} }};
        actionname = 'paginate';
      }
      else if(queryparam.type === GET_MANY_REFERENCE){
            query = {};
            let targetid = queryparam.params.id;
            if(typeof targetid === "string"){
              targetid = mongoose.Types.ObjectId(targetid);
            }
            query[queryparam.params.target] = targetid;
            preupdateddata = {query, options};
            actionname = 'paginate';
      }
      else if(queryparam.type === CREATE){
        preupdateddata = {data:queryparam.params.data};
        actionname = 'save';
      }
      else if(queryparam.type === UPDATE){
        preupdateddata = {
          query:{_id:mongoose.Types.ObjectId(queryparam.params.id)},
          data:queryparam.params.data
        };
        actionname = 'findByIdAndUpdate';
      }
      else if(queryparam.type === DELETE){
        preupdateddata = {data:queryparam.params.data};
        actionname = 'findOneAndRemove';
      }

      //<==============================================
      preaction(actionname,schmodel.collectionname,preupdateddata,(err,result)=>{
         console.log("需要更新的数据=>" + JSON.stringify(preupdateddata));

        if(queryparam.type === GET_LIST){
          let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
          dbModel.paginate(preupdateddata.query, preupdateddata.options,(err,result)=>{

            postaction(actionname,schmodel.collectionname,result,(err,resultnew)=>{
                console.log("GET_LIST result=>" + JSON.stringify(result));
                res.status(200).json(result);
            });

          });
        }
        else if(queryparam.type === GET_ONE){
          let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
          dbModel.findById(preupdateddata.query._id,(err,result)=>{
            result = result.toJSON();
            postaction(actionname,schmodel.collectionname,result,(err,resultnew)=>{
                console.log("GET_ONE result=>" + JSON.stringify(result));
                res.status(200).json(result);
            });
          });
        }
        else if(queryparam.type === GET_MANY){
          //"params":{"ids":["58e71be6ef4e8d02eca6e0e8","58eaecea130f4809a747d2f8"]}}
          //{ data: {Record[]} }//remove 'undefined'
          let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
          dbModel.paginate(preupdateddata.query, preupdateddata.options,(err,result)=>{

            postaction(actionname,schmodel.collectionname,result,(err,resultnew)=>{
                console.log("GET_MANY result=>" + JSON.stringify(result));
                res.status(200).json(result);
            });
          });
        }
        else if(queryparam.type === GET_MANY_REFERENCE){
          console.log("GET_MANY_REFERENCE 查询条件=>" + JSON.stringify(query));
          let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
          dbModel.paginate(preupdateddata.query, preupdateddata.options,(err,result)=>{

            postaction(actionname,schmodel.collectionname,result,(err,resultnew)=>{
                console.log("GET_MANY_REFERENCE result=>" + JSON.stringify(result));
                res.status(200).json(result);
            });
          });
        }
        else if(queryparam.type === CREATE){
          let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
          let entity = new dbModel(preupdateddata.data);
          entity.save((err,result)=>{

            postaction(actionname,schmodel.collectionname,result,(err,resultnew)=>{
                console.log("CREATE result=>" + JSON.stringify(result));
                res.status(200).json(result);
            });
          });
        }
        else if(queryparam.type === UPDATE){
          let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
          dbModel.findByIdAndUpdate(preupdateddata.query._id,preupdateddata.data, {new: true},(err, result)=> {
              console.log("==>UPDATE err=>" + JSON.stringify(err));
              console.log("==>UPDATE result=>" + JSON.stringify(result));
             postaction(actionname,schmodel.collectionname,result,(err,resultnew)=>{
                 console.log("UPDATE result=>" + JSON.stringify(result));
                 res.status(200).json(result);
             });
          });

        }
        else if(queryparam.type === DELETE){
          let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
          dbModel.findOneAndRemove(preupdateddata.query, (err, result)=> {

              postaction(actionname,schmodel.collectionname,result,(err,resultnew)=>{
                  console.log("DELETE result=>" + JSON.stringify(result));
                  res.status(200).json(result);
              });
            });
        }
      });
    });

  }
};

module.exports=  startmodule;
