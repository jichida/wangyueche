import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
import {required} from 'admin-on-rest';
import {DateInputString} from '../controls/DateInput_String.js';


const RatedPassengerComplaintcreateTitle = ({ record }) => {
   return <span>新建 乘客投诉信息</span>;
};
const RatedPassengerComplaintCreate = (props) => (
       <Create {...props} title={<RatedPassengerComplaintcreateTitle />} >
           <SimpleForm>
             <TextInputEx label="订单号" source="OrderId"   validate={[required]}/>
             <TextInputEx label="驾驶证号(和订单关联)" source="LicenseId"   validate={[required]}/>
             <DateInputString label="投诉时间"  source="ComplaintTime"   validate={[required]}/>
             <TextInputEx label="技诉内容"  source="Detail"   validate={[required]}/>
             <TextInputEx label="处理结果"  source="Result"  validate={[required]} />
           </SimpleForm>
       </Create>
);

const RatedPassengerComplainteditTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 乘客投诉信息</span>;
};

const RatedPassengerComplaintEdit = (props) => {
      return (<Edit title={<RatedPassengerComplainteditTitle />} {...props}>
          <SimpleForm>
            <TextInputEx label="订单号" source="OrderId"   validate={[required]}/>
            <TextInputEx label="驾驶证号(和订单关联)" source="LicenseId"   validate={[required]}/>
            <DateInputString label="投诉时间"  source="ComplaintTime"   validate={[required]}/>
            <TextInputEx label="技诉内容"  source="Detail"   validate={[required]}/>
            <TextInputEx label="处理结果"  source="Result"  validate={[required]} />
            <TextField label="数据更新时间" source="UpdateTime"  />
          </SimpleForm>
      </Edit>);

};


const RatedPassengerComplaintList = (props) => (//
     <List title="乘客投诉列表" {...props} >
        <Datagrid>
        <TextField label="订单号" source="OrderId" />
        <DateField label="投诉时间"  source="ComplaintTime" />
        <TextField label="技诉内容"  source="Detail" />
        <TextField label="处理结果"  source="Result" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {RatedPassengerComplaintList,RatedPassengerComplaintCreate,RatedPassengerComplaintEdit};
