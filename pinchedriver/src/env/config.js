/**
 * Created by wangxiaoqing on 2017/3/27.
 */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./config.prod');
} else {
    module.exports = require('./config.dev');
}