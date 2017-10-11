import React from 'react';
import { connect } from 'react-redux';
import AddressBook from './AddressBook';
import {getcontactlist} from '../../../env/addressbook.js';
import {
  insertemerygencycontact_request,
  getphoneconcatlist
} from '../../../actions';
import NavBar from '../../tools/nav.js';
import "../../../../public/newcss/addressbook.css";
export class Page extends React.Component {

  componentWillMount () {
    getcontactlist((datas)=>{
      this.props.dispatch(getphoneconcatlist(datas));
    });
  }

  onClickAddressItem(name,tel){
    this.props.dispatch(insertemerygencycontact_request({
      name,
      tel
    }));
    this.props.history.goBack();
  }
  render() {

     return (
        <div className="seladdressbookPage appPage">
            <NavBar title="联系人列表" back={true} />
            <AddressBook gotoTelephoneABDetailHandler={this.onClickAddressItem.bind(this)} datas={this.props.datas} />
        </div>
      );
  }
}


const data = ({emerygencycontact:{phoneconcatlist:datas}}) => {
    return {datas};
}

export default connect(data)(Page);
