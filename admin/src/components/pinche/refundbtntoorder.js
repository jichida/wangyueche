/**
 * Created by eugenia on 14.01.17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';
import config from '../../env/config.js';

class RefundButton extends Component {
  handleRefund = () => {
      const { push, record, showNotification }= this.props;
      fetch(`${config.serverurl}/pincheorderrefund/${record.id}`, { method: 'POST', body: {} })
            .then(() => {
                showNotification('退款成功');
                push('/buscarpool');
            })
            .catch((e) => {
                console.error(e);
                showNotification('退款失败', 'warning')
            });
  }

  render() {
      const {record = {}, label = '退款'} = this.props;
      if(record.paystatus !== '已支付'){
        return null;
      }
      return (<FlatButton
        primary
        label={label}
        icon={<ContentCreate />}
        onClick={this.handleRefund}
        style={{overflow: 'inherit'}}
      />);
  }
}



RefundButton.propTypes = {
  record: PropTypes.object,
  push: PropTypes.func,
  showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction,
})(RefundButton);
