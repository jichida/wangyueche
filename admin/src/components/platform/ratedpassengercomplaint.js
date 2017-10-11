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


const RatedPassengerComplaintTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>乘客投诉信息</span>;
};


const RatedPassengerComplaintShow = (props) => (
       <Show title={<RatedPassengerComplaintTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="订单号" source="Orderld" />
           <DateField label="投诉时间"  source="ComplaintTime" />
           <TextField label="技诉内容"  source="Detail" />
           <TextField label="处理结果"  source="Result" />
           </SimpleShowLayout>
       </Show>
);



const RatedPassengerComplaintList = (props) => (//
     <List title="乘客投诉列表" {...props} >
        <Datagrid>
        <TextField label="订单号" source="Orderld" />
        <DateField label="投诉时间"  source="ComplaintTime" />
        <DateField label="技诉内容"  source="Detail" />
        <TextField label="处理结果"  source="Result" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {RatedPassengerComplaintList,RatedPassengerComplaintShow};
