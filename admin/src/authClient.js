import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR,AUTH_GET_PERMISSIONS } from 'admin-on-rest';
import {apipost} from './util/util.js';
import decodeJwt from 'jwt-decode';
import config from './env/config.js';
export default (type, params) => {
    if (type === AUTH_LOGIN) {
      const checkauth = ()=>{
        return new Promise((resolve,reject)=>{
           apipost(config.adminauthserverurl,params).then(response => {
                if (response.status < 200 || response.status >= 300) {
                      // throw new Error(response.statusText);
                      reject('网络未连接');
                }
                return response.data;
            })
            .then(({ loginsuccess,token }) => {
                console.log(`loginsuccess:${loginsuccess},token:${token}`);
                if(loginsuccess){
                    localStorage.setItem('admintoken', token);
                    const decodedToken = decodeJwt(token);
                    localStorage.setItem('usertype', decodedToken.usertype);
                }
                else{
                    localStorage.removeItem('admintoken');
                    localStorage.removeItem('usertype');
                      reject('用户名或密码错误');
                      return;
                }
                  resolve();
            });
        });
      };

      return checkauth();
    }
    if (type === AUTH_ERROR) {
         return Promise.resolve();
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('admintoken');
        localStorage.removeItem('usertype');
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('admintoken') ? Promise.resolve() : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('usertype');
        return Promise.resolve(role);
    }
    return Promise.reject('Unkown method');
};
