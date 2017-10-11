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
  let carpoolprice = record.carpoolprice;
  let startstations = record.startstations;
  let endstations = record.endstations;
  for(let i = 0;i < startstations.length ;i++){
    for(let j = 0; j < endstations.length ; j++){
      if(!carpoolprice.hasOwnProperty(startstations[i])){
        carpoolprice[startstations[i]] = {};
      }
      if(carpoolprice[startstations[i]].hasOwnProperty(endstations[j])){
        rows.push(
          {
            startstation:startstations[i],
            endstation:endstations[j],
            price:carpoolprice[startstations[i]][endstations[j]]
          }
        );
        continue;
     }
     carpoolprice[startstations[i]][endstations[j]] =0;
          rows.push(
          {
            startstation:startstations[i],
            endstation:endstations[j],
            price:0
          }
        );
    }
  }

        return (
            <Paper style={{ width: '42em', float: 'left' }} zDepth={2}>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                {translate('resources.buscarpool.fields.startstation')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.buscarpool.fields.endstation')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.buscarpool.fields.price')}
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {rows.map(item => (
                            <TableRow key={`${item.startstation}.${item.endstation}`}>
                                <TableRowColumn>
                                    {item.startstation}
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                     {item.endstation}
                                 </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.price.toLocaleString('zh-cn', { style: 'currency', currency: 'CNY' })}
                                </TableRowColumn>)
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

