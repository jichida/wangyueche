import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {
  CreateButton,
  RichTextField,
  ReferenceInput,
  NumberInput,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
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
  ImageField,
  TabbedForm,
  ReferenceField,
  FormTab
} from 'admin-on-rest/lib/mui';
import {DateInputString} from '../controls/DateInput_String.js';
import RichTextInput from '../controls/richtoolbar.js';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
import {ImageInputUpload} from '../controls/imageupload.js';
import moment from 'moment';
import ApproveButton from './btn';
import {required} from 'admin-on-rest';


const CarTitle = ({ record }) => {
   return <span> 驾驶员车辆信息</span>;
};

const MycarEdit = (props) => {
      return (<Edit title={<CarTitle />} {...props}>
        <TabbedForm>
          <FormTab label="resources.mycar.tabs.basicinfo">
              <DisabledInput label="Id" source="id" />
              <ReferenceField label="司机" source="creator" reference="userdriver" addLabel={true}>
                <TextField source="username" />
              </ReferenceField>
              <TextInputEx  label="车辆名字" source="name" />
              <ImageField  label="人车合影" source="PhotoandCarmanURL" addLabel={true}/>
              <ImageField  label="机动车驾驶证" source="LicensePhotoIdURL" addLabel={true}/>
              <ImageField  label="城市" source="City" addLabel={true}/>
              <ImageField  label="机动车行驶证" source="CarrunPhotoIdURL" addLabel={true}/>
              <ReferenceField label="平台车辆信息" source="Platform_baseInfoVehicleId" reference="baseinfovehicle" addLabel={true} allowEmpty>
                <TextField source="id" />
              </ReferenceField>
              <TextInput label="拒绝理由" source="approvalrejectseason" />
              <SelectInput  label="审核状态"  source="approvalstatus" choices={[
                  { id: '未递交', name: '未递交资料' },
                  { id: '待审核', name: '待审核' },
                  { id: '审核中', name: '审核中' },
                  { id: '已审核', name: '已审核' },
                  { id: '已拒绝', name: '拒绝(填写拒绝理由)' },
              ]} />
          </FormTab>
          <FormTab label="resources.baseinfovehicle.tabs.tab0">
          <TextInputEx  label="车辆号牌" source="Platform_baseInfoVehicle.VehicleNo" validate={[required]}/>
          <TextInputEx  label="车牌颜色" source="Platform_baseInfoVehicle.PlateColor" validate={[required]}/>
          <NumberInputEx  label="核定载客位" source="Platform_baseInfoVehicle.Seats" validate={[required]}/>
          <TextInputEx  label="车辆厂牌" source="Platform_baseInfoVehicle.Brand" validate={[required]}/>
          <TextInputEx  label="车辆型号" source="Platform_baseInfoVehicle.Model" validate={[required]}/>
          <TextInputEx  label="车辆类型" source="Platform_baseInfoVehicle.VehicleType" validate={[required]}/>
          <TextInputEx  label="车辆所有人(应与《机动车登记证书》所注明的车辆所有人一致)" source="Platform_baseInfoVehicle.OwnerName" validate={[required]}/>
          <TextInputEx  label="车身颜色" source="Platform_baseInfoVehicle.VehicleColor" validate={[required]}/>
          </FormTab>

          <FormTab label="resources.baseinfovehicle.tabs.tab1">
          <TextInputEx  label="发动机号(以机动车行驶证为准)" source="Platform_baseInfoVehicle.EngineId" validate={[required]}/>
          <TextInputEx  label="车辆VIN码(以机动车行驶证为准)" source="Platform_baseInfoVehicle.VIN" validate={[required]}/>
          <DateInputString  label="车辆注册日期(以机动车行驶证为准)" source="Platform_baseInfoVehicle.CertifyDateA" validate={[required]}/>
          <TextInputEx  label="牢辆燃料类型" source="Platform_baseInfoVehicle.FuelType" validate={[required]}/>
          <TextInputEx  label="发动机排量" source="Platform_baseInfoVehicle.EngineDisplace" validate={[required]}/>
          </FormTab>

          <FormTab label="resources.baseinfovehicle.tabs.tab2">
          <ImageInputUpload  label="车辆照片" source="Platform_baseInfoVehicle.PhotoIdURL" />
          <TextInputEx  label="运输证字号" source="Platform_baseInfoVehicle.Certificate" validate={[required]}/>
          <TextInputEx  label="车辆运输证发证机构" source="Platform_baseInfoVehicle.TransAgency" validate={[required]}/>
          <TextInputEx  label="车辆经营区域" source="Platform_baseInfoVehicle.TransArea" validate={[required]}/>
          <DateInputString  label="车辆运输证有效期起" source="Platform_baseInfoVehicle.TransDateStart" validate={[required]}/>
          <DateInputString  label="车辆运输证有效期止" source="Platform_baseInfoVehicle.TransDateStop" validate={[required]}/>
          <DateInputString  label="车辆初次登记日期" source="Platform_baseInfoVehicle.CertifyDateB" validate={[required]}/>
          <SelectInput  label="车辆检修状态"  source="Platform_baseInfoVehicle.FixState" choices={[
              { id: 0, name: '未检修' },
              { id: 1, name: '已检修' },
              { id: 2, name: '未知' },
          ]} validate={[required]}/>
          <DateInputString  label="车辆下次年检时间" source="Platform_baseInfoVehicle.NextFixDate" validate={[required]}/>
          <TextInputEx  label="车辆年度审验状态" source="Platform_baseInfoVehicle.CheckState" validate={[required]}/>
          <TextInputEx  label="发票打印设备序列号" source="Platform_baseInfoVehicle.FeePrintId" validate={[required]}/>
        </FormTab>


        <FormTab label="resources.baseinfovehicle.tabs.tab3">
        <TextInputEx  label="卫星定位装置品牌" source="Platform_baseInfoVehicle.GPSBrand" validate={[required]}/>
        <TextInputEx  label="卫星定位装置型号" source="Platform_baseInfoVehicle.GPSModel" validate={[required]}/>
        <TextInputEx  label="卫星定位装置IMEI号" source="Platform_baseInfoVehicle.GPSIMEI" validate={[required]}/>
        <DateInputString  label="卫星定位设备安装日期" source="Platform_baseInfoVehicle.GPSlnstallDate" validate={[required]}/>
        </FormTab>

        <FormTab label="resources.baseinfovehicle.tabs.tab4">
        <DateInputString  label="报备日期" source="Platform_baseInfoVehicle.RegisterDate" validate={[required]}/>
        <ReferenceInput label="运价类型"  source="Platform_baseInfoVehicle.FareType" reference="faretype" allowEmpty validate={[required]}>
           <SelectInput optionText="registertype" />
        </ReferenceInput>
        </FormTab>
        </TabbedForm>
      </Edit>);

};


const MycarList = (props) => (//
     <List title="驾驶员车辆信息列表" {...props} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <ReferenceField label="司机" source="creator" reference="userdriver" >
          <TextField source="username" />
        </ReferenceField>
        <ReferenceField label="平台车辆信息" source="Platform_baseInfoVehicleId" reference="baseinfovehicle" allowEmpty>
          <TextField source="id" />
        </ReferenceField>
        <DateField label="新建时间" source="created_at"  showTime/>
        <TextField label="审批状态"  source="approvalstatus" />
        <ApproveButton style={{ padding: 0 }}  label="审批"/>
        <EditButton style={{ padding: 0 }} />
        </Datagrid>
    </List>
);


export  {MycarList,MycarEdit};
