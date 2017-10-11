import { createReducer } from 'redux-act';
import {
    getemerygencycontact_result,
    getphoneconcatlist,
    logout_result
} from '../actions';

const initial = {
    emerygencycontact: {
        myconcatlist:[],
        phoneconcatlist:[],
    },
};

const emerygencycontact = createReducer({
    [logout_result]: (state, payload) => {
      return { ...initial.emerygencycontact};
    },
    [getphoneconcatlist]:(state,payload)=>{
      let phoneconcatlist = [...payload];
      return {...state,phoneconcatlist};
    },
    [getemerygencycontact_result]:(state, payload) => {
        let myconcatlist = [...payload.list];
        return {...state,myconcatlist};
    },
}, initial.emerygencycontact);

export default emerygencycontact;
