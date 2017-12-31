import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,
   TabbedForm,
  FormTab,  ReferenceInput,
    ReferenceField,
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
import {DateInputString} from '../controls/DateInput_String.js';
import {required} from 'admin-on-rest';

// const BaseInfoVehiclecreateTitle = ({ record }) => {
//    return <span>新建 车辆</span>;
// };
// const BaseInfoVehicleCreate = (props) => (
//        <Create {...props} title={<BaseInfoVehiclecreateTitle />} >
//        <TabbedForm>
//            <FormTab label="resources.baseinfovehicle.tabs.tab0">
//            <NumberInputEx  label="注册行政区域代码" source="Address" validate={[required]}/>
//            <TextInputEx  label="车辆号牌" source="VehicleNo" validate={[required]}/>
//            <TextInputEx  label="车牌颜色" source="PlateColor" validate={[required]}/>
//            <NumberInputEx  label="核定载客位" source="Seats" validate={[required]}/>
//            <TextInputEx  label="车辆厂牌" source="Brand" validate={[required]}/>
//            <TextInputEx  label="车辆型号" source="Model" validate={[required]}/>
//            <TextInputEx  label="车辆类型" source="VehicleType" validate={[required]}/>
//            <TextInputEx  label="车辆所有人(应与《机动车登记证书》所注明的车辆所有人一致)" source="OwnerName" validate={[required]}/>
//            <TextInputEx  label="车身颜色" source="VehicleColor" validate={[required]}/>
//            </FormTab>
//
//            <FormTab label="resources.baseinfovehicle.tabs.tab1">
//            <TextInputEx  label="发动机号(以机动车行驶证为准)" source="EngineId" validate={[required]}/>
//            <TextInputEx  label="车辆VIN码(以机动车行驶证为准)" source="VIN" validate={[required]}/>
//            <DateInputString  label="车辆注册日期(以机动车行驶证为准)" source="CertifyDateA" validate={[required]}/>
//            <TextInputEx  label="牢辆燃料类型" source="FuelType" validate={[required]}/>
//            <TextInputEx  label="发动机排量" source="EngineDisplace" validate={[required]}/>
//            </FormTab>
//
//            <FormTab label="resources.baseinfovehicle.tabs.tab2">
//            <ImageInputUpload  label="车辆照片" source="PhotoIdURL" />
//            <TextInputEx  label="运输证字号" source="Certificate" />
//            <TextInputEx  label="车辆运输证发证机构" source="TransAgency" validate={[required]}/>
//            <TextInputEx  label="车辆经营区域" source="TransArea" validate={[required]}/>
//            <DateInputString  label="车辆运输证有效期起" source="TransDateStart" validate={[required]}/>
//            <DateInputString  label="车辆运输证有效期止" source="TransDateStop" validate={[required]}/>
//            <DateInputString  label="车辆初次登记日期" source="CertifyDateB" validate={[required]}/>
//            <SelectInput  label="车辆检修状态"  source="FixState" choices={[
//                { id: 0, name: '未检修' },
//                { id: 1, name: '已检修' },
//                { id: 2, name: '未知' },
//            ]} validate={[required]}/>
//            <DateInputString  label="车辆下次年检时间" source="NextFixDate" />
//            <TextInputEx  label="车辆年度审验状态?" source="CheckState" validate={[required]}/>
//            <TextInputEx  label="发票打印设备序列号" source="FeePrintId" validate={[required]}/>
//          </FormTab>
//
//
//          <FormTab label="resources.baseinfovehicle.tabs.tab3">
//          <TextInputEx  label="卫星定位装置品牌" source="GPSBrand" validate={[required]}/>
//          <TextInputEx  label="卫星定位装置型号" source="GPSModel" validate={[required]}/>
//          <TextInputEx  label="卫星定位装置IMEI号" source="GPSIMEI" />
//          <DateInputString  label="卫星定位设备安装日期" source="GPSlnstallDate" validate={[required]}/>
//          </FormTab>
//
//          <FormTab label="resources.baseinfovehicle.tabs.tab4">
//          <DateInputString  label="报备日期" source="RegisterDate" validate={[required]}/>
//          <NumberInputEx  label="服务类型" source="CommercialType" />
//          <TextInputEx  label="FareType?" source="FareType" />
//          </FormTab>
//        </TabbedForm>
//        </Create>
// );

const BaseInfoVehicleTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 车辆</span>;
};
const BaseInfoVehicleEdit = (props) => {
      return (<Edit title={<BaseInfoVehicleTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.baseinfovehicle.tabs.tab0">
            <NumberInputEx  label="注册行政区域代码" source="Address" validate={[required]}/>
            <TextInputEx  label="车辆号牌" source="VehicleNo" validate={[required]}/>
            <TextInputEx  label="车牌颜色" source="PlateColor" validate={[required]}/>
            <NumberInputEx  label="核定载客位" source="Seats" validate={[required]}/>
            <TextInputEx  label="车辆厂牌" source="Brand" validate={[required]}/>
            <TextInputEx  label="车辆型号" source="Model" validate={[required]}/>
            <TextInputEx  label="车辆类型" source="VehicleType" validate={[required]}/>
            <TextInputEx  label="车辆所有人(应与《机动车登记证书》所注明的车辆所有人一致)" source="OwnerName" validate={[required]}/>
            <TextInputEx  label="车身颜色" source="VehicleColor" validate={[required]}/>
            </FormTab>

            <FormTab label="resources.baseinfovehicle.tabs.tab1">
            <TextInputEx  label="发动机号(以机动车行驶证为准)" source="EngineId" validate={[required]}/>
            <TextInputEx  label="车辆VIN码(以机动车行驶证为准)" source="VIN" validate={[required]}/>
            <DateInputString  label="车辆注册日期(以机动车行驶证为准)" source="CertifyDateA" validate={[required]}/>
            <TextInputEx  label="牢辆燃料类型" source="FuelType" validate={[required]}/>
            <TextInputEx  label="发动机排量" source="EngineDisplace" validate={[required]}/>
            </FormTab>

            <FormTab label="resources.baseinfovehicle.tabs.tab2">
            <ImageInputUpload  label="车辆照片" source="PhotoIdURL" />
            <TextInputEx  label="运输证字号" source="Certificate" />
            <TextInputEx  label="车辆运输证发证机构" source="TransAgency" validate={[required]}/>
            <TextInputEx  label="车辆经营区域" source="TransArea" validate={[required]}/>
            <DateInputString  label="车辆运输证有效期起" source="TransDateStart" validate={[required]}/>
            <DateInputString  label="车辆运输证有效期止" source="TransDateStop" validate={[required]}/>
            <DateInputString  label="车辆初次登记日期" source="CertifyDateB" validate={[required]}/>
            <SelectInput  label="车辆检修状态"  source="FixState" choices={[
                { id: 0, name: '未检修' },
                { id: 1, name: '已检修' },
                { id: 2, name: '未知' },
            ]} validate={[required]}/>
            <DateInputString  label="车辆下次年检时间" source="NextFixDate" />
            <TextInputEx  label="车辆年度审验状态" source="CheckState" validate={[required]}/>
            <TextInputEx  label="发票打印设备序列号" source="FeePrintId" validate={[required]}/>
          </FormTab>


          <FormTab label="resources.baseinfovehicle.tabs.tab3">
          <TextInputEx  label="卫星定位装置品牌" source="GPSBrand" validate={[required]}/>
          <TextInputEx  label="卫星定位装置型号" source="GPSModel" validate={[required]}/>
          <TextInputEx  label="卫星定位装置IMEI号" source="GPSIMEI" />
          <DateInputString  label="卫星定位设备安装日期" source="GPSlnstallDate" validate={[required]}/>
          </FormTab>

          <FormTab label="resources.baseinfovehicle.tabs.tab4">
          <DateInputString  label="报备日期" source="RegisterDate" validate={[required]}/>
          <SelectInput  label="服务类型"  source="CommercialType" choices={[
              { id: 1, name: '网络预约出租汽车' },
              { id: 2, name: '巡游出租汽车' },
              { id: 3, name: '私人小客车合乘' },
          ]} validate={[required]}/>
          <ReferenceInput  label="运价" reference="faretype" source="Platform_baseInfoVehicle.FareType" allowEmpty >
                <SelectInput optionText="registertype" />
          </ReferenceInput>
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


export  {BaseInfoVehicleList,BaseInfoVehicleEdit};
