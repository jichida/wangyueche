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

const BaseInfoCompanyPaycreateTitle = ({ record }) => {
   return <span>新建 支付信息</span>;
};
const BaseInfoCompanyPayCreate = (props) => (
       <Create {...props} title={<BaseInfoCompanyPaycreateTitle />} >
           <SimpleForm>
               <TextInputEx label="银行或者非银行支付机构名称全称" source="PayName" />
               <TextInputEx label="非银行支付机构支付业务许可证编号"  source="Payld" />
               <TextInputEx label="支付业务类型"  source="PayType" />
               <TextInputEx label="业务覆盖范围"  source="PayScope" />
               <TextInputEx label="备付金存管银行全称" source="PrepareBank" />
               <NumberInputEx label="结算周期(单位:天)" source="CountDate" />
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
            <TextInputEx label="银行或者非银行支付机构名称全称" source="PayName" />
            <TextInputEx label="非银行支付机构支付业务许可证编号"  source="Payld" />
            <TextInputEx label="支付业务类型"  source="PayType" />
            <TextInputEx label="业务覆盖范围"  source="PayScope" />
            <TextInputEx label="备付金存管银行全称" source="PrepareBank" />
            <NumberInputEx label="结算周期(单位:天)" source="CountDate" />
          </SimpleForm>
      </Edit>);

};

const BaseInfoCompanyPayshowTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>显示 支付信息</span>;
};

const BaseInfoCompanyPayShow = (props) => (
       <Show title={<BaseInfoCompanyPayshowTitle />} {...props}>
           <SimpleShowLayout>
             <TextField label="支付机构名称全称" source="PayName" />
             <TextField label="许可证编号"  source="Payld" />
             <TextField label="支付业务类型"  source="PayType" />
             <TextField label="范围"  source="PayScope" />
             <TextField label="备付金存管银行全称" source="PrepareBank" />
             <TextField label="结算周期(单位:天)" source="CountDate" />
           </SimpleShowLayout>
       </Show>
);



const BaseInfoCompanyPayList = (props) => (//
     <List title="支付信息列表" {...props} >
        <Datagrid>
        <TextField label="支付机构名称全称" source="PayName" />
        <TextField label="许可证编号"  source="Payld" />
        <TextField label="支付业务类型"  source="PayType" />
        <TextField label="范围"  source="PayScope" />
        <TextField label="备付金存管银行全称" source="PrepareBank" />
        <TextField label="结算周期(单位:天)" source="CountDate" />
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {BaseInfoCompanyPayList,BaseInfoCompanyPayCreate,BaseInfoCompanyPayEdit,BaseInfoCompanyPayShow};
