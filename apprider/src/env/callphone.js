/**
 * Created by wangxiaoqing on 2017/3/27.
 */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./callphone.prod');
} else {
    module.exports = require('./callphone.dev');
}
