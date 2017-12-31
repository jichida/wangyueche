/* eslint jsx-a11y/anchor-has-content: off */
import React, { Component,cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {findOneAction} from './action';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';

class Page extends Component {

    componentWillMount() {
      const {dispatch,resource} = this.props;
      findOneAction({resource},dispatch);
    }

    renderCreate =()=>{
      const {isLoading,Create,...rest} = this.props;
      return (<Create actions={null} {...rest} hasShow={false} hasEdit={false} isLoading={isLoading} />);
    }

    renderEdit =()=>{
        const {record,isLoading,Edit,resource,location,...rest} = this.props;
        const defaultProps = {
          data: {...record,id:record._id},
          hasDelete: false,
          id: record._id,
          isLoading: false,
          location: { pathname: `${resource}/${record._id}` },
          params: {id: record._id},
          match:{params: {id: record._id}},
          resource:resource
      };
      return (<Edit {...defaultProps} />);
      // return cloneElement(Edit, {
      //   ...defaultProps});
    }

    render() {
        console.log(this.props);
        const {isLoading,isget,record} = this.props;
        if(isLoading){
          //等待图标
          return <CircularProgress size={60} thickness={7} />;
        }
        if(!isget){
          return this.renderCreate();
        }

        return this.renderEdit();
    }
}


const mapStateToProps = ({singledocumentpage},props) => {
  const {mapdata} = singledocumentpage;
  let dataobj = _.get(mapdata,props.resource,{
    isLoading:true,
    isget:false,
    record:{}
  });
  console.log(`${props.resource}==>${JSON.stringify(dataobj)}`)
  return {...dataobj};
};


Page = connect(mapStateToProps)(Page);
export default Page;
