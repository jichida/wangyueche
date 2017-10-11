import React from 'react';
import { Route } from 'react-router-dom';
import Configuration from './configuration/Configuration';
import MycouponbatchCreate from './components/mycoupons/createbatch.js';

export default [
    <Route exact path="/createbatch" component={MycouponbatchCreate} />,
];
