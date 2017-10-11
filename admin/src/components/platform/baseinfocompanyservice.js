import React from 'react';
import {
    Datagrid,
    DateField,
    DateInput,
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
    Edit as EditPage,
    Show as ShowPage,
    SimpleForm
} from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';

import ShowPageOne from '../controls/singlelistpage.js';

import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';


const BaseInfoCompanyServiceTitle = ({ record }) => <span>服务机构信息</span>;
const BaseInfoCompanyServiceShow = (props) => (
       <ShowPage title={<BaseInfoCompanyServiceTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="公司标识"  source="Companyld" />
           <TextField label="行政区划代码"  source="Address" />
           <TextField label="服务机构名称"  source="ServiceName" />
           <TextField label="服务机构代码"  source="ServiceNo" />
           <TextField label="服务机构地址"  source="DetailAddress" />
           <TextField label="服务机构负责人姓名"  source="ResponsibleName" />
           <TextField label="负责人联系电话"  source="ResponsiblePhone" />
           <TextField label="服务机构管理人姓名"  source="ManagerName" />
           <TextField label="管理人联系电话"  source="ManagerPhone" />
           <TextField label="服务机构紧急联系电话"  source="ContactPhone" />
           <TextField label="行政文书送达邮寄地址"  source="MailAddress" />
           <DateField label="服务机构设立日期"  source="CreateDate" />
           <TextField label="状态"  source="State" />
           <DateField label="数据更新时间" source="UpdateTime" showTime />
           </SimpleShowLayout>
       </ShowPage>
);

export {BaseInfoCompanyServiceShow};
export const BaseInfoCompanyServiceList = props => (
    <ShowPageOne resource={props.resource} location={props.location} ShowPage={BaseInfoCompanyServiceShow}  hasEdit={true}/>
);


export const BaseInfoCompanyServiceEdit = (props) => (
    <EditPage {...props} title={<BaseInfoCompanyServiceTitle />}>
        <SimpleForm>
            <DisabledInputEx label="公司名称" source="CompanyName" />
            <DisabledInputEx label="公司标识"  source="Companyld" />
            <TextInputEx label="行政区划代码"  source="Address" />
            <TextInputEx label="服务机构名称"  source="ServiceName" />
            <TextInputEx label="服务机构代码"  source="ServiceNo" />
            <TextInputEx label="服务机构地址"  source="DetailAddress" />
            <TextInputEx label="服务机构负责人姓名"  source="ResponsibleName" />
            <TextInputEx label="负责人联系电话"  source="ResponsiblePhone" />
            <TextInputEx label="服务机构管理人姓名"  source="ManagerName" />
            <TextInputEx label="管理人联系电话"  source="ManagerPhone" />
            <TextInputEx label="服务机构紧急联系电话"  source="ContactPhone" />
            <TextInputEx label="行政文书送达邮寄地址"  source="MailAddress" />
            <DateInput label="服务机构设立日期"  source="CreateDate" />
        </SimpleForm>
    </EditPage>
);
