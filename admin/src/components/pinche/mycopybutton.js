import ImageEye from 'material-ui/svg-icons/image/remove-red-eye';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { copyrecord as copyrecordAction } from './mycopybuttonaction';
import FlatButton from 'material-ui/FlatButton';

const MyCopyButton = ({basePath = '', record = {}, label = '复制到明天',copyrecord}) => {
  let onClickCopy =()=>{
      let recordnew = {...record};
      if (typeof recordnew.startdate === 'string') {
          recordnew.startdate = new Date(Date.parse(recordnew.startdate));
      }
      recordnew.isenabled = false;
      recordnew.startdate.setDate(recordnew.startdate.getDate() + 1);
      copyrecord(recordnew);
  }
  return (<FlatButton
    onClick={onClickCopy}
    primary
    label={label}
    icon={<ImageEye />}
    style={{ overflow: 'inherit' }}
  />);
}

MyCopyButton.propTypes = {
    record: PropTypes.object,
    copyrecord: PropTypes.func,
};

export default connect(null, {
    copyrecord: copyrecordAction,
})(MyCopyButton);