import { connect } from 'react-redux';
import _ from "lodash";
import { Field,reduxForm} from 'redux-form';

const getRegisterFillWizardForm = (Page)=>{
  let RegisterFillWizardForm = reduxForm({
    form: 'registerfillwizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  })(Page);

  RegisterFillWizardForm = connect(
    ({userlogin},props)=>{
        return {
          initialValues:{
              avatarURL:_.get(userlogin,'avatarURL',''),
              DriverName:_.get(userlogin,'Platform_baseInfoDriver.DriverName',''),
              DriverPhone:_.get(userlogin,'Platform_baseInfoDriver.DriverPhone',''),
              idcard:_.get(userlogin,'idcard',''),
              bankaccount:_.get(userlogin,'bankaccount',''),
              DriverType: _.get(userlogin,'Platform_baseInfoDriver.DriverType','C1'),
              DriverGender: _.get(userlogin,'Platform_baseInfoDriver.DriverGender','男'),
              huji: _.get(userlogin,'huji',''),
              DriverAddress:_.get(userlogin,'Platform_baseInfoDriver.DriverAddress',''),
              DriverNation: _.get(userlogin,'Platform_baseInfoDriver.DriverNation','汉族'),
              DriverMaritalStatus: _.get(userlogin,'Platform_baseInfoDriver.DriverMaritalStatus','未婚'),
              EmergencyContactPhone:_.get(userlogin,'Platform_baseInfoDriver.EmergencyContactPhone',''),
              EmergencyContactAddress:_.get(userlogin,'Platform_baseInfoDriver.EmergencyContactAddress',''),
              CertificateNo:_.get(userlogin,'Platform_baseInfoDriver.CertificateNo',''),
              GetDriverLicenseDate:_.get(userlogin,'Platform_baseInfoDriver.GetDriverLicenseDate','1990-01-01'),

              OwnerName:_.get(userlogin,'Platform_baseInfoVehicle.OwnerName',''),
              VehicleNo:_.get(userlogin,'Platform_baseInfoVehicle.VehicleNo',''),
              Seats:_.get(userlogin,'Platform_baseInfoVehicle.Seats',''),
              CheckState:_.get(userlogin,'Platform_baseInfoVehicle.CheckState','已审'),
              Certificate:_.get(userlogin,'Platform_baseInfoVehicle.Certificate',''),

              LicenseId:_.get(userlogin,'Platform_baseInfoDriver.LicenseId',''),
              LicensePhotoIdURL:_.get(userlogin,'Platform_baseInfoDriver.LicensePhotoIdURL',''),
              CarrunPhotoIdURL:_.get(userlogin,'CarrunPhotoIdURL',''),
              PhotoandCarmanURL:_.get(userlogin,'PhotoandCarmanURL',''),

              PhotoJiandukaURL:_.get(userlogin,'PhotoJiandukaURL',''),
              PhotoServiceicenseURL:_.get(userlogin,'PhotoServiceicenseURL',''),
          },
        }
    }
  )(RegisterFillWizardForm);
  return RegisterFillWizardForm;
}

export {getRegisterFillWizardForm};
