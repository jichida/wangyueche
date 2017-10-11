import { createReducer } from 'redux-act';
import {
  ui_createcarwizard
} from '../actions';


const initial = {
  createcarwizard: {
      curpage:1
  },
};

const createcarwizard = createReducer({
  [ui_createcarwizard]:(state,payload)=>{
    return {...state,...payload};
  },
}, initial.createcarwizard);

export default createcarwizard;
