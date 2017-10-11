const util = require('./alipaynodeutil');
let winston = require('../log/log.js');
exports.notify_alipay = (fn)=> {
    return function (req, res, next) {
        console.log('--支付宝回调数据来了--');
        console.dir(req.body);
        winston.getlog().warn(`支付宝回调数据来了`);
 
        var _this = this;
        res.success = function () {
            res.end('success');
        };
        res.fail = function () {
            res.end('fail');
        };

        let msg = req.body;                
        let msgstring = JSON.stringify(msg);
        winston.getlog().warn(`接收到支付宝回调:${msgstring}`);
        fn.apply(_this, [msg, req, res, next]);

    };
};

exports.notifywexin = (fn)=>{
	return function(req, res, next){
        console.log('--微信回调数据来了--');
        console.dir(req.body);
        winston.getlog().warn(`微信回调数据来了`);
        

		var _this = this;
		res.success = function(){ res.end(util.buildXML({ xml:{ return_code:'SUCCESS' } })); };
		res.fail = function(){ res.end(util.buildXML({ xml:{ return_code:'FAIL' } })); };

		util.pipe(req, function(err, data){
			var xml = data.toString('utf8');
			util.parseXML(xml, function(err, msg){
				req.wxmessage = msg;
                let msgstring = JSON.stringify(msg);
                winston.getlog().warn(`接收到微信回调:${msgstring}`);
                console.log(`接收到微信回调:${msgstring}`);
				fn.apply(_this, [msg, req, res, next]);
			});
		});
	};
};