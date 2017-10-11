import React, { Component } from 'react';
// import '../../../public/css/sendauth.css';

let timeinterval = null


export class Page extends Component {

    constructor(props) {  
        super(props);  
        this.state = {
            text: props.text || "发送验证码",
            style : props.className || "",
            time : props.time || 30,
            unlabel : false,
            domstyle :{
                width: "100px",
                height: "44px",
                zIndex: 1000,
                background: "#2185d0",
                color: "#FFFFFF",
                lineHeight: "44px",
                textAlign: "center",
                fontSize: "14px"
            },
            unlabelstyle: {
                //background: "#999999"
            }
        };
    } 

    sendClick=()=>{
        if(!this.state.unlabel){
            this.props.action((v)=>{
                if(v){
                    this.startTime();
                }
            });
        }
    }

    startTime=()=>{
        timeinterval = window.setInterval(()=>{
            if(this.state.time===0){
                window.clearInterval(timeinterval);
                this.setState({
                    style : "sendauthbtn "+this.props.className,
                    time : this.props.time || 30,
                    text: "发送验证码",
                    unlabel : false,
                    unlabelstyle: {}
                });
            }else{
                this.setState({
                    style : "unlabel "+this.props.className,
                    time : --this.state.time,
                    text: this.state.time+"秒",
                    unlabel : true,
                    unlabelstyle: {
                        color: "#999999"
                    }
                });
            }
        },1000);
    }

    render(){
        const renderstyle = !!this.state.style?{}:this.state.domstyle;
        return (
            <div
                className={this.state.style}
                onClick={this.sendClick}
                style={{...renderstyle, ...this.state.unlabelstyle}}
                >
                {this.state.text}
            </div>
        )
    }
};

export default Page;


