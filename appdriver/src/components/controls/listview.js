import React from 'react';
import ListView from 'rmc-list-view';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import './listview.css';
//https://github.com/edwardhotchkiss/mongoose-paginate
//https://github.com/react-component/m-list-view
//https://github.com/ant-design/ant-design-mobile/issues/541
const listtypeiddata = {

};//listtypeid:offset
/*
'productlist':{
    offset:100,
    limit:0,
    total:0,
    listdata:[],
    pos://滚动位置
}
*/

class Page extends React.Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.initData = [];
    this.state = {
      dataSource: dataSource.cloneWithRows(this.initData),
      refreshing: false,
      pos:0,
    };

    this.onAjax = this.onAjax.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
  }

  componentWillMount() {
    let saveddata = listtypeiddata[this.props.listtypeid];
    if(!!saveddata && this.props.usecache){//first time
      this.initData = [...saveddata.listdata];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.initData),
        refreshing: false,
        offset:saveddata.offset,//当前页
        total:saveddata.total,
        isend:saveddata.offset + saveddata.limit >= saveddata.total,
        pos:saveddata.pos
      });
    }
    else{
      if(!!saveddata){
        delete listtypeiddata[this.props.listtypeid];
      }
      this.onAjax(this.props.query,this.props.sort,this.props.pagenumber);
    }
  }
  componentWillUnmount() {
    this.mounted = false;
    let pos = _.get(this,'refs.listview.scrollProperties.offset',0);
    listtypeiddata[this.props.listtypeid] = {
      offset:this.state.offset,
      limit:this.props.pagenumber,
      total:this.state.total,
      listdata:this.initData,
      pos:pos//document.body.scrollTop||document.documentElement.scrollTop
    };
    console.log(`保存位置数据:,pos:${pos}`);
  }
  componentDidMount(){
    this.mounted = true;
    console.log(`滚动到位置数据:${JSON.stringify(this.state.pos)}`);
    this.refs.listview.scrollTo(0,this.state.pos);
  }
  onRefresh() {
    console.log('onRefresh');
    this.setState({ refreshing: true });
    this.onAjax(this.props.query,this.props.sort,this.props.pagenumber);
  }

  onRefreshQuery(query){
    this.setState({ refreshing: true });
    this.onAjax(query,this.props.sort,this.props.pagenumber);
  }

  onAjax(query,sort,pagenumber){
    let offset = 0;
    let that = this;
    this.props.dispatch(this.props.queryfun({
        query: query,
        options: {
            sort: sort,
            offset: offset,
            limit: pagenumber,
        }
    })).then(({result})=> {
      if (that.mounted){
        that.initData = [];
        if(!!result){
          _.map(result.docs,(item)=>{
            that.initData.push(item);
          });
        }
        let dateSource =  that.state.dataSource.cloneWithRows([...that.initData]);
        that.setState({
          dataSource:dateSource,
          refreshing: false,
          offset:result.offset,//当前页
          total:result.total,
          isend:result.offset + result.limit >= result.total
        });
      }
    });
  }
  //到达底部事件
  _onEndReached(event) {
    // load new data
    console.log('reach end', event);
    if(this.state.offset + this.props.pagenumber < this.state.total){
        this.setState({
          isLoading: true,//加载中
          isend:false//是否最后一页
        });
        let offset = this.state.offset + this.props.pagenumber;
        let that = this;
        this.props.dispatch(this.props.queryfun({
            query: this.props.query,
            options: {
                sort: this.props.sort,
                offset: offset,
                limit: this.props.pagenumber,
            }
        })).then(({result})=> {
          if (that.mounted){
              if(!!result){
                _.map(result.docs,(item)=>{
                  that.initData.push(item);
                });
              }
              let dateSource =  that.state.dataSource.cloneWithRows([...that.initData]);
              that.setState({
                dataSource:dateSource,
                isLoading: false,
                offset:result.offset,//当前页
                total:result.total,
                isend:result.offset + result.limit >= result.total
              });
            }
          });
    }
    else{
      this.setState({
        isLoading: false,
        isend:true
      });
    }
  }

  renderHeader(){
    if(!!this.props.renderHeader){
      return this.props.renderHeader();
    }
    return (<div></div>);
  }

  renderSeparator(sectionID, rowID){
    if(!!this.props.renderSeparator){
      return this.props.renderSeparator(sectionID, rowID);
    }
    return
    (<div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#F5F5F9', height: 8 }} />);
  }
  updateContent(item){
    return this.props.updateContent(item,this.onRefresh.bind(this));
  }
  renderFooter(){
    if(!!this.props.renderFooter){
      return this.props.renderFooter(this.state.isLoading, this.state.isend);
    }
    return (
      <div style={{
      color: '#999',
      padding: "15px",
      textAlign: 'center',
      fontSize: "14px",
      borderTop: "1px solid #EEE"
    }}
    >
      {this.state.isLoading ? 'loading...' : ''}
      {this.state.isend && '－ 没有更多数据了 －'}
    </div>);
  }

  render() {
    const initialListSize = this.initData.length > 5 ?this.initData.length:5;
    return (
      <ListView
        ref='listview'
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader.bind(this)}
        renderRow={this.updateContent.bind(this)}
        renderSeparator={this.renderSeparator.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        initialListSize={initialListSize}
        pageSize={4}
        scrollRenderAheadDistance={200}
        scrollEventThrottle={20}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={10}
        style={{height: this.props.listheight}}
        useZscroller
        scrollerOptions={{ scrollbars: false }}
        refreshControl={<ListView.RefreshControl
          className="my-refresh-control"
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          resistance={1}
        />}
      />
    );
  }
}


Page.propTypes = {
    usecache:PropTypes.bool.isRequired,
    listtypeid:PropTypes.string.isRequired,
    renderHeader:PropTypes.func,
    renderSeparator:PropTypes.func,
    renderFooter:PropTypes.func,
    queryfun: PropTypes.func.isRequired,
    updateContent: PropTypes.func.isRequired,
    pagenumber: PropTypes.number.isRequired,
    listheight: PropTypes.number.isRequired,
    query : PropTypes.object.isRequired,
    sort : PropTypes.object.isRequired,
};


export default connect(null, null, null, { withRef: true })(Page);
