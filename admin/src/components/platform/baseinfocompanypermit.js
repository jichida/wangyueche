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


const BaseInfoCompanyPermitTitle = ({ record }) => <span>经营许可信息</span>;
const BaseInfoCompanyPermitShow = (props) => (
       <ShowPage title={<BaseInfoCompanyPermitTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="公司标识"  source="Companyld" />
           <TextField label="行政区划代码"  source="Address" />
           <TextField label="网络预约出租汽车经营许可证号"  source="Certificate" />
           <TextField label="经营区域"  source="OperationArea" />
           <TextField label="公司名称"  source="OwnerName" />
           <TextField label="发证机构名称"  source="Organization" />
           <DateField label="有效期起" source="StartDate" />
           <DateField label="有效期止" source="StopDate" />
           <DateField label="初次发证日期" source="CertifyDate" />
           <TextField label="状态"  source="State" />
           <DateField label="数据更新时间" source="UpdateTime" showTime />
           </SimpleShowLayout>
       </ShowPage>
);

export {BaseInfoCompanyPermitShow};
export const BaseInfoCompanyPermitList = props => (
    <ShowPageOne resource={props.resource} location={props.location}
    ShowPage={BaseInfoCompanyPermitShow}  hasEdit={true}/>
);

export const BaseInfoCompanyPermitCreate = (props) => (
    <EditPage {...props} title={<BaseInfoCompanyPermitTitle />}>
        <SimpleForm>
            <DisabledInputEx  label="公司名称" source="CompanyName" />
            <TextInputEx label="行政区划代码"  source="Address" />
            <TextInputEx label="网络预约出租汽车经营许可证号"  source="Certificate" />
            <TextInputEx label="经营区域"  source="OperationArea" />
            <TextInputEx label="公司名称"  source="OwnerName" />
            <TextInputEx label="发证机构名称"  source="Organization" />
            <DateInput label="有效期起" source="StartDate" />
            <DateInput label="有效期止" source="StopDate" />
            <DateInput label="初次发证日期" source="CertifyDate" />
            <DisabledInputEx label="状态"  source="State" />
            <DateField label="数据更新时间" source="UpdateTime" showTime />
        </SimpleForm>
    </EditPage>
);

export const BaseInfoCompanyPermitEdit = (props) => (
    <EditPage {...props} title={<BaseInfoCompanyPermitTitle />}>
        <SimpleForm>
            <DisabledInputEx  label="公司名称" source="CompanyName" />
            <TextInputEx label="行政区划代码"  source="Address" />
            <TextInputEx label="网络预约出租汽车经营许可证号"  source="Certificate" />
            <TextInputEx label="经营区域"  source="OperationArea" />
            <TextInputEx label="公司名称"  source="OwnerName" />
            <TextInputEx label="发证机构名称"  source="Organization" />
            <DateInput label="有效期起" source="StartDate" />
            <DateInput label="有效期止" source="StopDate" />
            <DateInput label="初次发证日期" source="CertifyDate" />
            <DisabledInputEx label="状态"  source="State" />
            <DateField label="数据更新时间" source="UpdateTime" showTime />
        </SimpleForm>
    </EditPage>
);
