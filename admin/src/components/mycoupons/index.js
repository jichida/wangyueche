import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
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

import moment from 'moment';
export const MycouponFilter = props => (
    <Filter {...props}>
         <TextInput label="名字" source="name_q" />
         <ReferenceInput label="用户" source="creator" reference="userrider" addLabel={false}>
            <SelectInput optionText="username" />
        </ReferenceInput>
    </Filter>
);


const MycouponcreateTitle = ({ record }) => {
   return <span>新建 优惠券</span>;
};
const MycouponlistCreate = (props) => (
       <Create {...props} title={<MycouponcreateTitle />} >
           <SimpleForm>
               <TextInput label="优惠券名字" source="name" />
               <ReferenceInput source="creator" reference="userrider" allowEmpty>
                  <SelectInput optionText="username" />
               </ReferenceInput>
               <SelectInput  label="优惠类型"  source="triptype" choices={[
                   { id: '快车', name: '快车' },
                   { id: '出租车', name: '出租车' },
                   { id: '代驾', name: '代驾' },
                   { id: '旅游大巴', name: '旅游大巴' },
                   { id: '代驾', name: '代驾' },
                   { id: '拼车', name: '拼车' },
               ]} />
               <DateInput label="过期时间"  source="expdate" />
               <NumberInput label="最高抵扣金额(单位：元)"  source="pricediscountmax" />
               <NumberInput label="最高抵扣（折）,范围：（1-10）"  source="pricediscountpercent" />
           </SimpleForm>
       </Create>
);

const MycouponlistTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 优惠券</span>;
};

const MycouponlistEdit = (props) => {
      return (<Edit title={<MycouponlistTitle />} {...props}>
          <SimpleForm>
            <TextInput label="优惠券名字" source="name" />
            <ReferenceInput source="creator" reference="userrider" allowEmpty>
               <SelectInput optionText="username" />
            </ReferenceInput>
            <SelectInput  label="优惠类型"  source="triptype" choices={[
                { id: '快车', name: '快车' },
                { id: '出租车', name: '出租车' },
                { id: '代驾', name: '代驾' },
                { id: '旅游大巴', name: '旅游大巴' },
                { id: '代驾', name: '代驾' },
                { id: '拼车', name: '拼车' },
            ]} />
            <DateInput label="过期时间"  source="expdate" />
            <NumberInput label="最高抵扣金额(单位：元)"  source="pricediscountmax" />
            <NumberInput label="最高抵扣（折）,范围：（1-10）"  source="pricediscountpercent" />
          </SimpleForm>
      </Edit>);

};


const MycouponlistShow = (props) => (
       <Show title={<MycouponlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="名字" source="name" />
               <TextField label="过期时间"  source="expdate" />
               <TextField label="最高抵扣金额"  source="pricediscountmax" />
               <NumberField label="最高抵扣金额(单位：元)"  source="pricediscountmax" />
               <NumberField label="最高抵扣（折）,范围：（1-10）"  source="pricediscountpercent" />
           </SimpleShowLayout>
       </Show>
);


const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const styles = {
    floating: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 60,
        left: 'auto',
        position: 'fixed',
    },
    flat: {
        overflow: 'inherit',
    },
};

const PostActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter, refresh }) => (
    <CardActions style={cardActionStyle}>
        {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
        <CreateButton basePath={basePath} />
        <FlatButton primary label="刷新" onClick={refresh} icon={<NavigationRefresh />} />
        {/* Add your custom actions */}
        <FlatButton
        primary
        style={styles.flat}
        label="批量发送优惠券"
        icon={<ContentAdd />}
        containerElement={<Link to={`/createbatch`} />}/>
    </CardActions>
);

const MycouponlistList = (props) => (//
     <List title="用户优惠券列表" {...props} actions={<PostActions />}
      filters={<MycouponFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
            <TextField label="名字" source="name" />
            <ReferenceField label="用户" source="creator" reference="userrider" addLabel={false}>
            <TextField source="username" />
            </ReferenceField>
            <TextField label="优惠类型" source="triptype" />
            <DateField label="过期时间" source="expdate"  />
            <NumberField label="最高抵扣金额（元)" source="pricediscountmax" locales="zh-cn" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
            <NumberField label="最高抵扣（折）" source="pricediscountpercent" locales="zh-cn" elStyle={{ fontWeight: 'bold' }}/>
        <EditButton />
        </Datagrid>
    </List>
);


export  {MycouponlistList,MycouponlistCreate,MycouponlistEdit,MycouponlistShow};
