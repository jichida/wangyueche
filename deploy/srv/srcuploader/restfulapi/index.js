require('es6-promise').polyfill();
require('isomorphic-fetch');

const config = require('../config.js');
// const map = require('lodash.map');

const fetchurl =`${config.platformserverurl}`;

console.log(`url-->${fetchurl}`);

const statusHelper = (response)=> {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const uploadtoplatform = (IPCType,uri,data)=>{
    let postdata = {
      Source:'0',
      CompanyId:config.CompanyId,
      IPCType,
    };
    postdata[IPCType] = data;
    console.log(`postdata-->${JSON.stringify(postdata)}`);
    
    return fetch(`${fetchurl}${uri}`, {
      method  : 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      body    : JSON.stringify(postdata)
    })
    .then(statusHelper)
    .then(response => response.json());
}

module.exports = uploadtoplatform;
//
// const restfulapi = {
//   baseInfoCompany (userData) {
//     return fetch(`${fetchurl}/baseinfo/company`, {
//       method  : 'POST',
//       headers : {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json'
//       },
//       body    : JSON.stringify(userData)
//     })
//     .then(statusHelper)
//     .then(response => response.json());
//   },
//   baseInfoCompanyStat (userData) {
//     return fetch(`${fetchurl}/baseinfo/companystat`, {
//       method  : 'POST',
//       headers : {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json'
//       },
//       body    : JSON.stringify(userData)
//     })
//     .then(statusHelper)
//     .then(response => response.json());
//   },
//   baseInfoCompanyPay (userData) {
//     return fetch(`${fetchurl}/baseinfo/companypay`, {
//       method  : 'POST',
//       headers : {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json'
//       },
//       body    : JSON.stringify(userData)
//     })
//     .then(statusHelper)
//     .then(response => response.json());
//   },
//   baseInfoCompanyService (userData) {
//     return fetch(`${fetchurl}/baseinfo/companyservice`, {
//       method  : 'POST',
//       headers : {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json'
//       },
//       body    : JSON.stringify(userData)
//     })
//     .then(statusHelper)
//     .then(response => response.json());
//   },
//   baseInfoCompanyPermit (userData) {
//     return fetch(`${fetchurl}/baseinfo/companypermit`, {
//       method  : 'POST',
//       headers : {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json'
//       },
//       body    : JSON.stringify(userData)
//     })
//     .then(statusHelper)
//     .then(response => response.json());
//   },
//   baseInfoCompanyFare (userData) {
//     return fetch(`${fetchurl}/baseinfo/companyfare`, {
//       method  : 'POST',
//       headers : {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json'
//       },
//       body    : JSON.stringify(userData)
//     })
//     .then(statusHelper)
//     .then(response => response.json());
//   },
//   baseInfoVehicle (userData) {
//     return fetch(`${fetchurl}/baseinfo/vehicle`, {
//       method  : 'POST',
//       headers : {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json'
//       },
//       body    : JSON.stringify(userData)
//     })
//     .then(statusHelper)
//     .then(response => response.json());
//   },
//   baseInfoVehicle (userData) {
//     return fetch(`${fetchurl}/baseinfo/vehicle`, {
//       method  : 'POST',
//       headers : {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json'
//       },
//       body    : JSON.stringify(userData)
//     })
//     .then(statusHelper)
//     .then(response => response.json());
//   },
//   baseInfoVehiclelnsurance (userData) {
//     return fetch(`${fetchurl}/baseinfo/vehicleinsurance`, {
//       method  : 'POST',
//       headers : {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json'
//       },
//       body    : JSON.stringify(userData)
//     })
//     .then(statusHelper)
//     .then(response => response.json());
//   },
//   baseInfoVehiclelnsurance (userData) {
//     return fetch(`${fetchurl}/baseinfo/vehicleinsurance`, {
//       method  : 'POST',
//       headers : {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json'
//       },
//       body    : JSON.stringify(userData)
//     })
//     .then(statusHelper)
//     .then(response => response.json());
//   },
// };
