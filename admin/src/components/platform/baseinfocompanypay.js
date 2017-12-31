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

const BaseInfoCompanyPaycreateTitle = ({ record }) => {
   return <span>新建 支付信息</span>;
};
const BaseInfoCompanyPayCreate = (props) => (
       <Create {...props} title={<BaseInfoCompanyPaycreateTitle />} >
           <SimpleForm>
               <TextInputEx label="银行或者非银行支付机构名称全称" source="PayName" validate={[required]}/>
               <TextInputEx label="非银行支付机构支付业务许可证编号"  source="PayId" validate={[required]}/>
               <TextInputEx label="支付业务类型"  source="PayType" validate={[required]}/>
               <TextInputEx label="业务覆盖范围"  source="PayScope" validate={[required]}/>
               <TextInputEx label="备付金存管银行全称" source="PrepareBank" validate={[required]}/>
               <BooleanInput label="是否失效(0有效1失效)" source="State" defaultValue={false} />
               <NumberInputEx label="结算周期(单位:天)" source="CountDate" validate={[required]}/>
           </SimpleForm>
       </Create>
);

const BaseInfoCompanyPayeditTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 支付信息</span>;
};

const BaseInfoCompanyPayEdit = (props) => {
      return (<Edit title={<BaseInfoCompanyPayeditTitle />} {...props}>
          <SimpleForm>
            <TextInputEx label="银行或者非银行支付机构名称全称" source="PayName" validate={[required]}/>
            <TextInputEx label="非银行支付机构支付业务许可证编号"  source="PayId" validate={[required]}/>
            <TextInputEx label="支付业务类型"  source="PayType" validate={[required]}/>
            <TextInputEx label="业务覆盖范围"  source="PayScope" validate={[required]}/>
            <TextInputEx label="备付金存管银行全称" source="PrepareBank" validate={[required]}/>
            <NumberInputEx label="结算周期(单位:天)" source="CountDate" validate={[required]}/>
            <BooleanInput label="是否失效(0有效1失效)" source="State" defaultValue={false} />
            <TextField label="操作标识" source="Flag"  />
            <TextField label="数据更新时间" source="UpdateTime"  />
          </SimpleForm>
      </Edit>);

};


const BaseInfoCompanyPayList = (props) => (//
     <List title="支付信息列表" {...props} >
        <Datagrid>
        <TextField label="支付机构名称全称" source="PayName" />
        <TextField label="许可证编号"  source="PayId" />
        <TextField label="支付业务类型"  source="PayType" />
        <TextField label="范围"  source="PayScope" />
        <TextField label="备付金存管银行全称" source="PrepareBank" />
        <TextField label="结算周期(单位:天)" source="CountDate" />
        <TextField label="数据更新时间" source="UpdateTime"  />
        <EditButton />
        </Datagrid>
    </List>
);


export  {BaseInfoCompanyPayList,BaseInfoCompanyPayCreate,BaseInfoCompanyPayEdit};
