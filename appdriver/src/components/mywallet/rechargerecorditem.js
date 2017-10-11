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
  else{
    if(_.startsWith(record.srctype,'withdrawcash')){
      srctypename = '提现申请';
      let typemap = {
        'withdrawcash':'提现申请',
        'withdrawcash_ing':'提现中',
        'withdrawcash_ed':'提现成功',
        'withdrawcash_denied':'提现失败',
      };
      if(!!typemap[record.srctype]){
        srctypename = typemap[record.srctype];
      }
    }
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
  </Cell>);
}

export default Item;
