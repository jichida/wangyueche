import React from 'react';

import AddressBookItem from './AddressBookItem';//联系人

class AddressBookGroup extends React.Component{
	render(){
		const {gotoTelephoneABDetailHandler,data} = this.props;//获取容器传递来的参数
		return (
			<div>
				<div className="item item-divider item-borderless">{data.key}</div>
				<div className="list-item">
				{
					data.datas.map((curData,index)=>{
						return <AddressBookItem key={ "adbitem"+index }
							name={curData.name}
							phone={curData.phone}
							gotoTelephoneABDetailHandler={gotoTelephoneABDetailHandler}
						/>						
					})
				}
				</div>
			</div>
		);
	}
}
export default AddressBookGroup;