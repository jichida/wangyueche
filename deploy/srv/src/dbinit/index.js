const mongoose = require('mongoose');
const _ = require('lodash');

const DBPlatformModels = require('../db/modelsplatform.js');
const DBModels = require('../db/models.js');
const city = require('../util/city.js');
const config = require('../config');


const createadmin = ()=>{
  const userModel = mongoose.model('UserAdmin', DBModels.UserAdminSchema);
  userModel.findOne({username: 'admin'}, (err, adminuser)=> {
        if(!err && !adminuser) {
            let passwordsalt = pwd.getsalt();
            pwd.hashPassword('admin',passwordsalt,(err,passwordhash)=>{
              if(!err){
            adminuser = {
              username:'admin',
                  passwordsalt,
                  passwordhash
            };
            let entity = new userModel(adminuser);
            entity.save((err)=> {
            });
        }
      });
    }
  });
};


const setconfigfile = ()=>{
    //设置运价信息

    const dbModel = DBModels.FareTypeModel;

    const id1 = mongoose.Types.ObjectId(config.faretypemap['快车']);
    const id2 = mongoose.Types.ObjectId(config.faretypemap['出租车']);
    const id3 = mongoose.Types.ObjectId(config.faretypemap['代驾']);

    dbModel.remove({_id:{'$nin':[id1,id2,id3]}},(err,result)=>{
      dbModel.findOneAndUpdate({_id:id1}, {$set:{registertype:'快车',_id:id1}},{new: true,upsert:true},(err,result)=>{
      });
      dbModel.findOneAndUpdate({_id:id2}, {$set:{registertype:'出租车',_id:id2}},{new: true,upsert:true},(err,result)=>{
      });
      dbModel.findOneAndUpdate({_id:id3}, {$set:{registertype:'代驾',_id:id3}},{new: true,upsert:true},(err,result)=>{
      });
    });


    // dbModel.find({},(err,list)=>{
    //   if(!err && !!list){
    //     let faretypemap = {};
    //     _.map(list,(record)=>{
    //       faretypemap[record.registertype] = record._id;
    //     });
    //     config.setfaretypemap(faretypemap);
    //   }
    // });

    const dbModelCompany = DBPlatformModels.Platform_baseInfoCompanyModel;
    dbModelCompany.findOneAndUpdate({},{$set:{CompanyId:config.CompanyId}},(err,result)=>{
    });
    //设置平台公司信息
    //setcompanyandaddress
};



const dbinit = ()=>{
  //test();
  city.initcitymap();
  createadmin();
  setconfigfile();
}

module.exports = dbinit;
