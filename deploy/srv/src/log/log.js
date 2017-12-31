var winston = require('winston');
var moment = require('moment');
var path = require('path');
const config = require('../config.js');
var logger;
exports.initLog =  ()=>{
  var filename = "zhongnan_"+moment().format('YYYY-MM-DD-HHmmss');

  var logfile = `${config.logdir}/${filename}.log`;
  var logpath = path.resolve(__dirname,'../', logfile);
  console.log(`logpath==>${logpath}`);

  var logfileerr = `${config.logdir}/${filename}_err.log`;
  var logpatherr = path.resolve(__dirname,'../', logfileerr);

  var logfilewarn = `${config.logdir}/${filename}_warn.log`;
  var logpathwarn = path.resolve(__dirname,'../', logfilewarn);

  // winston.configure({
  //   transports: [
  //     new (winston.transports.File)({ filename: logpath ,level: 'info'}),
  //     new (winston.transports.File)({  filename: logfileerr, level: 'error'  }),
  //   ]
  // });

    logger = new (winston.Logger)({
      transports: [
        new (winston.transports.File)({
          name: 'info-file',
          filename: logpath ,
          level: 'info'
        }),
        new (winston.transports.File)({
          name: 'error-file',
          filename: logpatherr,
          level: 'error'
        }),
        new (winston.transports.File)({
          name: 'warn-file',
          filename: logpathwarn,
          level: 'warn'
        }),
      ]
  });
};

exports.getlog = ()=>{
   return logger;
}
