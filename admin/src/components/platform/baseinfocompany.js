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
    BooleanInput,
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

import ShowPageOne from '../singledocumentpage/index.js';

// import ShowPage from '../controls/ShowPage.js';
// import EditPage from '../controls/EditPage.js';
import {ImageInputUpload} from '../controls/imageupload.js';
import {Titlewithimage} from '../controls/Titlewithimage';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
const required = value => value ? undefined : '必需';

const BaseInfoCompanyCreate = (props) => (
       <Create {...props} title='resources.baseinfocompany.editpagename' >
       <SimpleForm>
           <TextInputEx  label="公司标识" source="CompanyId" validate={[required]}/>
           <TextInputEx  label="公司名称" source="CompanyName"  validate={[required]}/>
           <TextInputEx  label="统一社会信用代码" source="Identifier"  validate={[required]}/>
           <NumberInputEx  label="数字型注册地行政区划代码" source="Address"  validate={[required]}/>
           <TextInputEx label="经营范围（按照网络预约出租汽车经营许可证内容）"  source="BusinessScope" validate={[required]}/>
           <TextInputEx label="通信地址全称"  source="ContactAddress"  validate={[required]}/>
           <TextInputEx label="经营业户经济类型"  source="EconomicType"  validate={[required]}/>
           <TextInputEx label="注册资本（按照营业执照内容填写）"  source="RegCapital"  validate={[required]}/>
           <TextInputEx label="法人代表姓名（按照营业执照内容填写）"  source="LegalName"  validate={[required]}/>
           <TextInputEx label="法人代表身份证号"  source="LegalID"  validate={[required]}/>
           <TextInputEx label="法人代表电话"  source="LegalPhone"  validate={[required]}/>
           <ImageInputUpload label="法人代表电话法人代表身份证扫描号"  source="LegalPhotoURL" />
           <BooleanInput label="是否失效(0有效1失效)" source="State" defaultValue={false} />
       </SimpleForm>
       </Create>
);

 const BaseInfoCompanyEdit = (props) => (
    <EditPage {...props} title='resources.baseinfocompany.editpagename'>
        <SimpleForm>
            <TextInputEx  label="公司标识" source="CompanyId" validate={[required]}/>
            <TextInputEx  label="公司名称" source="CompanyName" validate={[required]}/>
            <TextInputEx  label="统一社会信用代码" source="Identifier" validate={[required]}/>
            <NumberInputEx  label="数字型注册地行政区划代码" source="Address"  validate={[required]}/>
            <TextInputEx label="经营范围（按照网络预约出租汽车经营许可证内容）"  source="BusinessScope" validate={[required]}/>
            <TextInputEx label="通信地址全称"  source="ContactAddress" validate={[required]}/>
            <TextInputEx label="经营业户经济类型"  source="EconomicType" validate={[required]}/>
            <TextInputEx label="注册资本（按照营业执照内容填写）"  source="RegCapital" validate={[required]}/>
            <TextInputEx label="法人代表姓名（按照营业执照内容填写）"  source="LegalName" validate={[required]}/>
            <TextInputEx label="法人代表身份证号"  source="LegalID" validate={[required]}/>
            <TextInputEx label="法人代表电话"  source="LegalPhone" validate={[required]}/>
            <ImageInputUpload label="法人代表电话法人代表身份证扫描号"  source="LegalPhotoURL" />
            <BooleanInput label="是否失效(0有效1失效)" source="State" defaultValue={false} />
            <TextField label="操作标识" source="Flag"  />
            <TextField label="数据更新时间" source="UpdateTime" />
        </SimpleForm>
    </EditPage>
);

export const BaseInfoCompanyList = props => (
    <ShowPageOne Edit={BaseInfoCompanyEdit} Create={BaseInfoCompanyCreate}
    {...props}/>
);
