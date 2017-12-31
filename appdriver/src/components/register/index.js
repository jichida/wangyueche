import React from 'react';
import WeUI from 'react-weui';
import 'react-weui/lib/react-weui.min.css';
import { Field,reduxForm,Form,formValueSelector} from 'redux-form';
import { connect } from 'react-redux';

import '../../../public/newcss/register.css';
import { withRouter } from 'react-router-dom';
import {
    loginsendauth_request,
    register_request,
  } from '../../actions/index.js';
import NavBar from '../tools/nav.js';
import Sendauth from '../tools/sendauth.js';
import {
    required,
    phone,
    WeuiInputValidation,
    length4,
    WeuiCheckboxValidation,
    ischecked
    } from "../tools/formvalidation"
const {
    Form:FormUI,
  } = WeUI;


let RegisterForm = (props)=> {
    console.log(`RegisterForm===>${JSON.stringify(props)}`);
    let {handleSubmit,onClickRegister,username} = props;
    
    //发送
    let onClickAuth = (callback)=> {
        const name = username;
        const phone =  !!name && !(name.match(/\D/g)||name.length !== 11||!name.match(/^1/));
        if(phone){
            props.dispatch(loginsendauth_request({phonenumber: name,reason:'register'}));
        }
        callback(phone);
    }

    let handleLogin =()=>{
        props.history.replace("/login");
    }
    return (
        <Form
            onSubmit={handleSubmit(onClickRegister)}
            >
            <FormUI>
                <div className="li">
                    <Field
                        name="username"
                        id="username"
                        placeholder="请输入手机号"
                        type="number"
                        title
                        component={ WeuiInputValidation }
                        validate={[ required, phone ]}
                        InputTit="手机号"
                    />
                </div>
                <div className="li yanzhenli">
                    <Field
                        name="authcode"
                        id="authcode"
                        placeholder="请输入验证码"
                        type="text"
                        component={ WeuiInputValidation }
                        validate={[ required,length4 ]}
                        InputTit="验证码"
                    />

                    <Sendauth primary action={onClickAuth} className="getyanzhen" />

                </div>
                <div className="li">
                    <Field
                        name="password"
                        id="password"
                        placeholder="请输入密码"
                        type="password"
                        component={ WeuiInputValidation }
                        validate={[ required ]}
                        InputTit="密码"
                    />
                </div>

                <div className="aggreeForm">
                    <Field
                        name="hasAggree"
                        id="hasAggree"
                        component={ WeuiCheckboxValidation }
                        type="checkbox"
                        labelinfo="我已经阅读并同意"
                        validate={[ ischecked ]}
                        lnkurl={()=>{props.history.push("/about/driverservicerule")}}
                        lnktxt="网约车协议"
                        />
                </div>
            </FormUI>
            <div className="submitBtn">
                <button className="btn Primary" onClick={handleSubmit}><span>下一步</span></button>
                <a onClick={handleLogin}>已有账号，去登录</a>
            </div>
        </Form>
    );
};


const selector = formValueSelector('register')
RegisterForm = connect(
    state => {
        const hasAggree = selector(state, 'hasAggree');
        const username = selector(state, 'username');
        return {
            hasAggree,
            username
        }
    }
)(RegisterForm)
RegisterForm = withRouter(RegisterForm);

// const validate = values => {
//     const errors = {}
//     if (!values.username) {
//         errors.username = '必须填写用户名';
//     }
//     else {
//         let phone = values.username;
//         phone = phone.replace(/\s/g, '');
//         if (phone.match(/\D/g) || phone.length !== 11 || !phone.match(/^1/)) {
//             errors.username = '无效的手机号码';
//         }
//     }

//     if (!values.authcode) {
//         errors.authcode = '必须填写验证码';
//     }
//     else {
//         let authcode = values.authcode;
//         authcode = authcode.replace(/\s/g, '');
//         if (authcode.match(/\D/g) || authcode.length !== 4) {
//             errors.authcode = '验证码必须是四位数字';
//         }
//     }

//     if (!values.password) {
//         errors.password = '必须填写密码'
//     }
//     else {
//         let psd = values.password;
//         if (psd.match(/\s/g)) {
//             errors.password = '密码不能含有空格';
//         }
//         else if (psd.length < 6) {
//             errors.password = '密码不能小于六位';
//         }
//         else if (psd.length > 16) {
//             errors.password = '密码太长';
//         }
//     }

//    if (values.invitecode) {
//         let invitecode = values.invitecode;
//         if (invitecode.match(/\D/g) || invitecode.length !== 8) {
//             errors.invitecode = '邀请码必须是八位数字(也可不填)';
//         }
//     }
//     return errors;
// }

RegisterForm = reduxForm({
    form: 'register',
    initialValues: {
        username: '',
        password: '',
        authcode: '',
    },
    //validate,
})(RegisterForm);


export class Page extends React.Component {

    componentWillMount() {
    }

    onClickReturn =()=>{
        this.props.history.goBack();
    }
    onClickRegister = (values)=> {
        console.dir(values);

        let payload = {
            username: values.username,
            password: values.password,
            authcode: values.authcode,
        }
        //alert(JSON.stringify(formdata));
        // this.props.dispatch(register(payload)).then((result)=> {
        //     this.props.history.replace('/');
        // }).catch((error)=> {
        //     console.log("注册失败:" + JSON.stringify(error));
        // });
        console.log("onClickRegister:" + JSON.stringify(payload));
        this.props.dispatch(register_request(payload));
        //this.props.history.replace('/login');
    }

    onClickLogin = ()=> {
        this.props.history.replace('/login');
    }

    render() {
        return (
            <div className="registerPage AppPage">
                <NavBar
                  back={true}
                  title="注册用户" />
                <RegisterForm onClickRegister={this.onClickRegister}
                              onClickReturn={this.onClickReturn}/>
            </div>
        );
    }

}


Page = connect()(Page);
export default Page;
