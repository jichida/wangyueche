let islocalhost = false;
let config = {
    serverurl:islocalhost?'http://localhost:3004':'http://zn.com28.cn:3004',
    requesttimeout:5000,
    intervalrequestnearbydriver:4000
};

export default config;
