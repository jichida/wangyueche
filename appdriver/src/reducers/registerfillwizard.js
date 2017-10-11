import { createReducer } from 'redux-act';
import {
  ui_registerfillwizard
} from '../actions';


const initial = {
  registerfillwizard: {
    curpage:0,
    registertype:'快车',
  },
};

const registerfillwizard = createReducer({
  [ui_registerfillwizard]:(state,payload)=>{
    return {...state,...payload};
  },
}, initial.registerfillwizard);

export default registerfillwizard;
