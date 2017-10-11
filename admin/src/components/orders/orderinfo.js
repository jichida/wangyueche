import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    TextField,
    DateField,
    FormTab,
    ReferenceField,
} from 'admin-on-rest';


export const Orderinfo = (props) => {
    let {label,record,source,...rest} = props;
    const triptypemap = {
        '代驾':'daijia',
        '出租车':'chuzuche',
        '快车':'kuaiche',
        '旅游大巴':'lvyoudaba',
        '拼车':'pinche',
    };
    let label2 = `${label}.${triptypemap[record.triptype]}`;
    let comret;
    let props2 = {...props,label:label2};
    if(record.triptype === '代驾' || record.triptype === '出租车' || record.triptype === '快车'){
        comret = (
            <FormTab  {...props2}>
                <TextField label="订单类型"  source="triptype" {...rest}/>
                <DateField label="上车时间"  source="getindate_at" showTime  {...rest}/>
                <DateField label="下车时间"  source="getoffdate_at" showTime  {...rest}/>
                <TextField label="预估距离"  source="totaldistance"  {...rest}/>
                <TextField label="预估时间"  source="totalduring"  {...rest}/>
            </FormTab>
        );
    }
    if(record.triptype === '旅游大巴'){
        comret = (
            <FormTab  {...props2}>
                <TextField label="租车人姓名"  source="rentusername"  {...rest}/>
                <DateField label="开始用车时间"  source="startdate" showTime  {...rest}/>
                <DateField label="还车时间"  source="enddate" showTime  {...rest}/>
            </FormTab>
        );

    }
    if(record.triptype === '拼车'){
        comret = (
            <FormTab  {...props2}>
                <TextField label="出发时间"  source="starttime"  {...rest}/>
                <TextField label="出发城市"  source="startcity"  {...rest}/>
                <TextField label="出发站点"  source="startstation"  {...rest}/>
                <TextField label="目的城市"  source="endcity"  {...rest}/>
                <TextField label="目的站点"  source="endstation"  {...rest}/>
                <TextField label="乘客数量"  source="seatnumber"  {...rest}/>
                <ReferenceField label="路线" source="buscarpoolid" reference="buscarpool"  addLabel={true} allowEmpty {...rest}   >
                <TextField source="id" />
                </ReferenceField>
            </FormTab>
        );
    }
    else{
      comret = (<div></div>);
    }

    return comret;
};

// Orderinfo.propTypes = {
//     record: PropTypes.object,
//     label:PropTypes.String
// };

export default Orderinfo;
