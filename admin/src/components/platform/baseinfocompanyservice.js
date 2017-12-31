import React from 'react';
import {
    BooleanInput,
    Datagrid,
    DateField,
    required,
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
    Create,
    SimpleForm
} from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';
import {DateInputString} from '../controls/DateInput_String.js';

import ShowPageOne from '../singledocumentpage/index.js';


import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';


const BaseInfoCompanyServiceTitle = ({ record }) => <span>服务机构信息</span>;


const BaseInfoCompanyServiceCreate = (props) => (
    <Create {...props} title={<BaseInfoCompanyServiceTitle />}>
        <SimpleForm>
            <NumberInputEx label="行政区划代码"  source="Address" validate={[required]}/>
            <TextInputEx label="服务机构名称"  source="ServiceName" validate={[required]}/>
            <TextInputEx label="服务机构代码"  source="ServiceNo" validate={[required]}/>
            <TextInputEx label="服务机构地址"  source="DetailAddress" validate={[required]}/>
            <TextInputEx label="服务机构负责人姓名"  source="ResponsibleName" validate={[required]}/>
            <TextInputEx label="负责人联系电话"  source="ResponsiblePhone" validate={[required]}/>
            <TextInputEx label="服务机构管理人姓名"  source="ManagerName" validate={[required]}/>
            <TextInputEx label="管理人联系电话"  source="ManagerPhone" validate={[required]}/>
            <TextInputEx label="服务机构紧急联系电话"  source="ContactPhone" />
            <TextInputEx label="行政文书送达邮寄地址"  source="MailAddress" validate={[required]}/>
            <BooleanInput label="是否失效(0有效1失效)" source="State" defaultValue={false} />
            <DateInputString label="服务机构设立日期"  source="CreateDate" validate={[required]}/>
        </SimpleForm>
    </Create>
);


 const BaseInfoCompanyServiceEdit = (props) => (
    <EditPage {...props} title={<BaseInfoCompanyServiceTitle />}>
        <SimpleForm>
            <NumberInputEx label="行政区划代码"  source="Address" validate={[required]}/>
            <TextInputEx label="服务机构名称"  source="ServiceName" validate={[required]}/>
            <TextInputEx label="服务机构代码"  source="ServiceNo" validate={[required]}/>
            <TextInputEx label="服务机构地址"  source="DetailAddress" validate={[required]}/>
            <TextInputEx label="服务机构负责人姓名"  source="ResponsibleName" validate={[required]}/>
            <TextInputEx label="负责人联系电话"  source="ResponsiblePhone" validate={[required]}/>
            <TextInputEx label="服务机构管理人姓名"  source="ManagerName" validate={[required]}/>
            <TextInputEx label="管理人联系电话"  source="ManagerPhone" validate={[required]}/>
            <TextInputEx label="服务机构紧急联系电话"  source="ContactPhone" />
            <TextInputEx label="行政文书送达邮寄地址"  source="MailAddress" validate={[required]}/>
            <DateInputString label="服务机构设立日期"  source="CreateDate" validate={[required]}/>
            <BooleanInput label="是否失效(0有效1失效)" source="State" defaultValue={false} />
            <TextField label="操作标识" source="Flag"  />
            <TextField label="数据更新时间" source="UpdateTime"  />
        </SimpleForm>
    </EditPage>
);

export const BaseInfoCompanyServiceList = props => (
    <ShowPageOne Create={BaseInfoCompanyServiceCreate} Edit={BaseInfoCompanyServiceEdit} {...props}/>
);
