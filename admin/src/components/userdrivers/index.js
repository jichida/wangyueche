import React from 'react';

import {
  NumberInput,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  List,
  SimpleShowLayout,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  BooleanInput,
  TabbedForm,
  FormTab,
  Filter,
  SelectInput,
  ImageField,
  ReferenceInput,
  ReferenceField
 } from 'admin-on-rest/lib/mui';

import ApproveButton from './btn';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
import {ImageInputUpload} from '../controls/imageupload.js';
import {DateInputString} from '../controls/DateInput_String.js';
import {required} from 'admin-on-rest';

const UserdriverlistTitle = ({ record }) => {
   return <span>显示 司机</span>;
};

export const UserdriverFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索用户" source="username_q" />
    </Filter>
);

const UserdriverTitle = ({ record }) => {
   return <span>司机</span>;
};

const validateDriverEdit = (values) => {
    const errors = {};
    if(!!values.Platform_baseInfoDriver){
      if (!values.Platform_baseInfoDriver.DriverName) {
          errors.Platform_baseInfoDriver = {};
          errors.Platform_baseInfoDriver.DriverName = ['司机姓名必填'];
      }
      if (!values.Platform_baseInfoDriver.DriverPhone) {
          if(!errors.Platform_baseInfoDriver){
            errors.Platform_baseInfoDriver = {};
          };
          errors.Platform_baseInfoDriver.DriverPhone = ['司机手机号必填'];
      }
    }

    return errors
};


const UserdriverlistEdit = (props) => {
      return (<Edit title={<UserdriverTitle />} {...props}>
        <TabbedForm validate={validateDriverEdit}>
            <FormTab label="resources.userdriver.tabs.basicinfo">
              <TextField label="Id" source="id" />
              <TextField label="手机号"  source="username" />
              <SelectInput  label="注册类型"  source="registertype" choices={[
                  { id: '出租车', name: '出租车' },
                  { id: '快车', name: '快车' },
                  { id: '代驾', name: '代驾' },
              ]} />
              <TextField label="身份证号"  source="idcard" />
              <TextField label="银行名字"  source="bankname" />
              <TextField label="银行账号"  source="bankaccount" />
              <TextField label="户籍"  source="huji" />
              <TextField label="余额"  source="balance" />

              <TextField label="注册时间" source="created_at"  />
              <TextField label="上次登录时间" source="updated_at"  />
              <ReferenceField label="默认车辆(至少应有一辆,否则不要审批通过)" source="defaultmycar" reference="mycar" allowEmpty addLabel={true}>
                <TextField source="id" />
              </ReferenceField>
              <ReferenceField label="平台关联司机" source="Platform_baseInfoDriverId" reference="baseinfodriver" allowEmpty addLabel={true}>
                <TextField source="DriverName" />
              </ReferenceField>
              <NumberInputEx label="星级【设置为0,表示以系统计算为准,否则以该设置为准】" source="starnum" />
              <TextField label="余额" source="balance" />
              <TextInput label="拒绝理由" source="approvalrejectseason" />
              <SelectInput  label="审核状态"  source="approvalstatus" choices={[
                  { id: '未递交', name: '未递交资料' },
                  { id: '待审核', name: '待审核' },
                  { id: '审核中', name: '审核中' },
                  { id: '已审核', name: '已审核' },
                  { id: '已拒绝', name: '拒绝(填写拒绝理由)' },
              ]} />
              </FormTab>
              <FormTab label="resources.userdriver.tabs.picurls">
              <ImageInputUpload  label="司机头像【审核必填】" source="avatarURL" />
              <ImageInputUpload  label="人车合影" source="PhotoandCarmanURL" />
              <ImageInputUpload  label="监督卡照片" source="PhotoJiandukaURL" />
              <ImageInputUpload  label="服务资格证" source="PhotoServiceicenseURL" />
              <ImageInputUpload  label="机动车行驶证" source="CarrunPhotoIdURL" />
              </FormTab>
              <FormTab label="resources.userdriver.tabs.platformdriverinfo">
              <TextInput label="姓名【审核必填】" source="Platform_baseInfoDriver.DriverName" validate={[required]}/>
              <TextInput label="手机号【审核必填】" source="Platform_baseInfoDriver.DriverPhone" validate={[required]}/>
              <TextInput label="性别" source="Platform_baseInfoDriver.DriverGender" />
              <DateInputString label="生日" source="Platform_baseInfoDriver.DriverBirthday" validate={[required]}/>
              <TextInput label="国籍" source="Platform_baseInfoDriver.DriverNationality" />
              <TextInput label="民族" source="Platform_baseInfoDriver.DriverNation" validate={[required]}/>
              <SelectInput  label="婚姻状况"  source="Platform_baseInfoDriver.DriverMaritalStatus" choices={[
                  { id: '未婚', name: '未婚' },
                  { id: '已婚', name: '已婚' },
                  { id: '离异', name: '离异' },
              ]} />
              <TextInput label="外语能力" source="Platform_baseInfoDriver.DriverLanguageLevel" />
              <TextInput label="学历" source="Platform_baseInfoDriver.DriverEducation" />
              </FormTab>
              <FormTab label="resources.userdriver.tabs.platformhukou">
              <TextInput label="户口登记机关名称" source="Platform_baseInfoDriver.DriverCensus" />
              <TextInput label="户口住址或长住地址" source="Platform_baseInfoDriver.DriverAddress" />
              <TextInput label="驾驶员通信地址" source="Platform_baseInfoDriver.DriverContactAddress" validate={[required]}/>
              <ImageField  label="驾驶员照片"  source="Platform_baseInfoDriver.PhotoIdURL" addLabel={true}/>
              <TextInput label="机动车驾驶证号【审核必填】" source="Platform_baseInfoDriver.LicenseId" />
              <ImageField  label="机动车驾驶证扫描件" source="Platform_baseInfoDriver.LicensePhotoIdURL" addLabel={true} validate={[required]}/>
              <TextInput label="准驾车型" source="Platform_baseInfoDriver.DriverType" />
              <DateInputString label="初次领取驾驶证日期" source="Platform_baseInfoDriver.GetDriverLicenseDate" validate={[required]}/>
              <DateInputString label="驾驶证有效期限起" source="Platform_baseInfoDriver.DriverLicenseOn" validate={[required]}/>
              <DateInputString label="驾驶证有效期限止" source="Platform_baseInfoDriver.DriverLicenseOff" validate={[required]}/>
              </FormTab>
              <FormTab label="resources.userdriver.tabs.platformtaxi">
              <BooleanInput label="是否出租汽车驾驶员" source="Platform_baseInfoDriver.TaxiDriver" defaultValue={false} validate={[required]}/>
              <TextInput label="网络预约出租汽车驾驶员资格证号" source="Platform_baseInfoDriver.CertificateNo" validate={[required]}/>
              <TextInput label="网络预约出租汽车驾驶员证发证机构" source="Platform_baseInfoDriver.NetworkCarIssueOrganization" validate={[required]}/>
              <DateInputString label="资格证发证日期" source="Platform_baseInfoDriver.NetworkCarIssueDate" validate={[required]}/>
              <DateInputString label="初次领取资格证日期" source="Platform_baseInfoDriver.GetNetworkCarProofDate" validate={[required]}/>
              <DateInputString label="资格证有效起始日期" source="Platform_baseInfoDriver.NetworkCarProofOn" validate={[required]}/>
              <DateInputString label="资格证有效截止日期" source="Platform_baseInfoDriver.NetworkCarProofOff" validate={[required]}/>
              <DateInputString label="报备日期" source="Platform_baseInfoDriver.RegisterDate" validate={[required]}/>
              </FormTab>
              <FormTab label="resources.userdriver.tabs.platformcontract">
              <BooleanInput label="是否专职驾驶员" source="Platform_baseInfoDriver.FullTimeDriver" defaultValue={true} />
              <BooleanInput label="是否在驾驶员黑名单内" source="Platform_baseInfoDriver.InDriverBlacklist" defaultValue={false} />
              <SelectInput  label="服务类型"  source="Platform_baseInfoDriver.CommercialType" choices={[
                  { id: 1, name: '网络预约出租汽车' },
                  { id: 2, name: '巡游出租汽车' },
                  { id: 3, name: '私人小客车合乘' },
              ]} validate={[required]}/>
              <TextInput label="签署公司全称" source="Platform_baseInfoDriver.ContractCompany"  validate={[required]}/>
              <DateInputString label="合同或协议)有效期起" source="Platform_baseInfoDriver.ContractOn"  validate={[required]}/>
              <DateInputString label="合同(或协议)有效期止 " source="Platform_baseInfoDriver.ContractOff"  validate={[required]}/>
              </FormTab>
              <FormTab label="resources.userdriver.tabs.platformemergencycontact">
              <TextInput label="紧急情况联系人" source="Platform_baseInfoDriver.EmergencyContact" />
              <TextInput label="紧急情况联系人电话手机号" source="Platform_baseInfoDriver.EmergencyContactPhone" />
              <TextInput label="紧急情况联系人通信地址" source="Platform_baseInfoDriver.EmergencyContactAddress" />
              </FormTab>
              <FormTab label="resources.userdriver.tabs.vehicle">
              <NumberInputEx  label="注册行政区域代码" source="Platform_baseInfoVehicle.Address" validate={[required]}/>
              <TextInputEx  label="车辆号牌【审核必填】" source="Platform_baseInfoVehicle.VehicleNo"  validate={[required]}/>
              <TextInputEx  label="车辆颜色【审核必填】" source="Platform_baseInfoVehicle.PlateColor"  validate={[required]}/>
              <NumberInputEx  label="核定载客位" source="Platform_baseInfoVehicle.Seats"  validate={[required]}/>
              <TextInputEx  label="车辆厂牌【审核必填】" source="Platform_baseInfoVehicle.Brand"  validate={[required]}/>
              <TextInputEx  label="车辆型号【审核必填】" source="Platform_baseInfoVehicle.Model"  validate={[required]}/>
              <TextInputEx  label="车辆类型" source="Platform_baseInfoVehicle.VehicleType"  validate={[required]}/>
              <TextInputEx  label="车辆所有人(应与《机动车登记证书》所注明的车辆所有人一致)" source="Platform_baseInfoVehicle.OwnerName"  validate={[required]}/>
              <TextInputEx  label="车身颜色" source="Platform_baseInfoVehicle.VehicleColor"  validate={[required]}/>
              <SelectInput  label="服务类型"  source="Platform_baseInfoVehicle.CommercialType" choices={[
                  { id: 1, name: '网络预约出租汽车' },
                  { id: 2, name: '巡游出租汽车' },
                  { id: 3, name: '私人小客车合乘' },
              ]} validate={[required]}/>
              <TextInputEx  label="发动机号(以机动车行驶证为准)" source="Platform_baseInfoVehicle.EngineId"  validate={[required]}/>
              <TextInputEx  label="车辆VIN码(以机动车行驶证为准)" source="Platform_baseInfoVehicle.VIN"  validate={[required]}/>
              <DateInputString  label="车辆注册日期(以机动车行驶证为准)" source="Platform_baseInfoVehicle.CertifyDateA"  validate={[required]}/>
              <TextInputEx  label="牢辆燃料类型" source="Platform_baseInfoVehicle.FuelType"  validate={[required]}/>
              <TextInputEx  label="发动机排量" source="Platform_baseInfoVehicle.EngineDisplace"  validate={[required]}/>

              <ImageInputUpload  label="车辆照片" source="Platform_baseInfoVehicle.PhotoIdURL" />
              <TextInputEx  label="运输证字号" source="Platform_baseInfoVehicle.Certificate" />
              <TextInputEx  label="车辆运输证发证机构" source="Platform_baseInfoVehicle.TransAgency"  validate={[required]}/>
              <TextInputEx  label="车辆经营区域" source="Platform_baseInfoVehicle.TransArea"  validate={[required]}/>
              <DateInputString  label="车辆运输证有效期起" source="Platform_baseInfoVehicle.TransDateStart"  validate={[required]}/>
              <DateInputString  label="车辆运输证有效期止" source="Platform_baseInfoVehicle.TransDateStop"  validate={[required]}/>
              <DateInputString  label="车辆初次登记日期" source="Platform_baseInfoVehicle.CertifyDateB"  validate={[required]}/>
              <SelectInput  label="车辆检修状态"  source="Platform_baseInfoVehicle.FixState" choices={[
                  { id: 0, name: '未检修' },
                  { id: 1, name: '已检修' },
                  { id: 2, name: '未知' },
              ]}  validate={[required]}/>
              <DateInputString  label="车辆下次年检时间" source="Platform_baseInfoVehicle.NextFixDate" />
              <TextInputEx  label="车辆年度审验状态" source="Platform_baseInfoVehicle.CheckState"  validate={[required]}/>
              <TextInputEx  label="发票打印设备序列号" source="Platform_baseInfoVehicle.FeePrintId"  validate={[required]}/>

              <TextInputEx  label="卫星定位装置品牌" source="Platform_baseInfoVehicle.GPSBrand"  validate={[required]}/>
              <TextInputEx  label="卫星定位装置型号" source="Platform_baseInfoVehicle.GPSModel"  validate={[required]}/>
              <TextInputEx  label="卫星定位装置IMEI号" source="Platform_baseInfoVehicle.GPSIMEI" />
              <DateInputString  label="卫星定位设备安装日期" source="Platform_baseInfoVehicle.GPSlnstallDate"  validate={[required]}/>
              <DateInputString  label="报备日期" source="Platform_baseInfoVehicle.RegisterDate"  validate={[required]}/>
              <ReferenceInput label="运价" reference="faretype" source="Platform_baseInfoVehicle.FareType" allowEmpty>
                    <SelectInput optionText="registertype" />
              </ReferenceInput>
              </FormTab>
        </TabbedForm>
      </Edit>);

};


const UserdriverlistList = (props) => (//
     <List title="司机列表" {...props} filters={<UserdriverFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <TextField label="手机号" source="username" />
        <DateField label="注册时间" source="created_at"  showTime/>
        <DateField label="上次登录时间" source="updated_at"  showTime/>
        <TextField label="审批状态"  source="approvalstatus" />
        <ApproveButton style={{ padding: 0 }}  label="审批"/>
        <EditButton style={{ padding: 0 }} />
        </Datagrid>
    </List>
);


export  {UserdriverlistList,UserdriverlistEdit};
