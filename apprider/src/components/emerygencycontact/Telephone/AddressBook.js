import React from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const { SearchBar } = WeUI;

import AddressBookGroup from './AddressBookGroup';//通讯录分组

class AddressBook extends React.Component{

	constructor(props) {
		super(props);
		this.state={source:[]};
	}
	componentWillReceiveProps (nextProps) {
		this.setState({source:nextProps.datas});
	}
	searchBook(value){
		if(value===""){
			this.setState({source:this.props.datas});
		}else{
			//匹配值
			let newSource=[];
			if(this.props.datas.length>0){
				for(let i=0;i<this.props.datas.length;i++){
					let curData=this.props.datas[i];
					let tmpData={key:curData.key,datas:[]};
					for(let j=0;j<curData.datas.length;j++){
						let curName=curData.datas[j];
						if(curName.name.indexOf(value)!==-1){
							tmpData.datas.push(curName);
						}
					}
					newSource.push(tmpData);
				}
			}
			this.setState({source:newSource});
		}
	}
	componentWillMount () {
		this.setState({source:this.props.datas});
	}
	render(){
		let {gotoTelephoneABDetailHandler} = this.props;//获取容器传递来的参数
		return (
			<div className="addressbookPage">
				<div className="searchContent">

                    <SearchBar
                        onChange={ this.searchBook.bind(this) } 
                        placeholder="请输入地址关键字"
                        lang={{
                            cancel: '取消'
                        }}
                        value={this.props.searchtxt}
                    />
                </div>
				<div className="list">

					{
						this.state.source.map((curData,index)=>{
							if(curData.datas.length>0){
								return <AddressBookGroup key={ "adbook"+index }
										data={curData}
										gotoTelephoneABDetailHandler={gotoTelephoneABDetailHandler}
									/>
							}
							return null;
						})
					}
				</div>
			</div>
		);
	}
}
export default AddressBook;
