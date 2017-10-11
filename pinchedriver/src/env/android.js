/**
 * Created by wangxiaoqing on 2017/5/27.
 */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./android.prod');//暂时调试
} else {
    module.exports = require('./android.dev');
}
