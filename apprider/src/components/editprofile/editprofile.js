import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Fields, reduxForm,Form  } from 'redux-form';
import DatePicker from 'react-mobile-datepicker';
import config from '../../config.js';
import {fileupload} from '../../util/fileupload.js';
import NavBar from '../tools/nav.js';
import {
  fillprofile_request,
  ui_editprofilesetbirthdayshow,
  set_weui
} from '../../actions';
import '../../../public/newcss/userprofile.css';

let renderEditprofile = (props)=>{
  let onChangeFieldname=(fieldname,e)=>{
    props[fieldname].input.onChange(e.target.value);
  }
  let handleClick=()=>{
    props.dispatch(ui_editprofilesetbirthdayshow(true));
   }

   let handleCancel=()=>{
      props.dispatch(ui_editprofilesetbirthdayshow(false));
   }

   let handleSelect=(time)=> {
     props.dispatch(ui_editprofilesetbirthdayshow(false));
     props.birthday.input.onChange(time);
   }


   let fileChange=(event)=>{
     fileupload(event,{
       usertoken:localStorage.getItem('zhongnan_rider_token'),
       width:100,
       height:100
     },(issuc,result)=>{
       if(issuc){
         props.avatar.input.onChange(config.serverurl + result.url);
       }
     });
   }
   return (
       <ul className="list">

       <li className="item item-input">
         <div className="item-main">
           <label className="field-container">
             <span className="item-title">
               修改头像
             </span>
             <div className="item-after">
                <img src={props.avatar.input.value} className="user_tximg" alt='img'/>
                <input type="file" id="cpic" name="cpic" onChange={fileChange }
                  style={
                      {
                        filter:"alpha(opacity=0)","MozOpacity":"0.0",
                        "KhtmlOpacity":0.0,opacity:0.0,position:"absolute",
                        right: "5px",top:"10px",zIndex:"9"
                      }
                    }
                />
             </div>
            </label>
            </div>
            <span className="icon icon-right-nav item-icon">
            </span>
       </li>


       <li className="item item-input iinput">
        <div className="item-main">
       <label className="field-container"><span className="field-label">昵称</span>
       <input type="text" icon="person" className="field"
       onChange={(e)=>{onChangeFieldname('nickname',e);}}
       value={props.nickname.input.value}
       style={{fontSize:"14px"}}
       /></label></div>
       </li>

       <li className="item item-input selectinput"><div className="item-main"><label className="field-container">
       <span className="field-label" style={{display:"block"}}>性别</span>

       <select className="borderless padding-left-0 margin-0"
       value={props.sex.input.value}
       onChange={(e)=>{onChangeFieldname('sex',e);}}>
       <option value={"男"}>男</option>
       <option value={"女"}>女</option>
       </select>
       <span>{props.sex.input.value}</span>

       </label></div></li>
       <li className="item item-input"  onClick={handleClick}><div className="item-main">
       <label className="field-container"><span className="field-label">生日</span>
         <span style={{display:"block"}}>{moment(props.birthday.input.value).format("YYYY-MM-DD")}
       <DatePicker
         value={props.birthday.input.value}
         isOpen={props.birthdaydateopen}
         onSelect={handleSelect}
         onCancel={handleCancel}
         dateFormat={['YYYY年', 'MM月', 'DD日']}
         theme="ios"
         /></span>
          </label>

       </div></li>
       </ul>
);
};

const mapStateToProps1 = ({appui}) => {
  return {...appui.editprofile};
}
renderEditprofile = connect(mapStateToProps1)(renderEditprofile);

let EditprofileForm = (props)=>{
  let {handleSubmit} = props;

  return (
      <Form onSubmit={handleSubmit(props.onClickOK)}>
      <Fields names={['nickname', 'avatar', 'sex', 'birthday']}
              component={renderEditprofile}/>
      <div className="pagebtn">
        <button className="btn Primary"><span>确定</span></button>
      </div>
      </Form>
    );
};



export class Page extends React.Component {

  componentWillMount () {
  }

   onClickOK =(values)=>{
    //console.log("ok:" + JSON.stringify(values));
    if(!!values.nickname){
      this.props.dispatch(fillprofile_request(values));
      this.props.history.goBack();
    }else{
      let toast = {
          show : true,
          text : "用户昵称不能为空",
          type : "warning"
      }
      this.props.dispatch(set_weui({ toast }));
    }
  }

   render() {

       let birthday = this.props.birthday;
       if(birthday){
           if (typeof birthday === 'string') {
               birthday = new Date(Date.parse(birthday));
           }
       }
       else{
           birthday = new Date();
           birthday.setFullYear(1990,1,1);
       }

      EditprofileForm = reduxForm({
        form: 'editprofile',
        initialValues:{
          nickname:this.props.nickname||'',
          avatar:this.props.avatar||'images/user.jpg',
          sex:this.props.sex||'男',
          birthday:birthday,
        }
      })(EditprofileForm);
      return (
        <div className="userprofilePage AppPage">
           <NavBar title="个人资料" back={true} />
            <EditprofileForm onClickOK={this.onClickOK} />
         </div>);
    }
}

const mapStateToProps = ({userlogin}) => {
  return {...userlogin.profile}
};

export default connect(mapStateToProps)(Page);
