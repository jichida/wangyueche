import React from 'react';

class AddressBookItem extends React.Component{
	render(){
		const {name,phone,gotoTelephoneABDetailHandler} = this.props;//获取容器或组件传递来的参数
		return (
			<a className="item" onClick={ () => {gotoTelephoneABDetailHandler(name,phone)} } >{name}</a>
		);
	}
}

export default AddressBookItem;