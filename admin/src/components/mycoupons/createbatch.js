import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {
  CreateButton,
  RichTextField,
  NumberInput,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  ReferenceInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ShowButton,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  NumberField,
  ReferenceField,
  Filter
} from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import { ReferenceArrayInput, SelectArrayInput } from 'admin-on-rest';
import CreateBatch from './create.js';
import moment from 'moment';

const MycouponcreateTitle = ({ record }) => {
   return <span>新建 批量优惠券</span>;
};

const MycouponbatchCreate = (props) => {
  return (
         <CreateBatch {...props} title={<MycouponcreateTitle />} >
             <SimpleForm>
                <TextInput label="名字" source="name" />
                <ReferenceArrayInput source="creators" reference="userrider" allowEmpty>
                    <SelectArrayInput optionText="username" />
                </ReferenceArrayInput>
                <SelectArrayInput label="优惠类型" source="triptypes" choices={[
                  { id: '快车', name: '快车' },
                  { id: '出租车', name: '出租车' },
                  { id: '代驾', name: '代驾' },
                  { id: '旅游大巴', name: '旅游大巴' },
                  { id: '拼车', name: '拼车' },
                ]} allowEmpty/>
                <DateInput label="过期时间"  source="expdate" />
                <NumberInput label="最高抵扣金额(单位：元)"  source="pricediscountmax" />
                <NumberInput label="最高抵扣（折）,范围：（1-10）"  source="pricediscountpercent" />
                <NumberInput label="优惠券数量"  source="couponnumber" />
             </SimpleForm>
         </CreateBatch>
  );
}
// const MycouponbatchCreate = (props) => (
//   <div>批量发送优惠券页面</div>
// );
export default MycouponbatchCreate;
