// Get a directory listing via SFTP
// https://github.com/mscdex/ssh2
// https://github.com/jyu213/ssh2-sftp-client
const Client = require('ssh2-sftp-client');
const sftp = new Client();
const config = require('../config.js');

const sftptosrv = (localdir,localfilename,callback)=>{
  sftp.connect({
      host: 'vpn.czjcd.com',
      port: '22',
      username: 'wxq',
      password: '******'
  }).then(() => {
      console.log(`file:${localdir}/${localfilename}`);
      sftp.put(`${localdir}/${localfilename}`, `/tmp/${localfilename}`);
      // return sftp.list('/pathname');
  }).then(() => {
      sftp.rename(`/tmp/${localfilename}`, `/swapfiles/${localfilename}`);
  }).then(() => {
    callback(null,true);
  })
  .catch((err) => {
      callback(err,null);
      console.log(err, 'catch error');
  });
};

// sftptosrv('/Users/wangxiaoqing/Documents','70DBAC95C9C64C15863E66FD9A5A36D9.jpg',(err,result)=>{
//
// });

// example output:
// Client :: ready
// [ { filename: 'test.txt',
//     longname: '-rw-r--r--    1 frylock   frylock         12 Nov 18 11:05 test.txt',
//     attrs:
//      { size: 12,
//        uid: 1000,
//        gid: 1000,
//        mode: 33188,
//        atime: 1353254750,
//        mtime: 1353254744 } },
//   { filename: 'mydir',
//     longname: 'drwxr-xr-x    2 frylock   frylock       4096 Nov 18 15:03 mydir',
//     attrs:
//      { size: 1048576,
//        uid: 1000,
//        gid: 1000,
//        mode: 16877,
//        atime: 1353269007,
//        mtime: 1353269007 } } ]
