const React = require('react')
const mui = require('material-ui')
const ModeEdit = require('material-ui/svg-icons/editor/mode-edit').default
const Check = require('material-ui/svg-icons/navigation/check').default
//const times = require('lodash.times')
const {IconButton, Toggle, TextField, RaisedButton} = mui

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      headerColumns: [],
      rows: [],
      onChange: function () {}
    }
  },

  getInitialState: function () {
    return {
      rows: this.props.rows,
      hoverValue: false,
      currentRow: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      rows: nextProps.rows
    });
  },

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  update: function () {
    const row = this.state.rows.filter((row) => {
      return row.selected
    })
    this.props.onChange(row[0])
  },

  getCellValue: function (cell) {
    const self = this
    const id = cell && cell.id
    const type = this.props.headerColumns.map((header) => {
      return header.type
    })[id]
    const selected = cell && cell.selected
    const value = cell && cell.value
    const rowId = cell && cell.rowId
    const header = cell && cell.header
    const width = cell && cell.width
    const textFieldId = [id, rowId, header].join('-')

    const textFieldStyle = {
      width: width
    }

    const onTextFieldChange = (e) => {
      const target = e.target
      const value = target.value
      var rows = self.state.rows
      rows[rowId].columns[id].value = value
      self.setState({rows: rows})
    }

    const onToggle = (e) => {
      var rows = self.state.rows
      rows[rowId].columns[id].value = !rows[rowId].columns[id].value
      self.setState({rows: rows})
    }

    if (header || (type && type === 'ReadOnly')) {
      return <p style={{color: '#888'}}>{value}</p>
    }

    if (type) {
      if (selected) {
        if (type === 'TextField') {
          return <TextField
            id={textFieldId}
            onChange={onTextFieldChange}
            style={textFieldStyle}
            value={value}
          />
        }
        if (type === 'Toggle') {
          return <Toggle onToggle={onToggle} toggled={value} />
        }
      } else {
        if (type === 'Toggle') {
          return <Toggle disabled onToggle={onToggle} toggled={value} />
        }
      }
    }

    return <TextField
      id={textFieldId}
      style={textFieldStyle}
      disabled
      value={value}
    />
  },

  renderHeader: function () {
    const headerColumns = this.props.headerColumns
    const columns = headerColumns.map((column, id) => {
      return {value: column.value}
    })
    const row = {columns: columns, header: true}

    return this.renderRow(row)
  },

  renderRow: function (row) {
    const self = this
    const columns = row.columns
    const rowStyle = {
      width: '100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      padding: row.header ? 0 : 12,
      border: 0,
      borderBottom: '1px solid #ccc',
      height: 50
    }
    const checkboxStyle = {
      display: 'flex',
      flexFlow: 'row nowrap',
      width: 50,
      height: 24,
      alignItems: 'center'
    }

    const rowId = row.id
    const rowKey = ['row', rowId].join('-')

    const onRowClick = function (e) {
      var rows = self.state.rows
      rows.forEach((row, i) => {
        if (rowId !== i) row.selected = false
      })
      rows[rowId].selected = !rows[rowId].selected
      self.setState({rows: rows})
    }

    const r = self.state.rows[rowId]
    const selected = (r && r.selected) || false

    const button = selected ? <Check /> : <ModeEdit />
    const tooltip = selected ? 'Done' : 'Edit'

    const onClick = function (e) {
      if (selected) {
        self.update()
      }

      onRowClick(e)
    }

    const checkbox = row.header ? <div style={checkboxStyle}/>
        : <IconButton style={checkboxStyle} tooltip={tooltip} onClick={onClick}>
            {button}
        </IconButton>

    return (
      <div key={rowKey} className='row' style={rowStyle}>
        {checkbox}
        {columns.map((column, id) => {
          const width = this.props.headerColumns.map((header) => {
            return (header && header.width) || false
          })[id]

          const cellStyle = {
            display: 'flex',
            flexFlow: 'row nowrap',
            flexGrow: 0.15,
            flexBasis: 'content',
            alignItems: 'center',
            height: 30,
            width: width || 200
          }

          const columnKey = ['column', id].join('-')
          column.selected = selected
          column.rowId = rowId
          column.id = id
          column.header = row.header
          column.width = cellStyle.width
          return (
            <div key={columnKey} className='cell' style={cellStyle}>
              <div>
                {this.getCellValue(column)}
              </div>
            </div>
          )
        })}
      </div>
    )
  },

  render: function () {
    const self = this
    const style = {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Roboto, sans-serif'
    }

    const buttonStyle = {
      display: 'flex',
      flexFlow: 'row nowrap',
      marginTop: 10
    }

    const rows = this.state.rows
    const columnTypes = this.props.headerColumns.map((header) => {
      return header.type
    })
    //
    // const onButtonClick = (e) => {
    //   const newColumns = times(columnTypes.length, (index) => {
    //     const defaults = {
    //       'TextField': '',
    //       'Toggle': true
    //     }
    //
    //     const value = defaults[columnTypes[index]]
    //
    //     return {value: value}
    //   })
    //
    //   const updatedRows = rows.map((row) => {
    //     if (row.selected) {
    //       self.update()
    //       row.selected = false
    //     }
    //     return row
    //   })
    //   updatedRows.push({columns: newColumns, selected: true})
    //   self.setState({rows: updatedRows})
    // }

    return (
      <div className='container' style={style}>
      {this.renderHeader()}
      {rows.map((row, id) => {
        row.id = id
        return this.renderRow(row)
      })}
      </div>
    )
  }
})
