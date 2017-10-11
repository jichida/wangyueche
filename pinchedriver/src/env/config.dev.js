let localhost = true;
let config = {
    serverurl:localhost?'http://localhost:3004':'http://zn.com28.cn:3004',
    requesttimeout:5000,
    appversion:'1.0.0',
    sendlocationinterval:20000,
};

export default config;
