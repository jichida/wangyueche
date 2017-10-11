/**
 * Created by wangxiaoqing on 2017/3/14.
 */
import { createReducer } from 'redux-act';
import { setsearchtxt,searchtext_result,placesearchresult } from '../actions';

const initial = {
    search: {
        'placesearchresult':{
            'info':"OK",
            'poiList':{
              "pois": [],
              "count": 0,
              "pageIndex": 1,
              "pageSize": 10
            },
        },
        'searchtxt':'',
        'searchtxtresult':[]
    },
};

const search = createReducer({
    [placesearchresult]:(state,placesearchresult)=>{
      return {...state,placesearchresult};
    },
    [setsearchtxt]: (state, searchtxt) => {
        if(searchtxt === ''){
          return {...state,...initial.search};
        }
        return { ...state,searchtxt:searchtxt};
    },
    [searchtext_result]: (state,payload) => {
        const {result} = payload;
        return { ...state,searchtxtresult:result};
    },
}, initial.search);

export default search;
