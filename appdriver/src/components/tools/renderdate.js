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
            time : new Date()
        }
    }
    setDateopen =(v)=>{
        this.setState({isdateopen : v});
    }

    handleClick1 =()=>{
        this.setDateopen(true);
    }
    handleSelect1=(time)=>{
        console.log(this.state.time);
        // input.onChange(moment(time).format('YYYY-MM-DD'));
        this.setState({
            time,
            isdateopen : false
        })
    };
    handleCancel1=()=>{
        this.setDateopen(false);
    }

    render(){
        const { input, label } = this.props;
        const newinput = { ...input, value:moment(this.state.time).format('YYYY-MM-DD') }

        return (
            <FormCell className="renderDateField">
                <CellHeader>
                    <Label>
                        <span>{label}</span>
                    </Label>
                </CellHeader>
                <CellFooter>
                    <Input
                        value={moment(this.state.time).format('YYYY-MM-DD')}
                        onClick={this.handleClick1}
                        style={{textAlign:"right",width: "100%", flexGrow:"1"}}
                        />
                </CellFooter>
                <DatePicker
                    value={this.state.time}
                    isOpen={this.state.isdateopen}
                    onSelect={this.handleSelect1}
                    onCancel={this.handleCancel1}
                    dateFormat={['YYYY', 'MM', 'DD']}
                    theme="ios"
                />

            </FormCell>

        )
    }
}


export {renderDateField};
