import React from 'react';
import citysel from './citysel.js';
import { connect } from 'react-redux';
import _ from "lodash";
import NavBar from '../tools/nav.js';
import {setcurselcity,getcurcity} from '../../actions';
import '../../../public/newcss/city.css';
import { set_weui } from '../../actions/index.js';

export class Page extends React.Component {
    componentWillMount () {
        this.props.dispatch(getcurcity({}));
    }
    onClickSelCity(cityobj){
        this.props.dispatch(setcurselcity(cityobj));
        this.props.history.goBack();
    }
    scrollToAnchor(idname,letter){
        let toastLetter = {
            show : true,
            text : letter,
        }
        this.props.dispatch(set_weui({ toastLetter }));
        document.querySelector(idname).scrollIntoView();
    }
    render() {
        return (
            <div className="cityPage AppPage">
                <NavBar back={true} title="选择城市" />
                <div className="list">
                    <div className="nowcity">
                        <div className="tit">当前城市</div>
                        <div className="li">
                            <span
                                onClick={this.onClickSelCity.bind(this,this.props.curcity)}
                                className="btn btn-default">
                                {this.props.curcity.cityname}
                            </span>
                        </div>
                    </div>
                    <div className="hotcity">
                        <div className="tit">热门城市</div>
                        <div className="li">
                            {
                                _.map(this.props.hotcity,(city, index)=>{
                                    return (
                                        <span
                                            onClick={this.onClickSelCity.bind(this,city)}
                                            key={city.zipcode}
                                            className="btn btn-default"
                                            >
                                            {city.cityname}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="allcity">
                        <div className="cityItems_content">
                        {
                            _.map(citysel,(word, key)=>{
                                return (
                                    <div
                                        className="cityItems"
                                        key={key}
                                        >
                                        <div
                                            className="tit"
                                            id={`citylist_${key}`}
                                            >
                                            {key}
                                        </div>
                                        <div className="citylist_content">
                                        {
                                            _.map(word,(city, index)=>{
                                                return (
                                                    <div
                                                        onClick={this.onClickSelCity.bind(this,city)}
                                                        key={index}
                                                        >
                                                        {city.cityname}
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
                <div className="allletter">
                    {
                        _.map(citysel,(word, key)=>{
                            return (
                                <div
                                    className="letterItems"
                                    key={key}
                                    >
                                    <span
                                        className="tit"
                                        id={`citylist_${key}`}
                                        onClick={this.scrollToAnchor.bind(this,'#citylist_'+key, key)}
                                        >
                                        {key}
                                    </span>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = ({city,app:{hotcity}}) => {
    return {...city,hotcity};
}

export default connect(
    mapStateToProps
)(Page);
