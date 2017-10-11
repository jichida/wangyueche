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

const BaseInfoDrivercreateTitle = ({ record }) => {
   return <span>新建 驾驶员信息</span>;
};
const BaseInfoDriverCreate = (props) => (
       <Create {...props} title={<BaseInfoDrivercreateTitle />} >
       <TabbedForm>
           <FormTab label="resources.baseinfodriver.tabs.tab0">
           <TextInputEx  label="机动车驾驶员姓名" source="DriverName" />
           <TextInputEx  label="驾驶员手机号" source="DriverPhone" />
           <SelectInput  label="驾驶员性别"  source="DriverGender" choices={[
               { id: '男', name: '男' },
               { id: '女', name: '女' },
           ]} />
           <DateInput label="出生日期" source="DriverBirthday" />
           <TextInputEx  label="国籍" source="DriverNationality" />
           <SelectInput  label="驾驶员婚姻状况"  source="DriverMaritalStatus" choices={[
               { id: '未婚', name: '未婚' },
               { id: '已婚', name: '已婚' },
               { id: '离异', name: '离异' },
           ]} />
           <TextInputEx label="驾驶员外语能力" source="DriverLanguageLevel" />
           <SelectInput  label="驾驶员学历"  source="DriverEducation" choices={[
               { id: '小学及以下', name: '小学及以下' },
               { id: '初中', name: '初中' },
               { id: '高中', name: '高中' },
               { id: '大专', name: '大专' },
               { id: '本科', name: '本科' },
               { id: '硕士', name: '硕士' },
               { id: '博士', name: '博士' },
           ]} />
           </FormTab>

           <FormTab label="resources.baseinfodriver.tabs.tab1">
           <TextInputEx  label="户口登记机关名称" source="DriverCensus" />
           <TextInputEx  label="户口住址或长住地址" source="DriverAddress" />
           <TextInputEx  label="驾驶员通信地址" source="DriverContactAddress" />
           <ImageInputUpload  label="驾驶员照片文件" source="PhotoldURL" />
           <TextInputEx  label="机动车驾驶证号" source="Licenseld" />
           <ImageInputUpload  label="机动车驾驶证扫描件文件" source="LicensePhotoldURL" />
           <DateInput label="初次领取驾驶证日期" source="GetDriverLicenseDate" />
           <DateInput label="驾驶证有效期限起" source="DriverLicenseOn" />
           <DateInput label="驾驶证有效期限止" source="DriverLicenseOff" />
           </FormTab>

           <FormTab label="resources.baseinfodriver.tabs.tab2">
           <BooleanInput  label="是否出租汽车驾驶员" source="TaxiDriver" />
           <TextInputEx  label="网络预约出租汽车驾驶员资格证号" source="CertificateNo" />
           <TextInputEx  label="网络预约出租汽车驾驶员证发证机构" source="NetworkCarIssueOrganization" />
           <DateInput  label="资格证发证日期" source="NetworkCarIssueDate" />
           <DateInput  label="初次领取资格证日期" source="GetNetworkCarProofDate" />
           <DateInput  label="资格证有效起始日期" source="NetworkCarProofOn" />
           <DateInput  label="资格证有效截止日期" source="NetworkCarProofOff" />
           <DateInput  label="报备日期" source="RegisterDate" />
           </FormTab>

           <FormTab label="resources.baseinfodriver.tabs.tab3">
           <BooleanInput  label="是否专职驾驶员" source="FullTimeDriver" />
           <BooleanInput  label="是否在驾驶员黑名单内" source="InDriverBlacklist" />
           <TextInputEx  label="驾驶员合同〈或协议〉签署公司全称" source="ContractCompany" />
           <DateInput  label="合同〈或协议〉有效期起" source="ContractOn" />
           <DateInput  label="合同〈或协议〉有效期止" source="ContractOff" />
           </FormTab>

           <FormTab label="resources.baseinfodriver.tabs.tab4">
           <TextInputEx  label="紧急情况联系人" source="EmergencyContact" />
           <TextInputEx  label="紧急情况联系人电话手机号" source="EmergencyContactPhone" />
           <TextInputEx  label="紧急情况联系人通信地址" source="EmergencyContactAddress" />
           </FormTab>

           </TabbedForm>
       </Create>
);

const BaseInfoDriverTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 驾驶员信息</span>;
};

const BaseInfoDriverEdit = (props) => {
      return (<Edit title={<BaseInfoDriverTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.baseinfodriver.tabs.tab0">
            <TextInputEx  label="机动车驾驶员姓名" source="DriverName" />
            <TextInputEx  label="驾驶员手机号" source="DriverPhone" />
            <SelectInput  label="驾驶员性别"  source="DriverGender" choices={[
                { id: '男', name: '男' },
                { id: '女', name: '女' },
            ]} />
            <DateInput label="出生日期" source="DriverBirthday" />
            <TextInputEx  label="国籍" source="DriverNationality" />
            <SelectInput  label="驾驶员婚姻状况"  source="DriverMaritalStatus" choices={[
                { id: '未婚', name: '未婚' },
                { id: '已婚', name: '已婚' },
                { id: '离异', name: '离异' },
            ]} />
            <TextInputEx label="驾驶员外语能力" source="DriverLanguageLevel" />
            <SelectInput  label="驾驶员学历"  source="DriverEducation" choices={[
                { id: '小学及以下', name: '小学及以下' },
                { id: '初中', name: '初中' },
                { id: '高中', name: '高中' },
                { id: '大专', name: '大专' },
                { id: '本科', name: '本科' },
                { id: '硕士', name: '硕士' },
                { id: '博士', name: '博士' },
            ]} />
            </FormTab>

            <FormTab label="resources.baseinfodriver.tabs.tab1">
            <TextInputEx  label="户口登记机关名称" source="DriverCensus" />
            <TextInputEx  label="户口住址或长住地址" source="DriverAddress" />
            <TextInputEx  label="驾驶员通信地址" source="DriverContactAddress" />
            <ImageInputUpload  label="驾驶员照片文件" source="PhotoldURL" />
            <TextInputEx  label="机动车驾驶证号" source="Licenseld" />
            <ImageInputUpload  label="机动车驾驶证扫描件文件" source="LicensePhotoldURL" />
            <DateInput label="初次领取驾驶证日期" source="GetDriverLicenseDate" />
            <DateInput label="驾驶证有效期限起" source="DriverLicenseOn" />
            <DateInput label="驾驶证有效期限止" source="DriverLicenseOff" />
            </FormTab>

            <FormTab label="resources.baseinfodriver.tabs.tab2">
            <BooleanInput  label="是否出租汽车驾驶员" source="TaxiDriver" />
            <TextInputEx  label="网络预约出租汽车驾驶员资格证号" source="CertificateNo" />
            <TextInputEx  label="网络预约出租汽车驾驶员证发证机构" source="NetworkCarIssueOrganization" />
            <DateInput  label="资格证发证日期" source="NetworkCarIssueDate" />
            <DateInput  label="初次领取资格证日期" source="GetNetworkCarProofDate" />
            <DateInput  label="资格证有效起始日期" source="NetworkCarProofOn" />
            <DateInput  label="资格证有效截止日期" source="NetworkCarProofOff" />
            <DateInput  label="报备日期" source="RegisterDate" />
            </FormTab>

            <FormTab label="resources.baseinfodriver.tabs.tab3">
            <BooleanInput  label="是否专职驾驶员" source="FullTimeDriver" />
            <BooleanInput  label="是否在驾驶员黑名单内" source="InDriverBlacklist" />
            <TextInputEx  label="驾驶员合同〈或协议〉签署公司全称" source="ContractCompany" />
            <DateInput  label="合同〈或协议〉有效期起" source="ContractOn" />
            <DateInput  label="合同〈或协议〉有效期止" source="ContractOff" />
            </FormTab>

            <FormTab label="resources.baseinfodriver.tabs.tab4">
            <TextInputEx  label="紧急情况联系人" source="EmergencyContact" />
            <TextInputEx  label="紧急情况联系人电话手机号" source="EmergencyContactPhone" />
            <TextInputEx  label="紧急情况联系人通信地址" source="EmergencyContactAddress" />
            </FormTab>

            </TabbedForm>
      </Edit>);

};



const BaseInfoDriverList = (props) => (//
     <List title="驾驶员信息列表" {...props} >
        <Datagrid>
        <TextField label="驾驶员姓名" source="DriverName" />
        <TextField label="驾驶员手机号"  source="DriverPhone" />
        <TextField label="性别"  source="DriverGender" />
        <DateField label="出生日期"  source="DriverBirthday" />
        <TextField label="婚姻状况" source="DriverMaritalStatus" />
        <TextField label="机动车驾驶证号" source="Licenseld" />
        <TextField label="准驾车型" source="DriverType" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {BaseInfoDriverList,BaseInfoDriverCreate,BaseInfoDriverEdit};
