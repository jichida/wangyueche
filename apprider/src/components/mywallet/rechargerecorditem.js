/**
 * Created by wangxiaoqing on 2017/3/21.
 */
import React from 'react';
import WeUI from 'react-weui';
const {
    Cell,
    CellBody,
    CellFooter
} = WeUI;
import _ from 'lodash';
import moment from 'moment';

let Item =(props)=> {
  const {record} = props;
  let srctypename;
  if(record.srctype === 'order'){
    srctypename = _.get(record,'fromorder.triptype');
  }
  else if(record.srctype === 'pincheorderrefund'){
    srctypename = '拼车退款';
  }

  return (
    <Cell key={record._id}>
      <CellBody>
          <span className="time">{moment(record.created_at).format("YYYY-MM-DD HH:mm:ss")}</span>
          <span className="status">{srctypename}</span>
      </CellBody>
      <CellFooter>
          <span className="color_warning">{record.feebonus>0?"+":""}{record.feebonus}</span>
          <span className="">余额:{record.feenew}</span>
      </CellFooter>
  </Cell>
);
}

export default Item;
