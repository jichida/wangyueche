import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,
 TabbedForm,FormTab,ReferenceField,ReferenceInput,AutocompleteInput,SelectInput} from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';

const BaseInfoCompanyFarecreateTitle = ({ record }) => {
   return <span>新建 运价</span>;
};

const detailStyle = { display: 'inline-block', verticalAlign: 'top', marginRight: '2em', minWidth: '8em' };
const BaseInfoCompanyFareCreate = (props) => (
       <Create {...props} title={<BaseInfoCompanyFarecreateTitle />} >
       <TabbedForm>
           <FormTab label="resources.baseinfocompanyfare.tabs.tab0">
          <ReferenceInput source="FareType" reference="faretype" allowEmpty>
                  <SelectInput optionText="registertype" />
            </ReferenceInput>
           <DisabledInputEx  label="运价类型说明" source="FareTypeNote" />
           <DateInput label="运价有效期起" source="FareValidOn" />
           <DateInput label="运价有效期止" source="FareValidOff" />
           <NumberInputEx  label="起步价(单位:元)" source="StartFare" />
           <NumberInputEx  label="起步里程(单位:km)" source="StartMile" />
           <NumberInputEx  label="计程单价〈按公里〉(单位:元)" source="UnitPricePerMile" />
           <NumberInputEx  label="计时单价〈按分钟〉(单位:元)" source="UnitPricePerMinute" />
           <NumberInputEx  label="单程加价单价(单位:元)" source="UpPrice" />
           <NumberInputEx  label="单程加价公里(单位:km)" source="UpPriceStartMile" />
           </FormTab>
           <FormTab label="resources.baseinfocompanyfare.tabs.tab1">
           <TimePickerInput label="营运早高峰时间起" source="MorningPeakTimeOn" />
           <TimePickerInput label="营运早高峰时间止" source="MorningPeakTimeOff" />
           <TimePickerInput label="营运晚高峰时间起" source="EveningPeakTimeOn" />
           <TimePickerInput label="营运晚高峰时间止" source="EveningPeakTimeOff" />
           <TimePickerInput label="其他营运高峰时间起" source="OtherPeakTimeOn" />
           <TimePickerInput label="其他营运高峰时间止" source="OtherPeakTimeOff" />
           <NumberInputEx  label="高峰时间单程加价单价" source="PeakUnitPrice" />
           <NumberInputEx  label="高峰时间单程加价公里" source="PeakPriceStartMile" />
           <NumberInputEx  label="低速计时加价〈按分钟〉(单位:元)" source="LowSpeedPricePerMinute" />
           <NumberInputEx  label="夜间费〈按公里〉(单位:元)" source="NightPricePerMile" />
           <NumberInputEx  label="夜间费〈按分钟〉(单位:元)" source="NightPricePerMinute" />
           <NumberInputEx  label="其它加价金额" source="OtherPrice" />
           </FormTab>
         </TabbedForm>
       </Create>
);

const BaseInfoCompanyFareTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 运价</span>;
};

const BaseInfoCompanyFareEdit = (props) => {
      return (<Edit title={<BaseInfoCompanyFareTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.baseinfocompanyfare.tabs.tab0">
            <ReferenceInput source="FareType" reference="faretype" allowEmpty>
                  <SelectInput optionText="registertype" />
            </ReferenceInput>
            <DisabledInputEx  label="运价类型说明" source="FareTypeNote" />
            <DateInput label="运价有效期起" source="FareValidOn" />
            <DateInput label="运价有效期止" source="FareValidOff" />
            <NumberInputEx  label="起步价(单位:元)" source="StartFare" />
            <NumberInputEx  label="起步里程(单位:km)" source="StartMile" />
            <NumberInputEx  label="计程单价〈按公里〉(单位:元)" source="UnitPricePerMile" />
            <NumberInputEx  label="计时单价〈按分钟〉(单位:元)" source="UnitPricePerMinute" />
            <NumberInputEx  label="单程加价单价(单位:元)" source="UpPrice" />
            <NumberInputEx  label="单程加价公里(单位:km)" source="UpPriceStartMile" />
            </FormTab>
            <FormTab label="resources.baseinfocompanyfare.tabs.tab1">
            <TimePickerInput label="营运早高峰时间起" source="MorningPeakTimeOn" />
            <TimePickerInput label="营运早高峰时间止" source="MorningPeakTimeOff" />
            <TimePickerInput label="营运晚高峰时间起" source="EveningPeakTimeOn" />
            <TimePickerInput label="营运晚高峰时间止" source="EveningPeakTimeOff" />
            <TimePickerInput label="其他营运高峰时间起" source="OtherPeakTimeOn" />
            <TimePickerInput label="其他营运高峰时间止" source="OtherPeakTimeOff" />
            <NumberInputEx  label="高峰时间单程加价单价" source="PeakUnitPrice" />
            <NumberInputEx  label="高峰时间单程加价公里" source="PeakPriceStartMile" />
            <NumberInputEx  label="低速计时加价〈按分钟〉(单位:元)" source="LowSpeedPricePerMinute" />
            <NumberInputEx  label="夜间费〈按公里〉(单位:元)" source="NightPricePerMile" />
            <NumberInputEx  label="夜间费〈按分钟〉(单位:元)" source="NightPricePerMinute" />
            <NumberInputEx  label="其它加价金额" source="OtherPrice" />
            </FormTab>
          </TabbedForm>
      </Edit>);

};


const BaseInfoCompanyFareList = (props) => (//
     <List title="运价列表" {...props} >
        <Datagrid>
        <ReferenceField source="FareType" reference="faretype" allowEmpty>
            <TextField source="registertype" />
        </ReferenceField>
        <DateField label="有效期起" source="FareValidOn" />
        <DateField label="有效期止" source="FareValidOff" />
        <TextField  label="起步价" source="StartFare" />
        <TextField  label="起步里程" source="StartMile" />
        <TextField  label="按公里单价" source="UnitPricePerMile" />
        <TextField  label="按分钟单价" source="UnitPricePerMinute" />
        <TextField  label="加价单价" source="UpPrice" />
        <TextField  label="加价公里" source="UpPriceStartMile" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {BaseInfoCompanyFareList,BaseInfoCompanyFareCreate,BaseInfoCompanyFareEdit};
