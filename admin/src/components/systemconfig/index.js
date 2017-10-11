import React from 'react';
import {
    Datagrid,
    DateField,
    Create,
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
    SelectArrayInput,
    ChipField,
    Edit as EditPage,
    Show as ShowPage,
    SimpleForm,
} from 'admin-on-rest/lib/mui';

import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';
import {TextFieldSZ} from '../controls/tags';

import ShowPageOne from '../controls/singlelistpage.js';


const SystemconfigTitle = ({ record }) => <span>系统设置</span>;
const SystemconfigShow = (props) => (
       <ShowPage title={<SystemconfigTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextFieldSZ label="对司机的评价" source="commenttagsfordriver"  addLabel={true}/>
               <TextFieldSZ label="对乘客的评价" source="commenttagsforrider"  addLabel={true}/>
               <TextField label="最大显示评价数" source="maxshowtags" />
               <TextFieldSZ label="拼车城市列表" source="pinchecitylist" addLabel={true}/>
               <TextFieldSZ label="热门城市列表" source="hotcity" addLabel={true}/>
               <TextField label="司机抽成" source="platformdriverfeediscount" />
               <TextField label="代驾要求余额" source="daijialeastbalance" />
               <TextField label="代驾取消价格" source="daijiacancelprice" />
               <TextField label="客服电话" source="servicephonenumber" />
               <TextField label="未支付自动取消时间（单位分钟）" source="pinchetimecancelwhennotpaid" />
         </SimpleShowLayout>
       </ShowPage>
);

export {SystemconfigShow};
export const SystemconfigList = props => (
    <ShowPageOne resource={props.resource} location={props.location} ShowPage={SystemconfigShow} hasEdit={true}>
    </ShowPageOne>
);

const SystemconfigCreateTitle = ({ record }) => {
   return <span>新建 系统配置</span>;
};
export const SystemconfigCreate = (props) => (
       <Create {...props} title={<SystemconfigCreateTitle />} >
       <TabbedForm>
           <FormTab label="resources.systemconfig.tabs.sysconfig">
           <NumberInput label="司机抽成" source="platformdriverfeediscount"/>
           <NumberInput label="代驾要求余额" source="daijialeastbalance" />
           <NumberInput label="代驾取消价格" source="daijiacancelprice"/>
           <TextInput label="客服电话" source="servicephonenumber"/>
           </FormTab>
           <FormTab label="resources.systemconfig.tabs.pinche">
           <SelectArrayInput label="拼车城市列表" source="pinchecitylist"  options={{ fullWidth: true }}/>
           <NumberInput label="未支付自动取消时间（单位分钟）" source="pinchetimecancelwhennotpaid"/>
           </FormTab>
           <FormTab label="resources.systemconfig.tabs.rider">
           <SelectArrayInput label="对司机的评价" source="commenttagsfordriver" options={{ fullWidth: true }}/>
           <NumberInput label="最大显示评价数" source="maxshowtags"/>
           <SelectArrayInput label="热门城市列表" source="hotcity"  options={{ fullWidth: true }}/>
           </FormTab>
           <FormTab label="resources.systemconfig.tabs.driver">
           <SelectArrayInput label="对乘客的评价" source="commenttagsforrider"  options={{ fullWidth: true }}/>
           </FormTab>
       </TabbedForm>
       </Create>
);

export const SystemconfigEdit = (props) => (
    <EditPage {...props} title={<SystemconfigTitle />}>
        <TabbedForm>
            <FormTab label="resources.systemconfig.tabs.sysconfig">
            <NumberInput label="司机抽成" source="platformdriverfeediscount"/>
            <NumberInput label="代驾要求余额" source="daijialeastbalance" />
            <NumberInput label="代驾取消价格" source="daijiacancelprice"/>
            <TextInput label="客服电话" source="servicephonenumber"/>
            </FormTab>
            <FormTab label="resources.systemconfig.tabs.pinche">
            <SelectArrayInput label="拼车城市列表" source="pinchecitylist"  options={{ fullWidth: true }}/>
            <NumberInput label="未支付自动取消时间（单位分钟）" source="pinchetimecancelwhennotpaid"/>
            </FormTab>
            <FormTab label="resources.systemconfig.tabs.rider">
            <SelectArrayInput label="对司机的评价" source="commenttagsfordriver" options={{ fullWidth: true }}/>
            <NumberInput label="最大显示评价数" source="maxshowtags"/>
            <SelectArrayInput label="热门城市列表" source="hotcity"  options={{ fullWidth: true }}/>
            </FormTab>
            <FormTab label="resources.systemconfig.tabs.driver">
            <SelectArrayInput label="对乘客的评价" source="commenttagsforrider"  options={{ fullWidth: true }}/>
            </FormTab>
        </TabbedForm>
    </EditPage>
);
