
let config =  {
  secretkey:'zongnanchuxingkey',
  listenport:process.env.listenport||3006,
  rooturl:process.env.rooturl || 'http://wangyueche.com28.cn',
  issmsdebug:process.env.issmsdebug || false,
  publishdirtest:'../../dist/test',
  publishdirrider:'../../dist/apprider',
  publishdirdriver:'../../dist/appdriver',
  publishdiradmin:'../../dist/admin',
  uploaddir:'../../dist/uploader',
  uploadurl:'/uploader',

  Companyld:'58a30c05061d53264c182029',
  Address:213000,

  expRequestMinutes:200,//2分钟之内
  maxAge:86400000,
  maxDistance:3,
  authexptime:120,//验证码有效期，2分钟
  loginuserexptime:60*60*24*30,//用户登录有效期,30天
  // 'mongodb://'+process.env.MONGO_PORT_27017_TCP_ADDR+':'+process.env.MONGO_PORT_27017_TCP_PORT+'/blog', function(err, db) {
    // ...
  mongodburl:process.env.MONGO_URL || `mongodb://localhost/zhongnandb`,
  defaultprofileimage:'newimg/17.png',
  faretypemap:{
       '快车':'001',
       '出租车':'002',
       '代驾':'003',
       '顺风车':'004',
       '专车':'005',
  }
};


config.setfaretypemap =  (faretypemap)=>{
  config.faretypemap = faretypemap;
  console.log(`setfaretypemap:${JSON.stringify(config.faretypemap )}`);
};

config.setcompanyandaddress =  (Companyld,Address)=>{
  config.Companyld = Companyld;
  config.Address = Address;
  console.log(`setcompanyandaddress:${Companyld},===>${Address}`);
};


module.exports = config;
