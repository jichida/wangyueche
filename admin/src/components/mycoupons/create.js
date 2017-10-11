import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardTitle } from 'material-ui/Card';
import compose from 'recompose/compose';
import inflection from 'inflection';
import { CardActions } from 'material-ui/Card';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';
import config from '../../env/config.js';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const CreateActions = ({ basePath }) => (
    <CardActions style={cardActionStyle}>
        <ListButton basePath={basePath} />
    </CardActions>
);
import { ListButton,ViewTitle,Title,DefaultActions,crudCreate as crudCreateAction ,translate} from 'admin-on-rest';

class Create extends Component {

    handleSubmit = (record) =>{
      console.log(`新建一条记录:${JSON.stringify(record)}`);
      const { push, showNotification }= this.props;
      fetch(`${config.serverurl}/createmycouponsbatch`, {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(record) })
            .then(() => {
                showNotification('批量新建优惠券成功');
                push('/mycoupon');
            })
            .catch((e) => {
                console.error(e);
                showNotification('批量新建优惠券失败', 'warning')
            });
    }

    render() {
       const { children, isLoading, resource, title, translate } = this.props;
       const basePath = `/mycoupon`;
       const actions = <CreateActions basePath={basePath}/>;
      //  const resourceName = `批量发送优惠券`;
        const defaultTitle = `批量优惠券`;
        const titleElement = <Title title={title} defaultTitle={defaultTitle} />;
          return (
            <div className="create-page">
                <Card style={{ opacity: isLoading ? 0.8 : 1 }}>
                  {actions && React.cloneElement(actions, {
                          basePath,
                          resource,
                      })}
                    <ViewTitle title={titleElement} />
                    {React.cloneElement(children, {
                        onSubmit: this.handleSubmit,
                        resource,
                        basePath,
                        record: {},
                        translate,
                    })}
                </Card>
            </div>
        );
    }
}

Create.propTypes = {
    push: PropTypes.func,
    showNotification: PropTypes.func,
    actions: PropTypes.element,
    children: PropTypes.element,
    crudCreate: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func.isRequired,
};

Create.defaultProps = {
    data: {},
};

function mapStateToProps(state) {
    return {
        resource:'mycouponsbatch',
        isLoading: state.admin.loading > 0,
    };
}

const enhance = compose(
    connect(
        mapStateToProps,
        {
          crudCreate: crudCreateAction,
          showNotification: showNotificationAction,
          push: pushAction,
        },
    ),
    translate,
);

export default enhance(Create);
