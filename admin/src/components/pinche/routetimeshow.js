import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { translate } from 'admin-on-rest';
import compose from 'recompose/compose';

class OrderProductDetail extends Component {
    render() {
    let {source, record,translate} = this.props;
    let rows = [];
    let starttime = record.starttime;
    let startstations = record.startstations||[];
    let endstations = record.endstations||[];
    let carpooltime = record.carpoolstationtime||{};
    for(let i = 0;i < startstations.length ;i++){
      if(!carpooltime[startstations[i]]){
        carpooltime[startstations[i]]  = starttime;
      }
      rows.push(
        {
          stationname:startstations[i],
          starttime:carpooltime[startstations[i]]
        }
      );
    }
    for(let j = 0; j < endstations.length ; j++){
      if(!carpooltime[endstations[j]]){
        carpooltime[endstations[j]]  = starttime;
      }
      rows.push(
        {
          stationname:endstations[j],
          starttime:carpooltime[endstations[j]]
        }
      );
    }

        return (
            <Paper style={{ width: '42em', float: 'left' }} zDepth={2}>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                {translate('resources.buscarpool.fields.stationname')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.buscarpool.fields.starttime')}
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {rows.map(item => (
                            <TableRow key={`${item.stationname}`}>
                                <TableRowColumn>
                                    {item.stationname}
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                     {item.starttime}
                                 </TableRowColumn>
                                </TableRow>
                          )
                        )}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}



const enhance = compose(
    translate,
    connect()
);

export default enhance(OrderProductDetail);
