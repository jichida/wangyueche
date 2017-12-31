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
import {DateInputString} from '../controls/DateInput_String.js';
import {required} from 'admin-on-rest';

const BaseInfoCompanyFarecreateTitle = ({ record }) => {
   return <span>新建 运价</span>;
};

const detailStyle = { display: 'inline-block', verticalAlign: 'top', marginRight: '2em', minWidth: '8em' };
const BaseInfoCompanyFareCreate = (props) => (
       <Create {...props} title={<BaseInfoCompanyFarecreateTitle />} >
       <TabbedForm>
           <FormTab label="resources.baseinfocompanyfare.tabs.tab0">
           <NumberInputEx label="行政区划代码"  source="Address" validate={[required]}/>
           <ReferenceInput label="运价"  source="FareType" reference="faretype" allowEmpty>
                  <SelectInput optionText="registertype" />
           </ReferenceInput>
           <DisabledInputEx  label="运价类型说明" source="FareTypeNote" />
           <DateInputString label="运价有效期起" source="FareValidOn"  validate={[required]}/>
           <DateInputString label="运价有效期止" source="FareValidOff" />
           <NumberInputEx  label="起步价(单位:元)" source="StartFare"  validate={[required]}/>
           <NumberInputEx  label="起步里程(单位:km)" source="StartMile"  validate={[required]}/>
           <NumberInputEx  label="计程单价〈按公里〉(单位:元)" source="UnitPricePerMile"  validate={[required]}/>
           <NumberInputEx  label="计时单价〈按分钟〉(单位:元)" source="UnitPricePerMinute"  validate={[required]}/>
           <NumberInputEx  label="单程加价单价(单位:元)" source="UpPrice" />
           <NumberInputEx  label="单程加价公里(单位:km)" source="UpPriceStartMile" />
           </FormTab>
           <FormTab label="resources.baseinfocompanyfare.tabs.tab1">
           <TimePickerInput label="营运早高峰时间起" source="MorningPeakTimeOn"  validate={[required]} defaultValue={'07:00'}/>
           <TimePickerInput label="营运早高峰时间止" source="MorningPeakTimeOff"  validate={[required]} defaultValue={'09:00'}/>
           <TimePickerInput label="营运晚高峰时间起" source="EveningPeakTimeOn"  validate={[required]} defaultValue={'17:00'}/>
           <TimePickerInput label="营运晚高峰时间止" source="EveningPeakTimeOff"  validate={[required]}  defaultValue={'18:00'}/>
           <TimePickerInput label="其他营运高峰时间起" source="OtherPeakTimeOn" />
           <TimePickerInput label="其他营运高峰时间止" source="OtherPeakTimeOff" />
           <NumberInputEx  label="高峰时间单程加价单价" source="PeakUnitPrice"  validate={[required]} defaultValue={0}/>
           <NumberInputEx  label="高峰时间单程加价公里" source="PeakPriceStartMile"  validate={[required]} defaultValue={0}/>
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
            <NumberInputEx label="行政区划代码"  source="Address" validate={[required]}/>
            <ReferenceInput label="运价"  source="FareType" reference="faretype" allowEmpty>
                  <SelectInput optionText="registertype" />
            </ReferenceInput>
            <DisabledInputEx  label="运价类型说明" source="FareTypeNote" />
            <DateInputString label="运价有效期起" source="FareValidOn"  validate={[required]}/>
            <DateInputString label="运价有效期止" source="FareValidOff" />
            <NumberInputEx  label="起步价(单位:元)" source="StartFare"  validate={[required]}/>
            <NumberInputEx  label="起步里程(单位:km)" source="StartMile"  validate={[required]}/>
            <NumberInputEx  label="计程单价〈按公里〉(单位:元)" source="UnitPricePerMile" validate={[required]} />
            <NumberInputEx  label="计时单价〈按分钟〉(单位:元)" source="UnitPricePerMinute" validate={[required]} />
            <NumberInputEx  label="单程加价单价(单位:元)" source="UpPrice" />
            <NumberInputEx  label="单程加价公里(单位:km)" source="UpPriceStartMile" />
            <TextField label="数据更新时间" source="UpdateTime"  />
            </FormTab>
            <FormTab label="resources.baseinfocompanyfare.tabs.tab1">
            <TimePickerInput label="营运早高峰时间起" source="MorningPeakTimeOn"  validate={[required]} defaultValue={'07:00'}/>
            <TimePickerInput label="营运早高峰时间止" source="MorningPeakTimeOff"  validate={[required]} defaultValue={'09:00'}/>
            <TimePickerInput label="营运晚高峰时间起" source="EveningPeakTimeOn"  validate={[required]} defaultValue={'17:00'}/>
            <TimePickerInput label="营运晚高峰时间止" source="EveningPeakTimeOff"  validate={[required]}  defaultValue={'18:00'}/>
            <TimePickerInput label="其他营运高峰时间起" source="OtherPeakTimeOn" />
            <TimePickerInput label="其他营运高峰时间止" source="OtherPeakTimeOff" />
            <NumberInputEx  label="高峰时间单程加价单价" source="PeakUnitPrice"  validate={[required]} defaultValue={0}/>
            <NumberInputEx  label="高峰时间单程加价公里" source="PeakPriceStartMile"  validate={[required]} defaultValue={0}/>
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
        <TextField label="有效期起" source="FareValidOn" />
        <TextField label="有效期止" source="FareValidOff" />
        <TextField  label="起步价" source="StartFare" />
        <TextField  label="起步里程" source="StartMile" />
        <TextField  label="按公里单价" source="UnitPricePerMile" />
        <TextField  label="按分钟单价" source="UnitPricePerMinute" />
        <TextField label="数据更新时间" source="UpdateTime"  />
        <EditButton />
        </Datagrid>
    </List>
);


export  {BaseInfoCompanyFareList,BaseInfoCompanyFareCreate,BaseInfoCompanyFareEdit};
