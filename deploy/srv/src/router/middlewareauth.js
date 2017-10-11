const jwt = require('jsonwebtoken');
const config = require('../config.js');


let middlewareauth = (req,res,next)=>{
  console.log("in middlewareauth");
  console.log("req.path:" + req.path);

    let token = req.headers['authorization'];
    if (!token) {
      res.sendStatus(401);
      res.end();
      console.log("no token===>");
    } else {
        try {
            let decodeduser = jwt.verify(token.replace('Bearer ', ''), config.secretkey);
            console.log("===>" + JSON.stringify(decodeduser));
            req.userid = decodeduser._id;
            next();
        } catch (e) {
            res.sendStatus(401);
            res.end();
            console.log("invalied token===>");
        }
    }

};


module.exports=middlewareauth;
