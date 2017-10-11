import React from 'react';
import {
    Datagrid,
    DateField,
    DisabledInput,
    EditButton,
    Filter,
    FormTab,
    List,
    NumberInput,
    ReferenceInput,
    ReferenceManyField,
    RichTextField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    SimpleShowLayout,
    Create,
    Edit as EditPage,
    Show as ShowPage,
    SimpleForm
} from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';

import ShowPageOne from '../controls/singlelistpage.js';
// import ShowPage from '../controls/ShowPage.js';
// import EditPage from '../controls/EditPage.js';
import {ImageInputUpload} from '../controls/imageupload.js';
import {Titlewithimage} from '../controls/Titlewithimage';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';

const BaseInfoCompanyShow = (props) => (
       <ShowPage title='resources.baseinfocompany.showpagename' {...props}>
           <SimpleShowLayout>
           <TextField label="公司标识"  source="Companyld" />
           <TextField label="公司名称"  source="CompanyName" />
           <TextField label="统一社会信用代码"  source="Identifier" />
           <TextField label="数字型注册地行政区划代码"  source="Address" />
           <TextField label="经营范围（按照网络预约出租汽车经营许可证内容）"  source="BusinessScope" />
           <TextField label="通信地址全称"  source="ContactAddress" />
           <TextField label="经营业户经济类型"  source="EconomicType" />
           <TextField label="注册资本（按照营业执照内容填写）"  source="RegCapital" />
           <TextField label="法人代表姓名（按照营业执照内容填写）"  source="LegalName" />
           <TextField label="法人代表身份证号"  source="LegalID" />
           <TextField label="法人代表电话"  source="LegalPhone" />
           <Titlewithimage label="法人代表" icon="LegalPhotoURL" name="LegalName" addLabel={true}/>
           <TextField label="状态"  source="State" />
           <DateField label="数据更新时间" source="UpdateTime" showTime />
           </SimpleShowLayout>
       </ShowPage>
);

export {BaseInfoCompanyShow};
export const BaseInfoCompanyList = props => (
    <ShowPageOne resource={props.resource} location={props.location}
    ShowPage={BaseInfoCompanyShow}  hasEdit={true}/>
);


export const BaseInfoCompanyCreate = (props) => (
       <Create {...props} title='resources.baseinfocompany.editpagename' >
       <SimpleForm>
           <TextInputEx  label="公司标识" source="Companyld" />
           <TextInputEx  label="公司名称" source="CompanyName" />
           <TextInputEx  label="统一社会信用代码" source="Identifier" />
           <SelectInput elStyle={{width:'100%'}} label="数字型注册地行政区划代码(仅选择,程序会自动匹配)"  source="Address" choices={[
             { id:110000, name: '北京市' },
             { id:120000, name: '天津市' },
             { id:130000, name: '河北省' },
             { id:140000, name: '山西省' },
             { id:150000, name: '内蒙古自治区' },
             { id:210000, name: '辽宁省' },
             { id:220000, name: '吉林省' },
             { id:230000, name: '黑龙江省' },
             { id:310000, name: '上海市' },
             { id:320000, name: '江苏省' },
             { id:330000, name: '浙江省' },
             { id:340000, name: '安徽省' },
             { id:350000, name: '福建省' },
             { id:360000, name: '江西省' },
             { id:370000, name: '山东省' },
             { id:410000, name: '河南省' },
             { id:420000, name: '湖北省' },
             { id:430000, name: '湖南省' },
             { id:440000, name: '广东省' },
             { id:450000, name: '广西壮族自治区' },
             { id:460000, name: '海南省' },
             { id:500000, name: '重庆市' },
             { id:510000, name: '四川省' },
             { id:520000, name: '贵州省' },
             { id:530000, name: '云南省' },
             { id:540000, name: '西藏自治区' },
             { id:610000, name: '陕西省' },
             { id:620000, name: '甘肃省' },
             { id:630000, name: '青海省' },
             { id:640000, name: '宁夏回族自治区' },
             { id:650000, name: '新疆维吾尔自治区' },
           ]} />
           <TextInputEx label="经营范围（按照网络预约出租汽车经营许可证内容）"  source="BusinessScope"/>
           <TextInputEx label="通信地址全称"  source="ContactAddress" />
           <TextInputEx label="经营业户经济类型"  source="EconomicType" />
           <TextInputEx label="注册资本（按照营业执照内容填写）"  source="RegCapital" />
           <TextInputEx label="法人代表姓名（按照营业执照内容填写）"  source="LegalName" />
           <TextInputEx label="法人代表身份证号"  source="LegalID" />
           <TextInputEx label="法人代表电话"  source="LegalPhone" />
           <ImageInputUpload label="法人代表电话法人代表身份证扫描号"  source="LegalPhotoURL" />
           <DisabledInputEx label="状态"  source="State" />
           <DateField label="数据更新时间" source="UpdateTime" showTime />
       </SimpleForm>
       </Create>
);

export const BaseInfoCompanyEdit = (props) => (
    <EditPage {...props} title='resources.baseinfocompany.editpagename'>
        <SimpleForm>
            <TextInputEx  label="公司标识" source="Companyld" />
            <TextInputEx  label="公司名称" source="CompanyName" />
            <TextInputEx  label="统一社会信用代码" source="Identifier" />
            <SelectInput elStyle={{width:'100%'}} label="数字型注册地行政区划代码(仅选择,程序会自动匹配)"  source="Address" choices={[
              { id:110000, name: '北京市' },
              { id:120000, name: '天津市' },
              { id:130000, name: '河北省' },
              { id:140000, name: '山西省' },
              { id:150000, name: '内蒙古自治区' },
              { id:210000, name: '辽宁省' },
              { id:220000, name: '吉林省' },
              { id:230000, name: '黑龙江省' },
              { id:310000, name: '上海市' },
              { id:320000, name: '江苏省' },
              { id:330000, name: '浙江省' },
              { id:340000, name: '安徽省' },
              { id:350000, name: '福建省' },
              { id:360000, name: '江西省' },
              { id:370000, name: '山东省' },
              { id:410000, name: '河南省' },
              { id:420000, name: '湖北省' },
              { id:430000, name: '湖南省' },
              { id:440000, name: '广东省' },
              { id:450000, name: '广西壮族自治区' },
              { id:460000, name: '海南省' },
              { id:500000, name: '重庆市' },
              { id:510000, name: '四川省' },
              { id:520000, name: '贵州省' },
              { id:530000, name: '云南省' },
              { id:540000, name: '西藏自治区' },
              { id:610000, name: '陕西省' },
              { id:620000, name: '甘肃省' },
              { id:630000, name: '青海省' },
              { id:640000, name: '宁夏回族自治区' },
              { id:650000, name: '新疆维吾尔自治区' },
            ]} />
            <TextInputEx label="经营范围（按照网络预约出租汽车经营许可证内容）"  source="BusinessScope"/>
            <TextInputEx label="通信地址全称"  source="ContactAddress" />
            <TextInputEx label="经营业户经济类型"  source="EconomicType" />
            <TextInputEx label="注册资本（按照营业执照内容填写）"  source="RegCapital" />
            <TextInputEx label="法人代表姓名（按照营业执照内容填写）"  source="LegalName" />
            <TextInputEx label="法人代表身份证号"  source="LegalID" />
            <TextInputEx label="法人代表电话"  source="LegalPhone" />
            <ImageInputUpload label="法人代表电话法人代表身份证扫描号"  source="LegalPhotoURL" />
            <DisabledInputEx label="状态"  source="State" />
            <DateField label="数据更新时间" source="UpdateTime" showTime />
        </SimpleForm>
    </EditPage>
);
