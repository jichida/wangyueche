import React from 'react';

import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import {
  CreateButton,
  NumberInput,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ShowButton,
  SelectInput,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Filter,
  SelectArrayInput,
  ChipField,
  BooleanInput,
  BooleanField,
  ReferenceField,
  ReferenceInput
} from 'admin-on-rest/lib/mui';

import {TabbedForm,FormTab} from 'admin-on-rest/lib/mui';
//import CreateButton from './buttons/create-button.js';
import { Field,FieldArray } from 'redux-form';

import { translate } from 'admin-on-rest';
import {TimePickerInput} from '../controls/timepicker.js';


import RoutePrice from './routeprice.js';
import RoutePriceShow from './routepriceshow.js';
import RouteTime from './routetime.js';
import RouteTimeShow from './routetimeshow.js';
import MyCopyButton from './mycopybutton.js';
import RefundButton from './refundbtntoorder.js';

const BuscarpoolcreateTitle = translate(({ record, translate })  => {
   return <span>新建 拼车路线</span>;
});
const BuscarpoolCreate = (props) => (
       <Create {...props} title={<BuscarpoolcreateTitle />} >
           <SimpleForm>
           <SelectInput  label="拼车类型"  source="pinchetype" choices={[
               { id: '专线', name: '专线' },
               { id: '人气团拼', name: '人气团拼' },
           ]} />
           <TextInput label="开始城市" source="startcity" />
           <TextInput label="目的城市" source="endcity" />
           <ReferenceInput source="pinchedriveruserid" reference="userdriverpinche" allowEmpty>
              <SelectInput optionText="username" />
           </ReferenceInput>
           <DateInput label="出发日期" source="startdate" />
           <TimePickerInput label="出发时间" source="starttime" />
           <NumberInput label="座位数"  source="seatnumber" />
           <NumberInput label="成团数"  source="groupnumber" />
           <TextInput label="状态"  source="status" />
           <SelectArrayInput label="开始站点" source="startstations" options={{ fullWidth: true }}/>
           <SelectArrayInput label="目的站点" source="endstations" options={{ fullWidth: true }}/>
           <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);

const BuscarpoolTitle = ({ record }) => {
   return <span>编辑 拼车路线</span>;
};

const BuscarpoolEdit = (props) => {
      return (<Edit title={<BuscarpoolTitle />} {...props}>
          <TabbedForm>
              <FormTab label="resources.buscarpool.tabs.citystation">

                <SelectArrayInput label="开始站点" source="startstations" options={{ fullWidth: true }}/>
                <SelectArrayInput label="目的站点" source="endstations" options={{ fullWidth: true }}/>
                <RoutePrice label="编辑站点价格" source="carpoolprice" addLabel={true}/>
                <RouteTime label="编辑站点时间" source="carpoolstationtime" addLabel={true}/>

              </FormTab>
              <FormTab label="resources.buscarpool.tabs.basicinfo">
                <DisabledInput label="Id" source="id" />
                <SelectInput  label="拼车类型"  source="pinchetype" choices={[
                    { id: '专线', name: '专线' },
                    { id: '人气团拼', name: '人气团拼' },
                ]} />
                <TextInput label="开始城市" source="startcity" />
                <TextInput label="目的城市" source="endcity" />
                <DateInput label="出发日期" source="startdate" />
                <TimePickerInput label="出发时间" source="starttime" />
                <TextInput label="座位数" source="seatnumber" />
                <NumberInput label="成团数"  source="groupnumber" />
                <SelectInput  label="状态"  source="status" choices={[
                  { id: '未成团', name: '未成团' },
                  { id: '已成团', name: '已成团' },
                  { id: '已取消', name: '已取消(设置为未启用)' },
                ]} />
                <ReferenceInput source="pinchedriveruserid" reference="userdriverpinche" allowEmpty>
                   <SelectInput optionText="username" />
                </ReferenceInput>
                <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
              </FormTab>
              <FormTab label="resources.buscarpool.tabs.passenager">
                <ReferenceManyField reference="order" target="buscarpoolid" label="resources.buscarpool.fields.passenager" perPage={5} addLabel={false}>
                  <Datagrid>
                       <ReferenceField label="乘客信息" source="rideruserid" reference="userrider" addLabel={false} allowEmpty>
                           <TextField source="username" />
                       </ReferenceField>
                       <TextField label="开始站点" source="startstation" />
                       <TextField label="目的站点" source="endstation" />
                       <TextField label="订单状态" source="orderstatus" />
                       <TextField label="预定座位数" source="seatnumber" />
                       <DateField label="下单时间" source="created_at" showTime/>
                       <RefundButton />
                       <EditButton />
                   </Datagrid>
                 </ReferenceManyField>
                </FormTab>

              </TabbedForm>
      </Edit>);

};

const BuscarpoolTitle2 = ({ record }) => {
   return <span>显示 拼车路线</span>;
};

const BuscarpoolShow = (props) => {
  return (<Show title={<BuscarpoolTitle2 />} {...props} >
              <TabbedForm>
              <FormTab label="resources.buscarpool.tabs.citystation">
                <RoutePriceShow label="路线价格" source="carpoolprice" />
                <RouteTimeShow label="站点时间" source="carpoolstationtime" />
               </FormTab>
               <FormTab label="resources.buscarpool.tabs.basicinfo">
               <TextField source="id" />
               <TextField label="拼车类型" source="pinchetype" />
               <TextField label="开始城市" source="startcity" />
               <TextField label="目的城市" source="endcity" />
               <DateField label="出发日期" source="startdate" type="date" />
               <DateField label="出发时间" source="starttime" showTime/>
               <TextField label="座位数" source="seatnumber" />
               <TextField label="成团数"  source="groupnumber" />
               <BooleanField label="是否启用" source="isenabled" />
               </FormTab>
               <FormTab label="resources.buscarpool.tabs.passenager">
               <ReferenceManyField reference="order" target="buscarpoolid" label="resources.buscarpool.fields.passenager" perPage={5} addLabel={false}>
               <Datagrid>
                    <ReferenceField label="乘客信息" source="rideruserid" reference="userrider" addLabel={false}>
                        <TextField source="username" />
                    </ReferenceField>
                    <TextField label="开始站点" source="startstation" />
                    <TextField label="目的站点" source="endstation" />
                    <TextField label="订单状态" source="orderstatus" />
                    <TextField label="预定座位数" source="seatnumber" />
                    <DateField label="下单时间" source="created_at" showTime/>
                    <RefundButton />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
               </FormTab>
              </TabbedForm>
       </Show>
  );
}

const BuscarpoolFilter = (props) => (
    <Filter {...props}>
        <SelectInput  label="拼车类型"  source="pinchetype" choices={[
            { id: '专线', name: '专线' },
            { id: '人气团拼', name: '人气团拼' },
        ]} />
        <DateInput label="出发日期" source="startdate" />
    </Filter>
);

import EditButtonInList from './editbtninlist.js';
const BuscarpoollistTitle = translate(({ record, translate })  => {
   return <span>拼车列表</span>;
});
const BuscarpoolList = (props) => (//
     <List title={<BuscarpoollistTitle />} {...props} filters={<BuscarpoolFilter />}  perPage={25} sort={{ field: 'startdate', order: 'DESC' }}>
        <Datagrid>
        <TextField label="拼车类型" source="pinchetype" />
        <TextField label="开始城市" source="startcity" />
        <ReferenceField label="所属司机" source="pinchedriveruserid" reference="userdriverpinche" allowEmpty>
          <TextField source="username" />
        </ReferenceField>
        <DateField label="出发日期" source="startdate" type="date" />
        <TextField label="出发时间" source="starttime" />
        <TextField label="目的城市" source="endcity" />
        <TextField label="座位数" source="seatnumber" />
        <TextField label="下单数" source="seatnumbertotal" />
        <TextField label="成团数"  source="groupnumber" />
        <BooleanField label="是否启用" source="isenabled" />
        <EditButtonInList />
        <ShowButton />
        <MyCopyButton />
        </Datagrid>
    </List>
);


export  {BuscarpoolList,BuscarpoolCreate,BuscarpoolEdit,BuscarpoolShow};
