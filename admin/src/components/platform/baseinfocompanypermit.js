import React from 'react';
import {
    BooleanInput,
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
    Create,
    SimpleForm
} from 'admin-on-rest/lib/mui';
import {required} from 'admin-on-rest';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';
import {DateInputString} from '../controls/DateInput_String.js';

import ShowPageOne from '../singledocumentpage/index.js';

import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';


const BaseInfoCompanyPermitTitle = ({ record }) => <span>经营许可信息</span>;

 const BaseInfoCompanyPermitCreate = (props) => (
    <Create {...props} title={<BaseInfoCompanyPermitTitle />}>
        <SimpleForm>
            <NumberInputEx label="行政区划代码"  source="Address" validate={[required]}/>
            <TextInputEx label="网络预约出租汽车经营许可证号"  source="Certificate" validate={[required]}/>
            <TextInputEx label="经营区域"  source="OperationArea" validate={[required]}/>
            <TextInputEx label="公司名称"  source="OwnerName" validate={[required]}/>
            <TextInputEx label="发证机构名称"  source="Organization" validate={[required]}/>
            <DateInputString label="有效期起" source="StartDate" validate={[required]}/>
            <DateInputString label="有效期止" source="StopDate" validate={[required]} />
            <DateInputString label="初次发证日期" source="CertifyDate" validate={[required]}/>
        </SimpleForm>
    </Create>
);

 const BaseInfoCompanyPermitEdit = (props) => (
    <EditPage {...props} title={<BaseInfoCompanyPermitTitle />}>
        <SimpleForm>
            <NumberInputEx label="行政区划代码"  source="Address" validate={[required]}/>
            <TextInputEx label="网络预约出租汽车经营许可证号"  source="Certificate" validate={[required]}/>
            <TextInputEx label="经营区域"  source="OperationArea" validate={[required]}/>
            <TextInputEx label="公司名称"  source="OwnerName" validate={[required]}/>
            <TextInputEx label="发证机构名称"  source="Organization" validate={[required]}/>
            <DateInputString label="有效期起" source="StartDate" validate={[required]}/>
            <DateInputString label="有效期止" source="StopDate" validate={[required]}/>
            <DateInputString label="初次发证日期" source="CertifyDate" validate={[required]}/>
            <BooleanInput label="是否失效(0有效1失效)" source="State" defaultValue={false} />
            <TextField label="操作标识" source="Flag"  />
            <TextField label="数据更新时间" source="UpdateTime"  />
        </SimpleForm>
    </EditPage>
);


export const BaseInfoCompanyPermitList = props => (
    <ShowPageOne Create={BaseInfoCompanyPermitCreate} Edit={BaseInfoCompanyPermitEdit} {...props}/>
);
