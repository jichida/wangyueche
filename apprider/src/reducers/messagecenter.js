import { createReducer } from 'redux-act';
import{
  getnotifymessageone_result
} from '../actions';

const initial = {
  notifymessage: {
      notifymessageitem:{}
  },
};

const notifymessage = createReducer({
    [getnotifymessageone_result]:(state,payload)=>{
        let notifymessageitem = {...payload};
        return  {...state,notifymessageitem};
    },
}, initial.notifymessage);

export default notifymessage;
