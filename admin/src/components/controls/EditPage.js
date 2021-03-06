import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import inflection from 'inflection';

import Title from 'admin-on-rest/lib/mui/layout/Title';
import { crudGetOne as crudGetOneAction, crudUpdate as crudUpdateAction } from 'admin-on-rest/lib/actions/dataActions';
import DefaultActions from 'admin-on-rest/lib/mui/detail/EditActions';
import translate from 'admin-on-rest/lib/i18n/translate';
import { ShowButton } from 'admin-on-rest/lib/mui/button';
/**
 * Turns a children data structure (either single child or array of children) into an array.
 * We can't use React.Children.toArray as it loses references.
 */
const arrayizeChildren = children => (Array.isArray(children) ? children : [children]);

export class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 0,
            record: props.data,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.updateData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({ record: nextProps.data }); // FIXME: erases user entry when fetch response arrives late
            if (this.fullRefresh) {
                this.fullRefresh = false;
                this.setState({ key: this.state.key + 1 });
            }
        }
        if (this.props.id !== nextProps.id) {
            this.updateData(nextProps.resource, nextProps.id);
        }
    }

    // FIXME Seems that the cloneElement in CrudRoute slices the children array, which makes this necessary to avoid rerenders
    shouldComponentUpdate(nextProps) {
        if (nextProps.isLoading !== this.props.isLoading) {
            return true;
        }

        const currentChildren = arrayizeChildren(this.props.children);
        const newChildren = arrayizeChildren(nextProps.children);

        return newChildren.every((child, index) => child === currentChildren[index]);
    }

    getBasePath() {
        const { location } = this.props;
        return location.pathname.split('/').slice(0, -1).join('/');
    }

    updateData(resource = this.props.resource, id = this.props.id) {
        this.props.crudGetOne(resource, id, this.getBasePath());
    }

    refresh = (event) => {
        event.stopPropagation();
        this.fullRefresh = true;
        this.updateData();
    }

    handleSubmit(record) {
        this.props.crudUpdate(this.props.resource, this.props.id, record, this.getBasePath());
    }

    render() {
        const { actions = <DefaultActions />, children, data, hasDelete, hasShow, id, isLoading, resource, title, translate } = this.props;
        const { key } = this.state;
        const basePath = this.getBasePath();

        const resourceName = translate(`resources.${resource}.name`, {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });
        const defaultTitle = translate('aor.page.edit', {
            name: `${resourceName}`,
            id,
            data,
        });

        return (
            <Card style={{ margin: '2em', opacity: isLoading ? 0.8 : 1 }} key={key}>
                <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
                    {<ShowButton basePath={basePath} record={data} />}
                </CardActions>
                {data && <CardTitle title={<Title title={title} record={data} defaultTitle={defaultTitle} />} />}
                {data && React.cloneElement(children, {
                    onSubmit: this.handleSubmit,
                    resource,
                    basePath,
                    record: data,
                })}
                {!data && <CardText>&nbsp;</CardText>}
            </Card>
        );
    }
}

Edit.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.element.isRequired,
    crudGetOne: PropTypes.func.isRequired,
    crudUpdate: PropTypes.func.isRequired,
    data: PropTypes.object,
    hasDelete: PropTypes.bool,
    hasShow: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func,
};

function mapStateToProps(state, props) {
    return {
        id: props.params.id,
        data: state.admin[props.resource].data[props.params.id],
        isLoading: state.admin.loading > 0,
    };
}

export default translate(connect(
    mapStateToProps,
    { crudGetOne: crudGetOneAction, crudUpdate: crudUpdateAction },
)(Edit));
