import React from 'react'
import WeUI from 'react-weui';
import DatePicker from 'react-mobile-datepicker';

const {
    FormCell,
    CellHeader,
    CellFooter,
    Input,
    Label,
  } = WeUI;

import moment from 'moment';

class renderDateField extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isdateopen : false,
        }
    }
    setDateopen =(v)=>{
        this.setState({isdateopen : v});
    }

    render(){
        const { input, label} = this.props;


        console.log("input value"+input.value);


        let handleClick1 =()=>{
            this.setDateopen(true);
        }
        let handleSelect1=(time)=>{
            input.onChange(moment(time).format('YYYY-MM-DD'));
            this.setDateopen(false);
        };
        let handleCancel1=()=>{
            this.setDateopen(false);
        }
        return (
            <FormCell>
                <CellHeader>
                    <Label>
                        <span>{label}</span>
                    </Label>
                </CellHeader>
                <CellFooter>
                    <input type="hidden" {...input} />
                    <span style={{color:"#333"}} onClick={handleClick1}>{input.value}</span>
                </CellFooter>
                <DatePicker
                    value={new Date(input.value)}
                    isOpen={this.state.isdateopen} 
                    onSelect={handleSelect1}
                    onCancel={handleCancel1}
                    dateFormat={['YYYY', 'MM', 'DD']}
                    theme="ios"
                />

            </FormCell>

        )
    }
}


export {renderDateField};
