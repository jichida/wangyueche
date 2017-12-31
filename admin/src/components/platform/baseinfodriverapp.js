import React from 'react';
import { NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput } from 'admin-on-rest/lib/mui';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
import {ImageInputUpload} from '../controls/imageupload.js';
import {Titlewithimage} from '../controls/Titlewithimage';
import {DateInputString} from '../controls/DateInput_String.js';
import {required} from 'admin-on-rest';


const BaseInfoDriverAppTitle = ({ record }) => <span>驾驶员移动终端信息</span>;
 const BaseInfoDriverAppEdit = (props) => (
    <Edit title={<BaseInfoDriverAppTitle />} {...props}>
      <SimpleForm>
        <TextInputEx label="机动车驾驶证号" source="LicenseId" />
        <TextInputEx label="驾驶员手机号"  source="DriverPhone" />
        <TextInputEx label="手机运营商"  source="NetType" />
        <TextInputEx label="使用APP版本号"  source="AppVersion" />
        <TextInputEx label="地图类型" source="MapType" />
        <TextField label="数据更新时间" source="UpdateTime"  />
      </SimpleForm>
    </Edit>
);


 const BaseInfoDriverAppList = props => (
  <List title="移动终端信息列表" {...props} >
     <Datagrid>
     <TextField label="机动车驾驶证号" source="LicenseId" />
     <TextField label="驾驶员手机号"  source="DriverPhone" />
     <TextField label="手机运营商"  source="NetType" />
     <TextField label="使用APP版本号"  source="AppVersion" />
     <TextField label="地图类型" source="MapType" />
     <EditButton />
     </Datagrid>
 </List>
);

export  {BaseInfoDriverAppList,BaseInfoDriverAppEdit};
