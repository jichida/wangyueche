import React from 'react'
import WeUI from 'react-weui';
const {
    FormCell,
    CellHeader,
    CellBody,
    CellFooter,
    Button,
    Input,
    Label,
    Select
  } = WeUI;

const renderInputField = (props) => {
  const { input, label,placeholder,type, meta: { touched, error } } = props;
  return (
    <FormCell>
        <CellHeader>
            <Label>{label}</Label>
        </CellHeader>
        <CellBody>
            <Input type={type} placeholder={placeholder}  {...input} />
            {touched && error &&
            <Label basic color='red' pointing>{error}</Label>}
        </CellBody>
    </FormCell>
  );
}

const renderAuthField = (props) => {
      const { input, label, type,placeholder,meta: { touched, error },onClickAuth } = props;
      return (<FormCell vcode>
          <CellHeader>
              <Label>{label}</Label>
          </CellHeader>
          <CellBody>
            <Input type={type} placeholder={placeholder}  {...input} />
            {touched && error &&
            <Label basic color='red' pointing>{error}</Label>}
          </CellBody>
          <CellFooter>
              <Button type="vcode"  onClick={onClickAuth}>获取</Button>
          </CellFooter>
      </FormCell>);
};

const renderSelField = (props) => {
      const {  label, data,meta: { touched, error } } = props;
      return (<FormCell select selectPos="after">
          <CellHeader>
              <Label>{label}</Label>
          </CellHeader>
          <CellBody>
              <Select data={data} />
              {touched && error &&
              <Label basic color='red' pointing>{error}</Label>}
          </CellBody>
      </FormCell>);
};

export {renderInputField,renderAuthField,renderSelField};
