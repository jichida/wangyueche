import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,
   TabbedForm,
  FormTab,
  SelectInput } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
import {ImageInputUpload} from '../controls/imageupload.js';
import {Titlewithimage} from '../controls/Titlewithimage';

const BaseInfoVehiclecreateTitle = ({ record }) => {
   return <span>新建 车辆</span>;
};
const BaseInfoVehicleCreate = (props) => (
       <Create {...props} title={<BaseInfoVehiclecreateTitle />} >
       <TabbedForm>
           <FormTab label="resources.baseinfovehicle.tabs.tab0">
           <TextInputEx  label="车辆号牌" source="VehicleNo" />
           <TextInputEx  label="车牌颜色" source="PlateColor" />
           <NumberInputEx  label="核定载客位" source="Seats" />
           <TextInputEx  label="车辆厂牌" source="Brand" />
           <TextInputEx  label="车辆型号" source="Model" />
           <TextInputEx  label="车辆类型" source="VehicleType" />
           <TextInputEx  label="车辆所有人(应与《机动车登记证书》所注明的车辆所有人一致)" source="OwnerName" />
           <TextInputEx  label="车身颜色" source="VehicleColor" />
           </FormTab>

           <FormTab label="resources.baseinfovehicle.tabs.tab1">
           <TextInputEx  label="发动机号(以机动车行驶证为准)" source="Engineld" />
           <TextInputEx  label="车辆VIN码(以机动车行驶证为准)" source="VIN" />
           <DateInput  label="车辆注册日期(以机动车行驶证为准)" source="CertifyDateA" />
           <TextInputEx  label="牢辆燃料类型" source="FuelType" />
           <TextInputEx  label="发动机排量" source="EngineDisplace" />
           </FormTab>

           <FormTab label="resources.baseinfovehicle.tabs.tab2">
           <ImageInputUpload  label="车辆照片" source="PhotoldURL" />
           <TextInputEx  label="运输证字号" source="Certificate" />
           <TextInputEx  label="车辆运输证发证机构" source="TransAgency" />
           <TextInputEx  label="车辆经营区域" source="TransArea" />
           <DateInput  label="车辆运输证有效期起" source="TransDateStart" />
           <DateInput  label="车辆运输证有效期止" source="TransDateStop" />
           <DateInput  label="车辆初次登记日期" source="CertifyDateB" />
           <SelectInput  label="车辆检修状态"  source="FixState" choices={[
               { id: 0, name: '未检修' },
               { id: 1, name: '已检修' },
               { id: 2, name: '未知' },
           ]} />
           <DateInput  label="车辆下次年检时间" source="NextFixDate" />
           <TextInputEx  label="车辆年度审验状态?" source="CheckState" />
           <TextInputEx  label="发票打印设备序列号" source="FeePrintld" />
         </FormTab>


         <FormTab label="resources.baseinfovehicle.tabs.tab3">
         <TextInputEx  label="卫星定位装置品牌" source="GPSBrand" />
         <TextInputEx  label="卫星定位装置型号" source="GPSModel" />
         <TextInputEx  label="卫星定位装置IMEI号" source="GPSIMEI" />
         <DateInput  label="卫星定位设备安装日期" source="GPSlnstallDate" />
         </FormTab>

         <FormTab label="resources.baseinfovehicle.tabs.tab4">
         <DateInput  label="报备日期" source="RegisterDate" />
         <TextInputEx  label="FareType?" source="FareType" />
         </FormTab>
       </TabbedForm>
       </Create>
);

const BaseInfoVehicleTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 车辆</span>;
};

const BaseInfoVehicleEdit = (props) => {
      return (<Edit title={<BaseInfoVehicleTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.baseinfovehicle.tabs.tab0">
            <TextInputEx  label="车辆号牌" source="VehicleNo" />
            <TextInputEx  label="车牌颜色" source="PlateColor" />
            <NumberInputEx  label="核定载客位" source="Seats" />
            <TextInputEx  label="车辆厂牌" source="Brand" />
            <TextInputEx  label="车辆型号" source="Model" />
            <TextInputEx  label="车辆类型" source="VehicleType" />
            <TextInputEx  label="车辆所有人(应与《机动车登记证书》所注明的车辆所有人一致)" source="OwnerName" />
            <TextInputEx  label="车身颜色" source="VehicleColor" />
            </FormTab>

            <FormTab label="resources.baseinfovehicle.tabs.tab1">
            <TextInputEx  label="发动机号(以机动车行驶证为准)" source="Engineld" />
            <TextInputEx  label="车辆VIN码(以机动车行驶证为准)" source="VIN" />
            <DateInput  label="车辆注册日期(以机动车行驶证为准)" source="CertifyDateA" />
            <TextInputEx  label="牢辆燃料类型" source="FuelType" />
            <TextInputEx  label="发动机排量" source="EngineDisplace" />
            </FormTab>

            <FormTab label="resources.baseinfovehicle.tabs.tab2">
            <ImageInputUpload  label="车辆照片" source="PhotoldURL" />
            <TextInputEx  label="运输证字号" source="Certificate" />
            <TextInputEx  label="车辆运输证发证机构" source="TransAgency" />
            <TextInputEx  label="车辆经营区域" source="TransArea" />
            <DateInput  label="车辆运输证有效期起" source="TransDateStart" />
            <DateInput  label="车辆运输证有效期止" source="TransDateStop" />
            <DateInput  label="车辆初次登记日期" source="CertifyDateB" />
            <SelectInput  label="车辆检修状态"  source="FixState" choices={[
                { id: 0, name: '未检修' },
                { id: 1, name: '已检修' },
                { id: 2, name: '未知' },
            ]} />
            <DateInput  label="车辆下次年检时间" source="NextFixDate" />
            <TextInputEx  label="车辆年度审验状态?" source="CheckState" />
            <TextInputEx  label="发票打印设备序列号" source="FeePrintld" />
          </FormTab>


          <FormTab label="resources.baseinfovehicle.tabs.tab3">
          <TextInputEx  label="卫星定位装置品牌" source="GPSBrand" />
          <TextInputEx  label="卫星定位装置型号" source="GPSModel" />
          <TextInputEx  label="卫星定位装置IMEI号" source="GPSIMEI" />
          <DateInput  label="卫星定位设备安装日期" source="GPSlnstallDate" />
          </FormTab>

          <FormTab label="resources.baseinfovehicle.tabs.tab4">
          <DateInput  label="报备日期" source="RegisterDate" />
          <TextInputEx  label="FareType?" source="FareType" />
          </FormTab>
        </TabbedForm>
        </Edit>);

};



const BaseInfoVehicleList = (props) => (//
     <List title="车辆列表" {...props} >
        <Datagrid>
        <TextField  label="车辆号牌" source="VehicleNo" />
        <TextField  label="车牌颜色" source="PlateColor" />
        <TextField  label="核定载客位" source="Seats" />
        <TextField  label="车辆厂牌" source="Brand" />
        <TextField  label="车辆型号" source="Model" />
        <TextField  label="车辆类型" source="VehicleType" />
        <TextField  label="车辆所有人" source="OwnerName" />
        <TextField  label="车身颜色" source="VehicleColor" />
        <TextField  label="报备日期" source="RegisterDate" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {BaseInfoVehicleList,BaseInfoVehicleCreate,BaseInfoVehicleEdit};
