const uuid = require('uuid');
const crypto = require('crypto');
const Chance = require('chance');
const chance = new Chance();


let hashPassword =  (password, salt, callback)=> {
    // We use pbkdf2 to hash and iterate 10k times by default
    const iterations = 10000;
    const keyLen = 64; // 64 bit.
    console.log("password is :" + password);
   // password = new Buffer(password, 'binary');
    crypto.pbkdf2(password, salt, iterations, keyLen,'sha1', (err,result)=>{
      if(!err && result){
        callback(null,result.toString('hex'));
    }
    else{
        callback(err,null);
      }
    });
};

let getsalt = ()=>{
  return uuid.v4();
}

let checkPassword = (password,passwordsalt,checkedpassword,callback)=>{
  console.log(`checkPassword:${checkedpassword},passwordsalt:${passwordsalt}`);
  hashPassword(checkedpassword, passwordsalt, (err, passwordHash)=> {
    console.log(`passwordHash:${passwordHash},password:${password}`);
    if (passwordHash == password) {
      callback(null,true);
    }
    else{
      callback(null,false);
    }
  });
}
exports.hashPassword = hashPassword;
exports.getsalt = getsalt;
exports.checkPassword = checkPassword;
